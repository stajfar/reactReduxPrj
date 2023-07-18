import React from 'react';
import { Outlet } from 'react-router-dom'
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';

function Layout({search, setSearch }: any) {
    return (
        <div className='App'>
            <Header title='Application Title'></Header>
            <Nav search={search} setSearch={setSearch}></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>  
  );
}

export default Layout;