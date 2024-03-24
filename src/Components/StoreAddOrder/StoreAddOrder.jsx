import React from 'react'
import BarcodeReader from 'react-barcode-reader';
import { useState ,useEffect } from 'react';
import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useZxing } from "react-zxing";
import { BrowserMultiFormatReader } from '@zxing/library';
import Webcam from 'react-webcam';

export default function StoreAddOrder() {

  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <>
    <div className="p-5" id='content'>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
      </div>
    </>
  );
  
  // return(
  //   <div className="p-5" id='content'>
  // <h1>Barcode Scanner</h1>
  // <BarcodeScanner />
  // </div>
  // )
}



  // const [barcode, setBarcode] = useState('');

  // const handleDetected = (data) => {
  //   setBarcode(data);
  // };

  // return (
  //   <div id='content' className='p-5'>
  //     <h1>Barcode Scanner</h1>
  //     <BarcodeScanner onDetected={handleDetected} />
  //     {barcode && <p>Detected Barcode: {barcode}</p>}
  //   </div>
  // );

  // const [barcode, setBarcode] = useState('');

  // const handleDetected = (data) => {
  //   setBarcode(data.codeResult.code);
  // };

  // return (
  //   <div id='content' className='p-5'>
  //     <h1>Barcode Scanner</h1>
  //     <BarcodeScanner onDetected={handleDetected} />
  //     {barcode && <p>Detected Barcode: {barcode}</p>}
  //   </div>
  // );