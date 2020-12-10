import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css'

import NotFound from './components/404/NotFound'
import Home from './pages/Home'
import Confirmed from './pages/Confirmed'
import Store from './pages/Store'
import MyAlterEgo from './pages/MyAlterEgo'
import EditPortfolio from './components/EditPortfolio'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'
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
    return (
        <Router>
            <GlobalStyle />
            <HeaderNav />
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/confirmed" component={Confirmed} />
                <Route path="/store" component={Store} />
                <Route path="/profile" component={Profile} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/cart" component={Cart} />
                <Route path="/edit-user" component={EditUser} />
                <Route path="/myworks" component={MyWorks} />
                <Route path="/portfolios" component={Portfolios} />
                <Route path="/portfolio/:id" component={OnePortfolio} />
                <Route path="/mystreamings" component={MyStreamings} />
                <Route path="/streamings" component={StreamingList} />
                <Route path="/streaming/:id" component={Streaming} />
                <Route path="/artist" component={MyAlterEgo} />
                <Route path="/edit-portfolio" component={EditPortfolio} />
                <Route path="/galeria" component={Gallery} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

export default RouterApp