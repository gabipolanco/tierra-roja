import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { getCartFn } from '../services/cart'

const Gorra = styled.div`
height: 100vh;
width: 100vw;
position: absolute;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
overflow: hidden;
background-image: "https://img.hutshopping.de/Hornets-Upside-Down-Cap-by-Mitchell-Ness-black.45422_2f4.jpg";
background-position: center center;
background-size: cover;
background-repeat: no-repeat;
& h2 {
    font-family: "Bebas Neue", sans-serif;
    font-size: 20vh;
}
`

const GorraVirtual = ({match: {params: {total}}}) => {

    const paymentContainereRef = useRef()

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
     })


    return (
        <Gorra className="page">
            <h2>Gracias!!!</h2>
            <h3>${total}</h3>
            <div ref={paymentContainereRef}></div>
        </Gorra>
    )
}

export default GorraVirtual
