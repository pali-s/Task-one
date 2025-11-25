import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './topbar.css'
import { useNavigate } from 'react-router-dom';

const Topbar: React.FC = () => {
    const navigate= useNavigate();
    const{user, logout}=useAuth();

    const handleLogout=()=>{
        logout();
        navigate("./login");
    }
    return (
        <header className='topbar'>
            <div className='topbar-left'>
                <h2>Welcome, {user}!</h2>
            </div>
            <div className='topbar-right'>
                <select>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Topbar;