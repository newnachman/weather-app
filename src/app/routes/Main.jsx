import React, {useEffect} from 'react';
import MainWeatherContainer from './../components/MainWeatherContainer';
import SearchInput from '../components/SearchInput';
import Navbar from './../components/NavBar';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { constants } from '../constants/constants';

const Main = () => {

  const state = useSelector(state => state);
  const themeIsDark = useSelector(state => state.themeIsDark);
  const dispatch = useDispatch();

  useEffect(()=>{
    // dispatch(addFavorite('BLA'))
  },[]);

  useEffect(() => {

  },[]);


  return (
    <>
      <Navbar/>
      <MainContainer>
        <SearchInput/>
        <MainWeatherContainer/>
      </MainContainer>
    </>
  )
}

export default Main;

const MainContainer = styled.div`
  width: 70%;
  padding: 10px;
  margin: 50px auto;

  @media screen and (max-width: 600px){
    width: 95%;
  }
`;
