import React, { Component, Fragment } from 'react';

import SideBar from '../../components/SideBar/SideBar';
import Tracker from '../../components/Tracker/Tracker';
import Backdrop from '../../components/Backdrop/Backdrop';
import Modal from '../../components/Modal/Modal';
import NoteView from '../../components/Note/NoteView/NoteView';
import NoteEdit from '../../components/Note/NoteEdit/NoteEdit';
import GoalsView from '../../components/SideBar/Goals/GoalsView/GoalsView';
import GoalsEdit from '../../components/SideBar/Goals/GoalsEdit/GoalsEdit';
import MotivationEdit from '../../components/SideBar/Motivation/MotivationEdit/MotivationEdit'
import MotivationView from '../../components/SideBar/Motivation/MotivationView/MotivationView'
import RewardView from '../../components/SideBar/Reward/RewardView/RewardView';
import RewardEdit from '../../components/SideBar/Reward/RewardEdit/RewardEdit';
import CalendarSquare from '../../components/Tracker/CalendarSquare/CalendarSquare';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';


import { convertToSeconds, convertTime, generateBase64FromImage } from '../../shared/util'

import styles from './ExerciseTracker.module.scss';

const URI = 'http://localhost:8080/tracker/'

class ExerciseTracker extends Component {
  state = {
    showBackdrop: false,
    note: null,
    editNote: false,
    goals: [],
    editGoals: false,
    motivation: '',
    motivationEdit: false,
    reward: null,
    rewardPreview: null,
    rewardEdit: false,
    calendarData: null,
    calendarMonth: null,
    isLoading: false,
    noteData: [],
    error: null
  }
  componentDidMount() {
    this.getCalendar();
  }

