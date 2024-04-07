
import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TrackerForgetPass({onTokenReceived }) {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const response = await fetch('https://dashboard.go-tex.net/logistics-test/tracker/send-forget-password-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (data.token) {
              window.alert('تم ارسال ايميل لتغيير كلمة المرور..تفقد بريدك الالكترونى')

              onTokenReceived(data.token);
            } else {
              console.error('Token not received in response:', data);
            }
          } catch (error) {
            console.error('Error sending forget password email:', error);
          }
        };
  return (
    <>
    <div className="d-flex min-vh-100 px-3">
        <div className="email-box m-auto">
            <p>يرجى إدخال بريدك الإلكتروني لتغيير كلمة المرور</p>
            <form onSubmit={handleSubmit} className='my-3' action="">
            <input
             value={email} onChange={(e) => setEmail(e.target.value)} required 
            name='email' className='form-control mb-4' type="email" placeholder='البريد الإلكتروني' />
            {/* {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })} */}
            <hr />
            <Link to="/userLogin" className="btn btn-secondary m-1">إلغاء</Link>
            <button type='submit' className="btn btn-primary m-1">إدخال</button> 
            </form>
        </div>
    </div>
    </>

    )
}

