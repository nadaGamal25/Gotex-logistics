import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserOrders() {
  useEffect(() => {
    getOrders()
  }, [])
  const [orders, setOrders] = useState([])

  async function getOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics/order/get-user-orders',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
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
      const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/getorder/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
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

  // change status pending
  const [selectedFilesPending, setSelectedFilesPending] = useState([]);
  async function changeStatusPending(orderid) {
    console.log(selectedFilesPending)
    const formData = new FormData();
    formData.append('orderId', orderid);
  
    selectedFilesPending.forEach((file) => {
      formData.append('images.pending', file);
    });
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    } 
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics/order/change-status-to-pending`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModalPending();
      setSelectedFilesPending([]);
      getOrders();
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChangePending(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesPending((prevFiles) => [...prevFiles, ...files]);
  }
  
  const [showModalPending, setShowModalPending] = useState(false);

  const openModalPending = (orderid) => {
    setShowModalPending(true);
    setSelectedID(orderid)
  };

  const closeModalPending = () => {
    setShowModalPending(false);
    setSelectedFilesPending([])
  };
 //cancel order
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
        `https://dashboard.go-tex.net/logistics/order/cancel-order`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
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
  //edit order
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOrder, setEditedOrder] = useState(null);
  const [eOrder, seteOrder] = useState(null);
  const handleEditClick = (order) => {
    seteOrder(order);
    setEditedOrder(
      {
        sendername: order?.sendername || '',
        senderaddress: order?.senderaddress || '',
        senderphone: order?.senderphone || '',
        recivername: order?.recivername || '',
        reciveraddress: order?.reciveraddress || '',
        reciverphone: order?.reciverphone || '',
        price: order?.price || '',
        weight: order?.weight || '',
        pieces: order?.pieces || '',
        description:order?.description || '' ,
    }
    )
    setIsModalOpen(true);

    console.log(order)
    console.log(editedOrder)
    console.log("yes")
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setEditedOrder(null)
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
      setEditedOrder((prev) => ({
        ...prev,
        [name]: value,
      })); 
  };
  const handleEditSubmit = async (event) => {
    console.log(editedOrder)
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics/order/edit-order/${eOrder._id}`,
        {...editedOrder},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      console.log(editedOrder)
      console.log(response);

      closeModal();
      window.alert("تم تعديل بيانات الشحنة بنجاح")
      getOrders()
      
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg)
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
              <th scope="col">جوال المرسل</th>
              <th scope="col">عنوان المرسل </th>
              <th scope="col"> المستلم</th>
              <th scope="col">جوال المستلم</th>
              <th scope="col">عنوان المستلم</th>
              <th scope="col"> billcode</th>
              <th scope="col">رقم الشحنة</th>
              <th scope="col">طريقة الدفع</th>
              <th scope="col">السعر </th>
              <th scope="col">الوزن</th>
              <th scope="col">عدد القطع</th>
              <th scope="col">حالة الشحنة</th>
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
                  <td>{item.senderphone}</td>
                  <td>{item.senderaddress}</td>
                  <td>{item.recivername}</td>
                  <td>{item.reciverphone}</td>
                  <td>{item.reciveraddress}</td>
                  <td>{item.billcode}</td>
                  <td>{item.ordernumber}</td>
                  <td>{item.paytype}</td>
                  <td>{item.price}</td>
                  <td>{item.weight}</td>
                  <td>{item.pieces}</td>
                  <td>{item.status}</td>
                  <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
                  <td>
                  <button className="btn btn-secondary" onClick={() => handleEditClick(item)}>تعديل البيانات</button>
                  </td>
                  {item.status == "canceled" ?
                  <td><button className="btn btn-orange" onClick={()=>{
                      openModalPending(item._id)
                  }}>تعليق الشنحة</button></td>:null}
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
      </div>
    </div>
    {isModalOpen && (<Modal show={isModalOpen} onHide={closeModal} >
        <Modal.Header >
          <Modal.Title>تعديل بيانات الشحنة
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleEditSubmit}>
        <div className="row">
                <div className="col-md-6 pb-1">
        <label htmlFor="first_name">اسم المرسل   :</label>
      <input onChange={handleInputChange} value={editedOrder.sendername} type="text" className='my-input my-2 form-control' name='sendername' />
      
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> عنوان المرسل   :</label>
      <input onChange={handleInputChange} value={editedOrder.senderaddress} type="text" className='my-input my-2 form-control' name='senderaddress' />
      
    </div>
   
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">هاتف المرسل </label>
   
      <input onChange={handleInputChange} value={editedOrder.senderphone} type="text" className='my-input my-2 form-control' name='senderphone' />
     
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="first_name">اسم المستلم   :</label>
      <input onChange={handleInputChange} value={editedOrder.recivername} type="text" className='my-input my-2 form-control' name='recivername' />
      
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> عنوان المستلم   :</label>
      <input onChange={handleInputChange} value={editedOrder.reciveraddress} type="text" className='my-input my-2 form-control' name='reciveraddress' />
      
    </div>
   
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">هاتف المستلم </label>
   
      <input onChange={handleInputChange} value={editedOrder.reciverphone} type="text" className='my-input my-2 form-control' name='reciverphone' />
     
      
    </div>
               
               
    
   
   
    <div className="col-md-6 pb-1">
        <label htmlFor="address">السعر   :</label>
      <input onChange={handleInputChange} value={editedOrder.price} type="text" className='my-input my-2 form-control' name='price' />
      
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="state">الوزن   :</label>
      <input onChange={handleInputChange} value={editedOrder.weight} type="text" className='my-input my-2 form-control' name='weight' />
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="street">عدد القطع   :</label>
      <input onChange={handleInputChange} value={editedOrder.pieces} type="text" className='my-input my-2 form-control' name='pieces' />
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="category">الوصف   :</label>
      <input onChange={handleInputChange} value={editedOrder.description} type="text" className='my-input my-2 form-control' name='description' />
      
    </div>

    <div className="text-center pt-1">
      <button className='btn btn-primary'>
      تعديل  
      </button>
      </div>
      </div>
      </form>  
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal>)}
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

      <Modal show={showModalPending} onHide={closeModalPending}>
        <Modal.Header >
        <Modal.Title> هل تريد تغيير حالة الشحنة وجعلها معلقة (pending)مرة اخرى 
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
          <label htmlFor="">إرفق ملف  () </label>
          <input
  type="file"
  className="my-2 my-input"
  multiple
  onChange={handleFileChangePending}
/>
 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" onClick={()=>{changeStatusPending(selectedID)}}>
     تعليق الشحنة
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModalPending}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
