import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';

export default function AdminUsers() {
  useEffect(()=>{
    getUsersListsAdmin()
    getUsersCarriersAdmin()
    getUsersStorekeepersAdmin()
    getUsersTrackerAdmin()
  },[])
  const [usersListAdmin,setUsersListsAdmin]=useState([])
  const [carriersListAdmin, setCarriersListsAdmin] = useState([]);
  const [storekeepersListAdmin, setStorekeepersListsAdmin] = useState([]);
  const [trackerListAdmin, setTrackerListsAdmin] = useState([]);

  async function getUsersListsAdmin() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/user',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const usersList = response.data.data;
      console.log(usersList)
      setUsersListsAdmin(usersList)
    } catch (error) {
      console.error(error);
    }
  }
  async function getUsersCarriersAdmin() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/carrier/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const List = response.data.data;
      console.log(List)
      setCarriersListsAdmin(List)
    } catch (error) {
      console.error(error);
    }
  }
  async function getUsersStorekeepersAdmin() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/store-keeper',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const List = response.data.data;
      console.log(List)
      setStorekeepersListsAdmin(List)
    } catch (error) {
      console.error(error);
    }
  }
  async function getUsersTrackerAdmin() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/tracker/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const List = response.data.data;
      console.log(List)
      setTrackerListsAdmin(List)
    } catch (error) {
      console.error(error);
    }
  }
 
  const combinedList = [...usersListAdmin, ...carriersListAdmin, ...storekeepersListAdmin, ...trackerListAdmin];

  async function userResendEmail(userId){
    try{
    const response= await axios.post(`https://dashboard.go-tex.net/logistics-test/user/resend-verify-email/${userId}`,{},
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
    }
      );
    if(response.status == 200){
      console.log(response)
      window.alert("تم ارسال الايميل بنجاح")  
    }
    else{
      window.alert(response.data.msg.name)
    }
  
  }catch(error){
      console.log(error.response)
      window.alert(error.response.data.msg.name || error.response.data.msg || "error")
  }
}
async function carrierResendEmail(userId){
  try{
  const response= await axios.post(`https://dashboard.go-tex.net/logistics-test/carrier/resend-verify-email/${userId}`,{},
  {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
  }
    );
  if(response.status == 200){
    console.log(response)
    window.alert("تم ارسال الايميل بنجاح")  
  }
  else{
    window.alert(response.data.msg.name)
  }

}catch(error){
    console.log(error.response)
    window.alert(error.response.data.msg.name || error.response.data.msg || "error")
}
}
async function trackerResendEmail(userId){
  try{
  const response= await axios.post(`https://dashboard.go-tex.net/logistics-test/tracker/resend-verify-email/${userId}`,{},
  {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
  }
    );
  if(response.status == 200){
    console.log(response)
    window.alert("تم ارسال الايميل بنجاح")  
  }
  else{
    window.alert(response.data.msg.name)
  }

}catch(error){
    console.log(error.response)
    window.alert(error.response.data.msg.name || error.response.data.msg || "error")
}
}

//edit user
const [isModalOpenUser, setIsModalOpenUser] = useState(false);
const [editedUser, setEditedUser] = useState(null);
const [eUser, seteUser] = useState(null);
const handleEditClickUser = (user) => {
  seteUser(user);
  setEditedUser(
    {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      mobile: user?.mobile || '',
      nid: user?.nid || '',
      city: user?.city || '',
      address: user?.address || '',
      
  }
  )
  setIsModalOpenUser(true);

  console.log(user)
  console.log(editedUser)
  console.log("yes")
}
const closeModalUser = () => {
  setIsModalOpenUser(false);
  setEditedUser(null)
};
const handleInputChangeUser = (event) => {
  const { name, value } = event.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    })); 
};
const handleEditSubmitUser = async (event) => {
  console.log(editedUser)
  event.preventDefault();
  try {
    const response = await axios.post(
      `https://dashboard.go-tex.net/logistics-test/user/${eUser._id}`,
      {...editedUser},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
    );
    console.log(editedUser)
    console.log(response);

    closeModalUser();
    window.alert("تم تعديل بيانات المستخدم بنجاح")
    getUsersListsAdmin()
    
  } catch (error) {
    console.error(error);
    alert(error.response.data.msg)
  }
} 

