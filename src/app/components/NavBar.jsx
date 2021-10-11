import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { changeTemperatureMode, changeThemeMode } from './../redux/Actions';
import { useSelector } from 'react-redux';
import { constants } from '../constants/constants';
import styled from 'styled-components';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const Navbar = () => {

  const themeIsDark = useSelector(state => state.themeIsDark);
  const temperatureMode = useSelector(state => state.temperatureMode);
  const [isFahrenheit, setIsFahrenheit] = useState();
  const dispatch = useDispatch();
  const [menuIsDisplayed, setMenuIsDisplayed] = useState(false);

  useEffect(() => {
    setIsFahrenheit(temperatureMode.unit === 'F')
  }, [temperatureMode]);

  const toggleTemperatureMode = () => {
    let changeTemperatureTo = 
          isFahrenheit 
          ? 
          constants.TEMPERATURE_MODE.CELSIUS 
          : 
          constants.TEMPERATURE_MODE.FAHRENHEIT;
    dispatch(changeTemperatureMode(changeTemperatureTo));
  }

  const toggleTheme = () => {
    dispatch(changeThemeMode(!themeIsDark));
  }

  const toggleMenu = () => {
    setMenuIsDisplayed(!menuIsDisplayed);
  }

  return (
     <AppNav>
       <a href="/" className="logo" tabIndex="1">
        <span>weather app</span>
       </a>
       <div className="menu-btn-wrp">
         <div className="menu-arrow">
          <span>open menu</span>
          <i className="fa fa-arrow-right"></i>
          {/* <img src="" alt="arrow directing to menu button" /> */}
         </div>
        <button tabIndex="2" className="menu-toggler" onClick={toggleMenu}>
         <i className="fa fa-bars"></i>
        </button>
       </div>
       <ul className={`${menuIsDisplayed ? "display" : ""}`}>
         <li>
           <a tabIndex="3" href="/main">MAIN</a>
         </li>
         <li>
           <a tabIndex="4" href="/favorites">FAVORITES</a>
         </li>
         <li onClick={toggleTheme}>      
          <IconWrapper positionTop="150px">
           {themeIsDark ? 
              <>
              <LightModeOutlinedIcon fontSize='large'/>
              <label>Go light mode</label>
              </>
            : 
              <>
              <Brightness4Icon fontSize='large'/>
              <label>Go dark mode</label>
              </>
            }
          </IconWrapper> 
         </li>
         <li onClick={toggleTemperatureMode}>
          <IconWrapper positionTop="270px">
            {isFahrenheit ? 
                <>
                <div className="weather-circle">C</div>
                <label>Go Celsius</label>
                </>
              : 
                <>
                <div className="weather-circle">F</div>
                <label>Go Fahrenheit</label>
                </>
              }
            </IconWrapper> 
         </li>
       </ul>
     </AppNav>
  )
}

export default Navbar;

const AppNav = styled.nav`
  height: 90px;
  /* background-color: white;
  border-bottom: 1px solid #8f8f92; */
  
  .menu-btn-wrp {
    display: none;
  }

  a.logo span {
    text-transform: uppercase;
    font-size: 2rem;
    color: #ff5e2b;
    text-decoration: none;
    text-shadow: 5px 3px 3px rgb(192 190 190 / 56%);
  }

  ul li {
    display: inline-block;
    margin: 10px;
  }

  ul li a {
    color: ${props => props.theme.color};
    font-size: 25px;
    text-decoration: none;
  }

  a.logo {
    position: absolute;
    left: 3%;
    top: 30px;
    text-align: left;
    z-index: 10;
    text-decoration: none;
  }

  ul {
    float: right;
    margin-right: 20px;
  }

  @media screen and (max-width: 600px){

    a.logo span {
      font-size: 1.3rem;
      font-weight: 700;
    }

    .menu-btn-wrp {
      display: block;
      position: absolute;
      padding: 0;
      z-index: 9999;
      font-size: 25px;
      color: #ff5e2b;
      top: 2%;
      right: 0;
      width: 200px;
      border: none;
      outline: none;
    }

    .menu-arrow {
      display: inline-block;
    }
    .menu-arrow i {
      margin-left: 10px;
    }

    .menu-toggler {
      display: inline-block;
      position: absolute;
      margin-left: 20px;
      padding: 0;
      z-index: 9999;
      background-color: #fff;
      font-size: 25px;
      color: #ff5e2b;
      outline: none;
      border: none;
    }

    ul {
      margin-right: 0;
      float: unset;
      position: absolute;
      right: 0;
      top: 70px;
      width: 100%;
      height: 0;
      transition: 1s all;
      padding: 0;
      z-index: 99999;
      overflow: hidden;
    }

    ul.display{
      height: 370px;
      background-color: white;
    }

    ul li {
      display: block;
      /* height: 0; */
      background-color: white;
      width: 100%;
      border-bottom: 2px solid #e637671c;
    }

  }

`;

const IconWrapper = styled.div`
    position: absolute;
    top: ${(props) => props.positionTop};
    right: 50px;
    height: 100px;
    text-align: center;
    max-width: 90px;
    box-shadow: -2px 2px 4px 0px #000f1efa;
    padding: 14px;
    border-radius: 0.3rem;
    border: 1px solid ${(props) => props.theme.color};

    label {
      font-size: 15px;
      display: block;
      margin-top: 5px;
    }

    .weather-circle {
      border-radius: 50%;
      padding: 7px;
      width: 30px;
      height: 30px;
      margin: auto;
      background-color: ${(props) => props.theme.color};
      color: ${(props) => props.theme.backgroundColor};
    }
`;