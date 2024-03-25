import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

export default function UserLogin({saveUserData}) {
  let navigate= useNavigate(); 
    const [errorList, seterrorList]= useState([]); 
    const [theUser,setUser] =useState({
      email:'',
      password:''
    })
    const [visible , setVisible] =useState(false);
    const [error , setError]= useState('')
    const [isLoading, setisLoading] =useState(false)
    
  
   
    async function sendLoginDataToApi(){
      try {
        const response = await axios.post('https://dashboard.go-tex.net/logistics-test/user/login', theUser);
        if (response.status === 201) {
          navigate('/userCreateOrder');
          localStorage.setItem('userToken', response.data.token);
          console.log(response.data.token);
          console.log(response)
          setisLoading(false);
          // window.alert('تم التسجيل')
          saveUserData();
        } else {
          setisLoading(false);
          setError(response.data.msg);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
        window.alert('كلمة المرور او البريد الالكترونى قد يكون خطأ');
      }
    } 
  
          function submitLoginForm(e) {
            e.preventDefault();
            setisLoading(true);
            let validation = validateLoginForm();
            console.log(validation);
            if (validation.error) {
              setisLoading(false);
              seterrorList(validation.error.details);
            } else {
                sendLoginDataToApi();
            }
          }
  
    function getUserData(e){
      let myUser={...theUser};
      myUser[e.target.name]= e.target.value;
      setUser(myUser);
      console.log(myUser);
    }
  
    function validateLoginForm(){
      let scheme= Joi.object({
        email:Joi.string().required(),
        password:Joi.string().required()
  
      });
      return scheme.validate(theUser, {abortEarly:false});
    }
    return (
      <>
  
      <div className="d-flex min-vh-100 login-container px-3">
      <div className="login-box m-auto">
          <div className="text-center">
      <img className='m-auto logo' src={logo} alt="logo" />
      </div>
      {/* {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''} */}
      <form onSubmit={submitLoginForm} className='my-3' action="">
        <label htmlFor="email">البريد الإلكترونى :</label>
        <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
        
        {errorList.map((err,index)=>{
        if(err.context.label ==='email'){
          return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
        }
        
      })}
        <label htmlFor="password">كلمة المرور :</label>
        <div className='pass-box'>
        <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control pass' name='password' id='password' />
        <span onClick={()=> setVisible(!visible)} className="seenpass">
        {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
        </span>
        {errorList.map((err,index)=>{
        if(err.context.label ==='password'){
          return <div key={index} className="alert alert-danger my-2">كلمة المرور غير صحيحة</div>
        }
        
      })}
      </div>
        {/* <Link className='pt-2 txt-dark' to="/forgetPassword">هل نسيت كلمة المرور؟</Link> <br/> */}
        <div className="text-center">
        <button className='btn btn-orange mt-3 mb-2'>
          تسجيل الدخول
        </button><br/>
        <Link className='pt-2' to="/forgetPasswordProcess">هل نسيت كلمة المرور؟</Link> 
        </div>
        
       </form>
       
      
       </div>
       </div>
      </>
    )
  
}
