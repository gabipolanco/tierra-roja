import React from 'react'
import styled from 'styled-components'

const MenuStyled = styled.div`
    display: block;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    width: 50px;
    z-index: 20;

&>span {
    height: 2px;
    width: 30px;
    margin: 0 auto 6px auto;
    background-color: black;
    text-align: center;
    display: block;
    border-radius: 20%;
}

&:hover>span {
    background-color: brown;
}
`

const MenuHamburguesa = () => {
    return (
        <MenuStyled className="navegacion-movil">
            <span></span>
            <span></span>
            <span></span>
        </MenuStyled>
    )
}

export default MenuHamburguesa
