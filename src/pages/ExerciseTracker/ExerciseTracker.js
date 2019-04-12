import React, { Component, Fragment } from 'react';

import SideBar from '../../components/SideBar/SideBar';
import Tracker from '../../components/Tracker/Tracker';
import Backdrop from '../../components/Backdrop/Backdrop';
import Modal from '../../components/Modal/Modal';
import NoteView from '../../components/Note/NoteView/NoteView';
import NoteEdit from '../../components/Note/NoteEdit/NoteEdit';
import CalendarSquare from '../../components/Tracker/CalendarSquare/CalendarSquare';

import styles from './ExerciseTracker.module.scss';

class ExerciseTracker extends Component {
  state = {
    showBackdrop: false,
    note: null,
    editNote: false,
    calendarData: [],
    isLoading: true
  }
  componentDidMount() {
    this.getCalendar()
  }

  getCalendar = () => {
    const userId = localStorage.getItem('userId');
    fetch('http://localhost:8080/tracker/getData', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({userId: userId})
    }).then(res => {
      return res.json()
    }).then(resData => {
      this.setState({ calendarData: resData.data, isLoading: false})
    }).catch(err => console.log(err));
  }

  onNoteHandler = noteData => {
    this.setState({
      note: noteData,
      editNote: true, 
      showBackdrop: true 
    })
  }

  backdropClickHandler = () => {
    this.setState({
      note: null, 
      editNote: false,
      showBackdrop: false
     })
  };



  render() {
    let days = null;
    if(!this.state.isLoading) {
      const month = this.state.calendarData[0].month;
      const year = this.state.calendarData[0].year;
      const lastDayOfPassedMonth = new Date(year, month, 0).getDay();

      days = this.state.calendarData.map(day => {
        return <CalendarSquare 
                  click={this.onNoteHandler.bind(this, day)}
                  key={day._id}
                  day={day.day}
                  time={day.time} />
      })
      if(lastDayOfPassedMonth < 6) {
        let i = 0;
        let calendarDay = new Date(year, month, 0).getDate();
        while(i <= lastDayOfPassedMonth) {
          days.unshift(<CalendarSquare key={i} day={calendarDay} />)
          calendarDay--;
          i++;
        }
      }
    }
    return (
      <Fragment>
        {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        {this.state.editNote && (
          <Modal
            title={`${this.state.note.day}/${this.state.note.month + 1}/${this.state.note.year}`}>
            <NoteView
              time={this.state.note.time || '00:00'} 
            />
            <NoteEdit />
          </Modal>
        )}
        <div className={styles.ExerciseTracker}>
          <SideBar />
          <Tracker>
            {days}
          </Tracker>
        </div>
      </Fragment>
    )
  }
}

export default ExerciseTracker;