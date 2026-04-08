const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getProducts(params?: { category?: string; featured?: boolean }) {
  const query = new URLSearchParams()
  if (params?.category) query.set('category__slug', params.category)
  if (params?.featured) query.set('is_featured', 'true')
  const res = await fetch(`${API_URL}/products/?${query}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function getProduct(slug: string) {
  const res = await fetch(`${API_URL}/products/${slug}/`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Product not found')
  return res.json()
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/products/categories/`, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}
