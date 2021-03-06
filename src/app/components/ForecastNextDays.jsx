import React, {useEffect, useState} from 'react';
import ForecastDayCard from './ForecastDayCard';
import styled from 'styled-components';
import { useFetch } from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import { getForecastWeatherUrl } from '../api/accuweather';
import { constants } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { setSnackbar } from './../redux/Actions';

const ForecastNextDays = () => {

  const { response, fetchData } = useFetch();
  const currentLocation = useSelector(state => state.currentLocation)
  const temperatureMode = useSelector(state => state.temperatureMode)
  const [forecastWeather, setForecastWeather] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentLocation?.key && temperatureMode?.name) {
      let isCelsius = (temperatureMode.name === constants.TEMPERATURE_MODE.CELSIUS.name);
      fetchData( 'FORECAST_WEATHER', getForecastWeatherUrl(currentLocation.key, isCelsius));
    }
  }, [currentLocation?.key, fetchData, temperatureMode?.name]);
  
  useEffect(() => {
    if (response.error) {
      dispatch(setSnackbar({display: true, message: `There was a problem retrieving data in: ${response.data} please try later or contact us if the problem persists`, type: "error"}));
      return;
    }
    if (response.data && !response.loading) {
      setForecastWeather(response.data);
    }
  },[response, dispatch])


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

    <>
      <MessageWrapper>
        <div>No data yet...</div>
        <span>Try to search city in city search box, or alow geo-locations permission on your device, and then refresh page.</span> 
      </MessageWrapper>
    </>
  )
}

export default ForecastNextDays;

const ForecastDayCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  grid-column-gap: 2.5%;
  text-align: center;

  @media screen and (max-width: 850px){
    display: block;
  }
`;

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  font-size: 2.2rem;
  height: 50vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span {
    font-size: 1.2rem;
    margin-top: 20px;
    color: inherit;
  }
`;
