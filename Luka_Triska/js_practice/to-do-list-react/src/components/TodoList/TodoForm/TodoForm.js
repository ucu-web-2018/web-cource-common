import React, {Component} from 'react';
import shortid from "shortid"

export default class TodoForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currDate: this.props.currDate,
      text: ''
    };
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      currDate: this.props.currDate,
      text: this.state.text,
      completed: false
    });
    this.setState({
      text: ''
    });

  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="container__add-todo-input"
          name="text"
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="add todo..."
        />
      </form>
    )
  }
}