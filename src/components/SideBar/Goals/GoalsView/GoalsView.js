import React from 'react';

//import styles from './NoteView.module.scss';

const GoalsView = props => {
  let goalsList = null;
  if(props.goals.length > 0) {
    goalsList = props.goals.map((goal) => {
      return <li key={goal._id}>{goal.goal}</li>
    })
  }

  return (
    <div className='test'>
      <ol>
        {goalsList}
      </ol>
    </div>
  )
}

export default GoalsView;