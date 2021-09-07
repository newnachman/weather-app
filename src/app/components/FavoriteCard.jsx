import React from 'react';
import styled from 'styled-components';


const FavoriteCard = (props) => {
  const {data} = props;

  return (
    <ForecastDayCardDiv>
      <div>
        {data.city}
        {/* {  getFormattedDate(data.Date)  }  */}
      </div>
      <div>
        {/* {  data.Day.IconPhrase  }  */}
      </div>
      <div>
        {/* <img src={getWeatherIconUrl(data.Day.Icon)} alt="data.Day.IconPhrase" /> */}
      </div>
      <div>
        {/* {  data.Temperature.Maximum.Value  }  -  {  data.Temperature.Minimum.Value  } */}
      </div>
    </ForecastDayCardDiv>

  )
}

export default FavoriteCard;


const ForecastDayCardDiv = styled.div`
  border: 1px solid grey;
  min-height: 150px;
  padding: 10px;
  font-weight: 600;
`