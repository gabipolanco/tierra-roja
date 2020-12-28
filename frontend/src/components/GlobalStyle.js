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


.slide{
    height: 100vh;
    width: 100vw;
    scroll-snap-align: start;
}

.wrapper {
    display: flex;
    flex-direction: row;
    width: 600vw;
    transform:rotate(90deg) translateY(-100vh);
    transform-origin: top left;
}

.one {
    position: relative;
    background-image: url("https://res.cloudinary.com/tomiscattini/image/upload/v1607960585/tierra-roja/Imagenes%20pagina/clayhands_qmduob.jpg");
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: 10vw center;
    background-color:white;
    overflow: hidden;
    transition: background-size 1s linear;
    scroll-snap-align: center;
    &:hover {
      background-size: 54%;
    }
}

@media ${props => props.theme.device.tablet} {
  .one {
    background-position: center center;
  }
}

.two{
    position: relative;
    background-image: url("https://res.cloudinary.com/tomiscattini/image/upload/v1607960584/tierra-roja/Imagenes%20pagina/AdobeStock_300369356_ji8bpw.jpg");
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: 30vw 90%;
    background-color:white;
    overflow: hidden;
    transition: background-size 1s linear;
    scroll-snap-align: center;
    &:hover {
      background-size: 83%;
    }
}

@media ${props => props.theme.device.laptop} {
  .two {
    background-position: 25vw -13vh;
  }
}

.three{
    position: relative;
    background-image: url("https://res.cloudinary.com/tomiscattini/image/upload/v1607960585/tierra-roja/Imagenes%20pagina/roots_zuuct1.jpg");
    background-size: 85%;
    background-repeat: no-repeat;
    background-position: 10vw 20vh;
    background-color:white;
    transition: background-size 1s linear;
    scroll-snap-align: center;
    &:hover {
      background-size: 87%;
    }
}

@media ${props => props.theme.device.laptop} {
  .three {
    background-size: 65%;
    background-position: center center;
    &:hover {
      background-size: 67%;
    }
  }
}

.four{
    position: relative;
    background-image: url("https://res.cloudinary.com/tomiscattini/image/upload/v1607960584/tierra-roja/Imagenes%20pagina/branch_dkmbjh.jpg");
    background-size: 78%;
    background-repeat: no-repeat;
    background-position: 20vw 70vh;
    background-color:white;
    transition: background-size 1s linear;
    scroll-snap-align: center;
    &:hover {
      background-size: 81%;
    }
}

@media ${props => props.theme.device.lgPhone} {
    .four {
      background-position: center 50vh;
    }
}
@media ${props => props.theme.device.laptop} {
  .four {
    background-size: 78%;
    background-position: center center;
    &:hover {
      background-size: 81%;
    }
  }
}

.five{
    position: relative;
    background-image: url("https://res.cloudinary.com/tomiscattini/image/upload/v1607960585/tierra-roja/Imagenes%20pagina/tierra_igetub.jpg");
    transform: rotate(180deg);
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center center;
    background-color:white;
    transition: background-size 1s linear;
    scroll-snap-align: center;
    &:hover {
      background-size: 74%;
    }
}
.six {
  background-color: ${props => props.theme.color.main};
  &:hover {
    background-size: 100%;
  }
}

.outer-wrapper{
    width: 100vh;
    height: 100vw;
    transform: rotate(-90deg) translateX(-100vh);
    transform-origin: top left;
    overflow-y:scroll;
    overflow-x: hidden;
    position: absolute;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-snap-type: y proximity;
    scroll-behavior: smooth;
}

::-webkit-scrollbar{
    display: none;
}

.rotate{
    -webkit-transform:rotate(270deg);
    -moz-transform:rotate(270deg);
    -o-transform:rotate(270deg);
    writing-mode:lr-tb;
}

