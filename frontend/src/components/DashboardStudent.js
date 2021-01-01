import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ShowMoreText from 'react-show-more-text'
import { getMyCoursesFn } from '../services/courses'
import {Row, Col, Typography, Divider, Button } from 'antd'
import { useContextInfo } from '../hooks/context'

const DashboardStudent = () => {
    const { user } = useContextInfo()
    const [courses, setCourses] = useState(null)

    useEffect(() => {
        async function setMyCourses() {
            const {data} = await getMyCoursesFn()
            setCourses(data)
        }
        setMyCourses()
    }, [user])

    return user && (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                    <div style={{width: "100px", height: "100px", margin: "0 auto", borderRadius: "50%", overflow: "hidden"}}>
                        <img style={{height: "100%", objectFit: "cover"}} src={user.image} alt=""/>
                    </div>                    
                </Col>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 4, offset:0 }}>
                    <Typography.Title level={3}>{user.username}</Typography.Title>
                </Col>
            </Row>

            <Divider><Typography.Title level={3}>Cursos</Typography.Title></Divider>
             
            {courses && courses.map((course) => {
                let desde
                let hasta
                if (course.date.length !== 0) {
                    desde = new Date(course.date[0]).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric'}).toString()
                    hasta = new Date(course.date[1]).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric'}).toString()
                }
                
                return <Row gutter={[16, 16]}>

                <Col xs={{offset: 2, span: 20 }} lg={{offset: 1, span: 7 }} style={{paddingBottom: "50px"}}>
                    <Typography.Title level={5}>{course.name}</Typography.Title>
                    <Typography.Text>Del: {desde} al {hasta}</Typography.Text><br/>
                    <ShowMoreText
                                lines={3}
                                more='Más info'
                                less='Ocultar'
                                expanded={false}
                            >{course.description}</ShowMoreText>
                </Col>

                <Col xs={{offset: 2, span: 20 }} lg={{offset: 0, span: 16}}>
                    {course.classes && course.classes.map(c => 
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Row>
                                <Col xs={{offset: 2, span: 20}} lg={{offset: 0, span: 10}}>
                                    <Typography.Title level={5}>{c.name}</Typography.Title>
                                    <ShowMoreText
                                        lines={3}
                                        more='Más info'
                                        less='Ocultar'
                                        expanded={false}
                                    >{c.description}</ShowMoreText>
                                </Col>

                                <Col xs={{offset: 1, span: 7}} lg={{offset: 0, span: 4}}>
                                    <Link rel="noopener noreferrer" to={`/streaming/${c.video}`}><Button style={{marginTop: "40px"}}><i className="fas fa-video"></i></Button></Link>
                                </Col>
                                
                                <Col xs={{offset: 1, span: 7}} lg={{offset: 0, span: 4}}>
                                    <a rel="noopener noreferrer" target="_blank" href={c.slideShowLink}><Button style={{marginTop: "40px"}}><i className="fas fa-photo-video"></i></Button></a>
                                </Col>

                                <Col xs={{offset: 1, span: 7}} lg={{offset: 0, span: 4}}>
                                    <a rel="noopener noreferrer" target="_blank" href={c.contentLink}><Button style={{marginTop: "40px"}}><i className="fas fa-folder-open"></i></Button></a>
                                </Col>
                            </Row>
                            <Divider />
                        </Col>

                    </Row>)}
                </Col>

                <Divider />
                </Row>})}
            
        </div>
    )
}

export default DashboardStudent
