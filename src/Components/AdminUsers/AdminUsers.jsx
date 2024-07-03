import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';

export default function AdminUsers() {
  useEffect(()=>{
    getUsersListsAdmin()
    getUsersCarriersAdmin()
    getUsersStorekeepersAdmin()
    getUsersTrackerAdmin()
  },[])
  const [usersListAdmin,setUsersListsAdmin]=useState([])
  const [carriersListAdmin, setCarriersListsAdmin] = useState([]);
  const [storekeepersListAdmin, setStorekeepersListsAdmin] = useState([]);
  const [trackerListAdmin, setTrackerListsAdmin] = useState([]);

  async function getUsersListsAdmin() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/user',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const usersList = response.data.data;
      console.log(usersList)
      setUsersListsAdmin(usersList)
    } catch (error) {
      console.error(error);
    }
  }
  async function getUsersCarriersAdmin() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/carrier/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const List = response.data.data;
      console.log(List)
      setCarriersListsAdmin(List)
    } catch (error) {
      console.error(error);
    }
  }
  async function getUsersStorekeepersAdmin() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/store-keeper',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const List = response.data.data;
      console.log(List)
      setStorekeepersListsAdmin(List)
    } catch (error) {
      console.error(error);
    }
  }
  async function getUsersTrackerAdmin() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/logistics-test/tracker/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const List = response.data.data;
      console.log(List)
      setTrackerListsAdmin(List)
    } catch (error) {
      console.error(error);
    }
  }
 
  const combinedList = [...usersListAdmin, ...carriersListAdmin, ...storekeepersListAdmin, ...trackerListAdmin];

  async function userResendEmail(userId){
    try{
    const response= await axios.post(`https://dashboard.go-tex.net/logistics-test/user/resend-verify-email/${userId}`,{},
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
    }
      );
    if(response.status == 200){
      console.log(response)
      window.alert("تم ارسال الايميل بنجاح")  
    }
    else{
      window.alert(response.data.msg.name)
    }
  
  }catch(error){
      console.log(error.response)
      window.alert(error.response.data.msg.name || error.response.data.msg || "error")
  }
}
async function carrierResendEmail(userId){
  try{
  const response= await axios.post(`https://dashboard.go-tex.net/logistics-test/carrier/resend-verify-email/${userId}`,{},
  {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
  }
    );
  if(response.status == 200){
    console.log(response)
    window.alert("تم ارسال الايميل بنجاح")  
  }
  else{
    window.alert(response.data.msg.name)
  }

}catch(error){
    console.log(error.response)
    window.alert(error.response.data.msg.name || error.response.data.msg || "error")
}
}
async function trackerResendEmail(userId){
  try{
  const response= await axios.post(`https://dashboard.go-tex.net/logistics-test/tracker/resend-verify-email/${userId}`,{},
  {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
  }
    );
  if(response.status == 200){
    console.log(response)
    window.alert("تم ارسال الايميل بنجاح")  
  }
  else{
    window.alert(response.data.msg.name)
  }

}catch(error){
    console.log(error.response)
    window.alert(error.response.data.msg.name || error.response.data.msg || "error")
}
}
const [cities,setCities]=useState()
async function getCities() {
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
//edit user
const [isModalOpenUser, setIsModalOpenUser] = useState(false);
const [editedUser, setEditedUser] = useState(null);
const [eUser, seteUser] = useState(null);
const handleEditClickUser = (user) => {
  seteUser(user);
  setEditedUser(
    {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      mobile: user?.mobile || '',
      nid: user?.nid || '',
      city: user?.city || '',
      address: user?.address || '',
      
  }
  )
  setIsModalOpenUser(true);

  console.log(user)
  console.log(editedUser)
  console.log("yes")
}
const closeModalUser = () => {
  setIsModalOpenUser(false);
  setEditedUser(null)
};
const handleInputChangeUser = (event) => {
  const { name, value } = event.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    })); 
};
const handleEditSubmitUser = async (event) => {
  console.log(editedUser)
  event.preventDefault();
  try {
    const response = await axios.post(
      `https://dashboard.go-tex.net/logistics-test/user/${eUser._id}`,
      {...editedUser},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
    );
    console.log(editedUser)
    console.log(response);

    closeModalUser();
    window.alert("تم تعديل بيانات المستخدم بنجاح")
    getUsersListsAdmin()
    
  } catch (error) {
    console.error(error);
    alert(error.response.data.msg)
  }
} 

