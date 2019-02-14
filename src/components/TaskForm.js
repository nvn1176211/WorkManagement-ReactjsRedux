import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    };
  }
  componentWillMount(){
    var { taskEditing } = this.props;
    if(taskEditing){
      this.setState({
        id: taskEditing.id,
        name: taskEditing.name,
        status: taskEditing.status
      });
    }
  }

  componentWillReceiveProps(props){   
    if(props && props.taskEditing){
      this.setState({
        id: props.taskEditing.id,
        name: props.taskEditing.name,
        status: props.taskEditing.status
      });
    }else{
      if(props.taskEditing === null){
        this.setState({
          id: '',
          name: '',
          status: false
        });
      }
    }
  }

  onChange = (event) =>{
    var target = event.target;
    var name = target.name;
    var value;
    if(name === "status"){
      value = target.value === "true" ? true : false;
    }else{
      value = target.value
    }
    this.setState({
      [name] : value
    });
  }
  onSubmit = (event) =>{
    event.preventDefault();
    this.props.onSaveTask(this.state);
    this.onClear();
  }

  onClear = () =>{
    this.props.editTask({
      id: '',
      name: '',
      status: false
    })
    this.props.closeForm();
  }

  render() {
    var { name, status, id } = this.state;
    var { displayForm } = this.props;

    if( !displayForm ) return null;
    return (
      <div className="card">
        <div className="card-header bg-warning d-flex align-items-center justify-content-between">
          <h5>{ id !== '' ? 'Work Editing' : 'Add Work'}</h5>
          <i 
            className="fa fa-times-circle cp"
            onClick={ this.onClear }
          ></i>
        </div>
        <div className="card-body">
          <form onSubmit={ this.onSubmit }>
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                className="form-control" 
                name="name"
                value={ name }
                onChange={ this.onChange }
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select 
                type="text" 
                className="form-control" 
                name="status"
                value={ status }
                onChange={ this.onChange }              
              >
                <option value={true}>
                  Active
                </option>
                <option value={false}>
                  Hidden
                </option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-warning w-25">
                Save
              </button>&nbsp;&nbsp;
              <button 
                type="button" 
                className="btn btn-danger w-25"
                onClick={ this.onClear }
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    displayForm: state.displayForm,
    taskEditing: state.EditTask
  }
}

const mapDispactToProps = (dispact, props) =>{
  return{
    onSaveTask: task => {
      dispact(actions.saveTask(task));
    },
    closeForm: () => {
      dispact(actions.closeForm());
    },
    editTask: (task) => {
      dispact(actions.editTask(task));
    }
  }
}

export default connect(mapStateToProps, mapDispactToProps)(TaskForm);
