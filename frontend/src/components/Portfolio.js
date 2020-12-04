import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import { useContextInfo } from '../hooks/context'
import styled from 'styled-components'

const PortfolioStyled = styled.div`
display: flex;
position: relative;
height: 95vh;
width: 100vw;
overflow: hidden;

    &>img.cover-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: .9;
    }
    &>.edit {
        position: absolute;
        color: white;
        font-size: 20px;
        top: 40px;
        left: 40px;
        cursor: pointer;
        z-index: 5;
    }
    &>div.left {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        position: relative;
        left: -10vw;
        top: -10vw;
        height: 100%;
        height: 200%;
        width: 50%;
        transform: rotate(-30deg);
        background-color: rgba(0,0,0, .4);
    }
    &>div.left>div {
        display: flex;
        flex-direction: column;
        space-between: center;
        align-items: center;
        margin-top: 80%;
        margin-right: 8vw;
        transform: rotate(30deg);
    }
    &>div.left>div h2, h3 {
        color: white;
        font-weight: bold;
        text-transform: uppercase;
    }
    &>div .social {
        width: 150px;
        display: flex;
        justify-content: space-evenly;
        margin-top: 50px;
    }
    &>div .social a {
        color: white;
        font-size: 24px;
    }
&>div.right {
    display: flex;
    position: absolute;
    right: -5vw;
    top: -60vh;
    transform: rotate(-30deg);
    height: 200%;
    width: 70%;
}

&>div .left-left {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}
&>div .left-right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding-left: 4px;
}

& .inner-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
    width: 100%;
    margin: 2px 4px;
    background-color: rgba(0,0,0, .4);
    transition: all .4s ease;
}
& .inner-btn:hover {
    transform: scale(.9);
    cursor: pointer;
}

& .inner-btn h3{
    transform: rotate(30deg);
}

& .inner-rest {
    height: 40vh;
    width: 100%;
    margin: 2px 4px;
    background-color: rgba(0,0,0, .4);
}
& .left-right .inner-rest {
    margin-top: 20vh;
    height: 70vh;
}
& .inner-rest2 {
    height: 30vh;
    width: 100%;
    margin: 2px 4px;
    background-color: rgba(0,0,0, .4);
}
&>div.bio {
    position: absolute;
    display: flex;
    right: 0;
    width: 65vw;
    height: 100%;
    padding: 80px;
    background-color: rgba(255,255,255);
    text-align: justify;
    transition: all .4s ease;
    overflow-y: scroll;
}
&>div.bio img {
    height: 50%;
    width: 30%;
    margin: 70px 40px 0 0;
}
&>div.bio .close{
    position: absolute;
    right: 40px;
    top: 40px;
    cursor: pointer;
}
`

const Portfolio = () => {
    const { user, artist, setUserArtistFn } = useContextInfo()
    const [bio, setBio] = useState(null)
    const [arte, setArte] = useState(null)

    function showBio() {
        setBio(true)
    }

    function showArte() {
        setArte(true)
    }

    function close() {
        setBio(null)
        setArte(null)
    }

    return artist ? (
        <PortfolioStyled>
            <img className="cover-image" src={artist.coverImage}/>
            <Link className="edit" to="/edit-portfolio"><i class="far fa-edit"></i></Link>
            <div className="left" >
                <div>
                   <h2>{artist.name}</h2>
                   <h3>{artist.profession}</h3>
                   <div className="social">
                   <a rel="noopener noreferrer" href={`http://www.instagram.com/${artist.socialMedia.instagram}`} target="_blank"><i class="fab fa-instagram"></i></a>
                   <a rel="noopener noreferrer" href={`http://www.facebook.com/${artist.socialMedia.facebook}`} target="_blank"><i class="fab fa-facebook-f"></i></a>
                   <a rel="noopener noreferrer" href={`mailto:${artist.socialMedia.email}`} target="_blank"><i class="far fa-envelope"></i></a>
                   <a rel="noopener noreferrer" href={`http://${artist.socialMedia.other}`} target="_blank"><i class="fas fa-globe"></i></a>
                   </div>
                </div>
            </div>
            <div className="right" >   
                <div className="left-left">
                    <div className="inner-rest"></div>
                    <div onClick={showBio} className="inner-btn">
                        <h3>Sobre mi</h3>
                    </div>
                    <div onClick={showArte} className="inner-btn">
                        <h3>Mi arte</h3>
                    </div>
                    <div className="inner-btn">
                        <h3>Clases</h3>
                    </div>
                    <div className="inner-rest"></div>
                </div>
                <div className="left-right">
                    <div className="inner-rest"></div>
                    <div className="inner-btn">
                        <h3>Tienda</h3>
                    </div>
                    <div className="inner-rest2"></div>
                </div>
            </div> {bio && <div className="bio">
                <div onClick={close} className="close">X</div>
                   <img src={user.image} alt={artist.name}/>
                <div>
                    <h2>Bio</h2>
                    <p>{artist.bio}</p>
                </div>
            </div>}
            {arte && <div className="bio arte">
                <div onClick={close} className="close">X</div>
                <div>
                    <h2>Arte</h2>
                    
                </div>
            </div>}
        </PortfolioStyled>
    ) : (<div></div>)
}

export default Portfolio
