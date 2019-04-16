import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../UI/Button/Button';
import styles from './Modal.module.scss';

const Modal = props => 
  ReactDOM.createPortal(
    <div className={styles.Modal}>
      <header className={styles.Modal_Header}>
        <h1>{props.title}</h1>
      </header>
      <div className={styles.Modal_Content}>{props.children}</div>
      <div className={styles.Modal_Actions}>
        <Button
          onClick={props.onCancelModal} 
          design='Cancel_Button'>Cancel</Button>
        <Button
          onClick={props.onAcceptModal}
          design='Accept_Button'>Accept</Button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );

export default Modal;