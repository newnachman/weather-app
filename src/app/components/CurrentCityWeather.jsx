import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useFetch } from '../hooks/useFetch';
import {getCurrentWeatherUrl, getWeatherIconUrl} from '../api/accuweather';
import Grow from '@material-ui/core/Grow';
import { useDispatch } from 'react-redux';
import { setSnackbar } from './../redux/Actions';

const CurrentCityWeather = () => {
  const { response, fetchData } = useFetch();
  const currentLocation = useSelector(state => state.currentLocation)
  const temperatureMode = useSelector(state => state.temperatureMode);
  const [currentWeather, setCurrentWeather] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentLocation?.key) {
      fetchData('CURRENT_WEATHER', getCurrentWeatherUrl(currentLocation.key));
    }
  }, [currentLocation?.key, fetchData]);
  
  useEffect(() => {
    if (response.error) {
      dispatch(setSnackbar({display: true, message: `There was a problem retrieving data in: ${response.data} please try later or contact us if the problem persists`, type: "error"}));
      return;
    }
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
          <div className="city-name">
            {currentLocation.city}
            <div className="sub-value-note">{currentLocation.country}</div>
          </div>
          
        </div>
        <div>
          <img src={getWeatherIconUrl(currentWeather.WeatherIcon)} alt={currentWeather.WeatherText} />
        </div>
        <div title={temperatureMode.name}>
          <div className="weather-value" >
            {`${currentWeather.Temperature[temperatureMode.mode].Value}`}
            <div className="sub-value-note" >{currentWeather.Temperature[temperatureMode.mode].Unit}</div>
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
  .weather-value, .city-name  {
    position: relative;
  }
  .city-name {
    text-transform: uppercase;
  }
  .sub-value-note {
    position: absolute;
    top: -15px;
    right: -25px;
    font-size: 1.2rem;
    color: #ff5e2b;
  }
  .weather-value .sub-value-note  {
    top: -10px;
    right: -15px;
  }
  img {
    width: 200px;
  }

  
  @media screen and (max-width: 1000px){
    width: 90%;
  }

  @media screen and (max-width: 850px){
     display: block;
     margin: 80px auto;

     & > div {
       margin: 30px auto;
     }

     .sub-value-note {
      font-size: 1.5rem;
      display: inline;
      margin-left: 10px;
      position: initial;
     }
  }

`;