import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Backdrop.module.scss';

const Backdrop = props => 
  ReactDOM.createPortal(
    <div 
      className={styles.Backdrop}
      onClick={props.onClick}/>,
    document.getElementById('backdrop-root')
  );

  export default Backdrop;