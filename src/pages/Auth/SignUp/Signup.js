import React, { Component } from 'react';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { updateObject } from '../../../shared/util'
import styles from './Signup.module.scss';

class SignUp extends Component {
  state= {
    signUpForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
          name: 'name',
        },
        label: 'Name',
        value: ''
      },
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
      confirmPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm Password',
          name: 'confirmPassword'
        },
        label: 'Confirm Password',
        value: ''
      }
    }
  }

  inputChangeHandler = (event, inputId) => {
    const updatedInputElement = updateObject(this.state.signUpForm[inputId], {
      value: event.target.value
    })
    const updatedSignUpForm = updateObject(this.state.signUpForm, {
      [inputId]: updatedInputElement
    });

    this.setState({signUpForm: updatedSignUpForm});
  }


  render() {
    const formElements = [];
    for (let key in this.state.signUpForm) {
      formElements.push({
        id: key,
        config: this.state.signUpForm[key]
      })
    }
    const formData = {};
    for(let inputId in this.state.signUpForm) {
      formData[inputId] = this.state.signUpForm[inputId].value
    }

    return (
      <form 
        onSubmit={event => this.props.onSignUp(event, formData)}
        className={styles.SignUpForm}>
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
          design='FormButton'>Sign Up</Button>
        <p>Got an account? Switch to Sign In!</p>
        <Button
          design='FormButton'>Switch to Sign In</Button>
      </form>
    )
  }
}

export default SignUp