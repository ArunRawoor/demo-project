import './App.css'; // this is the main App.js
import CombinedForm from './Components/CombinedForm';
import DisplaySalaryData from './Components/DisplaySalaryData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SnakeGame from './Components/SnakeGame';
import SnakeLadderGame from './Components/SnakeLadderGame';
import Calendar from './Components/Calendar';
// import ChatApp from './Components/ChatApp';
import Cookiees from './Components/Cookiees';
import LoginLogout from './Components/LoginLogout';
import Loginwith_jwt from './Components/Loginwith_jwt';
import Forgot_password from './Components/Forgot_password';
import Counter from './Components/Counter';
import ProductList from './Components/ProductList';
import ShoppingCart from './Components/ShoppingCart';
import DigitalClock from './Components/DigitalClock';




function App() {
  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route path="/" element={<CombinedForm />} />
          <Route path="/DisplaySalaryData" element={<DisplaySalaryData />} />
        </Routes>
      </Router> */}
      {/* <SnakeGame/> */}
      {/* <SnakeLadderGame/> */}
      {/* <Calendar/> */}
      {/* <Cookiees/> */}
      {/* <LoginLogout/> */}
       {/* <Loginwith_jwt/> */}
       {/* <Forgot_password/> */}

       {/* <Counter/> */}
       {/* <h1>Shopping App</h1>
       <ProductList/>
     <ShoppingCart/> */}
      <DigitalClock/>

    </div>
  );
}

export default App;





//This App.js is for Coockiees login purpose.

// import React, { useState } from 'react';

// function App() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async () => {
//     const response = await fetch('http://localhost:5000/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username, password })
//     });
//     const data = await response.json();
//     setMessage(data.message);
//   };

//   const handleLogout = async () => {
//     const response = await fetch('http://localhost:5000/api/logout', {
//       method: 'POST'
//     });
//     const data = await response.json();
//     setMessage(data.message);
//   };

//   return (
//     <div>
//       <h1>Login/Logout Example</h1>
//       <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={handleLogout}>Logout</button>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;









//This App.js is for the Jwt login purpose
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [token, setToken] = useState('');

//   const register = async () => {
//     try {
//       await axios.post('http://localhost:5000/register', { username, password });
//       console.log('Registration successful');
//     } catch (error) {
//       console.error('Registration failed:', error.message);
//     }
//   };

//   const login = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/login', { username, password });
//       setToken(response.data.token);
//       console.log('Login successful');
//     } catch (error) {
//       console.error('Login failed:', error.message);
//     }
//   };

//   const profile = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Profile fetch failed:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>MERN JWT Authentication</h1>
//       <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={register}>Register</button>
//       <button onClick={login}>Login</button>
//       <button onClick={profile}>Profile</button>
//     </div>
//   );
// }

// export default App;



//this App.js for  the redux 
// App.js
// import React from 'react';
// import { connect } from 'react-redux';
// import { increment, decrement } from '../src/actions/actions';

// const App = ({ count, increment, decrement }) => {
//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   count: state.count
// });

// export default connect(mapStateToProps, { increment, decrement })(App);
