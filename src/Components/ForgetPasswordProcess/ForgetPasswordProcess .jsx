import { useState } from "react";
import React from "react";
import UserForgetPass from "../UserForgetPass/UserForgetPass";
import UserVerifyCode from "../UserVerifyCode/UserVerifyCode";
import UserSetNewPass from "../UserSetNewPass/UserSetNewPass";

const ForgetPasswordProcess = () => {
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
        {!token && <UserForgetPass onTokenReceived={handleTokenReceived} />}
        {token && !codeVerified && <UserVerifyCode token={token} onCodeVerified={handleCodeVerified}/>}
        {token && codeVerified && <UserSetNewPass token={token} />}
      </div>
    );
  };
  
  export default ForgetPasswordProcess;