import React from 'react'
import {useHistory} from 'react-router-dom'

const Confirmed = () => {
    const history = useHistory()

    setTimeout(() => {
        history.push('/')
    }, 1000)

    return (
        <div className="page">
            <h2>Gracias por confirmar tu email!</h2>
        </div>
    )
}

export default Confirmed
