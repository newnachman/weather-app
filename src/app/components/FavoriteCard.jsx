import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import { getWeatherIconUrl } from './../api/accuweather';
import { useSelector } from 'react-redux';

const FavoriteCard = (props) => {
  const {data, itemKey} = props;
  const history = useHistory();
  const temperatureMode = useSelector(state => state.temperatureMode);
  // redirect user to the specific city main page:
  const goMainWithCurrentCity = (id) => {
    history.push(`/main/${id}`);
  }

  console.log(data)

  return (
    <Grow in={data ? true : false} style={{ transformOrigin: '0 0 0' }} {...(data ? { timeout: (1000 * (itemKey + 1))} : {})}>
      <FavoriteCardDiv onClick={()=> {goMainWithCurrentCity(`${data.city}::${data.country}::${data.key}`)}}>

        <div className="card-header">
          <div className="city">
            {data.city}
          </div>
          <div className="country">
            ({data.country})
          </div>
        </div>

        <div className="main-card" >
          <div>
            {data.detail.WeatherText}
          </div>
          <div>
            <img src={getWeatherIconUrl(data.detail.WeatherIcon)} alt={data.detail.WeatherText} />
          </div>
          <div className="weather-value" title={temperatureMode.name}>
            {`${data.detail.Temperature[temperatureMode.mode].Value}`}
            <div className="temperature-mode">{data.detail.Temperature[temperatureMode.mode].Unit}</div>
          </div>
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
  font-weight: 600;
  
  .card-header {
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.backgroundColor};
    padding: 10px;
    margin-bottom: 20px;
  }

  .weather-value {
    position: relative;
    width: fit-content;
    text-align: center;
    margin: 10px auto;
  }

  .weather-value .temperature-mode {
    position: absolute;
    top: -10px;
    right: -12px;
    font-size: 0.8rem;
    color: #ff5e2b;
  }

  @media screen and (max-width: 850px){
    margin: 30px auto;

    .card-header {
    padding: 20px;
    }
  }
`;

