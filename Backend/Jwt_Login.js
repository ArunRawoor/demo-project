const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
// Replace this with your MongoDB connection setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Mern_Jwt_Loin', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a User model
const User = mongoose.model('User', {
  username: {type:String , required:true , unique:true},
  password: {type:String , required:true}
});

// JWT secret key
const JWT_SECRET = 'Run_A_0_0_1';

// Endpoint to register a new user
// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 10);
//   const newUser = new User({ username, password: hashedPassword });
//   await newUser.save();
//   res.status(201).send('User registered successfully');
// });


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).send('Username already exists');
      }
  
      // If username is unique, hash the password and save the new user
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).send('Internal server error');
    }
  });
  

// Endpoint to log in
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send('Invalid username or password');
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.send({ token });
});

// Protected route
app.get('/profile', async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.userId;
      // Fetch user details from the database based on userId
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).send('User not found');
      }
      
      res.send(`Welcome ${user.username}`);
    } catch (error) {
      return res.status(401).send('Invalid token');
    }
  });
  
  
  
  
  

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
