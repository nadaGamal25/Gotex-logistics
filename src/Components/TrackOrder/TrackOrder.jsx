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
            <h2 className='fw-bold'>Track Your Order</h2>
            </div>
            <div className="m-auto track-box">
              <div className="row py-3" dir='ltr'>
                <div className="col-md-10 my-1">
                  <input type="text" className="form-control" placeholder="Tracking Number " 
                  onChange={(e)=>{setTrackNumber(e.target.value)}}/>
                </div>
                <div className="col-md-2 px-0 my-1">
                <button className="btn btn-orange" onClick={trackOrder}>Track</button>
                </div>
              </div>
            </div>
           
        </div>
        <div className={visible?"bg-lightblue p-4 m-5 details-box d-block":"d-none bg-lightblue p-4 m-5 details-box"}>
          <div className="bg-white">
          <div className="row" dir='ltr'>
            <div className="col-md-4">
              <div className="p-4">
              <h5> <i class="fa-solid fa-truck-fast"></i> Order Number</h5>
              <span className='fw-bold'> {orderDetails.ordernumber}</span>
              </div>
              </div>
            <div className="col-md-4">
              <div className="p-4">
                <h5><i class="fa-regular fa-chart-bar"></i>  Status</h5>
                <span className='fw-bold'> {orderDetails.status}</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4">
                <h5><i class="fa-solid fa-user"></i> Carrier</h5>
                {orderDetails.pickedby?<span className='fw-bold'>collector: {orderDetails.pickedby.firstName}{orderDetails.pickedby.lastName}</span>:
                <span></span>}
                <br />
                {orderDetails.deliveredby?<span className='fw-bold'>reciever: {orderDetails.deliveredby.firstName}{orderDetails.deliveredby.lastName}</span>:
                <span></span>}
              </div>
            </div>
            </div>
            <div className="p-2 my-3">
            <div dir='ltr' className="progress my-4" role="progressbar" aria-label="Success example"  aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar" style={{
  width: orderDetails.status === 'pending' ? '25%' :
         orderDetails.status === 'pick to store' ? '50%' :
         orderDetails.status === 'in store' ? `75%` :
         orderDetails.status === 'pick to client' ? `100%` :
         `0%`
}}>    {/* <i class="fa-solid fa-truck-arrow-right truck-icon"></i> */}
    </div>
  
            </div>
            <div className="d-flex" dir='ltr'>
  <div className="w-25 text-center">
    <span>pending</span>
  </div>
  <div className="w-25 text-center">
    <span>pick to store</span>
  </div>
  <div className="w-25 text-center">
    <span>in store</span>
  </div>
  <div className="w-25 text-center">
    delivered
  </div>
  </div>
            </div>
          </div>
           

           </div>
    </>
  )
}