  getCalendar = () => {
    let month = this.state.calendarMonth;
    if(!month) {
      month = new Date().getMonth();
      this.setState({calendarMonth: month})
    }
    this.setState({
      isLoading: true,

    })
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/tracker/getData', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({month: month})
    }).then(res => {
      return res.json()
    }).then(resData => {
      if(resData.errors) {
        throw new Error(
          'Not Authenticated'
        )
      }
      this.setState({ calendarData: resData.data, isLoading: false})
      this.onGetGoals();
      this.onGetMotivation();
      this.onGetReward();
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
      const calendarDataCopy = this.state.calendarData.slice(0);
      const index = calendarDataCopy.findIndex(elem => {
        return elem._id === res.data[0].dayId
      });
      calendarDataCopy[index].exercises = res.data;
      this.setState({
          showBackdrop: false,
          editNote: false,
          note: null,
          noteData: [],
          calendarData: test
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
    const token = localStorage.getItem('token');
    const bodyData = {
      month: this.state.calendarData[0].month,
      goal: goal
    }
    fetch('http://localhost:8080/tracker/addGoal', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    .then(res => {
      return res.json()
    })
    .then(resData => {
      if(resData.errors) {
        throw new Error(
          'Not Authenticated'
        )
      }
      this.setState({goals: resData.data});
    })
    .catch(err => {
      this.setState({error: err});
    });
  }

  onGetGoals = () => {
    const token = localStorage.getItem('token');
    const bodyData = {
      month: this.state.calendarData[0].month
    }
    fetch('http://localhost:8080/tracker/getGoals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Beares ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    .then(res => {
      return res.json()
    })
    .then(resData => {
      if(resData.errors) {
        throw new Error(
          'Not Authenticated'
        )
      }
      this.setState({goals: resData});
    })
    .catch(err => {
      this.setState({error: err});
    })
  }

  onMotivationHandler = () => {
    this.setState({
      motivationEdit: true,
      showBackdrop: true
    })
  }

  onAddMotivationHandler = (event, motivation) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const bodyData = {
      month: this.state.calendarData[0].month,
      quote: motivation
    }
    fetch(`${URI}addQuote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    .then(res => {
      return res.json();
    })
    .then(resData => {
      if(resData.errors) {
        throw new Error(
          'Not Authenticated'
        )
      }
      this.setState({motivation: resData.data.quote})
    })
    .catch(err => {
      this.setState({error: err});
    })
  }

  onGetMotivation = () => {
    const token = localStorage.getItem('token');
    const bodyData = {
      month: this.state.calendarData[0].month
    }
    fetch(`${URI}getQuote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    .then(res => {
      return res.json()
    })
    .then(resData => {
      if(resData.errors && resData.errors.statusCode === 500) {
        throw new Error(
          'Not Authenticated'
        )
      }
      this.setState({
        motivation: resData.quote
      })
    })
    .catch(err => {
      this.setState({error: err});
    })
  }

  onRewardHandler = () => {
    this.setState({
      rewardEdit: true,
      showBackdrop: true
    })
  }

  onAddRewardHandler = (event, reward, file) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const imageData = new FormData();
    imageData.append('image', file);
    imageData.append('month', this.state.calendarData[0].month);
    if(file) {
      generateBase64FromImage(file)
        .then(b64 => {
          this.setState({rewardPreview: b64})
        })
        .catch(error => {
          this.setState({rewardPreview: null})
        })
    }
    this.setState({
      reward: reward
    })
    fetch(`${URI}addReward`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
      body: imageData
    })
    .then(res => {
      return res.json()
    })
    .then(resData => {
      this.setState({reward: resData.rewardData})
    })
    .catch(err => this.setState({error: err}));
  }

  onGetReward = () => {
    const token = localStorage.getItem('token');
    const bodyData = {
      month: this.state.calendarData[0].month
    }
    fetch('http://localhost:8080/tracker/getReward', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Beares ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    .then(res => {
      return res.json()
    })
    .then(resData => {
      if(resData.errors) {
        throw new Error(
          'Not Authenticated'
        )
      }
      this.setState({reward: resData});
    })
    .catch(err => {
      this.setState({error: err});
    })
  }

//CalendarNav handlers

  onNextMonthHandler = () => {
    const month = this.state.calendarMonth + 1;

    this.setState({
      isLoading: true,
      calendarMonth: month
    })
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/tracker/getData', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({month: month})
    }).then(res => {
      return res.json()
    }).then(resData => {
      if(resData.errors) {
        throw new Error(
          'Not Authenticated'
        )
      }
      this.setState({ calendarData: resData.data, isLoading: false})
      this.onGetGoals();
      this.onGetMotivation();
      this.onGetReward();
    }).catch(err => {
        this.setState({error: err})
    });
  }

  onPrevMonthHandler = () => {
    const month = this.state.calendarMonth - 1;

    this.setState({
      isLoading: true,
      calendarMonth: month
    })
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/tracker/getData', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({month: month})
    }).then(res => {
      return res.json()
    }).then(resData => {
      if(resData.errors) {
        throw new Error(
          'Not Authenticated'
        )
      }
      this.setState({ calendarData: resData.data, isLoading: false})
      this.onGetGoals();
      this.onGetMotivation();
      this.onGetReward();
    }).catch(err => {
        this.setState({error: err})
    });
  }


  backdropClickHandler = () => {
    this.setState({
      note: null, 
      editNote: false,
      editGoals: false,
      motivationEdit: false,
      rewardEdit: false,
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
                  month={day.month}
                  year={day.year}
                  exercise={day.exercises}
                />
      })
      if(lastDayOfPassedMonth < 6) {
        let i = 0;                        
        let calendarDay = new Date(year, month, 0).getDate();
        while(i <= lastDayOfPassedMonth) {
          days.unshift(<CalendarSquare key={i} day={calendarDay} exercise='' />)
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
            onAcceptModal={this.backdropClickHandler}
            onCancelModal={this.backdropClickHandler}>
            <GoalsView 
              goals={this.state.goals}/>
            <GoalsEdit 
              onClick={this.onAddGoalHandler}
              value={this.state.value}/>

          </Modal>
        )}
        {this.state.motivationEdit && (
          <Modal
            title='My Motivational Quote'
            onAcceptModal={this.backdropClickHandler}
            onCancelModal={this.backdropClickHandler}>
            <MotivationView 
              motivation={this.state.motivation}/>
            <MotivationEdit
              motivation={this.state.motivation} 
              onClick={this.onAddMotivationHandler}
              />
          </Modal>
        )}
        {this.state.rewardEdit && (  
          <Modal
            title='My Reward'
            onAcceptModal={this.backdropClickHandler}
            onCancelModal={this.backdropClickHandler}>
            <RewardView 
              reward={this.state.reward}
              rewardPreview={this.state.rewardPreview}/>
            <RewardEdit
              reward={this.state.reward} 
              onClick={this.onAddRewardHandler}/>
          </Modal>
        )}
        <div className={styles.ExerciseTracker}>
          <SideBar 
            onGoalsHandler={this.onGoalsHandler}
            goals={this.state.goals}
            onMotivationHandler={this.onMotivationHandler}
            motivation={this.state.motivation}
            onRewardHandler={this.onRewardHandler}
            reward={this.state.reward}
            isLoading={this.state.isLoading} />
          <Tracker
            month={this.state.calendarMonth}
            nextMonthHandler = {this.onNextMonthHandler}
            prevMonthHandler={this.onPrevMonthHandler}
            isLoading={this.state.isLoading}>
            {days}
          </Tracker>
        </div>
      </Fragment>
    )
  }
}

export default ExerciseTracker;