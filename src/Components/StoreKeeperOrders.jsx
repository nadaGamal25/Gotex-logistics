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
      const [recieverName, setRecieverName] = useState('');
      async function getSearchOrders() {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-testorder/order/get-storekeeper-orders`, {
            params: {
              receiver: recieverName,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
            },
          });
      
          setOrders(response.data.data);
         
          console.log(response)
          
        } catch (error) {
          console.error('Error fetching students:', error);
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
          const stickerUrl = `${response.data.url.replace('upload', 'https://dashboard.go-tex.net/logistics-test/upload')}`;
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

      const [selectedFiles, setSelectedFiles] = useState([]);
      function handleFileChange(event) {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
      }

      async function acceptOrder(orderid) {
        console.log(selectedFiles)
    const formData = new FormData();
    formData.append('orderId', orderid);
    formData.append('requestStatus', "accepted");
    selectedFiles.forEach((file) => {
      formData.append('images.inStoreRequestStatus', file);
    });
    
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/in-store-request-status`,
         formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
          },
        }
      );
      alert('تم الموافقة على استلام الشحنة')     
      closeModal2()  
      console.log(response);
      setSelectedFiles([]);
      getOrders()
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg)
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
      alert(error.response.data.msg)

    }
  }

  // problem order
  const [selectedFilesProblem, setSelectedFilesProblem] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [descProblem , setDescProblem]=useState([]);
  async function problemOrder(orderid) {
    console.log(selectedFilesProblem)
    const formData = new FormData();
    formData.append('orderId', orderid);
    formData.append('description', descProblem);
    
    selectedFilesProblem.forEach((file) => {
      formData.append('problem.images', file);
    });
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/problem-request`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModalProblem();
      setSelectedFilesProblem([]);
      window.alert('تم الابلاغ عن المشكلة')
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChangeProblem(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesProblem((prevFiles) => [...prevFiles, ...files]);
  }
  
  const [showModalProblem, setShowModalProblem] = useState(false);

  const openModalProblem = (orderid) => {
    setShowModalProblem(true);
    setSelectedID(orderid)
  };

  const closeModalProblem = () => {
    setShowModalProblem(false);
    setSelectedFilesProblem([])
  };

  async function takeOrderMoney(orderId) {
    try {
      const token = localStorage.getItem('storekeeperToken');
      if (!token) {
        throw new Error('Token not found');
      }
  
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/take-order-money/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
      getOrders();
      alert("لقد تم التأكيد بنجاح")
      
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
      return (
        <>
        <div className='p-5' id='content'>
          <div className="p-2 count-box">
            <span>عدد الشحنات : {orders.filter((order)=> order.status == 'in store').length}</span>
          </div>
          <div className="bg-b p-2 mb-4 mt-3">
      <div className="row">
        
        <div className="col-md-4">
          <input className='form-control m-1' 
          type="search" placeholder=" اسم مندوب التسليم"
          onChange={(e) => setRecieverName(e.target.value)}
          />
        </div>
        <div className="col-md-8">
        <button className="btn btn-dark m-1" onClick={getSearchOrders}>
  بحث
 </button>  
 <button className="btn btn-dark m-1" onClick={getOrders}>عرض جميع الشحنات  </button>

 </div>
        
        
       
        
        
      </div>
    </div>
    
          <div className="my-table p-4 mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"> المرسل</th>
                  <th scope="col"> المستلم</th>
                  {/* <th scope="col"> billcode</th> */}
                  <th scope="col">رقم الشحنة</th>
                  <th scope="col">طريقة الدفع</th>
                  {/* <th scope="col">السعر </th> */}
                  <th scope="col">الوزن</th>
                  <th scope="col">عدد القطع</th>
                  <th scope="col">حالة الشحنة</th>
                  <th scope="col">مندوب التسليم</th>
                  <th scope="col"></th>
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
                      {/* <td>{item.billcode}</td> */}
                      <td>{item.ordernumber}</td>
                      <td>{item.paytype}</td>
                      {/* <td>{item.price}</td> */}
                      <td>{item.weight}</td>
                      <td>{item.pieces}</td>
                      <td>{item.status}</td>
                      {item.deliveredby?<td>{item.deliveredby.fullName}</td>:<td>_</td>}
                      <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
                      {item.status == 'in store' && !item.deliveredby ?
                      <td><button className="btn btn-orange" onClick={()=>{
    openModal(item._id)
   }}>إضافة مندوب </button></td>  :null}
   {item.status=='pick to store'?
   <td><button className="btn btn-primary" onClick={()=>{
    openModal2(item._id)
   }}>تأكيد استلام الشحنة </button></td>  
   :null}

                   {item.status=='received' && !item.receiverPaidCash?   
                  <td><button className="btn btn-orange" onClick={()=>{
                      takeOrderMoney(item._id)
                    }}>تأكيد استلام كاش  </button></td> :null}
                   <td>
                    <button className="btn btn-danger" onClick={() => { openModalProblem(item._id) }}>تبليغ مشكلة</button>
                   </td>
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
         <div className=''>
          <label htmlFor="">إرفق ملف  (اختياري) </label>
          <input
  type="file"
  className="my-2 my-input form-control"
  multiple
  onChange={handleFileChange}
/>
 
          </div>
           
         </Modal.Body>
         <Modal.Footer>
         <div className='text-center'>
           <Button className='m-1' variant="success" onClick={()=>{acceptOrder(orderId)}}>
      تأكيد
           </Button>
           <Button className='m-1' variant="danger" onClick={()=>{rejectOrder(orderId)}}>
      رفض
           </Button>
           <Button variant="secondary" onClick={closeModal2}>
           إغلاق
           </Button>
            </div>
           
           
        
         </Modal.Footer>
       </Modal>
       <Modal show={showModalProblem} onHide={closeModalProblem}>
        <Modal.Header >
        <Modal.Title> هل تريد الابلاغ عن مشكلة فى هذه الشحنة؟  
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className=''>
          <label htmlFor="">وصف المشكلة</label>
          <input
  type="text"
  className="my-2 my-input form-control"
  
  onChange={(e)=>{setDescProblem(e.target.value)}}
/>
          </div>
          <div className=''>
          <label htmlFor="">إرفق ملف  () </label>
          <input
  type="file"
  className="my-2 my-input form-control"
  multiple
  onChange={handleFileChangeProblem}
/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" onClick={()=>{problemOrder(selectedID)}}>
          ابلاغ  
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModalProblem}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
       </>
      )
    }
    