"""
Base ViewSet with query optimization
"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication


class OptimizedViewSet(viewsets.ModelViewSet):
    """
    Base ViewSet with:
    - JWT Authentication
    - Query optimization (select_related, prefetch_related)
    - Caching strategies
    """
    
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Override in subclass to apply select_related and prefetch_related
        Example:
            def get_queryset(self):
                return super().get_queryset().select_related('category').prefetch_related('images')
        """
        return super().get_queryset()
    
    def get_cache_timeout(self):
        """Override to set custom cache timeout"""
        if self.action == 'list':
            return 300  # 5 minutes
        elif self.action == 'retrieve':
            return 600  # 10 minutes
        return 0  # No cache
    
    @method_decorator(cache_page(60 * 5))  # 5 minute cache
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(60 * 10))  # 10 minute cache
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
