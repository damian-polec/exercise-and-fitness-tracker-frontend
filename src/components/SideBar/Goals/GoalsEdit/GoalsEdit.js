import React, { Component, Fragment } from 'react';

import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import { updateObject, checkValidity } from '../../../../shared/util';

import styles from './GoalsEdit.module.scss';

class GoalsEdit extends Component {
  state = {
      goal: {
        elementType: 'textarea',
        elementConfig: {
          name: 'goal',
        },
        label: 'Your Goal',
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      value:''
  }
  
  componentDidMount() {
    const button = document.querySelector('#Add_Goal');
    button.addEventListener('click', this.clearInput);
  };

  componentWillUnmount() {
    const button = document.querySelector('#Add_Goal');
    button.removeEventListener('click', this.clearInput);
  }

  clearInput = () => {
    const updateInput = updateObject(this.state.goal, {
      value: ''
    })
    this.setState({
      goal: updateInput
    })
  }
  inputChangeHandler = (event, inputId) => {
    const updatedInputElement = updateObject(this.state.goal, {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.goal.validation),
      touched: true
    })
    this.setState({
      goal: updatedInputElement,
      value: event.target.value
    });
  }

  render() {
    let form = (
      <form
        onSubmit={(event) => this.props.onSubmit(event)} 
        className={styles.Goal_Edit}>
        <div className={styles.Form_Control}>
            <Input
              design='SideBar_Form'
              change={(event) => this.inputChangeHandler(event)}              
              elementType={this.state.goal.elementType}
              elementConfig={this.state.goal.elementConfig}
              value={this.state.goal.value} 
            />
            <Button
              id='Add_Goal' 
              design='Note_Button'
              onClick={event => this.props.onClick(event, this.state.value)}>Add Goal</Button>
        </div>
      </form>
    )
    return (
      <Fragment>
        {form}
      </Fragment>
    )
  }
} 

export default GoalsEdit;