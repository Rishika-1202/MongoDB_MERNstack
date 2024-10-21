import React, { useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';

function ProtectedRouter({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage.');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        '/api/user/get-user-info-by-id', 
        {}, // Empty body for POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user)); // Set user state in Redux
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error in getUser:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('token');
      if (token) {
        getUser();
      } else {
        navigate('/login');
      }
    }
  }, [user, getUser, navigate]);

  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

export default ProtectedRouter;
