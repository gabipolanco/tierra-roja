import React, {useState, useEffect} from 'react'
import ReactHlsPlayer from 'react-hls-player'
import {Row, Col, Typography, Input, InputNumber} from 'antd'
import {Link} from 'react-router-dom'
import { getAllStreamingsFn } from '../services/streaming'
const { Search } = Input

const StreamingList = () => {
    const [ total, setTotal ] = useState(200)
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
        } else {
            let l = streamings.length - 1
            setI(l)
            setStreamingToShow(streamings[i])
        }
    }

    function streamingRight() {
        if(i < streamings.length - 1) {
            setI(i+1)
            setStreamingToShow(streamings[i])
        } else {
            setI(0)
            setStreamingToShow(streamings[i])
        }
    }

    function onChange(e) {
        setTotal(e)
    }

    function onSearch() {

    }

    return (
        <div className="page" style={{height: "100vh", width: "100vw", overflow: "hidden"}}>

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
                                width="70%"
                                height="auto"
                            />
                        </Col>
                    </Row></Link>}
                </Col>

                <Col span={1}>
                    <i style={{fontSize: "4vh", marginTop: "36vh", cursor: "pointer"}} onClick={streamingRight} class="fas fa-chevron-right arrow-right"></i>
                </Col>
            </Row>

            <Row>
                <Col offset={6} span={12} className="animate__animated animate__bounceInLeft">
                    <p style={{fontSize: "5vw", margin: "0", textAlign: "center", fontFamily: "'Bebas Neue', sans-serif"}}>Escenario Tierra Roja</p>
                </Col>
            </Row>

            <Row>
                <Col style={{borderBottom: "2px solid black"}} offset={2} span={20}>

                </Col>
            </Row>
            <Row>
                <Col style={{display: "flex", alignItems: "center", marginTop: "13px"}} offset={14} span={1}>
                    <Typography.Text>ARS$</Typography.Text>
                </Col>
                <Col style={{display: "flex", alignItems: "center", marginTop: "15px"}} span={3}>
                    <InputNumber size="large" min={200} max={1500} defaultValue={200} onChange={onChange} />
                </Col>
                <Col span={4}>
                    {total && <Link to={`/gorravirtual/${total}`}><div className="btn btn-reverse">Gorra virtual</div></Link>}
                </Col>
            </Row>

        </div>
    )
}

export default StreamingList
