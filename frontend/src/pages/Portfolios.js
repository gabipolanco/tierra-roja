import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Typography} from 'antd'
import { useContextInfo } from '../hooks/context'
import styled from 'styled-components'

const PortfoliosStyled = styled.div`
position: relative;
height: 100vh;
overflow-y: scroll;
& .title {
position: fixed;
bottom: 0;
font-size: 7vw;
margin: 0 13vw;
font-weight: bold;
text-transform: uppercase;
font-family: 'Bebas Neue', sans-serif;
}
& .names-container {
    transform: rotate(-90deg);
}
& .names {
  height: 200px;
  max-width: 100vw;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}
& .names>div {
  height: 50px;
  width: 1000px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  font-size: 3rem;
  font-family: 'Bebas Neue', sans-serif;
  text-align: right;
  transform: translate3d(0, 0, 0);
}
& .mover {
    animation: moveSlideshow 20s linear infinite;
}
& .title h2 {
    margin-bottom: -60px;
}

@keyframes moveSlideshow {
  100% { 
    transform: translateX(-66.6666%);  
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
