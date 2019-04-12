import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

const Modal = props => 
  ReactDOM.createPortal(
    <div className={styles.Modal}>
      <header className={styles.Modal_Header}>
        <h1>{props.title}</h1>
      </header>
      <div className={styles.Modal_Content}>{props.children}</div>
      <div className={styles.Modal_Actions}>

      </div>
    </div>,
    document.getElementById('modal-root')
  );

export default Modal;