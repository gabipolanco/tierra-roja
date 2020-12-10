import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useContextInfo } from './hooks/context'
import 'antd/dist/antd.css'

import NotFound from './components/404/NotFound'
import NotLogged from './pages/NotLogged'
import Home from './pages/Home'
import Confirmed from './pages/Confirmed'
import Store from './pages/Store'
import MyAlterEgo from './pages/MyAlterEgo'
import EditPortfolio from './components/EditPortfolio'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MyWorks from './pages/MyWorks'
import Portfolios from './pages/Portfolios'
import OnePortfolio from './pages/OnePortfolio'
import MyStreamings from './pages/MyStreamings'
import StreamingList from './pages/StreamingList'
import Streaming from './pages/Streaming'
import Gallery from './pages/Gallery'

import GlobalStyle from './components/GlobalStyle'
import NavBar from './components/NavBar'
import HeaderNav from './components/HeaderNav'
import EditUser from './components/EditUser'


const RouterApp = () => {
    const { user } = useContextInfo()

    return (
        <Router>
            <GlobalStyle />
            <HeaderNav />
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/confirmed" component={Confirmed} />
                <Route path="/store" component={Store} />
                <Route path="/portfolios" component={Portfolios} />
                <Route path="/portfolio/:id" component={OnePortfolio} />
                <Route path="/streamings" component={StreamingList} />
                <Route path="/streaming/:id" component={Streaming} />
                <Route path="/galeria" component={Gallery} />
                <Route path="/notlogged" component={NotLogged} />

                {user ? <><Route path="/profile" component={Profile} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout/:total" component={Checkout} />
                <Route path="/edit-user" component={EditUser} />
                <Route path="/myworks" component={MyWorks} />
                <Route path="/mystreamings" component={MyStreamings} />
                <Route path="/artist" component={MyAlterEgo} />
                <Route path="/edit-portfolio" component={EditPortfolio} /></> :
                <Redirect to="/notlogged" />}
                
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

export default RouterApp