import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap'

export default function StoreLateOrders() {
  useEffect(() => {
    getLateOrders()
    }, [])

  const [orders,setOrders]=useState('')
  const [orderId, setOrderId] = useState('');

  async function getLateOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/late',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
        },
      });
      const List = response.data.orders;
      console.log(List)
      setOrders(List)
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
  getLateOrders()
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
  getLateOrders()
} catch (error) {
  console.error(error);
  alert(error.response.data.msg)

}
}
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
               {/* <th scope="col">السعر </th> */}
               <th scope="col">الوزن</th>
               <th scope="col">عدد القطع</th>
               <th scope="col">حالة الشحنة</th>
               <th scope="col">المندوب</th>
               <th scope="col">هاتف المندوب</th>
               <th></th>
              
             </tr>
         </thead>
         <tbody>
         {orders && orders.map((item, index) => (
<tr key={index} className={item.status === "canceled" ? 'cancel' : ''}>

                   <td>{index + 1}</td>
                   <td>{item.createdAt.slice(0, 10)}</td>
                   <td>{item.sendername}</td>
                   <td>{item.senderphone}</td>
                   <td>{item.recivername}</td>
                   <td>{item.reciverphone}</td>
                   {/* <td>{item.billcode}</td> */}
                   <td>{item.ordernumber}</td>
                   <td>{item.paytype}</td>
                   {/* <td>{item.price}</td> */}
                   <td>{item.weight}</td>
                   <td>{item.pieces}</td>
                   <td>{item.status}</td>
                   {item.pickedby?
                <td>{item.pickedby.firstName} {item.pickedby.lastName}</td> : <td></td>}
                {item.pickedby?
                <td>{item.pickedby.mobile}</td> : <td></td>}
                {item.inStore.request=== true?
                   <td><button className="btn btn-primary" onClick={()=>{
    openModal2(item._id)
   }}>تأكيد استلام الشحنة </button></td>:<td></td>}
              
 
</tr>
))}         
     </tbody>
   </table>
  
  </div>
    </div>
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
    </>
  )
}
