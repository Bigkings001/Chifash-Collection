"""
Optimized product views with caching and query optimization
"""

from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.core.cache import cache
from django.db.models import Q, Prefetch
from apps.products.models import Product, Category
from apps.products.serializers import ProductListSerializer, ProductDetailSerializer, CategorySerializer
from apps.api.base_viewset import OptimizedViewSet
import hashlib


class ProductViewSet(OptimizedViewSet):
    """
    Product ViewSet with:
    - N+1 query prevention (select_related, prefetch_related)
    - Redis caching
    - Full-text search
    """
    
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug', 'is_featured', 'in_stock']
    search_fields = ['name', 'description', 'material']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']
    lookup_field = 'slug'
    
    def get_queryset(self):
        """Optimize queries with prefetch_related and select_related"""
        queryset = Product.objects.all()
        
        if self.action == 'list':
            # For list view, minimize data fetched
            queryset = queryset.select_related('category').prefetch_related(
                Prefetch('images', Product.images.through.objects.filter(is_primary=True))
            ).filter(in_stock=True)
        
        elif self.action == 'retrieve':
            # For detail view, fetch all related data
            queryset = queryset.select_related('category').prefetch_related('images')
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        """Cache the list response"""
        # Generate cache key from request parameters
        cache_key = self._generate_cache_key(request)
        
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)
        
        response = super().list(request, *args, **kwargs)
        
        # Cache for 5 minutes
        cache.set(cache_key, response.data, timeout=300)
        
        return response
    
    def retrieve(self, request, *args, **kwargs):
        """Cache individual product details"""
        slug = kwargs.get('slug')
        cache_key = f'product:{slug}'
        
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)
        
        response = super().retrieve(request, *args, **kwargs)
        
        # Cache for 10 minutes
        cache.set(cache_key, response.data, timeout=600)
        
        return response
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured products"""
        cache_key = 'products:featured'
        
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)
        
        featured = self.get_queryset().filter(is_featured=True)[:12]
        serializer = self.get_serializer(featured, many=True)
        
        cache.set(cache_key, serializer.data, timeout=600)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Full-text search with caching"""
        query = request.query_params.get('q', '')
        
        if not query or len(query) < 2:
            return Response({'error': 'Search query too short'}, status=400)
        
        cache_key = f'search:{hashlib.md5(query.encode()).hexdigest()}'
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)
        
        queryset = self.get_queryset().filter(
            Q(name__icontains=query) | 
            Q(description__icontains=query) |
            Q(material__icontains=query)
        )[:50]
        
        serializer = self.get_serializer(queryset, many=True)
        
        cache.set(cache_key, serializer.data, timeout=300)
        
        return Response(serializer.data)
    
    def _generate_cache_key(self, request):
        """Generate cache key from request parameters"""
        params = request.query_params.dict()
        params_str = '&'.join(sorted(f"{k}={v}" for k, v in params.items()))
        
        cache_key = f"products:list:{hashlib.md5(params_str.encode()).hexdigest()}"
        return cache_key


class CategoryViewSet(OptimizedViewSet):
    """Category ViewSet with caching"""
    
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    
    def list(self, request, *args, **kwargs):
        """Cache category list"""
        cache_key = 'categories:all'
        
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)
        
        response = super().list(request, *args, **kwargs)
        
        # Cache for 30 minutes
        cache.set(cache_key, response.data, timeout=1800)
        
        return response
