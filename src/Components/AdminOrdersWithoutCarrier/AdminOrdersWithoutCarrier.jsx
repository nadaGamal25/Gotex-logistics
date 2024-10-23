import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminOrdersWithoutCarrier() {
    const [shipmentsAdmin,setShipmentsAdmin]=useState([])
    const [theLimit,setLimit]=useState(30)
    const [currentPage, setCurrentPage] = useState(Number(1));
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [carrierCollector, setCarriersCollector] = useState([]);
    const [carrierReciver, setCarriersReciever] = useState([]);

    const [currentPage2, setCurrentPage2] = useState(Number(1));
    const [numberOfPages2, setNumberOfPages2] = useState(1);
    const [orderId, setOrderId] = useState('');
    const [carrierId, setCarrierId] = useState('');
    const [selectedFilesReciever, setSelectedFilesReciever] = useState([]);
    const [desReciever, setDescReciever] = useState('');
    const [selectedFilesCollector, setSelectedFilesCollector] = useState([]);
    const [descCollector, setDesCollector] = useState('');
    useEffect(() => {
      getCollectorCarriers()
      getRecieverCarriers()
        getShipmentsAdmin()
      }, [])
      async function getCollectorCarriers() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics/carrier/?role=collector',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          });
          const List = response.data.data;
          console.log(List)
          setCarriersCollector(List)
        } catch (error) {
          console.error(error);
        }
      }
      async function getRecieverCarriers() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics/carrier/?role=receiver',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          });
          const List = response.data.data;
          console.log(List)
          setCarriersReciever(List)
        } catch (error) {
          console.error(error);
        }
      }

      async function getShipmentsAdmin() {
        try {
          setLoading(true);
          const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/orders-without-carriers`, {
            params: {
                page: currentPage,
                limit: 100,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
        //   setSecondFilter(false)
          // setDateFilter(false)
          console.log(response)
          setCurrentPage(response.data.pagination.currentPage);
          setNumberOfPages(response.data.pagination.numberOfPages);
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setLoading(false); 
        }
      }

      const handlePreviousPage = async () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1); 
          try {
            setLoading(true);
            const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/orders-without-carriers`, {
              params: {
                  page: currentPage -1,
                  limit: 100,
                  
                },
              headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
              },
            });
        
            setShipmentsAdmin(response.data.data);
            // setMarketerFilter(false)
            // setDateFilter(false)
            console.log(response)
            setCurrentPage(response.data.pagination.currentPage);
            setNumberOfPages(response.data.pagination.numberOfPages);
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
            const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/orders-without-carriers`, {
              params: {
                  page: currentPage +1,
                  limit: 100,
                  
                },
              headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
              },
            });
        
            setShipmentsAdmin(response.data.data);
            // setSecondFilter(false)
            // setMarketerFilter(false)
            // setDateFilter(false)
            console.log(response)
            setCurrentPage(response.data.pagination.currentPage);
            setNumberOfPages(response.data.pagination.numberOfPages);
          } catch (error) {
            console.error('Error fetching students:', error);
          } finally {
            setLoading(false); 
          }
        }
      };
      const [showModal, setShowModal] = useState(false);

  const openModal = (orderid) => {
    setShowModal(true);
    setOrderId(orderid)
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFilesCollector([])
  }
  const [showModal2, setShowModal2] = useState(false);

  const openModal2 = (orderid) => {
    setShowModal2(true);
    setOrderId(orderid)
  };

  const closeModal2 = () => {
    setShowModal2(false);
    setSelectedFilesReciever([])
  }


  async function addCollector() {
    const formData = new FormData();
        formData.append('orderId', orderId);
        formData.append('carrierId', carrierId);
        formData.append('description', descCollector);
        
        selectedFilesCollector.forEach((file) => {
          formData.append('images', file);
        });
    
    try {
        const response = await axios.put(
          `https://dashboard.go-tex.net/logistics-test/order/add-order-to-collector`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          }
        );
  
        console.log(response);
        window.alert('تمت اضافة المندوب بنجاح');
        closeModal()
        getShipmentsAdmin()
        setSelectedFilesCollector([])
     
    } catch (error) {
        // setError(error.response.data.msg)
        console.log(error.response)
        console.log(carrierId)
        console.log(orderId)
        window.alert(error.response.data.msg)
        // window.alert(error.response?.data?.msg || error.response?.data?.msg?.name || error.response?.data?.errors[0]?.msg|| "error")
    }
  }
  async function addReciever() {
    const formData = new FormData();
        formData.append('orderId', orderId);
        formData.append('carrierId', carrierId);
        formData.append('description', desReciever);
        
        selectedFilesCollector.forEach((file) => {
          formData.append('images', file);
        });
    
    try {
        const response = await axios.put(
          `https://dashboard.go-tex.net/logistics-test/order/add-order-to-receiver`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          }
        );
  
        console.log(response);
        window.alert('تمت اضافة المندوب بنجاح');
        closeModal2()
        getShipmentsAdmin()
        selectedFilesReciever([])
      
    } catch (error) {
        // setError(error.response.data.msg)
        console.log(error.response)
        console.log(carrierId)
        console.log(orderId)
        window.alert(error.response.data.msg)
        // window.alert(error.response?.data?.msg || error.response?.data?.msg?.name || error.response?.data?.errors[0]?.msg|| "error")
    }
  }
  function handleFileChangeReciever(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesReciever((prevFiles) => [...prevFiles, ...files]);
  }
  function handleFileChangeCollector(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesCollector((prevFiles) => [...prevFiles, ...files]);
  }

  const handleSelectCarrierCollector = (selectedValue) => {
    const selectedCarrier = carrierCollector.find(carrier =>
      `${carrier.firstName} ${carrier.lastName}, ${carrier.mobile}, ${carrier.role}` === selectedValue
    );
    if (selectedCarrier) {
      setCarrierId(selectedCarrier._id);
    }
  };
  const handleSelectCarrierReciever = (selectedValue) => {
    const selectedCarrier = carrierReciver.find(carrier =>
      `${carrier.firstName} ${carrier.lastName}, ${carrier.mobile}, ${carrier.role}` === selectedValue
    );
    if (selectedCarrier) {
      setCarrierId(selectedCarrier._id);
    }
  };
  return (
    <>
    <div className='p-5' id='content'>
         <div className="my-table p-4 my-4">
     
       <table className="table" id="table-to-export">
         <thead>
         <tr>
               <th scope="col">#</th>
               <th scope="col"> التاريخ</th>
               <th scope="col"> المرسل</th>
               <th scope="col">جوال المرسل</th>
               <th scope="col"> المستلم</th>
               <th scope="col">جوال المستلم</th>
               {/* <th scope="col"> billcode</th> */}
               <th scope="col">رقم الشحنة</th>
               <th scope="col">طريقة الدفع</th>
               <th scope="col">السعر </th>
               <th scope="col">الوزن</th>
               <th scope="col">عدد القطع</th>
               <th scope="col">حالة الشحنة</th>
               <th scope="col">ملف الالغاء</th>
               <th scope="col">مندوب التجميع</th>
               <th scope="col">مندوب التسليم</th>
               <th scope="col">امين المخزن</th>
               <th scope="col">المدخل</th>
               <th scope="col"></th>
             </tr>
         </thead>
         <tbody>
         {shipmentsAdmin && shipmentsAdmin.map((item, index) => (
<tr key={index} className={item.status === "canceled" ? 'cancel' : ''}>
 {loading ? (
   <td>
     <i className="fa-solid fa-spinner fa-spin"></i>
   </td>
 ) : (
   <>
                   <td>{index + 1}</td>
                   <td>{item.createdAt.slice(0, 10)}</td>
                   <td>{item.sendername}</td>
                   <td>{item.senderphone}</td>
                   <td>{item.recivername}</td>
                   <td>{item.reciverphone}</td>
                   {/* <td>{item.billcode}</td> */}
                   <td>{item.ordernumber}</td>
                   <td>{item.paytype}</td>
                   <td>{item.price}</td>
                   <td>{item.weight}</td>
                   <td>{item.pieces}</td>
                   {item.isreturn==true && item.status =='in store'?
                <td >شحنة رجيع(بالمخزن) </td>:
                item.status=='pending'?
                <td >قيد الانتظار</td>:
                item.status=='late to store'?
                <td >شحنة متأخرة </td>:
                item.status=='pick to store'?
                <td >فى الطريق للمخزن</td>:
                item.status=='in store'?
                <td > فى المخزن</td>:
                item.status=='pick to client' && item.isreturn!==true?
                <td >فى الطريق للعميل</td>:
                item.status=='pick to client' && item.isreturn===true?
                <td >فى الطريق للمرسل</td>:
                item.status=='received'?
                <td >تم تسليمها</td>:
                item.status=='canceled'?
                <td >تم إلغائها</td>:
                <td>{item.status}</td>}                   {item.images && item.images[0]?<td>
               <a href={item.images[0].replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الملف</a>
             </td>:<td>_</td>}
                   {item.collector && item.collector.length > 0 && item.collector[0].firstName ? (
<td>{item.collector[0].firstName} {item.collector[0].lastName} <br/>
{item.addCarrierReason?.collector?.description?
<span className='text-danger'>{item.addCarrierReason.collector.description}</span>:null} <br/>
{item.addCarrierReason.collector.images && item.addCarrierReason.collector.images[0]?
               <a href={item.addCarrierReason.collector.images[0].replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الملف</a>
             :null} </td>
) : (
<td></td>
)}
{item.receiver&& item.receiver.length > 0 && item.receiver[0].firstName ? (
<td>{item.receiver[0].firstName} {item.receiver[0].lastName}  <br/>
{item.addCarrierReason?.receiver?.description?
<span className='text-danger'>{item.addCarrierReason.receiver.description}</span>:null} <br/>
{item.addCarrierReason.receiver.images && item.addCarrierReason.receiver.images[0]?
               <a href={item.addCarrierReason.receiver.images[0].replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الملف</a>
             :null}</td>
) : (
<td></td>
)}  
{item.storekeeper&& item.storekeeper.length > 0 && item.storekeeper[0].firstName ? (
  <td>{item.storekeeper[0].firstName} {item.storekeeper[0].lastName}</td>
) : (
  <td></td>
)} 
{item.user&& item.user.length > 0 && item.user[0].firstName ? (
<td>{item.user[0].firstName} {item.user[0].lastName}</td>
) : (
<td></td>
)}  
   {item.status == 'pending'?
   <td><button className="btn btn-success" onClick={()=>{
    openModal(item._id)
   }}>إضافة مندوب تجميع</button></td>
   :item.status=='in store'?<td><button className="btn btn-success" onClick={()=>{
    openModal2(item._id)
   }}>إضافة مندوب تسليم</button></td>
   :null}                 
 
                 
   </>
 )}
</tr>
))}         
     </tbody>
   </table>
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
  </div>
    </div>
    <Modal show={showModal} onHide={closeModal}>
        <Modal.Header >
          <Modal.Title> قم باختيار مندوب
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <form onSubmit={(e) => { e.preventDefault(); addCollector(orderId); }}>
      <div className=''>
        <label>اسم المندوب</label>
        <input list='myData'
          onChange={(e) => handleSelectCarrierCollector(e.target.value)}
                                            type="text"
                                            className='my-input my-2 form-control' placeholder='اسم المندوب'
                                        />
                                     <datalist id='myData'>
  {carrierCollector && carrierCollector.map((carrier, ciIndex) => (
    <option key={ciIndex} value={`${carrier.firstName} ${carrier.lastName}, ${carrier.mobile}, ${carrier.role}`}  
      onClick={() => {
        setCarrierId(carrier._id);
      }}
    />
  ))}
</datalist>
        <label htmlFor="">إضافة ملاحظة: </label>
        <input
          type="text"
          className="my-2 my-input form-control"
          onChange={(e) => { setDesCollector(e.target.value); }} required
        />
        <label htmlFor="">إرفق ملف () </label>
        <input
          type="file"
          className="my-2 my-input form-control"
          name="images"
          multiple
          onChange={handleFileChangeCollector} required
        />
      </div>
      <Modal.Footer>
        <div className="text-center">
          <Button className='m-1' variant="danger" type="submit">
          إضافة مندوب تجميع
          </Button>
          <Button variant="secondary" type='button' onClick={closeModal}>
            إغلاق
          </Button>
        </div>
      </Modal.Footer>
    </form>
  </Modal.Body>
       
        
      </Modal>
      <Modal show={showModal2} onHide={closeModal2}>
        <Modal.Header >
          <Modal.Title> قم باختيار مندوب
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <form onSubmit={(e) => { e.preventDefault(); addReciever(orderId); }}>
      <div className=''>
        <label>اسم المندوب</label>
        <input list='myData'
          onChange={(e) => handleSelectCarrierReciever(e.target.value)}
                                            type="text"
                                            className='my-input my-2 form-control' placeholder='اسم المندوب'
                                        />
                                     <datalist id='myData'>
  {carrierReciver && carrierReciver.map((carrier, ciIndex) => (
    <option key={ciIndex} value={`${carrier.firstName} ${carrier.lastName}, ${carrier.mobile}, ${carrier.role}`}  
      onClick={() => {
        setCarrierId(carrier._id);
      }}
    />
  ))}
</datalist>
        <label htmlFor="">إضافة ملاحظة: </label>
        <input
          type="text"
          className="my-2 my-input form-control"
          onChange={(e) => { setDesCollector(e.target.value); }} required
        />
        <label htmlFor="">إرفق ملف () </label>
        <input
          type="file"
          className="my-2 my-input form-control"
          name="images"
          multiple
          onChange={handleFileChangeReciever} required
        />
      </div>
      <Modal.Footer>
        <div className="text-center">
          <Button className='m-1' variant="danger" type="submit">
          إضافة مندوب تسليم
          </Button>
          <Button variant="secondary" type='button' onClick={closeModal2}>
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
