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

    
    return user ?
        (<div className="page">
            <Typography.Title level={2}>Perfil de {user.username}</Typography.Title>
            <Row gutter={[16, 32]}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                    <div style={{width: "100px", height: "100px", margin: "0 auto", borderRadius: "50%", overflow: "hidden"}}>
                        <img style={{width: "100%"}} src={user.image} alt=""/>
                    </div>
                    
                    <form>  
                        <input type="file" name="image" onChange={handleUploadFile} style={{float: "left", margin: "40px 0", width: "250px"}} />
                        <Button style={{display: "block", margin: "0 auto"}} onClick={handleSubmit} disabled={!img}>{status}</Button>
                    </form>
                    
                </Col>
                <Col offset={2} span={20}>    
                    <Link style={{position: "absolute", right: "0", color: "gray"}} to="/edit-user"><i class="far fa-edit"></i></Link>
                    <Descriptions column={{ xs: 1, sm: 2, lg: 4}} title="Información personal" layout="vertical">
                        <Descriptions.Item label="Nombre de usuario">{user.username}</Descriptions.Item>
                        <Descriptions.Item label="Contraseña">*********************</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Rol">{user.role}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
            {user.role === "artist" ? 
            <div>
                <Row>
                    <Col offset={2} span={20}>
                        <Link to="/myworks"><Button>Mis trabajos</Button></Link>
                        <br/><br/>
                        <Link to="/artist"><Button>Portfolio</Button></Link>
                        <br/><br/>
                        <Link to="/mystreamings"><Button>Mis streamings</Button></Link>
                    </Col>
                </Row>
            </div> 
            : <div>
                
            </div>}
        </div> )
     : (<Redirect to='/' />)
}

export default Profile
