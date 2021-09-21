import './App.css';
import React, { useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import Interviewpage from './components/interviewPage/InterviewPage'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/interview" component={Interviewpage}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
