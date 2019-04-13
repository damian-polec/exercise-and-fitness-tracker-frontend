import React from 'react';

import styles from './NoteView.module.scss';

const NoteView = props => {
  let exercises = props.exercises.map((exercise, i) => (
    <div
      className={styles.Exercise_Info} 
      key={exercise._id || i}>
      <p>{exercise.exerciseType}:</p>
      <p>{exercise.time}</p>
    </div>
  ))
  return (
    <div className={styles.Note_View}>
      <h2 className={styles.Exercise}>Total time you exercised today: <span className={styles.Time}>{props.time}</span></h2>
      {exercises}
    </div>
  )
}

export default NoteView;