//edit Store
const [isModalOpenStore, setIsModalOpenStore] = useState(false);
const [editedStore, setEditedStore] = useState(null);
const [eStore, seteStore] = useState(null);
const handleEditClickStore = (user) => {
  seteStore(user);
  setEditedStore(
    {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      mobile: user?.mobile || '',
      city: user?.city || '',
      address: user?.address || '',
      
  }
  )
  setIsModalOpenStore(true);

  console.log(user)
  console.log(editedStore)
  console.log("yes")
}
const closeModalStore = () => {
  setIsModalOpenStore(false);
  setEditedStore(null)
};
const handleInputChangeStore = (event) => {
  const { name, value } = event.target;
    setEditedStore((prev) => ({
      ...prev,
      [name]: value,
    })); 
};
const handleEditSubmitStore = async (event) => {
  console.log(editedStore)
  event.preventDefault();
  try {
    const response = await axios.post(
      `https://dashboard.go-tex.net/logistics-test/store-keeper/${eStore._id}`,
      {...editedStore},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
    );
    console.log(editedStore)
    console.log(response);

    closeModalStore();
    window.alert("تم تعديل بيانات المستخدم بنجاح")
    getUsersStorekeepersAdmin()
    
  } catch (error) {
    console.error(error);
    alert(error.response.data.msg)
  }
} 

  return (
    <>
    <div className='p-5' id='content'>
    
    <div className="my-table p-4 ">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> الاسم</th>
            <th scope="col">الهاتف </th>
            <th scope="col">الإيميل </th>
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">مناطق المندوب </th>
            <th scope="col"> الهوية </th>
            <th scope="col">الصورة  </th>
            <th scope="col">ملف التوثيق  </th>
            <th>role</th>
            <th></th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {combinedList && combinedList.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                
                {/* {item._id?<td>{item._id}</td>:<td>_</td>} */}
                {item.firstName? <td>{item.firstName} {item.lastName}</td> :<td>_</td>}
                {item.mobile?<td>{item.mobile}</td>:<td>_</td>}
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.city?<td>{item.city}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                {item.deliveryDistricts ? (
          <td>
            {item.deliveryDistricts.join(',')}
          </td>
        ) : (
          <td>_</td>
        )}
                {item.nid?<td>{item.nid}</td>:<td>_</td>}
                {item.photo && item.photo?<td>
                  <a href={item.photo.replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الصورة</a>
                </td>:<td>_</td>}
                {item.papers && item.papers[0]?<td>
                  <a href={item.papers[0].replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الملف</a>
                </td>:<td>_</td>}
                {item.role?<td>{item.role}</td>:<td>_</td>}
                {item.role == 'data entry' ?<td>
                  <button className="btn-dataentry btn btn-secondary" onClick={()=>{handleEditClickUser(item)}}>  تعديل البيانات</button>
                </td>
                // :item.role == 'collector' || item.role == 'receiver'?<td>
                //   <button className="btn-carrier btn btn-secondary" onClick={()=>{(item._id)}}>تعديل   </button>
                // </td>
                :item.role == 'storekeeper' ?<td>
                  <button className="btn-dataentry btn btn-secondary" onClick={()=>{handleEditClickStore(item)}}>تعديل البيانات </button>
                </td>:<td></td>}
                {item.role == 'data entry' ?<td>
                  <button className="btn-dataentry btn btn-orange" onClick={()=>{userResendEmail(item._id)}}>إعادة إرسال إيميل </button>
                </td>:item.role == 'collector' || item.role == 'receiver'?<td>
                  <button className="btn-carrier btn btn-orange" onClick={()=>{carrierResendEmail(item._id)}}>إعادة إرسال إيميل </button>
                </td>:item.role == 'tracker' ?<td>
                  <button className="btn-dataentry btn btn-orange" onClick={()=>{trackerResendEmail(item._id)}}>إعادة إرسال إيميل </button>
                </td>:<td></td>}
                
                
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
    </div> 
    {isModalOpenUser && (<Modal show={isModalOpenUser} onHide={closeModalUser} >
        <Modal.Header >
          <Modal.Title>تعديل بيانات المستخدم
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleEditSubmitUser}>
        <div className="row">
                <div className="col-md-6 pb-1">
        <label htmlFor="first_name">الاسم الاول    :</label>
      <input onChange={handleInputChangeUser} value={editedUser.firstName} type="text" className='my-input my-2 form-control' name='firstName' />
      
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> اسم العائلة    :</label>
      <input onChange={handleInputChangeUser} value={editedUser.lastName} type="text" className='my-input my-2 form-control' name='lastName' />
      
    </div>
   
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">الهاتف  </label>
   
      <input onChange={handleInputChangeUser} value={editedUser.mobile} type="text" className='my-input my-2 form-control' name='mobile' />
     
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="first_name">رقم الهوية    :</label>
      <input onChange={handleInputChangeUser} value={editedUser.nid} type="text" className='my-input my-2 form-control' name='nid' />
      
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> المدينة    :</label>
      <input onChange={handleInputChangeUser} value={editedUser.city} type="text" className='my-input my-2 form-control' name='city' />
      
    </div>
   
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">العنوان  </label>
   
      <input onChange={handleInputChangeUser} value={editedUser.address} type="text" className='my-input my-2 form-control' name='address' />
     
      
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
          <Button variant="secondary" onClick={closeModalUser}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal>)} 
      {isModalOpenStore && (<Modal show={isModalOpenStore} onHide={closeModalStore} >
        <Modal.Header >
          <Modal.Title>تعديل بيانات المستخدم
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleEditSubmitStore}>
        <div className="row">
                <div className="col-md-6 pb-1">
        <label htmlFor="first_name">الاسم الاول    :</label>
      <input onChange={handleInputChangeStore} value={editedStore.firstName} type="text" className='my-input my-2 form-control' name='firstName' />
      
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> اسم العائلة    :</label>
      <input onChange={handleInputChangeStore} value={editedStore.lastName} type="text" className='my-input my-2 form-control' name='lastName' />
      
    </div>
   
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">الهاتف  </label>
   
      <input onChange={handleInputChangeStore} value={editedStore.mobile} type="text" className='my-input my-2 form-control' name='mobile' />
     
      
    </div>
  
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> المدينة    :</label>
      <input onChange={handleInputChangeStore} value={editedStore.city} type="text" className='my-input my-2 form-control' name='city' />
      
    </div>
   
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">العنوان  </label>
   
      <input onChange={handleInputChangeStore} value={editedStore.address} type="text" className='my-input my-2 form-control' name='address' />
     
      
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
          <Button variant="secondary" onClick={closeModalUser}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal>)} 
    </>
    )
}
