import React, { useState, useEffect, useRef } from 'react'
import {Link} from 'react-router-dom'
import { getCartFn } from '../services/cart'
import { useContextInfo } from '../hooks/context'
import { Row, Col, Typography, Divider } from 'antd'
import styled from 'styled-components'

const CheckoutStyled = styled.div `
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

const Checkout = ({match: {params: {total}}}) => {
    const [products, setProducts] = useState(null)
    const { cart } = useContextInfo()

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
        }
        getCartInfo()
      }, [total])

    return (
        <CheckoutStyled className="page">
            <Link className="back-mobile" to="/cart"><i className="fas fa-shopping-cart"></i></Link>
            <Link className="back" to="/cart"><i className="fas fa-arrow-left"></i>Tienda</Link>
           <Typography.Title level={2}>Checkout</Typography.Title>

            {products && products.map((p) => (
            <Row>
                <Divider />
                <Col offset={2} span={5}>
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
                <div ref={paymentContainereRef}></div>
                </Col>
            </Row>
        </CheckoutStyled>
    )
}

export default Checkout
