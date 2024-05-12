import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import logo from '../../assets/logo.png'
import locationIcon from '../../assets/ivo-removebg-preview.png'
export default function TrackOrder() {
    const [trackNumber ,setTrackNumber] =useState('')
    const [visible, setVesible] = useState(false)
      const [orderDetails, setOrderDetails] = useState([])
    
      async function trackOrder() {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/track-order/${trackNumber}`);
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
          <div className="row " dir='rtl'>
            <div className="col-md-4">
              <div className="p-4">
              <h5> <i class="fa-solid fa-truck-fast"></i>رقم الشحنة</h5>
              <span className='fw-bold'> {orderDetails.ordernumber}</span>
              </div>
              </div>
            <div className="col-md-4">
              <div className="p-4">
                <h5><i class="fa-regular fa-chart-bar"></i>  حالة الشحنة </h5>
                {orderDetails.status=='pending'?
                <span className='fw-bold'>قيد الانتظار</span>:
                orderDetails.status=='pick to store'?
                <span className='fw-bold'>فى الطريق للمخزن</span>:
                orderDetails.status=='in store'?
                <span className='fw-bold'> فى المخزن</span>:
                orderDetails.status=='pick to client'?
                <span className='fw-bold'>فى الطريق للعميل</span>:
                orderDetails.status=='received'?
                <span className='fw-bold'>تم تسليمها</span>:
                null}
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4">
                <h5><i class="fa-solid fa-user"></i> المندوب</h5>
                {orderDetails.status == 'pick to store'?
                <span className='fw-bold'>{orderDetails.pickedby.firstName}{orderDetails.pickedby.lastName}</span>:null}
                {orderDetails.status == 'pick to client'?
                <span className='fw-bold'> {orderDetails.deliveredby.firstName}{orderDetails.deliveredby.lastName}</span>:
                null}
                {orderDetails.status == 'in store'?
                <span className='fw-bold'> {orderDetails.storekeeper.firstName}{orderDetails.storekeeper.lastName}</span>:
                null}
              </div>
            </div>
            </div>
            <div className="p-2 my-3">
            <div dir='rtl' className="progress my-4" role="progressbar" aria-label="Success example"  aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar" style={{
  width: orderDetails.status === 'pending' ? '20%' :
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
    <span>قيد الانتظار</span>
  </div>
  <div className="w-20 text-center">
    <span>فى الطريق للمخزن</span>
  </div>
  <div className="w-20 text-center">
    <span>فى المخزن</span>
  </div>
  <div className="w-20 text-center">
  <span>فى الطريق للعميل</span>
  </div>
  <div className="w-20 text-center">
  <span> تم تسليمها</span>
  </div>
  </div>
            </div>
          </div>
           

           </div>
    </>
  )
}
