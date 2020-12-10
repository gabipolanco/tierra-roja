import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { getAllWorksFn, addToCartFn } from '../services/works'
import {Row, Col, Typography, Divider, Button, Input, Card } from 'antd'
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;


const Store = () => {
    const [ products, setProducts ] = useState()

    useEffect(()=> {
        async function getProducts() {
            const { data } = await getAllWorksFn()
            setProducts(data)
        }
        getProducts()
    }, [])

    function onSearch() {

    }

    function addToCart(id) {
        addToCartFn(id)
    }

    return (
        <div style={{paddingRight: "0", paddingBottom: "0", overflowY: "scroll", height: "calc(100vh)"}} className="page">
            <Link style={{position: "fixed", top: "70px", left: "70px", zIndex: "5"}} className="back" to="/"><i style={{marginRight: "10px"}} class="fas fa-arrow-left"></i>Inicio</Link>
            <Row style={{height: "calc(100vh - 100px)"}}>
                <Col style={{marginTop: "10%",height: "150px"}} offset={1} span={3}>
                    <Row style={{height: "100%"}} type="flex" align="middle">
                        <Col style={{position: "fixed", top: "15vh", left: "70px"}} span={24}><Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} /></Col>
                        <Col style={{position: "fixed"}} span={24}><Link to="/cart" style={{color: "black", fontFamily: "'Bebas Neue', sans-serif"}}>Carrito</Link></Col>
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
                    
                    <Row style={{backgroundColor: "#e8eaed", minHeight: "100vh", zIndex: "10"}}>
                        <Col span={24}>
                            <Row style={{paddingTop: "30px"}}>
                                <Col span={24}>
                                    <Typography.Title level={4}>Piezas artisticas</Typography.Title>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                            {products && products.map(p => (p.price && <Col style={{ marginBottom: "30px"}} offset={1} span={5}>
                                    <Card
                                        style={{padding: "10px"}}
                                        cover={<img style={{objectFit: "cover", height: "200px"}} alt={p.title} src={p.media} />}
                                    >
                                        <Typography.Text>{p.title}</Typography.Text><br/>
                                        <Typography.Text>$ {p.price}</Typography.Text><br/>
                                        {p.artistId && <Typography.Text>{p.artistId.name}</Typography.Text>}<br/>
                                        <Button onClick={() => {
                                            addToCart(p._id)
                                            }}>Agregar al carrito</Button>
                                    </Card>
                                </Col>))}
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Typography.Title level={4}>Cursos y talleres</Typography.Title>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Store
