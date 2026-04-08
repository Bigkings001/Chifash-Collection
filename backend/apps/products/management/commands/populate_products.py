import os
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from apps.products.models import Category, Product, ProductImage
from pathlib import Path
import random

# Detailed product descriptions for different categories
CLOTHING_DESCRIPTIONS = [
    "Experience the epitome of elegance with this premium clothing piece, meticulously crafted from the finest materials available. This sophisticated garment combines timeless design principles with contemporary styling, making it the perfect addition to any wardrobe. The superior craftsmanship ensures durability and longevity, while the luxurious fabric provides exceptional comfort throughout the day. Whether you're attending a formal event or seeking elevated everyday wear, this piece seamlessly transitions between occasions. The attention to detail in every stitch, seam, and finish reflects our commitment to excellence. Perfect for those who appreciate quality, refinement, and distinctive style. The versatile color palette complements various skin tones and personal aesthetics, while the flattering silhouette enhances natural proportions. Invest in this timeless piece that will remain a staple in your closet for years to come.",
    
    "Elevate your personal style with this exquisitely designed garment that embodies contemporary fashion sensibilities. Fabricated from premium, sustainably-sourced materials, this piece demonstrates our dedication to both style and environmental responsibility. The intricate craftsmanship showcases innovative design techniques combined with traditional tailoring methods. Every element, from the carefully selected buttons to the precision-cut seams, reflects meticulous attention to detail. This versatile piece works beautifully with both casual and formal styling options, making it an invaluable addition to a discerning wardrobe. The breathable fabric ensures comfort in various climates, while the thoughtful construction provides a flattering fit across different body types. Embrace confidence and sophistication with this statement piece that transcends seasonal trends and fleeting fashion cycles.",
    
    "This exceptional garment represents the perfect marriage of artistic vision and practical functionality. Designed for the modern individual who refuses to compromise on quality or style, it features innovative construction techniques that enhance both aesthetics and wearability. The premium fabric selection ensures optimal temperature regulation and comfort, whether you're navigating urban environments or outdoor adventures. The versatile neutral palette allows for seamless integration into existing wardrobes, while the distinctive design elements ensure you stand out from conventional fashion choices. Each piece is inspected with rigorous quality standards to guarantee exceptional craftsmanship. The sophisticated silhouette flatters various body types while providing comfortable mobility. Transform your everyday look with this investment piece that combines timeless elegance with contemporary edge.",
]

FOOTWEAR_DESCRIPTIONS = [
    "Step into sophistication with these meticulously crafted footwear pieces designed for those who appreciate quality and style. Constructed from premium materials including genuine leather and supportive synthetic components, these shoes deliver exceptional comfort without compromising aesthetics. The ergonomic design incorporates advanced insole technology to provide support during extended wear, making them suitable for both professional and casual settings. The expert craftsmanship is evident in every detail, from the reinforced heel structure to the precision-stitched seams. These versatile shoes complement a wide range of outfits and occasions, whether paired with formal business attire or casual weekend wear. The durable construction ensures longevity, making them a worthwhile investment in your wardrobe. The sophisticated design transcends seasonal trends, ensuring these shoes remain fashionable year-round. Experience the perfect combination of comfort, durability, and style.",
    
    "Discover exceptional footwear that combines innovative design with practical functionality. These shoes feature advanced construction techniques that enhance comfort and durability, utilizing premium materials selected for their superior quality and performance characteristics. The cushioned insoles and supportive arch design provide all-day comfort for active lifestyles. The breathable materials ensure optimal foot health and comfort in various environmental conditions. Whether navigating city streets or casual weekend activities, these versatile shoes adapt seamlessly to your lifestyle. The timeless aesthetic suits diverse personal styles and wardrobe preferences, making them an essential addition to any shoe collection. The impeccable attention to detail in construction guarantees exceptional durability and longevity. Invest in footwear that prioritizes both style and substance.",
    
    "Experience the pinnacle of footwear craftsmanship with these premium shoes designed for discerning individuals. The superior construction utilizes only the finest materials, including premium leather and innovative synthetic components that enhance performance and aesthetics. Each shoe undergoes rigorous quality inspection to ensure exceptional standards are maintained throughout production. The ergonomic design incorporates professional-grade comfort features including memory foam technology and supportive arches. Perfect for professional environments, social occasions, or casual everyday wear, these shoes offer remarkable versatility. The sophisticated design makes a compelling style statement while the practical construction ensures comfortable wear throughout extended periods. Elevate your footwear collection with shoes that truly represent excellence in design and execution.",
]

