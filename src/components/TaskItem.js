import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';


class TaskItem extends Component {
  onUpdateStatus = () =>{
    this.props.onUpdateStatus(this.props.task.id);
  }  
  removeItem = () =>{
    this.props.deleteTask(this.props.task.id);
    this.props.closeForm();
  }
  editItem = () =>{
    this.props.openFrom();
    this.props.editTask(this.props.task);
  }
  render() {
    var { index, task } = this.props;
    return (
      <tr>
        <td className="text-center align-middle">{ index + 1 }</td>
        <td className="text-center align-middle">{ task.name }</td>
        <td className="text-center align-middle">
          <span 
            className={ task.status === true ? 'fs-p badge badge-success cp' : 'fs-p badge badge-secondary cp'}
            onClick={ this.onUpdateStatus }
          >
            { task.status === true ? 'Active' : 'Deactive' }
          </span>
        </td>
        <td className="text-center align-middle">
          <button 
            type="button" 
            className="fs-p1 btn btn-warning"
            onClick={ this.editItem }
          >Edit</button>&nbsp;&nbsp;
          <button 
            type="button" 
            className="fs-p1 btn btn-danger"
            onClick={ this.removeItem }
          >Remove</button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispactToProps = (dispact, action) => {
  return {
    onUpdateStatus: (id) => {
      dispact(actions.updateStatusTask(id));
    },
    closeForm: () => {
      dispact(actions.closeForm());
    },
    deleteTask: (id) => {
      dispact(actions.deleteTask(id));
    },
    openFrom: () => {
      dispact(actions.openForm());
    },
    editTask: (task) => {
      dispact(actions.editTask(task));
    }
  }
}

export default connect(mapStateToProps, mapDispactToProps)(TaskItem);
