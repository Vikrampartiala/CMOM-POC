import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Markets from './components/Markets';
import Coins from './components/Coins';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Markets} />
            <Route exact path='/coins/:id' component={Coins} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
