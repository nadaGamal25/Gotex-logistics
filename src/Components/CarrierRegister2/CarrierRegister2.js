import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import {  createRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'

export default function CarrierRegister2() {
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
    // const deliveryDistrictsToSend = theUser.deliveryDistricts.includes("جميع المناطق") ? hiddenDeliveryDistricts : hiddenDeliveryDistricts;
    // formData.append('deliveryDistricts', JSON.stringify(deliveryDistrictsToSend));
const deliveryDistrictsToSend = theUser.deliveryDistricts.includes("جميع المناطق") ? hiddenDeliveryDistricts : hiddenDeliveryDistricts;
  
    deliveryDistrictsToSend.forEach((deliveryDistrict, index) => {
      formData.append(`deliveryDistricts[${index}]`, deliveryDistrict);})

    if (selectedFile) {
      formData.append('papers', selectedFile, selectedFile.name);
    }
  
    if (selectedPhoto) {
      formData.append('photo', selectedPhoto, selectedPhoto.name);
    }
  
    try {
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });
      const response = await axios.post(
        `https://dashboard.go-tex.net/logistics/carrier/register?role=${carrierRole}`,
        formData,
        {
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
      }
    } catch (error) {
      setisLoading(true);
      console.log(error);
      window.alert(
        error.response?.data?.msg ||
          error.response?.data?.msg?.name ||
          error.response?.data?.errors[0]?.msg ||
          'error'
      );
    }
  }
  

  

  const [isFormValid, setIsFormValid] = useState(true);

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

  
  
function getUserData(e) {
    const { name, value } = e.target;
    if (name === 'deliveryDistricts') {
      if (value === "جميع المناطق") {
        const allDistricts = districts.map(district => district.district_id);
        setUser({ ...theUser, deliveryDistricts: [value] });
        setHiddenDeliveryDistricts(allDistricts);
      } else {
        const index = parseInt(e.target.dataset.index);
        const updatedAreas = [...theUser.deliveryDistricts];
        updatedAreas[index] = value;

        const selectedDistrict = districts.find(district => district.name_ar === value);
        if (selectedDistrict) {
          const updatedHiddenAreas = [...hiddenDeliveryDistricts];
          updatedHiddenAreas[index] = selectedDistrict.district_id;
          setHiddenDeliveryDistricts(updatedHiddenAreas);
        }

        setUser({ ...theUser, deliveryDistricts: updatedAreas });
      }
    } else {
      setUser({ ...theUser, [name]: value });
    }
    console.log(theUser);
    console.log(hiddenDeliveryDistricts)
  }
// function getUserData(e) {
//     const { name, value } = e.target;
//     if (name === 'deliveryDistricts') {
//       if (value === 'جميع المناطق') {
//         const allDistricts = districts.map((district) => district.district_id);
//         setUser({ ...theUser, deliveryDistricts: [value] });
//         setHiddenDeliveryDistricts(allDistricts);
//       } else {
//         const index = parseInt(e.target.dataset.index);
//         const updatedAreas = [...theUser.deliveryDistricts];
//         updatedAreas[index] = value;
  
//         const selectedDistrict = districts.find(
//           (district) => district.name_ar === value
//         );
//         if (selectedDistrict) {
//           const updatedHiddenAreas = [...hiddenDeliveryDistricts];
//           updatedHiddenAreas[index] = selectedDistrict.district_id;
//           setHiddenDeliveryDistricts(updatedHiddenAreas);
//         }
  
