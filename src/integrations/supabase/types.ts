export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      book_additions_log: {
        Row: {
          book_ids: string[]
          books_count: number
          created_at: string
          id: string
          operation_details: Json | null
          operation_type: string
          status: string
          user_session: string | null
        }
        Insert: {
          book_ids: string[]
          books_count?: number
          created_at?: string
          id?: string
          operation_details?: Json | null
          operation_type: string
          status?: string
          user_session?: string | null
        }
        Update: {
          book_ids?: string[]
          books_count?: number
          created_at?: string
          id?: string
          operation_details?: Json | null
          operation_type?: string
          status?: string
          user_session?: string | null
        }
        Relationships: []
      }
      book_pages: {
        Row: {
          book_id: string
          content: string | null
          created_at: string
          id: string
          page_number: number
        }
        Insert: {
          book_id: string
          content?: string | null
          created_at?: string
          id?: string
          page_number: number
        }
        Update: {
          book_id?: string
          content?: string | null
          created_at?: string
          id?: string
          page_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "book_pages_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          age_range: string | null
          author: string
          category: string
          cover_url: string | null
          created_at: string
          description: string | null
          download_url: string | null
          id: string
          isbn: string | null
          pages: number
          publish_year: number | null
          rating: number | null
          title: string
          updated_at: string
        }
        Insert: {
          age_range?: string | null
          author: string
          category: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          download_url?: string | null
          id?: string
          isbn?: string | null
          pages?: number
          publish_year?: number | null
          rating?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          age_range?: string | null
          author?: string
          category?: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          download_url?: string | null
          id?: string
          isbn?: string | null
          pages?: number
          publish_year?: number | null
          rating?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      interactive_stories: {
        Row: {
          age_range: string | null
          category: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          estimated_time: number | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          age_range?: string | null
          category?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_time?: number | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          age_range?: string | null
          category?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_time?: number | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      story_choices: {
        Row: {
          choice_text: string
          id: string
          next_node_id: string
          node_id: string
          order_index: number | null
          required_item: string | null
          score_impact: number | null
          sound_effect: string | null
        }
        Insert: {
          choice_text: string
          id?: string
          next_node_id: string
          node_id: string
          order_index?: number | null
          required_item?: string | null
          score_impact?: number | null
          sound_effect?: string | null
        }
        Update: {
          choice_text?: string
          id?: string
          next_node_id?: string
          node_id?: string
          order_index?: number | null
          required_item?: string | null
          score_impact?: number | null
          sound_effect?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_choices_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      story_interactions: {
        Row: {
          correct_answer: string | null
          id: string
          interaction_type: string
          items: Json | null
          node_id: string
          prompt: string
          reward_score: number | null
        }
        Insert: {
          correct_answer?: string | null
          id?: string
          interaction_type: string
          items?: Json | null
          node_id: string
          prompt: string
          reward_score?: number | null
        }
        Update: {
          correct_answer?: string | null
          id?: string
          interaction_type?: string
          items?: Json | null
          node_id?: string
          prompt?: string
          reward_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "story_interactions_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      story_nodes: {
        Row: {
          background_gradient: string | null
          background_image: string | null
          content: string
          created_at: string
          ending_type: string | null
          id: string
          is_ending: boolean | null
          node_id: string
          score_impact: number | null
          sound_effect: string | null
          story_id: string
          title: string | null
        }
        Insert: {
          background_gradient?: string | null
          background_image?: string | null
          content: string
          created_at?: string
          ending_type?: string | null
          id?: string
          is_ending?: boolean | null
          node_id: string
          score_impact?: number | null
          sound_effect?: string | null
          story_id: string
          title?: string | null
        }
        Update: {
          background_gradient?: string | null
          background_image?: string | null
          content?: string
          created_at?: string
          ending_type?: string | null
          id?: string
          is_ending?: boolean | null
          node_id?: string
          score_impact?: number | null
          sound_effect?: string | null
          story_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_nodes_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "interactive_stories"
            referencedColumns: ["id"]
          },
        ]
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
