import React, {useEffect, useState} from 'react';
import ForecastDayCard from './ForecastDayCard';
import styled from 'styled-components';
import { useFetch } from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import { getForecastWeatherUrl } from '../api/accuweather';
import { constants } from '../constants/constants';


const ForecastNextDays = () => {

  const { response, fetchData } = useFetch();
  const currentLocation = useSelector(state => state.currentLocation)
  const temperatureMode = useSelector(state => state.temperatureMode)
  const [forecastWeather, setForecastWeather] = useState();


  useEffect(() => {
    if (currentLocation?.key && temperatureMode?.name) {
      let isCelsius = (temperatureMode.name === constants.TEMPERATURE_MODE.CELSIUS.name);
      fetchData( 'FORECAST_WEATHER', getForecastWeatherUrl(currentLocation.key, isCelsius));
    }
  }, [currentLocation?.key, fetchData, temperatureMode?.name]);
  
  useEffect(() => {
    if (response.data && !response.loading) {
      setForecastWeather(response.data);
    }
  },[response])


  return ( forecastWeather ?
    <section>
      <h2>
        Next Day Forecast:
      </h2>
      <ForecastDayCardWrapper>
        {forecastWeather.DailyForecasts.map((day, i) => {
          return <ForecastDayCard key={i} data={day} />
        })}
      </ForecastDayCardWrapper>
    </section>
    :
    "Fetching data..."
  )
}

export default ForecastNextDays;

// const ForecastNextDaysTitle = styled.h2`
// color: #003c7d;
// `;

const ForecastDayCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  grid-column-gap: 2.5%;
  text-align: center;

`;
