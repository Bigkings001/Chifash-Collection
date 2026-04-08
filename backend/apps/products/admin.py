from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin, TabularInline
from .models import Product, ProductImage, Category, Collection


class ProductImageInline(TabularInline):
    model = ProductImage
    extra = 1
    fields = ['image', 'image_url', 'is_primary', 'order']


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    inlines = [ProductImageInline]
    list_display = ['name', 'category', 'price', 'available_sizes', 'stock_status', 'in_stock', 'is_featured']
    list_editable = ['in_stock', 'is_featured']
    list_filter = ['category', 'in_stock', 'is_featured']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    
    fieldsets = [
        (None, {
            "fields": ["name", "slug", "description", "price", "category"]
        }),
        ("Inventory & Visibility", {
            "fields": ["available_sizes", "units_in_stock", "low_stock_threshold", "in_stock", "is_featured"],
            "classes": ["tab"],
        }),
        ("Product Specifications", {
            "fields": ["material", "fit", "care_instructions"],
            "classes": ["tab"],
        }),
    ]

    def stock_status(self, obj):
        if obj.units_in_stock == 0:
            return format_html('<span style="color:#ef4444;font-weight:bold">Out of stock</span>')
        elif obj.units_in_stock <= obj.low_stock_threshold:
            return format_html('<span style="color:#f59e0b;font-weight:bold">{} left — low</span>', obj.units_in_stock)
        return format_html('<span style="color:#10b981">{} in stock</span>', obj.units_in_stock)
    stock_status.short_description = 'Stock'


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ['name', 'slug']


@admin.register(Collection)
class CollectionAdmin(ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ['name', 'is_active', 'created_at']
    list_editable = ['is_active']
    filter_horizontal = ['products']
