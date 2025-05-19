import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import type { IColumn, Todo } from '@/models';
import { Separator } from './ui/separator';
import KanbanColumnHeader from './KanbanColumnHeader';
import TodoCard from './TodoCard';
import { useDroppable } from '@dnd-kit/core';

interface IProps {
  column: IColumn;
  data: Todo[] | undefined;
}


const KanbanColumn: React.FC<IProps> = ({ column, data }) => {

  const { setNodeRef} = useDroppable({
    id: column.id
  })

  return (
    <Card  ref={setNodeRef} className='w-[350px] bg-[oklch(0.3,0,0)]'>
      <CardHeader>
        <KanbanColumnHeader title={column.title} />
        <CardDescription>Какой-то мотивирующий текст</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        {data?.map((item) => (
          <TodoCard key={item.id} data={item} />
        ))}
      </CardContent>
    </Card>
  );
};
export default KanbanColumn;
