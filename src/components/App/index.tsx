import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './styles.module.css';
import Header from '../Header';
import UserInfo from '../pages/UserInfo';
import Search from '../pages/Search';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <div className={styles.content}>
          <Switch>
            <Route path="/search/:searchPhrase" component={Search} />
            <Route path="/user/:login" component={UserInfo} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
