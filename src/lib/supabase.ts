import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface ChatUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  type: 'user' | 'bot';
  content: string;
  language: string;
  created_at: string;
}

export async function createUser(name: string, email: string): Promise<ChatUser | null> {
  const { data, error } = await supabase
    .from('chat_users')
    .insert([{ name, email }])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return data;
}

export async function saveChatMessage(
  userId: string,
  type: 'user' | 'bot',
  content: string,
  language: string
): Promise<void> {
  const { error } = await supabase
    .from('chat_messages')
    .insert([{ user_id: userId, type, content, language }]);

  if (error) {
    console.error('Error saving chat message:', error);
  }
}

export async function getUserByEmail(email: string): Promise<ChatUser | null> {
  const { data, error } = await supabase
    .from('chat_users')
    .select()
    .eq('email', email)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function getChatHistory(userId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }

  return data || [];
}