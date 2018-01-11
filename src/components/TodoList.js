import React, { Component } from 'react';
import TodoItem from './TodoItem';
import {ListGroup, ListGroupItem, FormControl, FormGroup, InputGroup, SplitButton, MenuItem} from 'react-bootstrap';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCompleteAll = this.handleCompleteAll.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
    }    

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleAdd(event) {
        console.log("todo item was submitted");
        this.props.onAdd(this.state.value);
    }

    handleCompleteAll(event) {
        console.log("complete all");
        this.props.onCompleteAll();
    }

    handleDeleteAll(event) {
        console.log("delete all");
        this.props.onDeleteAll();
    }

    render() {
    	const testVals = ["Do the dishes", "Code the world", "Go to the gym", "Have dinner"];
    	const listItems = testVals.map((item) => {
    		return <TodoItem value={item} />
    	});

        return (
            <div className="Todo-list">   
                <ListGroup>
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
                                    <MenuItem onClick={this.handleCompleteAll}>Complete All</MenuItem>
                                    <MenuItem onClick={this.handleDeleteAll}>Delete All</MenuItem>
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