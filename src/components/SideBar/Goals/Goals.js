import React from 'react';

import Header from '../../UI/Header/Header';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import styles from './Goals.module.scss';

const Goals = props => {
  let goalsList = null;
  if(props.goals.length > 0) {
    goalsList = props.goals.map((goal) => {
      return <li key={goal._id}>{goal.goal}</li>
    })
  }

  return (
    <div className={styles.Goals}>
      <Header>My Goals</Header>
      {(!props.isLoading && props.goals) 
        ? 
        (
          <ol className={styles.GoalsList}>
            {goalsList}
          </ol>
        )
        : 
        (
          <div className={styles.Spinner}>
            <Spinner design='Loader_Content'/>
          </div>  
        )}
      <Button 
        design='SideBar_Button'
        onClick={props.onGoalsHandler}>Add Goal</Button>
    </div>
  )
}

export default Goals;