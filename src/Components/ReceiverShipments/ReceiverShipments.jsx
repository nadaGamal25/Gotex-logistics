import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function ReceiverShipments() {
  // useEffect(() => {

  //   getOrders()
  // }, [])
  

 
  const [orders, setOrders] = useState([])
  const [cachAmount, setCachAmount] = useState(0);
  const [visaAmount, setVisaAmount] = useState(0);
  const [shipmentsAdmin,setShipmentsAdmin]=useState([])
  const [theLimit,setLimit]=useState(30)
  const [currentPage, setCurrentPage] = useState(Number(1));
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [loading, setLoading] = useState(false);
const [searchStatus, setSearchStatus] = useState('');
const [currentPage2, setCurrentPage2] = useState(Number(1));
  const [numberOfPages2, setNumberOfPages2] = useState(1);
const [secondFilter, setSecondFilter] = useState(false);
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [totalOrders, setTotalOrders] = useState(0);

  async function getOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/get-receiver-orders',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        });
      const List = response.data.data;
      console.log(response)
      setCachAmount(response.data.receiver.collectedCashAmount)
      setVisaAmount(response.data.receiver.collectedVisaAmount)
      setTotalOrders(response.data.pagination.totalOrders)

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

  async function getShipmentsAdmin() {
    try {
      setLoading(true);
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-receiver-orders`, {
        params: {
            page: currentPage,
            limit: 100,
            
          },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
        },
      });
  
      setShipmentsAdmin(response.data.data);
      setSecondFilter(false)
      // setDateFilter(false)
      console.log(response)
      setCurrentPage(response.data.pagination.currentPage);
      setNumberOfPages(response.data.pagination.numberOfPages);
      setTotalOrders(response.data.pagination.totalOrders)

    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false); 
    }
  }
  async function getSearchShipmentsAdmin() {
    setCurrentPage2(1)
    try {
      setLoading(true);
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-receiver-orders`, {
        params: {
            page: currentPage2,
            limit: 100,
            status:searchStatus,
            startDate:startDate,
            endDate:endDate,
            
          },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
        },
      });
  
      setShipmentsAdmin(response.data.data);
      setSecondFilter(true)
      // setDateFilter(false)
      console.log(response)
      setCurrentPage2(response.data.pagination.currentPage);
      setNumberOfPages2(response.data.pagination.numberOfPages);
      setTotalOrders(response.data.pagination.totalOrders)

    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false); 
    }
  }
  
useEffect(() => {
    getShipmentsAdmin();
}, []);


const handlePreviousPage = async () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1); 
    try {
      setLoading(true);
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-receiver-orders`, {
        params: {
            page: currentPage -1,
            limit: 100,
            
          },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
        },
      });
  
      setShipmentsAdmin(response.data.data);
      setSecondFilter(false)
      // setMarketerFilter(false)
      // setDateFilter(false)
      console.log(response)
      setCurrentPage(response.data.pagination.currentPage);
      setNumberOfPages(response.data.pagination.numberOfPages);
      setTotalOrders(response.data.pagination.totalOrders)

    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false); 
    }
  }
};
const handleNextPage = async () => {
  if (currentPage < numberOfPages) {
    setCurrentPage(currentPage + 1);
    try {
      setLoading(true);
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-receiver-orders`, {
        params: {
            page: currentPage +1,
            limit: 100,
            
          },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
        },
      });
  
      setShipmentsAdmin(response.data.data);
      setSecondFilter(false)
      // setMarketerFilter(false)
      // setDateFilter(false)
      console.log(response)
      setCurrentPage(response.data.pagination.currentPage);
      setNumberOfPages(response.data.pagination.numberOfPages);
      setTotalOrders(response.data.pagination.totalOrders)

    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false); 
    }
  }
};
const handlePreviousPage2 = async () => {
if (currentPage2 > 1) {
setCurrentPage2(currentPage2 - 1); 
try {
  setLoading(true);
  const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-receiver-orders`, {
    params: {
      page: currentPage2,
      limit: 100,
      status:searchStatus,
      startDate:startDate,
      endDate:endDate,
        
      },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
    },
  });

  setShipmentsAdmin(response.data.data);
  setSecondFilter(true)
  // setMarketerFilter(false)
  // setDateFilter(false)
  console.log(response)
  setCurrentPage2(response.data.pagination.currentPage);
  setNumberOfPages2(response.data.pagination.numberOfPages);
  setTotalOrders(response.data.pagination.totalOrders)

} catch (error) {
  console.error('Error fetching students:', error);
} finally {
  setLoading(false); 
}
}
};
const handleNextPage2 = async () => {
if (currentPage2 < numberOfPages2) {
setCurrentPage2(currentPage2 + 1) 
try {
  setLoading(true);
  const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-receiver-orders`, {
    params: {
      page: currentPage2,
      limit: 100,
      status:searchStatus,
      startDate:startDate,
      endDate:endDate,
        
      },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
    },
  });

  setShipmentsAdmin(response.data.data);
  setSecondFilter(true)
  // setMarketerFilter(false)
  // setDateFilter(false)
  console.log(response)
  setCurrentPage2(response.data.pagination.currentPage);
  setNumberOfPages2(response.data.pagination.numberOfPages);
  setTotalOrders(response.data.pagination.totalOrders)

} catch (error) {
  console.error('Error fetching students:', error);
} finally {
  setLoading(false); 
}  
}
};

