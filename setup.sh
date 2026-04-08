#!/bin/bash

# Chifash Production E-Commerce Setup Script
# This script automates the initial setup

set -e

echo "🚀 Chifash E-Commerce System Setup"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker not found. Please install Docker first.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker found${NC}"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose not found. Please install Docker Compose first.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker Compose found${NC}"

# Create .env if not exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env from .env.example${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env (please edit with production values)${NC}"
else
    echo -e "${GREEN}✅ .env already exists${NC}"
fi

# Build images
echo ""
echo -e "${YELLOW}🔨 Building Docker images...${NC}"
docker-compose build

# Start services
echo ""
echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose up -d

# Wait for services to be healthy
echo ""
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Run migrations
echo ""
echo -e "${YELLOW}📦 Running migrations...${NC}"
docker-compose exec -T web python manage.py migrate

# Collect static files
echo ""
echo -e "${YELLOW}📦 Collecting static files...${NC}"
docker-compose exec -T web python manage.py collectstatic --noinput

# Create superuser
echo ""
echo -e "${YELLOW}👤 Create Django superuser${NC}"
docker-compose exec web python manage.py createsuperuser

# Summary
echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "📲 Access Points:"
echo -e "  Frontend: ${YELLOW}http://localhost:3000${NC}"
echo -e "  API: ${YELLOW}http://localhost:8000/api/${NC}"
echo -e "  Admin: ${YELLOW}http://localhost:8000/admin/${NC}"
echo -e "  Health: ${YELLOW}http://localhost/health/${NC}"
echo ""
echo "📚 Useful Commands:"
echo "  View logs:        docker-compose logs -f"
echo "  Stop services:    docker-compose down"
echo "  Database shell:   docker-compose exec db psql -U postgres -d chifash_prod"
echo "  Redis CLI:        docker-compose exec redis redis-cli"
echo "  Backend shell:    docker-compose exec web python manage.py shell"
echo ""
echo "🔗 Documentation:"
echo "  Architecture: ./ARCHITECTURE.md"
echo "  Deployment:   ./DEPLOYMENT.md"
echo ""
