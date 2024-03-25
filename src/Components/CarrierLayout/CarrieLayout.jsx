import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import CarrierNav from '../CarrierNav/CarrierNav';

export default function CarrieLayout({setCarrierData,carrierData}) {
    let navigate= useNavigate();
    function logout(){
      localStorage.removeItem('carrierToken');
      setCarrierData(null);
      navigate('/carrierLogin')
    }
    return (
      <>
      <CarrierNav carrierData={carrierData} logout={logout}/>
      <Outlet></Outlet>
      <Footer/>  
      </>
    )
}
