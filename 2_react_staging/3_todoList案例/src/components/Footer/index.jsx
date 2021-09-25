import React, { Component } from 'react';
import './index.css'

class Footer extends Component {

    // 删除所有已完成的回调
    deleteAllDone = () => {
        // 调用父组件App的方法，删除done为true的项目
        if (window.confirm('是否要删除所有已完成任务？')) {
            this.props.deleteDone()
        }
    }

    // 勾选与取消勾选全部
    handleAllChecked = (event) => {
        // 调用父组件传入的方法，将state中的done更改为event.target.checked
        this.props.handleAllChecked(event.target.checked)
    }

    render() {
        const { todos } = this.props
        const doneCount = todos.reduce((preValue, currentValue) => { return preValue + (currentValue.done ? 1 : 0) }, 0)
        return (
            <div className="todo-footer">
                <label>
                    <input
                        type="checkbox"
                        checked={todos.length === doneCount && todos.length > 0}
                        onChange={this.handleAllChecked}
                    />
                </label>
                <span>
                    <span>已完成{doneCount}</span> /全部{todos.length}
                </span>
                <button
                    className="btn btn-danger"
                    onClick={this.deleteAllDone}
                >清除已完成任务</button>
            </div>
        );
    }
}

export default Footer;