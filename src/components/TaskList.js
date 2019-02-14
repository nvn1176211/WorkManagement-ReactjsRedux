import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: 'all'
    };
  }
  onFilter = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    var { tasks, keyword, sort } = this.props;
    var { filterName, filterStatus } = this.state;

    // Filter
    if (filterName) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterName) !== -1;
      });
    }
    if (filterStatus === 'active') {
      tasks = tasks.filter((task) => {
        return task.status === true;
      });
    } else if (filterStatus === 'deactive') {
      tasks = tasks.filter((task) => {
        return task.status === false;
      });
    }

    //Search
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    //Sort
    if (sort) {
      if (sort.by === 'name') {
        tasks = tasks.sort((a, b) => {
          if (a.name > b.name) return sort.value;
          else if (a.name < b.name) return -sort.value;
          else return 0
        });
      }
      if (sort.by === 'status') {
        tasks = tasks.sort((a, b) => {
          if (a.status > b.status) return -sort.value;
          else if (a.status < b.status) return sort.value;
          else return 0
        });
      }
    }

    var itemElements = tasks.map((task, index) => {
      return <TaskItem
        key={task.id}
        index={index}
        task={task}
      />;
    });

    return (
      <table className="table mt-3">
        <thead>
          <tr>
            <th className="text-center align-middle">Index</th>
            <th className="text-center align-middle">Name</th>
            <th className="text-center align-middle">Status</th>
            <th className="text-center align-middle">Action</th>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onFilter}
              />
            </td>
            <td>
              <select
                type="text"
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onFilter}
              >
                <option value='all'>All</option>
                <option value='active'>Active</option>
                <option value='deactive'>Deactive</option>
              </select>
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {itemElements}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    keyword: state.OnSearch,
    sort: state.OnSort
  }
}

export default connect(mapStateToProps, null)(TaskList);
