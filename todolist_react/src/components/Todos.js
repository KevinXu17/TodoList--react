import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component {


    render() {
        return this.props.todos.map((todo) => (
            <div>
                <TodoItem key={todo.id}  
                          todo={todo} 
                          markComplete={this.props.markComplete} 
                          delTodo={this.props.delTodo}> 
                          </TodoItem> 
            </div>
            
           )
        );
    }
}

// prop type check
Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
    //todo: PropTypes.array.isRequired
}
    

export default Todos;
