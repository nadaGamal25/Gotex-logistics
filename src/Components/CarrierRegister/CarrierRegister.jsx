import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import {  createRef } from 'react';
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
    const [cityId, setCityId] = useState(null)
  const [visible , setVisible] =useState(false);  
  let navigate= useNavigate(); 
  const [errorList, seterrorList]= useState([]); 
  const [value ,setPhoneValue]=useState()
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [hiddenDeliveryDistricts, setHiddenDeliveryDistricts] = useState([]);
  const [isDistrict, setIsDistrict] = useState(false);


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
    deliveryCity:"",
    deliveryDistricts:[''],
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
    formData.append('deliveryCity', theUser.deliveryCity);
  //   theUser.area.forEach((area, index) => {
  //     formData.append(`area[${index}]`, area);
  // });
  // const filteredAreas = theUser.deliveryDistricts.filter(deliveryDistricts => deliveryDistricts.trim() !== '');
  //   filteredAreas.forEach((deliveryDistricts, index) => {
  //       formData.append(`deliveryDistricts[${index}]`, deliveryDistricts);
  //   });
  const deliveryDistrictsToSend = theUser.deliveryDistricts.includes("جميع المناطق") ? hiddenDeliveryDistricts : theUser.deliveryDistricts;
    
    deliveryDistrictsToSend.forEach((deliveryDistricts, index) => {
        formData.append(`deliveryDistricts[${index}]`, deliveryDistricts);
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
        window.alert(error.response?.data?.msg || error.response?.data?.msg?.name || error.response?.data?.errors[0]?.msg|| "error")
    }
  }

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
      // Check if at least one area is entered
      setIsFormValid(theUser.deliveryDistricts.some(deliveryDistricts => deliveryDistricts.trim() !== ''));
  }, [theUser.deliveryDistricts]);

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

