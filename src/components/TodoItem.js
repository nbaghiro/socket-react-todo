import React, { Component } from 'react';
import {Button, Glyphicon, ButtonGroup, ListGroupItem} from 'react-bootstrap';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };

        this.onDelete = this.onDelete.bind(this);
    } 

    onDelete() {
        console.log("item deleted");
    }

    onComplete() {
        console.log("item completed");
    }

    render() {
        return (
            <ListGroupItem className="Todo-item clearfix">
                {this.state.value}
                <ButtonGroup className="pull-right">                
                    <Button bsStyle="link" onClick={this.onDelete}>
                        <Glyphicon glyph="trash" />
                    </Button>
                    <Button bsStyle="link" onClick={this.onComplete}>
                        <Glyphicon glyph="check" />
                    </Button>
                </ButtonGroup>
            </ListGroupItem>
        );
    }
}

export default TodoItem;	