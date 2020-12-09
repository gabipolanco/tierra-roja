import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useContextInfo } from '../hooks/context'
import { Card, Col, Row, Typography, Carousel } from 'antd';
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
    &>.back {
        position: fixed;
        top: 70px;
        left: 70px;
        color: white;
        z-index: 10;
    }
    &>.back i {
        margin-right: 10px;
    }
    &>.edit {
        position: fixed;
        color: white;
        font-size: 20px;
        top: 100px;
        left: 100px;
        cursor: pointer;
        z-index: 10;
    }

    &>div.wrapper {
        transform: rotate(-30deg);
        position: absolute;
        height: 100vw;
        width: 120vw;
        top: 12vw;
        left: -30vw;
    }
    &>div>div.left {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        position: relative;
        height: 100%;
        width: 40%;
        background-color: rgba(0,0,0, .4);
    }
    &>div>div.left>div {
        display: flex;
        flex-direction: column;
        space-between: center;
        align-items: center;
        margin-top: 60%;
        margin-right: 20%;
        transform: rotate(30deg);
    }
    &>div>div.left>div h2, h3 {
        display: block;
        max-width: 300px;
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
&>div>div.right {
    display: flex;
    width: 60%;
    height: 100%;
}

&>div .left-left {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}
&>div .left-right {
    width: 60%;
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
    transform: scale(.95);
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
    height: 40vh;
    width: 100%;
    margin: 2px 4px;
    background-color: rgba(0,0,0, .4);
}
&>div.bio, .arte, .streamings {
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
&>div.bio>img {
    height: 50%;
    width: 30%;
    object-fit: scale-down;
    margin: 70px 40px 0 0;
}
&>div.arte .art-container {
    width: 100%;
}
& .border {
    padding: 60px;
    max-height: 480px;
    box-shadow: 1px 1px 6px black;
}
& .img-container {
    position: relative;
    max-height: 360px;
    overflow: hidden;
}
& .arrow-left {
    position: absolute;
    top: 40vh;
    left: 30px;
    font-size: 30px;
    color: #f0f0f0;
    cursor: pointer;
}
& .arrow-right {
    position: absolute;
    top: 40vh;
    right: 30px;
    font-size: 30px;
    color: #f0f0f0;
    cursor: pointer;
}
&>div.arte .art-container>div img {
    transition: all .6s ease;
    width: 100%;
    height: auto;
}
&>div.arte .art-container>div img:hover {
    transform: scale(1.05);
}
&>div.arte .art-container .info {
    text-align: right;
    padding: 30px;
    line-height: 10px;
    font-size: 14px;
    font-weight: bold;
    color: black;
}
&>div .close{
    position: fixed;
    right: 100px;
    top: 100px;
    cursor: pointer;
}
`

const Portfolio = () => {
    const { user, artist, works, myStreamings } = useContextInfo()
    const [bio, setBio] = useState(null)
    const [arte, setArte] = useState(null)
    const [streamings, setStreamings] = useState(null)
    const [workToShow, setWorkToShow] = useState(null)

    let i = 0

    useEffect(() => {
        function setWorks() {
            if(works) setWorkToShow(works[i])
        }
        setWorks()
    }, [works, i])

    function showBio() {
        setBio(true)
    }

    function showArte() {
        setArte(true)
    }

    function showStreamings() {
        setStreamings(true)
    }

    function close() {
        setBio(null)
        setArte(null)
        setStreamings(null)
    }

    function workLeft() {
        if(i > 0) {
            i -=1
            setWorkToShow(works[i-1])
        }
    }

    function workRight() {
        if(i < works.length) {
            i +=1
            setWorkToShow(works[i+1])
        }
    }

    return artist && (
        <PortfolioStyled>
            <img className="cover-image" src={artist.coverImage} alt={artist.name}/>
            <Link className="back" to="/profile"><i class="fas fa-arrow-left"></i>Perfil</Link>
            <Link className="edit" to="/edit-portfolio"><i class="far fa-edit"></i></Link>
            
            <div className="wrapper">
                <div className="left" >
                    <div>
                    <h2>{artist.name}</h2>
                    <h3>{artist.profession}</h3>
                    {artist.socialMedia && <div className="social">
                        <a rel="noopener noreferrer" href={`http://www.instagram.com/${artist.socialMedia.instagram}`} target="_blank"><i class="fab fa-instagram"></i></a>
                        <a rel="noopener noreferrer" href={`http://www.facebook.com/${artist.socialMedia.facebook}`} target="_blank"><i class="fab fa-facebook-f"></i></a>
                        <a rel="noopener noreferrer" href={`mailto:${artist.socialMedia.email}`} target="_blank"><i class="far fa-envelope"></i></a>
                        <a rel="noopener noreferrer" href={`http://${artist.socialMedia.other}`} target="_blank"><i class="fas fa-globe"></i></a>
                    </div>}
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
                        <div onClick={showStreamings} className="inner-btn">
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
                </div>
            </div> 
            
            {bio && <div className="bio">
                <div onClick={close} className="close">X</div>
                <img src={user.image} alt={artist.name}/>
                <div>
                    <h2>Bio</h2>
                    <p>{artist.bio}</p>
                </div>
            </div>}

            {arte && <div className="arte">
                <div onClick={close} className="close">X</div>
                <div>
                    {workToShow && 
                        <div className="art-container">
                        <i onclick={workLeft} class="fas fa-chevron-left arrow-left"></i>
                            <div className="border">
                            <div className="img-container">
                                <img style={{objectFit: "scale-down"}} src={workToShow.media} alt={workToShow.title} />
                            </div>
                            </div>
                            <div className="info">
                                <Typography.Text>{workToShow.description}</Typography.Text><br />
                                <Typography.Text>{workToShow.price}</Typography.Text><br />
                                {artist && <Typography.Text>{artist.name}</Typography.Text>}
                            </div>
                        <i onclick={workRight} class="fas fa-chevron-right arrow-right"></i>
                        </div>} 
                </div>
            </div>}

            {streamings && <div className="streamings">
                <div onClick={close} className="close">X</div>
                <div>
                    <Link to="/mystreamings"><h2>Clases</h2></Link>
                    {myStreamings ? 
                        <Row gutter={[16, 16]}>
                        {myStreamings.map(stream => (
                            <Link to="/mystreamings"><Col xs={{offset: 2,span: 20}}>
                            <Card hoverable cover={<video controls></video>} title={stream.title} bordered={false}>
                            <p>{stream.description}</p><br />
                            <p>{stream.hour}</p><br />
                            {artist && <p>{artist.name}</p>}
                            </Card>
                        </Col></Link>))}
                    </Row> : <div></div>}
                </div>
            </div>}
            
        </PortfolioStyled>
    )
}

export default Portfolio
