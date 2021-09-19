import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

body {
  margin: 0;
  height: 100vh;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
}

div {
  box-sizing: border-box;
}

/* nav {
  background-color: white;
  border-bottom: 1px solid #8f8f92;
  height: 90px;
  background-color: white;
  border-bottom: 1px solid #8f8f92;
} */
/* 
.menu-btn-wrp {
  display: none;
}

nav a.logo span {
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
  color: #8f8f92;
  font-size: 25px;
  text-decoration: none;
}

nav a.logo {
  position: absolute;
  left: 3%;
  top: 30px;
  text-align: left;
  z-index: 10;
  text-decoration: none;
}

nav ul {
  float: right;
  margin-right: 20px;
} */
/* 
fieldset {
  display: none !important;
} */

@media screen and (max-width: 600px){

  nav a.logo span {
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

  nav ul {
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

  nav ul.display{
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