import React from 'react';
import styled from 'styled-components';
import { getWeatherIconUrl } from '../api/accuweather';
import { getFormattedDate } from '../helpers/timeHelpers';


const ForecastDayCard = (props) => {

  const {data} = props;
  const {day, date, month} = getFormattedDate(data.Date);
  
  return (
    <ForecastDayCardDiv>
      <div className="card-header">
        <div className="primary-date">
          {day}
        </div>
        <div className="second-date">
          ({date + " " + month})
        </div>
      </div>

      <div className="main-card">
        <div>
          {  data.Day.IconPhrase  } 
        </div>
        <div>
          <img src={getWeatherIconUrl(data.Day.Icon)} alt={data.Day.IconPhrase} />
        </div>
        <div>
          {  data.Temperature.Maximum.Value  }  -  {  data.Temperature.Minimum.Value  }
        </div>
      </div>  
    </ForecastDayCardDiv>
  )
}

export default ForecastDayCard;

const ForecastDayCardDiv = styled.div`
  border: 1px solid grey;
  min-height: 150px;
  padding: 20px;
  font-weight: 600;

  .card-header {
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.backgroundColor};
    padding: 10px;
    margin: -20px;
    margin-bottom: 20px;
  }

  .second-date {
    font-weight: 400;
    margin: 5px;
  }

  @media screen and (max-width: 850px){
    margin: 30px auto;
  }
`;