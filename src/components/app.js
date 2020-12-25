import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import './app.less';
// import Demo from 'common/demo/demo';
import photo from '../assign/images/photo.JPG';
import { recommend } from '../actions/recommend';
import Overview from './overview';
import Login from './login';

function App(props) {
  console.log(props);

  return (
    <div id="app">
      <div className="app-text">app 3</div>
      <img src={photo} alt="" />
      <Router>
        <Link to="/">总览</Link>
        <Link to="/login">登录</Link>
        <Switch>
          <Route path="/" exact component={Overview} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

// export default App;

const mapStateToProps = (state) => ({
  ...state.reducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecommend: (username, password) => dispatch(recommend(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
