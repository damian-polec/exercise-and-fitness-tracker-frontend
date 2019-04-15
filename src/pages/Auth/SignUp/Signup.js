import React, { Component } from 'react';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../shared/util'
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
      },
      confirmPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm Password',
          name: 'confirmPassword'
        },
        label: 'Confirm Password',
        value: '',
        validation: {
          required: true,
          isEqual: true,
        },
        valid: false,
        touched: false
      }
    },
    isLoading: false,
    formIsValid: false
  }

  inputChangeHandler = (event, inputId) => {
    let isPass = null;
    if(inputId === 'confirmPassword') {
      isPass = this.state.signUpForm.password.value;
    }
    const updatedInputElement = updateObject(this.state.signUpForm[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.signUpForm[inputId].validation, isPass),
      touched: true
    })
    const updatedSignUpForm = updateObject(this.state.signUpForm, {
      [inputId]: updatedInputElement
    });
    let formIsValid = true;
    for(let input in updatedSignUpForm ) {
      formIsValid = updatedSignUpForm[input].valid && formIsValid;
    }
    this.setState({
      signUpForm: updatedSignUpForm,
      formIsValid: formIsValid
    });
  }

  onTransfer = () => {
    this.props.history.replace('/login');
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
            invalid={!input.config.valid}
            validationType={input.config.validation}
            isTouched={input.config.touched}
            />
        ))}
        <Button
          design='FormButton'
          disabled={!this.state.formIsValid || this.props.isLoading}>Sign Up {this.props.isLoading ? <Spinner design='Loader_Button'/> : null}</Button>
        <p>Got an account? Switch to  
          <span
            onClick={this.onTransfer} 
            className={styles.SignIn_Transfer_Link}> Sign In!</span>
        </p>
      </form>
    )
  }
}

export default SignUp