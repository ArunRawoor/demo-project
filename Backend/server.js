// import { Server }  from "socket.io";

// const io =  new Serevr(3000);

// io.on("connection", (socket) =>{
//    // send a message to the client
//     socket.emmit("hello" , "world");

//     //receive a message from the client
//     socket.on("howdy" , (arg) =>{
//         console.log(arg); // to print stranger
//     });
    
// });




// server.js








// server.js

// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const path = require('path');
// const cors = require('cors');



// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors());

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// io.on('connection', (socket) => {
//   socket.emit('message', 'Welcome to the chat!');

//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });

// server.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// const port = 5000; // or any port you prefer

// // Enable CORS
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/employeeDB', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Define a schema and model for your data
// const prescriptionSchema = new mongoose.Schema({
//   // Define your schema here, similar to how you're structuring your form data
//   name: String,
//   gender: String,
//   age: Number,
//   bloodgroup: String,
//   mobile: Number,
//   email: String,
//   idtype: String,
//   idno: String,
//   occupation: String,
//   income: Number,
//   city: String,
//   state: String,
//   address: String,
//   sname: String,
//   sgender: String,
//   sage: Number,
//   sbloodgroup: String,
//   smobile: Number,
//   semail: String,
//   sidtype: String,
//   sidno: String,
//   soccupation: String,
//   sincome: Number,
//   scity: String,
//   sstate: String,
//   saddress: String,
//   branchId: String,
//   treatedPerson: String,
//   doctor: String,
//   therapist: String,
//   rows: [{ treatmenttype: String, quantity: Number, taxRate: Number }],
//   subtotal: Number, // Add Subtotal field

// });

// const PrescriptionModel = mongoose.model('Prescription', prescriptionSchema);

// // Endpoint to handle form submissions
// app.post('/submitPrescription', async (req, res) => {
//   try {

//     console.log('Recived preicription data', req.body);
//     // Create a new instance of the Prescription model with data from the request body
//     const newPrescription = new PrescriptionModel(req.body);
//     await newPrescription.save();
//     res.status(201).json({ message: 'Prescription submitted successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });













const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Use the 'cors' middleware to enable CORS for all routes
app.use(cors());
app.use(express.json()); 

// MongoDB setup using Mongoose
mongoose.connect('mongodb://localhost:27017/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const loginSchema = new mongoose.Schema({
  loginName: String,
  loginPassword: String,
});

const Login = mongoose.model('Login', loginSchema);

app.post('/insert0001', async (req, res) => {
  const { loginName, loginPassword } = req.body;

  try {
    const login = new Login({
      loginName, // Use the correct key from req.body
      loginPassword, // Use the correct key from req.body
    });

    await login.save();
    console.log('Successfully logged in', login._id);

    res.status(201).json({ message: 'Login successfully.' });
  } catch (error) {
    console.error('Not logged in', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});




// New endpoint for fetching data add more function like this according to your reqyrement
app.get('/fetch', async (req, res) => {
  try {
    const logins = await Login.find();  // find()  is pre-defined method or inbuilt method itfinds all the data present in the mentioned collection Login 
    res.status(200).json(logins);
  } catch (error) {
    console.error('Failed to fetch data', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});




app.listen(5000, () => {
  console.log('Backend server is running on http://localhost:5000');
});










