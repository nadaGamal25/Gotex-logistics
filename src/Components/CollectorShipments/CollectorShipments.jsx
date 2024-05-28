import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      const stickerUrl = `${response.data.url.replace('upload', 'https://dashboard.go-tex.net/logistics-test/upload')}`;
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

  // async function changeStatusPicked(orderid) {
  //   try {
  //     const response = await axios.put(
  //       `https://dashboard.go-tex.net/logistics-test/order/picked-to-store`,
  //       {
  //         orderId: orderid,
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
  //     alert(error.response.data.message)

  //   }
  // }

  const [selectedID, setSelectedID] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  async function changeStatusPicked(orderid) {
    console.log(selectedFiles)
    const formData = new FormData();
    formData.append('orderId', orderid);
    selectedFiles.forEach((file, index) => {
      formData.append(`images.pickedToStore[${index}]`, file, file.name);
    });
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/picked-to-store`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModal();
      setSelectedFiles([]);
      getOrders();
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChange(event) {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  }
  
  const [showModal, setShowModal] = useState(false);

  const openModal = (orderid) => {
    setShowModal(true);
    setSelectedID(orderid)
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFiles([])
  };

  const [selectedFilesInStore, setSelectedFilesInStore] = useState([]);
  async function sendRequestStore(orderid) {
    console.log(selectedFilesInStore)
    const formData = new FormData();
    formData.append('orderId', orderid);
    selectedFilesInStore.forEach((file, index) => {
      formData.append(`images.inStoreRequest[${index}]`, file, file.name);
    });
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/in-store-request`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModal();
      setSelectedFilesInStore([]);
      getOrders();
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChangeInStore(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesInStore((prevFiles) => [...prevFiles, ...files]);
  }
  
  const [showModalInStore, setShowModalInStore] = useState(false);

  const openModalInStore = (orderid) => {
    setShowModalInStore(true);
    setSelectedID(orderid)
  };

  const closeModalInStore = () => {
    setShowModalInStore(false);
    setSelectedFilesInStore([])
  };

  const [selectedFilesCancel, setSelectedFilesCancel] = useState([]);
  async function cancelOrder(orderid) {
    console.log(selectedFilesCancel)
    const formData = new FormData();
    formData.append('orderId', orderid);
    selectedFilesCancel.forEach((file, index) => {
      formData.append(`images.canceled[${index}]`, file, file.name);
    });
  
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/order/cancel-order`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
          },
        }
      );
  
      console.log(response);
      closeModal();
      setSelectedFilesCancel([]);
      getOrders();
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
  // async function sendRequestStore(orderid) {
  //   try {
  //     const response = await axios.put(
  //       `https://dashboard.go-tex.net/logistics-test/order/in-store-request`,
  //       {
  //         orderId: orderid,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('carrierToken')}`,
  //         },
  //       }
  //     );
  //     window.alert("تم تبليغ امين المخزن")
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.response.data.msg)

  //   }
  // }
  // async function cancelOrder(orderid) {
  //   try {
  //     const response = await axios.put(
  //       `https://dashboard.go-tex.net/logistics-test/order/cancel-order`,
  //       {
  //         orderId: orderid,
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
  //     alert(error.response.data.message)

  //   }
  // }
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
              {/* <th scope="col">السعر </th> */}
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
                  {/* <td>{item.price}</td> */}
                  <td>{item.weight}</td>
                  <td>{item.pieces}</td>
                  <td>{item.status}</td>
                  <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
                  {item.status == 'pending'?
                  <td><button className="btn btn-orange" onClick={()=>{
                    // if(window.confirm('هل انت بالتأكيد قمت باستلام الشحنة من العميل')){
                    //   changeStatusPicked(item._id)
                    // }
                    openModal(item._id)
                  }}>تأكيد استلام الشنحة</button></td>:null}
                  {/* {item.status == 'pick to store' ?
                  <td><button className="btn btn-primary" onClick={()=>{
                    if(window.confirm('هل انت بالتأكيد قمت بتوصيل الشخنة للمخزن')){
                      changeStatusDelivered(item._id)
                    }
                  }}>تأكيد توصيل الشنحة</button></td>:null} */}
                  {item.status == 'pick to store'?
                   <td><button className="btn btn-secondary" onClick={()=>{
                    // if(window.confirm('هل قمت بتوصيل الشحنة وتريد ابلاغ امين المخزن')){
                      openModalInStore(item._id)
                    // }
                  }}>تبليغ امين المخزن</button></td>:null}
                  {item.status =="pick to store" || item.status == "pending" ?
                  <td><button className="btn btn-danger" onClick={()=>{
                    // if(window.confirm('سوف يتم إلغاء الشنحة')){
                      openModalCancel(item._id)
                    // }
                  }}>إلغاء الشنحة</button></td>:null}
                </tr>
              );
            })}
          </tbody>


        </table>
      </div>

    </div>
    <Modal show={showModal} onHide={closeModal}>
        <Modal.Header >
        <Modal.Title> هل انت بالتأكيد قمت باستلام الشحنة من العميل
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
          <label htmlFor="">إرفق ملف  () </label>
          <input
  type="file"
  className="my-2 my-input"
  name="images.pickedToStore"
  multiple
  onChange={handleFileChange}
/>
 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" onClick={()=>{changeStatusPicked(selectedID)}}>
          تأكيد استلام الشحنة
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModal}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalInStore} onHide={closeModalInStore}>
        <Modal.Header >
        <Modal.Title> هل قمت بتوصيل الشحنة وتريد ابلاغ امين المخزن
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
          <label htmlFor="">إرفق ملف  () </label>
          <input
  type="file"
  className="my-2 my-input"
  name="images.inStoreRequest"
  multiple
  onChange={handleFileChangeInStore}
/>
 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
        <Button className='m-1' variant="danger" onClick={()=>{sendRequestStore(selectedID)}}>
     تبليغ امين المخزن
          </Button>
          <Button className='m-1' variant="secondary" onClick={closeModalInStore}>
          إغلاق
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
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
    </>)
}
