import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useFetch } from '../hooks/useFetch';
import {getCurrentWeatherUrl, getWeatherIconUrl} from '../api/accuweather';

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
    <CurrentCityWeatherDiv>
         { currentWeather &&
           <div >
            <h2>{currentLocation.city}</h2>
            <img src={getWeatherIconUrl(currentWeather.WeatherIcon)} alt="" />
            {currentWeather.WeatherText}
            {currentWeather.Temperature['Metric'].Value}
            {currentWeather.Temperature['Metric'].Unit}
          </div>
        }
       
    </CurrentCityWeatherDiv>
  )
}

export default CurrentCityWeather;

const CurrentCityWeatherDiv = styled.div`
  width: 80%;
  min-width: 200px;
  height: 200px;
  box-shadow: 1px 1px 2px grey;
  margin: 30px auto;
  background-color: grey;
`