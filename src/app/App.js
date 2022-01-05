import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Favorites from './routes/Favorites';
import Main from './routes/Main';
import '../styles/global-styles';
import { GlobalStyle } from '../styles/global-styles';
import { darkTheme, lightTheme } from '../styles/themes';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSnackbar } from './redux/Actions';
import styled, {ThemeProvider} from 'styled-components';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ScrollButton from "./components/ScrollButton";


const App = () => {

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  const handleScroll = () => {
    if (window.scrollY >= 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  }

  const themeIsDark = useSelector(state => state.themeIsDark);
  const snackbarState = useSelector(state => state.snackbarState);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSnackbar({display: false, message: "", type: ""}));
  }

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
        <ScrollButton showScrollButton={showScrollButton}/>
        {snackbarState &&
        <Snackbar open={snackbarState.display} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleClose} severity={snackbarState.type} sx={{ width: '100%' }}>
            {snackbarState.message}
          </Alert>
        </Snackbar>}
      </PagesWrapper>
    </ThemeProvider>
  );
}

export default App;

const PagesWrapper = styled.div`
`;