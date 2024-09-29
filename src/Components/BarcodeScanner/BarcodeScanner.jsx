import React, { useRef, useEffect, useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import axios from "axios";
function BarcodeScanner() {
    const [scanResult , setScanResult] = useState(null)
    const onNewScanResult = (decodedText, decodedResult) => {
        console.log("App [result]", decodedResult);
        setScanResult(decodedResult.decodedText)

    };

    async function confirmOrder(scanResult){
        try{
        const response= await axios.patch(`https://dashboard.go-tex.net/logistics/store-keeper/add-order-store/${scanResult}`,{},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('storekeeperToken')}`,
            },
        }
          );
        if(response.status == 200){
          console.log(response)
          window.alert("تمت اضافة الشحنة بنجاح")  
        }
        else{
          window.alert(response.data.msg.name)
        }
      
      }catch(error){
          console.log(error.response)
          window.alert(error.response.data.msg.name || error.response.data.msg || "error")
      }
    }

    useEffect(() => {
        if (scanResult !== null) {
            confirmOrder(scanResult);
        }
    }, [scanResult]);
    
    return (
        <div className="App">
            <section className="App-section">
            {/* Html5-qrcode React demo */}
                <div className="App-section-title">  </div>
                <br />
                <br />
                <br />
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </section>
            
        </div>
    );

}

export default BarcodeScanner;

// const videoRef = useRef(null);
// const canvasRef = useRef(null);


// useEffect(() => {
//     Quagga.init(
//         {
//             inputStream: {
//                 name: "Live",
//                 type: "LiveStream",
//                 target: videoRef.current,
//             },
//             decoder: {
//                 readers: ["code_128_reader"],
//             },
//         },
//         (err) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             Quagga.start();
//         }
//     );

//     Quagga.onDetected((data) => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         const code = data.codeResult.code;
//         const x = data.codeResult.startX;
//         const y = data.codeResult.startY;
//         const width = data.codeResult.endX - x;
//         const height = data.codeResult.endY - y;

//         ctx.strokeStyle = "#FF3B58";
//         ctx.lineWidth = 4;
//         ctx.strokeRect(x, y, width, height);

//         console.log("Code detected:", code);
//         Quagga.stop();
//     });

//     return () => {
//         Quagga.stop();
//     };
// }, []);

// return (
//     <>
//         <video ref={videoRef} />
//         <canvas ref={canvasRef} />
//     </>
// );

// import React from 'react';
// import jsQR from 'jsqr';
// import { getDocument } from 'pdfjs-dist'; // Import pdfjs-dist

// const detectBarcode = async (file) => {
//   try {
//     const arrayBuffer = await file.arrayBuffer(); // Convert file to ArrayBuffer
//     const loadingTask = getDocument({ data: arrayBuffer }); // Pass ArrayBuffer to getDocument
//     const pdf = await loadingTask.promise;
//     const images = [];
//     // const loadingTask = getDocument(file);
//     // const pdf = await loadingTask.promise;
//     // const images = [];

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const viewport = page.getViewport({ scale: 1 });
//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;

//       const renderContext = {
//         canvasContext: context,
//         viewport: viewport
//       };
//       await page.render(renderContext).promise;

//       // Convert canvas to image data URL
//       const imageDataUrl = canvas.toDataURL('image/png');
//       images.push(imageDataUrl);
//     }

//     return images;
//   } catch (error) {
//     console.error('Error extracting images from PDF:', error);
//     return [];
//   }
// };

// const BarcodeScanner = ({ onDetected }) => {
//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Perform barcode detection here
//     const barcode = await detectBarcode(file);
//     if (barcode) {
//       onDetected(barcode);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//     </div>
//   );
// };

// export default BarcodeScanner;
