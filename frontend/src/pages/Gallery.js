import React, {useRef} from 'react'
import styled from 'styled-components'

const GalleryStyled = styled.div`
& #carousel { 
  perspective: 1200px; 
  background: #FFF; 
  padding-top: 5%; 
  font-size:0; 
  margin-bottom: 3rem; 
  ${'' /* overflow: hidden;  */}
}
& #spinner { 
  transform-style: preserve-3d; 
  height: 500px; 
  transform-origin: 50% 50% -480px; 
  transition: 1s; 
} 
& #spinner img { 
  width: 40%; max-width: 480px; 
  height: 500px;
  object-fit: cover;
  position: absolute; left: 30%;
  transform-origin: 50% 50% -650px;
  outline:1px solid transparent; 
}
& #spinner img:nth-child(1) { transform:rotateY(0deg); 
}
& #spinner img:nth-child(2) { transform: rotateY(-45deg); }
& #spinner img:nth-child(3) { transform: rotateY(-90deg); }
& #spinner img:nth-child(4) { transform: rotateY(-135deg); }
& #spinner img:nth-child(5){ transform: rotateY(-180deg); }
& #spinner img:nth-child(6){ transform: rotateY(-225deg); }
& #spinner img:nth-child(7){ transform: rotateY(-270deg); }
& #spinner img:nth-child(8){ transform: rotateY(-315deg); }
& #carousel ~ span { 
  color: #fff; 
  margin: 5%; 
  display: inline-block; 
  text-decoration: none; 
  font-size: 2rem; 
  transition: 0.6s color; 
  position: relative; 
  margin-top: -6rem; 
  border-bottom: none; 
  line-height: 0; }
& #carousel span:hover { color: #888; cursor: pointer; }
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
                <span style={{color: "black", cursor: "pointer", float: "left"}} className="ss-icon" onClick={() => galleryspin('-')}>&lt;</span>
                <span style={{color: "black", cursor: "pointer", float:"right"}} className="ss-icon" onClick={() => galleryspin('')}>&gt;</span>
            <p>Artista invitada: Aluminé Fernández Rodriguez</p>
        </GalleryStyled>
    )
}

export default Gallery