//         setUser({ ...theUser, deliveryDistricts: updatedAreas });
//       }
//     } else {
//       setUser({ ...theUser, [name]: value });
//     }
//     console.log(theUser);
//   }
function addAreaInput() {
  const updatedAreas = [...theUser.deliveryDistricts, ''];
  setUser({ ...theUser, deliveryDistricts: updatedAreas });
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
        deliveryCity:Joi.required(),
        deliveryDistricts: Joi.array().min(0)     
        // :Joi.allow(null, ''),
    });

    return scheme.validate(theUser, {abortEarly:false});
  }



  const [cities,setCities]=useState()
    async function getCities() {
      try {
        const response = await axios.get('https://dashboard.go-tex.net/logistics/cities',
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
    async function getDistricts(districtid) {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/logistics/districts/${districtid}`,
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
    //   getDistricts()
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

  const [searchCarrierCity, setSearchCarrierCity] = useState('');
  const [showCarrierCityList, setCarrierCityList] = useState(false);
  const openCarrierCityList = () => {
    setCarrierCityList(true);
  };

  const closeCarrierCityList = () => {
    setCarrierCityList(false);
  };

  const CarrierCityListRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        CarrierCityListRef.current &&
        !CarrierCityListRef.current.contains(e.target) &&
        e.target.getAttribute('name') !== 'deliveryCity'
      ) {
        closeCarrierCityList();
      }
    };

    if (showCarrierCityList) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [showCarrierCityList]);
  return (
    <>
    <div className='py-5 px-4' id='content'>
    <div className="register-box m-auto p-4">
    
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
   
    <label htmlFor="">  الموقع( المدينة)<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='city'
                onChange={(e)=>{ 
                  openCitiesList1()
                  const searchValue = e.target.value;
                  setSearch1(searchValue);
                  getUserData(e)
                  
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
    <div className="col-md-6 ul-box">
   
    <label htmlFor="deliveryCity">مدينة عمل المندوب : <span className="star-requered">*</span></label>
    <input type="text" className="form-control" name='deliveryCity'
               onChange={(e)=>{ 
                 openCarrierCityList()
                 const searchValue = e.target.value;
                 setSearchCarrierCity(searchValue);
                 getUserData(e)
                 
                 }}
                 onFocus={openCarrierCityList}
                 onClick={openCarrierCityList}
                 />
                 {showCarrierCityList && (
                   <ul  className='ul-cities' ref={CarrierCityListRef}>  
                   {cities && cities.filter((item)=>{
                   return searchCarrierCity === ''? item : item.name_ar.includes(searchCarrierCity);
                   }).map((item,index) =>{
                    return(
                     <li key={index} name='deliveryCity' 
                     onClick={(e)=>{ 
                       const selectedCity = e.target.innerText;
                       getUserData({ target: { name: 'deliveryCity', value: selectedCity } });
                       setCityId(item.city_id);
                      setIsDistrict(true)
                      getDistricts(item.city_id)
                       document.querySelector('input[name="deliveryCity"]').value = selectedCity;
                       closeCarrierCityList();
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
     if(err.context.label ==='deliveryCity'){
       return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
     }
     
   })}
   </div>
    {/* <div className="col-md-6">
                                <label htmlFor="deliveryCity">مدينة عمل المندوب : <span className="star-requered">*</span></label>
                                  
                                        <input list='mCities'
                                            type="text"
                                            className='my-input my-2 form-control'
                                            name='deliveryCity'
                                            onChange={(e) => {
                                                getUserData(e)
                                              const selectedCity = cities.find(city => city.name_ar === e.target.value);
                                              if (selectedCity) {
                                                  setCityId(selectedCity.city_id);
                                                  setIsDistrict(true)
                                                  getDistricts(selectedCity.city_id)
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
            <div>
            {theUser.deliveryDistricts.map((deliveryDistrict, index) => (
              <div key={index} className="mb-2 col-11">
                <input 
                  list={`myCities-${index}`}
                  type="text"
                  className='my-input my-2 form-control'
                  name='deliveryDistricts'
                  id={`deliveryDistricts-${index}`}
                  value={deliveryDistrict}
                  data-index={index}
                  onChange={getUserData}
                />
                <datalist id={`myCities-${index}`}>
                  <option value="جميع المناطق" />
                  {districts && districts.map((district, ciIndex) => (
                    <option key={ciIndex} value={district.name_ar} data-id={district.district_id} />
                  ))}
                </datalist>
              </div>
            ))}
          </div>
       
           
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

 // function getUserData(e) {       -------------work
//     const { name, value } = e.target;
//     if (name === 'deliveryDistricts') {
//         if (value === "جميع المناطق") {
//             const allDistricts = districts.map(district => district.district_id);
//             setUser({ ...theUser, deliveryDistricts: [value] });
//             setHiddenDeliveryDistricts(allDistricts);
//         } else {
//             const index = parseInt(e.target.dataset.index);
//             const updatedAreas = [...theUser.deliveryDistricts];
//             updatedAreas[index] = value;
//             setUser({ ...theUser, deliveryDistricts: updatedAreas });

//             // Check for matching district name and update with district_id
//             const list = e.target.getAttribute('list');
//             const options = document.getElementById(list).childNodes;
//             for (let i = 0; i < options.length; i++) {
//                 if (options[i].value === value) {
//                     const districtId = options[i].getAttribute('data-id');
//                     updatedAreas[index] = districtId;
//                     setUser({ ...theUser, deliveryDistricts: updatedAreas });
//                     break;
//                 }
//             }
//         }
//     } else {
//         setUser({ ...theUser, [name]: value });
//     }
//     console.log(theUser);
// }


 //     <div>   work
        //     {theUser.deliveryDistricts.map((deliveryDistrict, index) => (
        //         <div key={index} className="mb-2 col-11">
        //             <input 
        //                 list={`myCities-${index}`}
        //                 type="text"
        //                 className='my-input my-2 form-control'
        //                 name='deliveryDistricts'
        //                 id={`deliveryDistricts-${index}`}
        //                 value={deliveryDistrict}
        //                 data-index={index}
        //                 onChange={getUserData}
        //             />
        //             <datalist id={`myCities-${index}`}>
        //                 <option value="جميع المناطق" />
        //                 {districts && districts.map((district, ciIndex) => (
        //                     <option key={ciIndex} value={district.name_ar} data-id={district.district_id} />
        //                 ))}
        //             </datalist>
        //         </div>
        //          ))}
        // </div>