import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import logo from '../../assets/logo.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'

export default function RegisterUser() {
    const [visible , setVisible] =useState(false);  
    let navigate= useNavigate(); //hoke
    const [errorList, seterrorList]= useState([]); 
    const [value ,setPhoneValue]=useState()
    const [error , setError]= useState('')
    const [isLoading, setisLoading] =useState(false)
    const [theUser,setUser] =useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        nid:"",
        city: "",
        address: ""
    })
    async function sendRegisterDataToApi(){
    try{
    let response= await axios.post(`https://dashboard.go-tex.net/logistics-test/user/register`,theUser,
    {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
      );
    if(response.status == 200){
      setisLoading(false)
      console.log(response)
      window.alert("تم التسجيل بنجاح")  
    }
    else{
      setisLoading(true)
      setError(response.data.msg)
      window.alert(response.data.msg.name)
    }
  
  }catch(error){
    setisLoading(true)
      setError(error.response.data.msg)
      console.log(error.response)
      window.alert(error.response.data.msg.name || error.response.data.msg)
  }
}
  function submitRegisterForm(e){
      e.preventDefault();
      setisLoading(true)
      let validation = validateRegisterForm();
      console.log(validation);
      if(validation.error){
        setisLoading(false)
        seterrorList(validation.error.details)
    console.log("no")
      }else{
        sendRegisterDataToApi();
        console.log("yes")
  
      }
    
    }
    function getUserData(e){
      let myUser={...theUser};
      myUser[e.target.name]= e.target.value;
      setUser(myUser);
      console.log(myUser);
    }
  
    function validateRegisterForm(){
      let scheme= Joi.object({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        mobile:Joi.string().required(),
        email:Joi.string().email({ tlds: { allow: ['com', 'net'] }}).required(),
        address:Joi.string().required(),
        city:Joi.string().required(),
        nid:Joi.string().required(),
      });
  
      return scheme.validate(theUser, {abortEarly:false});
    }
  
    return (
      <>
      <div className='py-5 px-4' id='content'>
      <div className="register-box m-auto p-4">
      
      
      {/* {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''} */}
      <form onSubmit={submitRegisterForm} className='my-3' action="">
        <div className="row">
        <div className="col-md-6">
        <label htmlFor="firstName">الاسم الأول  :</label>
        <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='firstName' id='firstName' />
        {errorList.map((err,index)=>{
        if(err.context.label ==='firstName'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
        }
        
      })}
      </div>
      <div className="col-md-6">
        <label htmlFor="lastName"> اسم العائلة  :</label>
        <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='lastName' id='lastName' />
        {errorList.map((err,index)=>{
        if(err.context.label ==='lastName'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
        }
        
      })}
      </div>
      <div className="col-md-6">
      <label htmlFor="email">البريد الالكترونى :</label>
        <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
        {errorList.map((err,index)=>{
        if(err.context.label ==='email'){
          return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
        }
        
      })}
      </div>
        <div className="col-md-6">     
      <label htmlFor="mobile">رقم الهاتف :</label>    
      <PhoneInput name='mobile' value={value} 
      labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' onChange={(value) => {
        setPhoneValue(value);
        getUserData({ target: { name: 'mobile', value } });
      }}
  
      />
      {errorList.map((err,index)=>{
        if(err.context.label ==='mobile'){
          return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات</div>
        }
        
      })}
        </div>
        <div className="col-md-6">
        <label htmlFor="city">الموقع(المدينة) :</label>
        <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='city' id='city' />
        {errorList.map((err,index)=>{
        if(err.context.label ==='city'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
        }
        
      })}
      </div>
        <div className="col-md-6">
        <label htmlFor="address">العنوان :</label>
        <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='address' id='address' />
        {errorList.map((err,index)=>{
        if(err.context.label ==='address'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
        }
        
      })}
      </div>
      <div className="col-md-6">
        <label htmlFor="nid">رقم الهوية :</label>
        <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='nid' id='nid' />
        {errorList.map((err,index)=>{
        if(err.context.label ==='nid'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
        }
        
      })}
      </div>
      </div>
      <div className="text-center">
        <button className='btn btn-orange mt-3'>
          {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'انشاء حساب'}
        </button>
        </div>
       </form>
       
       
       </div>
       </div>
      </>
    )
  }
  