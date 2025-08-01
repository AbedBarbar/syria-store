import axios from 'axios';
import { useState } from 'react';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost/api/upload.php', formData)
      .then(response => {
        console.log('File uploaded successfully', response.data);
      })
      .catch(error => {
        console.error('Error uploading file', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      
    </div>
  );
}

export default ImageUpload;
