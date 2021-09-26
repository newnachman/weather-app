import React, {useEffect, useState} from 'react';
import MainWeatherContainer from './../components/MainWeatherContainer';
import SearchInput from '../components/SearchInput';
import Navbar from './../components/NavBar';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { defaultLocation, defaultTemperatureMode, getLocationKeyByPositionUrl } from '../api/accuweather';
import { setCurrentLocation, changeTemperatureMode } from './../redux/Actions';
import { useParams } from 'react-router-dom';
import { createCurrentLocation } from '../helpers/createLocations';
import { useFetch } from '../hooks/useFetch';



const Main = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { response, fetchData } = useFetch();
  const [detectedCoordinates, setDetectedCoordinates] = useState(null)
  const [detectedLocation, setDetectedLocation] = useState(null);

  useEffect(() => {
    dispatch(changeTemperatureMode(defaultTemperatureMode));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setDetectedCoordinates({latitude: position.coords.latitude, longitude: position.coords.longitude})
      });
    }
  }, [dispatch])

  useEffect(() => {
    if (detectedCoordinates?.latitude && detectedCoordinates?.longitude) {
      fetchData('GET_KEY_BY_LOCATION', getLocationKeyByPositionUrl(detectedCoordinates.latitude, detectedCoordinates.longitude));
    }
  }, [fetchData, detectedCoordinates]);

  useEffect(() => {
    if (response.data && !response.loading) {
      setDetectedLocation( {
        city: response.data.LocalizedName, 
        country: response.data.Country.LocalizedName, 
        key: response.data.Key})
    }
  },[response])

  useEffect(() => {
     let currentLoc = createCurrentLocation(detectedLocation, defaultLocation, id);
     dispatch(setCurrentLocation(currentLoc));
  }, [dispatch, id, detectedLocation]);


  return (
    <>
      <Navbar/>
      <MainContainer>
        <SearchInput/>
        <MainWeatherContainer/>
      </MainContainer>
    </>
  )
}

export default Main;

const MainContainer = styled.div`
  width: 70%;
  padding: 10px;
  margin: 50px auto;

  @media screen and (max-width: 600px){
    width: 95%;
  }
`;
