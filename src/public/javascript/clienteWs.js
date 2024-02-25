const socket = new WebSocket("ws://localhost:8080");

function sendText(event){
    event.preventDefault();
    event.stopPropagation();
    let texto =event.target.texto;
    //para obtener el valor del texto
    doSend(texto.value);
    texto.value="";
}

// This function invokes the WS connect
function init(){
    wsConnect();
}
function wsConnect(){
    // Event triggered when the connection is established.
    socket.addEventListener("open", (event) => {
        //We send data to the server once the connection is open.
        onOpen(event);
    });
    // Event triggered when a message is received fron the server.
    socket.addEventListener("message", (event) => {
        onMessage(event);
    });
    // Event triggered when the connection is closed.
    socket.addEventListener("close", (event) => {
        onClose(event);
    });
    // Event triggered in case of error.
    socket.addEventListener("error", (error) => {
        onError(error);
    });
}
function onOpen(event){
    //Active the 'enviar' button because the connection is initiated.
    const botonEnviar = document.getElementById("enviar");
    botonEnviar.disabled = false;
    doSend("Saludos desde el WebSocket");
    console.log("Conexión establecida.");
}
function onMessage(event){
    const mensaje = event.data;
    let areaTexto = document.getElementById("mensajes");
    areaTexto.innerHTML += mensaje + "\n";
    console.log(`Mensaje del servidor: ${mensaje}`);
}
function onClose(event){
    //Desactive the 'enviar' button because the connection is closed.
    const botonEnviar = document.getElementById("enviar");
    botonEnviar.disabled = false;

    //Clear the textarea content
    const cajaMensaje = document.getElementById("mensajes");
    cajaMensaje.innerHTML = "";

    if (event.wasClean) {
        console.log(`Conexión cerrada limpiamente, código: ${event.code}, razón: ${event.reason}`);

    } else {
        console.error(`Conexión rota. Reconectando en 2 segundos`);
        setTimeout(()=>{
            //console.clear();
            wsConnect();
        },2000)
    }
}
function onError(error){
    console.error(`Error en la conexión: ${error.message}`);
}
function doSend(mensaje){
    socket.send(mensaje);
}

// Assign a listener to the window object that would indicate
// to execute the init function once the page has completely loaded
window.addEventListener("load", init, false);