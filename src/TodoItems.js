import React, { Component } from 'react'

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableIndex: -1,
      value: '',
    }
  }

  editHandler = (e, item, index) => {
    e.preventDefault();
    this.setState({
      editableIndex: index,
      value: item.text,
    });
  }

  deleteHandler = (e, value) => {
    e.preventDefault();
    this.setState({
      editableIndex: -1,
    }, () => {
      this.props.deleteItem(value);
    });
  }

  saveHandler = (index) => {
    const { value } = this.state;
    this.props.onUpdate(value, index);
    this.setState({
      editableIndex: -1,
      value: ''
    });
  }

  changeHandler = (e) => {
    const { target: { value } } = e;
    this.setState({
      value,
    });
  }

  createTasks = (item, index) => {
    const { editableIndex, value } = this.state;
    if (editableIndex === index) {
      return (
        <li key={item.key}>
          <input text="" value={value} onChange={this.changeHandler} />
          <button onClick={() => this.saveHandler(index)}>save</button>
        </li>
      )
    }
    return (
      <li key={item.key}>
        {item.text}
        <a href="" onClick={(e) => this.deleteHandler(e, item.key)}>delete</a> |
        <a href="" onClick={(e) => this.editHandler(e, item, index)}>edit</a>
      </li>
    )
  }

  render() {
    const todoEntries = this.props.entries
    const listItems = todoEntries.map(this.createTasks);
    return <ul className="theList">{listItems}</ul>
  }
}

export default TodoItems
