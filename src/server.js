const server = require('socket.io')();
const firstTodos = require('../data');
const Todo = require('./todo');
const fs = require('fs');

function updateDataJson(data) {
    fs.writeFile("data.json", JSON.stringify(data), (err) => {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

server.on('connection', (client) => {
	// This is going to be our fake 'database' for this application
    // Parse all default Todo's from db
    const DB = firstTodos.map((t) => {
        return new Todo(title=t.title, status=t.status);
    });
    
	// Sends a message to the client to reload all todos
    const reloadTodos = () => {
        server.emit('load', DB);
    }

  	// Accepts when a client makes a new todo
    client.on('make', (item) => {
        const newTodo = new Todo(title=item.title);
        DB.push(newTodo);
        updateDataJson(DB);
        server.emit('itemAdded', newTodo);
    });

    client.on('completeAll', () => {
        for (var i = 0; i < DB.length; i++) {
            DB[i].status = "done";
        }
        updateDataJson(DB);
        reloadTodos();
    });

    client.on('toggleStatusOne', (item) => {
        for (var i = 0; i < DB.length; i++) {
            let todo = DB[i];
            if(todo.title === item.title) {
                todo.status = (todo.status === "todo" ? "done" : "todo");
            }
        }
        updateDataJson(DB);
        reloadTodos();
    });

    client.on('deleteAll', () => {
        DB.splice(0, DB.length);
        updateDataJson(DB);
        reloadTodos();
    });

    client.on('deleteOne', (item) => {
        for (var i = 0; i < DB.length; i++) {
            let todo = DB[i];
            if(todo.title === item.title) {
                break;
            }
        }
        DB.splice(i, 1);
        updateDataJson(DB);
        reloadTodos();
    });

    // Send the DB downstream on connect
    reloadTodos();
});

const port = 8000;
server.listen(port);
console.log('listening on port ', port);