function submitRegisterForm(carrierRole) {
 
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

//   function getUserData(e) {
//     console.log(cityId)
//     const { name, value } = e.target;
//     if (name === 'deliveryDistricts') {
//         const index = parseInt(e.target.dataset.index);
//         const updatedAreas = [...theUser.deliveryDistricts];
//         updatedAreas[index] = value;
//         setUser({ ...theUser, deliveryDistricts: updatedAreas });
//     } else {
//         setUser({ ...theUser, [name]: value });
//     }
//     console.log(theUser);
// }
function getUserData(e) {
  const { name, value } = e.target;
  if (name === 'deliveryDistricts') {
      if (value === "جميع المناطق") {
          const allDistricts = districts.filter((district) => district.city_id === cityId).map(district => district.name_ar);
          setUser({ ...theUser, deliveryDistricts: [value] });
          // Set the actual districts in the hidden state
          setHiddenDeliveryDistricts(allDistricts);
      } else {
          const index = parseInt(e.target.dataset.index);
          const updatedAreas = [...theUser.deliveryDistricts];
          updatedAreas[index] = value;
          setUser({ ...theUser, deliveryDistricts: updatedAreas });
      }
  } else {
      setUser({ ...theUser, [name]: value });
  }
  console.log(theUser);
}



// function addAreaInput() {
//     setUser({ ...theUser, area: [...theUser.area, ''] });
// }
function addAreaInput() {
  const updatedAreas = [...theUser.deliveryDistricts, ''];
  setUser({ ...theUser, deliveryDistricts: updatedAreas });
}


// function addAreaInput() {
//   const updatedAreas = [...theUser.deliveryDistricts, '']; 
//   setUser({ ...theUser, deliveryDistricts: updatedAreas });
// }
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
        deliveryCity:Joi.string().required(),
        deliveryDistricts: Joi.array().min(0).items(Joi.string().trim().allow('') )      
        // :Joi.allow(null, ''),
    });

    return scheme.validate(theUser, {abortEarly:false});
  }



  const [cities,setCities]=useState()
    async function getCities() {
      console.log(localStorage.getItem('adminToken'))
      try {
        const response = await axios.get('https://dashboard.go-tex.net/logistics-test/cities',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setCities(response.data.cities)
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
    const [districts,setDistricts]=useState()
    async function getDistricts() {
      console.log(localStorage.getItem('adminToken'))
      try {
        const response = await axios.get('https://dashboard.go-tex.net/logistics-test/cities/districts',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setDistricts(response.data.districts)
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => {
      getCities()
      getDistricts()
    }, [])
  const [search1, setSearch1] = useState('')
  // const [search2, setSearch2] = useState('')

  const [showCitiesList1, setCitiesList] = useState(false);
  const openCitiesList1 = () => {
    setCitiesList(true);
  };

  const closeCitiesList1 = () => {
    setCitiesList(false);
  };
  const citiesListRef1 = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        citiesListRef1.current &&
        !citiesListRef1.current.contains(e.target) &&
        e.target.getAttribute('name') !== 'city'
      ) {
        closeCitiesList1();
      }
    };

    if (showCitiesList1) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [showCitiesList1]);

  // const [showCitiesList, setShowCitiesList] = useState(Array(theUser.area.length).fill(false));
  // const [searchCities, setSearchCities] = useState(Array(theUser.area.length).fill(''));
  // const citiesListRef = useRef(Array(theUser.area.length).map(() => createRef()));
  
  // const openCitiesList = (index) => {
  //   setShowCitiesList((prev) => {
  //     const newState = [...prev];
  //     newState[index] = true;
  //     return newState;
  //   });
  // };
  
  // const closeCitiesList = (index) => {
  //   setShowCitiesList((prev) => {
  //     const newState = [...prev];
  //     newState[index] = false;
  //     return newState;
  //   });
  // };
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
      <div className="col-md-6 ul-box">
      {/* <label htmlFor="city">الموقع(المدينة) : <span className="star-requered">*</span></label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='city' id='city' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })} */}
    <label htmlFor="">  الموقع( المدينة)<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='city'
                onChange={(e)=>{ 
                  openCitiesList1()
                  const searchValue = e.target.value;
                  setSearch1(searchValue);
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
                  onFocus={openCitiesList1}
                  onClick={openCitiesList1}
                  />
                  {showCitiesList1 && (
                    <ul  className='ul-cities' ref={citiesListRef1}>  
                    {cities && cities.filter((item)=>{
                    return search1 === ''? item : item.name_ar.includes(search1);
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='city' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        // setItemCity(selectedCity)
                        getUserData({ target: { name: 'city', value: selectedCity } });
                        document.querySelector('input[name="city"]').value = selectedCity;
                        closeCitiesList1();
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
                                <label htmlFor="deliveryCity">مدينة عمل المندوب : <span className="star-requered">*</span></label>
                                  
                                        <input list='mCities'
                                            type="text"
                                            className='my-input my-2 form-control'
                                            name='deliveryCity'
                                            onChange={(e) => {
                                              getUserData(e);
                                              const selectedCity = cities.find(city => city.name_ar === e.target.value);
                                              if (selectedCity) {
                                                  setCityId(selectedCity.city_id);
                                                  setIsDistrict(true)
                                              }
                                          }}
                                        />
                                        <datalist id='mCities'>
                                          {cities && cities.map((city,ciIndex)=>(
                                              <option key={ciIndex} value={city.name_ar} />
                                          ))}
                                        </datalist>
                                
                                {errorList.map((err, index) => {
                                    if (err.context.label === 'deliveryCity') {
                                        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
                                    }

                                })}
    </div>
    {/* <div className="col-md-6">
                                <label htmlFor="deliveryDistricts">مناطق المندوب : <span className="star-requered">*</span></label>
                                <div className="row">
                                {theUser.deliveryDistricts.map((deliveryDistricts, index) => (
                                  
                                    <div key={index} className="mb-2 col-11">
                                        <input list='myCities'
                                            type="text"
                                            className='my-input my-2 form-control'
                                            name='deliveryDistricts'
                                            id={`deliveryDistricts-${index}`}
                                            value={deliveryDistricts}
                                            data-index={index}
                                            onChange={getUserData}
                                        />
                                        <datalist id='myCities'>
                                        {districts && districts.filter((district)=> district.city_id == cityId).map((district,ciIndex)=>(
                                              <option key={ciIndex} value={district.name_ar} />
                                          ))}
                                        </datalist>
                                    </div>
                                ))}
                                <div className="col-1 p-0">
                                <button type="button" className="btn btn-success mt-2" onClick={addAreaInput}> + </button>
                                </div>
                                </div>
                                {errorList.map((err, index) => {
                                    if (err.context.label === 'deliveryDistricts') {
                                        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
                                    }

                                })}
    </div> */}
<div className="col-md-6">
    <label htmlFor="deliveryDistricts">مناطق المندوب <span className='text-danger'>(اختر مدينة العمل أولاً)</span>: <span className="star-requered">*</span></label>
    
    <div className="row">
        {theUser.deliveryDistricts.length === 1 && theUser.deliveryDistricts[0] === "جميع المناطق" && isDistrict === true ? (
            <div className="mb-2 col-11">
                <input
                    type="text"
                    className='my-input my-2 form-control'
                    name='deliveryDistricts'
                    value="جميع المناطق"
                    readOnly
                />
            </div>
        ) : (
            theUser.deliveryDistricts.map((deliveryDistricts, index) => (
                <div key={index} className="mb-2 col-11">
                    <input list={`myCities-${index}`}
                        type="text"
                        className='my-input my-2 form-control'
                        name='deliveryDistricts'
                        id={`deliveryDistricts-${index}`}
                        value={deliveryDistricts}
                        data-index={index}
                        onChange={getUserData}
                    />
                    <datalist id={`myCities-${index}`}>
                        <option value="جميع المناطق" />
                        {districts && districts.filter((district) => district.city_id === cityId).map((district, ciIndex) => (
                            <option key={ciIndex} value={district.name_ar} />
                        ))}
                    </datalist>
                </div>
            ))
        )}
        {!theUser.deliveryDistricts.includes("جميع المناطق") && (
            <div className="col-1 p-0">
                <button type="button" className="btn btn-success mt-2" onClick={addAreaInput}>+</button>
            </div>
        )}
    </div>
    {errorList.map((err, index) => {
        if (err.context.label === 'deliveryDistricts') {
            return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
        }
    })}
</div>


     {/* <div className="col-md-6 ul-box">
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
    onClick={() => openCitiesList(index)} // Add onClick event handler
/>
        {showCitiesList[index] && (
            <div>
                <ul className='ul-cities' ref={citiesListRef.current[index]}>
                    {cities &&
                        cities
                            .filter((item) => {
                                const lowercasedItem = item.name_ar;
                                const lowercasedSearchValue = (searchCities[index] || '').toLowerCase();
                                return lowercasedItem.includes(lowercasedSearchValue);
                            })
                            .map((item, cityIndex) => (
                                <li
                                    key={cityIndex}
                                    name='city'
                                    onClick={(e) => {
                                        const selectedCity = e.target.innerText;
                                        const updatedAreas = [...theUser.area];
                                        updatedAreas[index] = selectedCity;
                                        setUser({ ...theUser, area: updatedAreas });
                                        closeCitiesList(index);
                                    }}
                                >
                                    {item.name_ar}
                                </li>
                            ))}
                </ul>
                <div onClick={() => closeCitiesList(index)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} />
            </div>
        )}
   
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
    </div> */}
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
