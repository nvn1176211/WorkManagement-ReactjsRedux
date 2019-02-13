import { combineReducers } from  'redux';
import tasks from './tasks';
import displayForm from './displayForm';
import EditTask from './EditTask';
import OnSearch from './OnSearch';
import OnSort from './OnSort';

const myReducer = combineReducers({
	tasks,
	displayForm,
	EditTask,
	OnSearch,
	OnSort
});

export default myReducer;