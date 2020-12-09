import React from 'react'
import {Divider } from 'antd'
import { Redirect, Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context'
import DashboardArtist from '../components/DashboardArtist'
import DashboardStudent from '../components/DashboardStudent'


const Dashboard = () => {
    const { user } = useContextInfo()

    return user && (
        <div className="page">
            <Link style={{position: "fixed", top: "70px", left: "70px", zIndex: "5"}} className="back" to="/profile"><i style={{marginRight: "10px"}} class="fas fa-arrow-left"></i>Perfil</Link>
            <h1>Dashboard</h1>

            <Divider />
  
            {user.role === 'artist' && <DashboardArtist />}

            {user.role === 'student' && <DashboardStudent />}

            {user.role === 'user' && <Redirect to='/profile' />}

        </div>
    )
}

export default Dashboard
