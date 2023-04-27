import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';

const appReducer = combineReducers({
  recipe: recipeReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
