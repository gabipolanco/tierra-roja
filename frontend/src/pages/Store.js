import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { getAllWorksFn, addToCartFn } from '../services/works'
import { getAllCoursesFn } from '../services/courses'
import { useContextInfo } from '../hooks/context'
import {Row, Col, Typography, Divider, Button, Input, Card } from 'antd'
import styled from 'styled-components'
import ShowMoreText from 'react-show-more-text'
const { Search } = Input;

const StoreStyled = styled.div`
    padding-right: 0; 
    padding-bottom: 0; 
    overflow-y: scroll; 
    height: 100vh;
    .back-mobile {
        position: fixed; 
        top: 140px; 
        left: 110px; 
        z-index: 15;
    }
    .back {
        display: none;
    }
    .container {
        height: calc(100vh - 100px);
        .nav {
            margin: 0;
            height: 170px;
            width: 100vw;
            position: fixed;
            background-color: rgba(255,255,255,.955);
            z-index: 10;
            &>div {
                padding: 20px 0;
                &>div {
                    margin: 4px 0;
                    color: black;
                    font-family: ${props => props.theme.font.primary};
                }
                &>div:first-of-type {
                    &>span {
                            width: 80vw;
                            font-family: ${props => props.theme.font.secondary};
                        }
                }
            }
        }
        .store-title {
            margin-top: 23vh;
            font-size: 20px;
        }
        .container-store { 
            min-height: 100vh; 
            z-index: 10;
            scroll-behavior: smooth;
            .back-top {
                width: 40px;
                height: 40px;
                background-color: gray;
            }
            #products-title h4 {
                padding-top: 30px;
                font-size: 1rem;
            }
            #products {
                &>div {
                    margin-bottom: 30px;
                    &>div {
                        padding: 10px;
                        box-shadow: 1px 1px 5px #e8eaed;
                        img {
                            object-fit: cover; 
                            height: 200px;
                        }
                    }
                }
            }
            #courses-title h4 {
                font-size: 16px;
            }
            #courses {
                margin-bottom: 40px;
                .course {
                    background-color: white; 
                    margin: 40px; 
                    padding: 20px;
                    border-bottom: 1px solid #e8eaed;
                    .description {
                        text-align: justify;
                    }
                }
            }
        }
    }
    @media all and (min-width: 992px) {
        .back {
            display: block;
            position: fixed; 
            top: 70px; 
            left: 70px; 
            z-index: 15;
            i {
                margin-right: 10px;
            }
        }
        .back-mobile {
            display: none;
        }
        .container {
            .nav {
                margin-top: 10%;
                height: 150px;
                width: auto;
                position: relative;
                &>div {
                    height: 100%;
                    &>div {
                        position: fixed;
                        left: 70px;
                    }
                    &>div:first-of-type {
                        top: 15vh; 
                        
                        &>span {
                            width: 13vw;
                        }
                    }
                    &>div:nth-of-type(2) {
                        top: 35vh;
                    }
                    &>div:nth-of-type(3) {
                        top: 45vh;
                    }
                    &>div:nth-of-type(4) {
                        top: 55vh;
                    }
                }
            }
            .store-title {
                margin: 50px 0 20px 50px;
                font-size: 1.9rem;
            }
            .container-store {
                background-color: #e8eaed;
                padding-right: 40px;
                #products-title h4 {
                    font-size: 1.25rem;
                }
                #courses-title h4 {
                    font-size: 1.25rem;
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

    const onSearch = ({target}) => {
        setSearch(target.value)
    }

    const addToCart = async (id) => {
        await addToCartFn(id)
        setCartFn()
    }

    return (
        <StoreStyled className="page">
            <Link className="back-mobile" to="/"><i className="fas fa-home"></i></Link>
            <Link className="back" to="/"><i className="fas fa-arrow-left"></i>Inicio</Link>
            <Row className="container">
                <Col className="nav" xs={{offset: 1, span: 22}} lg={{offset: 1, span: 3}}>
                    <Row type="flex" align="middle">
                        <Col span={24}><Search placeholder="Buscar" onChange={onSearch} /></Col>
                        <Col span={24}><Link to="/cart">Carrito</Link></Col>
                        <Col span={24}><HashLink smooth to="/store#products">Productos</HashLink></Col>
                        <Col span={24}><HashLink smooth to="/store#courses">Educación</HashLink></Col>
                    </Row>
                </Col>
                <Col xs={{offset: 2, span:20}} lg={{offset: 1, span: 20}}>
                    <Row>
                        <Col xs={{offset: 2}} lg={{offset: 0, span: 5}}>
                            <Typography.Title className="store-title" level={2}>Tienda</Typography.Title>
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
                            {products && products.map(p => (p.price && <Col xs={{offset: 2, span: 20}} sm={{offset: 1, span: 10}} lg={{span: 7}} xl={{offset: 1, span: 5}}>
                                    <Card cover={<img alt={p.title} src={p.media} />}>
                                        <Typography.Text strong>{p.title}</Typography.Text><br/>
                                        <Typography.Text>$ {p.price}</Typography.Text><br/>
                                        {p.artistId && <Typography.Text>{p.artistId.name}</Typography.Text>}<br/>
                                        <small>{p.qty} disponibles</small><br/>
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
                                        <Col xs={{offset: 2, span: 20 }} md={{offset: 0, span: 6}}>
                                            <Typography.Title level={4}>{c.name}</Typography.Title><br />
                                            {c.userId && <Typography.Text>{c.userId.artistId ? <Link to={`/portfolio/${c.userId.artistId._id}`}>{c.userId.artistId.name}</Link> : c.userId.username}</Typography.Text>}<br />
                                        </Col>
                                        <Col xs={{offset: 2, span: 20 }} md={{offset: 0, span: 6}}></Col>
                                        <Col xs={{offset: 2, span: 20 }} md={{offset: 0, span: 12}}>
                                            <Typography.Text className="description">
                                            <ShowMoreText
                                                lines={2}
                                                more='Más info'
                                                less='Ocultar'
                                                expanded={false}
                                                width={280}
                                            >{c.description}</ShowMoreText>
                                            </Typography.Text><br/>
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
