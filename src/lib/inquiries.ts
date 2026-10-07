import { supabase } from "@/lib/supabase"
import type { InquiryInsert } from "@/types/database"

export async function submitInquiry(payload: InquiryInsert) {
  if (!supabase) {
    return {
      ok: false as const,
      reason: "not_configured" as const,
      message:
        "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.",
    }
  }

  const { error } = await supabase.from("inquiries").insert(payload)

  if (error) {
    return {
      ok: false as const,
      reason: "request_failed" as const,
      message: error.message,
    }
  }

  return { ok: true as const }
}
