// import React, { useState } from 'react';
//
// const ImageUploaderFile = () => {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [responseText, setResponseText] = useState('');
//
//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         setSelectedImage(file);
//     };
//
//     const handleSubmitScanOcr = async () => {
//         if (!selectedImage) {
//             setResponseText('Please select an image first.');
//             return;
//         }
//
//         const url = 'https://api.fpt.ai/vision/idr/vnm';
//         const apiKey = 'm13aY7m758e1ejzmiSfs3BxyIYcHy1T8';
//
//         const formData = new FormData();
//         formData.append('image', selectedImage);
//
//         const headers = {
//             'api-key': apiKey
//         };
//
//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: headers,
//                 body: formData
//             });
//
//             const data = await response.json();
//             setResponseText(JSON.stringify(data, null, 2));
//         } catch (error) {
//             console.error('Error:', error);
//             setResponseText('Error occurred during API call.');
//         }
//     };
//
//     return (
//         <div>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             <button onClick={handleSubmitScanOcr}>Submit</button>
//             <pre>{responseText.}</pre>
//         </div>
//     );
// };
//
// export default ImageUploaderFile;
