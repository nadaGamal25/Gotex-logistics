import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash'; // Import lodash for debouncing    

export default function StorekeeperNav({ logout }) {
  let navigate = useNavigate();
  const [lateOrdersDiff, setLateOrdersDiff] = useState('');
  const [currentLateNumber,setCurrentLateNumber]=useState('')
  const [showLateOrders, setShowLateOrders] = useState(false);
  const [sideToggle, setSideToggle] = useState(false);

  useEffect(() => {
    const debouncedGetLateOrders = _.debounce(getLateOrders, 1000); // Debounce the function
    debouncedGetLateOrders();

    return () => {
      debouncedGetLateOrders.cancel(); // Cancel the debounced function on cleanup
    };
  }, []);

  async function getLateOrders() {
    try {
      console.log('Fetching late orders');
      const response = await axios.get('https://dashboard.go-tex.net/logistics/order/late', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
        },
      });

      console.log('Response received:', response.data.orders);
      setCurrentLateNumber(response.data.orders.length)
      const currentLateOrdersNumber = response.data.orders.length;
      const storedLateOrdersNumber = localStorage.getItem('lateOrdersNumber');

      if (storedLateOrdersNumber) {
        const diff = currentLateOrdersNumber - parseInt(storedLateOrdersNumber, 10);
        setLateOrdersDiff(diff > 0 ? diff : 0);
      } else {
        setLateOrdersDiff(currentLateOrdersNumber);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleLateOrdersClick = () => {
    setShowLateOrders(true);
    localStorage.setItem('lateOrdersNumber', currentLateNumber);

  };

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
      <section id="sidebar" className={sideToggle ? 'hide' : ''}>
        <i className="fa-solid fa-bars pe-3 pt-3" onClick={() => setSideToggle(!sideToggle)}></i>
        <ul className="side-menu top">
          <li className="active">
            <Link to="/storeShipments">
              <i className="fa-solid fa-box-open bx"></i>
              <span className="text">الشحنات</span>
            </Link>
          </li>
          <li>
            <Link to="/storeWaitingOrders">
            <i class="fa-solid fa-boxes-stacked bx"></i>
            <span className="text">شحنات ف انتظار الاستلام</span>
            </Link>
          </li>
          <li>
            <Link to="/storeAddOrder">
              <i className="fa-solid fa-box-open bx"></i>
              <span className="text"> اضافة شحنة للمخزن</span>
            </Link>
          </li>
          <li>
            <Link to="/storeRequistsOrders">
              <i className="fa-solid fa-clipboard-check bx"></i>
              <span className="text"> تأكيد طلب الاستلام </span>
            </Link>
          </li>
          <li onClick={handleLateOrdersClick}>
            <Link to="/storeLateOrders">
              <i className="fa-solid fa-boxes-packing bx"></i>
              <span className="text">
                شحنات متأخرة
                {lateOrdersDiff > 0 && !showLateOrders ? (
                  <span className="late-orders-nums">{lateOrdersDiff}</span>
                ) : null}
              </span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <Link onClick={logout} className="logout" to="/storeKeeperLogin">
              <i className="fa-solid fa-right-from-bracket bx"></i>
              <span className="text fw-bold">تسجيل الخروج</span>
            </Link>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav className="pt-3">
          <div className="d-flex justify-content-between align-content-between">
            <div>
              <h4>لوحة تحكم امين المخزن</h4>
            </div>
            <img src={logo} alt="logo" />
          </div>
        </nav>
      </section>
    </>
  );
}


// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.png'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'

// export default function StorekeeperNav({logout}) {
//     let navigate= useNavigate();
//     // const [lateOrdersNumber, setLateOrdersNumber] = useState('');
//     const [lateOrdersDiff, setLateOrdersDiff] = useState('');
//     const [showLateOrders, setShowLateOrders] = useState(false);
//     const [sideToggle ,setSideToggle]=useState(false);
//     useEffect(() => {
//       getLateOrders()
//       }, [])
  
