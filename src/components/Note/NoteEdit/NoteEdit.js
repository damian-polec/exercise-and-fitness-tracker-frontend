import React, { Component } from 'react';

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
          placeholder: '',
          name: 'time',
        },
        label: 'Time',
        value: ''
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
    const inputId = Object.keys(this.state.exerciseForm)[0];
    return (
      <form className={styles.Note_Edit}>
        <Input
          design='Note_Form'
          change={(event) => this.inputChangeHandler(event, inputId)}
          label={this.state.exerciseForm.time.label} 
          elementType={this.state.exerciseForm.time.elementType}
          elementConfig={this.state.exerciseForm.time.elementConfig}
          value={this.state.exerciseForm.time.value} 
        />
        <Button
          design='Note_Button'>Submit</Button>
      </form>
    )
  }
} 

export default NoteEdit;