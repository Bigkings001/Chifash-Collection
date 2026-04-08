from rest_framework import serializers
from .models import Product, ProductImage, Category

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'image_url', 'is_primary']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProductListSerializer(serializers.ModelSerializer):
    primary_image = serializers.SerializerMethodField()
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'price', 'category', 'primary_image', 'available_sizes', 'in_stock', 'is_featured']

    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        if not img:
            return None
        return img.image_url if img.image_url else (img.image.url if img.image else None)

class ProductDetailSerializer(ProductListSerializer):
    images = ProductImageSerializer(many=True)

    class Meta(ProductListSerializer.Meta):
        fields = ProductListSerializer.Meta.fields + ['description', 'material', 'fit', 'care_instructions', 'images']
