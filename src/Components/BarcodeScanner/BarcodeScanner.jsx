import React, { useRef, useEffect } from 'react';
import Quagga from 'quagga';
import jsQR from 'jsqr';

const BarcodeScanner = ({ onDetected }) => {
  const videoRef = useRef();
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        if (videoRef.current.srcObject) {
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error('Error accessing the camera:', err);
      });
  
    // Rest of the code...
  }, [onDetected]);
  const detectBarcode = async (file) => {
    try {
      const imageBitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.setAttribute('willReadFrequently', 'true'); // Set willReadFrequently attribute
      const context = canvas.getContext('2d');
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      context.drawImage(imageBitmap, 0, 0);
  
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
  
      return code ? code.data : null;
    } catch (error) {
      console.error('Error detecting barcode:', error);
      return null;
    }
  };
    
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error('Error accessing the camera:', err);
      });

    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: videoRef.current,
      },
      decoder: {
        readers: ['ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader'],
      },
    }, (err) => {
      if (err) {
        console.error('Error initializing Quagga:', err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      onDetected(data);
      Quagga.stop();
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div>
      <video ref={videoRef} style={{ width: '50%', height: 'auto' }} />
    </div>
  );
};

export default BarcodeScanner;




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
