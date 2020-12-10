import React, {useState, useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import SignupForm from '../components/SignupForm'
import MenuHamburguesa from '../components/MenuHamburguesa'
import styled from 'styled-components'
import LoginForm from './LoginForm'
import { Menu, Dropdown, Badge } from 'antd';
import { useContextInfo } from '../hooks/context'
import { logoutFn } from '../services/auth'



const HeaderNavStyled = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    width: calc(100vw - 50px);
    height: 50px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255,1);
    z-index: 15;
    margin: 0 50px;
    letter-spacing: 2px;

&>div:first-child {
    width: 70%;
}
&>div {
    width: 30%;
}
&>div>h2 {
    margin: 30px;
    font-weight: bold;
    padding: 0;
    text-align: left;
    letter-spacing: 4px;
}
&>div>h2:hover a {
    color: #996633;
}

@media all and (min-width: 600px) {
    &>div .menu-movil {
        display: none;
    }
}

    &>div .menuLarge {
        display: none;
        margin-right: 50px;
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
        font-size: 18px;
    }
    &>div .menuLarge li:hover a {
        color: black;
        text-shadow: 0 0 1px black;
    }
    `

const HeaderNav = () => {
    const { user, logout, cart } = useContextInfo()
    let history = useHistory();
    const [count, setCount] = useState(null)

    useEffect(() => {
        async function getCart() {
            let n = null
            if (cart) n = cart.length
            setCount(n)
        }
        getCart()
    }, [cart])

    async function handleLogout() {
        await logoutFn()
        logout()
        history.push("/")
      }

      const menu = (
        <Menu>
          {!user ? <> <Menu.Item>
            <Link to="/store">Tienda</Link>
          </Menu.Item>
          <Menu.Item>
            <SignupForm />
          </Menu.Item>
          <Menu.Item>
            <LoginForm />
          </Menu.Item></>
            : <>
          <Menu.Item>
            <Link to="/store">Tienda</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/cart">Carrito</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/profile">Perfil</Link>
          </Menu.Item>
          <Menu.Item>
            <p onClick={handleLogout} style={{cursor: "pointer"}}>Logout</p>
          </Menu.Item></>}
        </Menu>
      );

      const menu2 = (
          <Menu style={{width: "100px", textAlign: "center"}}>
              <Menu.Item>
                <p onClick={handleLogout} style={{cursor: "pointer"}}>Logout</p>
              </Menu.Item>
          </Menu>
      )

    return (
        <HeaderNavStyled>
            <div>
                <h2><HashLink to="/#cover">Tierra Roja</HashLink></h2>
            </div>
            <div>
                <Dropdown className="menu-movil" overlay={menu}>
                    <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <MenuHamburguesa/>
                    </a>
                </Dropdown>
                <ul className="menuLarge">
                    <li><Link to="/store">Tienda</Link></li>
                    {!user ? <><li><SignupForm /></li>
                    <li><LoginForm /></li></> :
                    <><li>
                        <Dropdown overlay={menu2}>
                            <Link to="/profile">Perfil</Link>
                        </Dropdown>
                    </li>
                    <li>
                    <Badge count={count} >
                        <Link to="/cart"><i class="fas fa-shopping-cart"></i></Link>
                    </Badge>
                    </li>
                    </>}
                </ul>
            </div>
        </HeaderNavStyled>
    )
}

export default HeaderNav
