import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Typography, Divider, Button, Modal, Form, Input, DatePicker } from 'antd'
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;


const Store = () => {

    function onSearch() {

    }

    return (
        <div style={{paddingRight: "0", paddingBottom: "0", overflowY: "scroll", height: "calc(100vh)"}} className="page">
            <Row style={{height: "calc(100vh - 100px)"}}>
                <Col style={{marginTop: "10%",height: "150px"}} offset={1} span={3}>
                    <Row style={{height: "100%"}} type="flex" align="middle">
                        <Col style={{position: "fixed", top: "15vh", left: "70px"}} span={24}><Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} /></Col>
                        <Col style={{position: "fixed"}} span={24}><Link style={{color: "black", fontFamily: "'Bebas Neue', sans-serif"}}>Carrito</Link></Col>
                        <Col style={{position: "fixed", top: "45vh"}} span={24}><Link style={{color: "black", fontFamily: "'Bebas Neue', sans-serif"}}>Productos</Link></Col>
                        <Col style={{position: "fixed", top: "55vh"}} span={24}><Link style={{color: "black", fontFamily: "'Bebas Neue', sans-serif"}}>Servicios</Link></Col>
                    </Row>
                </Col>
                <Col span={20}>
                    <Row>
                        <Col>
                            <Typography.Title level={2}>Tienda</Typography.Title>
                        </Col>
                    </Row>
                    
                    <Row style={{backgroundColor: "#e8eaed", height: "100vh", zIndex: "10"}}>
                        <Col>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Store
