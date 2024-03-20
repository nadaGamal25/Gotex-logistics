import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function UserForgetPass() {
    const [errorList, seterrorList]= useState([]); 
    const [theUser,setUser] =useState({
      email:'',
    })
    const [error , setError]= useState('')
    const [isLoading, setisLoading] =useState(false)
    
 
  async function sendDataToApi(){
    try {
          const response = await axios.post('https://dashboard.go-tex.net/logistics-test/user/send-forget-password-email', theUser);
          if (response.status === 200) {
            console.log(response.data)
            setisLoading(false)
            window.alert('تم ارسال ايميل لتغيير كلمة المرور..تفقد بريدك الالكترونى')
          } else {
            setisLoading(false)
            setError(response.data.msg)
            console.log(response.data.msg)
          }
        } catch (error) {
          console.log(error);
          window.alert(error.response.data);
        }
      }
  
          function submitForm(e) {
            e.preventDefault();
            setisLoading(true);
            let validation = validateForm();
            console.log(validation);
            if (validation.error) {
              setisLoading(false);
              seterrorList(validation.error.details);
            } else {
              
                sendDataToApi();
              
            }
          }
  
    function getUserData(e){
      let myUser={...theUser};
      myUser[e.target.name]= e.target.value;
      setUser(myUser);
      console.log(myUser);
    }
  
    function validateForm(){
      let scheme= Joi.object({
        email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).required(),
  
      });
      return scheme.validate(theUser, {abortEarly:false});
    }
  return (
    <>
    <div className="d-flex min-vh-100 px-3">
        <div className="email-box m-auto">
            <p>يرجى إدخال بريدك الإلكتروني لتغيير كلمة المرور</p>
            <form onSubmit={submitForm} className='my-3' action="">
            <input onChange={getUserData} name='email' className='form-control mb-4' type="email" placeholder='البريد الإلكتروني' />
            {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })}
            <hr />
            <Link to="/userLogin" className="btn btn-secondary m-1">إلغاء</Link>
            <button className="btn btn-primary m-1">إدخال</button> 
            </form>
        </div>
    </div>
    </>

    )
}
