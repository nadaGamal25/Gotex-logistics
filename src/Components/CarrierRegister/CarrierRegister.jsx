import axios from 'axios';
import React, { useState, useRef , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'

export default function CarrierRegister() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedNid, setSelectedNid] = useState(null);
    const [carrierRole, setCarrierrole] = useState(null)
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
    area:[''],
  })
  async function sendRegisterDataToApi(carrierRole) {
    const formData = new FormData();
    formData.append('firstName', theUser.firstName);
    formData.append('lastName', theUser.lastName);
    formData.append('mobile', theUser.mobile);
    formData.append('email', theUser.email);
    formData.append('address', theUser.address);
    formData.append('city', theUser.city);
    formData.append('nid', theUser.nid);
  //   theUser.area.forEach((area, index) => {
  //     formData.append(`area[${index}]`, area);
  // });
  const filteredAreas = theUser.area.filter(area => area.trim() !== '');
    filteredAreas.forEach((area, index) => {
        formData.append(`area[${index}]`, area);
    });
    if (selectedFile) {
      formData.append('papers', selectedFile, selectedFile.name);
    }
    if (selectedPhoto) {
        formData.append('photo', selectedPhoto, selectedPhoto.name);
      }

    try {
      const response = await axios.post(`https://dashboard.go-tex.net/logistics-test/carrier/register?role=${carrierRole}`, formData
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
        // setError(response.data.msg);
      }
    } catch (error) {
        setisLoading(true)
        // setError(error.response.data.msg)
        console.log(error.response)
        window.alert(error.response?.data?.msg?.name || error.response?.data?.errors[0]?.msg|| "error")
    }
  }

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
      // Check if at least one area is entered
      setIsFormValid(theUser.area.some(area => area.trim() !== ''));
  }, [theUser.area]);

  function handleFileChange(event) {
    console.log(event.target.files)
    setSelectedFile(event.target.files[0]);
  }
  function handlePhotoChange(event) {
    console.log(event.target.files)
    setSelectedPhoto(event.target.files[0]);
  }
  function handleNidChange(event) {
    console.log(event.target.files)
    setSelectedNid(event.target.files[0]);
  }
  
// function submitRegisterForm(e){
//     e.preventDefault();
//     setisLoading(true)
//     let validation = validateRegisterForm();
//     console.log(validation);
//     if(validation.error){
//       setisLoading(false)
//       seterrorList(validation.error.details)
//   console.log("no")
//     }else{
//       sendRegisterDataToApi();
//       console.log("yes")
// // alert('yeb')
//     }
  
//   }
// function submitRegisterForm(carrierRole) {
//   const formData = new FormData(); 
//   const filteredAreas = theUser.area.filter(area => area.trim() !== ''); // Filter out empty areas
 
//   filteredAreas.forEach((area, index) => {
//       formData.append(`area[${index}]`, area);
//   });
//   return async function (e) {
//     e.preventDefault();
//     setisLoading(true);
//     let validation = validateRegisterForm();
//     console.log(validation);
//     if (validation.error) {
//       setisLoading(false);
//       seterrorList(validation.error.details);
//       console.log("no");
//     } else {
//       sendRegisterDataToApi(carrierRole,formData); 
//       console.log("yes");
//       // alert('yeb');
//     }
//   };
// }
function submitRegisterForm(carrierRole) {
  // const formData = new FormData(); 
  // const filteredAreas = theUser.area.filter(area => area.trim() !== ''); // Filter out empty areas
  // if (filteredAreas.length === 0) {
  //     alert('يجب ملء جميع البيانات في المناطق');
  //     return; // Prevent form submission if any area is empty
  // }
  // filteredAreas.forEach((area, index) => {
  //     formData.append(`area[${index}]`, area);
  // });
  return async function (e) {
      e.preventDefault();
      setisLoading(true);
      let validation = validateRegisterForm();
      console.log(validation);
      if (validation.error) {
          setisLoading(false);
          seterrorList(validation.error.details);
          console.log("no");
      } else {
          sendRegisterDataToApi(carrierRole); 
          console.log("yes");
          // alert('yeb');
      }
  };
}

  // function getUserData(e){
  //   let myUser={...theUser};
  //   myUser[e.target.name]= e.target.value;
  //   setUser(myUser);
  //   console.log(myUser);
  // }

  function getUserData(e) {
    const { name, value } = e.target;
    if (name === 'area') {
        const index = parseInt(e.target.dataset.index);
        const updatedAreas = [...theUser.area];
        updatedAreas[index] = value;
        setUser({ ...theUser, area: updatedAreas });
    } else {
        setUser({ ...theUser, [name]: value });
    }
    console.log(theUser);
}

