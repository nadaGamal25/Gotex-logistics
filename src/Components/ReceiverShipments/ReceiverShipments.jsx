import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function ReceiverShipments() {
  useEffect(() => {

    getOrders()
  }, [])
  

 
  const [orders, setOrders] = useState([])
  const [cachAmount, setCachAmount] = useState(0);
  const [visaAmount, setVisaAmount] = useState(0);

  async function getOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics/order/get-receiver-orders',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        });
      const List = response.data.data;
      console.log(response)
      setCachAmount(response.data.receiver.collectedCashAmount)
      setVisaAmount(response.data.receiver.collectedVisaAmount)
      setOrders(List)
    } catch (error) {
      console.error(error);
    }
  }

  async function getSticker(orderId) {
    try {
      const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/getorder/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
        },
      });
      console.log(response)
      const stickerUrl = `${response.data.url.replace('upload', 'https://dashboard.go-tex.net/logistics/upload')}`;
      const newTab = window.open();
      newTab.location.href = stickerUrl;
    } catch (error) {
      console.error(error);
    }
  }
  const [selectedID, setSelectedID] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  async function changeStatusPicked(orderid) {
    console.log(selectedFiles)
    const formData = new FormData();
    formData.append('orderId', orderid);
    selectedFiles.forEach((file) => {
      formData.append('images.pickedToClient', file);
    });
    
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics/order/picked-to-client`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
  
      console.log(response);
      closeModal();
      setSelectedFiles([]);
      getOrders();
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }

  
  function handleFileChange(event) {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  }
  
  const [showModal, setShowModal] = useState(false);

  const openModal = (orderid) => {
    setShowModal(true);
    setSelectedID(orderid)
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFiles([])
  };

  const [selectedFilesRecieved, setSelectedFilesRecieved] = useState([]);
  async function changeStatusRecieved(orderid) {
    console.log(selectedFilesRecieved)
    const formData = new FormData();
    formData.append('orderId', orderid);
  
    selectedFilesRecieved.forEach((file) => {
      formData.append('images.received', file);
    });
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    } 
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics/order/order-received`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModalRecieved();
      setSelectedFilesRecieved([]);
      getOrders();
      setShowModalPayType(false)
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChangeRecieved(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesRecieved((prevFiles) => [...prevFiles, ...files]);
  }
  
  const [showModalRecieved, setShowModalRecieved] = useState(false);

  const openModalRecieved = (orderid) => {
    setShowModalRecieved(true);
    setSelectedID(orderid)
  };

  const closeModalRecieved = () => {
    setShowModalRecieved(false);
    setSelectedFilesRecieved([])
  };

  const [selectedFilesReturn, setSelectedFilesReturn] = useState([]);
  async function returnOrder(orderid) {
    console.log(selectedFilesReturn)
    const formData = new FormData();
    
    selectedFilesReturn.forEach((file) => {
      formData.append('images.return', file);
    });
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics/order/return-order/${orderid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModalReturn();
      setSelectedFilesReturn([]);
      getOrders();
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChangeReturn(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesReturn((prevFiles) => [...prevFiles, ...files]);
  }
  
  const [showModalReturn, setShowModalReturn] = useState(false);

  const openModalReturn = (orderid) => {
    setShowModalReturn(true);
    setSelectedID(orderid)
  };

  const closeModalReturn = () => {
    setShowModalReturn(false);
    setSelectedFilesReturn([])
  };

  const [orderStatus, setOrderStatus]=useState('')
  const filteredOrders = orderStatus
  ? orders.filter(order => order.status === orderStatus)
  : orders;

  async function payWithVisa(orderId) {
    try {
      const token = localStorage.getItem('carrierToken');
      if (!token) {
        throw new Error('Token not found');
      }
  
      const response = await axios.post(
        `https://dashboard.go-tex.net/logistics/payment/charge/${orderId}`,
        {}, // Empty body object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
      getOrders();
      window.alert('يرجى ملئ جميع البيانات التالية ')
          const stickerUrl = `${response.data.data.transaction.url}`;
           const newTab = window.open();
           newTab.location.href = stickerUrl;
           setShowModalPayType(false)
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
      setShowModalPayType(false)
    }
  }
  const [payments,setPayments]=useState('')
  async function getPayments(orderId) {
    try {
      const token = localStorage.getItem('carrierToken');
      console.log(token)
      if (!token) {
        throw new Error('Token not found');
      }
  
      const response = await axios.get(
        `https://dashboard.go-tex.net/logistics/payment/order-payments/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
      setPayments(response.data.data)
      
    } catch (error) {
      console.error(error);
      // alert(error.response.data.msg);
    }
  }
  
  const [showModalPayments, setShowModalPayments] = useState(false);

  const openModalPayments = (orderid) => {
    setShowModalPayments(true);
    getPayments(orderid)
  };

  const closeModalPayments = () => {
    setShowModalPayments(false);
    setPayments('')
  };
  

  const [showModalPayType, setShowModalPayType] = useState(false);
  const [orderID, setOrderID] = useState('');

  const openModalPayType = (orderid) => {
    setShowModalPayType(true);
    setOrderID(orderid)
  };

  const closeModalPayType = () => {
    setShowModalPayType(false);
    setOrderID('')
  };
  
  return (
    <>
    <div className='p-4' id='content'>
      <div className="row">
      <div className="col-md-4">
      <div className="p-2 count-box m-1">
            <span>قيمة الكاش  : {cachAmount} ريال</span>
          </div>
      </div>
      <div className="col-md-4">
      <div className="p-2 count-box m-1">
            <span>قيمة المدفوع فيزا  : {visaAmount} ريال</span>
          </div>
      </div>
      </div>
    
    <div className="row">
    <div className="col-md-3  p-2 mb-2">
    <select className='form-control m-1'
          
          placeholder="اختر حالة الشحنة"
          onChange={(e) => setOrderStatus(e.target.value)} >
            <option value=""> حالة الشحنة(جميع الشحنات)</option>
            {/* <option value="pending">pending (معلقة)</option>
            <option value="pick to store">pick to store(ف الطريق للمخزن)</option> */}
            <option value="in store">in store(فى المخزن)</option>
            <option value="pick to client">pick to client(ف الطريق للعميل)</option>
            {/* <option value="delivered">delivered(تم تسليمها)</option> */}
            <option value="canceled">canceled(تم الغائها)</option>
            {/* <option value=''>جميع الشحنات</option> */}
            </select>
    </div>
    </div>
    <div className="row">
    {filteredOrders && filteredOrders
    //.slice().reverse()
    .filter(order=>order.status !='received').map((item, index) => {
              return (
                <div className="col-md-4 p-2 " key={index}>
                  <div className='order-card p-2'>
                    <p className="text-danger text-center">
                      {item.ordernumber}
                    </p>
                    <span>المرسل : </span>
                    <h6>{item.sendername}</h6>
                    <h6>{item.senderphone}</h6>
                    <h6>{item.sendercity} ,{item.senderdistrict}</h6>
                    <h6>{item.senderaddress}</h6>
                    <span>المستلم : </span>
                    <h6>{item.recivername}</h6>
                    <h6>{item.reciverphone}</h6>
                    <h6>{item.recivercity} ,{item.reciverdistrict}</h6>
                    <h6>{item.reciveraddress}</h6>
                    <hr className='m-0'/>
                    <span>الوزن : {item.weight}</span>
                    <span className='fw-bold text-dark px-2'> | </span>
                    <span>عدد القطع : {item.pieces}</span>
                    <hr className='m-0'/>
                    <span>الدفع : {item.paytype}</span>
                    <span className='fw-bold text-dark px-2'> | </span>
                    <span>الحالة : {item.status}</span>
                    <hr className='m-0'/>
                    <button className="btn btn-success m-1" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button>
                    {item.status == "in store"?
                  <button className="btn btn-orange m-1" onClick={()=>{
                      openModal(item._id)
                  }}>تأكيد الاستلام من المخزن</button>:null}
                  
                  
                  {item.status =='pick to client'?
                  <button className="btn btn-danger m-1" onClick={()=>{
                    openModalPayType(item._id)
                }}>اختر طريقة الدفع أولا</button>
                  :null}
                  {item.status =='pick to client'?
                  <button className="btn btn-primary m-1" onClick={()=>{
                      openModalRecieved(item._id)
                  }}>تأكيد استلام العميل</button>:null}
                  {item.status =='pick to client' || item.status == "received"?
                  <button className="btn btn-danger m-1" onClick={()=>{
                      openModalPayments(item._id)
                  }}>حالة الدفع</button>:null}
                  {item.status =="pick to client"?
                  <button className="btn btn-secondary m-1" onClick={()=>{
                      openModalReturn(item._id)
                  }}>إرجاع الشنحة</button>:null}
                  </div>
                </div>
              )})}
    </div>
      {/* <div className="my-table p-4 ">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"> التاريخ</th>
              <th scope="col"> المرسل</th>
              <th scope="col"> المستلم</th>
              <th scope="col"> billcode</th>
              <th scope="col">رقم الشحنة</th>
              <th scope="col">طريقة الدفع</th>
              <th scope="col">الوزن</th>
              <th scope="col">عدد القطع</th>
              <th scope="col">حالة الشحنة</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders && filteredOrders.slice().reverse().filter(order=>order.status !='received').map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.createdAt.slice(0, 10)}</td>
                  <td>{item.sendername}</td>
                  <td>{item.recivername}</td>
                  <td>{item.billcode}</td>
                  <td>{item.ordernumber}</td>
                  <td>{item.paytype}</td>
                  <td>{item.weight}</td>
                  <td>{item.pieces}</td>
                  <td>{item.status}</td>
                  <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
                  {item.status == "in store"?
                  <td><button className="btn btn-orange" onClick={()=>{
                    // if(window.confirm('هل انت بالتأكيد قمت باستلام الشحنة من المخزن')){
                      openModal(item._id)
                    // }
                  }}>تأكيد الاستلام من المخزن</button></td>:null}
                  {/* {item.status =="pick to client"?
                  <td><button className="btn btn-primary" onClick={()=>{
                    if(window.confirm('هل انت فى الطريق لتسليم الشحنة')){
                      changeStatusDelivered(item._id)
                    }
                  }}>فى الطريق للتسليم</button></td>:null} *
                  {item.status =='pick to client'?
                  <td><button className="btn btn-primary" onClick={()=>{
                    // if(window.confirm('هل انت بالتأكيد قمت بتسليم الشحنة للعميل')){
                      openModalRecieved(item._id)
                    // }
                  }}>تأكيد استلام العميل</button></td>:null}
                  {item.status =="pick to client"?
                  <td><button className="btn btn-secondary" onClick={()=>{
                      openModalReturn(item._id)
                  }}>إرجاع الشنحة</button></td>:null}
                </tr>
              );
            })}
          </tbody>


        </table>
      </div> */}
    </div>
   
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header >
        <Modal.Title> هل انت بالتأكيد قمت باستلام الشحنة من المخزن
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
          <label htmlFor="">إرفق ملف  () </label>
          <input
  type="file"
  className="my-2 my-input"
  multiple
  onChange={handleFileChange}
/>
 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" onClick={()=>{changeStatusPicked(selectedID)}}>
          تأكيد استلام الشحنة
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModal}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalRecieved} onHide={closeModalRecieved}>
  <Modal.Header>
    <Modal.Title>هل العميل استلم الشحنة و تم الدفع؟</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={(e) => { e.preventDefault(); changeStatusRecieved(selectedID); }}>
      <div className=''>
        <label htmlFor="">إرفق ملف () </label>
        <input
          type="file"
          className="my-2 my-input form-control"
          multiple
          onChange={handleFileChangeRecieved} required
        />
      </div>
      <Modal.Footer>
        <div className="text-center">
          <Button className='m-1' variant="danger" type="submit">
            تأكيد استلام العميل
          </Button>
          <Button className='m-1' variant="secondary" type='button' onClick={closeModalRecieved}>
            إغلاق
          </Button>
        </div>
      </Modal.Footer>
    </form>
  </Modal.Body>
</Modal>

      <Modal show={showModalReturn} onHide={closeModalReturn}>
        <Modal.Header >
        <Modal.Title> هل انت بالتأكيد تريد ارجاع الشحنة  
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
          <label htmlFor="">إرفق ملف  () </label>
          <input
  type="file"
  className="my-2 my-input"
  multiple
  onChange={handleFileChangeReturn}
/>
 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" onClick={()=>{returnOrder(selectedID)}}>
          تأكيد ارجاع الشحنة
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModalReturn}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalPayments} onHide={closeModalPayments}>
        <Modal.Header >
        <Modal.Title> محاولات الدفع
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
          <div className="my-table p-4 mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"> القيمة</th>
                  <th scope="col"> الكود</th>
                  <th scope="col"> الحالة</th>
                  
                </tr>
              </thead>
              <tbody>
                {payments && payments.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.amount}</td>
                      <td>{item.data.id}</td>
                      {item.status == "CAPTURED"?<td>تم الدفع</td>:<td>{item.status}</td>}
                     
              
                    </tr>
                  );
                })}
              </tbody>
    
    
            </table>
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
       
          <Button className='m-1' variant="secondary" onClick={closeModalPayments}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalPayType} onHide={closeModalPayType}>
        <Modal.Header >
        <Modal.Title> اختر طريقة الدفع 
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center p-3'>
          <button className="btn btn-success m-1" onClick={()=>{
                      payWithVisa(orderID)
                  }}>الدفع بواسطة فيزا</button>
                   <button className="btn btn-primary m-1" onClick={()=>{
                      openModalRecieved(orderID)
                  }}>الدفع كاش</button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
       
          <Button className='m-1' variant="secondary" onClick={closeModalPayType}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>)
}
