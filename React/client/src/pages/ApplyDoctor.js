import { Form, Row, Col, Input, TimePicker, Button } from 'antd';
import Layout from '../components/Layout';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ApplyDoctor() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user); // Get user from Redux state
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());

            // Prepare the form data to match the backend requirements
            const formData = {
                userId: user._id,  // Fetch userId from Redux
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                website: values.website,
                address: values.address,
                specialization: values.specialization,
                experience: values.experience,
                feePerConsultation: values.feePerConsultation,
                timings: values.timings.map(time => time.format("HH:mm")), // Format timings
            };

            console.log("Form Data for Doctor Application:", formData); // Debugging

            // Get token from local storage or Redux
            const token = localStorage.getItem('token'); // Assuming token is stored in local storage

            // Make API request to apply doctor account with Authorization header
            const response = await axios.post('/api/user/apply-doctor-account', formData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include JWT token
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/home'); // Redirect to home page after successful application
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        } finally {
            dispatch(hideLoading());
        }
    };

    return (
        <Layout>
            <h1 className='page-title'>Apply Doctor</h1>
            <Form layout="vertical" onFinish={onFinish}>
                <h1 className='card-title mt-3'>Personal Information</h1>
                <Row gutter={20}>
                    <Col span={8}>
                        <Form.Item
                            label="First Name"
                            name='firstName'
                            rules={[{ required: true, message: 'Please enter your first name' }]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Last Name"
                            name='lastName'
                            rules={[{ required: true, message: 'Please enter your last name' }]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Phone Number"
                            name='phoneNumber'
                            rules={[{ required: true, message: 'Please enter your phone number' }]}
                        >
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Website"
                            name='website'
                            rules={[{ required: true, message: 'Please enter your website' }]}
                        >
                            <Input placeholder="Website" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Address"
                            name='address'
                            rules={[{ required: true, message: 'Please enter your address' }]}
                        >
                            <Input placeholder="Address" />
                        </Form.Item>
                    </Col>
                </Row>
                <hr />
                <h1 className='card-title mt-3'>Professional Information</h1>
                <Row gutter={20}>
                    <Col span={8}>
                        <Form.Item
                            label="Specialization"
                            name='specialization'
                            rules={[{ required: true, message: 'Please enter your specialization' }]}
                        >
                            <Input placeholder="Specialization" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Experience"
                            name='experience'
                            rules={[{ required: true, message: 'Please enter your experience' }]}
                        >
                            <Input placeholder="Experience" type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Fee Per Consultation"
                            name='feePerConsultation'
                            rules={[{ required: true, message: 'Please enter the fee per consultation' }]}
                        >
                            <Input placeholder="Fee Per Consultation" type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Timings"
                            name='timings'
                            rules={[{ required: true, message: 'Please select your available timings' }]}
                        >
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'>
                    <Button className='primary-button' htmlType="submit">SUBMIT</Button>
                </div>
            </Form>
        </Layout>
    );
}

export default ApplyDoctor;
