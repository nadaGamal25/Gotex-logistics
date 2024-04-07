
import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function TrackerSetNewPass({ token }) {
    const [password, setPassword] = useState('');
    let navigate= useNavigate(); 
    const [visible , setVisible] =useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('https://dashboard.go-tex.net/logistics-test/tracker/set-new-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, password })
        });
        const data = await response.json();
        window.alert('تم تغيير كلمة المرور بنجاح')
        navigate('/carrierLogin')
      } catch (error) {
        console.error('Error setting new password:', error);
      }
    };
  
    return (
      <div className="d-flex min-vh-100 px-3">
          <div className="email-box m-auto">
              <p>يرجى إدخال كلمة المرور الجديدة</p>
      <form onSubmit={handleSubmit}>
      <div className='pass-box'>
          <input type={visible? "text" :"password"} className='mb-4 form-control pass' name='password' id='password'
          value={password} onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" required />
          <span onClick={()=> setVisible(!visible)} className="seenpass">
          {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
          </span>
         
        </div>
      <hr />
        <button className="btn btn-primary m-1" type="submit">إدخال كلمة المرور الجديدة </button>
      </form>
      </div>
      </div>
      
    );
  };