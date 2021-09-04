import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Favorites from './routes/Favorites';
import Main from './routes/Main';
import '../styles/global-styles';
import { GlobalStyle } from '../styles/global-styles';
import { useSelector } from 'react-redux';



const App = () => {

  const themeIsDark = useSelector(state => state.themeIsDark);

  return (
    <>
      <GlobalStyle/>
      <div className={`APP ${ themeIsDark ? "MODE_DARK" : "MODE_LIGHT" }`}>
        <Router>
          <Switch>
            <Route exact path="/main" component={Main}></Route>
            <Route exact path="/main/:id" component={Main}></Route>
            <Route exact path="/favorites" component={Favorites}></Route>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="*" component={Main}></Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;