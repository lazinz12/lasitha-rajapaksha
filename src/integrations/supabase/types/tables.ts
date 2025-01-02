export type BlogPost = {
  Row: {
    author_id: string
    content: string
    created_at: string
    id: string
    published: boolean | null
    slug: string
    title: string
    updated_at: string
  }
  Insert: {
    author_id: string
    content: string
    created_at?: string
    id?: string
    published?: boolean | null
    slug: string
    title: string
    updated_at?: string
  }
  Update: {
    author_id?: string
    content?: string
    created_at?: string
    id?: string
    published?: boolean | null
    slug?: string
    title?: string
    updated_at?: string
  }
}

export type HomeContent = {
  Row: {
    id: number
    hero_title: string
    hero_subtitle: string
    hero_company: string
    about_text_1: string
    about_text_2: string
    created_at: string
    updated_at: string
  }
  Insert: {
    id: number
    hero_title?: string
    hero_subtitle?: string
    hero_company?: string
    about_text_1?: string
    about_text_2?: string
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: number
    hero_title?: string
    hero_subtitle?: string
    hero_company?: string
    about_text_1?: string
    about_text_2?: string
    created_at?: string
    updated_at?: string
  }
}

export type Product = {
  Row: {
    created_at: string
    description: string | null
    id: string
    image_url: string | null
    name: string
    price: number
    slug: string
    stripe_price_id: string | null
    updated_at: string
  }
  Insert: {
    created_at?: string
    description?: string | null
    id?: string
    image_url?: string | null
    name: string
    price: number
    slug: string
    stripe_price_id?: string | null
    updated_at?: string
  }
  Update: {
    created_at?: string
    description?: string | null
    id?: string
    image_url?: string | null
    name?: string
    price?: number
    slug?: string
    stripe_price_id?: string | null
    updated_at?: string
  }
}

export type Profile = {
  Row: {
    created_at: string
    email: string | null
    id: string
    is_admin: boolean | null
  }
  Insert: {
    created_at?: string
    email?: string | null
    id: string
    is_admin?: boolean | null
  }
  Update: {
    created_at?: string
    email?: string | null
    id?: string
    is_admin?: boolean | null
  }
}