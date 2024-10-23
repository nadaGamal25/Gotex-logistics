import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx';
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminOrders() {
  const [shipmentsAdmin,setShipmentsAdmin]=useState([])
    const [theLimit,setLimit]=useState(30)
    const [currentPage, setCurrentPage] = useState(Number(1));
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [loading, setLoading] = useState(false);
    // const [searchCompany, setSearchCompany] = useState('');
const [searchPaytype, setSearchPaytype] = useState('');
const [searchKeyword, setSearchKeyword] = useState('');
const [searchStatus, setSearchStatus] = useState('');
const [searchGetIntegrate, setSearchGetIntegrate] = useState('');
const [searchBillCode, setSearchBillCode] = useState('');
const [currentPage2, setCurrentPage2] = useState(Number(1));
    const [numberOfPages2, setNumberOfPages2] = useState(1);
const [secondFilter, setSecondFilter] = useState(false);
// const [currentPage3, setCurrentPage3] = useState(Number(1));
//     const [numberOfPages3, setNumberOfPages3] = useState(1);
// const [currentPage4, setCurrentPage4] = useState(Number(1));
// const [numberOfPages4, setNumberOfPages4] = useState(1);
const [dateFilter, setDateFilter] = useState(false);
    const [clientFilter, setClientFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
    useEffect(() => {

        getShipmentsAdmin()
      }, [])
     
     
      const [orders, setOrders] = useState([])
    
      async function geOrders() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics/order/get-all',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

      async function getShipmentsAdmin() {
        try {
          setLoading(true);
          const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/get-all`, {
            params: {
                page: currentPage,
                limit: 100,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(false)
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
      async function getSearchShipmentsAdmin() {
        try {
          setLoading(true);
          const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/get-all`, {
            params: {
                page: currentPage2,
                limit: 100,
                paytype: searchPaytype,
                ordernumber: searchBillCode,
                keyword:clientFilter,
                status:searchStatus,
                startDate:startDate,
                endDate:endDate,
                get:searchGetIntegrate
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(true)
          // setDateFilter(false)
          console.log(response)
          setCurrentPage2(response.data.pagination.currentPage);
          setNumberOfPages2(response.data.pagination.numberOfPages);
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/get-all`, {
            params: {
                page: currentPage -1,
                limit: 100,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(false)
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/get-all`, {
            params: {
                page: currentPage +1,
                limit: 100,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(false)
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
    const handlePreviousPage2 = async () => {
  if (currentPage2 > 1) {
    setCurrentPage2(currentPage2 - 1); 
    try {
      setLoading(true);
      const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/get-all`, {
        params: {
          page: currentPage2,
          limit: 100,
          paytype: searchPaytype,
          ordernumber: searchBillCode,
          keyword:clientFilter,
          status:searchStatus,
          startDate:startDate,
          endDate:endDate,
          get:searchGetIntegrate
            
          },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
  
      setShipmentsAdmin(response.data.data);
      setSecondFilter(true)
      // setMarketerFilter(false)
      // setDateFilter(false)
      console.log(response)
      setCurrentPage2(response.data.pagination.currentPage);
      setNumberOfPages2(response.data.pagination.numberOfPages);
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
      const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/get-all`, {
        params: {
          page: currentPage2,
          limit: 100,
          paytype: searchPaytype,
          ordernumber: searchBillCode,
          keyword:clientFilter,
          status:searchStatus,
          startDate:startDate,
          endDate:endDate,
          get:searchGetIntegrate
            
          },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
  
      setShipmentsAdmin(response.data.data);
      setSecondFilter(true)
      // setMarketerFilter(false)
      // setDateFilter(false)
      console.log(response)
      setCurrentPage2(response.data.pagination.currentPage);
      setNumberOfPages2(response.data.pagination.numberOfPages);
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
    const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/get-all`, {
      params: {
        page: currentPage2,
        limit: 100,
        paytype: searchPaytype,
        ordernumber: searchBillCode,
        keyword:clientFilter,
        status:searchStatus,
        startDate:startDate,
        endDate:endDate,
        get:searchGetIntegrate
        },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    setShipmentsAdmin(response.data.data);
    setSecondFilter(true)
    console.log(response)
    setCurrentPage2(response.data.pagination.currentPage);
    setNumberOfPages2(response.data.pagination.numberOfPages);
  } catch (error) {
    console.error('Error fetching students:', error);
  } finally {
    setLoading(false); 
  }
} 
const exportToExcel = async () => {
  try {
    setLoading(true);

    // Make the search request
    const response = await axios.get('https://dashboard.go-tex.net/logistics/order/get-all', {
      params: {
        page: currentPage2,
        limit: 100,
        paytype: searchPaytype,
        ordernumber: searchBillCode,
        keyword:clientFilter,
        status:searchStatus,
        startDate:startDate,
        endDate:endDate,
        get:searchGetIntegrate
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    setShipmentsAdmin(response.data.data);
    setSecondFilter(true)
    setDateFilter(false)
    console.log(response)
    setCurrentPage2(response.data.pagination.currentPage);
    setNumberOfPages2(response.data.pagination.numberOfPages);
    const dataToExport = response.data.data.map((item, index) => {
      return [
        item.createdAt ? item.createdAt.slice(0, 10) : '_',
        item.sendername ? item.sendername :'_',
        item.senderphone ? item.senderphone :'_',
        item.recivername ? item.recivername :'_',
        item.reciverphone? item.reciverphone :'_',
        item.ordernumber || '_',
        item.paytype || '_',
        item.price || '_',
        item.weight || '_',
        item.pieces || '_',
        item.status || '_',
        item.collector && item.collector.length > 0 && item.collector[0].firstName ? `${item.collector[0].firstName} ${item.collector[0].lastName}` : '_',
        item.receiver && item.receiver.length > 0  && item.receiver[0].firstName ? `${item.receiver[0].firstName} ${item.receiver[0].lastName}` : '_',
        item.storekeeper && item.storekeeper.length > 0  && item.storekeeper[0].firstName ? `${item.storekeeper[0].firstName} ${item.storekeeper[0].lastName}` : '_',
        item.userIntegrate && item.userIntegrate.length > 0  && item.userIntegrate[0].firstName ? `${item.userIntegrate[0].firstName} ${item.userIntegrate[0].lastName}` : 
        item.user && item.user.length > 0  && item.user[0].firstName ? `${item.user[0].firstName} ${item.user[0].lastName}` :'_',

      ];
    });

    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet([[ 'التاريخ', 'اسم المرسل','جوال المرسل','اسم المستلم','جوال المستلم', 'رقم الشحنة', 'طريقة الدفع', 'السعر', 'الوزن','عدد القطع','حالة الشحنة',' مندوب التجميع','مندوب التسليم ','امين المخزن','المدخل'], ...dataToExport]);

    // Set column styles
    ws['!cols'] = [
      { wch: 15 },{ wch: 15 },{ wch: 15 },
      { wch: 15 },{ wch: 15 },{ wch: 15 },
      { wch: 15 },{ wch: 15 },{ wch: 15 },
      { wch: 15 },{ wch: 15 },{ wch: 15 },
      { wch: 15 },{ wch: 15 },{ wch: 15 },
       // Set column width to 150 pixels
      // Add more columns as needed
    ];

// Log the entire ws array to the console
// console.log('ws array:', ws);
// const range = XLSX.utils.decode_range(ws['!ref']);

// for (let row = range.s.r; row <= range.e.r; row++) {
//   for (let col = range.s.c; col <= range.e.c; col++) {
//     const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
//     const cellValue = ws[cellRef]?.v; // Get cell value

//     console.log('Checking cell at row:', row + 1, 'column:', col + 1, 'with value:', cellValue);

//     if (cellValue !== undefined && cellValue !== null) {
//       const cellText = String(cellValue).toLowerCase(); // Convert to string and lowercase

//       if (cellText === 'canceled') {
//         console.log('Found "canceled" at row:', row + 1, 'column:', col + 1);
//         ws[cellRef].s = {
//           font: { color: { rgb: 'FF0000' } }, // Set text color to red
//           fill: { fgColor: { rgb: 'FFCACADD' } }, // Set background color
//         };
//       }
//     }
//   }
// }



    // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // Save the workbook to a file
    XLSX.writeFile(wb, 'orders.xlsx');
  } catch (error) {
    console.error('Error exporting to Excel:', error);
  } finally {
    setLoading(false);
  }
};
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
           Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
         },
       }
     );
 
     console.log(response);
     closeModalPending();
     setSelectedFilesPending([]);
     getShipmentsAdmin();
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
  async function cancelOrder(orderid) {
    console.log(selectedFilesCancel)
    const formData = new FormData();
    formData.append('orderId', orderid);
    
    selectedFilesCancel.forEach((file) => {
      formData.append('images.canceled', file);
    });
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics/order/cancel-order`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
    );
    console.log(editedOrder)
    console.log(response);

    closeModal();
    window.alert("تم تعديل بيانات الشحنة بنجاح")
    getShipmentsAdmin()
    
  } catch (error) {
    console.error(error);
    alert(error.response.data.msg)
  }
}   

      const [selectedImages, setSelectedImages] = useState([]);
      const [showModal, setShowModal] = useState(false);
      function openCarousel(images) {
        const formattedImages = images.map(img => img.replace('public', 'https://dashboard.go-tex.net/logistics'));
        setSelectedImages(formattedImages);
        setShowModal(true);
      }
      const [payments,setPayments]=useState('')
      async function getPayments(orderId) {
        try {
          const token = localStorage.getItem('adminToken');
          console.log(token)
          if (!token) {
            throw new Error('Token not found');
          }
      
          const response = await axios.get(
            `https://dashboard.go-tex.net/logistics/payment/order-payments/${orderId}`,
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
      
      async function takeOrderMoney(orderId) {
        try {
          const token = localStorage.getItem('adminToken');
          if (!token) {
            throw new Error('Token not found');
          }
      
          const response = await axios.put(
            `https://dashboard.go-tex.net/logistics/order/take-order-money-from-storekeeper/${orderId}`,
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
          const token = localStorage.getItem('adminToken');
          if (!token) {
            throw new Error('Token not found');
          }
      
          const response = await axios.put(
            `https://dashboard.go-tex.net/logistics/order/order-paid-visa-from-storekeeper/${orderId}`,
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
      return (
        <>
        <div className='p-5' id='content'>
          <div className="my-table p-4 mb-4">
      <div className="row">
        
        <div className="col-md-4">
          <input className='form-control m-1' 
          type="search" placeholder=" اسم المستخدم , الهاتف ,اخرى"
          // value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          />
        </div>
        
       
        <div className="col-md-4">
          <input className='form-control m-1' type="search"
            placeholder="رقم الشحنة"
            //   value={searchBillCode}
              onChange={(e) => setSearchBillCode(e.target.value)} />
        </div>
        
        <div className="col-md-4">
          <select className='form-control m-1'  
          
          placeholder="طريقة الدفع"
        //   value={searchPaytype}
          onChange={(e) => setSearchPaytype(e.target.value)}>
            <option value="">الكل </option>
            <option value="cc">الدفع اونلاين (cc)</option>
            <option value="cod">الدفع عند الاستلام(cod)</option>
            <option value="cash cod">المدفوعة كاش(cod)</option>
            <option value="visa cod">المدفوعة بواسطة فيزا(cod)</option>
            </select>
        </div>
        <div className="col-md-4">
          <select className='form-control m-1'
          
          placeholder="حالة الشحنة"
        //   value={searchPaytype}
          onChange={(e) => setSearchStatus(e.target.value)} >
            <option value="">حالة الشحنة (الكل)</option>
            <option value="pending">pending (معلقة)</option>
            <option value="pick to store">pick to store(ف الطريق للمخزن)</option>
            <option value="in store">in store(فى المخزن)</option>
            <option value="pick to client">pick to client(ف الطريق للعميل)</option>
            <option value="delivered">delivered(تم تسليمها)</option>
            <option value="canceled">canceled(تم الغائها)</option>
            </select>
        </div>
        <div className="col-md-4">
          <select className='form-control m-1'
          
          placeholder="جميع الشحنات(main&integrate) "
          onChange={(e) => setSearchGetIntegrate(e.target.value)} >
            <option value=""> جميع الشحنات(main&integrate) </option>
            <option value="main">main</option>
            <option value="integrate">integrate</option>
            
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
        <div className="text-center mt-1">
        <button className="btn btn-dark m-1" onClick={getSearchShipmentsAdmin}>
  بحث
</button>  
<button className="btn btn-orange" onClick={exportToExcel}>بحث وتصدير ملف اكسيل</button>         

 </div>
      </div>
    </div>
    <div className="my-table p-4 my-4">
     
       
        
        <button className="btn btn-dark m-1" onClick={getShipmentsAdmin}>عرض جميع الشحنات  </button>

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
                  <th scope="col">ملاحظات </th>
                  {/* <th scope="col">ملف الالغاء</th> */}
                  <th scope="col">مندوب الشحنة</th>
                  <th scope="col">امين المخزن</th>
                  <th scope="col">المدخل</th>
                  <th scope="col"></th>
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
                      <td>
                        {item.isreturn==true && item.status =='in store'?
                <span >شحنة رجيع(بالمخزن) </span>:
                item.status=='pending'?
                <span >قيد الانتظار</span>:
                item.status=='late to store'?
                <span >شحنة متأخرة </span>:
                item.status=='pick to store'?
                <span >فى الطريق للمخزن</span>:
                item.status=='in store'?
                <span > فى المخزن</span>:
                item.status=='pick to client' && item.isreturn!==true?
                <span >فى الطريق للعميل</span>:
                item.status=='pick to client' && item.isreturn===true?
                <span >فى الطريق للمرسل</span>:
                item.status=='received'?
                <span >تم تسليمها</span>:
                item.status=='canceled'?
                <span >تم إلغائها</span>:
                <span>{item.status}</span>}
                        <br/>
                      {item.status === 'pending' && item.images?.pending?.length !== 0 ? (
                      <a className="text-primary" onClick={() => openCarousel(item.images.pending)}>الصور</a>
                    ) : item.status === 'pick to store' && item.images?.pickedToStore?.length !== 0 ? (
                      <a className="text-primary" onClick={() => openCarousel(item.images.pickedToStore)}>الصور</a>
                    ) : item.status === 'in store' && item.images?.inStore?.length !== 0 ? (
                      <a className="text-primary" onClick={() => openCarousel(item.images.inStore)}>الصور</a>
                    ) : item.status === 'pick to client' ? (
                      <a className="text-primary" onClick={() => openCarousel([
                        ...(item.images.pickedToClient || []),
                        ...(item.images.return || [])
                      ])}>الصور</a>
                    ) : item.status === 'received' && item.images?.received?.length !== 0 ? (
                      <a className="text-primary" onClick={() => openCarousel(item.images.received)}>الصور</a>
                    ) : item.status === 'canceled' && item.images?.canceled?.length !== 0 ? (
                      <a className="text-primary" onClick={() => openCarousel([
                        ...(item.images.canceled.admin || []),
                        ...(item.images.canceled.collector || []),
                        ...(item.images.canceled.dataEntry || [])
                      ])}>الصور</a>
                    ) : (
                      <span></span>
                    )}
                </td>
                {item.cancelDescription?.dataEntry || item.cancelDescription?.collector ?
                <td>{item.cancelDescription?.dataEntry || item.cancelDescription?.collector}</td> : <td></td>}
                
                      {item.collector && item.collector.length > 0 && item.collector[0].firstName ? (
  <td>تجميع:{item.collector[0].firstName} {item.collector[0].lastName} <br/>
  {item.addCarrierReason.collector.images && item.addCarrierReason.collector.images[0]?
               <a href={item.addCarrierReason.collector.images[0].replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الملف</a>
             :null} 
   <br/>
  {item.receiver&& item.receiver.length > 0 && item.receiver[0].firstName ? (
  <span>تسليم:{item.receiver[0].firstName} {item.receiver[0].lastName}  <br/>
  {item.addCarrierReason.receiver.images && item.addCarrierReason.receiver.images[0]?
                 <a href={item.addCarrierReason.receiver.images[0].replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الملف</a>
               :null}</span>
) : (
  null
)} </td>
) : (
  <td></td>
)}
{item.storekeeper&& item.storekeeper.length > 0 && item.storekeeper[0].firstName ? (
  <td>{item.storekeeper[0].firstName} {item.storekeeper[0].lastName}</td>
) : (
  <td></td>
)} 
 {item.userIntegrate&& item.userIntegrate.length > 0 && item.userIntegrate[0].firstName ? (
  <td>{item.userIntegrate[0].firstName} {item.userIntegrate[0].lastName}</td>
) :item.user&& item.user.length > 0 && item.user[0].firstName ? (
  <td>{item.user[0].firstName} {item.user[0].lastName}</td>
) : (
  <td></td>
)} 
                   <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
    
                    
      </>
    )}
     <td>
                  <button className="btn btn-secondary" onClick={() => handleEditClick(item)}>تعديل البيانات</button>
                  </td>
                  {item.status == "canceled" ?
                  <td><button className="btn btn-orange" onClick={()=>{
                      openModalPending(item._id)
                  }}>تحديث الشنحة</button></td>:null}
    {item.status == "pending" ?
                  <td><button className="btn btn-danger" onClick={()=>{
                    // if(window.confirm('سوف يتم إلغاء الشنحة')){
                      openModalCancel(item._id)
                    // }
                  }}>إلغاء الشنحة</button></td>:null}
                   {(item.status =='pick to client' || item.status == "received" ) && item.paytype !=='cc'?
                  <td><button className="btn btn-outline-danger m-1" onClick={()=>{
                      openModalPayments(item._id)
                  }}>محاولات الدفع</button></td>:null}
                  {item.paidWithVisaFromStorekeeper ===true || item.storekeeperPaidCash===true ?
                  <td className='text-danger fw-bold text-center'>تم التحصيل</td>:
                  item.status=='received'  && item.receiverPaidCash ==true?   
                  <td><button className="btn btn-orange" onClick={()=>{
                    if(window.confirm('هل قمت باستلام المبلغ كاش لهذه الشحنة ؟')){
                      takeOrderMoney(item._id)
                    }
                    }}>تأكيد استلام كاش  </button></td> :
                    item.status=='received' && item.payment  && item.orderPaidWithVisa ==true?   
                  <td><button className="btn btn-orange" onClick={()=>{
                    if(window.confirm('هل تم دفع المبلغ الخاص بهذه الشحنة بواسطة الفيزا ؟')){
                      confirmPaidWithVisa(item._id)
                    }
                    }}>تأكيد الدفع فيزا   </button></td> :null}
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
      // :marketerFilter?(<div>
      //   <button className="btn btn-dark" onClick={handlePreviousPage3} disabled={currentPage3 === 1}>
      //     الصفحة السابقة 
      //   </button>
      //   <span className='px-1'>
      //     Page {currentPage3} of {numberOfPages3}
      //   </span>
      //   <button className="btn btn-dark" onClick={handleNextPage3} disabled={currentPage3 === numberOfPages3}>
      //     الصفحة التالية 
      //   </button>
      // </div>):
      // dateFilter?(<div>
      //   <button className="btn btn-dark" onClick={handlePreviousPage4} disabled={currentPage4 === 1}>
      //     الصفحة السابقة 
      //   </button>
      //   <span className='px-1'>
      //     Page {currentPage4} of {numberOfPages4}
      //   </span>
      //   <button className="btn btn-dark" onClick={handleNextPage4} disabled={currentPage4 === numberOfPages4}>
      //     الصفحة التالية 
      //   </button>
      // </div>):
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
      <div>
<input className=' m-1' type="number" 

placeholder="رقم الصفحة "
onChange={(e) => setCurrentPage2(e.target.value)} />
<button className="btn btn-primary m-1" onClick={getSearchShipmentsPage}>
            بحث برقم الصفحة
        </button>
      </div>
     </div>
{/*     
          <div className="my-table p-4 ">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"> المرسل</th>
                  <th scope="col"> المستلم</th>
                  <th scope="col"> billcode</th>
                  <th scope="col">رقم الشحنة</th>
                  <th scope="col">طريقة الدفع</th>
                  <th scope="col">السعر </th>
                  <th scope="col">الوزن</th>
                  <th scope="col">عدد القطع</th>
                  <th scope="col">حالة الشحنة</th>
                  <th scope="col">ملف الالغاء</th>
                  <th scope="col">مندوب التجميع</th>
                  <th scope="col">مندوب التسليم</th>
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
                      <td>{item.billcode}</td>
                      <td>{item.ordernumber}</td>
                      <td>{item.paytype}</td>
                      <td>{item.price}</td>
                      <td>{item.weight}</td>
                      <td>{item.pieces}</td>
                      <td>{item.status}</td>
                      {item.images && item.images[0]?<td>
                  <a href={item.images[0].replace('public', 'https://dashboard.go-tex.net/logistics')} target='_blank'>رابط_الملف</a>
                </td>:<td>_</td>}
                      {item.pickedby && item.pickedby.firstName ? (
  <td>{item.pickedby.firstName} {item.pickedby.lastName}</td>
) : (
  <td></td>
)}
{item.deliveredby && item.deliveredby.firstName ? (
  <td>{item.deliveredby.firstName} {item.deliveredby.lastName}</td>
) : (
  <td></td>
)}                      <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
    
                    </tr>
                  );
                })}
              </tbody>
    
    
            </table>
          </div> */}
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
        <Modal.Header >
        <Modal.Title> هل انت بالتأكيد تريد الغاء الشحنة  
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
          <label htmlFor="">إرفق ملف  () </label>
          <input
  type="file"
  className="my-2 my-input"
  name="images.canceled"
  multiple
  onChange={handleFileChangeCancel}
/>
 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" onClick={()=>{cancelOrder(selectedID)}}>
          تأكيد الغاء الشحنة
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModalCancel}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
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
      <Modal show={showModalPayments} onHide={closeModalPayments}>
        <Modal.Header >
        <Modal.Title> محاولات الدفع
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
            {payments.length !=0 ?
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
                      <td>{item.code}</td>
                      {item.status == "CAPTURED"?<td>تم الدفع</td>:<td>{item.status}</td>}
                     
              
                    </tr>
                  );
                })}
              </tbody>
    
    
            </table>
          </div>:<p>لا توجد محاولات دفع..</p>}
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
        </>)
    }
    