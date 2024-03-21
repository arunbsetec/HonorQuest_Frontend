import Wallet from './component/wallet';
import './App.css';
// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import { AuthProvider } from './component/AuthContext';

function App() {
  const address = localStorage.getItem("Address")
  return (

    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          { (<Route path='home' element={<Wallet/>} />)}
        </Routes>
      </AuthProvider>
    </div>

  );
}

export default App;