ACCESSORIES_DESCRIPTIONS = [
    "Enhance your personal style with this sophisticated accessory piece that adds the perfect finishing touch to any ensemble. Meticulously crafted from premium materials, this accessory demonstrates exceptional attention to detail and superior craftsmanship. The elegant design complements various aesthetic preferences while adding distinctive character to your overall look. Whether accessorizing a formal outfit or elevating casual wear, this versatile piece seamlessly integrates into diverse styling options. The durable construction ensures longevity, making it a worthwhile investment in your accessories collection. The timeless design transcends seasonal trends, ensuring enduring relevance and appeal. Perfect for those who appreciate quality, refinement, and distinctive personal expression through carefully selected accessories. This piece serves as an excellent gift option for fashion-conscious individuals seeking items of exceptional quality and aesthetic appeal.",
    
    "Discover the transformative power of this carefully curated accessory designed to elevate your personal presentation. Featuring premium materials and meticulous craftsmanship, this piece showcases innovative design elements combined with timeless elegance. The versatile aesthetic suits diverse personal styles and wardrobe preferences, making it an essential addition to any accessories collection. The practical functionality ensures this piece remains useful while adding visual appeal. Whether seeking a subtle accent piece or a bold statement accessory, this option delivers exceptional value. The expert construction guarantees durability through extended use and various environmental conditions. Invest in accessories that reflect your appreciation for quality, style, and sophisticated taste. This piece becomes an instant signature element of your personal style.",
    
    "Add sophistication and refinement to your personal aesthetic with this exceptional accessory piece. Designed for those who appreciate quality and distinctive style, this carefully crafted item demonstrates superior artisanship. The premium material selection ensures exceptional durability and visual appeal that endures through seasons and trends. The thoughtful design elements showcase innovative thinking combined with respect for classic aesthetics. Perfect for professional environments, social occasions, or casual everyday wear, this accessory offers remarkable versatility. The meticulous attention to detail in construction reflects our commitment to excellence and quality. Elevate your accessories collection with this investment piece that truly represents exceptional value and timeless appeal. This versatile item complements diverse personal styles while adding distinctive character to your overall presentation.",
]

class Command(BaseCommand):
    help = 'Populate products from images in media/products folder'

    def handle(self, *args, **options):
        # Create categories
        categories_data = [
            {'name': 'Clothing', 'slug': 'clothing'},
            {'name': 'Footwear', 'slug': 'footwear'},
            {'name': 'Accessories', 'slug': 'accessories'},
        ]

        categories = {}
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults={'name': cat_data['name']}
            )
            categories[cat_data['slug']] = cat
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created category: {cat.name}'))

        # Get media folder path
        media_root = Path('media/products')
        
        if not media_root.exists():
            self.stdout.write(self.style.ERROR(f'Media folder not found at {media_root}'))
            return

        # Get all image files
        image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
        image_files = [f for f in media_root.iterdir() 
                      if f.is_file() and f.suffix.lower() in image_extensions]

        if not image_files:
            self.stdout.write(self.style.ERROR('No image files found'))
            return

        self.stdout.write(f'Found {len(image_files)} product images')

        # Product templates with pricing
        product_templates = [
            {
                'prefix': 'Premium ',
                'suffixes': ['Shirt', 'Dress', 'Blouse', 'Top', 'Blazer', 'Cardigan', 'Sweater', 'Coat', 'Jacket', 'Suit', 'Pants', 'Skirt', 'Jeans', 'Leggings', 'Shorts'],
                'descriptions': CLOTHING_DESCRIPTIONS,
                'categories': ['clothing'],
                'price_range': (5000, 15000),
                'sizes': ['XS', 'S', 'M', 'L', 'XL', 'XXL']
            },
            {
                'prefix': 'Exclusive ',
                'suffixes': ['Sneaker', 'Heel', 'Boot', 'Loafer', 'Sandal', 'Pump', 'Slipper', 'Clog'],
                'descriptions': FOOTWEAR_DESCRIPTIONS,
                'categories': ['footwear'],
                'price_range': (3000, 12000),
                'sizes': ['35', '36', '37', '38', '39', '40', '41', '42', '43']
            },
            {
                'prefix': 'Luxury ',
                'suffixes': ['Bag', 'Belt', 'Hat', 'Scarf', 'Jewelry', 'Watch', 'Sunglasses', 'Necklace', 'Bracelet', 'Ring'],
                'descriptions': ACCESSORIES_DESCRIPTIONS,
                'categories': ['accessories'],
                'price_range': (2000, 8000),
                'sizes': ['One Size', 'S', 'M', 'L']
            }
        ]

        # Create products
        created_count = 0
        for idx, image_file in enumerate(image_files):
            try:
                template = random.choice(product_templates)
                suffix = random.choice(template['suffixes'])
                name = f"{template['prefix']}{suffix} #{idx + 1}"
                slug = f"{name.lower().replace(' ', '-').replace('#', '')}-{idx + 1}"
                
                # Create product
                product, created = Product.objects.get_or_create(
                    slug=slug,
                    defaults={
                        'name': name,
                        'description': random.choice(template['descriptions']),
                        'price': random.randint(template['price_range'][0], template['price_range'][1]),
                        'category': Category.objects.get(slug=template['categories'][0]),
                        'available_sizes': template['sizes'],
                        'units_in_stock': random.randint(5, 50),
                        'is_featured': random.random() < 0.2,  # 20% featured
                        'in_stock': True,
                    }
                )

                if created:
                    # Add image
                    with open(image_file, 'rb') as image_data:
                        image_name = f"product_{idx + 1}_{image_file.name}"
                        ProductImage.objects.create(
                            product=product,
                            image=ContentFile(image_data.read(), name=image_name),
                            is_primary=True,
                            order=0
                        )
                    created_count += 1
                    self.stdout.write(self.style.SUCCESS(f'Created product: {name}'))
                else:
                    self.stdout.write(f'Product already exists: {name}')

            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error processing {image_file.name}: {str(e)}'))
                continue

        self.stdout.write(self.style.SUCCESS(f'\nSuccessfully created {created_count} products'))
