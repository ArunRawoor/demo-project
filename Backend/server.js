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
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





