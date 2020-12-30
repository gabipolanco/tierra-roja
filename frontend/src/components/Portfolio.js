import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useContextInfo } from '../hooks/context'
import { Card, Col, Row, Typography } from 'antd';
import PortfolioStyled from './PortfolioStyled'
import ShowMoreText from 'react-show-more-text'

const Portfolio = () => {
    const { user, artist, works, userCourses } = useContextInfo()
    const [bio, setBio] = useState(null)
    const [arte, setArte] = useState(null)
    const [userWorks, setUserWorks] = useState(null)
    const [courses, setCourses] = useState(null)
    const [coursesDiv, setCoursesDiv] = useState(null)
    const [products, setProducts] = useState(null)
    const [storeDiv, setStoreDiv] = useState(null)
    const [workToShow, setWorkToShow] = useState(null)
    const [i, setI] = useState(0)

    useEffect(() => {
        if (works) {
            const artWork = works.filter(a => !a.price)
            const prod =  works.filter(a => a.price)
            setUserWorks([...artWork])
            setProducts([...prod])
        }
        setCourses([...userCourses])
    }, [works, userCourses])

    useEffect(() => {
        function setWorks() {
            if(userWorks) setWorkToShow(userWorks[i])
        }
        setWorks()
    }, [userWorks, i])

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

    function closeWindow() {
        if(bio || arte || coursesDiv || storeDiv) close() 
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
        <PortfolioStyled onClick={closeWindow}>
            <img className="cover-image" src={artist.coverImage} alt={artist.name}/>
            <Link className="back" to="/profile"><i className="fas fa-arrow-left"></i>Perfil</Link>
            <Link className="edit" to="/edit-portfolio"><i className="far fa-edit"></i></Link>
            
            <div className="wrapper">
                <div className="left" >
                    <div>
                    <h2>{artist.name}</h2>
                    <h3>{artist.profession}</h3>
                    {artist.socialMedia && <div className="social">
                        <a rel="noopener noreferrer" href={`http://www.instagram.com/${artist.socialMedia.instagram}`} target="_blank"><i className="fab fa-instagram"></i></a>
                        <a rel="noopener noreferrer" href={`http://www.facebook.com/${artist.socialMedia.facebook}`} target="_blank"><i className="fab fa-facebook-f"></i></a>
                        <a rel="noopener noreferrer" href={`mailto:${artist.socialMedia.email}`} target="_blank"><i className="far fa-envelope"></i></a>
                        <a rel="noopener noreferrer" href={`http://${artist.socialMedia.other}`} target="_blank"><i className="fas fa-globe"></i></a>
                    </div>}
                    </div>
                </div>

                <div className="right" >   
                    <div className="right-left">
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
                    <div className="right-right">
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
                        <i onClick={workLeft} className="fas fa-chevron-left arrow-left"></i>
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
                        <i onClick={workRight} className="fas fa-chevron-right arrow-right"></i>
                        </div>} 
                </div>
            </div>}

            {coursesDiv && <div className="courses">
                        <div onClick={close} className="close">X</div>
                        <div className="course-container">
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
                                    <ShowMoreText
                                                lines={2}
                                                more='Más info'
                                                less='Ocultar'
                                                expanded={false}
                                                width={280}
                                            >{course.description}</ShowMoreText>
                                    <br />
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
