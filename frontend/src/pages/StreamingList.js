import React, {useState, useEffect} from 'react'
import ReactHlsPlayer from 'react-hls-player'
import {Row, Col, Button, Typography} from 'antd'
import {Link} from 'react-router-dom'
import { getAllStreamingsFn } from '../services/streaming'

const StreamingList = () => {
    const [ streamings, setStreamings ] = useState(null)
    const [ streamingToShow, setStreamingToShow ] = useState(null)
    const [i, setI] = useState(0)

    useEffect(() => {
        async function getAllStreamings() {
            const { data } = await getAllStreamingsFn()
            setStreamings([...data])
          }
        getAllStreamings()
    }, [])

    useEffect(() => {
        function setStream() {
            if(streamings) setStreamingToShow(streamings[i])
        }
        setStream()
    }, [streamings, i])

    function streamingLeft() {
        if(i > 0) {
            setI(i-1)
            setStreamingToShow(streamings[i])
        }
    }

    function streamingRight() {
        if(i < streamings.length - 1) {
            setI(i+1)
            setStreamingToShow(streamings[i])
        }
    }

    return (
        <div className="page" style={{height: "100vh", width: "100vw", overflow: "hidden"}}>
            <div style={{position: "absolute", bottom: "-12vh", left: "0",width: "100%", fontFamily: "'Bebas Neue', sans-serif"}}>
                <div className="animate__animated animate__bounceInLeft">
                    <p style={{fontSize: "6vw", textAlign: "center"}}>Escenario Tierra Roja</p>
                </div>
            </div>

            <Row>
                <Col offset={1} span={1}>
                    <i style={{fontSize: "4vh", marginTop: "36vh", cursor: "pointer"}} onClick={streamingLeft} class="fas fa-chevron-left arrow-left"></i>
                </Col>

                <Col span={20}>
                    {streamingToShow && streamingToShow.type === 'public' && 
                    <Link to={`/streaming/${streamingToShow._id}`}><Row>
                        <Col span={24}>
                            <Typography.Title level={4}>{streamingToShow.title}</Typography.Title>
                            <ReactHlsPlayer
                                url={`https://stream.mux.com/${streamingToShow.playbackId}.m3u8`}
                                autoplay={true}
                                controls={true}
                                width="80%"
                                height="auto"
                            />
                        </Col>
                    </Row></Link>}
                </Col>

                <Col span={1}>
                    <i style={{fontSize: "4vh", marginTop: "36vh", cursor: "pointer"}} onClick={streamingRight} class="fas fa-chevron-right arrow-right"></i>
                </Col>
            </Row>
        </div>
    )
}

export default StreamingList
