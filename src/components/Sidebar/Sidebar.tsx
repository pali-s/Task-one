import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css'

const Sidebar: React.FC = () => {
    return (
        <aside className='sidebar'>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard" end
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >Profile</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/settings"
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >Settings</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/tanstacksec"
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >TanStack Section</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
export default Sidebar;