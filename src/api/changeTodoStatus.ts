import supabase from '@/configs/supabase';
import type { TypeTodo } from '@/models';

export const changeTodoStatus = async (todoId: number, newStatus: TypeTodo): Promise<void> => {
  await supabase.from('todos').update({ status: newStatus }).eq('id', todoId);
};
