import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StoreKeeperOrders() {
    // useEffect(() => {
    //     getOrders()
    //     getUsersCarriersAdmin()
    //   }, [])
      const [orders, setOrders] = useState([])
      const [orderId, setOrderId] = useState('');
      const [carrierId, setCarrierId] = useState('');
      const [carriersListAdmin, setCarriersListsAdmin] = useState([]);
      const [cachAmount, setCachAmount] = useState(0);
      const [visaAmount, setVisaAmount] = useState(0);
      const [totalOrders, setTotalOrders] = useState(0);
      const [shipmentsAdmin,setShipmentsAdmin]=useState([])
      const [theLimit,setLimit]=useState(30)
      const [currentPage, setCurrentPage] = useState(Number(1));
      const [numberOfPages, setNumberOfPages] = useState(1);
      const [loading, setLoading] = useState(false);
      const [searchStatus, setSearchStatus] = useState('');
      const [searchReciever, setSearchReciever] = useState('');
      const [searchPaytype, setSearchPaytype] = useState('');
    const [currentPage2, setCurrentPage2] = useState(Number(1));
      const [numberOfPages2, setNumberOfPages2] = useState(1);
      const [secondFilter, setSecondFilter] = useState(false);
      const [isDisabled, setIsDisabled] = useState(false);
      const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

      async function getOrders() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/get-storekeeper-orders',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
              },
            });
          const List = response.data.data;
          console.log(response)
          setOrders(List)
          setCachAmount(response.data.storekeeper.collectedCashAmount)
          setVisaAmount(response.data.storekeeper.collectedVisaAmount)
          setTotalOrders(response.data.pagination.totalOrders)

        } catch (error) {
          console.error(error);
        }
      }
      const [recieverName, setRecieverName] = useState('');
      async function getSearchOrders() {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-testorder/order/get-storekeeper-orders`, {
            params: {
              receiver: recieverName,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
            },
          });
      
          setOrders(response.data.data);
         
          console.log(response)
          
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      }
    
      async function getSticker(orderId) {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/getorder/${orderId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-storekeeper-orders`, {
            params: {
                page: currentPage,
                limit: 100,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(false)
          // setDateFilter(false)
          console.log(response)
          setCurrentPage(response.data.pagination.currentPage);
          setNumberOfPages(response.data.pagination.numberOfPages);
          setCachAmount(response.data.storekeeper.collectedCashAmount)
          setVisaAmount(response.data.storekeeper.collectedVisaAmount)
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-storekeeper-orders`, {
            params: {
                page: currentPage2,
                limit: 100,
                status:searchStatus,
                receiver:searchReciever,
                paytype:searchPaytype,
                startDate:startDate,
            endDate:endDate,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(true)
          // setDateFilter(false)
          console.log(response)
          setCurrentPage2(response.data.pagination.currentPage);
          setNumberOfPages2(response.data.pagination.numberOfPages);
          setCachAmount(response.data.storekeeper.collectedCashAmount)
          setVisaAmount(response.data.storekeeper.collectedVisaAmount)
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-storekeeper-orders`, {
            params: {
                page: currentPage -1,
                limit: 100,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(false)
          // setMarketerFilter(false)
          // setDateFilter(false)
          console.log(response)
          setCurrentPage(response.data.pagination.currentPage);
          setNumberOfPages(response.data.pagination.numberOfPages);
          setCachAmount(response.data.storekeeper.collectedCashAmount)
          setVisaAmount(response.data.storekeeper.collectedVisaAmount)
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-storekeeper-orders`, {
            params: {
                page: currentPage +1,
                limit: 100,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(false)
          // setMarketerFilter(false)
          // setDateFilter(false)
          console.log(response)
          setCurrentPage(response.data.pagination.currentPage);
          setNumberOfPages(response.data.pagination.numberOfPages);
          setCachAmount(response.data.storekeeper.collectedCashAmount)
          setVisaAmount(response.data.storekeeper.collectedVisaAmount)
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
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-storekeeper-orders`, {
        params: {
          page: currentPage2,
          limit: 100,
          status:searchStatus,
          receiver:searchReciever,
          paytype:searchPaytype,
          startDate:startDate,
            endDate:endDate,
            
          },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
        },
      });
    
      setShipmentsAdmin(response.data.data);
      setSecondFilter(true)
      // setMarketerFilter(false)
      // setDateFilter(false)
      console.log(response)
      setCurrentPage2(response.data.pagination.currentPage);
      setNumberOfPages2(response.data.pagination.numberOfPages);
      setCachAmount(response.data.storekeeper.collectedCashAmount)
      setVisaAmount(response.data.storekeeper.collectedVisaAmount)
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
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-storekeeper-orders`, {
        params: {
          page: currentPage2,
          limit: 100,
          status:searchStatus,
          receiver:searchReciever,
          paytype:searchPaytype,
          startDate:startDate,
          endDate:endDate,
          },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
        },
      });
    
      setShipmentsAdmin(response.data.data);
      setSecondFilter(true)
      // setMarketerFilter(false)
      // setDateFilter(false)
      console.log(response)
      setCurrentPage2(response.data.pagination.currentPage);
      setNumberOfPages2(response.data.pagination.numberOfPages);
      setCachAmount(response.data.storekeeper.collectedCashAmount)
      setVisaAmount(response.data.storekeeper.collectedVisaAmount)
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
    const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-storekeeper-orders`, {
      params: {
        page: currentPage2,
        limit: 100,
        status:searchStatus,
        receiver:searchReciever,
        paytype:searchPaytype,
        startDate:startDate,
            endDate:endDate,
        },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
      },
    });
    
    setShipmentsAdmin(response.data.data);
    setSecondFilter(true)
    console.log(response)
    setCurrentPage2(response.data.pagination.currentPage);
    setNumberOfPages2(response.data.pagination.numberOfPages);
    setCachAmount(response.data.storekeeper.collectedCashAmount)
    setVisaAmount(response.data.storekeeper.collectedVisaAmount)
    setTotalOrders(response.data.pagination.totalOrders)
    } catch (error) {
    console.error('Error fetching students:', error);
    } finally {
    setLoading(false); 
    }
    } 



      const [selectedFilesAddReciever, setSelectedFilesAddReciever] = useState([]);
      const [descAddReciever, setDescAddReciever] = useState('');
      async function AddRecieverOrder() {
        console.log(selectedFilesAddReciever)
        const formData = new FormData();
        formData.append('orderId', orderId);
        formData.append('carrierId', carrierId);
        formData.append('description', descAddReciever);
        
        selectedFilesAddReciever.forEach((file) => {
          formData.append('images', file);
        });
      
        try {
          formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });
          const response = await axios.put(
            `https://dashboard.go-tex.net/logistics-test/order/add-order-to-receiver`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
              },
            }
          );
      
          console.log(response);
          closeModalAddReciever();
          setSelectedFilesAddReciever([]);
          window.alert('تمت اضافة المندوب بنجاح');
          getShipmentsAdmin();
        } catch (error) {
          console.error(error);
          alert(error.response.data.msg);
        }
      }
      
      function handleFileChangeAddReciever(event) {
        const files = Array.from(event.target.files);
        setSelectedFilesAddReciever((prevFiles) => [...prevFiles, ...files]);
      }
      
      const [showModalAddReciever, setShowModalAddReciever] = useState(false);
    
      const openModalAddReciever = (orderid) => {
        setShowModalAddReciever(true);
        setOrderId(orderid)
      };
    
      const closeModalAddReciever = () => {
        setShowModalAddReciever(false);
        setSelectedFilesAddReciever([])
      };
      async function addReciever() {
    
        try {
            const response = await axios.put(
              `https://dashboard.go-tex.net/logistics-test/order/add-order-to-receiver`,
              {
                orderId: orderId,
                carrierId: carrierId,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
                },
              }
            );
      
          if (response.status === 200) {
            console.log(response);
            window.alert('تمت اضافة المندوب بنجاح');
            closeModal()
            getShipmentsAdmin()
          } else {
            // setError(response.data.msg);
          }
        } catch (error) {
            console.log(error.response)
               window.alert(error.response.data.msg)
            // window.alert(error.response?.data?.msg || error.response?.data?.msg?.name || error.response?.data?.errors[0]?.msg|| "error")
        }
      }
      const handleSelectCarrier = (selectedValue) => {
        const selectedCarrier = carriersListAdmin.find(carrier =>
          `${carrier.firstName} ${carrier.lastName}, ${carrier.mobile}, ${carrier.role}` === selectedValue
        );
        if (selectedCarrier) {
          setCarrierId(selectedCarrier._id);
        }
      };
      const [showModal, setShowModal] = useState(false);

      const openModal = (orderid) => {
        setShowModal(true);
        setOrderId(orderid)
      };
    
      const closeModal = () => {
        setShowModal(false);
      }
      
      async function getUsersCarriersAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics-test/carrier/get-receivers'
          ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
            },
          }
        );
          const List = response.data.data;
          console.log(List)
          setCarriersListsAdmin(List)
        } catch (error) {
          console.error(error);
        }
      }

      const [showModal2, setShowModal2] = useState(false);

      const openModal2 = (orderid) => {
        setShowModal2(true);
        setOrderId(orderid)
      };
    
      const closeModal2 = () => {
       setShowModal2(false);
      }

      const [selectedFiles, setSelectedFiles] = useState([]);
      function handleFileChange(event) {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
      }

      async function acceptOrder(orderid) {
        console.log(selectedFiles)
    const formData = new FormData();
    formData.append('orderId', orderid);
    formData.append('requestStatus', "accepted");
    selectedFiles.forEach((file) => {
      formData.append('images.inStoreRequestStatus', file);
    });
    
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/in-store-request-status`,
         formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
          },
        }
      );
      alert('تم الموافقة على استلام الشحنة')     
      closeModal2()  
      console.log(response);
      setSelectedFiles([]);
      getShipmentsAdmin()
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg)
    }
  }

  async function rejectOrder(orderid) {
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/in-store-request-status`,
        {
          orderId: orderid,
          requestStatus: "rejected"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
          },
        }
      );
      alert('تم رفض استلام الشحنة')
      closeModal2()
      console.log(response);
      getShipmentsAdmin()
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg)

    }
  }

  // problem order
  const [selectedFilesProblem, setSelectedFilesProblem] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [descProblem , setDescProblem]=useState([]);
  async function problemOrder(orderid) {
    console.log(selectedFilesProblem)
    const formData = new FormData();
    formData.append('orderId', orderid);
    formData.append('description', descProblem);
    
    selectedFilesProblem.forEach((file) => {
      formData.append('problem.images', file);
    });
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/problem-request`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModalProblem();
      setSelectedFilesProblem([]);
      window.alert('تم الابلاغ عن المشكلة')
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChangeProblem(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesProblem((prevFiles) => [...prevFiles, ...files]);
  }
  
  const [showModalProblem, setShowModalProblem] = useState(false);

  const openModalProblem = (orderid) => {
    setShowModalProblem(true);
    setSelectedID(orderid)
  };

  const closeModalProblem = () => {
    setShowModalProblem(false);
    setSelectedFilesProblem([])
  };

  async function takeOrderMoney(orderId) {
    try {
      const token = localStorage.getItem('storekeeperToken');
      if (!token) {
        throw new Error('Token not found');
      }
  
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/take-order-money/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
      getShipmentsAdmin();
      alert("لقد تم التأكيد بنجاح")
      
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  async function confirmPaidWithVisa(orderId) {
    try {
      const token = localStorage.getItem('storekeeperToken');
      if (!token) {
        throw new Error('Token not found');
      }
  
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/order-paid-with-visa/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
      getShipmentsAdmin();
      alert("لقد تم التأكيد بنجاح")
      
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }


  const [orderStatus, setOrderStatus]=useState(null)
  const filteredOrdersFirst = 
  orders.filter(order=>order.paidWithVisaFromStorekeeper ===false && order.storekeeperPaidCash===false)

 
 const filteredOrders = orderStatus
 ? filteredOrdersFirst.filter(order => order[orderStatus] === true)
 : filteredOrdersFirst;
      return (
        <>
        <div className='p-5' id='content'>
          <div className="row">
          
          <div className="col-md-4">
          <div className="p-2 count-box  m-1">
            <span>الشحنات المستلمة كاش  : {orders.filter((order)=> order.status == 'received' && order.receiverPaidCash== true && order.storekeeperPaidCash===false).length}</span>
          </div>
          </div>
          <div className="col-md-4">
          <div className="p-2 count-box  m-1">
            <span>الشحنات المستلمة فيزا  : {orders.filter((order)=> order.status == 'received' && order.orderPaidWithVisa== true && order.paidWithVisaFromStorekeeper ===false).length}</span>
          </div>
          </div>
          <div className="col-md-4">
          <div className="p-2 count-box m-1">
            <span>الشحنات ف المخزن  : {orders.filter((order)=> order.status == 'in store').length}</span>
          </div>
          </div>
          <div className="col-md-4">
          <div className="p-2 count-box  m-1">
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
          
          <div className="my-table p-4 mb-4 mt-3">
      <div className="row">
        
       
        <div className="col-md-4">
          <select className='form-control m-1' disabled={isDisabled}
          
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
        <div className="col-md-4">
          <input className='form-control m-1' 
          type="search" placeholder=" اسم مندوب التسليم"
          // value={clientFilter}
          onChange={(e) => setSearchReciever(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className='form-control m-1'
          
          placeholder="حالة الدفع"
        //   value={searchPaytype}
          onChange={(e) => {setSearchPaytype(e.target.value)
            setSearchStatus('')
            setIsDisabled(true)
          }
          } >
            <option value="">حالة الدفع (الكل)</option>
            <option value="cash cod"> المدفوعة كاش</option>
            <option value="visa cod"> المدفوعة فيزا </option>
            
            </select>
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
          
          
          {/* <div className="bg-b p-2 mb-4 mt-3">
      <div className="row">
        
        <div className="col-md-4">
          <input className='form-control m-1' 
          type="search" placeholder=" اسم مندوب التسليم"
          onChange={(e) => setRecieverName(e.target.value)}
          />
        </div>
        <div className="col-md-8">
        <button className="btn btn-dark m-1" onClick={getSearchOrders}>
  بحث
 </button>  
 <button className="btn btn-dark m-1" onClick={getShipmentsAdmin}>عرض جميع الشحنات  </button>

 </div>
        
 
      </div>
    </div>
    <div className="bg-b p-2 mb-4 mt-3">
    <div className="row">
    <div className="col-md-4">
    <select className='form-control m-1'
          
          placeholder="اختر حالة الشحنة"
          onChange={(e) => {
            setOrderStatus(e.target.value)
          }} >
            <option value="">  (جميع الشحنات)</option>
            <option value="receiverPaidCash">الشحنات المدفوعة كاش</option>
            <option value="orderPaidWithVisa">الشحنات المدفوعة فيزا</option>
           
            </select>
    </div>
    </div>
    </div> */}
          <div className="my-table p-4 mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"> المرسل</th>
                  <th scope="col"> المستلم</th>
                  {/* <th scope="col"> billcode</th> */}
                  <th scope="col">رقم الشحنة</th>
                  <th scope="col">طريقة الدفع</th>
                  <th scope="col">السعر </th>
                  <th scope="col">الوزن</th>
                  <th scope="col">عدد القطع</th>
                  <th scope="col">حالة الشحنة</th>
                  <th scope="col">مندوب التسليم</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
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
                      <td>{item.sendername}</td>
                      <td>{item.recivername}</td>
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
                <td>{item.status}</td>}                      {item.deliveredby?<td>{item.deliveredby.fullName}</td>:<td>_</td>}
                      <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
                      {item.status == 'in store'?
                      <td><button className="btn btn-orange" onClick={()=>{
    openModalAddReciever(item._id)
   }}>إضافة مندوب </button></td>  :null}
   {item.status=='pick to store'?
   <td><button className="btn btn-primary" onClick={()=>{
    openModal2(item._id)
   }}>تأكيد استلام الشحنة </button></td>  
   :null}

                   {item.status=='received' && !item.payment && item.receiverPaidCash ==false && item.paytype !== 'cc' && item.isreturn===false?   
                  <td><button className="btn btn-orange" onClick={()=>{
                    if(window.confirm('هل قمت باستلام المبلغ كاش لهذه الشحنة ؟')){
                      takeOrderMoney(item._id)
                    }
                    }}>تأكيد استلام كاش  </button></td> :null}
                    {item.status=='received' && item.payment  && item.orderPaidWithVisa ==false && item.isreturn===false?   
                  <td><button className="btn btn-orange" onClick={()=>{
                    if(window.confirm('هل تم دفع المبلغ الخاص بهذه الشحنة بواسطة الفيزا ؟')){
                      confirmPaidWithVisa(item._id)
                    }
                    }}>تأكيد الدفع فيزا   </button></td> :null}
                   <td>
                    <button className="btn btn-danger" onClick={() => { openModalProblem(item._id) }}>تبليغ مشكلة</button>
                   </td>
                   </>
    )}
                   </tr>
))}                  
                
              </tbody>
    
    
            </table>
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
        
        </div>
        <Modal show={showModalAddReciever} onHide={closeModalAddReciever}>
  <Modal.Header>
    <Modal.Title>قم باختيار مندوب </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={(e) => { e.preventDefault(); AddRecieverOrder(selectedID); }}>
      <div className=''>
        <label>اسم المندوب</label>
      <input list='myData'
           onChange={(e) => handleSelectCarrier(e.target.value)}
                                             type="text"
                                             className='my-input my-2 form-control' placeholder='اسم المندوب'
                                         />
                                      <datalist id='myData'>
   {carriersListAdmin && carriersListAdmin.map((carrier, ciIndex) => (
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
          onChange={(e) => { setDescAddReciever(e.target.value); }} required
        />
        <label htmlFor="">إرفق ملف () </label>
        <input
          type="file"
          className="my-2 my-input form-control"
          name="images"
          multiple
          onChange={handleFileChangeAddReciever} required
        />
      </div>
      <Modal.Footer>
        <div className="text-center">
          <Button className='m-1' variant="danger" type="submit">
          إضافة مندوب تسليم
          </Button>
          <Button className='m-1' variant="secondary" type='button' onClick={closeModalAddReciever}>
            إغلاق
          </Button>
        </div>
      </Modal.Footer>
    </form>
  </Modal.Body>
</Modal>


         <Modal show={showModal} onHide={closeModal}>
         <Modal.Header >
           <Modal.Title> قم باختيار مندوب
              </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <div className='text-center'>
           <input list='myData'
           onChange={(e) => handleSelectCarrier(e.target.value)}
                                             type="text"
                                             className='my-input my-2 form-control' placeholder='اسم المندوب'
                                         />
                                      <datalist id='myData'>
   {carriersListAdmin && carriersListAdmin.map((carrier, ciIndex) => (
     <option key={ciIndex} value={`${carrier.firstName} ${carrier.lastName}, ${carrier.mobile}, ${carrier.role}`}  
       onClick={() => {
         setCarrierId(carrier._id);
       }}
     />
   ))}
 </datalist>
            </div>
         </Modal.Body>
         <Modal.Footer>
           
           
           <Button variant="success" onClick={()=>{addReciever()}}>
           إضافة مندوب تسليم
           </Button>
           <Button variant="secondary" onClick={closeModal}>
           إغلاق
           </Button>
         </Modal.Footer>
       </Modal>
       <Modal show={showModal2} onHide={closeModal2}>
         <Modal.Header >
           <Modal.Title> هل قمت باستلام هذه الشحنة من مندوب التجميع بالفعل؟ 
              </Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <div className=''>
          <label htmlFor="">إرفق ملف  (اختياري) </label>
          <input
  type="file"
  className="my-2 my-input form-control"
  multiple
  onChange={handleFileChange}
/>
 
          </div>
           
         </Modal.Body>
         <Modal.Footer>
         <div className='text-center'>
           <Button className='m-1' variant="success" onClick={()=>{acceptOrder(orderId)}}>
      تأكيد
           </Button>
           <Button className='m-1' variant="danger" onClick={()=>{rejectOrder(orderId)}}>
      رفض
           </Button>
           <Button variant="secondary" onClick={closeModal2}>
           إغلاق
           </Button>
            </div>
           
           
        
         </Modal.Footer>
       </Modal>
       <Modal show={showModalProblem} onHide={closeModalProblem}>
        <Modal.Header >
        <Modal.Title> هل تريد الابلاغ عن مشكلة فى هذه الشحنة؟  
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className=''>
          <label htmlFor="">وصف المشكلة</label>
          <input
  type="text"
  className="my-2 my-input form-control"
  
  onChange={(e)=>{setDescProblem(e.target.value)}}
/>
          </div>
          <div className=''>
          <label htmlFor="">إرفق ملف  () </label>
          <input
  type="file"
  className="my-2 my-input form-control"
  multiple
  onChange={handleFileChangeProblem}
/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" onClick={()=>{problemOrder(selectedID)}}>
          ابلاغ  
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModalProblem}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
       </>
      )
    }
    