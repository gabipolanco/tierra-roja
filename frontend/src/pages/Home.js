import React, {useState} from 'react'
import styled from 'styled-components'

const Cover = styled.div `
display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
  .title {
        font-family: "Roboto", sans-serif;
        margin: 0 20px;
        text-transform: uppercase;
        transition: all .4s ease-in-out;   
  }
  .title h1{
    font-size: 1rem;
  }
  .title h2{
    font-size: .8rem;
  }
  .title:hover {
      transform: scale(1.2)
  }
  @media all and (min-width: 1000px) {
    .title {
        margin: 0 150px;
    }
    .title h1{
        font-size: 2rem;
      }
      .title h2{
        font-size: 1.6rem;
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
                    <div className="title">
                        <h1>Tierra Roja</h1>
                        <h2>Mujeres del barro</h2>
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
                        <h1>Somos barro</h1>
                        <p></p>
                        <button onClick={animationOne} className="cta btn">Mujeres del barro</button>
                    </div>
                </div>

                <div id="portfolios" className="slide three">
                    <div className="side-div"></div>
                    <div className="content">
                        <h1>Conoce nuestros <br/>trabajos</h1>
                        <button className="cta btn">Portfolios</button>
                    </div>
                </div>

                <div id="galeria" className="slide four"></div>
                <div id="aula" className="slide five"></div>
                <div id="contacto" className="slide six"></div>

            </div>       
                </div>
        </div>
    )
}

export default Home