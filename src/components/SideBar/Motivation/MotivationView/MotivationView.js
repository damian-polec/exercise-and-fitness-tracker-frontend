import React from 'react';

import styles from './MotivationView.module.scss';

const motivationView = props => {
  return (
    <div className={styles.Motivation_View}>
      <h2>{props.motivation}</h2>
    </div>
  )
}

export default motivationView;