import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Favorites from './routes/Favorites';
import Main from './routes/Main';
import '../styles/global-styles';
import { GlobalStyle } from '../styles/global-styles';
import { darkTheme, lightTheme } from '../styles/themes';
import { useSelector } from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';


const App = () => {

  const themeIsDark = useSelector(state => state.themeIsDark);

  return (
    <ThemeProvider theme={themeIsDark ? darkTheme : lightTheme}>
      <GlobalStyle/>
      <PagesWrapper>
        <Router>
          <Switch>
            <Route exact path="/main" component={Main}></Route>
            <Route exact path="/favorites" component={Favorites}></Route>
            <Route exact path="/main/:id" component={Main}></Route>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="*" component={Main}></Route>
          </Switch>
        </Router>
      </PagesWrapper>
    </ThemeProvider>
  );
}

export default App;

const PagesWrapper = styled.div`
`;