#about {
    .side-div {
      display: flex;
      justify-content: flex-end;
      position:absolute;
      height:100%;
      width: 0;
      background: ${props => props.theme.color.main + '77'};
      transform: skewX(-5deg) translateX(-50px);
      transition: 1s all ease-in-out;
      -webkit-transition: 1s all ease-in-out;
    }
    .content {
      display: flex;
      position:relative;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      top: calc(50vh - 150px);
      padding-right: 20vw;
      box-sizing: border-box;
      left: 70px;
      color:#000;
      z-index:10;
      height:300px;
      width: 30%;
      h2 {
        font-size: 3rem;
        text-align: left;
      }
    }
}

@media ${props => props.theme.device.lgPhone} {
  #about .content h2 {
      font-size: 3.5rem;
    }
}
@media ${props => props.theme.device.tablet} {
  #about .content h2 {
      font-size: 4rem;
    }
}

.anim-trans {
  transform: skewX(3deg) translateX(0)!important;
  width:100vw!important;
  z-index:11; 
  box-shadow: 10px 10px 5px #eaeaea;
  }

.transition .about-info {
  transform: skewX(-3deg);
  opacity: 0;
  width: 100%;
  height: 80vh;
  margin: 100px 50px;
  padding: 50px;
  background-color: white;
  text-align: justify;
  transition: all .5s ease;
}

@media ${props => props.theme.device.lgPhone} {
  .transition .about-info {
    width: 70%;
  }
}

@media ${props => props.theme.device.tablet} {
  .transition .about-info {
    width: 50%;
    background-color: rgba(255, 255, 255, .5);
  }
}

@media ${props => props.theme.device.desktop} {
  .transition .about-info {
    width: 30%;
  }
}

#portfolios {
  position: relative;
  display: flex;
  justify-content: flex-end;
  .content {
    position: relative;
    height: 100vh;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    color:#000;
    z-index:10;
    padding-bottom: 50px;
    text-align: left;
    h2 {
      transform: rotate(-90deg);
      font-size: 2.5rem;
    }
    .btn {
      margin-top: 100px;
      margin-right: 70px;
    }
  }
}

@media ${props => props.theme.device.tablet} {
  #portfolios .content {
    padding-bottom: 100px;
    h2 {
      font-size: 3rem;
    }
    .btn {
      margin-top: 100px;
      margin-right: 100px;
    }
  }
}
@media ${props => props.theme.device.laptop} {
  #portfolios .content {
    padding-bottom: 0;
    justify-content: center;
    .btn {
      margin-top: 100px;
      margin-right: 100px;
    }
  }
}

#galeria {
  position: relative;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-left: 100px;
    width: 50%;
    height: 100vh;
    z-index: 10;
    h2 {
      transform: rotate(90deg);
      margin-top: 50px; 
      text-align: left;
      font-size: 2.5rem; 
    }
    .btn {
      margin-top: 150px;
    }
  }
}

@media ${props => props.theme.device.laptop} {
  #galeria .content {
    width: 25%;
    margin-left: 0;
    h2 {
      margin-top: 100px; 
      font-size: 3rem;
    }
  }
}

#escenario {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  .content {
    margin-bottom: 20vh;
    transform: rotate(180deg);
    h2 {
      font-size: 2.5rem;
    }
  }
}

@media ${props => props.theme.device.tablet} {
  #escenario {
    padding-left: 100px;
    .content {
      margin-bottom: 0;
      h2 {
        font-size: 3rem;
      }
    }
  }
}

#contacto {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 50px 0;
    width: 50%;
    box-sizing: border-box;
    margin: 30vh 0;
    height: 100%;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  .banner-contacto {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      h2 {
        position: absolute;
        transform: rotate(-90deg);
        font-size: 2rem;
        min-width: 200px;
        text-align: left;
        font-family: ${props => props.theme.font.primary};
      }
    }
}

@media ${props => props.theme.device.tablet} {
  #contacto {
    .content {
      margin: 0;
      padding-top: 0;
    }
    .banner-contacto {
      h2 {
        font-size: 3.5rem;
      }
    }
  }
}

@media ${props => props.theme.device.laptop} {
  #contacto {
    flex-direction: row;
    .content {
      margin-top: 0;
      padding: 100px 50px;
    }
    .banner-contacto {
      h2 {
        position: relative;
        font-size: 10vh;
        margin: 30px;
      }
    }
  }
}
`
 
export default GlobalStyle;