import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Typography} from 'antd'
import {Link} from 'react-router-dom'
import { getAllStreamingsFn } from '../services/streaming'

const StreamingList = () => {
    const [ streamings, setStreamings ] = useState()

    useEffect(() => {
        async function getAllStreamings() {
            const { data } = await getAllStreamingsFn()
            setStreamings([...data])
        }
        getAllStreamings()
    }, [])

    return (
        <div className="page">
            <Typography.Title level={2}>Escenario Tierra Roja</Typography.Title>

            <Row>
                <Col offset={2} span={20}>
                    {streamings && streamings.map(s => s.type === 'public' && (
                    <Link to={`/streaming/${s._id}`}><Row>
                        <Col span={24}>
                            <Typography.Title level={4}>{s.title}</Typography.Title>
                        </Col>
                    </Row></Link>))}
                </Col>
            </Row>
        </div>
    )
}

export default StreamingList
