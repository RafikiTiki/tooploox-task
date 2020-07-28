import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from '../../store';
import styles from './styles.module.css';
import Header from '../Header';
import UserDetails from '../pages/UserDetails';
import Search from '../pages/Search';
import AlertsList from '../AlertsList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Router>
          <AlertsList />
          <Header />
          <div className={styles.content}>
            <Switch>
              <Route path="/search/:searchPhrase" component={Search} />
              <Route path="/user/:login" component={UserDetails} />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
