import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        '/api/user/get-user-info-by-id', 
        {}, // Body (empty object since you're not sending data in the body)
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
}

export default Home;
