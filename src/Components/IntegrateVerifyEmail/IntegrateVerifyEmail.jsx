import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import logo from '../../assets/logo.png'
import axios from 'axios';


export default function IntegrateVerifyEmail() {
    let allparams= useParams()
    const [apikey , setApikey]= useState('')
    async function veriftEmail(){
        try{
        let response= await axios.post(`https://dashboard.go-tex.net/logistics-test/integrate/user/verify-email/${allparams.id}`);
        if(response.status == 200){
          console.log(response)
        }
        else{
          window.alert(response.data)
        }
      
      }catch(error){
          console.log(error)
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
            <p className='fw-bold py-5 text-primary'>تم تأكيد الحساب بنجاح</p>
   
    </div>
    </div>
      </>
    )
  }
  