import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function AdminNav({logout}) {
  let navigate= useNavigate();
    
    const [sideToggle ,setSideToggle]=useState(false);
    // useEffect(() => {
    //   getLateOrders()
    //   }, [])
  
    const [lateOrdersNumber,setLateOrdersNumber]=useState('')  
    async function getLateOrders() {
      try {
        const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/late',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        console.log(response.data.orders)
        setLateOrdersNumber(response.data.orders.length)
      } catch (error) {
        console.error(error);
      }
    }
  

  useEffect(() => {
    const handleClick = (e) => {
      const allSideMenu = document.querySelectorAll('.side-menu.top li a');
      const li = e.currentTarget.parentElement;

      allSideMenu.forEach((i) => {
        i.parentElement.classList.remove('active');
      });
      
      li.classList.add('active');
    };

    const allSideMenu = document.querySelectorAll('.side-menu.top li a');
    allSideMenu.forEach((item) => {
      item.addEventListener('click', handleClick);
    });

    return () => {
      allSideMenu.forEach((item) => {
        item.removeEventListener('click', handleClick);
      });
    };
  }, []);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <>
    {/* <!-- start side navbar --> */}
    <section id="sidebar" className={sideToggle? "hide" :""}>
    <i class="fa-solid fa-bars pe-3 pt-3" onClick={()=> setSideToggle(!sideToggle)}></i>

        {/* <a href="#" class="brand">
            <img src={logo} alt='logo'/>
        </a> */}
        {/* <div>
        <p className='iclose'><i class="fa-solid fa-xmark"></i></p>
        </div> */}
        <ul class="side-menu top">
           
            
            <li className='active'>
                <Link to="/adminUsers">
                    <i class="fa-solid fa-users bx"></i>
                    <span class="text">المستخدمين</span>
                </Link>
            </li>
            <li >
                <Link to='#' onClick={openModal}>
                    <i class="fa-solid fa-user-plus bx"></i>
                    <span class="text">تسجيل مستخدم</span>
                </Link>
            </li>
            <li className=''>
              <Link to="/adminOrders">
                <i class="fa-solid fa-box-open bx"></i>
                <span class="text">الشحنات</span>
              </Link>
            </li>
            <li className=''>
              <Link to="/adminOrdersWithoutCarrier">
                <i class="fa-solid fa-box-open bx"></i>
                <span class="text">شحنات بدون مندوب</span>
              </Link>
            </li>
            <li className=''>
              <Link to="/adminOrdersProblems">
              <i class="fa-solid fa-truck-ramp-box bx"></i>
              <span class="text"> شحنات بها مشكلة </span>
              </Link>
            </li>
            <li className=''>
              <Link to="/adminLateOrders">
              <i class="fa-solid fa-boxes-packing bx"></i>
              <span class="text"> شحنات متأخرة 
              {/* {lateOrdersNumber>0 ?<span className="late-orders-nums">{lateOrdersNumber}</span>:null} */}
                 </span>
              </Link>
            </li>
            <li className=''>
              <Link to="/apikeyUsers">
              <i class="fa-solid fa-key bx"></i>
              <span class="text">api-key(user-integrate)</span>
              </Link>
            </li>
            {/* <li >
                <Link to="/UserResendEmail">
                <i class="fa-solid fa-envelope-circle-check bx"></i>
               <span class="text">إعادة إرسال إيميل للمدخلة</span>
                </Link>
            </li>
            <li >
                <Link to="/carrierRegister">
                    <i class="fa-solid fa-user-plus bx"></i>
                    <span class="text">تسجيل مندوب</span>
                </Link>
            </li>
            <li className=''>
                <Link to="/adminCarriers">
                    <i class="fa-solid fa-users bx"></i>
                    <span class="text">المناديب</span>
                </Link>
            </li>
            
            <li >
                <Link to="/carrierResendEmail">
                <i class="fa-solid fa-envelope-circle-check bx"></i>
               <span class="text">إعادة إرسال إيميل للمندوب</span>
                </Link>
            </li> */}
            
            
            
           
        </ul>
        <ul class="side-menu">
            
        <li>
                <Link onClick={logout} class="logout" to='/'>
                <i class="fa-solid fa-right-from-bracket bx"></i>
                    <span class="text fw-bold">تسجيل الخروج</span>
                </Link>
            </li>
        </ul>
    </section>
    
        {/* <!-- end side navbar --> */}
    <section id="content">
        <nav class="pt-3">
          <div className="d-flex justify-content-between align-content-between">
            <div>
            <h4 >لوحة تحكم الأدمن</h4>
            </div>
            <img src={logo} alt="" />
            </div>
        </nav>
        </section>
        <Modal show={showModal} onHide={closeModal}>
        <Modal.Header >
          <Modal.Title>تسجيل مستخدم
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
          <Link to="/registerUser" onClick={closeModal} className="btn btn-success m-2">تسجيل مدخلة </Link>
          <Link to="/carrierRegister" onClick={closeModal} className="btn btn-orange m-2">تسجيل مندوب  </Link>            
          <Link to="/storeKeeperRegister" onClick={closeModal} className="btn btn-primary m-2">تسجيل أمين مخزن  </Link>            
          <Link to="/trackerRegister" onClick={closeModal} className="btn btn-secondary m-2">تسجيل tracker   </Link>            
          <Link to="/integrateUserRegister" onClick={closeModal} className="btn btn-info m-2">تسجيل integrate-user   </Link>            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={closeModal}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </>  )
}
