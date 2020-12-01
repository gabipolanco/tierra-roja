import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
  }
  ul.menu li a {
    -webkit-transform:rotate(270deg);
    -moz-transform:rotate(270deg);
    -o-transform:rotate(270deg);
    writing-mode:lr-tb;
    float:left;
    width:25px;
    color:black;
    font-weight: bold;
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
                    <li><a href="/#about">NOSOTRAS</a></li>
                    <li><a href="/#portfolios">PORTFOLIOS </a></li>
                    <li><a href="/#galeria">GALERIA</a></li>
                    <li><a href="/#aula">AULA</a></li>
                    <li><a href="/#contacto">CANTACTO </a></li>
                </ul>
            </NavBarSyled>
    )
}

export default NavBar
