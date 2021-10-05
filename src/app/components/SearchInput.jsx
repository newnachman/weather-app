import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import styled from 'styled-components';
import { useFetch } from '../hooks/useFetch';
import {getCitiesAutocompleteUrl} from '../api/accuweather';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCurrentLocation, setSnackbar } from './../redux/Actions';
import { createSearchLocationsObjects } from '../helpers/createLocations';

const SearchInput = () => {

  const themeIsDark = useSelector(state => state.themeIsDark);
  const { response, fetchData } = useFetch();
  const [cities, setCities] = React.useState([]);
  const [searchWord, setSearchWord] = React.useState('');
  const dispatch = useDispatch();

  useEffect(()=>{
    if (searchWord) {
      fetchData('CITIES_AUTOCOMPLETE', getCitiesAutocompleteUrl(searchWord));
    }
  },[searchWord, fetchData]);

  useEffect(() => {
    if (!response?.loading && response?.data ) {
      setCities(createSearchLocationsObjects(response.data));
    }
  },[response]);

  const searchInputChange = (value) => {
    let allowedChars = /^[A-Za-z]+$/;
    if (value === '' || value.match(allowedChars)) {
      setSearchWord(value)
    }else{
      // set here a dialog to explain only english chars are allowed
      dispatch(setSnackbar({display: true, message: "Please insert only English (a-z, A-Z) in search field", type: "warning"}));
      return false;
    }
  }

  // Updates the location objects when choosing a new city in search field:
  const updateLocation = (value) => {
    if (value?.locationCity && value?.locationCountry && value?.locationKey) {
      dispatch(setCurrentLocation({city: value.locationCity, country: value.locationCountry, key: value.locationKey}));
    }
  }

  return (
     <SearchInputDiv themeIsDark = {themeIsDark}>
        <SearchBox
          themeIsDark = {themeIsDark}
          getOptionSelected ={(option, value) => option.locationDisplay === value.locationDisplay}
          onInputChange = { (e) => { searchInputChange(e.target.value) }}
          inputValue = {searchWord}
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
  background-color: ${props => props.themeIsDark ? "#214163" : props.theme.color}; 
  color: #ffffff;
  width: 100%;
  margin: auto;
  padding: 10px;
`;

const SearchBox = styled(Autocomplete)`
  width: 400px !important;
  margin: auto;
  outline: none !important;
  border: none !important;

  .MuiFormControl-root {
    background-color: ${props => props.themeIsDark ? "#d6dbef" : "#fff"} ;
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
    background-color: ${props => props.themeIsDark ? "#d6dbef" : "#fff"} ;
    padding: 10px;
    border-radius: 0.5rem;
    outline: none;
  }

`;
