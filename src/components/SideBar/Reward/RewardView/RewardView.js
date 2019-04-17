import React from 'react';

import styles from './RewardView.module.scss';

const rewardView = props => {
  return (
    <div className={styles.Reward_View}>
      {!props.rewardPreview && <p>Please choose an image.</p>}
      {props.rewardPreview && (
        <img
          className={styles.Image_Preview} 
          src={props.rewardPreview}/>
      )}
    </div>
  )
}

export default rewardView;