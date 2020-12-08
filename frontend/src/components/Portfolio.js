import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useContextInfo } from '../hooks/context'
import { Card, Col, Row, Typography } from 'antd';
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
        margin-right: 30%;
        transform: rotate(30deg);
    }
    &>div>div.left>div h2, h3 {
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
    object-fit: cover;
    margin: 70px 40px 0 0;
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
                    <h2>Arte</h2>
                    {works ? 
                        <Row gutter={[16, 16]}>
                        {works.map(work => (<Link to="/myworks"><Col xs={{offset: 6,span: 12}}>
                            <Card hoverable cover={<img style={{objectFit: "cover", height: "250px", width: "100%"}} src={work.media} alt={work.title} />} title={work.title} bordered={false}>
                            <Typography.Text>{work.description}</Typography.Text><br />
                            <Typography.Text>{work.price}</Typography.Text><br />
                            {artist && <Typography.Text>{artist.name}</Typography.Text>}
                            </Card>
                        </Col></Link>))}
                    </Row> : <div></div>}
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
                            <Typography.Text>{stream.description}</Typography.Text><br />
                            <Typography.Text>{stream.hour}</Typography.Text><br />
                            {artist && <Typography.Text>{artist.name}</Typography.Text>}
                            </Card>
                        </Col></Link>))}
                    </Row> : <div></div>}
                </div>
            </div>}
            
        </PortfolioStyled>
    )
}

export default Portfolio
