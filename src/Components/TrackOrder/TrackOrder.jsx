import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import logo from '../../assets/logo.png'
import locationIcon from '../../assets/ivo-removebg-preview.png'
import {Modal} from 'react-bootstrap';

export default function TrackOrder() {
    const [trackNumber ,setTrackNumber] =useState('')
    const [visible, setVesible] = useState(false)
      const [orderDetails, setOrderDetails] = useState([])
    
      async function trackOrder() {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/track-order/${trackNumber}`);
          const List = response.data.data;
          console.log(response)
          setOrderDetails(List)
          setVesible(true)
        } catch (error) {
          console.error(error);
          window.alert(error.response.data.msg)
          setVesible(false)
        }
      }
      const [selectedImages, setSelectedImages] = useState([]);
      const [showModal, setShowModal] = useState(false);
      function openCarousel(images) {
        const formattedImages = images.map(img => img.replace('public', 'https://dashboard.go-tex.net/logistics'));
        setSelectedImages(formattedImages);
        setShowModal(true);
      }
    
  return (
    <>
    <style>
    {`
          body {
            background-color: #fff !important;
          }
        `}
    </style>
    <nav class="py-3 bg-lightblue">
          <div className="d-flex justify-content-between align-content-between">
            <div>
            <h4 >  </h4>
            </div>
            <img src={logo} alt="logo" />
            </div>
        </nav>
        <div className="bg-lightblue mt-4">
            <div className="text-center">
                <img className='location-icon' src={locationIcon} alt="icon" />
            <h2 className='fw-bold'>تتبع شحنتك الان</h2>
            </div>
            <div className="m-auto track-box">
              <div className="row py-3" dir='rtl'>
                <div className="col-md-10 my-1">
                  <input type="text" className="form-control" placeholder="رقم التتبع" 
                  onChange={(e)=>{setTrackNumber(e.target.value)}}/>
                </div>
                <div className="col-md-2 px-0 my-1">
                <button className="btn btn-orange" onClick={trackOrder}>تتبع</button>
                </div>
              </div>
            </div>
           
        </div>
        <div className={visible?"bg-lightblue p-4 m-5 details-box d-block":"d-none bg-lightblue p-4 m-5 details-box"}>
          <div className="bg-white">
            <div className='pt-2' dir='ltr'>
              {/* <a className="text-primary m-3" onClick={() => openCarousel([
                        ...orderDetails.images.pending,
                        ...orderDetails.images.pickedToStore,
                        ...orderDetails.images.inStore,
                        ...orderDetails.images.pickedToClient,
                        ...orderDetails.images.received,
                        ...orderDetails.images.canceled,
                        ...orderDetails.images.return
                      ])}>عرض_الصور</a> */}
                {orderDetails.images?.canceled?.admin.length !== 0 && orderDetails.images?.canceled?.collector.length !== 0 &&orderDetails.images?.canceled?.dataEntry.length !== 0 ? (
                     <a className="text-primary m-3" onClick={() => openCarousel([
                      ...(orderDetails.images.canceled.admin || []),
                      ...(orderDetails.images.canceled.collector || []),
                      ...(orderDetails.images.canceled.dataEntry || [])
                    ])}>الصور</a>
                   ):null}      
            </div>
          <div className="row " dir='rtl'>
            <div className="col-md-4">
              <div className="p-4">
              <h5> <i class="fa-solid fa-truck-fast"></i>رقم الشحنة</h5>
              <span className='fw-bold'> {orderDetails.ordernumber}</span>
              </div>
              </div>
            <div className="col-md-4">
              <div className="p-4">
                <h5><i class="fa-regular fa-chart-bar"></i>  حالة الشحنة
                {orderDetails.isreturn===true? <span className='text-danger'>(شحنة رجيع)</span> :null}</h5>
                {orderDetails.isreturn==true && orderDetails.status =='in store'?
                <span className='fw-bold'>سيتم ارجاع الشحنة للمرسل </span>:
                orderDetails.status=='pending' || orderDetails.status=='late to store'?
                <span className='fw-bold'>قيد الانتظار</span>:
                orderDetails.status=='pick to store'?
                <span className='fw-bold'>فى الطريق للمخزن</span>:
                orderDetails.status=='in store'?
                <span className='fw-bold'> فى المخزن</span>:
                orderDetails.status=='pick to client' && orderDetails.isreturn!==true?
                <span className='fw-bold'>فى الطريق للعميل</span>:
                orderDetails.status=='pick to client' && orderDetails.isreturn===true?
                <span className='fw-bold'>فى الطريق للمرسل</span>:
                orderDetails.status=='received'?
                <span className='fw-bold'>تم تسليمها</span>:
                orderDetails.status=='canceled'?
                <span className='fw-bold'>تم إلغائها</span>:
                <span>{orderDetails.status}</span>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4">
                <h5><i class="fa-solid fa-user"></i> المندوب</h5>
                {orderDetails.status == 'pick to store'?
                <span className='fw-bold'>{orderDetails.pickedby.firstName}{orderDetails.pickedby.lastName}</span>:null}
                {orderDetails.status == 'pick to client'?
                (<>
                   <span className='fw-bold'> {orderDetails.deliveredby.firstName}{orderDetails.deliveredby.lastName}</span>
                   {orderDetails.deliveredby.mobile?<span className='fw-bold'> {orderDetails.deliveredby.mobile}</span>:null}
                   </>)
                :null}
                {orderDetails.status == 'in store'?
                <span className='fw-bold'>امين المخزن: {orderDetails.storekeeper.firstName}{orderDetails.storekeeper.lastName}</span>:
                null}
              </div>
            </div>
            </div>
            {orderDetails.isreturn ==true?
            <div className="p-2 my-3">
            <div dir='ltr' className="progress my-4" role="progressbar" aria-label="Success example"  aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar" style={{
  width:
         orderDetails.status === 'in store' ? `30%` :
         orderDetails.status === 'pick to client' ? `70%` :
         orderDetails.status === 'received' ? `100%` :
         `0%`
}}>    {/* <i class="fa-solid fa-truck-arrow-right truck-icon"></i> */}
    </div>
  
            </div>
            <div className="d-flex status-box" dir='ltr'>
 
  <div className="w-33 text-center">
    <span className={orderDetails.status === 'in store'||orderDetails.status === 'pick to client'
   || orderDetails.status === 'received'  ? 'text-orange' : ''}>فى المخزن <br/>
    {orderDetails.images?.inStore?.length !== 0 || orderDetails.images?.return?.length !== 0 ? (
                     <a className="text-primary"  onClick={() => openCarousel([
                      ...(orderDetails.images.inStore || []),
                      ...(orderDetails.images.return || [])
                    ])}>الصور</a>
                   ):null}
   {orderDetails.images?.inStore?.length !== 0 ? (
                     <a className="text-primary" onClick={() => openCarousel(orderDetails.images.inStore)}>الصور</a>
                   ):null}
                   </span>
  </div>
  <div className="w-33 text-center">
  <span className={orderDetails.status === 'pick to client'
   || orderDetails.status === 'received'  ? 'text-orange' : ''}>فى الطريق للمرسل <br/>
   {orderDetails.images?.pickedToClient?.length !== 0 ? (
                     <a className="text-primary" onClick={() => openCarousel(orderDetails.images.pickedToClient)}>الصور</a>
                   ):null}
                   </span>
  </div>
  <div className="w-33 text-center">
  <span className={orderDetails.status === 'received'  ? 'text-orange' : ''}> تم تسليمها للمرسل<br/>
   {orderDetails.images?.received?.length !== 0 ? (
                     <a className="text-primary" onClick={() => openCarousel(orderDetails.images.received)}>الصور</a>
                   ):null}
                   </span>
  </div>
  </div>
            </div>
            :
            <div className="p-2 my-3">
            <div dir='rtl' className="progress my-4" role="progressbar" aria-label="Success example"  aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar" style={{
  width: orderDetails.status === 'pending'  || orderDetails.status=='late to store'? '20%' :
         orderDetails.status === 'pick to store' ? '40%' :
         orderDetails.status === 'in store' ? `60%` :
         orderDetails.status === 'pick to client' ? `80%` :
         orderDetails.status === 'received' ? `100%` :
         `0%`
}}>    {/* <i class="fa-solid fa-truck-arrow-right truck-icon"></i> */}
    </div>
  
            </div>
            <div className="d-flex status-box" dir='rtl'>
  <div className="w-20 text-center">
    <span className={orderDetails.status === 'pending' || orderDetails.status=='late to store' ||orderDetails.status === 'pick to store'
    ||orderDetails.status === 'in store'||orderDetails.status === 'pick to client'
   || orderDetails.status === 'received'  ? 'text-orange' : ''}>قيد الانتظار <br/>
    {orderDetails.images?.pending?.length !== 0 ? (
                      <a className="text-primary" onClick={() => openCarousel(orderDetails.images.pending)}>الصور</a>
                    ):null}
    </span>

  </div>
  <div className="w-20 text-center">
    <span className={orderDetails.status === 'pick to store'
    ||orderDetails.status === 'in store'||orderDetails.status === 'pick to client'
   || orderDetails.status === 'received'  ? 'text-orange' : ''}>فى الطريق للمخزن <br/>
   {orderDetails.images?.pickedToStore?.length !== 0 ? (
                     <a className="text-primary" onClick={() => openCarousel(orderDetails.images.pickedToStore)}>الصور</a>
                   ):null}
                   </span>
  </div>
  <div className="w-20 text-center">
    <span className={orderDetails.status === 'in store'||orderDetails.status === 'pick to client'
   || orderDetails.status === 'received'  ? 'text-orange' : ''}>فى المخزن <br/>
   {orderDetails.images?.inStore?.length !== 0 ? (
                     <a className="text-primary" onClick={() => openCarousel(orderDetails.images.inStore)}>الصور</a>
                   ):null}
                   </span>
  </div>
  <div className="w-20 text-center">
  <span className={orderDetails.status === 'pick to client'
   || orderDetails.status === 'received'  ? 'text-orange' : ''}>فى الطريق للعميل <br/>
   {orderDetails.images?.pickedToClient?.length !== 0 || orderDetails.images?.return?.length !== 0 ? (
                     <a className="text-primary"  onClick={() => openCarousel([
                      ...(orderDetails.images.pickedToClient || []),
                      ...(orderDetails.images.return || [])
                    ])}>الصور</a>
                   ):null}
                   </span>
  </div>
  <div className="w-20 text-center">
  <span className={orderDetails.status === 'received'  ? 'text-orange' : ''}> تم تسليمها <br/>
   {orderDetails.images?.received?.length !== 0 ? (
                     <a className="text-primary" onClick={() => openCarousel(orderDetails.images.received)}>الصور</a>
                   ):null}
                   </span>
  </div>
  </div>
            </div>
            }
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
