import { combineReducers } from 'redux';
import ajaxStatusReducer from './reducers/ajaxStatusReducer';
import newsReducer from './reducers/newsReducer';

export default combineReducers({
    ajaxStatus: ajaxStatusReducer,
    news: newsReducer
})
