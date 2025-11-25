import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import { Outlet } from 'react-router-dom';
import './dashboard.css'

export function Dashboard() {
    return (
        <div className='dashboard-container'>
            <Topbar />
            <div className='dashboard-body'>
                <Sidebar />
                <main className='dashboard-main'>
                    <Outlet />
                </main>
            </div>
        </div>)
}