//edit Store
const [isModalOpenStore, setIsModalOpenStore] = useState(false);
const [editedStore, setEditedStore] = useState(null);
const [eStore, seteStore] = useState(null);
const handleEditClickStore = (user) => {
  seteStore(user);
  setEditedStore(
    {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      mobile: user?.mobile || '',
      city: user?.city || '',
      address: user?.address || '',
      
  }
  )
  setIsModalOpenStore(true);

  console.log(user)
  console.log(editedStore)
  console.log("yes")
}
const closeModalStore = () => {
  setIsModalOpenStore(false);
  setEditedStore(null)
};
const handleInputChangeStore = (event) => {
  const { name, value } = event.target;
    setEditedStore((prev) => ({
      ...prev,
      [name]: value,
    })); 
};
const handleEditSubmitStore = async (event) => {
  console.log(editedStore)
  event.preventDefault();
  try {
    const response = await axios.post(
      `https://dashboard.go-tex.net/logistics-test/store-keeper/${eStore._id}`,
      {...editedStore},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
    );
    console.log(editedStore)
    console.log(response);

    closeModalStore();
    window.alert("تم تعديل بيانات المستخدم بنجاح")
    getUsersStorekeepersAdmin()
    
  } catch (error) {
    console.error(error);
    alert(error.response.data.msg)
  }
} 
//edit carrier
const [isModalOpenCarrier, setIsModalOpenCarrier] = useState(false);
const [eCarrier, seteCarrier] = useState(null);
  const [editedCarrier, setEditedCarrier] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    city: '',
    address: '',
    nid: '',
    deliveryCity: '',
    deliveryDistricts: [],
  });
  const [cityId, setCityId] = useState(null);
  const [isDistrict, setIsDistrict] = useState(false);
  const [carrierRole,setCarrierRole]=useState('')
  const handleEditClickCarrier = (carrier,carrierR) => {
    seteCarrier(carrier)
    setCarrierRole(carrierR)
    setEditedCarrier({
      ...carrier,
      deliveryDistricts: carrier.deliveryDistricts || [''],
    });
    setIsModalOpenCarrier(true);
  };

  const closeModalCarrier = () => {
    setIsModalOpenCarrier(false);
    setEditedCarrier({
      firstName: '',
      lastName: '',
      mobile: '',
      city: '',
      address: '',
      nid: '',
      deliveryCity: '',
      deliveryDistricts: [],
    });
  };

  const handleInputChangeCarrier = (event) => {
    const { name, value } = event.target;
    setEditedCarrier((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'deliveryCity') {
      const selectedCity = cities.find(city => city.name_ar === value);
      if (selectedCity) {
        setCityId(selectedCity.city_id);
        setIsDistrict(true);
      }
    }
  };

  const handleDistrictChange = (event, index) => {
    const { value } = event.target;
    const updatedDistricts = [...editedCarrier.deliveryDistricts];
    updatedDistricts[index] = value;
    setEditedCarrier((prev) => ({
      ...prev,
      deliveryDistricts: updatedDistricts,
    }));
  };

  const addAreaInput = () => {
    setEditedCarrier((prev) => ({
      ...prev,
      deliveryDistricts: [...prev.deliveryDistricts, ''],
    }));
  };

  const handleEditSubmitCarrier = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://dashboard.go-tex.net/logistics-test/carrier/${eCarrier._id}?role=${carrierRole}`,
        { ...editedCarrier },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      console.log(response);
      closeModalCarrier();
      window.alert("تم تعديل بيانات المندوب بنجاح");
      getUsersCarriersAdmin();
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  };
  return (
    <>
    <div className='p-5' id='content'>
    
    <div className="my-table p-4 ">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> الاسم</th>
            <th scope="col">الهاتف </th>
            <th scope="col">الإيميل </th>
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">مدينة المندوب </th>
            <th scope="col">مناطق المندوب </th>
            <th scope="col"> الهوية </th>
            <th scope="col">صورة الهوية  </th>
            <th scope="col">صورة شخصية</th>
            <th>role</th>
            <th></th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {combinedList && combinedList.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                
                {/* {item._id?<td>{item._id}</td>:<td>_</td>} */}
                {item.firstName? <td>{item.firstName} {item.lastName}</td> :<td>_</td>}
                {item.mobile?<td>{item.mobile}</td>:<td>_</td>}
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.city?<td>{item.city}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                {item.deliveryCity?<td>{item.deliveryCity}</td>:<td>_</td>}
                {item.deliveryDistricts ? (
          <td>
            {item.deliveryDistricts.join(',')}
          </td>
        ) : (
          <td>_</td>
        )}
                {item.nid?<td>{item.nid}</td>:<td>_</td>}
                {item.papers && item.papers[0]?<td>
                  <a href={item.papers[0].replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الملف</a>
                </td>:<td>_</td>}
                {item.photo && item.photo?<td>
                  <a href={item.photo.replace('public', 'https://dashboard.go-tex.net/logistics-test')} target='_blank'>رابط_الصورة</a>
                </td>:<td>_</td>}
                
                {item.role?<td>{item.role}</td>:<td>_</td>}
                {item.role == 'data entry' ?<td>
                  <button className="btn-dataentry btn btn-secondary" onClick={()=>{handleEditClickUser(item)}}>  تعديل البيانات</button>
                </td>
                :item.role == 'collector' || item.role == 'receiver'?<td>
                  <button className="btn-carrier btn btn-secondary" onClick={()=>{handleEditClickCarrier(item,item.role)}}>تعديل   </button>
                </td>
                :item.role == 'storekeeper' ?<td>
                  <button className="btn-dataentry btn btn-secondary" onClick={()=>{handleEditClickStore(item)}}>تعديل البيانات </button>
                </td>:<td></td>}
                {item.role == 'data entry' ?<td>
                  <button className="btn-dataentry btn btn-orange" onClick={()=>{userResendEmail(item._id)}}>إعادة إرسال إيميل </button>
                </td>:item.role == 'collector' || item.role == 'receiver'?<td>
                  <button className="btn-carrier btn btn-orange" onClick={()=>{carrierResendEmail(item._id)}}>إعادة إرسال إيميل </button>
                </td>:item.role == 'tracker' ?<td>
                  <button className="btn-dataentry btn btn-orange" onClick={()=>{trackerResendEmail(item._id)}}>إعادة إرسال إيميل </button>
                </td>:<td></td>}
                
                
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
    </div> 
    {isModalOpenUser && (<Modal show={isModalOpenUser} onHide={closeModalUser} >
        <Modal.Header >
          <Modal.Title>تعديل بيانات المستخدم
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleEditSubmitUser}>
        <div className="row">
                <div className="col-md-6 pb-1">
        <label htmlFor="first_name">الاسم الاول    :</label>
      <input onChange={handleInputChangeUser} value={editedUser.firstName} type="text" className='my-input my-2 form-control' name='firstName' />
      
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> اسم العائلة    :</label>
      <input onChange={handleInputChangeUser} value={editedUser.lastName} type="text" className='my-input my-2 form-control' name='lastName' />
      
    </div>
   
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">الهاتف  </label>
   
      <input onChange={handleInputChangeUser} value={editedUser.mobile} type="text" className='my-input my-2 form-control' name='mobile' />
     
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="first_name">رقم الهوية    :</label>
      <input onChange={handleInputChangeUser} value={editedUser.nid} type="text" className='my-input my-2 form-control' name='nid' />
      
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> المدينة    :</label>
      <input onChange={handleInputChangeUser} value={editedUser.city} type="text" className='my-input my-2 form-control' name='city' />
      
    </div>
   
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">العنوان  </label>
   
      <input onChange={handleInputChangeUser} value={editedUser.address} type="text" className='my-input my-2 form-control' name='address' />
     
      
    </div>
  

    <div className="text-center pt-1">
      <button className='btn btn-primary'>
      تعديل  
      </button>
      </div>
      </div>
      </form>  
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalUser}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal>)} 
      {isModalOpenStore && (<Modal show={isModalOpenStore} onHide={closeModalStore} >
        <Modal.Header >
          <Modal.Title>تعديل بيانات المستخدم
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleEditSubmitStore}>
        <div className="row">
                <div className="col-md-6 pb-1">
        <label htmlFor="first_name">الاسم الاول    :</label>
      <input onChange={handleInputChangeStore} value={editedStore.firstName} type="text" className='my-input my-2 form-control' name='firstName' />
      
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> اسم العائلة    :</label>
      <input onChange={handleInputChangeStore} value={editedStore.lastName} type="text" className='my-input my-2 form-control' name='lastName' />
      
    </div>
   
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">الهاتف  </label>
   
      <input onChange={handleInputChangeStore} value={editedStore.mobile} type="text" className='my-input my-2 form-control' name='mobile' />
     
      
    </div>
  
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> المدينة    :</label>
      <input onChange={handleInputChangeStore} value={editedStore.city} type="text" className='my-input my-2 form-control' name='city' />
      
    </div>
   
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">العنوان  </label>
   
      <input onChange={handleInputChangeStore} value={editedStore.address} type="text" className='my-input my-2 form-control' name='address' />
     
      
    </div>
  

    <div className="text-center pt-1">
      <button className='btn btn-primary'>
      تعديل  
      </button>
      </div>
      </div>
      </form>  
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalUser}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal>)} 

      {isModalOpenCarrier && (
        <Modal show={isModalOpenCarrier} onHide={closeModalCarrier}>
          <Modal.Header>
            <Modal.Title>تعديل بيانات المندوب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmitCarrier}>
              <div className="row">
                <div className="col-md-6 pb-1">
                  <label htmlFor="firstName">الاسم الأول :</label>
                  <input onChange={handleInputChangeCarrier} value={editedCarrier.firstName} type="text" className='my-input my-2 form-control' name='firstName' />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="lastName">اسم العائلة :</label>
                  <input onChange={handleInputChangeCarrier} value={editedCarrier.lastName} type="text" className='my-input my-2 form-control' name='lastName' />
                </div>
                
                <div className="col-md-6 pb-1">
                  <label htmlFor="mobile">رقم الهاتف :</label>
                  <input onChange={handleInputChangeCarrier} value={editedCarrier.mobile} type="text" className='my-input my-2 form-control' name='mobile' />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="city">المدينة :</label>
                  <input onChange={handleInputChangeCarrier} value={editedCarrier.city} type="text" className='my-input my-2 form-control' name='city' />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="address">العنوان :</label>
                  <input onChange={handleInputChangeCarrier} value={editedCarrier.address} type="text" className='my-input my-2 form-control' name='address' />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="nid">رقم الهوية :</label>
                  <input onChange={handleInputChangeCarrier} value={editedCarrier.nid} type="text" className='my-input my-2 form-control' name='nid' />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="deliveryCity">مدينة عمل المندوب :</label>
                  <input
                    list='mCities'
                    type="text"
                    className='my-input my-2 form-control'
                    name='deliveryCity'
                    value={editedCarrier.deliveryCity}
                    onChange={handleInputChangeCarrier}
                  />
                  <datalist id='mCities'>
                    {cities && cities.map((city, ciIndex) => (
                      <option key={ciIndex} value={city.name_ar} />
                    ))}
                  </datalist>
                </div>
                <div className="col-md-12 pb-1">
                  <label htmlFor="deliveryDistricts">مناطق المندوب :</label>
                  <div className="row">
                    {editedCarrier.deliveryDistricts.map((district, index) => (
                      <div key={index} className="col-11 mb-2">
                        <input
                          list={`myCities-${index}`}
                          type="text"
                          className='my-input my-2 form-control'
                          name='deliveryDistricts'
                          value={district}
                          data-index={index}
                          onChange={(e) => handleDistrictChange(e, index)}
                        />
                        <datalist id={`myCities-${index}`}>
                          <option value="جميع المناطق" />
                          {districts && districts.filter((district) => district.city_id === cityId).map((district, diIndex) => (
                            <option key={diIndex} value={district.name_ar} />
                          ))}
                        </datalist>
                      </div>
                    ))}
                    <div className="col-1 p-0">
                      <button type="button" className="btn btn-success mt-2" onClick={addAreaInput}>+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center pt-1">
                <button className='btn btn-primary'>تعديل</button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalCarrier}>إغلاق</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
    )
}
