import React from 'react';
import CurrentCityWeather from './CurrentCityWeather';
import AddToFavorites from './AddToFavorites';
import ForecastNextDays from './ForecastNextDays';
import styled from 'styled-components';

const MainWeatherContainer = () => {
  return (
    <MainWeatherDiv>
      <AddToFavorites/>
      <CurrentCityWeather/>
      <ForecastNextDays/>
    </MainWeatherDiv>
  )
}

export default MainWeatherContainer;


const MainWeatherDiv = styled.div`
  border: 1px solid grey;
  padding: 40px;
  margin: 30px 0;

  @media screen and (max-width: 1100px){
    padding: 20px;
  }
`;