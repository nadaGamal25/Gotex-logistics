import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function StorekeeperNav({logout}) {
    let navigate= useNavigate();
    
    const [sideToggle ,setSideToggle]=useState(false);
    useEffect(() => {
      getLateOrders()
      }, [])
  
    const [lateOrdersNumber,setLateOrdersNumber]=useState('')  
    async function getLateOrders() {
      try {
        const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/late',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
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
                <Link to="/storeShipments">
                <i class="fa-solid fa-box-open bx"></i>
                    <span class="text">الشحنات</span>
                </Link>
            </li>
            <li className=''>
                <Link to="/storeAddOrder">
                <i class="fa-solid fa-box-open bx"></i>
                    <span class="text"> اضافة شحنة للمخزن</span>
                </Link>
            </li>
            <li className=''>
              <Link to="/storeRequistsOrders">
              <i class="fa-solid fa-clipboard-check bx"></i>              
              <span class="text">   تأكيد طلب الاستلام </span>
              </Link>
            </li>
            <li className=''>
              <Link to="/storeLateOrders">
              <i class="fa-solid fa-boxes-packing bx"></i>
              <span class="text"> شحنات متأخرة  
                {lateOrdersNumber>0 ?<span className="late-orders-nums">{lateOrdersNumber}</span>:null}
              </span>
              </Link>
            </li>
            
            
            
            
            
           
        </ul>
        <ul class="side-menu">
            
        <li>
                <Link onClick={logout} class="logout" to='/storeKeeperLogin'>
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
            <h4 >لوحة تحكم امين المخزن</h4>
            </div>
            <img src={logo} alt="" />
            </div>
        </nav>
        </section>
        
    </>
      )
}
