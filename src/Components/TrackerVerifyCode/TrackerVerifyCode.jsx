
import React from 'react'
import { useState } from "react";

export default function TrackerVerifyCode({ token, onCodeVerified }) {
    const [code, setCode] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('https://dashboard.go-tex.net/logistics/tracker/verify-forget-password-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, code })
        });
        const data = await response.json();
        if (response.status == 200) {
          window.alert('تم تأكيد الرمز المرسل بنجاح')
          onCodeVerified();
        } else {
          console.error('Code verification failed:', data);
        }
      } catch (error) {
        console.error('Error verifying forget password code:', error);
      }
    };
  
    return (
      <div className="d-flex min-vh-100 px-3">
          <div className="email-box m-auto">
              <p>يرجى إدخال الكود المرسل فى بريدك لتغيير كلمة المرور</p>
      <form onSubmit={handleSubmit}>
        <input className='form-control mb-4' type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="الكود" required />
        <hr/>
        <button className="btn btn-primary m-1" type="submit"> تأكيد الكود</button>
      </form>
      </div>
      </div>
    );
  };
