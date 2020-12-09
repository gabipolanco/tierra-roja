import React from 'react'
import styled from 'styled-components'
import { HashLink } from 'react-router-hash-link'

const NavBarSyled = styled.div `

    width:50px;
    height: 100%;
    float:left;
    position:fixed;
    background:#FDFAF7;
    z-index: 10;
  
  ul.menu {
    width:30px;
    margin:10px auto;
  }
  ul.menu li:first-child {
    padding-top: 20vh;
  }
  ul.menu li {
    padding-top:110px;
    margin: 15px 5px;
    font-size: 18px;
  }
  ul.menu li a {
    -webkit-transform:rotate(270deg);
    -moz-transform:rotate(270deg);
    -o-transform:rotate(270deg);
    writing-mode:lr-tb;
    float:left;
    width:25px;
    color:black;
    letter-spacing: 2px;
  }
  ul.menu li:hover a {
    color: black;
    text-shadow: 0 0 1px black;
  }
`

const NavBar = () => {
    return (
        <NavBarSyled className="sidebarmenu-container">
                <ul className="menu">
                    <li><HashLink to="/#about">NOSOTRAS</HashLink></li>
                    <li><HashLink to="/#portfolios">PORTFOLIOS </HashLink></li>
                    <li><HashLink to="/#galeria">GALERIA</HashLink></li>
                    <li><HashLink to="/#escenario">ESCENARIO</HashLink></li>
                    <li><HashLink to="/#contacto">CONTACTO </HashLink></li>
                </ul>
            </NavBarSyled>
    )
}

export default NavBar
