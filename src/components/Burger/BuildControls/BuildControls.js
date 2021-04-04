import React from 'react';
import PropTypes from 'prop-types';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'}
]

const BuildControls = ({price, ingredientAdded, ingredientRemoved, disabled, purchasable, ordered}) => (
  <div className={classes.BuildControls}>
    <p>Current price: <strong>{price.toFixed(2)}</strong></p>
    {controls.map(({label, type}) => (
      <BuildControl 
        key={label} 
        label={label} 
        added={() => ingredientAdded(type)}
        removed={() => ingredientRemoved(type)}
        disabled={disabled[type]}
      />
    ))}
    <button 
      className={classes.OrderButton} 
      disabled={!purchasable} 
      onClick={ordered}
    >
        ORDER NOW
    </button>
  </div>
);

BuildControls.propTypes = {
  price: PropTypes.number,
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
  disabled: PropTypes.object,
  purchasable: PropTypes.bool,
  ordered: PropTypes.func
}

export default BuildControls;