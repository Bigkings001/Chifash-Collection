from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category
from .serializers import ProductListSerializer, ProductDetailSerializer, CategorySerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(in_stock=True).prefetch_related('images').select_related('category')
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__slug', 'is_featured']

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.prefetch_related('images').select_related('category')
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
