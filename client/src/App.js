import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Board from './pages/Board';
import User from './pages/User';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/board/:id" component={Board} />
          <Route exact path="/user/:id" component={User} />
        </Switch>
      </Router>
    );
  }
}

export default App;
