import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import {add, completeAll, toggleStatusOne, deleteAll, deleteOne, listenToServer} from './client';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            todos: []
        };

        this.updateCB = this.updateCB.bind(this);

        listenToServer(this.updateCB);
    } 

    updateCB(event, data) {
        console.log("UpdateCB called: " + event);

        let newTodos = this.state.todos;
        switch(event) {
            case "load":
                newTodos = data;
                break;
            case "itemAdded":               
                newTodos.push(data);
                break;
            default:
                break;
        }
        this.setState({todos: newTodos, loading: false});
    }

    onAdd(item) {
        add(item);
    }

    onCompleteAll() {
        completeAll();
    }

    onToggleStatusOne(todo) {
        toggleStatusOne(todo);
    }

    onDeleteAll() {
        deleteAll();
    }

    onDeleteOne(todo) {
        deleteOne(todo);
    }

    render() {
        let curTodos = this.state.todos;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Real-time Todo App</h1>
                </header>
                {
                    this.state.loading ? 
                    <div> Loading ...  </div> : 
                    <TodoList 
                        onAdd={this.onAdd} 
                        onCompleteAll={this.onCompleteAll} 
                        onToggleStatusOne={this.onToggleStatusOne} 
                        onDeleteAll={this.onDeleteAll}                    
                        onDeleteOne={this.onDeleteOne} 
                        todos={curTodos}
                    />
                }                
            </div>
        );
    }
}

export default App;
