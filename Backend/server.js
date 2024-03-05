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



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000; // or any port you prefer

// Enable CORS
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employeeDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for your data
const prescriptionSchema = new mongoose.Schema({
  // Define your schema here, similar to how you're structuring your form data
  name: String,
  gender: String,
  age: Number,
  bloodgroup: String,
  mobile: Number,
  email: String,
  idtype: String,
  idno: String,
  occupation: String,
  income: Number,
  city: String,
  state: String,
  address: String,
  sname: String,
  sgender: String,
  sage: Number,
  sbloodgroup: String,
  smobile: Number,
  semail: String,
  sidtype: String,
  sidno: String,
  soccupation: String,
  sincome: Number,
  scity: String,
  sstate: String,
  saddress: String,
  treatedPerson: String,
  doctor: String,
  therapist: String,
  rows: [{ treatmenttype: String, quantity: Number, taxRate: Number }],
  subtotal: Number, // Add Subtotal field

});

const PrescriptionModel = mongoose.model('Prescription', prescriptionSchema);

// Endpoint to handle form submissions
app.post('/submitPrescription', async (req, res) => {
  try {

    console.log('Recived preicription data', req.body);
    // Create a new instance of the Prescription model with data from the request body
    const newPrescription = new PrescriptionModel(req.body);
    await newPrescription.save();
    res.status(201).json({ message: 'Prescription submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});