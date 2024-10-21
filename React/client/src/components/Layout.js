import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice'; // Import clearUser action
import '../layout.css';

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch(); // Initialize dispatch

  // Access user from Redux store, default to null to avoid errors
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user data is available
  const isAdmin = user ? user.isAdmin : false;
  const userName = user ? user.name : 'User';

  const userMenu = [
    { name: 'Home', path: '/', icon: 'ri-home-4-line' },
    { name: 'Appointments', path: '/appointments', icon: 'ri-file-list-2-line' },
    { name: 'Apply Doctor', path: '/apply-doctor', icon: 'ri-hospital-line' },
    { name: 'Profile', path: '/profile', icon: 'ri-user-3-line' },
    { name: 'Logout', path: '/logout', icon: 'ri-logout-box-r-line' },
  ];

  const adminMenu = [
    { name: 'Home', path: '/', icon: 'ri-home-4-line' },
    { name: 'Users', path: '/users', icon: 'ri-user-line' },
    { name: 'Doctors', path: '/doctor', icon: 'ri-user-add-line' },
    { name: 'Profile', path: '/profile', icon: 'ri-user-3-line' },
    { name: 'Logout', path: '/logout', icon: 'ri-logout-box-r-line' },
  ];

  const menuToBeRendered = isAdmin ? adminMenu : userMenu;

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token'); // Clear token from localStorage
    dispatch(clearUser()); // Clear user data from Redux state
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className='main'>
      <div className='d-flex layout'>
        {/* Sidebar */}
        <div className={`${collapsed ? 'collapsed-sidebar' : 'sidebar'}`}>
          <div className='sidebar-header'>
            <h1 className='logo'>BD</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;

              return (
                <div key={menu.path} className={`d-flex menu-item ${isActive ? 'active-menu-item' : ''}`}>
                  <i className={menu.icon}></i>
                  <Link 
                    to={menu.path} 
                    className={`${collapsed ? 'collapsed-link' : ''}`} 
                    onClick={menu.name === 'Logout' ? handleLogout : undefined}
                    aria-label={menu.name}
                  >
                    {!collapsed && <span>{menu.name}</span>}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className='content'>
          <div className='header'>
            {collapsed ? (
              <i className="ri-menu-2-line header-action-icon" onClick={() => setCollapsed(false)}></i>
            ) : (
              <i className="ri-close-fill header-action-icon" onClick={() => setCollapsed(true)}></i>
            )}
            <div className='d-flex align-items-center px-4'>
              <i className='ri-notification-line header-action-icon px-3'></i>
              <Link className='anchor' to='/profile'>{userName}</Link>
            </div>
          </div>
          <div className='body'>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
