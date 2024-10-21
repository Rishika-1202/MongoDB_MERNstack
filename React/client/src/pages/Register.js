import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate import
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice'; // Import loading actions

function Register() {
    const { loading } = useSelector((state) => state.alerts); // Access loading state
    const navigate = useNavigate(); // Initialize navigate
    const dispatch = useDispatch(); // Initialize dispatch

    const onFinish = async (values) => {
        try {
            dispatch(showLoading()); // Show loading before the API call
            const response = await axios.post('/api/user/register', values);
            
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login'); // Redirect to login page after successful registration
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error); // Log error for debugging
        } finally {
            dispatch(hideLoading()); // Hide loading after the API call
        }
    };

    return (
        <div className='authentication'>
            <div className='authentication-form card p-2'>
                <h1 className='card-title'>Welcome</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
                        <Input placeholder='Name' />
                    </Form.Item>
                    <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder='Password' />
                    </Form.Item>
                    <Button className='primary-button my-1' htmlType='submit' loading={loading}> 
                        Register
                    </Button>
                    <Link to='/login' className='anchor mt-2'>CLICK HERE TO LOGIN</Link>
                </Form>
            </div>
        </div>
    );
}

export default Register;
