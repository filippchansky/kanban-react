import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { Separator } from './ui/separator';
import { ModeToggle } from './ModeToggle';
import { ListTodo, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const Header: React.FC = () => {
  const { session, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut();
  };

  return (
    <>
      <header className='px-10 w-full mx-auto flex justify-between py-3.5 '>
        <Button className='flex gap-3' onClick={() => navigate('/')}>
          <ListTodo />
          <h1>Название</h1>
        </Button>
        <div className='flex gap-3'>
          <ModeToggle />
          {session ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={'link'}>
                  <User />
                  {user?.email}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto'>
                <Button variant={'destructive'} onClick={handleLogOut}>
                  <LogOut />
                  Выйти
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Button onClick={() => navigate('/auth')}>
              <LogIn />
              Войти
            </Button>
          )}
        </div>
      </header>
      <Separator />
    </>
  );
};
export default Header;
