import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import logo from '../../assets/logo.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'

export default function RegisterUser() {
  const [selectedNid, setSelectedNid] = useState(null);

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
    async function sendRegisterDataToApi() {
      // const formData = new FormData();
      // formData.append('firstName', theUser.firstName);
      // formData.append('lastName', theUser.lastName);
      // formData.append('mobile', theUser.mobile);
      // formData.append('email', theUser.email);
      // formData.append('address', theUser.address);
      // formData.append('city', theUser.city);
      // formData.append('nid', theUser.nid);

      // // if (selectedNid) {
      // //   formData.append('nid', selectedNid, selectedNid.name);
      // // } 
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
      // setError(error.response.data.msg)
      console.log(error.response)
      window.alert(error.response?.data?.msg?.name || error.response?.data?.errors[0]?.msg|| "error")
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
        email:Joi.string().required(),
        address:Joi.string().required(),
        city:Joi.string().required(),
        nid:Joi.required(),
      });
  
      return scheme.validate(theUser, {abortEarly:false});
    }
    function handleNidChange(event) {
      console.log(event.target.files)
      setSelectedNid(event.target.files[0]);
    }

    const [cities,setCities]=useState()
    async function getCities() {
      console.log(localStorage.getItem('userToken'))
      try {
        const response = await axios.get('https://dashboard.go-tex.net/logistics-test/cities',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        setCities(response.data.cities)
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => {
      getCities()
    }, [])
  const [search, setSearch] = useState('')
  const [search2, setSearch2] = useState('')

  const [showCitiesList, setCitiesList] = useState(false);
  const openCitiesList = () => {
    setCitiesList(true);
  };

  const closeCitiesList = () => {
    setCitiesList(false);
  };
  const citiesListRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        citiesListRef.current &&
        !citiesListRef.current.contains(e.target) &&
        e.target.getAttribute('name') !== 'city'
      ) {
        closeCitiesList();
      }
    };

    if (showCitiesList) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [showCitiesList]);
  
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
        <div className="col-md-6 ul-box">
        {/* <label htmlFor="city">الموقع(المدينة) :</label>
        <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='city' id='city' />
        {errorList.map((err,index)=>{
        if(err.context.label ==='city'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
        }
        
      })} */}
      <label htmlFor="">  الموقع( المدينة)<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='city'
                onChange={(e)=>{ 
                  openCitiesList()
                  const searchValue = e.target.value;
                  setSearch(searchValue);
                  getUserData(e)
                  // const matchingCities = cities.filter((city) => {
                  //   return searchValue === '' ? true : city.name_ar.includes(searchValue);
                  // });
                  // if (matchingCities.length === 0) {
                  //   openCitiesList();
                  // } else {
                  //   openCitiesList();
                  // }
                  }}
                  onFocus={openCitiesList}
                  onClick={openCitiesList}
                  />
                  {showCitiesList && (
                    <ul  className='ul-cities' ref={citiesListRef}>  
                    {cities && cities.filter((item)=>{
                    return search === ''? item : item.name_ar.includes(search);
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='city' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        // setItemCity(selectedCity)
                        getUserData({ target: { name: 'city', value: selectedCity } });
                        document.querySelector('input[name="city"]').value = selectedCity;
                        closeCitiesList();
                    }}
                      >
                        {item.name_ar}
                     </li>
                     )
                    }
                    )}
                    </ul>
                  )}
                 
                
                {errorList.map((err,index)=>{
      if(err.context.label ==='city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
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
        <input onChange={(e) => {
          // handleNidChange(e);
          getUserData(e);
        }} type=" text" className='my-input my-2 form-control' name='nid' id='nid' />
        {errorList.map((err,index)=>{
        if(err.context.label ==='nid'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
        }
        
      })}
      </div>
      </div>
      <div className="text-center">
        <button className='btn btn-orange mt-3'>
          {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'انشاء حساب مدخلة'}
        </button>
        </div>
       </form>
       
       
       </div>
       </div>
      </>
    )
  }
  