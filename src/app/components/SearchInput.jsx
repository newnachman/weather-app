import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import styled from 'styled-components';
import { useFetch } from '../hooks/useFetch';
import {getCitiesAutocompleteUrl} from '../api/accuweather';
import { useDispatch } from 'react-redux';
import { defaultLocation } from '../api/accuweather';
import { setCurrentLocation } from './../redux/Actions';

const SearchInput = () => {
  const { response, fetchData } = useFetch();
  const [cities, setCities] = React.useState([]);
  const [searchWord, setSearchWord] = React.useState('');
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(setCurrentLocation(defaultLocation));
  }, [dispatch]);

  useEffect(()=>{
    if (searchWord) {
      fetchData('CITIES_AUTOCOMPLETE', getCitiesAutocompleteUrl(searchWord));
    }
  },[searchWord, fetchData]);

  useEffect(() => {
    if (!response?.loading && response?.data ) {
      setCities(response.data);
    }
  },[response]);

  const updateLocation = (value) => {
    if (value?.LocalizedName && value?.Key) {
      dispatch(setCurrentLocation({city: value.LocalizedName, key: value.Key}));
    }
  }

  return (
     <SearchInputDiv>
        <SearchBox
          getOptionSelected ={(option, value) => option.LocalizedName === value.LocalizedName}
          onInputChange = { (e) => { setSearchWord(e.target.value) }}
          onChange = { (e, value) => { updateLocation(value) }}
          id="combo-box-demo"
          options={cities}
          getOptionLabel={(option) => option.LocalizedName}
          renderInput={(params) => <TextField {...params} label="search city" variant="outlined" />}
        />
     </SearchInputDiv>
  )
}

export default SearchInput;

const SearchInputDiv = styled.div`
  background-color: #003c7d;
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

  /* .MuiFormLabel-root.Mui-focused {
    color: #003c7d;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 0.5rem;
    outline: none;
    /* transform: translate(8px, 11px) scale(1); */
  

  .MuiInputLabel-outlined {
    z-index: 1;
    transform: translate(10px, 11px) scale(1);
    pointer-events: none;
  }

  label#combo-box-demo-label {
    color: #003c7d;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 0.5rem;
    outline: none;
  }

`;
