import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminCarriers() {
    useEffect(()=>{
        getUsersListsAdmin()
      },[])
      const [usersListAdmin,setUsersListsAdmin]=useState([])
    
      async function getUsersListsAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/logistics/carrier/',
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
            <th scope="col">الصورة  </th>
            <th scope="col">ملف التوثيق  </th>
            {/* <th>role</th> */}
           
            
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
                {item.photo && item.photo?<td>
                  <a href={item.photo.replace('public', 'https://dashboard.go-tex.net/logistics')} target='_blank'>رابط_الصورة</a>
                </td>:<td>_</td>}
                {item.papers && item.papers[0]?<td>
                  <a href={item.papers[0].replace('public', 'https://dashboard.go-tex.net/logistics')} target='_blank'>رابط_الملف</a>
                </td>:<td>_</td>}
                
                
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
