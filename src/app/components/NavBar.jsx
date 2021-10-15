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

  const toggleAfterDelay = (effect) => {
    toggleMenu();
    setTimeout(() => {
      effect();
    }, 1500);
  }

  return (
     <AppNav>
       <a href="/" className="logo" tabIndex="1">
        <span>weather app</span>
        <img src="/logo-weather.png" alt="" />
       </a>
       <div className="menu-btn-wrp">
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
         <li onClick={() => {toggleAfterDelay(toggleTheme)}}>      
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
         <li onClick={ () => {toggleAfterDelay(toggleTemperatureMode)}}>
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
  
  .menu-btn-wrp {
    display: none;
  }

  a.logo span {
    font-family: 'ZCOOL KuaiLe', cursive;
    text-transform: uppercase;
    font-size: 2rem;
    color: #ff5e2b;
    text-decoration: none;
    /* text-shadow: 5px 3px 3px rgb(192 190 190 / 56%); */
  }

  a.logo {
    position: absolute;
    left: 3%;
    top: 30px;
    text-align: left;
    z-index: 10;
    text-decoration: none;
  }

  a.logo img {
    max-width: 50px;
    transform: rotate(10deg);
    position: absolute;
    top: -15px;
    right: -60px;
  }

  ul {
    float: right;
    margin-right: 3%;
  }

  ul li {
    display: inline-block;
    margin: 15px 40px;
  }

  ul li a {
    color: ${props => props.theme.color};
    font-size: 25px;
    font-weight: 400;
    text-decoration: none;
    transition: all 0.5s ease;
    border-bottom: 1px solid #ff5e2b;
  }

  ul li a:hover {
    color: #ff5e2b;
    font-weight: 900;
    padding: 5px;
    border-bottom: 2px solid #ff5e2b;
  }

  @media screen and (max-width: 1000px){

    a.logo {
      left: 5%;
      top: 40px;
    }

    a.logo span {
      font-size: 1.3rem;
      font-weight: 700;
    }

    .menu-btn-wrp {
      display: block;
    }
    
    .menu-toggler {
      cursor: pointer;
      display: inline-block;
      position: absolute;
      right: 5%;
      top: 30px;
      padding: 0;
      z-index: 9999;
      font-size: 35px;
      color: #ff5e2b;
      outline: none;
      border: none;
      background-color: transparent;
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
      border-bottom: 1px solid #ff5e2b94; 
      height: 400px;
      background-color: ${props => props.theme.backgroundColor};
      box-shadow: 0px 17px 20px 2px #8080806e;
    }

    ul li {
      display: block;
      width: 90%;
      margin: 30px auto;
      border-bottom: 2px solid #e637671c;
    }

    ul li a {
      border-bottom: none;
    }

    ul li a:hover {
      color: #ff5e2b;
      font-weight: 900;
      border-bottom: none;
    }

  }

`;

const IconWrapper = styled.div`

    position: absolute;
    top: ${(props) => props.positionTop};
    right: 3%;
    height: 105px;
    text-align: center;
    width: 95px;
    box-shadow: -2px 2px 4px 0px #000f1efa;
    padding: 15px 5px;
    border-radius: 0.3rem;
    border: 1px solid ${(props) => props.theme.color};
    cursor: pointer;
    transition: right 1s ease;

    &:hover {
      right: 4%;
    }

    label {
      cursor: pointer;
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

    @media screen and (max-width: 1000px){

      position: initial;
      height: unset;
    width: 100%;
    
    border-radius: 0.3rem;
    border: 1px solid ${(props) => props.theme.color};
    cursor: pointer;
    transition: all 1s ease;

    &:hover {
      right: 4%;
    }

    label {
      cursor: pointer;
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

    }
`;