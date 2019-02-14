import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: ''
    };
  }
  onChange = (event) =>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }
  onSearch = () =>{
    this.props.onSearch(this.state.keyword.toLowerCase());
  }
  render() {
    var {keyword} = this.state;
    return (
      <div className="col-sm-6">
        <div className="input-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter key" 
            name="keyword"
            value={ keyword }
            onChange={ this.onChange }
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={ this.onSearch }>
              <i className="fa fa-search"></i> Search
            </button> 
          </div>
        </div>
      </div>
    );
  }
}

const mapDispactToProps = (dispact, action) => {
  return {
    onSearch: (keyword) => {
      dispact(actions.onSearch(keyword));
    }
  }
}

export default connect(null, mapDispactToProps)(Search);
