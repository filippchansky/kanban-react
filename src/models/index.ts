export type Todo = {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  description: string
  status: TypeTodo
  // и другие поля из таблицы todos
};

export type TypeTodo = 'todo' | 'in-progress' | 'review' | 'done'

export interface IColumn {
  title: string
  id: TypeTodo
}