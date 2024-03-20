import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import UserNav from '../UserNav/UserNav';

export default function UserLayout({userData, setUserData}) {
    let navigate= useNavigate();
    function logout(){
      localStorage.removeItem('userToken');
      setUserData(null);
      navigate('/userLogin')
    }
    return (
      <>
      <UserNav userData={userData} logout={logout}/>
      <Outlet></Outlet>
      <Footer/>  
      </>
    )
}
