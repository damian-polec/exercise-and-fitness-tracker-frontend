import React, { Component } from 'react';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../shared/util'
import styles from './SignIn.module.scss';

class SignIn extends Component {
  state= {
    signInForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-Mail Address',
          name: 'email'
        },
        label: 'Email',
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
          name: 'password'
        },
        label: 'Password',
        value: '',
        validation: {
          required: true,
          isPassword: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isLoading: false
  }

  inputChangeHandler = (event, inputId) => {
    const updatedInputElement = updateObject(this.state.signInForm[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.signInForm[inputId].validation),
      touched: true
    })
    const updatedSignInForm = updateObject(this.state.signInForm, {
      [inputId]: updatedInputElement
    });

    let formIsValid = true;
    for(let input in updatedSignInForm ) {
      formIsValid = updatedSignInForm[input].valid && formIsValid;
    }

    this.setState({
      signInForm: updatedSignInForm,
      formIsValid: formIsValid
    });
  }


  render() {
    const formElements = [];
    for (let key in this.state.signInForm) {
      formElements.push({
        id: key,
        config: this.state.signInForm[key]
      })
    }
    const formData = {};
    for(let inputId in this.state.signInForm) {
      formData[inputId] = this.state.signInForm[inputId].value
    }

    return (
      <form 
        onSubmit={event => this.props.onLogin(event, formData)}
        className={styles.SignInForm}>
        {formElements.map(input => (
          <Input
            key={input.id}
            design='Sign_Form'
            change={(event) => this.inputChangeHandler(event, input.id)}
            label={input.config.label} 
            elementType={input.config.elementType}
            elementConfig={input.config.elementConfig}
            value={input.config.value}
            invalid={!input.config.valid}
            validationType={input.config.validation}
            isTouched={input.config.touched}
            />
        ))}
        <Button
          disabled={!this.state.formIsValid || this.props.isLoading}
          design='FormButton'>Login {this.props.isLoading ? <Spinner design='Loader_Button'/> : null}</Button>
      </form>
    )
  }
}

export default SignIn;