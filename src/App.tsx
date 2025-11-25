import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import Settings from './pages/Dashboard/Settings';
import Profile from './pages/Dashboard/Profile';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>


      <Route path="/dashboard" element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>}>
      <Route index element={<Profile/>}/>
      <Route path='settings' element={<Settings/>}/>
      </Route>

      
      <Route path="*" element={<Navigate to="/login" replace/>}/>
    </Routes>
  );
}

export default App;
