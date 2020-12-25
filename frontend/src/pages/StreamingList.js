import React, {useState, useEffect} from 'react'
import ReactHlsPlayer from 'react-hls-player'
import {Row, Col, Typography, InputNumber} from 'antd'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { getAllStreamingsFn } from '../services/streaming'

const StreamingStyled = styled.div`
padding-top: 60%;
height: 100vh;
width: 100vw;
font-family: ${props => props.theme.font.secondary};
overflow: hidden;
.container-list {
    margin-bottom: 20%;
}
.page-title {
    font-size: 1.4rem; 
    margin: 0 0 0 20px; 
    text-align: center; 
    font-family: ${props => props.theme.font.primary};
}
.container-price-currency {
    display: flex; 
    align-items: center; 
    margin-top: 13px;
}
.container-price { 
    display: flex; 
    align-items: center; 
    margin-top: 15px;
}
.btn-reverse {
    margin-top: 10px;
}
i {
    font-size: 4vh; 
    margin-top: 16vh; 
    cursor: pointer;
}

@media ${props => props.theme.device.lgPhone} {
    padding-top: 20%;
}
@media ${props => props.theme.device.tablet} {
    padding-top: 50px;
    .container-list {
        margin-bottom: 0;
    }
    .page-title {
        font-size: 4vh;
    }
    i {
        margin-top: 36vh;
    }
}
`

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

    // function onSearch() {

    // }

    return (
        <StreamingStyled>

            <Row>
                <Col xs={{offset: 3, span: 1}} md={{offset: 1}} >
                    <i onClick={streamingLeft} className="fas fa-chevron-left arrow-left"></i>
                </Col>

                <Col className="container-list" xs={{span: 19}} md={{span: 20}}>
                    {streamingToShow && streamingToShow.type === 'public' && 
                    <Link to={`/streaming/${streamingToShow._id}`}><Row>
                        <Col span={24}>
                            <Typography.Title level={4}>{streamingToShow.title}</Typography.Title>
                            <ReactHlsPlayer
                                url={`https://stream.mux.com/${streamingToShow.playbackId}.m3u8`}
                                autoplay={true}
                                controls={true}
                                width="77%"
                                height="auto"
                                style={{}}
                            />
                        </Col>
                    </Row></Link>}
                </Col>

                <Col span={1}>
                    <i onClick={streamingRight} className="fas fa-chevron-right arrow-right"></i>
                </Col>
            </Row>

            <Row>
                <Col xs={{offset: 7, span: 12}} md={{offset: 6, span: 12 }} className="animate__animated animate__bounceInLeft">
                    <p className="page-title">Escenario Tierra Roja</p>
                </Col>
            </Row>

            <Row>
                <Col style={{borderBottom: "2px solid black"}} xs={{offset: 4, span: 18}} md={{offset: 2, span: 20}}>

                </Col>
            </Row>
            <Row>
                <Col className="container-price-currency" xs={{offset: 11, span: 1}} sm={{offset: 16}} md={{offset: 12}} xl={{offset: 14}}>
                    <Typography.Text>ARS$</Typography.Text>
                </Col>
                <Col className="container-price" xs={{offset: 1, span: 3}} md={{offset: 1, span: 3}} xl={{span: 2}} >
                    <InputNumber size="large" min={200} max={1500} defaultValue={200} onChange={onChange} />
                </Col>
                <Col xs={{offset: 8, span: 10}} sm={{offset: 15, span: 6}} md={{offset: 0, span: 6}} xl={{span: 4}}>
                    {total && <Link to={`/gorravirtual/${total}`}><div className="btn btn-reverse">Gorra virtual</div></Link>}
                </Col>
            </Row>

        </StreamingStyled>
    )
}

export default StreamingList
