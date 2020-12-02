import React from 'react'
import { Typography, Row, Col } from 'antd'
import { useContextInfo } from '../hooks/context'
import { Redirect } from 'react-router-dom'

const Profile = () => {
    const { user } = useContextInfo()
    console.log(user)
    return user ?
        (<div className="page">
            <h1>Perfil de {user.username}</h1>
        </div> )
     : (<Redirect to='/' />)
}

export default Profile
