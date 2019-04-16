import React from 'react';

//import styles from './NoteView.module.scss';

const GoalsView = props => {
  let goalsList = null;
  if(props.goals) {
    goalsList = props.goals.map((goal, i) => {
      return <li key={i}>{goal}</li>
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