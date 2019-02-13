import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';


class App extends Component {

  toggleForm = () => {
    if(this.props.taskEditing && this.props.displayForm){
      this.props.editTask({
        id: '',
        name: '',
        status: false
      });
    }else{
     this.props.toggleForm();
    }
  }

  render() {
    var { displayForm } = this.props;

    return (
      <div className="container mt-3">
        <h1 className="text-center">Time Management</h1>
        <div className="row mt-5">
          <div className={ displayForm ? "col-sm-4" : ""}>
            <TaskForm />
          </div>
          <div className={ displayForm ? "col-sm-8": "col-sm-12"}>
            <div>
              <button 
                type="button" 
                className="btn btn-primary w-25"
                onClick= { this.toggleForm }
              >
                <i className="fa fa-plus"></i> Add Work
              </button>
            </div>
            <Control />
            <TaskList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    displayForm: state.displayForm,
    taskEditing: state.EditTask
  }
}

const mapDispactToProps = (dispact, action) => {
  return {
    toggleForm: () => {
      dispact(actions.toggleForm());
    },
    editTask: (task) => {
      dispact(actions.editTask(task));
    }
  }
}

export default connect(mapStateToProps, mapDispactToProps)(App);
