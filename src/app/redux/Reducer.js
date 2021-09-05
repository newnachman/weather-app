import ActionsTypes from './ActionsTypes';
import InitialState from './InitialState';

export const reducer = (state = InitialState, action) => { 
  switch (action.type) {

    case ActionsTypes.CURRENT_LOCATION:
      return { ...state, currentLocation: action.currentLocation }; 
      
    case ActionsTypes.FAVORITE_ADD:
      // return { ...state, favoritesArray: ((()=>{return [...state.favoritesArray, action.newItem]})()) }; 
      // return { ...state, favoritesArray: ["aefhb","afejbn"] }; 
      return { ...state, favoritesArray: ((()=>{
        console.log("test a", action.newItem);
        console.log("test b", state);
      
        return [...state.favoritesArray, action.newItem];
      })())};
      // return { ...state, favoritesArray: state.favoritesArray === undefined ? [action.newItem] : [...state.favoritesArray, action.newItem] }; 

    case ActionsTypes.FAVORITE_REMOVE:
      return { ...state, favoritesArray: state.favoritesArray.filter(items =>  items !== action.itemToDelete)};
      // return { ...state };
     
    case ActionsTypes.THEME_MODE:
      return {...state, themeIsDark: ((()=>{ return action.themeMode})())}; 
      
    case ActionsTypes.TEMPERATURE_MODE:
      return {...state, contactItem: action.temperatureMode }; 

    default:
      return state;
  }
};
