import React, { Component } from 'react';
import Item from '../Item'
import './index.css'

class List extends Component {
    render() {
        const { todos, deleteTodo, updateTodo } = this.props
        return (
            <ul className="todo-main">
                {todos.map((todo) => {
                    return <Item
                        key={todo.id}
                        {...todo}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                    />
                })}
            </ul>
        );
    }
}

export default List;