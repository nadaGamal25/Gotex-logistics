import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminLayout from './Components/AdminLayout/AdminLayout';
import Main from './Components/Main/Main';
import AdminUsers from './Components/AdminUsers/AdminUsers';
import RegisterUser from './Components/RegisterUser/RegisterUser';
import UserResendEmail from './Components/UserResendEmail/UserResendEmail';
import UserPasswordFirst from './Components/UserPasswordFirst/UserPasswordFirst';
import UserLogin from './Components/UserLogin/UserLogin';
import AdminCarriers from './Components/AdminCarriers/AdminCarriers';
import CarrierRegister from './Components/CarrierRegister/CarrierRegister';
import CarrierResendEmail from './Components/CarrierResendEmail/CarrierResendEmail';
import CarrierLogin from './Components/CarrierLogin/CarrierLogin';
import CarrierPasswordFirst from './Components/CarrierPasswordFirst/CarrierPasswordFirst';

function App() {
  useEffect(()=>{
    if(localStorage.getItem('adminToken') !== null){
      saveAdminData();
    }
  },[])

  const [adminData, setAdminData] = useState(null)

  async function saveAdminData(){
    let encodedToken =localStorage.getItem('adminToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setAdminData(decodedToken)
    console.log(adminData)
  }

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     window.alert('الجلسة انتهت..قم بتسجيل الدخول مرة اخرى');
  //     localStorage.removeItem('userToken');
  //     setuserData(null);
  //     window.location.href = '/';
  //   }, 60 * 60 * 1000); 

  //   return () => clearTimeout(timeout);
  // }, [userData]);

  let routers =createBrowserRouter([
    {index:true,element:<AdminLogin saveAdminData={saveAdminData} setAdminData={setAdminData} adminData={adminData}/>},
    {path:'set-password-first-time/:id',element:<UserPasswordFirst/>},
    {path:'userLogin',element:<UserLogin/>},
    {path:'carrier/set-password-first-time/:id',element:<CarrierPasswordFirst/>},
    {path:'carrierLogin',element:<CarrierLogin/>},
    
    
    {path:'/',element:<AdminLayout setAdminData={setAdminData} adminData={adminData}/> ,children:[
      {path:'main',element:<Main/>},
      {path:'adminUsers',element:<AdminUsers/>},
      {path:'registerUser',element:<RegisterUser/>},
      {path:'UserResendEmail',element:<UserResendEmail/>},
      {path:'adminCarriers',element:<AdminCarriers/>},
      {path:'carrierRegister',element:<CarrierRegister/>},
      {path:'carrierResendEmail',element:<CarrierResendEmail/>},
        
       
      ]},
      
  ])
  return (
    <> 
            <RouterProvider router={routers} />
    </>
  );
}

export default App;
