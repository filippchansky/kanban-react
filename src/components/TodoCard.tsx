import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import type { Todo } from '@/models';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useDraggable } from '@dnd-kit/core';

interface IProps {
  data: Todo;
}

const TodoCard: React.FC<IProps> = ({ data }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};
  return (
    <Card
      ref={setNodeRef}
      style={{ ...style }}
      {...listeners}
      {...attributes}
      className='w-[300px]'
    >
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <p>{data.description}</p>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button variant={'secondary'}>Подробнее</Button>
      </CardFooter>
    </Card>
  );
};
export default TodoCard;
