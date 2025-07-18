export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      blog_posts: {
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
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          created_at: string
          date: string
          id: string
          issuer: string
          skills: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          issuer: string
          skills?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          issuer?: string
          skills?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      edited_photos: {
        Row: {
          created_at: string
          id: string
          image_url: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      experience: {
        Row: {
          company: string | null
          created_at: string
          duration: string
          id: string
          responsibilities: string[]
          role: string
          title: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          duration: string
          id?: string
          responsibilities: string[]
          role: string
          title: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          duration?: string
          id?: string
          responsibilities?: string[]
          role?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      home_content: {
        Row: {
          about_text_1: string
          about_text_2: string
          created_at: string
          hero_company: string
          hero_subtitle: string
          hero_title: string
          id: number
          updated_at: string
        }
        Insert: {
          about_text_1?: string
          about_text_2?: string
          created_at?: string
          hero_company?: string
          hero_subtitle?: string
          hero_title?: string
          id: number
          updated_at?: string
        }
        Update: {
          about_text_1?: string
          about_text_2?: string
          created_at?: string
          hero_company?: string
          hero_subtitle?: string
          hero_title?: string
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      photo_gallery: {
        Row: {
          alt_text: string
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          title: string
          updated_at: string
        }
        Insert: {
          alt_text: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          title: string
          updated_at?: string
        }
        Update: {
          alt_text?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
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
        Relationships: []
      }
      profiles: {
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
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          icon: string
          id: string
          skills: string[]
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          icon: string
          id?: string
          skills: string[]
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          icon?: string
          id?: string
          skills?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          platform: string
          updated_at: string
          url: string
          username: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          platform: string
          updated_at?: string
          url: string
          username: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          platform?: string
          updated_at?: string
          url?: string
          username?: string
        }
        Relationships: []
      }
      trading_idea_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          trading_idea_id: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          trading_idea_id: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          trading_idea_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trading_idea_comments_trading_idea_id_fkey"
            columns: ["trading_idea_id"]
            isOneToOne: false
            referencedRelation: "trading_ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      trading_ideas: {
        Row: {
          additional_images: string[] | null
          author_id: string | null
          comments: number | null
          created_at: string
          description: string
          id: string
          image_url: string
          likes: number | null
          published: boolean | null
          slug: string
          title: string
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          additional_images?: string[] | null
          author_id?: string | null
          comments?: number | null
          created_at?: string
          description: string
          id?: string
          image_url: string
          likes?: number | null
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          additional_images?: string[] | null
          author_id?: string | null
          comments?: number | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          likes?: number | null
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
