import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Sort extends Component {
  
  onSort = (sortBy, sortValue) =>{
    var sort = {
      by: sortBy,
      value: sortValue
    }
    this.props.onSort(sort);
  }

  render() {
    var { sort } = this.props;
    return (
      <div className="col-sm-6">
        <div className="dropdown">
          <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-calendar"></i> Sort
          </button>
          <div className="dropdown-menu">
            <a 
              href="#1"
              className={ (sort.by === 'name' && sort.value === 1) ? "dropdown-item sort_selected" : "dropdown-item"} 
              onClick={ () => this.onSort('name', 1) }
            ><i className="fa fa-sort-alpha-asc"></i>&nbsp; Name A-Z</a>
            <a 
              href="#1"
              className={ (sort.by === 'name' && sort.value === -1) ? "dropdown-item sort_selected" : "dropdown-item"} 
              onClick={ () => this.onSort('name', -1) }
            ><i className="fa fa-sort-alpha-desc"></i>&nbsp; Name Z-A</a>
            <div className="dropdown-divider"></div>
            <a 
              href="#1"
              className={ (sort.by === 'status' && sort.value === 1) ? "dropdown-item sort_selected" : "dropdown-item"} 
              onClick={ () => this.onSort('status', 1) }
            >Active</a>
            <a 
              href="#1"
              className={ (sort.by === 'status' && sort.value === -1) ? "dropdown-item sort_selected" : "dropdown-item"} 
              onClick={ () => this.onSort('status', -1) }
            >Deactive</a>
          </div>
        </div>      
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    sort: state.OnSort
  }
}

const mapDispactToProps = (dispact, action) => {
  return {
    onSort: (sort) => {
      dispact(actions.onSort(sort));
    }
  }
}

export default connect(mapStateToProps, mapDispactToProps)(Sort);
