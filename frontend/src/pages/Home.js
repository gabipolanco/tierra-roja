import React, {useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Cover = styled.div `
display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
  
  .title {
        margin: 0 20px;
        text-transform: uppercase;
        transition: all .4s ease-in-out;   
  }
  .title h1{
    font-size: 1rem;
    text-align: right;
  }


  @media all and (min-width: 1000px) {
    .title {
        margin: 0 20px;
    }
    .title h1{
        font-size: 4rem;
      }
      .title span {
      font-size: 4.6rem;
  }
  }
`

const Home = () => {
    const [sideDivStyles, setSideDivStyles] = useState("side-div transition")
    const [aboutStyles, setAboutStyles] = useState({})

    function animationOne() {
        if (sideDivStyles.includes("anim-trans")) {
            setSideDivStyles("side-div transition")
            return setAboutStyles({})
        }
        setSideDivStyles("side-div transition anim-trans")
        setTimeout(() => setAboutStyles({opacity: "1"}), 500)
    }
 

    return (
        <div>
            <div className="outer-wrapper">
                <div className="wrapper">

                    <Cover id="cover" className="slide one"> 
                        <div className="title animate__animated animate__zoomIn">
                            <h1><span>C</span>olectivo<br/> de mujeres <br/> artistas</h1>
                        </div>
                    </Cover>

                    <div id="about" className="slide two">
                        <div onClick={animationOne} className={sideDivStyles}>
                            <div className="about-info" style={aboutStyles}>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique saepe ea perspiciatis molestias distinctio sed ipsum! Obcaecati voluptates dignissimos temporibus maiores doloremque, explicabo placeat praesentium vero velit delectus atque deleniti.</p>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique saepe ea perspiciatis molestias distinctio sed ipsum! Obcaecati voluptates dignissimos temporibus maiores doloremque, explicabo placeat praesentium vero velit delectus atque deleniti.</p>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique saepe ea perspiciatis molestias distinctio sed ipsum! Obcaecati voluptates dignissimos temporibus maiores doloremque, explicabo placeat praesentium vero velit delectus atque deleniti.</p>
                            </div>
                        </div>
                        <div className="content">
                            <h2>Mujeres <br />del<br/> barro</h2>
                            <button onClick={animationOne} className="cta btn">Conocenos</button>
                        </div>
                    </div>

                    <div id="portfolios" className="slide three">
                        <div className="content">
                            <h2>Conoce <br/>nuestros trabajos</h2>
                            <Link to="/portfolios"><button className="cta btn">Portfolios</button></Link>
                        </div>
                    </div>

                    <div id="galeria" className="slide four">
                        <div className="content">
                            <Link to="/galeria"><button className="cta btn">Galería</button></Link>
                            <h2>Recorrido <br/> virtual</h2>
                        </div>
                    </div>

                    <div id="aula" className="slide five">
                        <div className="content">
                            <h2>Aula</h2>
                            <Link to="/aula"><button className="cta btn">Acceder</button></Link>
                        </div>
                    </div>
                    
                    <div id="contacto" className="slide six">
                        <div className="content">
                            <div>
                                <p><a rel="noopener noreferrer" target="_blank" href="mailto:mujeresdelbarro@gmail.com">mujeresdelbarro@gmail.com</a></p>
                                <p><a rel="noopener noreferrer" target="_blank" href="http://www.tuvieja.com">+54 9 3764 444 444</a></p>
                                <p><a rel="noopener noreferrer" target="_blank" href="https://www.google.com/maps/place/Profundidad,+Misiones,+Argentina/@-27.5616078,-55.7090774,16z/data=!3m1!4b1!4m5!3m4!1s0x9457cc35acf8b513:0xaa0b41517665e37f!8m2!3d-27.5616877!4d-55.7046304"><i style={{margin: "0 10px"}} class="fas fa-map-marker-alt"></i>Profundidad, Misiones</a></p>
                            </div>
                            <div className="redes-sociales">
                                <a rel="noopener noreferrer" target="_blank" href="https://instagram.com"><p>Instagram</p></a>
                                <a rel="noopener noreferrer" target="_blank" href="https://facebook.com"><p>Facebook</p></a>
                            </div>
                        </div>

                        <div className="banner-contacto">
                            <h2>El arte<br/>es<br/>una herramienta <br/> COLECTIVA</h2>
                        </div>
                    </div>

                </div>       
            </div>
        </div>
    )
}

export default Home