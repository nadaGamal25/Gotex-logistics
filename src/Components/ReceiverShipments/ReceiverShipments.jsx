import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function ReceiverShipments() {
  useEffect(() => {

    getOrders()
  }, [])

  // async function changeStatus(orderid) {
  //   try {
  //     const response = await axios.put(
  //       `https://dashboard.go-tex.net/logistics-test/order/change-status-by-receiver`,
  //       {
  //         orderId: orderid,
  //         status: "pick to client"
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
        `https://dashboard.go-tex.net/logistics-test/order/picked-to-client`,
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
        `https://dashboard.go-tex.net/logistics-test/order/delivered-by-receiver`,
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
  async function changeStatusRecieved(orderid) {
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/order-received`,
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
  
  // async function returnOrder(orderid) {
  //   try {
  //     const response = await axios.put(
  //       `https://dashboard.go-tex.net/logistics-test/order/return-order/${orderid}`,
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

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedID, setSelectedID] = useState(null);

  async function returnOrder(orderid) {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('images', selectedFile, selectedFile.name);
    }
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/return-order/${orderid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModal()
      getOrders()
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg)
    }
  }
  function handleFileChange(event) {
    console.log(event.target.files)
    setSelectedFile(event.target.files[0]);
  }
 
  const [orders, setOrders] = useState([])

  async function getOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/order/get-receiver-orders',
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
      const stickerUrl = `${response.data.url.replace('upload', 'https://dashboard.go-tex.net/logistics-test/upload')}`;
      const newTab = window.open();
      newTab.location.href = stickerUrl;
    } catch (error) {
      console.error(error);
    }
  }

  const [showModal, setShowModal] = useState(false);

  const openModal = (orderid) => {
    setShowModal(true);
    setSelectedID(orderid)
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
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
                  {item.status == "in store"?
                  <td><button className="btn btn-orange" onClick={()=>{
                    if(window.confirm('هل انت بالتأكيد قمت باستلام الشحنة من المخزن')){
                      changeStatusPicked(item._id)
                    }
                  }}>تأكيد الاستلام من المخزن</button></td>:null}
                  {/* {item.status =="pick to client"?
                  <td><button className="btn btn-primary" onClick={()=>{
                    if(window.confirm('هل انت فى الطريق لتسليم الشحنة')){
                      changeStatusDelivered(item._id)
                    }
                  }}>فى الطريق للتسليم</button></td>:null} */}
                  {item.status =='pick to client'?
                  <td><button className="btn btn-primary" onClick={()=>{
                    if(window.confirm('هل انت بالتأكيد قمت بتسليم الشحنة للعميل')){
                      changeStatusRecieved(item._id)
                    }
                  }}>تأكيد استلام العميل</button></td>:null}
                  {item.status =="pick to client"?
                  <td><button className="btn btn-secondary" onClick={()=>{
                      openModal(item._id)
                  }}>إرجاع الشنحة</button></td>:null}
                  {/* <td><button className="btn btn-danger" onClick={()=>{openModal(item._id)}}> الغاء الشحنة</button></td> */}
                </tr>
              );
            })}
          </tbody>


        </table>
      </div>
    </div>
    <Modal show={showModal} onHide={closeModal}>
        <Modal.Header >
          <Modal.Title>سوف يتم ارجاع الشحنة 
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
          <label htmlFor="">إرفق ملف  () </label>
      <input
        type="file"
        className="my-2 my-input form-control"
        name="images"
        onChange={(e) => {
          handleFileChange(e);
        }}
    
      /> 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" onClick={()=>{returnOrder(selectedID)}}>
          تأكيد ارجاع الشحنة
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModal}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>)
}
