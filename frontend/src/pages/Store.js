import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Typography, Divider, Button, Modal, Form, Input, DatePicker } from 'antd'

const Store = () => {
    return (
        <div className="page">
            <Row>
                <Col style={{height: "100vh"}} offset={1} span={3}>
                    <Row style={{height: "100%"}} type="flex" align="middle">
                        <Col span={24}><Link>Carrito</Link></Col>
                        <Col span={24}><Link>Productos</Link></Col>
                        <Col span={24}><Link>Servicios</Link></Col>
                    </Row>
                </Col>
                <Col span={20}>
                    <Typography.Title level={2}>Tienda</Typography.Title>
                </Col>
            </Row>
        </div>
    )
}

export default Store
