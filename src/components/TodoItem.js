import React, { Component } from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    } 

    render() {
        return (
            <li className="Todo-item">
                {this.state.value}
            </li>
        );
    }
}

export default TodoItem;	