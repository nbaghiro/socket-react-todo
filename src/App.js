import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import {callServer, listenToServer} from './client';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            loading: true,
            todos: []
        };

        this.updateCB = this.updateCB.bind(this);
        this.handleOfflineCase = this.handleOfflineCase.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onCompleteAll = this.onCompleteAll.bind(this);
        this.onToggleStatusOne = this.onToggleStatusOne.bind(this);
        this.onDeleteAll = this.onDeleteAll.bind(this);
        this.onDeleteOne = this.onDeleteOne.bind(this);

        listenToServer(this.updateCB);

        setTimeout(this.handleOfflineCase, 2000);
    } 

    handleOfflineCase() {
        //After 2 seconds if socket is still not connected then we will assume that it failed to connect
        if(!this.state.connected) {
            let cachedTodos = JSON.parse(localStorage.getItem("todos"));
            if(cachedTodos == null) {cachedTodos = [];}
            this.setState({loading: false, todos: cachedTodos});
        }
    }

    updateCB(event, data='') {
        let newTodos = this.state.todos;
        let socketConnected = true;
        switch(event) {
            case "disconnect":
                socketConnected = false;
                break;
            case "load":
                newTodos = data;
                break;
            case "itemAdded":               
                newTodos.push(data);
                break;
            case "itemDeleted":               
                for (var i = 0; i < newTodos.length; i++) {
                    let todo = newTodos[i];
                    if(todo.title === data.title) {
                        break;
                    }
                }
                newTodos.splice(i, 1);
                break;
            case "itemStatusToggled":               
                for (let i = 0; i < newTodos.length; i++) {
                    let todo = newTodos[i];
                    if(todo.title === data.title) {
                        todo.status = (todo.status === "todo" ? "done" : "todo");
                    }
                }
                break;
            case "allCompleted":               
                for (let i = 0; i < newTodos.length; i++) {
                    newTodos[i].status = "done";
                }
                break;
            case "allDeleted":               
                newTodos = [];
                break;
            default:
                break;
        }
        localStorage.setItem("todos", JSON.stringify(newTodos));
        this.setState({todos: newTodos, loading: false, connected: socketConnected});
    }

    onAdd(item) {
        if(!this.state.connected) return;
        callServer("make", { title : item });
    }

    onCompleteAll() {
        if(!this.state.connected) return;
        callServer("completeAll");
    }

    onToggleStatusOne(todo) {
        if(!this.state.connected) return;
        callServer("toggleStatusOne", todo);
    }

    onDeleteAll() {
        if(!this.state.connected) return;
        callServer("deleteAll");
    }

    onDeleteOne(todo) {
        if(!this.state.connected) return;
        callServer("deleteOne", todo);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Real-time Todo App</h1>
                </header>
                {
                    this.state.loading ? 
                    <div> Synching ...  </div> : 
                    <TodoList 
                        onAdd={this.onAdd} 
                        onCompleteAll={this.onCompleteAll} 
                        onToggleStatusOne={this.onToggleStatusOne} 
                        onDeleteAll={this.onDeleteAll}                    
                        onDeleteOne={this.onDeleteOne} 
                        todos={this.state.todos}
                        connected={this.state.connected}
                    />
                }                
            </div>
        );
    }
}

export default App;
