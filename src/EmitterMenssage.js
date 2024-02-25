const EventEmitter = require('events');
const myEmitter = new EventEmitter();

//Simulamos el envio de mensajes del servidor
setInterval(()=>{
    let mensaje="Este es un mensaje de prueba."
    myEmitter.emit('mensajeTipo1', mensaje);
}, 5000);

setInterval(()=>{
    let mensaje="Este es otro mensaje de prueba."
    myEmitter.emit('mensajeTipo2', mensaje);
}, 10000);

module.exports= {
    myEmitter
}
