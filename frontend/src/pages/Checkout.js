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
.product {
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
            <Link className="back" to="/cart"><i className="fas fa-arrow-left"></i>Carrito</Link>
           <Typography.Title level={2}>Checkout</Typography.Title>

            {products && products.map((p) => (
            <Row className="product">
                <Divider />
                <Col xs={{offset: 4, span: 4, order: 1}} sm={{offset: 1, span: 2}} >
                    <img src={p.product.media} alt="Producto" />
                </Col>
                <Col xs={{order: 2, offset: 2, span: 14}} sm={{offset: 0, span: 21}}>
                    <Row>
                        <Col xs={{offset: 8, span: 10, order: 1}} sm={{offset: 3, span: 5, order: 2}} lg={{offset: 2}}>
                            <Typography.Text>{p.product.title}</Typography.Text>
                        </Col>
                        <Col xs={{offset: 2, span: 20, order: 3}} sm={{offset: 2, span: 6}} lg={{offset: 0, span: 8}}>
                            <Typography.Text>Cant: {p.qty}</Typography.Text>
                        </Col>
                        <Col xs={{offset: 2, span: 20, order: 4}} sm={{offset: 1, span: 5}}>
                            <Typography.Text>$ {p.product.price}</Typography.Text>
                        </Col>
                    </Row>
                </Col>
            </Row>))}

            <Divider />

            <Row style={{marginTop: "60px"}}>
                <Col xs={{offset: 14, span: 8}} md={{offset: 17, span: 4}}>
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
