import io from 'socket.io-client';
const server = io('http://localhost:8000');

function add(item) {
    server.emit('make', {
        title : item
    });
}

function completeAll() {
	server.emit('completeAll');
}

function toggleStatusOne(todo) {
	server.emit('toggleStatusOne', todo);
}

function deleteAll() {
	server.emit('deleteAll');
}

function deleteOne(todo) {
	server.emit('deleteOne', todo);
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

	/*server.on('itemDeleted', () => {
		updateCB('itemDeleted');
	});

	server.on('itemCompleted', () => {
		updateCB('itemCompleted');
	});*/
}
	

export { add, completeAll, toggleStatusOne, deleteAll, deleteOne, listenToServer };