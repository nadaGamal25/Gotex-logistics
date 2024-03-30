import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminOrders() {
    useEffect(() => {

        geOrders()
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
          const stickerUrl = `${response.data.url.replace('upload', 'https://dashboard.go-tex.net/logistics-test')}`;
          const newTab = window.open();
          newTab.location.href = stickerUrl;
        } catch (error) {
          console.error(error);
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
          </div>
        </div>)
    }
    