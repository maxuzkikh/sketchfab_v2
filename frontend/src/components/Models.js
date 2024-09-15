// frontend/src/components/Models.js
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Viewer from './Viewer';

function Models() {
  const [models, setModels] = useState([]);
  const [newModel, setNewModel] = useState({
    title: '',
    description: '',
    file: null,
  });

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const { data } = await api.get('models');
      setModels(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newModel.title);
    formData.append('description', newModel.description);
    formData.append('model', newModel.file);

    try {
      await api.post('models', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Model uploaded successfully!');
      fetchModels();
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewModel({
      ...newModel,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className="models-container">
      <form onSubmit={handleUpload} className="upload-form">
        <h2>Upload New Model</h2>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={newModel.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newModel.description}
          onChange={handleChange}
        />
        <input
          name="file"
          type="file"
          accept=".glb,.gltf"
          onChange={handleChange}
          required
        />
        <button type="submit">Upload</button>
      </form>

      <div className="models-list">
        <h2>Available Models</h2>
        {models.map((model) => (
          <div key={model._id} className="model-item">
            <h3>{model.title}</h3>
            <p>{model.description}</p>
            <Viewer modelUrl={`http://localhost:5000/${model.fileUrl}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Models;
