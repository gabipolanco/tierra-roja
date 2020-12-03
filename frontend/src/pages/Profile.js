import React from 'react'
import { Typography, Row, Col } from 'antd'
import { useContextInfo } from '../hooks/context'
import { Redirect, Link } from 'react-router-dom'

const Profile = () => {
    const { user } = useContextInfo()
    console.log(user)
    return user ?
        (<div className="page">
            <h1>Perfil de {user.username}</h1>
            <div style={{width: "100px", borderRadius: "50%", overflow: "hidden"}}>
            <img style={{width: "100%"}} src={user.image} alt=""/>
            </div>
            {user.role === "artist" ? 
            <div>
                <Link to="/myworks">Mis trabajos</Link>
            </div> 
            : <div>guest</div>}
        </div> )
     : (<Redirect to='/' />)
}

export default Profile
