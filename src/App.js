import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
// import UserForgetPass from './Components/UserForgetPass/UserForgetPass';
import CarrierForgetPass from './Components/CarrierForgetPass/CarrierForgetPass';
import UserLayout from './Components/UserLayout/UserLayout';
import UserCreateOrder from './Components/UserCreateOrder/UserCreateOrder';
import UserOrders from './Components/UserOrders/UserOrders';
import StoreKeeperRegister from './Components/StoreKeeperRegister/StoreKeeperRegister';
import StoreKeeperLogin from './Components/StoreKeeperLogin/StoreKeeperLogin';
import StoreKeeperFirstPass from './Components/StoreKeeperFirstPass/StoreKeeperFirstPass';
import StorekeeperLayout from './Components/StorekeeperLayout/StorekeeperLayout';
import StoreAddOrder from './Components/StoreAddOrder/StoreAddOrder';
import ForgetPasswordProcess from './Components/ForgetPasswordProcess/ForgetPasswordProcess ';
import CarrierForgetpassProcess from './Components/CarrierForgetpassProcess/CarrierForgetpassProcess';
import StoreShipments from './Components/StoreShippments/StoreShipments';
import CollectorShipments from './Components/CollectorShipments/CollectorShipments';
import CarrieLayout from './Components/CarrierLayout/CarrieLayout';
import ReceiverShipments from './Components/ReceiverShipments/ReceiverShipments';
import BarcodeScanner from './Components/BarcodeScanner/BarcodeScanner';
import AdminOrders from './Components/AdminOrders/AdminOrders';
import StoreKeeperOrders from './Components/StoreKeeperOrders';
import TrackOrder from './Components/TrackOrder/TrackOrder';
import TrackerRegister from './Components/TrackerRegister/TrackerRegister';
import TrackerLayout from './Components/TrackerLayout/TrackerLayout';
import TrackerOrders from './Components/TrackerOrders/TrackerOrders';
import TrackerPasswordFirst from './Components/TrackerPasswordFirst/TrackerPasswordFirst';
import TrackerLogin from './Components/TrackerLogin/TrackerLogin';
import TrackerForgetPassProcess from './Components/TrackerForgetPassProcess/TrackerForgetPassProcess';
import CarrierOrderNTFpreview from './Components/CarrierOrderNTFpreview/CarrierOrderNTFpreview';

function App() {
  useEffect(() => {
    if (localStorage.getItem('adminToken') !== null) {
      saveAdminData();
    }
  }, [])
  // useEffect(()=>{

  //   if(localStorage.getItem('userToken') !== null){
  //     saveUserData();
  //   }
  // },[])
  const [adminData, setAdminData] = useState(null)

  async function saveAdminData() {
    let encodedToken = localStorage.getItem('adminToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setAdminData(decodedToken)
    console.log(adminData)
  }

  const [userData, setUserData] = useState(null)
  async function saveUserData() {
    let encodedToken = localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setUserData(decodedToken)
    console.log(userData)
  }

  const [storekeeperData, setStorekeeperData] = useState(null)
  async function saveStorekeeperData() {
    let encodedToken = localStorage.getItem('storekeeperToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setStorekeeperData(decodedToken)
    console.log(storekeeperData)

  }

  const [carrierData, setCarrierData] = useState(null)
  async function saveCarrierData() {
    let encodedToken = localStorage.getItem('carrierToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setCarrierData(decodedToken)
    console.log(carrierData)

  }
  const [trackerData, setTrackerData] = useState(null)
  async function saveTrackerData() {
    let encodedToken = localStorage.getItem('trackerToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setTrackerData(decodedToken)
    console.log(carrierData)

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
 
  let routers = createBrowserRouter([
    { index: true, element: <AdminLogin saveAdminData={saveAdminData} setAdminData={setAdminData} adminData={adminData} /> },
    { path: 'set-password-first-time/:id', element: <UserPasswordFirst /> },
    { path: 'userLogin', element: <UserLogin saveUserData={saveUserData} /> },
    { path: 'carrier/set-password-first-time/:id', element: <CarrierPasswordFirst /> },
    { path: 'carrierLogin', element: <CarrierLogin saveCarrierData={saveCarrierData} /> },
    { path: 'forgetPasswordProcess', element: <ForgetPasswordProcess /> },
    { path: 'carrierForgetpassProcess', element: <CarrierForgetpassProcess /> },
    { path: 'trackerForgetpassProcess', element: <TrackerForgetPassProcess /> },
    // {path:'userForgetPass',element:<UserForgetPass/>},
    { path: 'carrierForgetPass', element: <CarrierForgetPass /> },
    { path: 'barcode', element: <BarcodeScanner /> },
    { path: 'trackOrder', element: <TrackOrder /> },
    { path: 'tracker/set-password/:id', element: <TrackerPasswordFirst /> },
    { path: 'trackerLogin', element: <TrackerLogin saveTrackerData={saveTrackerData} /> },

    { path: 'storeKeeperLogin', element: <StoreKeeperLogin saveStorekeeperData={saveStorekeeperData} /> },
    { path: 'store-keeper/set-password/:id', element: <StoreKeeperFirstPass /> },
    { path: 'carrierOrderNTFpreview', element: <CarrierOrderNTFpreview /> },

    {
      path: '/', element: <AdminLayout setAdminData={setAdminData} adminData={adminData} />, children: [
        // {path:'main',element:<Main/>},
        { path: 'adminUsers', element: <AdminUsers /> },
        { path: 'registerUser', element: <RegisterUser /> },
        { path: 'UserResendEmail', element: <UserResendEmail /> },
        { path: 'adminCarriers', element: <AdminCarriers /> },
        { path: 'carrierRegister', element: <CarrierRegister /> },
        { path: 'carrierResendEmail', element: <CarrierResendEmail /> },
        { path: 'storeKeeperRegister', element: <StoreKeeperRegister /> },
        { path: 'adminOrders', element: <AdminOrders /> },
        { path: 'trackerRegister', element: <TrackerRegister /> },


      ]
    },
    {
      path: '/', element: <UserLayout setUserData={setUserData} userData={userData} />, children: [
        { path: 'userCreateOrder', element: <UserCreateOrder /> },
        { path: 'userOrders', element: <UserOrders /> },

        // {path:'main',element:<Main/>},


      ]
    },
    {
      path: '/', element: <StorekeeperLayout setStorekeeperData={setStorekeeperData} storekeeperData={storekeeperData} />, children: [
        { path: 'storeAddOrder', element: <StoreAddOrder /> },
        { path: 'storeShipments', element: <StoreKeeperOrders /> },

        // {path:'main',element:<Main/>},


      ]
    },
    {
      path: '/', element: <CarrieLayout setCarrierData={setCarrierData} carrierData={carrierData} />, children: [
        { path: 'collectorShipments', element: <CollectorShipments /> },
        { path: 'receiverShipments', element: <ReceiverShipments /> },
        { path: 'main', element: <Main /> },


      ]
    },
    {
      path: '/', element: <TrackerLayout setTrackerData={setTrackerData} trackerData={trackerData} />, children: [
        { path: 'trackerOrders', element: <TrackerOrders /> },


      ]
    },

  ])
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
