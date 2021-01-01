import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { removeFromCartFn, editProductQtyFn } from '../services/works'
import { useContextInfo } from '../hooks/context'
import { Row, Col, Button, Typography, Divider, InputNumber } from 'antd'
import styled from 'styled-components'

const CartStyled = styled.div `
font-family: ${props => props.theme.font.secondary};
padding: 50px 0 50px 50px;
 .back-mobile {
    position: fixed; 
    top: 60px; 
    left: 110px; 
    z-index: 15;
}
.back {
    display: none;
}
.product {
    &>div>div>div {
        margin-bottom: 20px;
    }
    i {
        cursor: pointer;
        color: red; 
        z-index: 5;
    }
    img {
        height: 100px;
        width: 75px;
        object-fit: cover;
    }
}
@media (min-width: 576px) {
    .product {
        &>div>div>div {
            margin-bottom: 0;
        }
        img {
            height: 50px;
            width: 35px;
        }
    }
}
@media ${props => props.theme.device.tablet} {
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
}
`

const Cart = () => {
    const [products, setProducts] = useState(null)
    const { cart, setCartFn } = useContextInfo()
    const [total, setTotal] = useState(0)
        
    useEffect(() => {
        function getMyProducts() {
            setProducts(cart)
        }
        getMyProducts()
    }, [cart])
    
    useEffect(() => {
        let count = 0
        function getTotal() {
            let prices = []
           if(products) {
              products.forEach(p => {
                  if (p.product) prices.push(parseInt(p.product.price * p.qty))
                })
              count = prices.length ? prices.reduce((acc, curr) => acc + curr) : 0  
            }
            setTotal(count)
        }
        getTotal()
        }, [products])

    async function removeProduct(id) {
        await removeFromCartFn(id)
        setCartFn()
    }

    async function changeQty(id, qty) {
        await editProductQtyFn(id, qty)
        setCartFn()
    }

    return (
        <CartStyled>
            <Link className="back-mobile" to="/store"><i className="fas fa-store"></i></Link>
            <Link className="back" to="/store"><i className="fas fa-arrow-left"></i>Tienda</Link>
            <Typography.Title level={2}>Carrito</Typography.Title>

            {products && products.map((p) => {
            const subtotal = p.product ? parseInt(p.product.price) * p.qty : 0
            return (
            <Row className="product">
                <Divider />
                {p.product && <Col xs={{offset: 4, span: 4, order: 1}} sm={{offset: 1, span: 2}} >
                    <img src={p.product.media} alt="Producto" />
                </Col>}
                <Col xs={{order: 2, offset: 2, span: 14}} sm={{offset: 0, span: 21}}>
                    <Row>
                        <Col xs={{offset: 4, span: 2, order: 2}} sm={{offset: 1, span: 1, order: 1}}>
                            <i onClick={() => {
                                removeProduct(p._id)
                            } } className="far fa-trash-alt"></i>
                        
                        </Col>
                        {p.product ? <><Col xs={{offset: 2, span: 10, order: 1}} sm={{offset: 1, span: 5, order: 2}} lg={{offset: 0}}>
                            <Typography.Text strong>{p.product.title}</Typography.Text>
                        </Col>
                        <Col xs={{offset: 2, span: 20, order: 3}} sm={{offset: 2, span: 6}} lg={{offset: 0, span: 8}}>
                            <Typography.Text secondary>Cant: <InputNumber min="1" max={p.product.qty} style={{width: "40px", marginLeft: "20px"}} defaultValue={p.qty} onChange={(qty) => changeQty(p._id, qty)} /></Typography.Text>
                        </Col>
                        <Col xs={{offset: 2, span: 20, order: 4}} sm={{offset: 1, span: 5}}>
                            <Typography.Text strong>$ {subtotal}</Typography.Text>
                        </Col></> : <Col xs={{offset: 2, span: 16, order: 2}}>
                            <Typography.Text>Este producto no está más disponible</Typography.Text>
                        </Col>}
                    </Row>
                </Col>
            </Row>)})}

            <Divider />

            <Row style={{marginTop: "60px"}}>
                <Col xs={{offset: 14, span: 8}} md={{offset: 17, span: 4}}>
                    <Typography.Title level={5}>Total: $ {total}</Typography.Title>
                </Col>
            </Row>
            <Row style={{marginTop: "60px"}}>
                <Col offset={17} span={4}>
                    <Link to={`/checkout/${total}`}><Button>Pagar</Button></Link>
                </Col>
            </Row>
        </CartStyled>
    )
}

export default Cart
