import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { getAllWorksFn, addToCartFn } from '../services/works'
import { getAllCoursesFn } from '../services/courses'
import { useContextInfo } from '../hooks/context'
import {Row, Col, Typography, Divider, Button, Input, Card } from 'antd'
import styled from 'styled-components'
const { Search } = Input;

const StoreStyled = styled.div`
    padding-right: 0; 
    padding-bottom: 0; 
    overflow-y: scroll; 
    height: 100vh;
    .back {
        position: fixed; 
        top: 70px; 
        left: 70px; 
        z-index: 5;
        i {
            margin-right: 10px;
        }
    }
    .container {
        height: calc(100vh - 100px);
        .nav {
            margin-top: 10%;
            height: 150px;
            &>div {
                height: 100%;
                &>div {
                    position: fixed;
                    color: black;
                    font-family: ${props => props.theme.font.primary}
                }
                &>div:first-of-type {
                    position: fixed; 
                    top: 15vh; 
                    left: 70px;
                }
                &>div:nth-of-type(3) {
                    top: 45vh;
                }
                &>div:nth-of-type(4) {
                    top: 55vh;
                }
            }
        }
        .container-store {
            background-color: #e8eaed; 
            min-height: 100vh; 
            z-index: 10;
            #products-title {
                padding-top: 30px;
            }
            #courses {
                margin-bottom: 40px;
                .course {
                    background-color: white; 
                    margin-top: 40px; 
                    padding: 20px;
                }
            }
        }
    }
`

const Store = () => {
    const [ products, setProducts ] = useState(null)
    const [ courses, setCourses ] = useState(null)
    const [ search, setSearch ] = useState('')
    const { setCartFn } = useContextInfo()

    useEffect(()=> {
        async function getProducts() {
            const { data } = await getAllWorksFn()
            if(search === '') {
            setProducts([...data])
        } else {
            const newArr = [...data].filter(p => p.title.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
                    setProducts(newArr)
        }
        }
        getProducts()
    }, [search])

    useEffect(()=> {
        async function getCourses() {
            const { data } = await getAllCoursesFn()
            if(search === '') {
            setCourses([...data])
        } else {
            const newArr = [...data].filter(c => c.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
                    setCourses(newArr)
        }
        }
        getCourses()
    }, [search])

    function onSearch({target}) {
        setSearch(target.value)
    }

    function addToCart(id) {
        addToCartFn(id)
        setCartFn(null)
    }

    return (
        <StoreStyled className="page">
            <Link className="back" to="/"><i className="fas fa-arrow-left"></i>Inicio</Link>
            <Row className="container">
                <Col className="nav" xs={{offset: 1, span: 22}} md={{offset: 1, span: 3}}>
                    <Row type="flex" align="middle">
                        <Col span={24}><Search placeholder="Buscar" onChange={onSearch} style={{ width: "13vw" }} /></Col>
                        <Col span={24}><Link to="/cart">Carrito</Link></Col>
                        <Col span={24}><HashLink to="/store#productos">Productos</HashLink></Col>
                        <Col span={24}><HashLink to="/store#cursos">Servicios</HashLink></Col>
                    </Row>
                </Col>
                <Col span={20}>
                    <Row>
                        <Col>
                            <Typography.Title level={2}>Tienda</Typography.Title>
                        </Col>
                    </Row>
                    
                    <Row className="container-store">
                        <Col span={24}>
                            <Row id="products-title">
                                <Col span={24}>
                                    <Typography.Title level={4}>Piezas artisticas</Typography.Title>
                                </Col>
                            </Row>
                            <Divider />
                            <Row id="products">
                            {products && products.map(p => (p.price && <Col style={{ marginBottom: "30px"}} xs={{offset: 2, span: 20}} sm={{offset: 1, span: 10}} lg={{span: 7}} xl={{offset: 1, span: 5}}>
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

                            <Row id="courses-title">
                                <Col span={24}>
                                    <Typography.Title level={4}>Cursos y talleres</Typography.Title>
                                </Col>
                            </Row>
                            <Divider />
                            <Row id="courses">
                                {courses && courses.map(c => {
                                let desde
                                if(c.date.length !== 0) desde = new Date(c.date[0]).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric'}).toString()
                                
                                return (<Col className="course" offset={1} span={22}>
                                    <Row>
                                        <Col span={6}>
                                            <Typography.Title level={4}>{c.name}</Typography.Title><br />
                                            {c.userId && <Typography.Text>{c.userId.artistId ? <Link to={`/portfolio/${c.userId.artistId._id}`}>{c.userId.artistId.name}</Link> : c.userId.username}</Typography.Text>}<br />
                                        </Col>
                                        <Col span={6}></Col>
                                        <Col span={12}>
                                            <Typography.Text>{c.description}</Typography.Text><br/>
                                            <Typography.Text>Fecha de inicio: {c.date && desde}</Typography.Text><br/>
                                            <Typography.Text>{c.price && c.price}</Typography.Text><Button style={{marginLeft: "30px"}}>Inscribirse</Button>
                                        </Col>
                                    </Row>
                                </Col>
                                )})}
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </StoreStyled>
    )
}

export default Store
