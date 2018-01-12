import React, { Component } from 'react';
import {Button, Glyphicon, ButtonGroup, ListGroupItem} from 'react-bootstrap';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todo: props.todo
        };
    } 

    componentWillReceiveProps(nextProps) {
        console.log("TodoItem received new props");
        this.setState({todo:nextProps.todo});
    }

    render() {
        const todo =  this.state.todo;   
        const isDone = todo.status === "done";
        return (
            <ListGroupItem bsStyle= {isDone ? "success" : ""} className="Todo-item">
                {todo.title + (isDone ? " (Done!)" : "")}
                <ButtonGroup className="pull-right">                
                    <Button bsStyle="link" onClick={()=>{this.props.onDelete(todo)}}>
                        <Glyphicon glyph="trash" />
                    </Button>
                    <Button bsStyle="link" onClick={()=>{this.props.onToggleStatus(todo)}}>
                        <Glyphicon glyph={isDone ? "ok" : "check"} />
                    </Button>
                </ButtonGroup>
            </ListGroupItem>
        );
    }
}

export default TodoItem;	