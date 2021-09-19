import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from './../redux/Actions';
import { checkIfInArray } from './../helpers/favoritesHelpers';

const AddToFavorites = () => {
  const {currentLocation, favoritesArray} = useSelector(state => state);
  const [isLocationSaved, setIsLocationSaved] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=> {
      if (currentLocation) {
        // debugger
        let isLocationSaved = checkIfInArray(currentLocation.key, favoritesArray?.map((fav) => fav.key));
        // console.log('isLocationSaved: ', isLocationSaved);
        // console.log('favoritesArray: ', favoritesArray);
        // console.log('currentLocation: ', currentLocation);
        setIsLocationSaved(isLocationSaved);
      }
  },[currentLocation, favoritesArray]);
  
  return (
    <div>
      {
        currentLocation &&
        <div>
          {
          isLocationSaved ? 
          <div onClick={()=>{dispatch(removeFavorite(currentLocation))}}>
            <i className="fa fa-check"></i>
            this location is saved in favorites (click to remove)
          </div>
          : 
          <div onClick={()=>{dispatch(addFavorite(currentLocation))}}>
            <i className="fa fa-heart"></i>
            save this location to Favorites
          </div>
          }
        </div>
      }
    </div>
  )
}

export default AddToFavorites;
