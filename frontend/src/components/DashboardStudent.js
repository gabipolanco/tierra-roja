import React, {useState, useEffect} from 'react'
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

                <Col offset={2} span={4}>
                    <Typography.Title level={5}>{course.name}</Typography.Title>
                    <Typography.Text>Del: {desde} al {hasta}</Typography.Text><br/>
                    <Typography.Text>{course.description}</Typography.Text>
                </Col>

                <Col offset={2} span={16}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Row>
                                <Col span={12}>
                                    <Typography.Title level={5}>Clase 1</Typography.Title>
                                    <Typography.Text>Descripcion</Typography.Text>
                                </Col>

                                <Col span={4}>
                                <Button><i className="fas fa-video"></i></Button>
                                </Col>
                                
                                <Col span={4}>
                                    <a  rel="noopener noreferrer" target="_blank" href="https://docs.google.com/presentation/d/1K2CRicqER3cuYwphjJE7aFGSGw75PlmgKt6vcngVjhY/edit#slide=id.gb09b282031_0_1"><Button><i className="fas fa-photo-video"></i></Button></a>
                                </Col>

                                <Col span={4}>
                                    <Button><i className="fas fa-folder-open"></i></Button>
                                </Col>
                            </Row>
                            <Divider />
                        </Col>

                    </Row>
                </Col>

                <Divider />
                </Row>})}
            
        </div>
    )
}

export default DashboardStudent
