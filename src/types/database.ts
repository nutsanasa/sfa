export type Inquiry = {
  id: string
  name: string
  email: string
  company: string | null
  budget: string | null
  project_type: string | null
  message: string
  created_at: string
}

export type InquiryInsert = {
  name: string
  email: string
  company?: string | null
  budget?: string | null
  project_type?: string | null
  message: string
}

export type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: Inquiry
        Insert: InquiryInsert
        Update: Partial<InquiryInsert>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
