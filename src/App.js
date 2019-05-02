import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Homepage';
import { me } from './store/user';

class App extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            {isLoggedIn &&
            <Switch>
              <Route exact path="/home" component={Homepage} />
              <Route exact path="/" component={Homepage} />
            </Switch>}
          {!isLoggedIn && <Route path="/" component={Hero} />}
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
});

export default connect(
  mapState,
  mapDispatch
)(App);
