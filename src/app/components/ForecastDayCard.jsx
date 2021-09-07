import React from 'react';
import styled from 'styled-components';
import { getWeatherIconUrl } from '../api/accuweather';
import { getFormattedDate } from '../helpers/getDate';


const ForecastDayCard = (props) => {

  const {data} = props;
  
  return (
    <ForecastDayCardDiv>
      <div>
        {  getFormattedDate(data.Date)  } 
      </div>
      <div>
        {  data.Day.IconPhrase  } 
      </div>
      <div>
        <img src={getWeatherIconUrl(data.Day.Icon)} alt="data.Day.IconPhrase" />
      </div>
      <div>
        {  data.Temperature.Maximum.Value  }  -  {  data.Temperature.Minimum.Value  }
      </div>
    </ForecastDayCardDiv>
  )
}

export default ForecastDayCard;

const ForecastDayCardDiv = styled.div`
  border: 1px solid grey;
  min-height: 150px;
  padding: 10px;
  font-weight: 600;
`