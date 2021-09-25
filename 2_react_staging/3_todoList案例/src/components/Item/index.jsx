import React, { Component } from 'react';
import './index.css'

class Item extends Component {
    // 鼠标状态
    state = { mouseIsEnter: false }

    // 处理鼠标进入进入标签
    handleMouse = (mouseIsEnter) => {
        return () => {
            this.setState({ mouseIsEnter })
        }
    }

    // 删除todo的回调
    handleDelete = (id) => {
        return (event) => {
            // 让App组件删除指定id的数据，需要调用爷爷组件传过来的方法
            if (window.confirm('确定删除吗？')) {
                this.props.deleteTodo(id)
            }
            // 测试
            // console.log(id)
        }
    }

    // 处理勾选和取消勾选的回调
    handleCheck = (id) => {
        return (event) => {
            this.props.updateTodo(id, event.target.checked)
        }
    }

    render() {
        const { id, name, done } = this.props
        const { mouseIsEnter } = this.state
        return (
            <li
                onMouseEnter={this.handleMouse(true)}
                onMouseLeave={this.handleMouse(false)}
                className={mouseIsEnter ? 'active' : ''}
            >
                {/*
                    2. 删除功能的实现
                        1. 当鼠标进入li标签时，显示按钮并高亮（可以使用style实现，也可以css中实现）；当鼠标离开标签时，隐藏按钮
                        2. 给按钮添加删除功能
                    */}
                <label>
                    {/* 
                    1. 在react中input标签中，如果使用checked，那么可选框会变成只读的，不能再修改。
                            解决方法：1. 绑定onChange事件
                                    2. 使用defaultcChecke。（该属性，只会在第一次渲染生效）
                    2. react需要通过更改state，然后由state驱动更新页面。
                            如果使用defaultChecked，仅在第一次渲染时生效，后续更改state时，无法生效。
                                后续可以自由勾选，但是本身受state影响。
                            如果使用checked，每次点击勾选框，都会生效，而且是根据state而生效。
                                因此需要搭配使用onChange去更改state。
                    */}
                    {/*<input type="checkbox" defaultChecked={done} onChange={this.handleCheck(id)} />*/}
                    <input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
                </label>
                <span>{name}</span>
                <button
                    className="btn btn-dange"
                    style={{ display: this.state.mouseIsEnter ? 'block' : 'none' }}
                    onClick={this.handleDelete(id)}
                >删除</button>
            </li >
        );
    }
}

export default Item;