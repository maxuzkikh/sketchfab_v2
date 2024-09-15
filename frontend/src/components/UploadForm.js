// frontend/src/components/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [modelData, setModelData] = useState({
    title: '',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setModelData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', modelData.title);
    formData.append('description', modelData.description);
    formData.append('file', modelData.file);

    try {
      console.log('Uploading model:', modelData);
      const response = await axios.post('/api/models/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      alert('Model uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
      alert('Error uploading model.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Model Title"
        value={modelData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Model Description"
        value={modelData.description}
        onChange={handleChange}
      />
      <input
        name="file"
        type="file"
        accept=".zip"
        onChange={handleChange}
        required
      />
      <button type="submit">Upload Model</button>
    </form>
  );
}

export default UploadForm;
