import React, {useRef} from 'react'
import styled from 'styled-components'

const GalleryStyled = styled.div`
#carousel { 
  perspective: 1200px; 
  background: #FFF; 
  padding-top: 5%; 
  font-size:0; 
  margin-top: 20vh;
  #spinner { 
    transform-style: preserve-3d; 
    height: 300px; 
    transform-origin: 50% 50% -100vw; 
    transition: 1s; 
    img { 
      width: 30vh; 
      height: 20vh;
      object-fit: cover;
      position: absolute; 
      left: 30%;
      transform-origin: 50% 50% -45vh;
      outline:1px solid transparent; 
    }
    img:nth-child(1) { transform:rotateY(0deg); }
    img:nth-child(2) { transform: rotateY(-45deg); }
    img:nth-child(3) { transform: rotateY(-90deg); }
    img:nth-child(4) { transform: rotateY(-135deg); }
    img:nth-child(5){ transform: rotateY(-180deg); }
    img:nth-child(6){ transform: rotateY(-225deg); }
    img:nth-child(7){ transform: rotateY(-270deg); }
    img:nth-child(8){ transform: rotateY(-315deg); }
  } 
}
span { 
  color: black; 
  margin: 5%; 
  display: inline-block; 
  text-decoration: none; 
  font-size: 2rem; 
  transition: 0.6s color; 
  position: relative; 
  margin-top: 6rem; 
  border-bottom: none; 
  line-height: 0; 
  &:hover { 
    color: ${props => props.theme.color.brown}; 
    cursor: pointer; 
  }
}
span:first-of-type {
  float: left;
}
span:last-of-type {
  float: right;
}
p {
  margin-top: 20vh;
}
@media ${props => props.theme.device.lgPhone} { 
  #carousel #spinner { 
    transform-origin: 50% 50% -40vw; 
    }
}
@media ${props => props.theme.device.tablet} {
  #carousel {
    margin-top: 10vh;
    #spinner {
      transform-origin: 50% 50% -50vw;
      img {
        width: 36vh; 
        height: 27vh;
        transform-origin: 50% 50% -50vw;
      }
    }
  }
}
@media ${props => props.theme.device.laptop} {
  #carousel {
    margin: 0 0 3rem 0;
    #spinner {
      height: 500px;
      transform-origin: 50% 50% -650px;
      img {
        width: 35vw;
        height: 30vw;
        transform-origin: 50% 50% -50vw;
      }
    }
  }
  span {
    margin-top: -6rem;
  }
  p {
    margin-top: 20px;
  }
}
`

const Gallery = () => {
    const spinnerRef = useRef(null)

    let angle = 0;
    function galleryspin(sign) { 
    const spinner = spinnerRef.current
    if (!sign) { angle = angle + 45; } else { angle = angle - 45; }
    spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
    }

    return (
        <GalleryStyled className="page">
            <div id="carousel">
              <figure ref={spinnerRef} id="spinner">
                  <img src="https://res.cloudinary.com/tomiscattini/image/upload/v1607528122/tierra-roja/Imagenes%20pagina/alu_pjnuuh.jpg" alt="Trabajo de Aluminé Fernández Rodriguez" />
                  <img src="https://res.cloudinary.com/tomiscattini/image/upload/v1607528122/tierra-roja/Imagenes%20pagina/alu2_bmjynf.jpg" alt="Trabajo de Aluminé Fernández Rodriguez" />
                  <img src="https://res.cloudinary.com/tomiscattini/image/upload/v1607528122/tierra-roja/Imagenes%20pagina/alu3_mebxpt.jpg" alt="Trabajo de Aluminé Fernández Rodriguez" />
                  <img src="https://res.cloudinary.com/tomiscattini/image/upload/v1607528122/tierra-roja/Imagenes%20pagina/alu5_scczh5.jpg" alt="Trabajo de Aluminé Fernández Rodriguez" />
                  <img src="https://res.cloudinary.com/tomiscattini/image/upload/v1607528211/tierra-roja/Imagenes%20pagina/alu6_wwbnuw.jpg" alt="Trabajo de Aluminé Fernández Rodriguez" />
                  <img src="https://res.cloudinary.com/tomiscattini/image/upload/v1607528211/tierra-roja/Imagenes%20pagina/alu7_yvq3it.jpg" alt="Trabajo de Aluminé Fernández Rodriguez" />
                  <img src="https://res.cloudinary.com/tomiscattini/image/upload/v1607528212/tierra-roja/Imagenes%20pagina/alu8_kain6h.jpg" alt="Trabajo de Aluminé Fernández Rodriguez" />
                  <img src="https://res.cloudinary.com/tomiscattini/image/upload/v1607528212/tierra-roja/Imagenes%20pagina/alu9_ggx2up.jpg" alt="Trabajo de Aluminé Fernández Rodriguez" />
              </figure>
            </div>
            <span onClick={() => galleryspin('-')}>&lt;</span>
            <span onClick={() => galleryspin('')}>&gt;</span>
            <p>Artista invitada: Aluminé Fernández Rodriguez</p>
        </GalleryStyled>
    )
}

export default Gallery
