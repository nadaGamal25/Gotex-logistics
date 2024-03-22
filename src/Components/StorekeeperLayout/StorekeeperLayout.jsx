import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import StorekeeperNav from '../StorekeeperNav/StorekeeperNav';

export default function StorekeeperLayout({storekeeperData, setStorekeeperData}) {
    let navigate= useNavigate();
    function logout(){
      localStorage.removeItem('storekeeperToken');
      setStorekeeperData(null);
      navigate('/storeKeeperLogin')
    }
    return (
      <>
      <StorekeeperNav storekeeperData={storekeeperData} logout={logout}/>
      <Outlet></Outlet>
      <Footer/>  
      </>
    )
}
