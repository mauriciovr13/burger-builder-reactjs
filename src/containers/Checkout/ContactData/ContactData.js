import React, {Component} from 'react'

import api from '../../../api/api';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

class ContactData extends Component {
  state ={
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        valueType: 'name',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        valueType: 'street',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      number: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        valueType: 'zip code',
        value: '',
        validation: {
          required: true,
          minLength: 8,
          maxLength: 9
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Contry',
        },
        valueType: 'country',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        valueType: 'email address',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: '',
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  }

  checkValidity = (value, rules) => {
    let isValid = false;
    
    if(!rules) return true;

    if(rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength;
    }

    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true })
    const formData ={};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    api.post('/orders.json', order)
      .then(response => {
        console.log(response)
        this.setState({ loading: false })
        this.props.history.push('/'); 
      })
      .catch(error => {
        console.log(error)
        this.setState({ loading: false })
      })
  }

  inputChangedHandler = (event, inputIndetifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }

    const updatedFormElement = {...updatedOrderForm[inputIndetifier]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIndetifier] = updatedFormElement;

    let formIsValid =  true;
    for (let inputIndetifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIndetifier].valid && formIsValid
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });

  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              valueType={formElement.config.valueType}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          ))}
          <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
    );
    if(this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;