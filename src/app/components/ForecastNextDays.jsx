import React from 'react';
import ForecastDayCard from './ForecastDayCard';
import { weatherData } from './../data/weatherData';
import styled from 'styled-components';


const ForecastNextDays = () => {
  return (
    <section>
      <ForecastNextDaysTitle>
        Next Day Forecast:
      </ForecastNextDaysTitle>
      <ForecastDayCardWrapper>
        {weatherData.DailyForecasts5.DailyForecasts.map((current, i) => {
          return <ForecastDayCard key={i} data={current.Temperature.Minimum.Value} />
        })}
      </ForecastDayCardWrapper>
     
    </section>
  )
}

export default ForecastNextDays;

const ForecastNextDaysTitle = styled.h2`
color: #003c7d;
`

const ForecastDayCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  grid-column-gap: 2.5%;
  text-align: center;

`
