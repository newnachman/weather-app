import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {getCurrentWeatherUrl} from '../api/accuweather';
import styled from 'styled-components';
import axios from 'axios';
import FavoriteCard from './FavoriteCard';
import { Link } from 'react-router-dom';

const FavoritesContainer = () => {
  
  const favoritesArray = useSelector(state => state.favoritesArray);
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    if (favoritesArray?.length > 0) {
      setFavoritesData([]);
      favoritesArray.forEach((element, i) => {
        createFavoriteDataArray(element.key, element.city, element.country);
      });
    }
  }, [favoritesArray]);

   
  const createFavoriteDataArray = (key, city, country) => {
    axios.request({ url: getCurrentWeatherUrl(key) }).then((result) => {
      setFavoritesData( (favorites) => ([...favorites, {key, city, country, detail: result.data[0]} ] ))
    }).catch(error => {
      console.error('response error of createFavoriteDataArray request: ', error);
  });
  }

  return (
    favoritesData.length > 0 ?
    <section>
      <h2>
        Favorites:
      </h2>
      <FavoritesCardWrapper>
        {favoritesData.map((favorite, i) => {
          return <FavoriteCard key={i} data={favorite} itemKey={i} />
        })}
      </FavoritesCardWrapper>
    </section>
    :
    <>
      <MessageWrapper>
        <div>No favorites yet...</div>
        <Link to={"/"}>Go back to MAIN PAGE and add some favorite cities!</Link> 
      </MessageWrapper>
    </>
  )
}

export default FavoritesContainer;

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  font-size: 2.2rem;
  height: 50vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  a, a:visited, a:hover {
    font-size: 1.2rem;
    margin-top: 20px;
    color: inherit;
  }
`;

const FavoritesCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  grid-column-gap: 2.5%;
  grid-row-gap: 20px;
  text-align: center;

  @media screen and (max-width: 850px){
    display: block;
  }
`;
