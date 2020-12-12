import React, { useState, useEffect } from 'react'
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
&>div.bio, .arte, .courses, .store {
    position: absolute;
    display: flex;
    right: 0;
    width: 70vw;
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
    box-shadow: 0 0 3px black;
}
& .store .border {
    padding: 20px;
    max-height: 480px;
    box-shadow: 0 0 3px black;
}
& .img-container {
    position: relative;
    max-height: 360px;
    overflow: hidden;
}
& .img-container2 {
    position: relative;
    ${'' /* max-height: 360px; */}
    overflow: hidden;
}
& .arrow-left {
    position: absolute;
    top: 40vh;
    left: 30px;
    font-size: 30px;
    color: #f0f0f0;
    cursor: pointer;
    z-index: 15;
    display: block;
    height: 30px;
    width: 20px;
}
& .arrow-right {
    position: absolute;
    top: 40vh;
    right: 30px;
    font-size: 30px;
    color: #f0f0f0;
    cursor: pointer;
    z-index: 15;
    display: block;
    height: 30px;
    width: 20px;
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
    const { user, artist } = useContextInfo()
    const [bio, setBio] = useState(null)
    const [arte, setArte] = useState(null)
    const [works, setWorks] = useState(null)
    const [courses, setCourses] = useState(null)
    const [coursesDiv, setCoursesDiv] = useState(null)
    const [products, setProducts] = useState(null)
    const [storeDiv, setStoreDiv] = useState(null)
    const [workToShow, setWorkToShow] = useState(null)
    const [i, setI] = useState(0)

    useEffect(() => {
        const artWork = user.artWork.filter(a => !a.price)
        const prod =  user.artWork.filter(a => a.price)
        setWorks([...artWork])
        setProducts([...prod])
        setCourses([...user.courses])
    }, [bio, arte, coursesDiv, storeDiv, user.artWork, user.courses])

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

    function showCourses() {
        setCoursesDiv(true)
    }

    function showStore() {
        setStoreDiv(true)
    }

    function close() {
        setBio(null)
        setArte(null)
        setCoursesDiv(null)
        setStoreDiv(null)
    }

    function workLeft() {
        if(i > 0) {
            setI(i-1)
            setWorkToShow(works[i])
        } else {
            let l = works.length - 1
            setI(l)
            setWorkToShow(works[i])
        }
    }

    function workRight() {
        if(i < works.length - 1) {
            setI(i+1)
            setWorkToShow(works[i])
        } else {
            setI(0)
            setWorkToShow(works[i])
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
                        <div onClick={showCourses} className="inner-btn">
                            <h3>Clases</h3>
                        </div>
                        <div className="inner-rest"></div>
                    </div>
                    <div className="left-right">
                        <div className="inner-rest"></div>
                        <div onClick={showStore} className="inner-btn">
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
                        <i onClick={workLeft} class="fas fa-chevron-left arrow-left"></i>
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
                        <i onClick={workRight} class="fas fa-chevron-right arrow-right"></i>
                        </div>} 
                </div>
            </div>}

            {coursesDiv && <div className="courses">
                        <div onClick={close} className="close">X</div>
                        <div>
                            <h2>Clases</h2>
                             
                                <Row gutter={[16, 16]}>
                                {courses.map(course => {
                                let desde
                                let hasta
                                if (course.date.length !== 0) {
                                    desde = new Date(course.date[0]).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric'}).toString()
                                    hasta = new Date(course.date[1]).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric'}).toString()
                                }

                                return (<Col xs={{offset: 2,span: 20}}>
                                    <Card hoverable title={course.name} bordered={false}>
                                    <p>{course.description}</p><br />
                                    {course.date.length !== 0 && <p>Desde {desde} al {hasta}</p>}<br />
                                    {artist && <p>{artist.name}</p>}
                                    </Card>
                                </Col>)})}
                            </Row>
                        </div>
                    </div>}
                    
                    {storeDiv && <div className="store">
                        <div onClick={close} className="close">X</div>
                        <Row style={{width: "100%"}}>
                            <Col span={24}>
                                <h2>Tienda</h2>
                            </Col>
                            {products && products.map(p => ( 
                                <Col offset={1} span={11} className="art-container">
                                    <div className="border">
                                    <div className="img-container2">
                                        <img style={{objectFit: "scale-down", height: "300px"}} src={p.media} alt={p.title} />
                                    </div>
                                    </div>
                                    <div className="info">
                                        <Typography.Text>{p.description}</Typography.Text><br />
                                        <Typography.Text>${p.price}</Typography.Text><br />
                                        {artist && <Typography.Text>{artist.name}</Typography.Text>}
                                    </div>
                                </Col>))} 
                        </Row>
                    </div>}
            
        </PortfolioStyled>
    )
}

export default Portfolio
