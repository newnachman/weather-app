import React, {useEffect, useState} from 'react';
import MainWeatherContainer from './../components/MainWeatherContainer';
import SearchInput from '../components/SearchInput';
import Navbar from './../components/NavBar';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { defaultLocation, defaultTemperatureMode, getLocationKeyByPositionUrl } from '../api/accuweather';
import { setCurrentLocation, changeTemperatureMode, setSnackbar } from './../redux/Actions';
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
        setDetectedCoordinates({status: "SUCCESS", latitude: position.coords.latitude, longitude: position.coords.longitude})
      });
    } else {
      setDetectedCoordinates({status: "FAILED", })
    }
  }, [dispatch])

  useEffect(() => {
    if (detectedCoordinates?.status === "SUCCESS") {
      fetchData('GET_KEY_BY_LOCATION', getLocationKeyByPositionUrl(detectedCoordinates.latitude, detectedCoordinates.longitude));
    }
  }, [fetchData, detectedCoordinates]);

  useEffect(() => {
    if (response.error) {
      dispatch(setSnackbar({display: true, message: `There was a problem retrieving data in: ${response.data} please try later or contact us if the problem persists`, type: "error"}));
      return;
    }
    if (response.data && !response.loading) {
      setDetectedLocation( {
        city: response.data.LocalizedName, 
        country: response.data.Country.LocalizedName, 
        key: response.data.Key})
    }
  },[response, dispatch])

  useEffect(() => {
     if (detectedCoordinates?.status === "FAILED" || detectedLocation) {
      let currentLoc = createCurrentLocation(detectedLocation, defaultLocation, id);
      dispatch(setCurrentLocation(currentLoc));
     }
  }, [dispatch, id, detectedLocation, detectedCoordinates]);


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
  
  @media screen and (max-width: 1000px){
    width: 90%;
  }

  @media screen and (max-width: 700px){
    width: 100%;
  }
`;
