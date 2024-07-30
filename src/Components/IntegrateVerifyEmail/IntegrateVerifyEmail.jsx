import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import logo from '../../assets/logo.png'
import axios from 'axios';


export default function IntegrateVerifyEmail() {
    let allparams= useParams()
    const [isVerified , setIsVerified]= useState(false)
    async function veriftEmail(){
        try{
        let response= await axios.post(`https://dashboard.go-tex.net/logistics-test/integrate/user/verify-email/${allparams.id}`);
          console.log(response)
          setIsVerified(true)
      }catch(error){
          console.log(error)
          setIsVerified(false)
        //   window.alert(error.response.data.message||"error")
      }
    }
    useEffect(() => {
        veriftEmail()
        }, [])
    return (
      <>
      <div className='min-vh-100 d-flex justify-content-center align-content-center'>
      <div className="box-setPass m-auto p-4">
        <div className="text-center">
    <img className='m-auto logo' src={logo} alt="logo" />
    </div>
    {isVerified?<p className='fw-bold py-5 text-primary'>تم تأكيد الحساب بنجاح</p>
    :<p className='fw-bold py-5 text-danger'>حدث خطأ ما..يرجى ابلاغ الادمن لاعادة ارسال ايميل التوثيق مرة اخرى   </p>}
   
    </div>
    </div>
      </>
    )
  }
  