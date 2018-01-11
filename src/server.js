const server = require('socket.io')();
const firstTodos = require('../data');
const Todo = require('./todo');

server.on('connection', (client) => {
    console.log("Client connected");
	// This is going to be our fake 'database' for this application
    // Parse all default Todo's from db

    // FIXME: DB is reloading on client refresh. It should be persistent on new client
    // connections from the last time the server was run...
    const DB = firstTodos.map((t) => {
        // Form new Todo objects
        return new Todo(title=t.title);
        //return {title: t.title};
    });

	// Sends a message to the client to reload all todos
    const reloadTodos = () => {
        console.log("emitting reload");
        server.emit('load', DB);
    }

  	// Accepts when a client makes a new todo
    client.on('make', (t) => {
        console.log("new item got made");
        // Make a new todo
        const newTodo = new Todo(title=t.title);

        // Push this newly created todo to our database
        DB.push(newTodo);

        // Send the latest todos to the client
        // FIXME: This sends all todos every time, could this be more efficient?
        reloadTodos();
    });

    // Send the DB downstream on connect
    reloadTodos();
});

const port = 8000;
server.listen(port);
console.log('listening on port ', port);