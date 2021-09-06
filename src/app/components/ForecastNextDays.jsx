import React, {useEffect, useState} from 'react';
import ForecastDayCard from './ForecastDayCard';
import styled from 'styled-components';
import { useFetch } from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import { getForecastWeatherUrl } from '../api/accuweather';


const ForecastNextDays = () => {

  const { response, fetchData } = useFetch();
  const currentLocation = useSelector(state => state.currentLocation)
  const temperatureMode = useSelector(state => state.temperatureMode)
  const [forecastWeather, setForecastWeather] = useState();

  console.log('````````````temperatureMode: ', temperatureMode)

  useEffect(() => {
    console.log('currentLocation?.key , temperatureMode.data', currentLocation?.key, temperatureMode.data)
    if (currentLocation?.key && temperatureMode?.data) {
      fetchData( 'FORECAST_WEATHER', getForecastWeatherUrl(currentLocation.key, (temperatureMode.data === 'Celsius')));
    }
  }, [currentLocation?.key, fetchData, temperatureMode?.data]);
  
  useEffect(() => {
    if (response.data && !response.loading) {
      setForecastWeather(response.data);
    }
  },[response])


  return ( forecastWeather ?
    <section>
      <ForecastNextDaysTitle>
        Next Day Forecast:
      </ForecastNextDaysTitle>
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

const ForecastNextDaysTitle = styled.h2`
color: #003c7d;
`;

const ForecastDayCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  grid-column-gap: 2.5%;
  text-align: center;

`;
