import React from 'react';
import FavoritesContainer from '../../app/components/FavoritesContainer';
import Navbar from './../components/NavBar';
import { useSelector, useDispatch } from 'react-redux';

const Favorites = () => {

  const {currentLocation, favoritesArray} = useSelector(state => state);
  const dispatch = useDispatch();

  console.log('Favorites page: currentLocation, favoritesArray: ', currentLocation, favoritesArray)

  return (
    <div>
      Favorites
      <Navbar/>
      <FavoritesContainer/>
    </div>
  )
}

export default Favorites;
