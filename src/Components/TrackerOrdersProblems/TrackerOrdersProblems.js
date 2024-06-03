import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap';

export default function TrackerOrdersProblems() {
    useEffect(() => {
        getOrders()
      }, [])
      const [orders, setOrders] = useState([])
      const [selectedImages, setSelectedImages] = useState([]);
      const [showModal, setShowModal] = useState(false);

      async function getOrders() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/get-problem-requests',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('trackerToken')}`,
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/getorder/${orderId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('trackerToken')}`,
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
     
      function openCarousel(images) {
        const formattedImages = images.map(img => img.replace('public', 'https://dashboard.go-tex.net/logistics-test'));
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
        <th scope="col">حالة المشكلة</th>
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
            <td>{item.problem.status}</td>
            <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
          
            
            
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
    </>
  )
}
