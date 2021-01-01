import React from 'react'
import {Divider } from 'antd'
import styled from 'styled-components'; 
import { Redirect, Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context'
import DashboardArtist from '../components/DashboardArtist'
import DashboardStudent from '../components/DashboardStudent'

const LinkStyled = styled.div`
    position: fixed; 
    top: 70px; 
    left: 70px; 
    z-index: 5;
    span {
        display: none;
    }
    @media ${props => props.theme.device.tablet} {
        span {
            display: inline-block;
        }
    }
`

const Dashboard = () => {
    const { user } = useContextInfo()

    return user && (
        <div className="page">
            <LinkStyled><Link to="/profile"><i style={{marginRight: "10px"}} className="fas fa-arrow-left"></i><span>Perfil</span></Link></LinkStyled>
            {user.role === 'artist' && <h1>Dashboard</h1>}
            {user.role === 'student' && <h2>Dashboard alumno</h2>}

            <Divider />
  
            {user.role === 'artist' && <DashboardArtist />}

            {user.role === 'student' && <DashboardStudent />}

            {user.role === 'user' && <Redirect to='/profile' />}

        </div>
    )
}

export default Dashboard
