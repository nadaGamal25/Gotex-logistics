import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StoreKeeperOrders() {
    useEffect(() => {
        getOrders()
        getUsersCarriersAdmin()
      }, [])
      const [orders, setOrders] = useState([])
      const [orderId, setOrderId] = useState('');
      const [carrierId, setCarrierId] = useState('');
      const [carriersListAdmin, setCarriersListsAdmin] = useState([]);

      async function getOrders() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/get-storekeeper-orders',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
              },
            });
          const List = response.data.data;
          console.log(List)
          setOrders(List)
        } catch (error) {
          console.error(error);
        }
      }
    
      async function getSticker(orderId) {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/getorder/${orderId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
            },
          });
          console.log(response)
          const stickerUrl = `${response.data.url.replace('upload', 'https://dashboard.go-tex.net/logistics-test')}`;
          const newTab = window.open();
          newTab.location.href = stickerUrl;
        } catch (error) {
          console.error(error);
        }
      }
      async function addReciever() {
    
        try {
            const response = await axios.put(
              `https://dashboard.go-tex.net/logistics-test/order/add-order-to-receiver`,
              {
                orderId: orderId,
                carrierId: carrierId,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
                },
              }
            );
      
          if (response.status === 200) {
            console.log(response);
            window.alert('تمت اضافة المندوب بنجاح');
            closeModal()
            getOrders()
          } else {
            // setError(response.data.msg);
          }
        } catch (error) {
            // setError(error.response.data.msg)
            console.log(error.response)
            console.log(carrierId)
            console.log(orderId)
            window.alert(error.response.data.msg)
            // window.alert(error.response?.data?.msg || error.response?.data?.msg?.name || error.response?.data?.errors[0]?.msg|| "error")
        }
      }
      const handleSelectCarrier = (selectedValue) => {
        const selectedCarrier = carriersListAdmin.find(carrier =>
          `${carrier.firstName} ${carrier.lastName}, ${carrier.mobile}, ${carrier.role}` === selectedValue
        );
        if (selectedCarrier) {
          setCarrierId(selectedCarrier._id);
        }
      };
      const [showModal, setShowModal] = useState(false);

      const openModal = (orderid) => {
        setShowModal(true);
        setOrderId(orderid)
      };
    
      const closeModal = () => {
        setShowModal(false);
      }
      
      async function getUsersCarriersAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics-test/carrier/get-receivers'
          ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
            },
          }
        );
          const List = response.data.data;
          console.log(List)
          setCarriersListsAdmin(List)
        } catch (error) {
          console.error(error);
        }
      }

      const [showModal2, setShowModal2] = useState(false);

      const openModal2 = (orderid) => {
        setShowModal2(true);
        setOrderId(orderid)
      };
    
      const closeModal2 = () => {
       setShowModal2(false);
      }
      async function acceptOrder(orderid) {
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/in-store-request-status`,
        {
          orderId: orderid,
          requestStatus: "accepted"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
          },
        }
      );
      alert('تم الموافقة على استلام الشحنة')     
      closeModal2()  
      console.log(response);
      getOrders()
    } catch (error) {
      console.error(error);
      alert(error.response.data.err)
    }
  }

  async function rejectOrder(orderid) {
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/in-store-request-status`,
        {
          orderId: orderid,
          requestStatus: "rejected"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
          },
        }
      );
      alert('تم رفض استلام الشحنة')
      closeModal2()
      console.log(response);
      getOrders()
    } catch (error) {
      console.error(error);
      alert(error.response.data.err)

    }
  }
      return (
        <>
        <div className='p-5' id='content'>
    
          <div className="my-table p-4 ">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"> المرسل</th>
                  <th scope="col"> المستلم</th>
                  <th scope="col"> billcode</th>
                  <th scope="col">رقم الشحنة</th>
                  <th scope="col">طريقة الدفع</th>
                  <th scope="col">السعر </th>
                  <th scope="col">الوزن</th>
                  <th scope="col">عدد القطع</th>
                  <th scope="col">حالة الشحنة</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.sendername}</td>
                      <td>{item.recivername}</td>
                      <td>{item.billcode}</td>
                      <td>{item.ordernumber}</td>
                      <td>{item.paytype}</td>
                      <td>{item.price}</td>
                      <td>{item.weight}</td>
                      <td>{item.pieces}</td>
                      <td>{item.status}</td>
                      <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
                      <td><button className="btn btn-orange" onClick={()=>{
    openModal(item._id)
   }}>إضافة مندوب </button></td>  
   <td><button className="btn btn-primary" onClick={()=>{
    openModal2(item._id)
   }}>تأكيد استلام الشحنة </button></td>  
                    </tr>
                  );
                })}
              </tbody>
    
    
            </table>
          </div>
        
        </div>
         <Modal show={showModal} onHide={closeModal}>
         <Modal.Header >
           <Modal.Title> قم باختيار مندوب
              </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <div className='text-center'>
           <input list='myData'
           onChange={(e) => handleSelectCarrier(e.target.value)}
                                             type="text"
                                             className='my-input my-2 form-control' placeholder='اسم المندوب'
                                         />
                                      <datalist id='myData'>
   {carriersListAdmin && carriersListAdmin.map((carrier, ciIndex) => (
     <option key={ciIndex} value={`${carrier.firstName} ${carrier.lastName}, ${carrier.mobile}, ${carrier.role}`}  
       onClick={() => {
         setCarrierId(carrier._id);
       }}
     />
   ))}
 </datalist>
            </div>
         </Modal.Body>
         <Modal.Footer>
           
           
           <Button variant="success" onClick={()=>{addReciever()}}>
           إضافة مندوب تسليم
           </Button>
           <Button variant="secondary" onClick={closeModal}>
           إغلاق
           </Button>
         </Modal.Footer>
       </Modal>
       <Modal show={showModal2} onHide={closeModal2}>
         <Modal.Header >
           <Modal.Title> هل قمت باستلام هذه الشحنة من مندوب التجميع بالفعل؟ 
              </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <div className='text-center'>
           <Button className='m-1' variant="success" onClick={()=>{acceptOrder(orderId)}}>
      تأكيد
           </Button>
           <Button className='m-1' variant="danger" onClick={()=>{rejectOrder(orderId)}}>
      رفض
           </Button>
           
            </div>
         </Modal.Body>
         <Modal.Footer>
           
           
           
           <Button variant="secondary" onClick={closeModal2}>
           إغلاق
           </Button>
         </Modal.Footer>
       </Modal>
       </>
      )
    }
    