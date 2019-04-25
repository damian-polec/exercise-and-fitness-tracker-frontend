import React, { useState, Fragment } from 'react';

import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import { updateObject, checkValidity } from '../../../../shared/util';

import styles from './RewardEdit.module.scss';

const rewardEdit = props => {
  const [ reward, setReward] = useState({
        elementType: 'filePicker',
        elementConfig: {
          name: 'Reward',
          type: 'file'
        },
        label: 'Choose file..',
        value: '',
        files: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
  })

  const inputChangeHandler = (event) => {
    const updatedInputElement = updateObject(reward, {
      value: event.target.value,
      files: event.target.files[0],
      label: event.target.files[0].name
      // valid: checkValidity(event.target.value, this.state.goal.validation),
      // touched: true
    })
    setReward(updatedInputElement);
  }
  const getFile = () => {
    document.getElementById('file').click();
  }
    let form = (
      <form
        encType='multipart/form-data'
        onSubmit={(event) => props.onSubmit(event)} 
        className={styles.Reward_Edit}
        >
        <div 
          className={styles.Form_Control}
          >
            <Input
              id={reward.elementConfig.type}
              design='Reward_Form'
              change={(event) => inputChangeHandler(event)}              
              elementType={reward.elementType}
              elementConfig={reward.elementConfig}
              value={reward.value}
              label={reward.label}
              onClick={getFile} 
            />
            <Button 
              design='Note_Button'
              onClick={event => props.onClick(event, reward.value, reward.files)}>Add Reward Image</Button>
        </div>
      </form>
    )
    return (
      <Fragment>
        {form}
      </Fragment>
    )
} 

export default rewardEdit;