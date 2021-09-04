import ActionsTypes from './ActionsTypes';

  export const setCurrentLocation = (currentLocation) => ({                       
    type: ActionsTypes.CURRENT_LOCATION,
    currentLocation
  })
  
  export const addFavorite = (newItem) => ({                       
    type: ActionsTypes.FAVORITE_ADD,
    newItem
  })
  
  export const removeFavorite = (itemToDelete) => ({      
    type: ActionsTypes.FAVORITE_REMOVE,
    itemToDelete
  })
  
  export const changeThemeMode = (themeMode) => ({                   
    type: ActionsTypes.THEME_MODE,
    themeMode
  })
  
  export const changeTemperatureMode = (temperatureMode) => ({                   
    type: ActionsTypes.TEMPERATURE_MODE,
    temperatureMode
  })
  
  