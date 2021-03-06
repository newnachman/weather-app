import { getArrayNumberByTimePassed, changeAccessKeyNumber} from '../helpers/timeHelpers';



// Default initial weather data:
export const defaultLocation = {city: "Tel-Aviv", country: 'Israel', key: '215854'}; 
export const defaultTemperatureMode = {mode: 'Metric', name: 'Celsius', unit: 'C'}; 
// export const defaultTemperatureMode = {mode: 'Imperial', name: 'Fahrenheit', unit: 'F'}; 

// Keys for auth access to accuweather API:
const keys = [
    "hXUwroSoLsNYusB47tLETxNfYXNtt9JZ",
    "wE4p1ikaQLto2D0yaqI5LqJUn2iFEAXr",
    "hMDNS0V0XlPmv0uL0oBs9DuRHA9Lspe6",
    "XZmaPqQsLLueLVBAxrE6OTC73dXFCN8A",
]

// If one key is blocked, change to other key:
export const changeKey = () => {
    changeAccessKeyNumber(keys.length);
}

// Api key:
const currentKey = keys[getArrayNumberByTimePassed(keys.length, 900)];
const accuweatherApiKey = '?apikey=' + currentKey;

// Base url:
const accuweatherBaseUrl = 'https://dataservice.accuweather.com/';

// Creating dynamic URLs for fetching Api:
export const getCurrentWeatherUrl = (locationKey) => {
    if (!locationKey) {  return false;  }
    return accuweatherBaseUrl + 'currentconditions/v1/' + locationKey + accuweatherApiKey;
}

export const getForecastWeatherUrl = (locationKey, isCelsius) => { 
    if (!locationKey) {  return false;  }
    return accuweatherBaseUrl + 'forecasts/v1/daily/5day/' + locationKey + accuweatherApiKey + '&metric=' + isCelsius;
}

export const getCitiesAutocompleteUrl = (searchKey) => {
    if (!searchKey) {  return false;  }
    return accuweatherBaseUrl + 'locations/v1/cities/autocomplete' + accuweatherApiKey + '&q=' + searchKey;
}

export const getLocationKeyByPositionUrl = (lat, lon) => {
    if (!lat || !lon) {  return false;  }
    return accuweatherBaseUrl + 'locations/v1/cities/geoposition/search' + accuweatherApiKey + '&q=' + lat + '%2C' + lon;
}

export const getWeatherIconUrl = (iconNumber) => {
    if (!iconNumber) {  return false;  }
    // string of image number in api endpoint is always two-digit-number
    if (iconNumber < 10) {
        iconNumber = '0' + iconNumber;
    }
    return 'https://developer.accuweather.com/sites/default/files/' + iconNumber + '-s.png';
}




