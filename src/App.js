import './App.css';
import CombinedForm from './Components/CombinedForm';
import DisplaySalaryData from './Components/DisplaySalaryData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SnakeGame from './Components/SnakeGame';
import SnakeLadderGame from './Components/SnakeLadderGame';
import Calendar from './Components/Calendar';
// import ChatApp from './Components/ChatApp';
import Cookiees from './Components/Cookiees';
import LoginLogout from './Components/LoginLogout';



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
      <LoginLogout/>

    </div>
  );
}

export default App;





// App.js

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
