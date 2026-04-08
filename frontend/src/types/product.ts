export interface ProductImage {
  id: number
  image: string | null
  image_url: string | null
  is_primary: boolean
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface Product {
  id: number
  name: string
  slug: string
  price: string | number
  originalPrice?: string | number
  description?: string
  material?: string
  fit?: string
  care_instructions?: string
  category: Category
  primary_image: string | null
  images?: ProductImage[]
  available_sizes: string[]
  stock: number
  in_stock?: boolean
  is_featured?: boolean
  created_at?: string
}
