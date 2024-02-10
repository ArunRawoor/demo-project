// server.js

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(cors());

// Route to set the cookie
app.get('/api/set-cookie', (req, res) => {
  res.cookie('user', 'Arun Kumar', { maxAge: 900000, httpOnly: true });
  res.send('Cookie is set');
});

// Route to get the cookie value
app.get('/api/get-cookie', (req, res) => {
  const userCookie = req.cookies.user;
  if (userCookie) {
    res.send('Welcome back, ' + userCookie);
    console.log(userCookie)
  } else {
    res.send('No cookie found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
