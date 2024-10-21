import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { setUser } from '../redux/userSlice';

function Login() {
    const { loading } = useSelector((state) => state.alerts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/login', values);

            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.token);
                dispatch(setUser({ 
                    id: response.data.userId, 
                    name: response.data.name, 
                    isAdmin: response.data.isAdmin,
                    isDoctor: response.data.isDoctor
                }));
                navigate('/'); // Redirect to home
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        } finally {
            dispatch(hideLoading());
        }
    };

    return (
        <div className="authentication">
            <div className="authentication-form card p-2">
                <h1 className="card-title">Login</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Button className='primary-button my-1' htmlType='submit' loading={loading}>
                        Login
                    </Button>
                    <Link to='/register' className='anchor mt-2'>CLICK HERE TO REGISTER</Link>
                </Form>
            </div>
        </div>
    );
}

export default Login;
