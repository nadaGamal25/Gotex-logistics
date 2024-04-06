import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import TrackerNav from '../TrackerNav/TrackerNav';
export default function TrackerLayout({trackerData, setTrackerData}) {
    let navigate= useNavigate();
    function logout(){
      localStorage.removeItem('trackerToken');
      setTrackerData(null);
      navigate('/trackerLogin')
    }
    return (
      <>
      <TrackerNav trackerData={trackerData} logout={logout}/>
      <Outlet></Outlet>
      <Footer/>  
      </>
    )
}
