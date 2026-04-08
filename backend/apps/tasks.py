"""
Celery tasks for Chifash
"""

from celery import shared_task
from django.core.mail import send_mass_mail
from django.template.loader import render_to_string
from apps.products.models import Product
from apps.orders.models import Order
import logging

logger = logging.getLogger(__name__)


@shared_task(bind=True, max_retries=3)
def send_order_confirmation_email(self, order_id):
    """Send order confirmation email"""
    try:
        order = Order.objects.select_related('user').get(id=order_id)
        
        context = {
            'order': order,
            'customer_name': order.user.get_full_name(),
            'order_items': order.items.all(),
        }
        
        html_message = render_to_string('emails/order_confirmation.html', context)
        
        send_mass_mail((
            (
                'Chifash Order Confirmation',
                render_to_string('emails/order_confirmation.txt', context),
                'noreply@chifash.com',
                [order.user.email],
                html_message,
            ),
        ), fail_silently=False)
        
        logger.info(f"Order confirmation sent for order {order_id}")
        
    except Order.DoesNotExist:
        logger.error(f"Order {order_id} not found")
    except Exception as exc:
        logger.error(f"Error sending order confirmation: {exc}")
        self.retry(exc=exc, countdown=60)  # Retry after 60 seconds


@shared_task(bind=True, max_retries=3)
def send_stock_alert_email(self, product_id):
    """Send low stock alert to admin"""
    try:
        product = Product.objects.get(id=product_id)
        
        if product.units_in_stock <= product.low_stock_threshold:
            context = {
                'product': product,
                'current_stock': product.units_in_stock,
            }
            
            html_message = render_to_string('emails/low_stock_alert.html', context)
            
            send_mass_mail((
                (
                    f'Low Stock Alert: {product.name}',
                    render_to_string('emails/low_stock_alert.txt', context),
                    'noreply@chifash.com',
                    ['admin@chifash.com'],
                    html_message,
                ),
            ), fail_silently=False)
            
            logger.info(f"Low stock alert sent for product {product_id}")
    
    except Product.DoesNotExist:
        logger.error(f"Product {product_id} not found")
    except Exception as exc:
        logger.error(f"Error sending stock alert: {exc}")
        self.retry(exc=exc, countdown=60)


@shared_task
def reconcile_stock():
    """Reconcile stock across all products"""
    try:
        products = Product.objects.all()
        updated_count = 0
        
        for product in products:
            # Check if stock fell below threshold
            if product.units_in_stock <= product.low_stock_threshold:
                send_stock_alert_email.delay(product.id)
                updated_count += 1
        
        logger.info(f"Stock reconciliation completed. Updated {updated_count} products")
    
    except Exception as exc:
        logger.error(f"Error during stock reconciliation: {exc}")


@shared_task
def cleanup_expired_carts():
    """Clean up old abandoned carts"""
    from datetime import timedelta
    from django.utils import timezone
    
    try:
        from apps.orders.models import Cart
        
        expiry_time = timezone.now() - timedelta(days=7)
        deleted_count, _ = Cart.objects.filter(
            created_at__lt=expiry_time,
            ordered=False
        ).delete()
        
        logger.info(f"Cleaned up {deleted_count} expired carts")
    
    except Exception as exc:
        logger.error(f"Error cleaning up carts: {exc}")
