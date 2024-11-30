import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://gazkezccjefamyayrtyi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhemtlemNjamVmYW15YXlydHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NzIzNDQsImV4cCI6MjA0ODU0ODM0NH0.x9In42zprdZCKGYUBGc1ZL8N0IssROrOiQAJUc6mCXo';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true // Changed to true to maintain authentication state
  }
});