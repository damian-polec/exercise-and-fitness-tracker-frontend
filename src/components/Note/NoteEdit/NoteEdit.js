import React, { Component, Fragment } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { updateObject } from '../../../shared/util';

import styles from './NoteEdit.module.scss';

class NoteEdit extends Component {
  state = {
    exerciseForm: {
      time: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Time(15:00)',
          name: 'time',
        },
        label: 'Time',
        value: ''
      },
      exerciseType: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'running', displayValue: 'Running'},
            {value: 'swimming', displayValue: 'Swimming'}
          ]
        },
        label: 'Exercise Type',
        value: 'running',
      }
    }
  }

  inputChangeHandler = (event, inputId) => {
    const updatedInputElement = updateObject(this.state.exerciseForm[inputId], {
      value: event.target.value
    })
    const updatedExerciseForm = updateObject(this.state.exerciseForm, {
      [inputId]: updatedInputElement
    });

    this.setState({exerciseForm: updatedExerciseForm});
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
            onClick={(event) => this.props.onClick(event, this.state.exerciseForm.exerciseType.value, this.state.exerciseForm.time.value)}>+</Button>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              design='Note_Form'
              change={(event) => this.inputChangeHandler(event, formElement.id)}              
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value} 
            />
          ))}
        </div>
        <Button
          design='Note_Button'>Submit</Button>
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