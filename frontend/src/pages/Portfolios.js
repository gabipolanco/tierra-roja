import React from 'react'
import {Link} from 'react-router-dom'
import { useContextInfo } from '../hooks/context'
import styled from 'styled-components'

const PortfoliosStyled = styled.div`
position: relative;
height: 100vh;
overflow-y: scroll;
.title {
    position: fixed;
    bottom: 0;
    margin: 10px calc(50vw - 140px);
    h2 {
        font-size: 2rem;
        font-weight: bold;
        text-transform: uppercase;
        font-family: ${props => props.theme.font.primary};
    }
}
.names-container {
    margin: 140px 0 0 50px;
    .mover {
        font-family: ${props => props.theme.font.primary};
        font-size: 1.5rem;
    }
}

@keyframes moveSlideshow {
  100% { 
    transform: translateX(-100%);  
  }
}

@media ${props => props.theme.device.tablet} {
    .title {
        margin: 0 19vw;
        h2 {
            font-size: 8vw;
            margin-bottom: -30px;
        }
    }
    .names-container {
        transform: rotate(-90deg);
        .names {
            height: 200px;
            width: 100vh;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            transform: translate3d(0, 0, 0);
            .mover {
                height: 50px;
                width: 1000px;
                position: absolute;
                height: 100%;
                font-size: 3rem;
                
                text-align: right;
                transform: translate3d(0, 0, 0);
                animation: moveSlideshow 20s linear infinite;
            }
        }
    }
}
`

const Portfolios = () => {
    const { allArtists } = useContextInfo()

    return (
        <PortfoliosStyled className="page">
            <div className="names-container">
                
                {allArtists && 
                    allArtists.map((art) => {
                        return <div className="names">
                        <div className="mover">
                            <Link to={`/portfolio/${art._id}`}><p>{art.name}</p></Link>
                        </div>
                        </div>
                    })
                }
            </div>
            
            <div className="animate__animated animate__bounceInLeft title"><h2>Artistas misioneras</h2></div>
        </PortfoliosStyled>
    )
}

export default Portfolios
