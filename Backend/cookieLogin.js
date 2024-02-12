// server.js privius working cookiesLogin code 

// const express = require('express');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors());
// // Dummy user data (in real-world scenarios, this would be stored in a database)
// const users = [
//   { id: 1, username: 'arun', password: '1234' },
//   { id: 2, username: 'user2', password: 'password2' }
// ];

// // Route to handle user login
// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);
//   if (user) {
//     res.cookie('loggedIn', 'true', { maxAge: 3600000 }); // Set loggedIn cookie for 1 hour
//     res.json({ success: true, message: 'Login successful' });
//   } else {
//     res.json({ success: false, message: 'Invalid username or password' });
//   }
// });

// // Route to handle user logout
// app.post('/api/logout', (req, res) => {
//   res.clearCookie('loggedIn');
//   res.json({ success: true, message: 'Logout successful' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });







// server.js

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Coockie_Login', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Route to handle user login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.cookie('loggedIn', 'true', { maxAge: 3600000 }); // Set loggedIn cookie for 1 hour
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Route to handle user logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('loggedIn');
  res.json({ success: true, message: 'Logout successful' });
});

// Route to handle user registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
