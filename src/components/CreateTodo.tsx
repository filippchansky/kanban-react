import React, { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useAuth } from './context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '@/api/createTodo';

const CreateTodo: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { mutate } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onSettled: (_data, error) => {
      if (!error) {
        setDescription('');
        setTitle('');
      }
    },
  });

  const handleCreate = () => {
    if (user?.id) {
      mutate({
        description: description,
        title: title,
        user_id: user?.id,
      });
    }
  };

  const handleDisabled = () => {
    const disabled = Boolean(title.length && description && user?.id)
    return disabled
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Создать задачу</Button>
      </SheetTrigger>
      <SheetContent className='w-[600px]'>
        <SheetHeader>
          <SheetTitle>Создание задачи</SheetTitle>
          <SheetDescription>
            Вы можете создать новую задачу. Нажмите сохранить после того как закончите.
          </SheetDescription>
        </SheetHeader>
        <div className='px-4 flex flex-col gap-5'>
          <div>
            <Label className='mb-2' htmlFor='title'>
              Заголовок
            </Label>
            <Input
              placeholder='Введите Заголовок'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label className='mb-2' htmlFor='description'>
              Описание
            </Label>
            <Textarea
              placeholder='Введите Описание'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button disabled={!handleDisabled()} onClick={handleCreate} type='submit'>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default CreateTodo;
