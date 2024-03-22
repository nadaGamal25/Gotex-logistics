import React from 'react'
import BarcodeReader from 'react-barcode-reader';
import { useState } from 'react';
import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';
// import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function StoreAddOrder() {
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
  const [barcode, setBarcode] = useState('');

  const handleDetected = (data) => {
    setBarcode(data.codeResult.code);
  };

  return (
    <div id='content' className='p-5'>
      <h1>Barcode Scanner</h1>
      <BarcodeScanner onDetected={handleDetected} />
      {barcode && <p>Detected Barcode: {barcode}</p>}
    </div>
  );
}
