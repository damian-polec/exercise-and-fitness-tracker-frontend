import React from 'react';

import styles from './GoalsView.module.scss';

const GoalsView = props => {
  let goalsList = null;
  if(props.goals.length > 0) {
    goalsList = props.goals.map((goal) => {
      return <li key={goal._id}>{goal.goal}</li>
    })
  }

  return (
    <div className={styles.Goals_View}>
      <ol className={styles.Goals_List}>
        {goalsList}
      </ol>
    </div>
  )
}

export default GoalsView;