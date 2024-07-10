import React, { useEffect, useState,useRef } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { io } from 'socket.io-client';
const URL = 'https://dashboard.go-tex.net/logistics-test';
const socket = io(URL);

export default function CarrierNav({ carrierData, logout }) {
  let navigate = useNavigate();
  const [ordersNotification ,setOrdersNotification]= useState(null)
  const [sideToggle, setSideToggle] = useState(false);
  const [notificationToggle, setNotificationToggle] = useState(false);

  useEffect(() => {
    socket.on('create-order', function (data) {
      if (carrierData.id == data.carrier) {
        // when carrier online can receive this data of order when it created 
        // this notification for this carrier need to show it in ui
        console.log(data)
        setOrdersNotification(data)
        axios.delete(`https://dashboard.go-tex.net/logistics-test/notifications/${data._id}`).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    })
  }, [socket])

  useEffect(() => {
    console.log(carrierData)
    localStorage.setItem('id', carrierData.id);
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
    // when carrier offline and back online receive this array of all orders to him need to show in ui
    axios.get(`https://dashboard.go-tex.net/logistics-test/notifications/${carrierData.id}`).then(res => {
      console.log(res.data.results)
      setOrdersNotification(res.data.results)
    }).catch(err => {
      console.log(err)
    })

    return () => {
      allSideMenu.forEach((item) => {
        item.removeEventListener('click', handleClick);
      });
    };
  }, []);

  const handleShowOrderNotification = (item,itemid) => {
    const Data = encodeURIComponent(JSON.stringify(item));
    window.open(`/carrierOrderNTFpreview?Data=${Data}`, '_blank');
    readNotification(itemid)
  };
  async function readNotification(orderid) {
    try {
      const response = await axios.delete(`https://dashboard.go-tex.net/logistics-test/notifications/${orderid}`);
      console.log(response)
      axios.get(`https://dashboard.go-tex.net/logistics-test/notifications/${carrierData.id}`).then(res => {
        console.log(res.data.results)
        setOrdersNotification(res.data.results)
      })
    } catch (error) {
      console.error(error);
    }
  }
  
  const notificationBoxRef = useRef(null);

  const handleClickOutside = (event) => {
    if (notificationBoxRef.current && !notificationBoxRef.current.contains(event.target)) {
      setNotificationToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      {/* <!-- start side navbar --> */}
      <section id="sidebar" className={sideToggle ? "hide" : ""}>
        <i class="fa-solid fa-bars pe-3 pt-3" onClick={() => setSideToggle(!sideToggle)}></i>

        {/* <a href="#" class="brand">
            <img src={logo} alt='logo'/>
        </a> */}
        {/* <div>
        <p className='iclose'><i class="fa-solid fa-xmark"></i></p>
        </div> */}
        <ul class="side-menu top">

          <li className='active'>
            <Link to="main">
              <i class="fa-solid fa-home bx"></i>
              <span class="text">الصفحة الرئيسية</span>
            </Link>
          </li>
          {carrierData?.role === "collector" ? (
            <li className=''>
              <Link to="/collectorShipments">
                <i class="fa-solid fa-box-open bx"></i>
                <span class="text">الشحنات</span>
              </Link>
            </li>) : carrierData?.role === "receiver" ?(
              <>
              <li className=''>
              <Link to="/receiverShipments">
                <i class="fa-solid fa-box-open bx"></i>
                <span class="text">الشحنات</span>
              </Link>
            </li>
            <li className=''>
              <Link to="/recieverOrdersRecieved">
              <i class="fa-solid fa-square-check bx"></i>
              <span class="text">شحنات تم تسليمها</span>
              </Link>
            </li>
              </>
            )
            : null}






        </ul>
        <ul class="side-menu">

          <li>
            <Link onClick={logout} class="logout" to='/carrierLogin'>
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
              <h4 >لوحة تحكم المندوب </h4>
            </div>
            <div className="notifications-box position-relative" dir='ltr'>
            <div className={ordersNotification ? "msg-count" : "msg-count d-none"}>
             {ordersNotification && ordersNotification.length}</div>               
              <i class="fa-solid fa-bell" onClick={() => setNotificationToggle(!notificationToggle)}></i>
              <div ref={notificationBoxRef} class={`msg-box ${notificationToggle ? 'd-block' : ''}`}  dir='rtl'>
              <p className='fw-bold'>الإشعارات</p>
              {ordersNotification && ordersNotification.map((item,index) =>{
            return(
              <div class='msg-list' key={item._id} onClick={()=>handleShowOrderNotification(item,item._id)}>
              <div class="msg-txt" >
                <span className="text-primary">شحنة جديدة</span>
                <div className="d-flex align-content-center align-items-center">
                  <img src={logo} alt="logo" />
                  <p dir='ltr'>{item.data.ordernumber} ,<br/> from : {item.data.sendername},{item.data.sendercity} , 
                  to : {item.data.recivername},{item.data.recivercity}</p>
                  </div>
                  
              </div>
          </div>
            )
          }
          )}

                    
                   
                </div>
            </div>
          </div>
        </nav>
      </section>

    </>
  )
}
