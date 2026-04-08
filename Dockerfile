# Base stage with dependencies
FROM python:3.12-slim as builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt


# Final stage
FROM python:3.12-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy Python dependencies from builder
COPY --from=builder /root/.local /root/.local

# Set environment variables
ENV PATH=/root/.local/bin:$PATH \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Copy application
COPY . .

# Create log directory
RUN mkdir -p /var/log/chifash

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/health/', timeout=5)"

# Expose port
EXPOSE 8000

# Run with gunicorn
CMD ["gunicorn", \
     "--workers=4", \
     "--worker-class=sync", \
     "--worker-tmp-dir=/dev/shm", \
     "--bind=0.0.0.0:8000", \
     "--access-logfile=-", \
     "--error-logfile=-", \
     "--log-level=info", \
     "config.wsgi:application"]
