import React from 'react'
import {Link} from 'react-router-dom'

const MyWorks = () => {
    return (
        <div className="page">
            <Link style={{position: "fixed", top: "70px", left: "70px", zIndex: "5"}} className="back" to="/profile"><i style={{marginRight: "10px"}} class="fas fa-arrow-left"></i>Perfil</Link>
            <h1>Mis trabajos</h1>
        </div>
    )
}

export default MyWorks
