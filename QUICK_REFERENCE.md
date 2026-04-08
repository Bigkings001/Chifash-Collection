# Quick Reference Guide for Chifash E-Commerce Architecture

## 🚀 Quick Start Commands

```bash
# Local Development
cd backend && pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# In separate terminals:
celery -A config worker --loglevel=info
celery -A config beat --loglevel=info
cd frontend && npm run dev

# Production with Docker
docker-compose up -d                          # Start all services
docker-compose logs -f                        # View real-time logs
docker-compose down                           # Stop all services
docker-compose ps                             # Check service status
```

## 🔍 Service Endpoints

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Next.js app |
| API | http://localhost:8000/api | Django REST API |
| Admin | http://localhost:8000/admin | Django admin (user: admin, pwd: admin12345) |
| Health | http://localhost/health | Load balancer health check |
| Nginx | http://localhost | Reverse proxy |

## 🗄️ Database Operations

```bash
# Access PostgreSQL
docker-compose exec db psql -U postgres -d chifash_prod

# Useful queries
SELECT * FROM products LIMIT 10;
SELECT * FROM orders ORDER BY created_at DESC;
SELECT COUNT(*) FROM products;

# Backup database
docker-compose exec db pg_dump -U postgres chifash_prod > backup.sql

# Restore database
cat backup.sql | docker-compose exec -T db psql -U postgres -d chifash_prod
```

## ⚡ Redis Operations

```bash
# Access Redis CLI
docker-compose exec redis redis-cli

# Useful commands
KEYS *                                    # List all keys
GET products:list:<hash>                  # Get cached product list
DEL products:list:<hash>                  # Clear product list cache
FLUSHDB                                   # Clear entire cache
INFO memory                               # Check memory usage
```

## 🔧 Django Management

```bash
# Create app
docker-compose exec web python manage.py startapp <app_name>

# Create migration
docker-compose exec web python manage.py makemigrations

# Apply migration
docker-compose exec web python manage.py migrate

# Create superuser
docker-compose exec web python manage.py createsuperuser

# Collect static files
docker-compose exec web python manage.py collectstatic --noinput

# Run shell
docker-compose exec web python manage.py shell
```

## 🛠️ Celery Task Management

```bash
# Check active tasks
celery -A config inspect active

# Check scheduled tasks
celery -A config inspect scheduled

# Purge all tasks
celery -A config purge

# Check worker stats
celery -A config inspect stats
```

## 📊 Performance Monitoring

```bash
# Check slow queries (in PostgreSQL)
SELECT query, calls, total_time, mean_time FROM pg_stat_statements 
ORDER BY mean_time DESC LIMIT 10;

# Monitor cache hit rate (in Python shell)
from django.core.cache import cache
cache.clear()  # Clear cache for testing

# Monitor Celery task time
from apps.tasks import send_order_confirmation_email
timing = time.time()
send_order_confirmation_email.delay(order_id=1)
print(f"Task queued in {time.time() - timing}s")
```

## 🔐 JWT Authentication

```bash
# Get access token
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin12345"}'

# Use token in requests
curl -H "Authorization: Bearer <access_token>" \
  http://localhost:8000/api/products/

# Refresh token
curl -X POST http://localhost:8000/api/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "<refresh_token>"}'
```

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | `lsof -i :8000` and kill process |
| Database connection refused | Check `docker-compose ps`, ensure db is healthy |
| Redis connection failed | `docker-compose logs redis`, restart with `docker-compose restart redis` |
| Static files not serving | Run `collectstatic`, check Nginx paths |
| Celery tasks not running | Check broker connection, verify `celery inspect active` |
| High memory usage | Check cache TTLs, reduce worker count |
| Slow queries | Check `pg_stat_statements`, add indexes |

## 📈 Scaling

```bash
# Scale Django workers to 3 instances
docker-compose up -d --scale web=3

# Scale Celery workers
docker-compose up -d --scale celery_worker=2

# Verify scaling
docker-compose ps

# Monitor load
docker stats
```

## 🔄 CI/CD Pipeline

```bash
# Test locally before pushing
cd backend && pytest -v
cd frontend && npm test

# Build images
docker-compose build

# Push to registry
docker tag chifash_web gcr.io/my-project/chifash-web:latest
docker push gcr.io/my-project/chifash-web:latest

# Deploy to production
docker pull gcr.io/my-project/chifash-web:latest
docker-compose up -d
```

## 📚 Key Configuration Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables |
| `docker-compose.yml` | Service orchestration |
| `nginx.conf` | Reverse proxy config |
| `backend/config/settings.py` | Django settings |
| `backend/config/settings_prod.py` | Production settings |
| `backend/requirements.txt` | Python dependencies |
| `frontend/next.config.ts` | Next.js configuration |
| `frontend/package.json` | Frontend dependencies |

## 🎯 Performance Optimization Checklist

- [ ] Enable Redis caching for product lists
- [ ] Add prefetch_related() to product queries
- [ ] Implement Nginx gzip compression
- [ ] Enable HTTP/2 in Nginx
- [ ] Set proper Cache-Control headers
- [ ] Use CDN for image delivery (Cloudinary)
- [ ] Enable database query logging
- [ ] Monitor slow queries with pg_stat_statements
- [ ] Implement rate limiting middleware
- [ ] Set up error tracking (Sentry)

## 🆘 Emergency Commands

```bash
# View all logs
docker-compose logs

# Restart specific service
docker-compose restart web

# Stop all services
docker-compose down

# Remove all data (⚠️ destructive)
docker-compose down -v

# Full reset
docker-compose down -v && docker-compose up -d
```

## 📞 Support

For detailed information, see:
- Architecture decisions: `ARCHITECTURE.md`
- Deployment guide: `DEPLOYMENT.md`
- API documentation: `backend/docs/`
- Frontend guide: `frontend/README.md`

---

**Last Updated**: April 6, 2026  
**Version**: 1.0
