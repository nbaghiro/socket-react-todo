import React, { Component } from 'react';
import TodoItem from './TodoItem'

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log("todo item was submitted");
        event.preventDefault();
        this.props.onAdd(this.state.value);
    }

    render() {
    	const testVals = ["item0", "item1", "item2"];
    	const listItems = testVals.map((item) => {
    		return <TodoItem value={item} />
    	});

        return (
            <div className="Todo-list">
	            <form onSubmit={this.handleSubmit}>
			        <label>
			          	Item:
			          	<input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Provide Description"/>
			        </label>
			        <input type="submit" value="Make" />
			    </form>
			    <ul>
			    	{listItems}
			    </ul>
            </div>
        );
    }
}

export default TodoList;	