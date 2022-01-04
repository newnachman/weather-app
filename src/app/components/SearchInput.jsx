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
    if (response.error) {
      dispatch(setSnackbar({display: true, message: `There was a problem retrieving data in: ${response.data} please try later or contact us if the problem persists`, type: "error"}));
      return;
    }
    if (!response?.loading && response?.data ) {
      setCities(createSearchLocationsObjects(response.data));
    }
  },[response, dispatch]);
  
  const searchInputChange = (value) => {
    let allowedChars = /^[A-Za-z]+$/;
    if (typeof value !== "string") {
      return false;
    }
    if (value === '') {
      setSearchWord(value)
    }else if (value.match(allowedChars)) {
      setSearchWord(value)
    }else{
      dispatch(setSnackbar({display: true, message: "Please insert only English (a-z, A-Z) in search field", type: "warning"}));
      return false;
    }
  }

  // Updates the location objects when choosing a new city in search field:
  const updateLocation = (value) => {
    setSearchWord('');
    if (value?.locationCity && value?.locationCountry && value?.locationKey) {
      dispatch(setCurrentLocation({city: value.locationCity, country: value.locationCountry, key: value.locationKey}));
    }
  }

  return (
     <SearchInputDiv themeisdark = {themeIsDark.toString()}>
        <SearchBox
          themeisdark = {themeIsDark.toString()}
          getOptionSelected ={(option, value) => option.locationDisplay === value.locationDisplay}
          onInputChange = { (e) => { e && searchInputChange(e.target.value); }}
          inputValue = {searchWord}
          onChange = { (e, value) => { updateLocation(value); }}
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
  background-color: ${props => props.themeisdark === "true" ? "#214163" : props.theme.color}; 
  color: #ffffff;
  width: 100%;
  margin: auto;
  padding: 10px;
`;

const SearchBox = styled(Autocomplete)`
  max-width: 600px !important;
  margin: auto;
  outline: none !important;
  border: none !important;

  .MuiFormControl-root {
    background-color: ${props => props.themeisdark === "true" ? "#d6dbef" : "#fff"} ;
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
    background-color: ${props => props.themeisdark === "true" ? "#d6dbef" : "#fff"} ;
    padding: 10px;
    border-radius: 0.5rem;
    outline: none;
  }

`;
