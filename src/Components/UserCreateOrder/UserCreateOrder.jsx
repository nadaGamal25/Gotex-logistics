import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi, { string } from 'joi';
import { Link } from 'react-router-dom';

export default function UserCreateOrder2() {
    const [phoneValue, setPhoneValue] = useState()
    const [phone2, setPhone2] = useState()
    const [cityIdSender, setCityIdSender] = useState(null)
    const [cityIdReciever, setCityIdReciever] = useState(null)
    const [districtIdSender, setDistrictIdSender] = useState('')
    const [districtIdReciever, setDistrictIdReciever] = useState('')
    const [districtsLoading, setDistrictsLoading] = useState(true);
    const [districtsLoading2, setDistrictsLoading2] = useState(true);
  
    const [errorList, seterrorList] = useState([]);
  
    const [orderData, setOrderData] = useState({
      recivername: "",
      reciveraddress: "",
      recivercity: "",
      reciverdistrict:"",
      reciverphone: "",
      sendername: "",
      senderaddress: "",
      sendercity: "",
      senderdistrict:"",
      senderphone: "",
      paytype: "",
      price: "",
      weight: "",
      pieces: "",
      description: "",
      senderdistrictId:"",
      reciverdistrictId:""
    })
    const [error, setError] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [shipments, setShipments] = useState([])
  
    async function sendOrderDataToApi() {
      console.log(localStorage.getItem('userToken'))
      try {
        const response = await axios.post(
          "https://dashboard.go-tex.net/logistics-test/order/create-order",
          orderData,
          // {...orderData, shipmentValue: orderData.shipmentValue - orderData.cod},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        );
  
        if (response.status === 200) {
          console.log(orderData.shipmentValue)
          setisLoading(false);
          window.alert("تم تسجيل الشحنة بنجاح");
          console.log(response.data.data);
          console.log(response)
          const shipment = response.data.data;
          setShipments(prevShipments => [...prevShipments, shipment]);
          console.log(shipments)
        } else if (response.status === 400) {
          setisLoading(false);
          const errorMessage = response.data.msg || "An error occurred.";
          window.alert(`${errorMessage}`);
          console.log(response.data);
        }
      } catch (error) {
        // Handle error
        console.error(error);
        setisLoading(false);
        const errorMessage = error.response.data?.error?.msg || error.response.data?.msg || "An error occurred.";
        window.alert(`${errorMessage}`);
      }
    }
    function submitOrderUserForm(e) {
      e.preventDefault();
      setisLoading(true)
      let validation = validateOrderUserForm();
      console.log(validation);
      if (validation.error) {
        setisLoading(false)
        seterrorList(validation.error.details)
  
      } else {
        sendOrderDataToApi();
      }
    }
  
  
  
  
  
  
    function getOrderData(e) {
      let myOrderData;
      myOrderData = { ...orderData };
  
  
      if (e.target.type === "number") { // Check if the value is a number
        myOrderData[e.target.name] = Number(e.target.value);
      } else if (e.target.value === "true" || e.target.value === "false") {
        myOrderData[e.target.name] = e.target.value === "true";
      } else {
        myOrderData[e.target.name] = e.target.value;
      }
  
      setOrderData(myOrderData);
      console.log(myOrderData);
    }
  
  
    function validateOrderUserForm() {
      let scheme = Joi.object({
        recivername: Joi.string().required(),
        recivercity: Joi.string().required(),
        reciverphone: Joi.string().required(),
        reciveraddress: Joi.string().required(),
        weight: Joi.number().required(),
        pieces: Joi.number().required(),
        sendername: Joi.string().required(),
        sendercity: Joi.string().required(),
        senderaddress: Joi.string().required(),
        senderphone: Joi.string().required(),
        description: Joi.string().required(),
        paytype: Joi.string().required(),
        price: Joi.number().required(),
        senderdistrict: Joi.required(),
        reciverdistrict: Joi.required(),
        senderdistrictId:Joi.required(),
        reciverdistrictId:Joi.required(),
  
      });
      return scheme.validate(orderData, { abortEarly: false });
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
        // getDistricts()
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
    const [showCitiesList2, setCitiesList2] = useState(false);
    const openCitiesList2 = () => {
      setCitiesList2(true);
    };
  
    const closeCitiesList2 = () => {
      setCitiesList2(false);
    };
  
  
  
    async function getSticker(orderId) {
      try {
        const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/order/getorder/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        console.log(response)
        const stickerUrl = `${response.data.url.replace('upload', 'https://dashboard.go-tex.net/logistics-test/upload')}`;
        const newTab = window.open();
        newTab.location.href = stickerUrl;
      } catch (error) {
        console.error(error);
      }
    }
  
    const citiesListRef = useRef(null);
  
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (
          citiesListRef.current &&
          !citiesListRef.current.contains(e.target) &&
          e.target.getAttribute('name') !== 'sendercity'
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
  
    const citiesListRef2 = useRef(null);
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (
          citiesListRef2.current &&
          !citiesListRef2.current.contains(e.target) &&
          e.target.getAttribute('name') !== 'recivercity'
        ) {
          closeCitiesList2();
        }
      };
  
      if (showCitiesList2) {
        window.addEventListener('click', handleOutsideClick);
      }
      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }, [showCitiesList2]);
  
    const [districts,setDistricts]=useState([])
    async function getDistricts(districtid) {
      setDistrictsLoading(true);
      try {
        const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/districts/${districtid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setDistricts([...response.data.districts])
        // setDistricts(response.data.districts)
        console.log(response)
      } catch (error) {
        console.error(error);
      }finally {
        setDistrictsLoading(false);
      }
    }
    const [districts2,setDistricts2]=useState([])
      async function getDistricts2(districtid) {
        setDistrictsLoading2(true);
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/logistics-test/districts/${districtid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          });
          setDistricts2([...response.data.districts])
          // setDistricts2(response.data.districts)
          console.log(response)
        } catch (error) {
          console.error(error);
        }finally {
          setDistrictsLoading2(false);
        }
      }
      const [searchDistricts, setSearchDistricts] = useState('')
    const [searchDistricts2, setSearchDistricts2] = useState('')
  
    const [showDistrictsList, setDistrictsList] = useState(false);
    const openDistrictsList = () => {
      setDistrictsList(true);
    };
  
    const closeDistrictsList = () => {
      setDistrictsList(false);
    };
    const [showDistrictsList2, setDistrictsList2] = useState(false);
    const openDistrictsList2 = () => {
      setDistrictsList2(true);
    };
  
    const closeDistrictsList2 = () => {
      setDistrictsList2(false);
    };
  
    const districtsListRef = useRef(null);
  
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (
          districtsListRef.current &&
          !districtsListRef.current.contains(e.target) &&
          e.target.getAttribute('name') !== 'senderdistrict'
        ) {
          closeDistrictsList();
        }
      };
  
      if (showDistrictsList) {
        window.addEventListener('click', handleOutsideClick);
      }
  
      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }, [showDistrictsList]);
  
    const districtsListRef2 = useRef(null);
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (
          districtsListRef2.current &&
          !districtsListRef2.current.contains(e.target) &&
          e.target.getAttribute('name') !== 'reciverdistrict'
        ) {
          closeDistrictsList2();
        }
      };
  
      if (showDistrictsList2) {
        window.addEventListener('click', handleOutsideClick);
      }
      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }, [showDistrictsList2]);
  
    return (
      <div className='px-4 pt-2 pb-4' id='content'>
  
        <div className="shipmenForm mt-3">
  
          <form onSubmit={submitOrderUserForm} className='' action="">
            <div className="row">
              <div className="col-md-6">
                <div className="shipper-details brdr-grey p-3">
                  <h3>تفاصيل المرسل</h3>
                  {/* <p>{cities[0].name}</p> */}
                  <div className='pb-3'>
                    <label htmlFor=""> الاسم<span className="star-requered">*</span></label>
                    <input type="text" className="form-control" name='sendername' onChange={(e) => {
                      getOrderData(e);
                    }} />
                    {errorList.map((err, index) => {
                      if (err.context.label === 'sendername') {
                        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
                      }
  
                    })}
                  </div>
                 
  
                  <div className='pb-3'>
                    <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
                    {/* <input type="text" className="form-control" /> */}
                    <PhoneInput name='senderphone'
                      labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phoneValue}
                      onChange={(phoneValue) => {
                        setPhoneValue(phoneValue);
                        getOrderData({ target: { name: 'senderphone', value: phoneValue } });
                      }} />
                    {errorList.map((err, index) => {
                      if (err.context.label === 'senderphone') {
                        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
                      }
  
                    })}
  
                  </div>
                  <div className='pb-3 ul-box'>
              <label htmlFor="">  الموقع( المدينة)<span className="star-requered">*</span></label>
                  <input type="text" className="form-control" name='sendercity'
                  onChange={(e)=>{ 
                    openCitiesList()
                    const searchValue = e.target.value;
                    setSearch(searchValue);
                    getOrderData(e)
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
                        <li key={index} name='sendercity' 
                        onClick={(e)=>{ 
                          const selectedCity = e.target.innerText;
                          setCityIdSender(item.city_id)
                          getDistricts(item.city_id)
                          // setItemCity(selectedCity)
                          getOrderData({ target: { name: 'sendercity', value: selectedCity } });
                          document.querySelector('input[name="sendercity"]').value = selectedCity;
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
        if(err.context.label ==='sendercity'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
        }
        
      })}
              </div>
              <div className='pb-3 ul-box'>
              <label htmlFor="">المنطقة<span className='text-danger'>(اختر المدينة أولاً)</span>: <span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='senderdistrict' disabled={districtsLoading}
                  onChange={(e)=>{ 
                    openDistrictsList()
                    const searchValue = e.target.value;
                    setSearchDistricts(searchValue);
                    getOrderData(e)
                    
                    }}
                    onFocus={openDistrictsList}
                    onClick={openDistrictsList}
                    />
                    {showDistrictsList && (
                      <ul  className='ul-cities' ref={districtsListRef}>  
                      {districts && districts.filter((item)=>{
                      return searchDistricts === ''? item : item.name_ar.includes(searchDistricts);
                      }).map((item,index) =>{
                       return(
                        <li key={index} name='senderdistrict' 
                        onClick={(e)=>{ 
                          const selected = e.target.innerText;
                          getOrderData({ target: { name: 'senderdistrict', value: selected } });
                          setOrderData(prevOrderData => ({
                              ...prevOrderData,
                              senderdistrictId: Number(item.district_id)
                            }));                                           

                          document.querySelector('input[name="senderdistrict"]').value = selected;
                          closeDistrictsList();
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
        if(err.context.label ==='senderdistrict'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
        }
        
      })}
              </div>
              {/* <div className="pb-3">
                                  <label htmlFor="senderdistrict">المنطقة : <span className="star-requered">*</span></label>
                                    
                                          <input list='s-district'
                                              type="text"
                                              className='my-input my-2 form-control'
                                              name='senderdistrict'
                                              onChange={(e) => {
                                                // getOrderData(e)
                                              const selected = districts.find(district => district.name_ar === e.target.value);
                                              if (selected) {
                                                // getOrderData({target:{name:'senderdistrictId',value:String(selected.district_id)}})
                                                getOrderData({target:{name:'senderdistrict',value:selected.name_ar}})
                                                // setDistrictIdSender(String(selected.district_id))
                                                setOrderData(prevOrderData => ({
                                                  ...prevOrderData,
                                                  senderdistrictId: String(selected.district_id)
                                                }));                                           
  
                                              }else{
                                                getOrderData(e)
                                              }
                                          }}                                        />
                                          <datalist id='s-district'>
                                            {districts && districts.map((district,ciIndex)=>(
                                                <option key={ciIndex} value={district.name_ar} />
                                            ))}
                                          </datalist>
                                  
                                  {errorList.map((err, index) => {
                                      if (err.context.label === 'senderdistrict') {
                                          return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
                                      }
  
                                  })}
      </div> */}
                 
                  <div className='pb-3'>
                    <label htmlFor=""> العنوان <span className="star-requered">*</span></label>
                    <input type="text" className="form-control" name='senderaddress' onChange={(e) => {
                      getOrderData(e);
                    }} />
                    {errorList.map((err, index) => {
                      if (err.context.label === 'senderaddress') {
                        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
                      }
  
                    })}
                  </div>
  
  
  
  
                </div>
                <div className="package-info brdr-grey p-3 my-3 ">
                  <h3>بيانات الشحنة</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className='pb-3'>
                        <label htmlFor=""> الوزن<span className="star-requered">*</span></label>
                        <input
                          // type="number" step="0.001" 
                          className="form-control" name='weight' onChange={(e) => {
                            getOrderData({ target: { name: 'weight', value: Number(e.target.value) } });
                          }} />
                        {errorList.map((err, index) => {
                          if (err.context.label === 'weight') {
                            return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
                          }
  
                        })}
                      </div>
                    </div>
  
                    <div className="col-md-6">
                      <div className='pb-3'>
                        <label htmlFor=""> عدد القطع<span className="star-requered">*</span></label>
                        <input
                          //  type="number" 
                          className="form-control" name='pieces' onChange={(e) => {
                            getOrderData({ target: { name: 'pieces', value: Number(e.target.value) } });
                          }} />
                        {errorList.map((err, index) => {
                          if (err.context.label === 'pieces') {
                            return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
                          }
  
                        })}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className='pb-3'>
                        <label htmlFor=""> السعر <span className="star-requered">*</span></label>
                        <input
                          //  type="number" 
                          className="form-control" name='price' onChange={(e) => {
                            getOrderData({ target: { name: 'price', value: Number(e.target.value) } });
                          }} />
                        {errorList.map((err, index) => {
                          if (err.context.label === 'price') {
                            return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
                          }
  
                        })}
                      </div>
                    </div>
  
                    <div className="pb-3">
                      <label htmlFor="" className='d-block'>طريقة الدفع:<span className="star-requered">*</span></label>
                      <div className='pe-2'>
                        <input type="radio" value={'cod'} name='paytype' onChange={getOrderData} />
                        <label className='label-cod' htmlFor="cod"  >الدفع عند الاستلام(COD)</label>
                      </div>
                      <div className='pe-2'>
                        <input type="radio" value={'cc'} name='paytype' onChange={getOrderData} />
                        <label className='label-cod' htmlFor="">الدفع اونلاين </label>
                      </div>
                      {errorList.map((err, index) => {
                        if (err.context.label === 'paytype') {
                          return <div key={index} className="alert alert-danger my-2">يجب اختيار طريقة الدفع </div>
                        }
  
                      })}
                    </div>
  
                    <div className='pb-3'>
                      <label htmlFor=""> الوصف <span className="star-requered">*</span></label>
                      <textarea className="form-control" name='description' onChange={getOrderData} cols="30" rows="2"></textarea>
                      {errorList.map((err, index) => {
                        if (err.context.label === 'description') {
                          return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
                        }
  
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="reciever-details brdr-grey p-3">
                  <h3>تفاصيل المستلم</h3>
  
                  <div className='pb-3'>
                    <label htmlFor=""> الاسم<span className="star-requered">*</span></label>
                    <input type="text" className="form-control" name='recivername' onChange={(e) => {
                      getOrderData(e)
                    }} />
                    {errorList.map((err, index) => {
                      if (err.context.label === 'recivername') {
                        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
                      }
  
                    })}
                  </div>
                 
                  <div className='pb-3'>
                    <label htmlFor=""> رقم الهاتف<span className="star-requered">*</span></label>
                    {/* <input type="text" className="form-control"/> */}
                    <PhoneInput name='reciverphone'
                      labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
                      onChange={(phone2) => {
                        setPhone2(phone2);
                        getOrderData({ target: { name: 'reciverphone', value: phone2 } });
                      }} />
                    {errorList.map((err, index) => {
                      if (err.context.label === 'reciverphone') {
                        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
                      }
  
                    })}
  
                  </div>
                  <div className='pb-3 ul-box'>
                  <label htmlFor="">  الموقع( المدينة)<span className="star-requered">*</span></label>
                  <input type="text" className="form-control" name='recivercity'
                  onChange={(e)=>{ 
                    const searchValue = e.target.value;
                    setSearch2(searchValue);
                    getOrderData(e)
                    openCitiesList2()
                    
                    // const matchingCities = cities.filter((item) => {
                    //   return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
                    // });
                
                    // if (matchingCities.length === 0) {
                    //   closeCitiesList2();
                    // } else {
                    //   openCitiesList2();
                    // }
                    }}
                    onClick={openCitiesList2}
                    />
                    {showCitiesList2 && (
                      <ul  className='ul-cities' ref={citiesListRef2}>
                      {cities && cities.filter((item)=>{
                      return search2 === ''? item : item.name_ar.includes(search2);
                      }).map((item,index) =>{
                       return(
                        <li key={index} name='recivercity' 
                        onClick={(e)=>{ 
                          setCityIdReciever(item.city_id)
                          getDistricts2(item.city_id)
                          const selectedCity = e.target.innerText;
                          getOrderData({ target: { name: 'recivercity', value: selectedCity } });
                          document.querySelector('input[name="recivercity"]').value = selectedCity;
                          closeCitiesList2();
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
        if(err.context.label ==='recivercity'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
        }
        
      })}
              </div>
              <div className='pb-3 ul-box'>
              <label htmlFor="">المنطقة<span className='text-danger'>(اختر المدينة أولاً)</span>: <span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='reciverdistrict' disabled={districtsLoading2}
                  onChange={(e)=>{ 
                    openDistrictsList2()
                    const searchValue = e.target.value;
                    setSearchDistricts2(searchValue);
                    getOrderData(e)
                    
                    }}
                    onFocus={openDistrictsList2}
                    onClick={openDistrictsList2}
                    />
                    {showDistrictsList2 && (
                      <ul  className='ul-cities' ref={districtsListRef2}>  
                      {districts2 && districts2.filter((item)=>{
                      return searchDistricts2 === ''? item : item.name_ar.includes(searchDistricts2);
                      }).map((item,index) =>{
                       return(
                        <li key={index} name='reciverdistrict' 
                        onClick={(e)=>{ 
                          const selected = e.target.innerText;
                          getOrderData({ target: { name: 'reciverdistrict', value: selected } });
                          setOrderData(prevOrderData => ({
                              ...prevOrderData,
                              reciverdistrictId: Number(item.district_id)
                            })); 
                          
                          document.querySelector('input[name="reciverdistrict"]').value = selected;
                          closeDistrictsList2();
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
        if(err.context.label ==='reciverdistrict'){
          return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
        }
        
      })}
              </div>
              {/* <div className="pb-3">
                                  <label htmlFor="reciverdistrict">المنطقة : <span className="star-requered">*</span></label>
                                    
                                          <input list='r-district'
                                              type="text"
                                              className='my-input my-2 form-control'
                                              name='reciverdistrict'
                                              onChange={(e) => {
                                                // getOrderData(e)
                                              const selected = districts2.find(district => district.name_ar === e.target.value);
                                              if (selected) {
                                                  // getOrderData({target:{name:'reciverdistrictId',value:String(selected.district_id)}})
                                                  getOrderData({target:{name:'reciverdistrict',value:selected.name_ar}})
                                                  // setDistrictIdReciever(String(selected.district_id))
                                                  setOrderData(prevOrderData => ({
                                                    ...prevOrderData,
                                                    reciverdistrictId: String(selected.district_id)
                                                  }));
  
                                              }else{
                                                getOrderData(e)
                                              }
                                          }}                                         />
                                          <datalist id='r-district'>
                                            {districts2 && districts2.map((district,ciIndex)=>(
                                                <option key={ciIndex} value={district.name_ar} />
                                            ))}
                                          </datalist>
                                  
                                  {errorList.map((err, index) => {
                                      if (err.context.label === 'reciverdistrict') {
                                          return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
                                      }
  
                                  })}
      </div>
   */}
                  
                  <div className='pb-3'>
                    <label htmlFor=""> العنوان<span className="star-requered">*</span></label>
                    <input type="text" className="form-control" name='reciveraddress' onChange={(e) => {
                      getOrderData(e)
                    }} />
                    {errorList.map((err, index) => {
                      if (err.context.label === 'reciveraddress') {
                        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
                      }
  
                    })}
                  </div>
  
  
  
                  <button className="btn btn-orange" disabled={isLoading}>
                    {isLoading == true ? <i class="fa-solid fa-spinner fa-spin"></i> : 'إضافة شحنة'}
  
                  </button>
                  {/* <button className="btn btn-orange"> <i className='fa-solid fa-plus'></i> إضافة مستلم</button> */}
                </div>
              </div>
            </div>
          </form>
  
        </div>
        <div className="my-table p-4 mt-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"> billcode</th>
                <th scope="col">رقم الشحنة</th>
                <th scope="col">طريقة الدفع</th>
                <th scope="col">السعر </th>
                <th scope="col">الوزن</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(shipments) && shipments.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.billcode}</td>
                    <td>{item.ordernumber}</td>
                    <td>{item.paytype}</td>
                    <td>{item.price}</td>
                    <td>{item.weight}</td>
                    <td><button className="btn btn-success" onClick={() => { getSticker(item._id) }}>عرض الاستيكر</button></td>
  
                  </tr>
                );
              })}
            </tbody>
  
  
          </table>
        </div>
  
      </div>)
  }
  
