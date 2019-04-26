import React, { useState, Fragment } from 'react';

import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import { updateObject } from '../../../../shared/util';

import styles from './MotivationEdit.module.scss';

const motivationEdit = props => {
  const [ motivation, setMotivation] = useState({
        elementType: 'textarea',
        elementConfig: {
          name: 'goal',
        },
        label: 'Your Goal',
        value: props.motivation,
        validation: {
          required: true,
        },
        valid: false,
        touched: false
  })

  const inputChangeHandler = (event) => {
    const updatedInputElement = updateObject(motivation, {
      value: event.target.value,
      // valid: checkValidity(event.target.value, this.state.goal.validation),
      // touched: true
    })
    setMotivation(updatedInputElement);
  }
    let form = (
      <form
        onSubmit={(event) => props.onSubmit(event)} 
        className={styles.Motivation_Edit}
        >
        <div 
          className={styles.Form_Control}
          >
            <Input
              design='SideBar_Form'
              change={(event) => inputChangeHandler(event)}              
              elementType={motivation.elementType}
              elementConfig={motivation.elementConfig}
              value={motivation.value} 
            />
            <Button 
              design='Note_Button'
              onClick={event => props.onClick(event, motivation.value)}>Add Quote</Button>
        </div>
      </form>
    )
    return (
      <Fragment>
        {form}
      </Fragment>
    )
} 

export default motivationEdit;