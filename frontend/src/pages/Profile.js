import React from 'react'
import { Typography, Row, Col, Descriptions, Button } from 'antd'
import { useContextInfo } from '../hooks/context'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'


const Profile = () => {
    const { user } = useContextInfo()
    
    async function handleSubmit() {
        console.log(null)
    }
    
    async function handleUploadFile({target: {files}}) {
        const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/tomiscattini/image/upload'
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'tierra-roja-preset')
        
        const res = await axios.post(cloudinaryAPI, data)
        console.log(res.data.secure_url)
        // setImg(secure_url);
        // handleSubmit()
      }

    
    return user ?
        (<div className="page">
            <Typography.Title level={2}>Perfil de {user.username}</Typography.Title>
            <Row>
                <Col offset={2} span={20}>
                    <div style={{width: "100px", marginLeft: "60px", borderRadius: "50%", overflow: "hidden"}}>
                        <img style={{width: "100%"}} src={user.image} alt=""/>
                    </div>
                    
                        <form>  
                            <input type="file" name="image" onChange={handleUploadFile} style={{float: "left", margin: "40px"}} />
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
