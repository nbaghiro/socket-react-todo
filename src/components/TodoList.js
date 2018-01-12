import React, { Component } from 'react';
import TodoItem from './TodoItem';
import {ListGroup, ListGroupItem, FormControl, InputGroup, SplitButton, MenuItem} from 'react-bootstrap';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            todos: props.todos,
            connected: props.connected
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        //TODO: Focus FormControl
    }    

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleAdd(event) {
        this.props.onAdd(this.state.value);
        this.setState({value: ""});
        //TODO: Focus FormControl
    }

    componentWillReceiveProps(nextProps) {
        console.log("TodoList received new props");
        this.setState({todos: nextProps.todos, connected: nextProps.connected});
    }

    render() {
        const todos = this.state.todos;
        console.log(todos);
    	const listItems = todos.map((item) => {
    		return <TodoItem onDelete={this.props.onDeleteOne} onToggleStatus={this.props.onToggleStatusOne} todo={item} />
    	});
        console.log("TodoList will render");

        return (
            <div className="Todo-list">   
                <ListGroup>
                    {!this.state.connected ?
                        <ListGroupItem bsStyle="warning">
                            Offline Mode Activated. You will not be able to perform action on any Todo List item until we get back online 
                        </ListGroupItem> :
                        <div/>
                    }
                    <ListGroupItem bsStyle="success">
                        <InputGroup>
                            <FormControl
                                bsStyle=""
                                type="text"
                                value={this.state.value}
                                placeholder="Provide Item Description"
                                onChange={this.handleChange}
                            />
                            <InputGroup.Button>
                                <SplitButton title="Add" pullRight onClick={this.handleAdd}>
                                    <MenuItem onClick={this.props.onCompleteAll}>Complete All</MenuItem>
                                    <MenuItem onClick={this.props.onDeleteAll}>Delete All</MenuItem>
                                </SplitButton>
                            </InputGroup.Button>
                        </InputGroup>
                    </ListGroupItem>
                    {listItems}
                </ListGroup>             
            </div>
        );
    }
}

export default TodoList;	