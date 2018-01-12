import io from 'socket.io-client';
const server = io('http://localhost:8000');

function add(item) {
    server.emit('make', {
        title : item
    });
}

function completeAll() {
	console.log("Complete all from props");
	server.emit('completeAll');
}

function toggleStatusOne(todo) {
	console.log("Toggle one from props");
	server.emit('toggleStatusOne', todo);
}

function deleteAll() {
	console.log("Delete all from props");
	server.emit('deleteAll');
}

function deleteOne(todo) {
	console.log("Delete one from props");
	console.log(todo);
	server.emit('deleteOne', todo);
}

function listenToServer(updateCB) {	
	server.on('load', (todos) => {
	    updateCB('load', todos);
	});

	server.on('itemAdded', (newTodo) => {
		updateCB('itemAdded', newTodo);
	});

	/*server.on('itemDeleted', () => {
		console.log("new item got added");
		updateCB('itemDeleted');
	});

	server.on('itemCompleted', () => {
		console.log("new item got added");
		updateCB('itemCompleted');
	});*/
}
	

export { add, completeAll, toggleStatusOne, deleteAll, deleteOne, listenToServer };