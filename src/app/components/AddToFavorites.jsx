import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from './../redux/Actions';
import { checkIfInArray } from './../helpers/favoritesHelpers';
import styled from 'styled-components';

const AddToFavorites = () => {
  const {currentLocation, favoritesArray} = useSelector(state => state);
  const [isLocationSaved, setIsLocationSaved] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(()=> {
      if (currentLocation) {
        let isLocationSaved = checkIfInArray(currentLocation.key, favoritesArray?.map((fav) => fav.key));
        setIsLocationSaved(isLocationSaved);
      }
  },[currentLocation, favoritesArray]);
  
  return (
    currentLocation &&
    <AddToFavoritesWrapper>
      {
      isLocationSaved ? 
      <div onClick={()=>{dispatch(removeFavorite(currentLocation))}}>
        <i className="fa fa-check saved"></i>
        Saved in favorites (click to remove)
      </div>
      : 
      <div onClick={()=>{dispatch(addFavorite(currentLocation))}}>
        <i className="fa fa-heart"></i>
        Save to Favorites
      </div>
      }
    </AddToFavoritesWrapper>
  )
}

export default AddToFavorites;

const AddToFavoritesWrapper = styled.div `

  cursor: pointer;

  div i {
    font-size: 30px;
    margin-right: 15px;
  }

  div i.saved {
    border: 2px solid ${(props) => props.theme.color};
    border-radius: 50%;
    padding: 3px;
  }
`;