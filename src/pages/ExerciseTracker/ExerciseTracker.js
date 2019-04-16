import React, { Component, Fragment } from 'react';

import SideBar from '../../components/SideBar/SideBar';
import Tracker from '../../components/Tracker/Tracker';
import Backdrop from '../../components/Backdrop/Backdrop';
import Modal from '../../components/Modal/Modal';
import NoteView from '../../components/Note/NoteView/NoteView';
import NoteEdit from '../../components/Note/NoteEdit/NoteEdit';
import GoalsView from '../../components/SideBar/Goals/GoalsView/GoalsView';
import GoalsEdit from '../../components/SideBar/Goals/GoalsEdit/GoalsEdit';
import CalendarSquare from '../../components/Tracker/CalendarSquare/CalendarSquare';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';


import { convertToSeconds, convertTime } from '../../shared/util'

import styles from './ExerciseTracker.module.scss';

class ExerciseTracker extends Component {
  state = {
    showBackdrop: false,
    note: null,
    editNote: false,
    goals: [],
    editGoals: false,
    calendarData: null,
    isLoading: false,
    noteData: [],
    error: null
  }
  componentDidMount() {
    this.getCalendar();
  }

  getCalendar = () => {
    this.setState({isLoading: true})
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/tracker/getData', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    }).then(res => {
      return res.json()
    }).then(resData => {
      if(resData.errors) {
        throw new Error(
          'Not Authenticated'
        )
      }
      this.setState({ calendarData: resData.data, isLoading: false})
    }).catch(err => {
        this.setState({error: err})
    });
  }

  onNoteHandler = noteData => {
    const token = localStorage.getItem('token')
    const noteId = noteData._id;
    fetch(`http://localhost:8080/tracker/getNoteData/${noteId}`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    .then(res => {
      return res.json();
    })
    .then(resData => {
      console.log(resData);
      if(resData.errors) {
        throw new Error (
          'Not Authenticated'
        )
      }
      this.setState({
        note: noteData,
        noteData: resData.data.exercises,
        editNote: true, 
        showBackdrop: true
      })
    })
    .catch(err => {
      this.setState({error: err})
    });
  }

  addExercisekHandler = (event, exerciseType, time) => {
    event.preventDefault();
    let passedTime = time;
    if(!passedTime) {
      return;
    }
    if(!/:/.test(passedTime)) {
      passedTime = `${passedTime}:00`
    }
    const exerciseIndex = this.state.noteData.findIndex((note => {
      return note.exerciseType === exerciseType
    }))
    if(exerciseIndex < 0) {
      const exercise = {
        exerciseType: exerciseType,
        time: passedTime
      }
      this.setState(prevState => {
        return {noteData: prevState.noteData.concat(exercise)}
      })
    } else {
      const prevTime = convertToSeconds(this.state.noteData[exerciseIndex].time);
      const newTime = convertTime(convertToSeconds(passedTime) + prevTime);
      const noteCopy = this.state.noteData.slice();
      noteCopy[exerciseIndex].time = newTime
      this.setState({noteData: noteCopy});
    }
    
  }

  onSaveNoteHandler = (event) => {
    event.preventDefault();
    console.log('dziala');
    const token = localStorage.getItem('token');
    const bodyData = {
      noteData: this.state.noteData,
      dayId: this.state.note._id
    }
    fetch('http://localhost:8080/tracker/addNote', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bodyData)
    }).then(res => {
      return res.json();
    }).then(res => {
      if(res.errors) {
        throw new Error(
          'Not Authenticated'
        )
      }
      this.setState({
        showBackdrop: false,
        editNote: false,
        note: null,
        noteData: []
      })
    }).catch(err => {
      this.setState({error: err});
    })
  }

  onGoalsHandler = () => {
    this.setState({
      editGoals: true,
      showBackdrop: true
    })
  }
  
  onAddGoalHandler = (event, goal) => {
    event.preventDefault();
    
    const goals = []
    goals.push(goal);
    console.log(goals);
    this.setState(prevState => {
      return {goals: prevState.goals.concat(goals)}
    })
  }

  onSaveGoalHandler = () => {
    console.log('blabla');
  }


  backdropClickHandler = () => {
    this.setState({
      note: null, 
      editNote: false,
      editGoals: false,
      showBackdrop: false,
      noteData: []
     })
  };

  errorHandler = () => {
    if(this.state.error.message === 'Not Authenticated') {
      this.setState({error: null});
      this.props.logoutHandler();
    }
    if(this.state.error) {
      this.setState({error: null})
    }
  }

  render() {
    let days = null;

    if(!this.state.isLoading && this.state.calendarData) {
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
        <ErrorHandler
          error={this.state.error}
          onHandle={this.errorHandler} />
        {this.state.editNote && (
          <Modal
            title={`${this.state.note.day}/${this.state.note.month + 1}/${this.state.note.year}`}
            onAcceptModal={this.onSaveNoteHandler} 
            onCancelModal={this.backdropClickHandler}>                                     
            <NoteView
              exercises={this.state.noteData} 
            />
            <NoteEdit 
              onClick={this.addExercisekHandler}
              />
          </Modal>
        )}
        {this.state.editGoals && (
          <Modal
            title='My Goals'
            onAcceptModal={this.onSaveGoalHandler}
            onCancelModal={this.backdropClickHandler}>
            <GoalsView 
              goals={this.state.goals}/>
            <GoalsEdit 
              onClick={this.onAddGoalHandler}/>

          </Modal>
        )}
        <div className={styles.ExerciseTracker}>
          <SideBar 
            onGoalsHandler={this.onGoalsHandler} />
          <Tracker
            isLoading={this.state.isLoading}>
            {days}
          </Tracker>
        </div>
      </Fragment>
    )
  }
}

export default ExerciseTracker;