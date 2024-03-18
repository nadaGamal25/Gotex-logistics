import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

export default function AdminNav({logout}) {
  let navigate= useNavigate();
    
    const [sideToggle ,setSideToggle]=useState(false);

  

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
                <Link to="/registerUser">
                    <i class="fa-solid fa-user-plus bx"></i>
                    <span class="text">تسجيل مدخلة</span>
                </Link>
            </li>
            <li >
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
            </li>
            
            
            
           
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
        
    </>  )
}
