import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router';


const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className='p-10'><Outlet/></main>
    </>
  );
};
export default Layout;
