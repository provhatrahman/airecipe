import { EXTRACT_RECIPE } from '../actions/types';

const initialState = {
  recipe: {},
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXTRACT_RECIPE:
      // Update the state with the extracted recipe
      return { ...state, recipe: action.payload.recipe };
    default:
      return state;
  }
};

export default recipeReducer;
