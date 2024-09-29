import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';

export default function AdminOrdersProblems() {
    useEffect(() => {
        getOrders()
      }, [])
      const [orders, setOrders] = useState([])
      const [selectedImages, setSelectedImages] = useState([]);
      const [showModal, setShowModal] = useState(false);
    
      async function getOrders() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics/order/get-problem-requests',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
              },
            });
          const List = response.data.orders;
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
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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
      const [descClose, setDescClose] = useState('');
      const [showModalClose, setShowModalClose] = useState(false);
      const [selectedID, setSelectedID] = useState(null);
      const openModalClose = (orderid) => {
        setShowModalClose(true);
        setSelectedID(orderid)
      };
    
      const closeModalClose = () => {
        setShowModalClose(false);
      };
      async function closeProblem(orderid) {
        try {
          const response = await axios.put(
            `https://dashboard.go-tex.net/logistics/order/close-problem`,
            {
              orderId: orderid,
              description:descClose,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
              },
            }
          );
          alert('تم اغلاق المشكلة بنجاح')
          console.log(response);
          getOrders()
        } catch (error) {
          console.error(error);
          alert(error.response.data.msg || error.response.data.message)
    
        }
      }

      function openCarousel(images) {
        const formattedImages = images.map(img => img.replace('public', 'https://dashboard.go-tex.net/logistics'));
        setSelectedImages(formattedImages);
        setShowModal(true);
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
        <th scope="col">رقم الشحنة</th>
        <th scope="col">طريقة الدفع</th>
        <th scope="col">السعر </th>
        <th scope="col">الوزن</th>
        <th scope="col">عدد القطع</th>
        <th scope="col">حالة الشحنة</th>
        <th scope="col">الصور</th>
        <th scope="col">وصف المشكلة</th>
        <th scope="col">حالة المشكلة</th>
        <th scope="col">ملاحظة الاغلاق </th>
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
            <td>{item.ordernumber}</td>
            <td>{item.paytype}</td>
            <td>{item.price}</td>
            <td>{item.weight}</td>
            <td>{item.pieces}</td>
            <td>{item.status}</td>
            <td><a className="text-primary" onClick={() => openCarousel(item.problem.images)}>عرض_الصور</a></td>
            <td>{item.problem.description}</td>
            <td>{item.problem.status}</td>
            <td>{item.problem.closedDescription}</td>
            <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
          
            <td><button className="btn btn-danger" onClick={()=>{
              openModalClose(item._id)
            }}>إغلاق المشكلة</button></td>
            
          </tr>
        );
      })}
    </tbody>


  </table>
</div>
</div>
<Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton >
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
  {selectedImages.map((img, index)=>{
            return(
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={img} class="d-block w-100" alt="..."/>
              </div>
            )
        })}
   
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
          
        </Modal.Body>
      </Modal>
      <Modal show={showModalClose} onHide={closeModalClose}>
  <Modal.Header>
    <Modal.Title>هل انت بالتأكيد تريد اغلاق المشكلة </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={(e) => { e.preventDefault(); closeProblem(selectedID); }}>
      <div className=''>
        <label htmlFor="">إضافة ملاحظة: </label>
        <input
          type="text"
          className="my-2 my-input form-control"
          onChange={(e) => { setDescClose(e.target.value); }} required
        />
        
      </div>
      <Modal.Footer>
        <div className="text-center">
          <Button className='m-1' variant="danger" type="submit">
            تأكيد اغلاق المشكلة 
          </Button>
          <Button className='m-1' variant="secondary" type='button' onClick={closeModalClose}>
            إغلاق
          </Button>
        </div>
      </Modal.Footer>
    </form>
  </Modal.Body>
</Modal>    
    </>
  )
}


{/* <td>
        <div class="dropdown">
  <button class="btn btn-success dropdown-toggle"
  type="button" data-bs-toggle="dropdown" aria-expanded="false">
    عرض_ الصور  
  </button>

  <ul class="dropdown-menu">

  {item.problem.images ?( item.problem.images.map((image,index) => (
    <li key={index}>
      <a class="dropdown-item"  href={image[index].replace('public', 'https://dashboard.go-tex.net/logistics')} target='_blank'>
        صورة {index+1}
      </a>
    </li>
  )) ): (<li>
    <i class="fa-solid fa-spinner fa-spin"></i>
  </li>)
}
</ul>

</div>
              
                </td> */}