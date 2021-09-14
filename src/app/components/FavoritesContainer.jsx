import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {getCurrentWeatherUrl, getWeatherIconUrl} from '../api/accuweather';
import styled from 'styled-components';
import axios from 'axios';
import FavoriteCard from './FavoriteCard';

const FavoritesContainer = () => {
  
  const favoritesArray = useSelector(state => state.favoritesArray);
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    if (favoritesArray?.length > 0) {
      setFavoritesData([]);
      favoritesArray.forEach((element, i) => {
        createFavoriteDataArray(element.key, element.city);
      });
    }
  }, [favoritesArray]);

   
  const createFavoriteDataArray = (key, city) => {
    axios.request({ url: getCurrentWeatherUrl(key) }).then((result) => {
      setFavoritesData( (data) => ([...data, {key: key, city: city, detail: result.data[0]} ] ))
    }).catch(error => {
      console.log('response error of createFavoriteDataArray request: ', error);
  });
  }

  return (
    favoritesData ?
    <section>
      <FavoritesTitle>
      Favorites:
      </FavoritesTitle>
      <FavoritesCardWrapper>
        {favoritesData.map((item, i) => {
          return <FavoriteCard key={i} data={item} itemKey={i} />
        })}
      </FavoritesCardWrapper>
    </section>
    :
    "Fetching data..."
  )
}

export default FavoritesContainer;



const FavoritesTitle = styled.h2`
color: #003c7d;
`;

const FavoritesCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  grid-column-gap: 2.5%;
  grid-row-gap: 20px;
  text-align: center;
`;
