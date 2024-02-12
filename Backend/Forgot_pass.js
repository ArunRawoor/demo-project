const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Replace this with your MongoDB connection setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Mern_Jwt_Loin', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a User model
const User = mongoose.model('User', {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiration: Date
});

// JWT secret key
const JWT_SECRET = 'Run_A_0_0_1';

// Generate a random token
const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Endpoint to register a new user
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

// Endpoint to request a password reset
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ username: email });
  
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    // Generate a random token
    const token = generateToken();
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();
  
    // Send email with password reset link
    const resetPasswordLink = `http://localhost:3000/reset-password/${token}`; // Change the port if needed
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Your Gmail address
        pass: 'your-email-password' // Your Gmail password
      }
    });
  
    transporter.sendMail({
      from: 'your-email@gmail.com', // Sender's email address
      to: email, // Recipient's email address
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click <a href="${resetPasswordLink}">here</a> to reset your password.</p>`
    });
  
    res.send('Password reset instructions sent to your email');
  });
  

// Endpoint to reset password
app.post('/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;
  const user = await User.findOne({ username: email, resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

  if (!user) {
    return res.status(400).send('Invalid or expired token');
  }

  // Reset password
  user.password = bcrypt.hashSync(newPassword, 10);
  user.resetToken = null;
  user.resetTokenExpiration = null;
  await user.save();

  res.send('Password reset successful');
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
