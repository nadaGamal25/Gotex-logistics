import axios from 'axios';
import Joi from 'joi';
import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export default function CarrierPasswordFirst() {
    let navigate= useNavigate();
    let allparams= useParams()
    const [visible , setVisible] =useState(false);  
    const [errorList, seterrorList]= useState([]); 
    const [value ,setPhoneValue]=useState()
    const [error , setError]= useState('')
    const [isLoading, setisLoading] =useState(false)
    const [theUser,setUser] =useState({
        email: "",
        password: "",
        confirmPassword:"",
        
    })
    async function sendRegisterDataToApi(){
    try{
    let response= await axios.post(`https://dashboard.go-tex.net/logistics/carrier/set-password/${allparams.id}`,theUser,
   
      );
    if(response.status == 200){
      setisLoading(false)
      console.log(response)
      window.alert("تم التسجيل بنجاح")  
      navigate("/carrierLogin")
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
      window.alert(error.response.data.msg.name || error.response.data.msg ||"error")
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
        email:Joi.string().required(),
        password:Joi.string().pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        ).required(),
        confirmPassword: Joi.valid(Joi.ref('password')).required().messages({
          'any.only': 'Passwords do not match',
          'any.required': 'Password confirmation is required',
        }),
        
      });
  
      return scheme.validate(theUser, {abortEarly:false});
    }
  
  return (
    <>
    <div className='min-vh-100 d-flex justify-content-center align-content-center'>
      <div className="box-setPass m-auto p-4">
      <div className="text-center">
    <img className='m-auto logo' src={logo} alt="logo" />
    </div>
      <form onSubmit={submitRegisterForm} className='my-3' action="">
      <label htmlFor="email">البريد الالكترونى :</label>
      <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })}

      <label htmlFor="password">كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control' name='password' id='password' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
      </span>
      {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2"> كلمة المرور يجب ان  لا تقل عن ثمانية احرف وارقام على الاقل ويجب ان تحتوى lowercase & uppercase character ورمزاواحدا على الاقل</div>
      }
      
    })}
    </div>
      <label htmlFor="confirmPassword">تأكيد كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control' name='confirmPassword' id='confirmPassword' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      </span>
      {/* {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''} */}
      {errorList.map((err,index)=>{
      if(err.context.label ==='confirmPassword'){
        return <div key={index} className="alert alert-danger my-2">كلمة السر غير متطابقة</div>
      }
      
    })}
    </div>
    <div className="text-center">
        <button className='btn btn-orange mt-3'>
          {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'تأكيد الحساب'}
        </button>
        </div>
</form>
      </div>
    </div>
    </>
      )
}
