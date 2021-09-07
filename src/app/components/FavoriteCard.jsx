import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const FavoriteCard = (props) => {
  const {data} = props;
  const history = useHistory();

  // redirect user to the specific city main page:
  const goMainWithCurrentCity = (id) => {
    history.push(`/main/${id}`);
  }

  return (
    <ForecastDayCardDiv onClick={()=> {goMainWithCurrentCity(`${data.city}::${data.key}`)}}>
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