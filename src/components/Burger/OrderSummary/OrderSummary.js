import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map(key => {
        return (
          <li key={key}>
            <span style={{ textTransform: 'capitalize' }}>{key}</span>: {this.props.ingredients[key]}
          </li>
        )
      });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicius burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.purchaseCanceled} btnType='Danger'>CANCEL</Button>
        <Button clicked={this.props.purchaseContinued} btnType='Success'>CONTINUE</Button>
      </Aux>
    );
  }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number,
  purchaseCanceled: PropTypes.func,
  purchaseContinued: PropTypes.func
}

export default OrderSummary;