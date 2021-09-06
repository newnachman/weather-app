import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useFetch } from '../hooks/useFetch';
import {getCurrentWeatherUrl, getWeatherIconUrl} from '../api/accuweather';
import Grow from '@material-ui/core/Grow';

const CurrentCityWeather = () => {
  const { response, fetchData } = useFetch();
  const currentLocation = useSelector(state => state.currentLocation)
  const [currentWeather, setCurrentWeather] = useState();

  useEffect(() => {
    if (currentLocation?.key) {
      fetchData('CURRENT_WEATHER', getCurrentWeatherUrl(currentLocation.key));
    }
  }, [currentLocation?.key, fetchData]);
  
  useEffect(() => {
    if (response.data && !response.loading) {
      setCurrentWeather(response.data[0]);
    }
  },[response])

  return (
    <>
    {currentWeather &&  
      <Grow in={currentWeather ? true : false}>
      <CurrentCityDiv>
        <div>
          <div className="city-name">{currentLocation.city}</div>
        </div>
        <div>
          <img src={getWeatherIconUrl(currentWeather.WeatherIcon)} alt="" />
        </div>
        <div>
          <div className="weather-value">
            {`${currentWeather.Temperature['Metric'].Value}`}
            <div className="temperature-mode">{currentWeather.Temperature['Metric'].Unit}</div>
          </div>
          <div className="weather-text">
            {`(${currentWeather.WeatherText})`}
          </div>
          
        </div>
      </CurrentCityDiv>
      </Grow>
    }
    </>
  )
 
}

export default CurrentCityWeather;

const CurrentCityDiv = styled.div`
  width: 80%;
  margin: 30px auto;
  text-align: center;
  display: grid;
  grid-template-columns: 30% 34% 30%;
  grid-column-gap: 2%;
  text-align: center;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.3rem;
    font-weight: 700;
  }
  .weather-text  {
    margin-left: 30px;
    font-size: 1.8rem;
    font-weight: 400;
  }
  .weather-value  {
    position: relative;
  }
  .city-name {
    text-transform: uppercase;
  }
  .temperature-mode {
    position: absolute;
    top: -5px;
    right: -15px;
    font-size: 1.2rem;
  }
  img {
    width: 200px;
  }
`;