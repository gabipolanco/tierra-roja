import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Descriptions, Button } from 'antd'
import { useContextInfo } from '../hooks/context'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { uploadPhotoFn } from '../services/auth'

const Profile = () => {
    const [img, setImg] = useState(null)
    const [status, setStatus] = useState('Elige una foto')
    const { user, login } = useContextInfo()
    
    async function handleSubmit(e) {
        e.preventDefault()
        const id = user._id
        const { data: { editedUser } } = await uploadPhotoFn(id, {image: img})
        login(editedUser)
    }
    
    async function handleUploadFile({target: {files}}) {
        
        const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/tomiscattini/image/upload'
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'tierra-roja-preset')
        
        const {data: {secure_url}}= await axios.post(cloudinaryAPI, data)
        setImg(secure_url);
       
        setStatus("Cambiar la foto")
      }

    
    return user ?
        (<div className="page">
            <Typography.Title level={2}>Perfil de {user.username}</Typography.Title>
            <Row>
                <Col offset={2} span={8}>
                    <div style={{width: "100px", height: "100px", marginLeft: "60px", borderRadius: "50%", overflow: "hidden"}}>
                        <img style={{width: "100%"}} src={user.image} alt=""/>
                    </div>
                    
                    <form onSubmit={handleSubmit}>  
                        <input type="file" name="image" onChange={handleUploadFile} style={{float: "left", margin: "40px 0", width: "200px"}} />
                        <button type="submit" disabled={!img}>{status}</button>
                    </form>
                    
                </Col>
                <Col offset={2} span={20}>    
                    <Descriptions column={4} title="Información personal" layout="vertical">
                        <Descriptions.Item label="Nombre de usuario">{user.username}</Descriptions.Item>
                        <Descriptions.Item label="Contraseña">*********************</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Rol">{user.role}</Descriptions.Item>
                        <Descriptions.Item span={1}><Link to="/edit-user"><Button>Editar perfil</Button></Link></Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
            {user.role === "artist" ? 
            <div>
                <Row>
                    <Col offset={2} span={20}>
                        <Link to="/myworks"><Button>Mis trabajos</Button></Link>
                        <br/><br/>
                        <Link to="/artist"><Button>Mi alter ego</Button></Link>
                    </Col>
                </Row>
            </div> 
            : <div>
                
            </div>}
        </div> )
     : (<Redirect to='/' />)
}

export default Profile
