import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminUsers() {
  useEffect(()=>{
    getUsersListsAdmin()
    getUsersCarriersAdmin()
    getUsersStorekeepersAdmin()
  },[])
  const [usersListAdmin,setUsersListsAdmin]=useState([])
  const [carriersListAdmin, setCarriersListsAdmin] = useState([]);
  const [storekeepersListAdmin, setStorekeepersListsAdmin] = useState([]);

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
 
  const combinedList = [...usersListAdmin, ...carriersListAdmin, ...storekeepersListAdmin];

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

  return (
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
            <th scope="col"> الهوية </th>
            <th scope="col">الصورة  </th>
            <th scope="col">ملف التوثيق  </th>
            <th>role</th>
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
                {item.nid?<td>{item.nid}</td>:<td>_</td>}
                {item.photo && item.photo?<td>
                  <a href={item.photo.replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الصورة</a>
                </td>:<td>_</td>}
                {item.papers && item.papers[0]?<td>
                  <a href={item.papers[0].replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الملف</a>
                </td>:<td>_</td>}
                {item.role?<td>{item.role}</td>:<td>_</td>}
                {item.role == 'data entry' ?<td>
                  <button className="btn-dataentry btn btn-orange" onClick={()=>{userResendEmail(item._id)}}>إعادة إرسال إيميل </button>
                </td>:<td>
                  <button className="btn-carrier btn btn-orange" onClick={()=>{carrierResendEmail(item._id)}}>إعادة إرسال إيميل </button>
                </td>}
                
                
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
    </div>  )
}
