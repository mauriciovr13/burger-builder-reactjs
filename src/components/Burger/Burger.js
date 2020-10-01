import React from 'react';
import PropTypes from 'prop-types';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';


const Burger = ({ingredients}) => {
  let transformIngredients = Object.keys(ingredients)
  .map((key) => { return [...Array(ingredients[key])] 
  .map((_, i) => {return <BurgerIngredient key={key+i} type={key} />})})
  .reduce((arr, el) => {
    return arr.concat(el)
  }, [])

  if(transformIngredients.length === 0) {
    transformIngredients = <p>Please, start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
}

Burger.propTypes = {
  ingredients: PropTypes.object,
}

export default Burger;