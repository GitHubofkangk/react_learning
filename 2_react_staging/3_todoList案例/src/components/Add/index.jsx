import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './index.css'

/*
父子组件的通信：
    1. 父 ==> 子孙：作为子孙的props传入
    2. 子 ==> 父：  基本方法，父给子一个函数prop，子调用父中的该函数，在父中实现数据传递。
*/

class Add extends Component {
    // 处理键盘事件
    handleKeyUp = (event) => {
        // 仅回车键生效，判断按键码
        if (event.keyCode !== 13) return
        // 数据校验
        const { value } = event.target
        if (value.trim() === '') return alert('输入的内容不能为空')
        // 生成新的todo，id可以使用uuid库生成，name=value，done=false
        const todo = { id: uuidv4(), name: value, done: false }
        // 传给父组件，调用父组件给的函数
        this.props.addTodo(todo)
        // console.log(todo)
        // 清空输入框，不能直接使用value（次变量仅是一个引用）
        event.target.value = ''
    }
    render() {
        return (
            <div className="todo-header">
                {/*在input中绑定按键事件，按下回车键（当松开按键时，事件生效）*/}
                <input type="text" onKeyUp={this.handleKeyUp} placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        );
    }
}

export default Add;