async function getSearchShipmentsPage() {
try {
setLoading(true);
const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-receiver-orders`, {
  params: {
    page: currentPage2,
    limit: 100,
    status:searchStatus,
    startDate:startDate,
    endDate:endDate,
    },
  headers: {
    Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
  },
});

setShipmentsAdmin(response.data.data);
setSecondFilter(true)
console.log(response)
setCurrentPage2(response.data.pagination.currentPage);
setNumberOfPages2(response.data.pagination.numberOfPages);
setTotalOrders(response.data.pagination.totalOrders)

} catch (error) {
console.error('Error fetching students:', error);
} finally {
setLoading(false); 
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
        `https://dashboard.go-tex.net/logistics-test/order/picked-to-client`,
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
      getShipmentsAdmin();
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
        `https://dashboard.go-tex.net/logistics-test/order/order-received`,
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
      getShipmentsAdmin();
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
        `https://dashboard.go-tex.net/logistics-test/order/return-order/${orderid}`,
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
      getShipmentsAdmin();
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
        `https://dashboard.go-tex.net/logistics-test/payment/charge/${orderId}`,
        {}, // Empty body object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
      getShipmentsAdmin();
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
        `https://dashboard.go-tex.net/logistics-test/payment/order-payments/${orderId}`,
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
      <div className="col-md-4">
      <div className="p-2 count-box m-1">
            <span className='text-primary'>عدد الشحنات  : {totalOrders} </span>
          </div>
      </div>
      </div>
    
    {/* <div className="row">
    <div className="col-md-3  p-2 mb-2">
    <select className='form-control m-1'
          
          placeholder="اختر حالة الشحنة"
          onChange={(e) => setOrderStatus(e.target.value)} >
            <option value=""> حالة الشحنة(جميع الشحنات)</option>
            {/* <option value="pending">pending (معلقة)</option>
            <option value="pick to store">pick to store(ف الطريق للمخزن)</option> 
            <option value="in store">in store(فى المخزن)</option>
            <option value="pick to client">pick to client(ف الطريق للعميل)</option>
            {/* <option value="delivered">delivered(تم تسليمها)</option> 
            <option value="canceled">canceled(تم الغائها)</option>
            {/* <option value=''>جميع الشحنات</option> 
            </select>
    </div>
    </div> */}
        <div className="my-table p-4 mb-4 mt-2">
     <div className="row">
        
       
        <div className="col-md-4">
          <select className='form-control m-1'
          
          placeholder="حالة الشحنة"
        //   value={searchPaytype}
          onChange={(e) => setSearchStatus(e.target.value)} >
            <option value="">حالة الشحنة (الكل)</option>
            {/* <option value="pending">pending (معلقة)</option> */}
            <option value="late to store"> الشحنات المتأخرة</option>
            {/* <option value="pick to store">pick to store(ف الطريق للمخزن)</option> */}
            <option value="in store">in store(فى المخزن)</option>
            <option value="pick to client">pick to client(ف الطريق للعميل)</option>
            <option value="delivered">delivered(تم تسليمها)</option>
            <option value="canceled">canceled(تم الغائها)</option>
            </select>
        </div>
        
        <div className="col-md-8 p-1">
          <label>
  التاريخ من:
  <input
    type="date"
    // value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    max={endDate || undefined}
  />
</label>
<label>
  الى:
  <input
    type="date"
    // value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    min={startDate || undefined}
  />
</label>

        </div>
        {/* <div className="col-md-4">
          <input className='form-control m-1' 
          type="search" placeholder=" رقم الصفحة"
          // value={clientFilter}
          onChange={(e) => setCurrentPage2(e.target.value)}
          />
        </div> */}
        <div className="text-center mt-1">
        <button className="btn btn-dark m-1" onClick={getSearchShipmentsAdmin}>
  بحث
</button>  
<button className="btn btn-dark m-1" onClick={getShipmentsAdmin}>عرض جميع الشحنات  </button>

 </div>
      </div>
      </div>
    <div className="row">
    {shipmentsAdmin && shipmentsAdmin.map((item, index) => (
      <div className="col-md-4 p-2 " key={index}>
    {loading ? (
      <span>
        <i className="fa-solid fa-spinner fa-spin"></i>
      </span>
    ) : (
      <>
                <div className="">
                  <div className='order-card p-2'>
                    <p className="text-danger text-center">
                      {item.ordernumber}
                    </p>
                    <span>المرسل : </span>
                    <h6>{item.sendername}</h6>
                    <h6>{item.senderphone} {item.senderphone2 ? (<>,<br/>{item.senderphone2}</>) : null}</h6>
                    <h6>{item.sendercity} ,{item.senderdistrict}</h6>
                    <h6>{item.senderaddress}</h6>
                    <span>المستلم : </span>
                    <h6>{item.recivername}</h6>
                    <h6>{item.reciverphone} {item.reciverphone2 ? (<>,<br/>{item.reciverphone2}</>) : null}</h6>
                    <h6>{item.recivercity} ,{item.reciverdistrict}</h6>
                    <h6>{item.reciveraddress}</h6>
                    <hr className='m-0'/>
                    <span>الوزن : {item.weight}</span>
                    <span className='fw-bold text-dark px-2'> | </span>
                    <span>عدد القطع : {item.pieces}</span>
                    <hr className='m-0'/>
                    <span>الدفع : {item.paytype}</span>
                    <span className='fw-bold text-dark px-2'> | </span>
                    <span>الحالة :
                    {item.isreturn==true && item.status =='in store'?
                <span className='fw-bold'>شحنة رجيع(بالمخزن) </span>:
                item.status=='pending'?
                <span className='fw-bold'>قيد الانتظار</span>:
                item.status=='late to store'?
                <span className='fw-bold'>شحنة متأخرة </span>:
                item.status=='pick to store'?
                <span className='fw-bold'>فى الطريق للمخزن</span>:
                item.status=='in store'?
                <span className='fw-bold'> فى المخزن</span>:
                item.status=='pick to client' && item.isreturn!==true?
                <span className='fw-bold'>فى الطريق للعميل</span>:
                item.status=='pick to client' && item.isreturn===true?
                <span className='fw-bold'>فى الطريق للمرسل</span>:
                item.status=='received'?
                <span className='fw-bold'>تم تسليمها</span>:
                item.status=='canceled'?
                <span className='fw-bold'>تم إلغائها</span>:
                <span>{item.status}</span>}
                    </span>
                    <hr className='m-0'/>
                    <button className="btn btn-success m-1" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button>
                    {item.status == "in store"?
                  <button className="btn btn-orange m-1" onClick={()=>{
                      openModal(item._id)
                  }}>تأكيد الاستلام من المخزن</button>:null}
                  
                  
                  {item.status =='pick to client' && item.paytype === "cod" && item.isreturn != true?
                  <button className="btn btn-danger m-1" onClick={()=>{
                    openModalPayType(item._id)
                }}>اختر طريقة الدفع أولا</button>
                  :null}
                  {item.status =='pick to client'?
                  <button className="btn btn-primary m-1" onClick={()=>{
                      openModalRecieved(item._id)
                  }}>تأكيد استلام العميل</button>:null}
                  {(item.status =='pick to client' || item.status == "received") && item.paytype === "cod" && item.isreturn != true?
                  <button className="btn btn-danger m-1" onClick={()=>{
                      openModalPayments(item._id)
                  }}>حالة الدفع</button>:null}
                  {item.status =="pick to client" && item.isreturn != true?
                  <button className="btn btn-secondary m-1" onClick={()=>{
                      openModalReturn(item._id)
                  }}>إرجاع الشنحة</button>:null}
                  <a href={`https://wa.me/${item.reciverphone}`} className="btn btn-whatsapp" target='_blank'>
                  <i class="fa-brands fa-whatsapp"></i> 
                  للتواصل مع المستلم 
                  </a>
                  </div>
                </div>
                </>)}
      </div>
      ))}
      {secondFilter?(
      <div>
        <button className="btn btn-dark" onClick={handlePreviousPage2} disabled={currentPage2 === 1}>
          الصفحة السابقة 
        </button>
        <span className='px-1'>
          Page {currentPage2} of {numberOfPages2}
        </span>
        <button className="btn btn-dark" onClick={handleNextPage2} disabled={currentPage2 === numberOfPages2}>
          الصفحة التالية 
        </button>
      </div>
      ):
      
      (
        <div>
        <button className="btn btn-dark" onClick={handlePreviousPage} disabled={currentPage === 1}>
          الصفحة السابقة 
        </button>
        <span className='px-1'>
          Page {currentPage} of {numberOfPages}
        </span>
        <button className="btn btn-dark" onClick={handleNextPage} disabled={currentPage === numberOfPages}>
          الصفحة التالية 
        </button>
      </div>
      )}
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
                  <td>{item.createdAt.slice(0, 100)}</td>
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
    <form onSubmit={(e) => { e.preventDefault(); returnOrder(selectedID); }}>
      <div className=''>
        <label htmlFor="">إرفق ملف (اجبارى) </label>
        <input
          type="file"
          className="my-2 my-input form-control"
          multiple
          onChange={handleFileChangeReturn} required
        />
      </div>
      <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" type='submit'>
          تأكيد ارجاع الشحنة
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModalReturn}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
    </form>
  </Modal.Body>
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
