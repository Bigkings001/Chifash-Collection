import os
import random
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from apps.products.models import Category, Product, ProductImage

class Command(BaseCommand):
    help = 'Populates the database with real categories and sample products from TKS inspiration'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        Product.objects.all().delete()
        Category.objects.all().delete()

        # Taxonomy
        catalog = {
            "Clothing": [
                "Shirts", "Shorts", "Pants", "Jackets", "Sets", 
                "Hoodies and Sweatshirts", "T-shirts and Polos", 
                "Denim", "Linen", "Native (OBA KESH)"
            ],
            "Footwear": ["Loafers", "Slippers", "Shoes"],
            "Accessories": [
                "Socks", "Scarves", "Bags", "Caps", 
                "Belts", "Neck Ties", "Eye ware"
            ]
        }

        # Base images for CDN (Unsplash)
        images = [
            "https://images.unsplash.com/photo-1594932224010-75f419c8369d?auto=format&fit=crop&q=80&w=800", # Shirt
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800", # Shorts
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800", # Pants
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800", # Jacket
            "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800", # Native/Modern
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", # Shoes
            "https://images.unsplash.com/photo-1524386057476-23c287166521?auto=format&fit=crop&q=80&w=800", # Accessory
            "https://images.unsplash.com/photo-1533733356397-bc2906e5781a?auto=format&fit=crop&q=80&w=800", # Cap
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800", # Tee
        ]

        sizes = ['S', 'M', 'L', 'XL', 'XXL']

        self.stdout.write('Creating categories and products...')
        
        for parent_name, sub_categories in catalog.items():
            parent_cat = Category.objects.create(
                name=parent_name,
                slug=slugify(parent_name)
            )

            for sub_name in sub_categories:
                sub_cat = Category.objects.create(
                    name=sub_name,
                    slug=slugify(sub_name)
                )

                # Add 5 products per sub-category
                for i in range(1, 6):
                    product_name = f"{sub_name} {random.choice(['Classic', 'Premium', 'Essential', 'Luxury', 'Heritage'])} {i}"
                    price = random.randint(15000, 85000)
                    
                    product = Product.objects.create(
                        name=product_name,
                        slug=slugify(f"{product_name}-{sub_name}"),
                        description=f"High quality {sub_name} piece designed for comfort and style. Part of our new seasonal collection.\n\nMaterial: Premium Blend\nFit: Contemporary\nCare: Dry Clean Only",
                        price=price,
                        category=sub_cat,
                        available_sizes=random.sample(sizes, k=random.randint(2, 5)),
                        in_stock=True,
                        is_featured=random.choice([True, False, False, False])
                    )

                    # Add image from CDN
                    img_url = random.choice(images)
                    # Note: Since the model uses ImageField, we'd normally need to download or handle storage.
                    # For this demo/fast rendering request, we can assume the frontend handles the URL 
                    # OR we can modify the ImageField to allow external URLs in a real production scenario.
                    # However, to be safe with Django models, I will add the URL to a field if available, 
                    # or just create the ProductImage record.
                    
                    ProductImage.objects.create(
                        product=product,
                        image_url=img_url, 
                        is_primary=True,
                        order=0
                    )

        self.stdout.write(self.style.SUCCESS('Successfully populated database with TKS-inspired data!'))
