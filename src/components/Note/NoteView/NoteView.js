import React from 'react';

import { convertToSeconds, convertTime } from '../../../shared/util';

import styles from './NoteView.module.scss';

const NoteView = props => {
  const exercises = props.exercises.map((exercise, i) => (
    <div
      className={styles.Exercise_Info} 
      key={exercise._id || i}>
      <p>{exercise.exerciseType}:</p>
      <p>{exercise.time}</p>
    </div>
  ))
  let totalTime = '00:00'
  if(props.exercises.length > 0) {
    const time = props.exercises.reduce((total, exercise) => {
      const exerciseTime = convertToSeconds(exercise.time)
      total.push(exerciseTime);
      return total;
    }, []).reduce((total, amount) => {
      return total + amount;
    })
    totalTime = convertTime(time);
  }

  return (
    <div className={styles.Note_View}>
      <h2 className={styles.Exercise}>Total time you exercised today: <span className={styles.Time}>{totalTime}</span></h2>
      {exercises}
    </div>
  )
}

export default NoteView;