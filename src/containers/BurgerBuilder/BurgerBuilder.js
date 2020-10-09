import React, { Component } from 'react';

import api from '../../api/api';

import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  }

  componentDidMount() {
    api.get('/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data 
        })
      })
      .catch(error => {
        this.setState({ error: true})
      })
  }

  updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key]
      })
      .reduce((sum, el) => {
        return el + sum;
      }, 0);

    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: oldCount+1
    }
    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENTS_PRICE[type]

    this.setState({totalPrice: oldPrice + priceAddition, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) return;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: oldCount-1
    }
    const oldPrice = this.state.totalPrice;
    const priceDeduction = INGREDIENTS_PRICE[type]

    this.setState({totalPrice: oldPrice - priceDeduction, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);

  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    const queryParmas = []
    for (let i in this.state.ingredients) {
      queryParmas.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParmas.push('price=' + this.state.totalPrice)
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParmas.join('&')
    });
  }


  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients can't be loaded! </p> : <Spinner />

    if(this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
          ingredientAdded={this.addIngredientsHandler} 
          ingredientRemoved={this.removeIngredientsHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
          />
        </Aux>
      )
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients} 
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    }

    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )  
  }
}

export default withErrorHandler(BurgerBuilder, api);