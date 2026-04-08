from django.db import models
from apps.products.models import Product


class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount_percent = models.PositiveIntegerField(help_text='e.g. 10 for 10% off')
    is_active = models.BooleanField(default=True)
    expiry_date = models.DateField(null=True, blank=True)
    max_uses = models.PositiveIntegerField(null=True, blank=True, help_text='Leave blank for unlimited')
    times_used = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.code} ({self.discount_percent}% off)"


class Order(models.Model):
    ORDER_STATUS = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('payment_sent', 'Payment link sent'),
        ('paid', 'Paid'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    PAYMENT_STATUS = [
        ('unpaid', 'Unpaid'),
        ('link_sent', 'Payment link sent'),
        ('paid', 'Paid'),
        ('refunded', 'Refunded'),
    ]

    customer_name = models.CharField(max_length=200)
    customer_whatsapp = models.CharField(max_length=20, help_text='Include country code e.g. 2348012345678')
    delivery_address = models.TextField(blank=True)

    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='orders')
    size = models.CharField(max_length=10)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    order_status = models.CharField(max_length=20, choices=ORDER_STATUS, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='unpaid')

    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null=True, blank=True)
    notes = models.TextField(blank=True, help_text='Customer requests from WhatsApp chat')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order #{self.id} — {self.customer_name} ({self.order_status})"

    @property
    def subtotal(self):
        return self.unit_price * self.quantity

    @property
    def total(self):
        return self.subtotal - self.discount_amount + self.delivery_fee


class SiteSettings(models.Model):
    whatsapp_number = models.CharField(max_length=20, help_text='Include country code e.g. 2348012345678')
    business_address = models.TextField(blank=True)
    default_delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    instagram_url = models.URLField(blank=True)

    class Meta:
        verbose_name = 'Site settings'
        verbose_name_plural = 'Site settings'

    def __str__(self):
        return 'Site settings'

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)
