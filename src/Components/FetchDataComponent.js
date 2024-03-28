import React, { useState, useEffect } from 'react';

const FetchDataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/fetch');
        const result = await response.json();
        setData(result); // to get the updated result ex - initilly i have stror the my name as Arun - i have updated to Kumar latest 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Loggedin User Data:</h2>
      <ul>
        {data.map((item) => (   
          <li key={item._id}>
          Login Name: {item.loginName},Password: {item.loginPassword}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDataComponent;