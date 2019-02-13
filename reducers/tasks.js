import * as types from '../constants/ActionTypes';

const s4 = () => {
  return Math.floor((Math.random() + 1) * 10000).toString(16);
}
const generateID = () => {
  return s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) =>{
	switch(action.type){
		case types.LIST_ALL: return state;

		case types.SAVE_TASK:
			var newTask = {
				id: action.task.id,
				name: action.task.name,
				status: action.task.status
			}
			if(action.task.id){
				state.forEach( (task, index) => {
					if(task.id === action.task.id){
						state[index] = newTask
					}
				});
			}else{
				newTask.id = generateID();
				state.push(newTask);
			}			
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];

		case types.UPDATE_STATUS_TASK:
			state.forEach((task, index) => {
			  if(task.id === action.id){
			  	var cloneTask = {...state[index]};
			  	cloneTask.status = !cloneTask.status;
			  	state[index] = cloneTask;
			  }
			});
			localStorage.setItem("tasks", JSON.stringify(state));
			return [...state];

		case types.DELETE_TASK:
			state.forEach((task, index) => {
			  if(task.id === action.id){
			    state.splice(index, 1);
			  }
			});
			localStorage.setItem("tasks", JSON.stringify(state));
			return [...state];

		default: return state;
	}
}

export default myReducer;

