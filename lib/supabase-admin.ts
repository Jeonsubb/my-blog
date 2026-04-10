import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminWriteSecret = process.env.ADMIN_WRITE_SECRET;

export const isAdminWriteConfigured = Boolean(
  supabaseUrl && supabaseServiceRoleKey && adminWriteSecret,
);

let supabaseAdminClient: SupabaseClient | null = null;

export function getSupabaseAdminClient() {
  if (!isAdminWriteConfigured) {
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

export function isAdminSecretValid(secret: string) {
  return Boolean(adminWriteSecret) && secret === adminWriteSecret;
}
