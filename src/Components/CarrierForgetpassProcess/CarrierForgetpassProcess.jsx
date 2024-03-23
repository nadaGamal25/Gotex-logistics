
import { useState } from "react";
import React from "react";
import CarrierForgetPass from "../CarrierForgetPass/CarrierForgetPass";
import CarrierVerifyCode from "../CarrierVerifyCode/CarrierVerifyCode";
import CarrierSetNewPass from "../CarrierSetNewPass/CarrierSetNewPass";

const CarrierForgetpassProcess = () => {
    const [token, setToken] = useState('');
  
    const [codeVerified, setCodeVerified] = useState(false);

    const handleTokenReceived = (token) => {
      setToken(token);
    };
  
    const handleCodeVerified = () => {
      setCodeVerified(true);
    };
  
    return (
      <div>
        {!token && <CarrierForgetPass onTokenReceived={handleTokenReceived} />}
        {token && !codeVerified && <CarrierVerifyCode token={token} onCodeVerified={handleCodeVerified}/>}
        {token && codeVerified && <CarrierSetNewPass token={token} />}
      </div>
    );
  };
  
  export default CarrierForgetpassProcess;