import { useAuth } from './components/context/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos } from './api/getTodos';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import CreateTodo from './components/CreateTodo';
import type { IColumn, TypeTodo } from './models';
import KanbanColumn from './components/KanbanColumn';
import { changeTodoStatus } from './api/changeTodoStatus';

const column: IColumn[] = [
  { id: 'todo', title: 'Задачи' },
  {
    id: 'in-progress',
    title: 'В процессе',
  },
  {
    id: 'review',
    title: 'На проверке',
  },
  {
    id: 'done',
    title: 'Выполнено',
  },
];

function App() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ['todos', user?.id],
    queryFn: () => getTodos(user!.id),
    enabled: !!user,
  });

  const { mutate } = useMutation({
    mutationFn: ({ id, status }: { id: number; status: TypeTodo }) => changeTodoStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleDrag = (e: DragEndEvent) => {
    console.log(e);
    console.log(e.over?.id, e.active.id);
    const todoId = e.active.id as number;
    const newStatus = e.over?.id as TypeTodo;
    mutate({ id: todoId, status: newStatus });
  };

  console.log(data);

  return (
    <>
      <CreateTodo />
      {/* {data?.map(item => (
        <h1 key={item.id}>{item.title}</h1>
      ))} */}
      <DndContext onDragEnd={handleDrag}>
        <div className='flex justify-around mt-10'>
          {column.map((item) => (
            <KanbanColumn
              column={item}
              key={item.id}
              data={data?.filter((todo) => todo.status === item.id)}
            />
          ))}
        </div>
      </DndContext>
    </>
  );
}

export default App;
