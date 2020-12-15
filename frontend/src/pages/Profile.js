import React, { useState } from 'react'
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

    let rol
    if (user) {
        switch (user.role) {
            case "student":
                rol = "Estudiante"
                break
            case "artist":
                rol = "Artista"
                break
            default:
                rol = "Usuario"
                break
        }
    }
    return user ?
        (<div className="page">
            <Typography.Title level={2}>Perfil de {user.username}</Typography.Title>
            <Row gutter={[16, 32]}>
                <Col xs={{ span: 20, offset: 2 }} md={{ span: 4, offset: 2 }}>
                    <Row>
                        <Col span={24}>
                            <div style={{width: "100px", height: "100px", margin: "0 auto", borderRadius: "50%", overflow: "hidden"}}>
                                <img style={{height: "100%", objectFit: "cover"}} src={user.image} alt=""/>
                            </div>
                        </Col>
                        <form>  
                        <Col offset={2} span={20}>
                            <input type="file" name="image" onChange={handleUploadFile} style={{float: "left", margin: "40px 0", width: "250px"}} />
                        </Col>
                        <Col span={24}>
                            <Button style={{display: "block", margin: "0 auto"}} onClick={handleSubmit} disabled={!img}>{status}</Button>
                        </Col>
                        </form>
                    </Row> 
                </Col>
                    
                <Col xs={{offset: 2, span: 20}} md={{span: 16}}>
                {user.role === "artist" ? 
                    <Row style={{height: "100%"}} align="bottom">
                        <Col xs={{span: 24}} md={{span: 5, offset: 1}}>
                            <Link to="/myworks"><Button>Mis trabajos</Button></Link>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 5, offset: 1}}>                            
                            <Link to="/artist"><Button>Portfolio</Button></Link>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 5, offset: 1}}>                            
                            <Link to="/mystreamings"><Button>Mis streamings</Button></Link>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 5, offset: 1}}>                            
                            <Link to="/dashboard"><Button>Dashboard</Button></Link>
                        </Col>
                    </Row> 
                     : <div>
                 {user.role === "student" ? 
                    <div>
                        <Link style={{margin: "0 30px"}} to="/mystreamings"><Button>Mis streamings</Button></Link>
                        <Link style={{margin: "0 30px"}} to="/dashboard"><Button>Dashboard</Button></Link>
                    </div> 
                    : <div>
                        
                    </div>}
            </div>}
                </Col>
                
                <Col offset={2} span={20}>    
                    <Link style={{position: "absolute", right: "0", color: "gray"}} to="/edit-user"><i className="far fa-edit"></i></Link>
                    <Descriptions column={{ xs: 1, sm: 2, lg: 4}} title="Información personal" layout="vertical">
                        <Descriptions.Item label="Nombre de usuario">{user.username}</Descriptions.Item>
                        <Descriptions.Item label="Contraseña">*********************</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Rol">{rol}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div> )
     : (<Redirect to='/' />)
}

export default Profile
