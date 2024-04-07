import { useState } from "react";
import React from "react";
import TrackerVerifyCode from "../TrackerVerifyCode/TrackerVerifyCode"
import TrackerForgetPass from "../TrackerForgetPass/TrackerForgetPass"
import TrackerSetNewPass from "../TrackerSetNewPass/TrackerSetNewPass"

export default function TrackerForgetPassProcess() {
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
        {!token && <TrackerForgetPass onTokenReceived={handleTokenReceived} />}
        {token && !codeVerified && <TrackerVerifyCode token={token} onCodeVerified={handleCodeVerified}/>}
        {token && codeVerified && <TrackerSetNewPass token={token} />}
      </div>
    );
  };