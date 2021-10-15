import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

body {
  margin: 0;
  height: 100vh;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
  font-family: 'Mulish', sans-serif;
}

div {
  box-sizing: border-box;
}

`;