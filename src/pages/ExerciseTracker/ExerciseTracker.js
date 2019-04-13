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
    isLoading: true,
    noteData: []
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
    const noteId = noteData._id;
    fetch(`http://localhost:8080/tracker/getNoteData/${noteId}`, {
      method: 'GET',
    })
    .then(res => {
      return res.json();
    })
    .then(resData => {
      this.setState({
        note: noteData,
        noteData: resData.data.exercises,
        editNote: true, 
        showBackdrop: true
      })
      console.log(resData);
    })
    .catch(err => console.log(err));
  }

  backdropClickHandler = () => {
    this.setState({
      note: null, 
      editNote: false,
      showBackdrop: false,
      noteData: []
     })
  };
  
  addExercisekHandler = (event, exerciseType, time) => {
    event.preventDefault();
    let passedTime = time;
    if(!passedTime) {
      return;
    }
    if(!/:/.test(passedTime)) {
      passedTime = `${passedTime}:00`
    }
    const exercise = {
      exerciseType: exerciseType,
      time: passedTime
    }
    this.setState(prevState => {
      return {noteData: prevState.noteData.concat(exercise)}
    })
  }

  onSaveNoteHandler = (event) => {
    event.preventDefault();
    console.log(this.state.noteData);
    const bodyData = {
      noteData: this.state.noteData,
      dayId: this.state.note._id
    }
    fetch('http://localhost:8080/tracker/addNote', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(bodyData)
    }).then(res => {
      return res.json();
    }).then(res => {
      this.setState({
        showBackdrop: false,
        editNote: false,
        note: null,
        noteData: []
      })
      console.log(res);
    }).catch(err => console.log(err))
  }

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
              exercises={this.state.noteData} 
            />
            <NoteEdit 
              onClick={this.addExercisekHandler}
              onSubmit={this.onSaveNoteHandler}/>
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