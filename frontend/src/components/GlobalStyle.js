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
  margin-top:20px;
  padding:10px 40px;
  cursor: pointer;
}

.btn-reverse {
  font-family: ${props => props.theme.font.primary};
  background:transparent;
  color:#202020;
  border: 2px solid #202020;
}

  .page {
    padding: 50px;
    font-family: ${props => props.theme.font.secondary};
    overflow-y: scroll;
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
    background-position: center;
    background-color:white;
    overflow: hidden;
    transition: background-size 1s linear;
    scroll-snap-align: center;
}

.one:hover {
  background-size: 54%;
}

.two{
    position: relative;
    background-image: url("https://res.cloudinary.com/tomiscattini/image/upload/v1607960584/tierra-roja/Imagenes%20pagina/AdobeStock_300369356_ji8bpw.jpg");
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: 25vw -13vh;
    background-color:white;
    overflow: hidden;
    transition: background-size 1s linear;
    scroll-snap-align: center;
}
    
.two:hover {
  background-size: 83%;
}

.three{
    position: relative;
    background-image: url("https://res.cloudinary.com/tomiscattini/image/upload/v1607960585/tierra-roja/Imagenes%20pagina/roots_zuuct1.jpg");
    background-size: 65%;
    background-repeat: no-repeat;
    background-position: center center;
    background-color:white;
    transition: background-size 1s linear;
    scroll-snap-align: center;
}

.three:hover {
  background-size: 68%;
}

.four{
    position: relative;
    background-image: url("https://res.cloudinary.com/tomiscattini/image/upload/v1607960584/tierra-roja/Imagenes%20pagina/branch_dkmbjh.jpg");
    background-size: 78%;
    background-repeat: no-repeat;
    background-position: center center;
    background-color:white;
    transition: background-size 1s linear;
    scroll-snap-align: center;
}

.four:hover {
  background-size: 81%;
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
}

.five:hover {
  background-size: 74%;
}

.six {
  background-color: #FDFAF7;
}

.six:hover {
  background-size: 100%;
}

@media all and (min-width: 1000px) {
  .one {
    background-position: center center;
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

#about .side-div {
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

#about .content {
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
}

#about .content h2 {
  font-size: 4rem;
  text-align: left;
}

#about .content .btn {
  height: 50px;
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
  width: 30%;
  height: 80vh;
  margin: 100px 50px;
  padding: 50px;
  background-color: rgba(255, 255, 255, .5);
  text-align: justify;
  transition: all .5s ease;
}

#portfolios {
  position: relative;
  display: flex;
  justify-content: flex-end;
}

#portfolios .content {
  position: relative;
  height: 100vh;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color:#000;
  z-index:10;
  padding: 0;
  text-align: left;
}

#portfolios .content h2 {
  transform: rotate(-90deg);
  font-size: 3rem;
}
#portfolios .content .btn {
  margin-top: 100px;
  margin-right: 100px;
}

#galeria {
  position: relative;
}

#galeria .content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 25%;
  height: 100vh;
  z-index: 10;
}

#galeria .content h2 {
  transform: rotate(90deg);
  margin-top: 100px; 
  text-align: left;
  font-size: 3rem; 
}

#galeria .content .btn {
  margin-top: 150px;
}

#escenario {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 100px;
}

#escenario .content {
  transform: rotate(180deg);
}

#escenario .content h2 {
  font-size: 3rem;
}

#contacto {
  position: relative;
  display: flex;
}
#contacto .content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 100px 50px;
  width: 50vw;
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  text-transform: uppercase;
  letter-spacing: 3px;
}
#contacto .banner-contacto {
  width: 50vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#contacto .banner-contacto h2 {
  transform: rotate(-90deg);
  font-size: 10vh;
  text-align: left;
  margin: 30px;
  font-family: ${props => props.theme.font.primary};
}

`
 
export default GlobalStyle;