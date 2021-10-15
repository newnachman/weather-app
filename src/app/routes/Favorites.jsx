import React from 'react';
import FavoritesContainer from '../../app/components/FavoritesContainer';
import Navbar from './../components/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';


const Favorites = () => {

  const {currentLocation, favoritesArray} = useSelector(state => state);
  const dispatch = useDispatch();


  return (
    <>
      <Navbar/>
      <MainContainer>
        <FavoritesContainer/>
      </MainContainer>
    </>
  )
}

export default Favorites;

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