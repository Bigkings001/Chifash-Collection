from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from .models import Order, Coupon, SiteSettings

ORDER_STATUS_COLORS = {
    'pending': '#888888',
    'confirmed': '#2196F3',
    'payment_sent': '#F59E0B', # Tailored for dark theme
    'paid': '#10B981',
    'shipped': '#9C27B0',
    'delivered': '#009688',
    'cancelled': '#EF4444',
}

PAYMENT_STATUS_COLORS = {
    'unpaid': '#EF4444',
    'link_sent': '#F59E0B',
    'paid': '#10B981',
    'refunded': '#888888',
}


@admin.register(Order)
class OrderAdmin(ModelAdmin):
    list_display = [
        'id', 'customer_name', 'customer_whatsapp', 'product',
        'size', 'quantity', 'colored_order_status',
        'colored_payment_status', 'total_display', 'created_at',
    ]
    list_filter = ['order_status', 'payment_status', 'created_at']
    search_fields = ['customer_name', 'customer_whatsapp', 'product__name']
    readonly_fields = ['created_at', 'updated_at', 'subtotal_display', 'total_display']
    actions = ['mark_as_paid', 'mark_as_shipped', 'mark_as_delivered']

    fieldsets = [
        ('Customer', {
            'fields': ('customer_name', 'customer_whatsapp', 'delivery_address'),
            'classes': ['tab']
        }),
        ('Order Details', {
            'fields': ('product', 'size', 'quantity', 'unit_price', 'discount_amount', 'delivery_fee', 'coupon'),
            'classes': ['tab']
        }),
        ('Status info', {
            'fields': ('order_status', 'payment_status'),
            'classes': ['tab']
        }),
        ('Summary', {
            'fields': ('subtotal_display', 'total_display')
        }),
        ('Notes', {
            'fields': ('notes',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    ]

    def colored_order_status(self, obj):
        color = ORDER_STATUS_COLORS.get(obj.order_status, '#888')
        return format_html(
            '<span style="background:{};color:white;padding:3px 12px;border-radius:20px;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em">{}</span>',
            color, obj.get_order_status_display()
        )
    colored_order_status.short_description = 'Order status'

    def colored_payment_status(self, obj):
        color = PAYMENT_STATUS_COLORS.get(obj.payment_status, '#888')
        return format_html(
            '<span style="background:{};color:white;padding:3px 12px;border-radius:20px;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em">{}</span>',
            color, obj.get_payment_status_display()
        )
    colored_payment_status.short_description = 'Payment'

    def subtotal_display(self, obj):
        return f"₦{obj.subtotal:,.2f}"
    subtotal_display.short_description = 'Subtotal'

    def total_display(self, obj):
        return f"₦{obj.total:,.2f}"
    total_display.short_description = 'Total'

    @admin.action(description="Mark selected as paid")
    def mark_as_paid(self, request, queryset):
        queryset.update(payment_status='paid')

    @admin.action(description="Mark selected as shipped")
    def mark_as_shipped(self, request, queryset):
        queryset.update(order_status='shipped')

    @admin.action(description="Mark selected as delivered")
    def mark_as_delivered(self, request, queryset):
        queryset.update(order_status='delivered')


@admin.register(Coupon)
class CouponAdmin(ModelAdmin):
    list_display = ['code', 'discount_percent', 'is_active', 'times_used', 'max_uses', 'expiry_date']
    list_editable = ['is_active']
    search_fields = ['code']


@admin.register(SiteSettings)
class SiteSettingsAdmin(ModelAdmin):
    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
