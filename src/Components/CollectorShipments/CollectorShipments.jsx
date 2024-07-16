import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CollectorShipments() {
  useEffect(() => {

    getOrders()
  }, [])
  const [orders, setOrders] = useState([])
  const [orderStatus, setOrderStatus]=useState('')
  async function getOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/get-collector-orders',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
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
          Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
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

  const [selectedID, setSelectedID] = useState(null);

  // picked to store request
  const [selectedFiles, setSelectedFiles] = useState([]);
  async function changeStatusPicked(orderid) {
    console.log(selectedFiles)
    const formData = new FormData();
    formData.append('orderId', orderid);
    selectedFiles.forEach((file) => {
      formData.append('images.pickedToStore', file);
    });
    
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/picked-to-store`,
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

  const [selectedFilesInStore, setSelectedFilesInStore] = useState([]);
  async function sendRequestStore(orderid) {
    console.log(selectedFilesInStore)
    const formData = new FormData();
    formData.append('orderId', orderid);
  
    selectedFilesInStore.forEach((file) => {
      formData.append('images.inStoreRequest', file);
    });
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    } 
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/in-store-request`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModalInStore();
      setSelectedFilesInStore([]);
      getOrders();
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChangeInStore(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesInStore((prevFiles) => [...prevFiles, ...files]);
  }
  
  const [showModalInStore, setShowModalInStore] = useState(false);

  const openModalInStore = (orderid) => {
    setShowModalInStore(true);
    setSelectedID(orderid)
  };

  const closeModalInStore = () => {
    setShowModalInStore(false);
    setSelectedFilesInStore([])
  };

  const [selectedFilesCancel, setSelectedFilesCancel] = useState([]);
  const [descCancel, setDescCancel] = useState('');
  async function cancelOrder(orderid) {
    console.log(selectedFilesCancel)
    const formData = new FormData();
    formData.append('orderId', orderid);
    formData.append('description', descCancel);
    
    selectedFilesCancel.forEach((file) => {
      formData.append('images.canceled', file);
    });
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/cancel-order-by-collector`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModalCancel();
      setSelectedFilesCancel([]);
      getOrders();
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChangeCancel(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesCancel((prevFiles) => [...prevFiles, ...files]);
  }
  
  const [showModalCancel, setShowModalCancel] = useState(false);

  const openModalCancel = (orderid) => {
    setShowModalCancel(true);
    setSelectedID(orderid)
  };

  const closeModalCancel = () => {
    setShowModalCancel(false);
    setSelectedFilesCancel([])
  };

  const filteredOrders = orderStatus
  ? orders.filter(order => order.status === orderStatus)
  : orders;

  return (
    <>
    <div className='p-4' id='content'>
    <div className="row">
    <div className="col-md-3  p-2 mb-2">
    <select className='form-control m-1'
          
          placeholder="اختر حالة الشحنة"
          onChange={(e) => setOrderStatus(e.target.value)} >
            <option value="">اختر حالة الشحنة</option>
            <option value="pending">pending (معلقة)</option>
            <option value="pick to store">pick to store(ف الطريق للمخزن)</option>
            <option value="in store">in store(فى المخزن)</option>
            {/* <option value="pick to client">pick to client(ف الطريق للعميل)</option>
            <option value="delivered">delivered(تم تسليمها)</option> */}
            <option value="canceled">canceled(تم الغائها)</option>
            <option value=''>جميع الشحنات</option>
            </select>
    </div>
    </div>
    <div className="row">
    {filteredOrders && filteredOrders.slice().reverse().map((item, index) => {
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
                    {item.status == 'pending'?
                  <button className="btn btn-orange m-1" onClick={()=>{
                   
                    openModal(item._id)
                  }}>تأكيد استلام الشنحة</button>:null}
                  {item.status == 'pick to store'?
                   <button className="btn btn-secondary m-1" onClick={()=>{
                      openModalInStore(item._id)
                  }}>تبليغ امين المخزن</button>:null}
                  {item.status == "pending" ?
                  <button className="btn btn-danger m-1" onClick={()=>{
                      openModalCancel(item._id)
                  }}>إلغاء الشنحة</button>:null}
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
            {filteredOrders && filteredOrders.slice().reverse().map((item, index) => {
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
                  {item.status == 'pending'?
                  <td><button className="btn btn-orange" onClick={()=>{
                   
                    openModal(item._id)
                  }}>تأكيد استلام الشنحة</button></td>:null}
                  {/* {item.status == 'pick to store' ?
                  <td><button className="btn btn-primary" onClick={()=>{
                    if(window.confirm('هل انت بالتأكيد قمت بتوصيل الشخنة للمخزن')){
                      changeStatusDelivered(item._id)
                    }
                  }}>تأكيد توصيل الشنحة</button></td>:null} *
                  {item.status == 'pick to store'?
                   <td><button className="btn btn-secondary" onClick={()=>{
                    // if(window.confirm('هل قمت بتوصيل الشحنة وتريد ابلاغ امين المخزن')){
                      openModalInStore(item._id)
                    // }
                  }}>تبليغ امين المخزن</button></td>:null}
                  {item.status == "pending" ?
                  <td><button className="btn btn-danger" onClick={()=>{
                    // if(window.confirm('سوف يتم إلغاء الشنحة')){
                      openModalCancel(item._id)
                    // }
                  }}>إلغاء الشنحة</button></td>:null}
                </tr>
              );
            })}
          </tbody>


        </table>
      </div> */}

    </div>
    <Modal show={showModal} onHide={closeModal}>
  <Modal.Header>
    <Modal.Title>هل انت بالتأكيد قمت باستلام الشحنة من العميل</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={(e) => { e.preventDefault(); changeStatusPicked(selectedID); }}>
      <div className=''>
        <label htmlFor="">إرفق ملف () </label>
        <input
          type="file"
          className="my-2 my-input form-control"
          multiple
          onChange={handleFileChange} required
        />
      </div>
      <Modal.Footer>
        <div className="text-center">
          <Button className='m-1' variant="danger" type="submit">
            تأكيد استلام الشحنة
          </Button>
          <Button className='m-1' variant="secondary" type='button' onClick={closeModal}>
            إغلاق
          </Button>
        </div>
      </Modal.Footer>
    </form>
  </Modal.Body>
</Modal>

      <Modal show={showModalInStore} onHide={closeModalInStore}>
        <Modal.Header >
        <Modal.Title> هل قمت بتوصيل الشحنة وتريد ابلاغ امين المخزن
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
          <label htmlFor="">إرفق ملف  () </label>
          <input
  type="file"
  className="my-2 my-input form-control"
  name="images.inStoreRequest"
  multiple
  onChange={handleFileChangeInStore}
/>
 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" onClick={()=>{sendRequestStore(selectedID)}}>
     تبليغ امين المخزن
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModalInStore}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalCancel} onHide={closeModalCancel}>
  <Modal.Header>
    <Modal.Title>هل انت بالتأكيد تريد الغاء الشحنة</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={(e) => { e.preventDefault(); cancelOrder(selectedID); }}>
      <div className=''>
        <label htmlFor="">إضافة ملاحظة: </label>
        <input
          type="text"
          className="my-2 my-input form-control"
          onChange={(e) => { setDescCancel(e.target.value); }} required
        />
        <label htmlFor="">إرفق ملف () </label>
        <input
          type="file"
          className="my-2 my-input form-control"
          name="images.canceled"
          multiple
          onChange={handleFileChangeCancel} required
        />
      </div>
      <Modal.Footer>
        <div className="text-center">
          <Button className='m-1' variant="danger" type="submit">
            تأكيد الغاء الشحنة
          </Button>
          <Button className='m-1' variant="secondary" type='button' onClick={closeModalCancel}>
            إغلاق
          </Button>
        </div>
      </Modal.Footer>
    </form>
  </Modal.Body>
</Modal>
    </>)
}
