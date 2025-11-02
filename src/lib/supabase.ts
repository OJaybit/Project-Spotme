// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Upload a file to a storage bucket. */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File | Blob
) {
  // IMPORTANT: path must NOT start with a leading slash
  return await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
}

/** Return a public URL for a storage file (adds `/public/` automatically). */
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  // This returns something like: .../storage/v1/object/public/<bucket>/<path>
  return data.publicUrl;
}