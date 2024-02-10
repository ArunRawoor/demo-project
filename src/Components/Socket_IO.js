import {Socket, io} from "socket.io-client";

const socket = io("http://localhost:3000");

//recive a message from the server
socket.on("hello" , (arg) =>{
    console.log(arg); //prints "world"
});
//send a message to the server
socket.emit("howdy" , "stranger");