//     async function getLateOrders() {
//       try {
//         const response = await axios.get('https://dashboard.go-tex.net/logistics/order/late',
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
//           },
//         });
//         console.log(response.data.orders)
//         const currentLateOrdersNumber = response.data.orders.length;
//       const storedLateOrdersNumber = localStorage.getItem('lateOrdersNumber');

//       if (storedLateOrdersNumber) {
//         const diff = currentLateOrdersNumber - parseInt(storedLateOrdersNumber);
//         setLateOrdersDiff(diff > 0 ? diff : 0);
//       } else {
//         setLateOrdersDiff(currentLateOrdersNumber);
//       }

//       localStorage.setItem('lateOrdersNumber', currentLateOrdersNumber);
     
//       console.log(lateOrdersDiff)
//         } catch (error) {
//         console.error(error);
//       }
//     }
//     const handleLateOrdersClick = () => {
//       setShowLateOrders(true);
//     };

//   useEffect(() => {
//     const handleClick = (e) => {
//       const allSideMenu = document.querySelectorAll('.side-menu.top li a');
//       const li = e.currentTarget.parentElement;

//       allSideMenu.forEach((i) => {
//         i.parentElement.classList.remove('active');
//       });
      
//       li.classList.add('active');
//     };

//     const allSideMenu = document.querySelectorAll('.side-menu.top li a');
//     allSideMenu.forEach((item) => {
//       item.addEventListener('click', handleClick);
//     });

//     return () => {
//       allSideMenu.forEach((item) => {
//         item.removeEventListener('click', handleClick);
//       });
//     };
//   }, []);
//   return (
//     <>
//     {/* <!-- start side navbar --> */}
//     <section id="sidebar" className={sideToggle? "hide" :""}>
//     <i class="fa-solid fa-bars pe-3 pt-3" onClick={()=> setSideToggle(!sideToggle)}></i>

//         {/* <a href="#" class="brand">
//             <img src={logo} alt='logo'/>
//         </a> */}
//         {/* <div>
//         <p className='iclose'><i class="fa-solid fa-xmark"></i></p>
//         </div> */}
//         <ul class="side-menu top">
           
//             <li className='active'>
//                 <Link to="/storeShipments">
//                 <i class="fa-solid fa-box-open bx"></i>
//                     <span class="text">الشحنات</span>
//                 </Link>
//             </li>
//             <li className=''>
//                 <Link to="/storeAddOrder">
//                 <i class="fa-solid fa-box-open bx"></i>
//                     <span class="text"> اضافة شحنة للمخزن</span>
//                 </Link>
//             </li>
//             <li className=''>
//               <Link to="/storeRequistsOrders">
//               <i class="fa-solid fa-clipboard-check bx"></i>              
//               <span class="text">   تأكيد طلب الاستلام </span>
//               </Link>
//             </li>
//             <li className="" onClick={()=>handleLateOrdersClick()}>
//             <Link to="/storeLateOrders">
//               <i className="fa-solid fa-boxes-packing bx"></i>
//               <span className="text">
//                 شحنات متأخرة
//                 {lateOrdersDiff > 0 ? <span hidden={showLateOrders}  className="late-orders-nums">{lateOrdersDiff}</span> : null}
//               </span>
//             </Link>
//           </li>
            
            
            
            
            
           
//         </ul>
//         <ul class="side-menu">
            
//         <li>
//                 <Link onClick={logout} class="logout" to='/storeKeeperLogin'>
//                 <i class="fa-solid fa-right-from-bracket bx"></i>
//                     <span class="text fw-bold">تسجيل الخروج</span>
//                 </Link>
//             </li>
//         </ul>
//     </section>
    
//         {/* <!-- end side navbar --> */}
//     <section id="content">
//         <nav class="pt-3">
//           <div className="d-flex justify-content-between align-content-between">
//             <div>
//             <h4 >لوحة تحكم امين المخزن</h4>
//             </div>
//             <img src={logo} alt="" />
//             </div>
//         </nav>
//         </section>
        
//     </>
//       )
// }

