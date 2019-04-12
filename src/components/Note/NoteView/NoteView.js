import React from 'react';

import styles from './NoteView.module.scss';

const NoteView = props => (
  <div className={styles.Note_View}>
    <h2 className={styles.Exercise}>Time you exercised today: <span className={styles.Time}>{props.time}</span></h2>
  </div>
)

export default NoteView;