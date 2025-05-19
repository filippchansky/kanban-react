import SignIn from '@/components/Auth/SignIn';
import SignUp from '@/components/Auth/SignUp';
import { useAuth } from '@/components/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { Navigate } from 'react-router';

const AuthPage: React.FC = () => {
  const {session} = useAuth()

  if(session) {
    return <Navigate to={'/'}/>
  }

  return (
    <div className=''>
      <Tabs defaultValue='signIn' className='w-[400px] mx-auto'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='signIn'>Войти</TabsTrigger>
          <TabsTrigger value='signUp'>Регистрация</TabsTrigger>
        </TabsList>
        <TabsContent value='signIn'>
          <SignIn />
        </TabsContent>
        <TabsContent value='signUp'>
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AuthPage;
