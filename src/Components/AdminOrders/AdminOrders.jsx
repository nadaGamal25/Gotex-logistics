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
const [searchBillCode, setSearchBillCode] = useState('');
const [currentPage2, setCurrentPage2] = useState(Number(1));
    const [numberOfPages2, setNumberOfPages2] = useState(1);
const [secondFilter, setSecondFilter] = useState(false);
const [currentPage3, setCurrentPage3] = useState(Number(1));
    const [numberOfPages3, setNumberOfPages3] = useState(1);
const [currentPage4, setCurrentPage4] = useState(Number(1));
const [numberOfPages4, setNumberOfPages4] = useState(1);
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
          const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/get-all',
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/getorder/${orderId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-all`, {
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-all`, {
            params: {
                page: currentPage2,
                limit: 100,
                paytype: searchPaytype,
                ordernumber: searchBillCode,
                keyword:clientFilter,
                status:searchStatus,
                startDate:startDate,
                endDate:endDate,
                
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-all`, {
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
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-all`, {
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
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-all`, {
        params: {
          page: currentPage2,
          limit: 100,
          paytype: searchPaytype,
          ordernumber: searchBillCode,
          keyword:clientFilter,
          status:searchStatus,
          startDate:startDate,
          endDate:endDate,
            
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
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-all`, {
        params: {
          page: currentPage2,
          limit: 100,
          paytype: searchPaytype,
          ordernumber: searchBillCode,
          keyword:clientFilter,
          status:searchStatus,
          startDate:startDate,
          endDate:endDate,
            
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
    const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/get-all`, {
      params: {
        page: currentPage2,
        limit: 100,
        paytype: searchPaytype,
        ordernumber: searchBillCode,
        keyword:clientFilter,
        status:searchStatus,
        startDate:startDate,
        endDate:endDate,
          
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
    const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/get-all', {
      params: {
        page: currentPage2,
        limit: 100,
        paytype: searchPaytype,
        ordernumber: searchBillCode,
        keyword:clientFilter,
        status:searchStatus,
        startDate:startDate,
        endDate:endDate,
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
        item.user && item.user.length > 0  && item.user[0].firstName ? `${item.user[0].firstName} ${item.user[0].lastName}` : '_',

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

async function cancelOrder(orderid) {
  try {
    const response = await axios.put(
      `https://dashboard.go-tex.net/logistics-test/order/cancel-order`,
      {
        orderId: orderid,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
    );

    console.log(response);
    getSearchShipmentsAdmin()
  } catch (error) {
    console.error(error);
    alert(error.response.data.message)

  }
}

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
      `https://dashboard.go-tex.net/logistics-test/order/edit-order/${eOrder._id}`,
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
            <option value="">طريقة الدفع</option>
            <option value="cc">الدفع اونلاين (cc)</option>
            <option value="cod">الدفع عند الاستلام(cod)</option>
            <option value="">كلاهما</option>
            </select>
        </div>
        <div className="col-md-4">
          <select className='form-control m-1'
          
          placeholder="حالة الشحنة"
        //   value={searchPaytype}
          onChange={(e) => setSearchStatus(e.target.value)} >
            <option value="">حالة الشحنة</option>
            <option value="pending">pending (معلقة)</option>
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
                  {/* <th scope="col">ملف الالغاء</th> */}
                  <th scope="col">مندوب الشحنة</th>
                  <th scope="col">امين المخزن</th>
                  <th scope="col">المدخل</th>
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
                      <td>{item.status}<br/>
                      {item.images && item.images[0]?
                  <a href={item.images[0].replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الملف</a>
                :null}</td>
                     
                      {item.collector && item.collector.length > 0 && item.collector[0].firstName ? (
  <td>تجميع:{item.collector[0].firstName} {item.collector[0].lastName}<br/>
  {item.receiver&& item.receiver.length > 0 && item.receiver[0].firstName ? (
  <span>تسليم:{item.receiver[0].firstName} {item.receiver[0].lastName}</span>
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
 {item.user&& item.user.length > 0 && item.user[0].firstName ? (
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
    {item.status == "pending" ?
                  <td><button className="btn btn-danger" onClick={()=>{
                    if(window.confirm('سوف يتم إلغاء الشنحة')){
                      cancelOrder(item._id)
                    }
                  }}>إلغاء الشنحة</button></td>:null}
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
                  <a href={item.images[0].replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الملف</a>
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
        </>)
    }
    