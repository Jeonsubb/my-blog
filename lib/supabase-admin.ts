import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isAdminDatabaseConfigured = Boolean(supabaseUrl && supabaseServiceRoleKey);

let supabaseAdminClient: SupabaseClient | null = null;

export function getSupabaseAdminClient() {
  if (!isAdminDatabaseConfigured) {
    return null;
  }

  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient(supabaseUrl!, supabaseServiceRoleKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabaseAdminClient;
}
