const path = require ("path");
const express = require ("express");
const cors = require ("cors");
const app = express();
const server = require ("http").Server(app);
const WebSocketServer = require("websocket").server;

const { myEmitter } = require('./EmitterMenssage.js');

let i=1;
let j=1;

app.set("puerto", 8080);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
});
let conn = null;

wsServer.on("request", (request)=>{
    const connection =request.accept(null, request.origin);
    conn = connection;
    connection.on("message", (message) =>{
        console.log('Cliente conectado');
        console.log("Mensaje recibido: "+message.utf8Data);
        connection.sendUTF("Recibido: "+message.utf8Data);
    });
    connection.on("close", (reasonCode, description)=>{
        console.log('Cliente desconectado');
    })
});

//Escuchamos los mensajes recibidos tambien
myEmitter.on('mensajeTipo1', (mensaje) => {
    if (conn!=null && conn.connected){
        conn.sendUTF("Mensaje tipo 1 numero: "+i+ " del servidor: "+mensaje);
        i++;
    }
});
myEmitter.on('mensajeTipo2', (mensaje) => {
    if (conn!=null && conn.connected){
        conn.sendUTF("Mensaje tipo 2 numero: "+j+ " del servidor: "+mensaje);
        j++;
    }
});

server.listen(app.get("puerto"),()=>{
    console.log("Servidor iniciado en el puerto: " + app.get("puerto"));
});