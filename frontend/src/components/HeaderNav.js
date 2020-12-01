import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const HeaderNavStyled = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 50px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255,1);
    z-index: 15;

&>div {
    width: 50%;
}
&>div>h2 {
    margin: 0 30px;
    padding: 0;
    text-align: left;
}
&>div>h2:hover {
    color: #996633;
}
    & div ul {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }
    & div ul li {
        margin: 0 50px;
        text-transform: uppercase;
        font-weight: bold;
    }
    & div ul li:hover a {
        color: black;
        text-shadow: 0 0 1px black;
    }
    `

const HeaderNav = () => {
    return (
        <HeaderNavStyled>
            <div>
                <h2>Tierra Roja</h2>
            </div>
            <div>
                <ul>
                    <li><Link>Registrate</Link></li>
                    <li><Link>Log In</Link></li>
                </ul>
            </div>
        </HeaderNavStyled>
    )
}

export default HeaderNav
