import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import styled from 'styled-components';
import { useFetch } from '../hooks/useFetch';
import {getCitiesAutocompleteUrl} from '../api/accuweather';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { defaultLocation, defaultTemperatureMode } from '../api/accuweather';
import { setCurrentLocation, changeTemperatureMode } from './../redux/Actions';
import { useParams } from 'react-router-dom';
import { createLocationsObjects } from '../helpers/createLocationObjects';

const SearchInput = () => {

  const { id } = useParams();
  const themeIsDark = useSelector(state => state.themeIsDark);
  const { response, fetchData } = useFetch();
  const [cities, setCities] = React.useState([]);
  const [searchWord, setSearchWord] = React.useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    let currentLoc = createCurrentLocationFromParam(id);
     dispatch(setCurrentLocation(currentLoc));
     dispatch(changeTemperatureMode(defaultTemperatureMode));
  }, [dispatch, id]);

  const createCurrentLocationFromParam = (param) => {
    if (!param || !param.includes("::")) {
      return defaultLocation;
    } 
    let paramArray = param.split("::");
    return {city: paramArray[0], country: paramArray[1], key: paramArray[2]};
  }

  useEffect(()=>{
    if (searchWord) {
      fetchData('CITIES_AUTOCOMPLETE', getCitiesAutocompleteUrl(searchWord));
    }
  },[searchWord, fetchData]);

  useEffect(() => {
    if (!response?.loading && response?.data ) {
      setCities(createLocationsObjects(response.data));
    }
  },[response]);


  // Updates the location objects when choosing a new city in search field:
  const updateLocation = (value) => {
    if (value?.locationCity && value?.locationCountry && value?.locationKey) {
      dispatch(setCurrentLocation({city: value.locationCity, country: value.locationCountry, key: value.locationKey}));
    }
  }

  return (
     <SearchInputDiv>
        <SearchBox
          themeIsDark = {themeIsDark}
          getOptionSelected ={(option, value) => option.locationDisplay === value.locationDisplay}
          onInputChange = { (e) => { setSearchWord(e.target.value) }}
          onChange = { (e, value) => { updateLocation(value) }}
          id="combo-box-demo"
          options={cities || []}
          getOptionLabel={(option) => option.locationDisplay}
          renderInput={(params) => <TextField {...params} label="search city" variant="outlined" />}
        />
     </SearchInputDiv>
  )
}

export default SearchInput;

const SearchInputDiv = styled.div`
  /* background-color: #003c7d; */
  background-color: #214163;
  color: #ffffff;
  width: 100%;
  margin: auto;
  padding: 10px;
`;

const SearchBox = styled(Autocomplete)`
  background-color: #ffffff;
  color: #003c7d;
  width: 400px !important;
  margin: auto;
  outline: none !important;
  border: none !important;

  .MuiFormControl-root {
    background-color: ${props => props.themeIsDark ? "#dcdcdc" : "#fff"} ;
  }

  .MuiFormControl-root fieldset {
    display: none;
  }

  .MuiInputLabel-outlined {
    z-index: 1;
    transform: translate(10px, 11px) scale(1);
    pointer-events: none;
  }

  label#combo-box-demo-label {
    color: #003c7d;
    background-color: ${props => props.themeIsDark ? "#dcdcdc" : "#fff"} ;
    padding: 10px;
    border-radius: 0.5rem;
    outline: none;
  }

`;
