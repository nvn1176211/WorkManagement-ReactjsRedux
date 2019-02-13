import * as types from '../constants/ActionTypes';

var initialState = {
	by: '',
	value: ''
};

var myReducer = (state = initialState, action) =>{
	switch(action.type){
		case types.SORT:
			return {
				by: action.sort.by,
				value: action.sort.value
			}
		default: return state;
	}
}

export default myReducer;