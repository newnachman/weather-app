import React from 'react';
import styled from 'styled-components';

const ForecastDayCard = (props) => {

  const {data} = props;
  return (
    <ForecastDayCardDiv>
     {data}
    </ForecastDayCardDiv>
  )
}

export default ForecastDayCard;

const ForecastDayCardDiv = styled.div`
  border: 1px solid grey;
  min-height: 150px;
  
`