// function addAreaInput() {
//     setUser({ ...theUser, area: [...theUser.area, ''] });
// }

function addAreaInput() {
  const updatedAreas = [...theUser.area, '']; 
  setUser({ ...theUser, area: updatedAreas });
}
  function validateRegisterForm(){
    let scheme= Joi.object({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        mobile:Joi.string().required(),
        email:Joi.string().required(),
        address:Joi.string().required(),
        city:Joi.string().required(),
        nid:Joi.required(),
        photo:Joi.allow(null, ''),
        papers:Joi.allow(null, ''),
        area: Joi.array().min(0).items(Joi.string().trim().allow('') )      
        // :Joi.allow(null, ''),
    });

    return scheme.validate(theUser, {abortEarly:false});
  }

  
  function handlePhoneChange(value,e) {
    setPhoneValue(value);
    getUserData(e); // Call getUserData function wh
  }

  return (
    <>
    <div className='py-5 px-4' id='content'>
    <div className="register-box m-auto p-4">
    
    
    {/* {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''} */}
    <form onSubmit={submitRegisterForm(carrierRole)} className='my-3' action="">
      <div className="row">
      <div className="col-md-6">
      <label htmlFor="firstName">الاسم الأول : <span className="star-requered">*</span></label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='firstName' id='firstName' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='firstName'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    </div>
    <div className="col-md-6">
      <label htmlFor="lastName"> اسم العائلة  : <span className="star-requered">*</span></label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='lastName' id='lastName' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='lastName'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    </div>
    <div className="col-md-6">
    <label htmlFor="email">البريد الالكترونى : <span className="star-requered">*</span></label>
      <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })}
    </div>
      <div className="col-md-6">     
    <label htmlFor="mobile">رقم الهاتف : <span className="star-requered">*</span></label>    
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
      <label htmlFor="city">الموقع(المدينة) : <span className="star-requered">*</span></label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='city' id='city' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    </div>
      <div className="col-md-6">
      <label htmlFor="address">العنوان : <span className="star-requered">*</span></label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='address' id='address' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='address'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    </div>
    {/* <div className="col-md-6">
      <label htmlFor="area">المناطق : <span className="star-requered">*</span></label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='area' id='area' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='area'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    </div> */}
    <div className="col-md-6">
      <label htmlFor="nid">رقم الهوية : <span className="star-requered">*</span></label>
      <input onChange={(e) => {
          getUserData(e);
        }} type="text" className='my-input my-2 form-control' name='nid' id='nid' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='nid'){
        return <div key={index} ctextlassName="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    </div>
    <div className="col-md-6">
      <label htmlFor="papers">صورة الهوية  : <span className="star-requered"> </span></label>
      <input
        type="file"
        className="my-2 my-input form-control"
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
    <div className="col-md-6">
      <label htmlFor="photo">صورة شخصية :<span className="star-requered"> </span></label>
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
                                <label htmlFor="area">مناطق المندوب : <span className="star-requered">*</span></label>
                                <div className="row">
                                {theUser.area.map((area, index) => (
                                  
                                    <div key={index} className="mb-2 col-11">
                                        <input
                                            type="text"
                                            className='my-input my-2 form-control'
                                            name='area'
                                            id={`area-${index}`}
                                            value={area}
                                            data-index={index}
                                            onChange={getUserData}
                                        />
                                    </div>
                                ))}
                                <div className="col-1 p-0">
                                <button type="button" className="btn btn-success mt-2" onClick={addAreaInput}> + </button>
                                </div>
                                </div>
                                {errorList.map((err, index) => {
                                    if (err.context.label === 'area') {
                                        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
                                    }

                                })}
                            </div>
    </div>
    <div className="text-center">
      <button onClick={()=>setCarrierrole('collector')} disabled={!isFormValid}  className='btn btn-orange mt-3 mx-1'>
        {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:' تسجيل مندوب تجميع'}
      </button>
      <button onClick={()=>setCarrierrole('receiver')} disabled={!isFormValid} className='btn btn-primary mt-3 mx-1'>
        {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:' تسجيل مندوب تسليم'}
      </button>
      </div>
     </form>
     
     
     </div>
     </div>
    </>
      )
}
