import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function CollectorShipments() {
  useEffect(() => {

    getOrders()
  }, [])
  const [orders, setOrders] = useState([])

  async function getOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/get-collector-orders',
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
      const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/getorder/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
        },
      });
      console.log(response)
      const stickerUrl = `${response.data.url.replace('upload', 'https://dashboard.go-tex.net/logistics-test')}`;
      const newTab = window.open();
      newTab.location.href = stickerUrl;
    } catch (error) {
      console.error(error);
    }
  }

  // async function changeStatus(orderid) {
  //   try {
  //     const response = await axios.put(
  //       `https://dashboard.go-tex.net/logistics-test/order/change-status-by-collector`,
  //       {
  //         orderId: orderid,
  //         status: "pick to store"
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
  //         },
  //       }
  //     );
  
  //     console.log(response);
  //     getOrders()
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function changeStatusPicked(orderid) {
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/picked-by-collector`,
        {
          orderId: orderid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
  
      console.log(response);
      getOrders()
    } catch (error) {
      console.error(error);
      alert(error.response.data.message)

    }
  }
  async function changeStatusDelivered(orderid) {
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/delivered-by-collector`,
        {
          orderId: orderid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
  
      console.log(response);
      getOrders()
    } catch (error) {
      console.error(error);
      alert(error.response.data.message)
    }
  }
  async function sendRequestStore(orderid) {
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/in-store-request`,
        {
          orderId: orderid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
      window.alert("تم تبليغ امين المخزن")
      console.log(response);
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg)

    }
  }
  return (
    <div className='p-5' id='content'>

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
              <th scope="col"></th>
              <th scope="col"></th>
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
                  <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
                  {item.status == 'pending'?
                  <td><button className="btn btn-orange" onClick={()=>{
                    if(window.confirm('هل انت بالتأكيد قمت باستلام الشحنة من العميل')){
                      changeStatusPicked(item._id)
                    }
                  }}>تأكيد استلام الشنحة</button></td>:null}
                  {item.status == 'pick to store' ?
                  <td><button className="btn btn-primary" onClick={()=>{
                    if(window.confirm('هل انت بالتأكيد قمت بتوصيل الشخنة للمخزن')){
                      changeStatusDelivered(item._id)
                    }
                  }}>تأكيد توصيل الشنحة</button></td>:null}
                  {item.status == 'delivered by collector'?
                   <td><button className="btn btn-secondary" onClick={()=>{
                    if(window.confirm('هل قمت بتوصيل الشحنة وتريد ابلاغ امين المخزن')){
                      sendRequestStore(item._id)
                    }
                  }}>تبليغ امين المخزن</button></td>:null}
                </tr>
              );
            })}
          </tbody>


        </table>
      </div>
    </div>)
}
