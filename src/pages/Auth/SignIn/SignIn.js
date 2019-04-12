import React, { Component } from 'react';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { updateObject } from '../../../shared/util'
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
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
          name: 'password'
        },
        label: 'Password',
        value: ''
      },
    }
  }

  inputChangeHandler = (event, inputId) => {
    const updatedInputElement = updateObject(this.state.signInForm[inputId], {
      value: event.target.value
    })
    const updatedSignInForm = updateObject(this.state.signInForm, {
      [inputId]: updatedInputElement
    });

    this.setState({signInForm: updatedSignInForm});
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
            />
        ))}
        <Button
          design='FormButton'>Sign In</Button>
      </form>
    )
  }
}

export default SignIn;