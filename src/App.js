import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import {add, listenToServer} from './client';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timestamp: 'no timestamp yet'
        };

        listenToServer();
    } 

    onAdd(item) {
        add(item);
    }

    onCompleteAll() {
        console.log("Complete All from props");
    }

    onDeleteAll() {
        console.log("Delete all from props");
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Real-time Todo App</h1>
                </header>
                <TodoList onAdd={this.onAdd} onCompleteAll={this.onCompleteAll} onDeleteAll={this.onDeleteAll}/>
            </div>
        );
    }
}

export default App;
