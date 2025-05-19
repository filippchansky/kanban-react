import supabase from '@/configs/supabase';
import type { Todo } from '@/models';

export const createTodo = async (newTodo: Pick<Todo, 'description' | 'title' | 'user_id'>) => {
  try {
    const res = await supabase.from('todos').insert([newTodo]);
    return res;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
