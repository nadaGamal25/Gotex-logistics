import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function StoreWaitingOrders() {
    useEffect(() => {
        getOrders()
        }, [])
    
      const [orders,setOrders]=useState('')
      const [orderId, setOrderId] = useState('');
    
      async function getOrders() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics/order/orders-to-be-stored',
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
      async function getSticker(orderId) {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/logistics/order/getorder/${orderId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
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
                   {/* <th scope="col">جوال المرسل</th> */}
                   <th scope="col"> المستلم</th>
                   {/* <th scope="col">جوال المستلم</th> */}
                   {/* <th scope="col"> billcode</th> */}
                   <th scope="col">رقم الشحنة</th>
                   <th scope="col">طريقة الدفع</th>
                   <th scope="col">السعر </th>
                   <th scope="col">الوزن</th>
                   <th scope="col">عدد القطع</th>
                   <th scope="col">حالة الشحنة</th>
                   <th scope="col">مندوب التجميع</th>
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
                       {/* <td>{item.senderphone}</td> */}
                       <td>{item.recivername}</td>
                       {/* <td>{item.reciverphone}</td> */}
                       {/* <td>{item.billcode}</td> */}
                       <td>{item.ordernumber}</td>
                       <td>{item.paytype}</td>
                       <td>{item.price}</td>
                       <td>{item.weight}</td>
                       <td>{item.pieces}</td>
                       <td>{item.status}</td>
                       {item.pickedby?
                    <td>{item.pickedby.firstName} {item.pickedby.lastName}</td> : <td></td>}
                    {item.pickedby?
                    <td>{item.pickedby.mobile}</td> : <td></td>}
                      <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
                      
                  
     
    </tr>
    ))}         
         </tbody>
       </table>
      
      </div>
        </div>
      
        </>
      )
    }
    