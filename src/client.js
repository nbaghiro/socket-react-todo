import io from 'socket.io-client';
const server = io('http://localhost:8000');

function callServer(event, data='') {
	switch(event) {
		case "make":
			server.emit('make', data);	
			break;
		case "completeAll":
			server.emit('completeAll');
			break;
		case "toggleStatusOne":
			server.emit('toggleStatusOne', data);	
			break;
		case "deleteAll":
			server.emit('deleteAll');
			break;
		case "deleteOne":
			server.emit('deleteOne', data);	
			break;
		default:
			break;
	}
}

function listenToServer(updateCB) {	
	server.on('connect', () => {
		updateCB('connect');
	});

	server.on('disconnect', () => {
		updateCB('disconnect');
	});

	server.on('load', (todos) => {		
	    updateCB('load', todos);
	});

	server.on('itemAdded', (newTodo) => {
		updateCB('itemAdded', newTodo);
	});

	server.on('itemDeleted', (editedTodo) => {
		updateCB('itemDeleted', editedTodo);
	});

	server.on('itemStatusToggled', (editedTodo) => {
		updateCB('itemStatusToggled', editedTodo);
	});

	server.on('allCompleted', () => {
		updateCB('allCompleted');
	});

	server.on('allDeleted', () => {
		updateCB('allDeleted');
	});
}
	

export { callServer, listenToServer };