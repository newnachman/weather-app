import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { changeTemperatureMode, changeThemeMode } from './../redux/Actions';
import { useSelector } from 'react-redux';
import { constants } from '../constants/constants';

const Navbar = () => {
// THEME_MODE
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
     <nav>
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
           {themeIsDark ? "GO LIGHT MODE" : "GO DARK MODE"}
         </li>
         <li onClick={toggleTemperatureMode}>
           {isFahrenheit ? "GO CELSIUS" : "GO FAHRENHEIT"}
         </li>
       </ul>
     </nav>
  )
}

export default Navbar
