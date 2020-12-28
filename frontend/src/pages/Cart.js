import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { removeFromCartFn } from '../services/works'
import { useContextInfo } from '../hooks/context'
import { Row, Col, Button, Typography, Divider } from 'antd'
import styled from 'styled-components'

const CartStyled = styled.div `
 .back-mobile {
    position: fixed; 
    top: 60px; 
    left: 110px; 
    z-index: 15;
}
.back {
    display: none;
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
    const [change, setChange] = useState(false)
    
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
              products.map(p => prices.push(parseInt(p.price)))
              count = prices.length ? prices.reduce((acc, curr) => acc + curr) : 0  
            }
            setTotal(count)
        }
        getTotal()
        }, [products])

    function removeProduct(id) {
        removeFromCartFn(id)
        setChange(!change)
        setCartFn(null)
    }

    return (
        <CartStyled className="page">
            <Link className="back-mobile" to="/store"><i className="fas fa-store"></i></Link>
            <Link className="back" to="/store"><i className="fas fa-arrow-left"></i>Tienda</Link>
            <Typography.Title level={2}>Carrito</Typography.Title>

            {products && products.map((p) => (
            <Row>
                <Divider />
                <Col offset={1} span={1}>
                    <i onClick={() => {
                        removeProduct(p._id)
                    } } style={{cursor: "pointer", position: "absolute", top: "0", left: "40px", color: "red", zIndex: "5"}} className="far fa-trash-alt"></i>
                   
                </Col>
                <Col span={5}>
                    <Typography.Text>{p.title}</Typography.Text>
                </Col>
                <Col span={2}>
                    <img src={p.media} height="40" alt="Producto" />
                </Col>
                <Col span={8}>
                </Col>
                <Col span={5}>
                    <Typography.Text>$ {p.price}</Typography.Text>
                </Col>
            </Row>))}

            <Divider />

            <Row style={{marginTop: "60px"}}>
                <Col offset={17} span={4}>
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
