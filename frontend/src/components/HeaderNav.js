import React from 'react'
import { Link } from 'react-router-dom'
import SignupForm from '../components/SignupForm'
import MenuHamburguesa from '../components/MenuHamburguesa'
import styled from 'styled-components'
import LoginForm from './LoginForm'
import { Menu, Dropdown } from 'antd';
import { useContextInfo } from '../hooks/context'
import { logoutFn } from '../services/auth'

const menu = (
    <Menu>
      <Menu.Item>
        <SignupForm />
      </Menu.Item>
      <Menu.Item>
        <LoginForm />
      </Menu.Item>
    </Menu>
  );


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

@media all and (min-width: 600px) {
    &>div .menu-movil {
        display: none;
    }
}

    &>div .menuLarge {
        display: none;
        width: 100%;
        justify-content: flex-end;
    }
    @media all and (min-width: 600px) {
    &>div .menuLarge {
        display: flex;
    }
}
    &>div .menuLarge li {
        margin: 0 50px;
        text-transform: uppercase;
        font-weight: bold;
    }
    &>div .menuLarge li:hover p {
        color: black;
        text-shadow: 0 0 1px black;
    }
    `

const HeaderNav = ({history}) => {
    const { user, logout } = useContextInfo()

    async function handleLogout(e) {
        e.preventDefault()
        await logoutFn()
        logout()
      }

    return (
        <HeaderNavStyled>
            <div>
                <h2><Link to="/">Tierra Roja</Link></h2>
            </div>
            <div>
                <Dropdown className="menu-movil" overlay={menu}>
                    <a href="#" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <MenuHamburguesa/>
                    </a>
                </Dropdown>
                <ul className="menuLarge">
                    {!user ? <><li><SignupForm /></li>
                    <li><LoginForm /></li></> :
                    <><li><Link to="/profile">Profile</Link></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                    </>}
                </ul>
            </div>
        </HeaderNavStyled>
    )
}

export default HeaderNav
