import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CollectorShipments() {
  // useEffect(() => {

  //   getOrders()
  // }, [])
  const [orders, setOrders] = useState([])
  const [orderStatus, setOrderStatus]=useState('')
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
      const response = await axios.get('https://dashboard.go-tex.net/logistics/order/get-collector-orders',
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

  async function getShipmentsAdmin() {
    try {
      setLoading(true);
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-collector-orders`, {
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
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-collector-orders`, {
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
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-collector-orders`, {
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
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-collector-orders`, {
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
  const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-collector-orders`, {
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
  const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-collector-orders`, {
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
const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-collector-orders`, {
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
        `https://dashboard.go-tex.net/logistics/order/picked-to-store`,
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
        `https://dashboard.go-tex.net/logistics/order/in-store-request`,
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
      getShipmentsAdmin();
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
        `https://dashboard.go-tex.net/logistics/order/cancel-order-by-collector`,
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
      getShipmentsAdmin();
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

  const filteredOrdersFirst = 
   orders.filter(order => order.status === "pending"  || order.status === "pick to store"
    || order.status === "late to store" || order.status === "canceled")

  
  const filteredOrders = orderStatus
  ? filteredOrdersFirst.filter(order => order.status === orderStatus)
  : filteredOrdersFirst;

  return (
    <>
    <div className='p-4' id='content'>
    <div className="my-table p-4 mb-4">
      <div className="row">
        
       
        <div className="col-md-4">
          <select className='form-control m-1'
          
          placeholder="حالة الشحنة"
        //   value={searchPaytype}
          onChange={(e) => setSearchStatus(e.target.value)} >
            <option value="">حالة الشحنة (الكل)</option>
            <option value="pending">pending (معلقة)</option>
            <option value="late to store"> الشحنات المتأخرة</option>
            <option value="pick to store">pick to store(ف الطريق للمخزن)</option>
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
      <div className="p-2 count-box m-1">
            <span className='text-primary'>عدد الشحنات  : {totalOrders} </span>
          </div>
 </div>
      </div>
    </div>
    {/* <div className="row">
    <div className="col-md-3  p-2 mb-2">
    <select className='form-control m-1'
          
          placeholder="اختر حالة الشحنة"
          onChange={(e) => setOrderStatus(e.target.value)} >
            <option value=""> حالة الشحنة(جميع الشحنات)</option>
            <option value="pending">pending (معلقة)</option>
            <option value="pick to store">pick to store(ف الطريق للمخزن)</option>
            {/* <option value="in store">in store(فى المخزن)</option> 
             {/*<option value="delivered">delivered(تم تسليمها)</option> 
            <option value="canceled">canceled(تم الغائها)</option>
            <option value="late to store"> الشحنات المتأخرة</option>
            {/* <option value=''>جميع الشحنات</option> 
            </select>
    </div>
    </div> */}
    <div className="row">
    {shipmentsAdmin && shipmentsAdmin.map((item, index) => (
      <div className="col-md-4 p-2 " key={index}>
    {loading ? (
      <span>
        <i className="fa-solid fa-spinner fa-spin"></i>
      </span>
    ) : (
      <>
      <div >
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
                    {item.status == 'pending'?
                  <button className="btn btn-orange m-1" onClick={()=>{
                   
                    openModal(item._id)
                  }}>تأكيد استلام الشنحة</button>:null}
                  {item.status == 'pick to store' || item.status=='late to store'?
                   <button className="btn btn-secondary m-1" onClick={()=>{
                      openModalInStore(item._id)
                  }}>تبليغ امين المخزن</button>:null}
                  {item.status == "pending" ?
                  <button className="btn btn-danger m-1" onClick={()=>{
                      openModalCancel(item._id)
                  }}>إلغاء الشنحة</button>:null}
                  <a href={`https://wa.me/${item.senderphone}`} className="btn btn-whatsapp" target='_blank'>
                  <i class="fa-brands fa-whatsapp"></i> 
                  للتواصل مع المرسل 
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
      {/* <div>
<input className=' m-1' type="number" 

placeholder="رقم الصفحة "
onChange={(e) => setCurrentPage2(e.target.value)} />
<button className="btn btn-primary m-1" onClick={getSearchShipmentsPage}>
            بحث برقم الصفحة
        </button>
      </div>
      */}
      
    {/* {filteredOrders && filteredOrders
    .map((item, index) => {
              return (
                <div className="col-md-4 p-2 " key={index}>
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
                    {item.status == 'pending'?
                  <button className="btn btn-orange m-1" onClick={()=>{
                   
                    openModal(item._id)
                  }}>تأكيد استلام الشنحة</button>:null}
                  {item.status == 'pick to store' || item.status=='late to store'?
                   <button className="btn btn-secondary m-1" onClick={()=>{
                      openModalInStore(item._id)
                  }}>تبليغ امين المخزن</button>:null}
                  {item.status == "pending" ?
                  <button className="btn btn-danger m-1" onClick={()=>{
                      openModalCancel(item._id)
                  }}>إلغاء الشنحة</button>:null}
                  <a href={`https://wa.me/${item.senderphone}`} className="btn btn-whatsapp" target='_blank'>
                  <i class="fa-brands fa-whatsapp"></i> 
                  للتواصل مع المرسل 
                  </a>
                  </div>
                </div>
              )})} */}
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
