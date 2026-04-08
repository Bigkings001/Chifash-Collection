"""
Health check endpoint for monitoring
"""

from django.http import JsonResponse
from django.views import View
from django.db import connection
from django.core.cache import cache


class HealthCheckView(View):
    """Health check for load balancer and monitoring"""
    
    def get(self, request):
        health_status = {
            'status': 'healthy',
            'checks': {}
        }
        
        # Database check
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            health_status['checks']['database'] = 'ok'
        except Exception as e:
            health_status['checks']['database'] = f'error: {str(e)}'
            health_status['status'] = 'unhealthy'
        
        # Cache check
        try:
            cache.set('health_check', 'ok', 60)
            cache.get('health_check')
            health_status['checks']['cache'] = 'ok'
        except Exception as e:
            health_status['checks']['cache'] = f'error: {str(e)}'
            health_status['status'] = 'degraded'
        
        # Return appropriate status code
        status_code = 200 if health_status['status'] == 'healthy' else 503
        
        return JsonResponse(health_status, status=status_code)
