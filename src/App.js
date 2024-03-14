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
    {path:'user/set-password-first-time/:id',element:<UserPasswordFirst/>},
    {path:'userLogin',element:<UserLogin/>},
    
    
    {path:'/',element:<AdminLayout setAdminData={setAdminData} adminData={adminData}/> ,children:[
      {path:'main',element:<Main/>},
      {path:'adminUsers',element:<AdminUsers/>},
      {path:'registerUser',element:<RegisterUser/>},
      {path:'UserResendEmail',element:<UserResendEmail/>},
        
       
      ]},
      
  ])
  return (
    <> 
            <RouterProvider router={routers} />
    </>
  );
}

export default App;
