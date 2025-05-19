import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import supabase from '@/configs/supabase';

const SignUp: React.FC = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg('');

    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });
    if (error) {
      setMsg(error.message);
      return;
    }
    if (data) {
      setMsg('Успешно');
      setUserData({
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setUserData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  };

  const handleDisable = () => {
    const { confirmPassword, email, password } = userData;
    const isEmail = Boolean(email.length);
    const isPassword = Boolean(password.length);
    const isConfirmPassword = Boolean(confirmPassword === password);

    return isEmail && isPassword && isConfirmPassword;
  };

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
        <Label htmlFor='password'>Пароль</Label>
        <Input
          value={userData.password}
          onChange={handleChange}
          type='password'
          id='password'
          placeholder='Password'
          autoComplete='password'
        />
      </div>
      <div className='flex flex-col gap-3'>
        <Label htmlFor='confirmPassword'>Подтверите пароль</Label>
        <Input
          value={userData.confirmPassword}
          onChange={handleChange}
          type='password'
          id='confirmPassword'
          placeholder='Подтверите пароль'
          autoComplete='confirmPassword'
        />
      </div>
      {msg && <p>{msg}</p>}
      <Button disabled={!handleDisable()} type='submit'>
        Войти
      </Button>
    </form>
  );
};
export default SignUp;
