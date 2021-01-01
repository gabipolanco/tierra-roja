import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`

html {
  scroll-behavior: smooth;
}

body{
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.font.primary};
  font-weight: lighter;
  font-size: 16px;
}

h2 {
  font-size: 1rem;
}
h3 {
  font-size: .8rem;
}

@media ${props => props.theme.device.tablet} {
  h2 {
    font-size: 1.7rem;
  }
  h3 {
    font-size: 1.2rem;
  }
}
  
a {
  text-decoration:none;
  color: black;
}
li {
  list-style:none;
  font-size: 12px;
}
ul {
  padding:0;
  margin:0;
}

.btn {
  outline:none;
  border:none;
  text-decoration:none;
  text-transform:uppercase;
  background:#202020;
  color:#eaeaea;
  letter-spacing: 2px;
  box-sizing:border-box;
  padding: 5px 10px;
  cursor: pointer;
}

@media ${props => props.theme.device.lgPhone} {
  .btn {
    padding: 5px 20px;
  }
}

@media ${props => props.theme.device.tablet} {
  .btn {
    padding: 10px 40px;
  }
}

.btn-reverse {
  font-family: ${props => props.theme.font.primary};
  background:transparent;
  color:#202020;
  border: 2px solid #202020;
}

  .page {
    padding: 50px 0 0 50px;
    font-family: ${props => props.theme.font.secondary};
  }

#brand{
    position: absolute;
    bottom: 0;
    left: 100px;
    width: 40%;
    height: auto;
}

::-webkit-scrollbar{
    display: none;
}
`
 
export default GlobalStyle;