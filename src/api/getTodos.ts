import supabase from '@/configs/supabase';
import type { Todo } from '@/models';

export const getTodos = async (userId: string): Promise<Todo[]> => {
  const { data, error } = await supabase.from('todos').select('*').eq('user_id', userId);

  if (error) {
    console.error(error);
    throw error;
  }

  return data ?? [];
};
