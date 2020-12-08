import React, {useState, useEffect } from 'react'
import { getOneStreamingFn } from '../services/streaming'
import { Row, Col, Skeleton, Typography } from 'antd'

const Streaming = ({match: {params: {id}}}) => {
    const [streaming, setStreaming] = useState(null)

    useEffect(() => {
        async function setStream() {
            const {data} = await getOneStreamingFn(id)
            setStreaming(data)
        }
        setStream()
    }, [id])

    return (
        <div className="page">
        {streaming ?
        <div>
            <Row>
                <Col offset={2} span={20}>
                    <Typography.Title level={2}>{streaming.title}</Typography.Title>
                </Col>
            </Row>
            <Row>
                    
                <Col offset={2} span={20}>
                    <video width="1000" height="600" controls></video>
                </Col>
            </Row>
        </div>
        : 
        <Row>
            <Col offset={2} span={20}>
                <Skeleton />
            </Col>
        </Row>
        }
        </div>
    )
}

export default Streaming
