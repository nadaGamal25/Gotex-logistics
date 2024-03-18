import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'

export default function CarrierRegister() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [visible , setVisible] =useState(false);  
  let navigate= useNavigate(); 
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
    address: "",
    photo:"",
    papers:"",
  })
  async function sendRegisterDataToApi() {
    const formData = new FormData();
    formData.append('firstName', theUser.firstName);
    formData.append('lastName', theUser.lastName);
    formData.append('mobile', theUser.mobile);
    formData.append('email', theUser.email);
    formData.append('address', theUser.address);
    formData.append('city', theUser.city);
    formData.append('nid', theUser.nid);
    
    if (selectedFile) {
      formData.append('papers', selectedFile, selectedFile.name);
    }
    if (selectedPhoto) {
        formData.append('photo', selectedPhoto, selectedPhoto.name);
      }
    try {
      const response = await axios.post('https://dashboard.go-tex.net/logistics-test/carrier/register', formData
      ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
      );
  
      if (response.status === 200) {
        setisLoading(false);
        console.log(response);
        window.alert('تم التسجيل بنجاح');
      } else {
        setisLoading(true);
        setError(response.data.msg);
      }
    } catch (error) {
        setisLoading(true)
        setError(error.response.data.msg)
        console.log(error.response)
        window.alert(error.response.data.msg.name || error.response.data.msg || "error")
    }
  }

  function handleFileChange(event) {
    console.log(event.target.files)
    setSelectedFile(event.target.files[0]);
  }
  function handlePhotoChange(event) {
    console.log(event.target.files)
    setSelectedPhoto(event.target.files[0]);
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
        photo:Joi.allow(null, ''),
        papers:Joi.allow(null, ''),
        // :Joi.allow(null, ''),
    });

    return scheme.validate(theUser, {abortEarly:false});
  }

  
  function handlePhoneChange(value,e) {
    setPhoneValue(value);
    getUserData(e); // Call getUserData function when phone number changes
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
    <div className="col-md-6">
      <label htmlFor="photo">صورة شخصية :</label>
      <input
        type="file"
        className="my-2 form-control"
        name="photo"
        onChange={(e) => {
          handlePhotoChange(e);
          getUserData(e);
        }}
    
      />    
        {errorList.map((err,index)=>{
      if(err.context.label ==='photo'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    </div>
    <div className="col-md-6">
      <label htmlFor="papers">ملف توثيق :</label>
      <input
        type="file"
        className="my-2 form-control"
        name="papers"
        onChange={(e) => {
          handleFileChange(e);
          getUserData(e);
        }}
    
      /> 
          {errorList.map((err,index)=>{
      if(err.context.label ==='papers'){
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
