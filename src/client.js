import io from 'socket.io-client';
const server = io('http://localhost:8000');

function add(item) {
    // Emit the new todo as some data to the server
    console.log("Emitting " + item);
    server.emit('make', {
        title : item
    });

    // Clear the input
    // TODO: refocus the element
}

function listenToServer() {
	// NOTE: These are listeners for events from the server
	// This event is for (re)loading the entire list of todos from the server
	server.on('load', () => {
	    console.log("Listening on load event");
	});
}
	

export { add, listenToServer };