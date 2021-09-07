import React, {useState} from 'react';

const Navbar = () => {

  const [menuIsDisplayed, setMenuIsDisplayed] = useState(false)

  const toggleMenu = () => {
    setMenuIsDisplayed(!menuIsDisplayed);
  }

  const closeMenu = () => {
    setMenuIsDisplayed(false);
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
         <li onClick={closeMenu}>
           <a tabIndex="3" href="/main">MAIN</a>
         </li>
         <li onClick={closeMenu}>
           <a tabIndex="4" href="/favorites">FAVORITES</a>
         </li>
         <li onClick={closeMenu}>
           <a tabIndex="5" href="/#about">GO DARK MODE</a>
         </li>
         <li onClick={closeMenu}>
           <a tabIndex="6" href="/#methods">GO CELSIUS</a>
         </li>
       </ul>
     </nav>
  )
}

export default Navbar
