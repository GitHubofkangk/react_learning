import React from 'react'
import Add from './components/Add'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

export default class App extends React.Component {
    state = {
        todos: [
            {
                id: '001',
                name: '学习',
                done: true
            },
            {
                id: '002',
                name: '游戏',
                done: true
            },
            {
                id: '003',
                name: '休息',
                done: false
            }
        ]
    }

    // 给子组件Add，用来添加todos的函数
    addTodo = (todo) => {
        // 获取state中的属性
        const { todos } = this.state
        // 更新state
        this.setState({ todos: [todo, ...todos] })
        // console.log(this.state)
    }

    // 给子孙组件Item，用来删除todo的函数
    deleteTodo = (id) => {
        // 获取状态
        const { todos } = this.state
        // 使用filter函数过滤相同的id
        const newTodos = todos.filter((todo) => {
            return todo.id !== id
        })

        /*也可以用index删除，而且效率更高，但是会更改原state中的数据，因此不建议
        todos.splice(index, 1)   // 删除列表中index位置1个元素
        */

        // 更新状态
        this.setState({ todos: newTodos })
    }

    // 给子孙组件Item，用来更新state
    updateTodo = (id, done) => {
        // 获取state
        const { todos } = this.state
        // 将数组todos中的指定id项的done改为传进来的done（将数组转变为另一个数组）
        const newTodos = todos.map((todo, index) => {
            if (todo.id === id) todo.done = done
            return todo
        })
        // 更新state
        this.setState({ todos: newTodos })
    }

    // 给子组件Footer，用来删除所有已完成
    deleteAllDone = () => {
        // 获取state中的todos
        const { todos } = this.state
        // 过滤所有done为true的项
        const newTodos = todos.filter((todo) => {
            return todo.done !== true
        })
        // 更新状态
        this.setState({ todos: newTodos })
    }

    // 给子组件Footer，用来勾选或取消勾选全部任务
    handleAllChecked = (done) => {
        // 获取状态
        const { todos } = this.state
        // 更改todos中的所有done
        /*  标准写法
        const newTodos = todos.map((todo) => {
            todo.done = done
            return todo
        })
        */
        /* 简单写法：箭头函数中，
        如果左边参数只有一个可以省略括号；
        如果右边语句只有一个时，可以省略花括号，
        且是return语句，return也可以省略
        但是返回的是对象时，箭头函数会将花括号当做自己的语句块，此时花括号内必须是完成语句
        可以使用小括号，将返回值括起来
        */
        const newTodos = todos.map(todo => ({ ...todo, done }))
        // 更新状态
        this.setState({ todos: newTodos })
    }

    render() {
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Add addTodo={this.addTodo} />
                    <List
                        todos={this.state.todos}
                        deleteTodo={this.deleteTodo}
                        updateTodo={this.updateTodo}
                    />
                    <Footer
                        todos={this.state.todos}
                        deleteDone={this.deleteAllDone}
                        handleAllChecked={this.handleAllChecked}
                    />
                </div>
            </div>
        )
    }
}