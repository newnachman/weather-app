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

`;