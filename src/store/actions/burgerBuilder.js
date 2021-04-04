import * as actionTypes from './actionTypes';
import api from '../../api/api';

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName
  }
}

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILS
  }
}

export const initIngredients = () => {
  return dispatch => {
    api.get('/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      })
  };
}