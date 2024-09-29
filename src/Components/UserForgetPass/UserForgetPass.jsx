import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function UserForgetPass({onTokenReceived }) {
  const [email, setEmail] = useState('');

  //   const [errorList, seterrorList]= useState([]); 
  //   const [theUser,setUser] =useState({
  //     email:'',
  //   })
  //   const [error , setError]= useState('')
  //   const [isLoading, setisLoading] =useState(false)
    
 
  // async function sendDataToApi(){
  //   try {
  //         const response = await axios.post('https://dashboard.go-tex.net/logistics/user/send-forget-password-email', theUser);
  //         if (response.status === 200) {
  //           console.log(response)
  //           setisLoading(false)
  //           window.alert('تم ارسال ايميل لتغيير كلمة المرور..تفقد بريدك الالكترونى')
  //           const data = await response.json();
  //       onTokenReceived(data.token); // Pass the token to the parent component
  //     console.log(data)
  //         } else {
  //           setisLoading(false)
  //           setError(response.data.msg)
  //           console.log(response.data.msg)
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         // window.alert(error.response.data);
  //       }
  //     }
  
  //         function submitForm(e) {
  //           e.preventDefault();
  //           setisLoading(true);
  //           let validation = validateForm();
  //           console.log(validation);
  //           if (validation.error) {
  //             setisLoading(false);
  //             seterrorList(validation.error.details);
  //           } else {
              
  //               sendDataToApi();
              
  //           }
  //         }
  
  //   function getUserData(e){
  //     let myUser={...theUser};
  //     myUser[e.target.name]= e.target.value;
  //     setUser(myUser);
  //     console.log(myUser);
  //   }
  
  //   function validateForm(){
  //     let scheme= Joi.object({
  //       email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).required(),
  
  //     });
  //     return scheme.validate(theUser, {abortEarly:false});
    // }
    const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const response = await fetch('https://dashboard.go-tex.net/logistics/user/send-forget-password-email', {
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

// const UserForgetPass = ({onTokenReceived }) => {
//   const [email, setEmail] = useState('');
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://dashboard.go-tex.net/logistics/user/send-forget-password-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email })
//       });
//       const data = await response.json();
//       // Check if the token is present in the response
//       if (data.token) {
//         onTokenReceived(data.token); // Pass the token to the parent component
//       } else {
//         console.error('Token not received in response:', data);
//         // Handle error or display appropriate message to the user
//       }
//     } catch (error) {
//       console.error('Error sending forget password email:', error);
//       // Handle error or display appropriate message to the user
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
//       <button type="submit">Send Forget Password Email</button>
//     </form>
//   );
// };

// export default UserForgetPass;