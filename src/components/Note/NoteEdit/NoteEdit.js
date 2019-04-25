import React, { Component, Fragment } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { updateObject, checkValidity } from '../../../shared/util';

import styles from './NoteEdit.module.scss';

class NoteEdit extends Component {
  state = {
    exerciseForm: {
      time: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Time(i.e 15:00)',
          name: 'time',
        },
        label: 'Time',
        value: '',
        validation: {
          required: true,
          isTime: true
        },
        valid: false,
        touched: false
      },
      exerciseType: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'running', displayValue: 'Running'},
            {value: 'swimming', displayValue: 'Swimming'},
            {value: 'walking', displayValue: 'Walking'},
            {value: 'yoga', displayValue: 'Yoga'},
            {value: 'gym', displayValue: 'Gym'},
            {value: 'sport', displayValue: 'Sport'}
          ]
        },
        label: 'Exercise Type',
        value: 'running',
        valid: true
      }
    },
    isValid: false
  }

  inputChangeHandler = (event, inputId) => {
    const updatedInputElement = updateObject(this.state.exerciseForm[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.exerciseForm[inputId].validation),
      touched: true
    })
    const updatedExerciseForm = updateObject(this.state.exerciseForm, {
      [inputId]: updatedInputElement
    });
    let formIsValid = true;
    for(let input in updatedExerciseForm ) {
      formIsValid = updatedExerciseForm[input].valid && formIsValid;
    }

    this.setState({
      exerciseForm: updatedExerciseForm,
      isValid: formIsValid
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.exerciseForm) {
        formElementsArray.push({
            id: key,
            config: this.state.exerciseForm[key]
        });
    }
    let form = (
      <form
        onSubmit={(event) => this.props.onSubmit(event)} 
        className={styles.Note_Edit}>
        <div className={styles.Form_Control}>
          <Button 
            design='Add_Button'
            disabled={!this.state.isValid}
            onClick={(event) => this.props.onClick(event, this.state.exerciseForm.exerciseType.value, this.state.exerciseForm.time.value)}>+</Button>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              design='Note_Form'
              change={(event) => this.inputChangeHandler(event, formElement.id)}              
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value} 
              invalid={!formElement.config.valid}
              validationType={formElement.config.validation}
              isTouched={formElement.config.touched}
              formType = 'Note'
            />
          ))}
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

export default NoteEdit;