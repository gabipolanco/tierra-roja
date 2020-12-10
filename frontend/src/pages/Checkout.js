import React, { useState, useEffect, useRef } from 'react'
import {Link} from 'react-router-dom'
import { getMyCartFn, removeFromCartFn } from '../services/works'
import { getCartFn } from '../services/cart'
import { useContextInfo } from '../hooks/context'
import { Row, Col, Button, Typography, Divider } from 'antd'

const Checkout = ({match: {params: {total}}}) => {
    const [products, setProducts] = useState(null)
    const [cartToPay, setCartToPay] = useState(null)
    const { cart, setCartFn } = useContextInfo()
    const [change, setChange] = useState(false)
    let count = 0

    const paymentContainereRef = useRef()

    useEffect(() => {
        function getMyProducts() {
            setProducts(cart)
        }
        getMyProducts()
    }, [cart])

    useEffect(() => {
         async function getCartInfo() {
          const { data } = await getCartFn({total})
    
          const script = document.createElement("script")    
          script.src =
          "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
          script.setAttribute("data-preference-id", data.prefId)

          paymentContainereRef.current.appendChild(script)
    
          setCartToPay(data)
        }
        getCartInfo()
      }, [])

    return (
        <div className="page">
            <Link style={{position: "fixed", top: "70px", left: "70px", zIndex: "5"}} className="back" to="/cart"><i style={{marginRight: "10px"}} class="fas fa-arrow-left"></i>Carrito</Link>
            <Typography.Title level={2}>Checkout</Typography.Title>

            {products && products.map((p) => (
            <Row>
                <Divider />
                <Col offset={2} span={5}>
                    <Typography.Text>{p.title}</Typography.Text>
                </Col>
                <Col span={2}>
                    <img src={p.media} height="40" />
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
                <div ref={paymentContainereRef}></div>
                </Col>
            </Row>
        </div>
    )
}

export default Checkout
