import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNav from '../AdminNav/AdminNav';
import Footer from '../Footer/Footer'

export default function AdminLayout({adminData, setAdminData}) {
    let navigate= useNavigate();
    function logout(){
      localStorage.removeItem('adminToken');
      setAdminData(null);
      navigate('/')
    }
    return (
      <>
      <AdminNav adminData={adminData} logout={logout}/>
      <Outlet></Outlet>
      <Footer/>  
      </>
    )
}
