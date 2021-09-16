import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import { getWeatherIconUrl } from './../api/accuweather';

const FavoriteCard = (props) => {
  const {data, itemKey} = props;
  const history = useHistory();

  // redirect user to the specific city main page:
  const goMainWithCurrentCity = (id) => {
    history.push(`/main/${id}`);
  }

  console.log(data)

  return (
    // <>
    // {currentWeather &&  
    //   <Grow in={data ? true : false}>
    //   <CurrentCityDiv>
    //     <div>
    //       <div className="city-name">{currentLocation.city}</div>
    //     </div>
    //     <div>
    //       <img src={getWeatherIconUrl(currentWeather.WeatherIcon)} alt="" />
    //     </div>
    //     <div>
    //       <div className="weather-value">
    //         {`${currentWeather.Temperature['Metric'].Value}`}
    //         <div className="temperature-mode">{currentWeather.Temperature['Metric'].Unit}</div>
    //       </div>
    //       <div className="weather-text">
    //         {`(${currentWeather.WeatherText})`}
    //       </div>
          
    //     </div>
    //   </CurrentCityDiv>
    //   </Grow>
    // }
    // </>
    <Grow in={data ? true : false} style={{ transformOrigin: '0 0 0' }} {...(data ? { timeout: (1000 * (itemKey + 1))} : {})}>
      <FavoriteCardDiv onClick={()=> {goMainWithCurrentCity(`${data.city}::${data.country}::${data.key}`)}}>
        <div className="city">
          {data.city}
        </div>
        <div className="country">
          ({data.country})
        </div>
        <div>
          <img src={getWeatherIconUrl(data.detail.WeatherIcon)} alt={data.detail.WeatherText} />
        </div>
        <div>
          {data.detail.WeatherText}
        </div>
        <div className="weather-value">
          {`${data.detail.Temperature['Metric'].Value}`}
          <div className="temperature-mode">{data.detail.Temperature['Metric'].Unit}</div>
        </div>
      </FavoriteCardDiv>
    </Grow>

  )
}

export default FavoriteCard;


const FavoriteCardDiv = styled.div`
  cursor: pointer;
  border: 1px solid grey;
  min-height: 150px;
  padding-top: 20px;
  font-weight: 600;
`;


// style={{ transformOrigin: '0 0 0' }}
// {...(checked ? { timeout: 1000 } : {})}