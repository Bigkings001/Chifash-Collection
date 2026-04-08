from django.core.management.base import BaseCommand
from apps.products.models import Category


class Command(BaseCommand):
    help = 'Populate categories from TheKeshs Shop list'

    def handle(self, *args, **options):
        # List of categories from thekesksshop.com
        categories_data = [
            ('Shirts', 'shirts'),
            ('Shorts', 'shorts'),
            ('Pants', 'pants'),
            ('Jackets', 'jackets'),
            ('Sets', 'sets'),
            ('Hoodies and Sweatshirts', 'hoodies-sweatshirts'),
            ('T-shirts and Polos', 't-shirts-polos'),
            ('Denim', 'denim'),
            ('Linen', 'linen'),
            ('Native (OBA KESH)', 'native-oba-kesh'),
            ('Socks', 'socks'),
            ('Scarves', 'scarves'),
            ('Bags', 'bags'),
            ('Caps', 'caps'),
            ('Belts', 'belts'),
            ('Eyewear', 'eyewear'),
            ('Loafers', 'loafers'),
            ('Slippers', 'slippers'),
            ('Shoes', 'shoes'),
        ]

        created_count = 0
        updated_count = 0

        for name, slug in categories_data:
            category, created = Category.objects.get_or_create(
                slug=slug,
                defaults={'name': name}
            )

            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created: {name}'))
            else:
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'Already exists: {name}'))

        self.stdout.write(
            self.style.SUCCESS(
                f'\n✓ Completed! Created: {created_count}, Already existed: {updated_count}'
            )
        )
