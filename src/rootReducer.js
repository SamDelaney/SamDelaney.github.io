import {combineReducers} from 'redux';

const defaultState = {};

export const tempReducer = (state, action) => {
    if (typeof state === 'undefined') {
      state = defaultState // If state is undefined, initialize it with a default value
    }
    
    return state;
}

const rootReducer = combineReducers({
    temp: tempReducer
  });
  
  export default rootReducer;