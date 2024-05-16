import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function UserOrders() {
  useEffect(() => {
    getOrders()
  }, [])
  const [orders, setOrders] = useState([])

  async function getOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/get-user-orders',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
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
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
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
  async function cancelOrder(orderid) {
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/cancel-order`,
        {
          orderId: orderid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
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
                  {item.status =="pick to store" || item.status == "pending" ?
                  <td><button className="btn btn-danger" onClick={()=>{
                    if(window.confirm('سوف يتم إلغاء الشنحة')){
                      cancelOrder(item._id)
                    }
                  }}>إلغاء الشنحة</button></td>:null}
                </tr>
              );
            })}
          </tbody>


        </table>
      </div>
    </div>
  )
}
