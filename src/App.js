import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import {add, completeAll, toggleStatusOne, deleteAll, deleteOne, listenToServer} from './client';

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
        //After 2 seconds if socket is still not connected then we will assume that it fails to connect
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
            default:
                break;
        }
        localStorage.setItem("todos", JSON.stringify(newTodos));
        this.setState({todos: newTodos, loading: false, connected: socketConnected});
    }

    onAdd(item) {
        if(!this.state.connected) return;
        add(item);
    }

    onCompleteAll() {
        if(!this.state.connected) return;
        completeAll();
    }

    onToggleStatusOne(todo) {
        if(!this.state.connected) return;
        toggleStatusOne(todo);
    }

    onDeleteAll() {
        if(!this.state.connected) return;
        deleteAll();
    }

    onDeleteOne(todo) {
        if(!this.state.connected) return;
        deleteOne(todo);
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
