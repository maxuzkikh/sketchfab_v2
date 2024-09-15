// frontend/src/components/ModelList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModelViewer from './ModelViewer';

function ModelList() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('/api/models');
        setModels(response.data);
      } catch (err) {
        console.error('Error fetching models:', err);
      }
    };

    fetchModels();
  }, []);

  return (
    <div>
      {models.map((model) => (
        <div key={model.id}>
          <h2>{model.title}</h2>
          <p>{model.description}</p>
          <ModelViewer model={model} />
        </div>
      ))}
    </div>
  );
}

export default ModelList;
