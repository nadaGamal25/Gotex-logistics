import React,{useEffect} from 'react'

export default function CarrierOrderDetails({item}) {
    useEffect(()=>{
        console.log(item)
    },[])
  return (
    <div>
        <div className='ntf-box p-5'>
            <h4 className="text-center mb-4"><span>رقم الشحنة : </span>
           {item.data.ordernumber}</h4>
            <div className="row">
            <div className="col-md-6 p-3">
                    <h4>
                        <span>المرسل : </span> {item.data.sendername}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>هاتف المرسل : </span>{item.data.senderphone}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>مدينة المرسل : </span>{item.data.sendercity}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>عنوان المرسل : </span>{item.data.senderaddress}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>المستلم : </span>{item.data.recivername}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>هاتف المستلم :  </span> {item.data.reciverphone}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>مدينة المستلم : </span> {item.data.recivercity}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>عنوان المستلم : </span> {item.data.reciveraddress}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>طريقة الدفع : </span> {item.data.paytype}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>السعر : </span> {item.data.price}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>عدد القطع : </span> {item.data.pieces}
                    </h4>
                </div>
                <div className="col-md-6 p-3">
                    <h4>
                        <span>حالة الشحنة : </span> {item.data.status}
                    </h4>
                </div>
            </div>
        </div>
    </div>
  )
}
