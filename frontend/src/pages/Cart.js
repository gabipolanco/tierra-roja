import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { getMyCartFn, removeFromCartFn } from '../services/works'
import { Row, Col, Button, Typography, Divider } from 'antd'

const Cart = () => {
    const [products, setProducts] = useState(null)
    const [total, setTotal] = useState(0)
    let count = 0

    useEffect(() => {
        async function getMyProducts() {
            const { data } = await getMyCartFn()
            setProducts(data)
        }
        getMyProducts()
    }, [])

    useEffect(() => {
        function getTotal() {
           products && products.map(p => count += p.price)
           setTotal(count)
        }
        getTotal()
        console.log(total)
    }, [])

    function removeProduct(id) {
        removeFromCartFn(id)
    }

    return (
        <div className="page">
            <Link style={{position: "fixed", top: "70px", left: "70px", zIndex: "5"}} className="back" to="/store"><i style={{marginRight: "10px"}} class="fas fa-arrow-left"></i>Tienda</Link>
            <Typography.Title level={2}>Carrito</Typography.Title>

            {products && products.map((p) => (
            <Row>
                <Divider />
                <Col offset={1} span={1}>
                    <i onClick={() => {
                        removeProduct(p._id)
                    } } style={{cursor: "pointer", position: "absolute", top: "0", left: "40px", color: "red", zIndex: "5"}} class="far fa-trash-alt"></i>
                   
                </Col>
                <Col span={5}>
                    <Typography.Text>{p.title}</Typography.Text>
                </Col>
                <Col span={10}>
                </Col>
                <Col span={5}>
                    <Typography.Text>$ {p.price}</Typography.Text>
                </Col>
            </Row>))}
        </div>
    )
}

export default Cart
