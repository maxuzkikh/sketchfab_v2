// frontend/src/App.js
import React, { useState } from 'react';
import Auth from './components/Auth';
import Models from './components/Models';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token'))
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <Models />
        </>
      ) : (
        <Auth setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;
