import * as actionType from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENTS_PRICE = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
      }
    case actionType.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1 
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
      }
    case actionType.SET_INGREDIENTS: 
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
      }
      case actionType.FETCH_INGREDIENTS_FAILS: 
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default reducer;