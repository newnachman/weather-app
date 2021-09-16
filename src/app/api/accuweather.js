

// Default initial weather data:
export const defaultLocation = {city: "Tel-Aviv", country: 'Israel', key: '215854'}; 

export const defaultTemperatureMode = {mode: 'Metric', name: 'Celsius', unit: 'C'}; 
// export const defaultTemperatureMode = {mode: 'Imperial', name: 'Fahrenheit', unit: 'F'}; 


// Api key:
export const accuweatherApiKey = '?apikey=' + process.env.REACT_APP_ACCUWEATHER_API_KEY;


// Creating dynamic URLs for fetching Api:
export const getCurrentWeatherUrl = (locationKey) => {
    if (!locationKey) {
        return false;
    }
    return 'http://dataservice.accuweather.com/currentconditions/v1/' + locationKey + accuweatherApiKey;
}

export const getForecastWeatherUrl = (locationKey, isMetric) => {
    return 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + accuweatherApiKey + '&metric=' + isMetric;
}

export const getCitiesAutocompleteUrl = (searchKey) => {
    return 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete' + accuweatherApiKey + '&q=' + searchKey;
}

export const getWeatherIconUrl = (iconNumber) => {
    // string of image number in api endpoint is always two-digit-number
    if (iconNumber < 10) {
        iconNumber = '0' + iconNumber;
    }
    return 'https://developer.accuweather.com/sites/default/files/' + iconNumber + '-s.png';
}




