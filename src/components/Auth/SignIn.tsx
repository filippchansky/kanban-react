import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import supabase from '@/configs/supabase';
import { useNavigate } from 'react-router';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

const SignIn: React.FC = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      setIsLoading(false);
      setMsg(error.message);
      setUserData((prev) => ({
        ...prev,
        password: '',
      }));
      return;
    }

    if (data) {
      setIsLoading(false);
      navigate('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg('');
    const { target } = e;
    setUserData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  };

  const isDisable = Boolean(userData.email.length && userData.password.length);

  console.log(isDisable, isLoading)

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3'>
        <Label htmlFor='email'>Email</Label>
        <Input
          value={userData.email}
          onChange={handleChange}
          type='email'
          id='email'
          placeholder='Email'
        />
      </div>
      <div className='flex flex-col gap-3'>
        <Label htmlFor='password'>Password</Label>
        <Input
          value={userData.password}
          onChange={handleChange}
          type='password'
          id='password'
          placeholder='Password'
          autoComplete='password'
        />
      </div>
      <Button disabled={!isDisable  || isLoading} type='submit'>
        {isLoading && <Loader2 className='animate-spin' />}
        Войти
      </Button>
      {msg && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{msg}</AlertDescription>
        </Alert>
      )}
    </form>
  );
};
export default SignIn;
