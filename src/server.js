const server = require('socket.io')();
const firstTodos = require('../data');
const Todo = require('./todo');

server.on('connection', (client) => {
	// This is going to be our fake 'database' for this application
    // Parse all default Todo's from db

    // FIXME: DB is reloading on client refresh. It should be persistent on new client
    // connections from the last time the server was run...
    const DB = firstTodos.map((t) => {
        // Form new Todo objects
        return new Todo(title=t.title, status=t.status);
        //return {title: t.title};
    });

    console.log(DB);

	// Sends a message to the client to reload all todos
    const reloadTodos = () => {
        server.emit('load', DB);
    }

  	// Accepts when a client makes a new todo
    client.on('make', (item) => {
        const newTodo = new Todo(title=item.title);
        DB.push(newTodo);
        server.emit('itemAdded', newTodo);
    });

    client.on('completeAll', () => {
        console.log("Complete All server call");
        for (var i = 0; i < DB.length; i++) {
            DB[i].status = "done";
        }
        console.log(DB);
        reloadTodos();
    });

    client.on('toggleStatusOne', (item) => {
        console.log("Toggle One server call");
        for (var i = 0; i < DB.length; i++) {
            let todo = DB[i];
            if(todo.title === item.title) {
                todo.status = (todo.status === "todo" ? "done" : "todo");
            }
        }
        console.log(DB);
        reloadTodos();
    });

    client.on('deleteAll', () => {
        console.log("Delete All server call");
        DB.splice(0, DB.length);
        console.log(DB);
        reloadTodos();
    });

    client.on('deleteOne', (item) => {
        console.log("Delete One server call");
        for (var i = 0; i < DB.length; i++) {
            let todo = DB[i];
            if(todo.title === item.title) {
                break;
            }
        }
        DB.splice(i, 1);
        console.log(DB);
        reloadTodos();
    });

    // Send the DB downstream on connect
    reloadTodos();
});

const port = 8000;
server.listen(port);
console.log('listening on port ', port);