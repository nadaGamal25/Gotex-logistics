import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function CarrierResendEmail() {
    useEffect(()=>{
        getUsersListsAdmin()
      },[])
      const [usersListAdmin,setUsersListsAdmin]=useState([])
    
      async function getUsersListsAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics-test/carrier/',
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
      async function resendEmail(userId){
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
            <th scope="col">رقم الهوية </th>
            {/* <th>role</th> */}
           <th></th>
            
          </tr>
        </thead>
        <tbody>
          {usersListAdmin.map((item,index) =>{
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
                {/* {item.role?<td>{item.role}</td>:<td>_</td>} */}
                <td>
                  <button className="btn btn-orange" onClick={()=>{resendEmail(item._id)}}>إرسال إيميل </button>
                </td>
                
              
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
    </div>
      )
}
