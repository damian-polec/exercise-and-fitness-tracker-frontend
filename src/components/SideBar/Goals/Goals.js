import React from 'react';

import Header from '../../UI/Header/Header';
import Button from '../../UI/Button/Button';
import styles from './Goals.module.scss';

const Goals = props => {
  return (
    <div className={styles.Goals}>
      <Header>My Goals</Header>
      <ol className={styles.GoalsList}>
      </ol>
      <Button 
        design='SideBar_Button'
        onClick={props.onGoalsHandler}>Add Goal</Button>
    </div>
  )
}

export default Goals;