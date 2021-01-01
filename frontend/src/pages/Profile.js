import React, { useState } from 'react'
import { Row, Col, Descriptions, Button } from 'antd'
import styled from 'styled-components';
import { useContextInfo } from '../hooks/context'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { uploadPhotoFn } from '../services/auth'

const ProfileStyled = styled.div`
padding-top: 50px;
font-family: ${props => props.theme.font.secondary};
.image-container {
    width: 100px; 
    height: 100px; 
    margin: 0 auto; 
    border-radius: 50%; 
    overflow: hidden;
    img {
        height: 100%; 
        object-fit: cover;
    }
}
 button {
    min-width: 128px;
    margin-bottom: 15px;
 }
 @media ${props => props.theme.device.tablet} {
     h2 {
         position: absolute;
         top: 13vh;
         left: 30vw;
     }
     button {
        font-weight: normal;
     }
 }
 @media ${props => props.theme.device.laptop} {
     h2 {
         left: 37vw;
     }
 }
`

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
    return (<ProfileStyled>
            <Row gutter={[16, 32]}>
                <Col xs={{ span: 18, offset: 4 }} >
                    <h2>Perfil de {user.username}</h2>
                </Col>
                <Col xs={{ span: 20, offset: 3 }} md={{ span: 4, offset: 2 }}>
                    <form>  
                        <Row>
                            <Col span={24}>
                                <div className="image-container">
                                    <img src={user.image} alt=""/>
                                </div>
                            </Col>
                            <Col xs={{offset: 4, span: 15}} sm={{offset: 7}} md={{offset: 2, span: 20}}>
                                <input type="file" name="image" onChange={handleUploadFile} style={{float: "left", margin: "40px 0", width: "250px"}} />
                            </Col>
                            <Col xs={{offset: 2, span: 22}} sm={{offset: 1}}>
                                <Button onClick={handleSubmit} disabled={!img}>{status}</Button>
                            </Col>
                        </Row> 
                    </form>
                </Col>
                    
                <Col xs={{offset: 2, span: 20}} md={{span: 16}}>
                {user.role === "artist" ? 
                    <Row style={{height: "100%"}} align="bottom">
                        <Col xs={{offset: 4, span: 20}} sm={{span: 5, offset: 1}} md={{span: 4}}>
                            <Link to="/myworks"><Button>Trabajos</Button></Link>
                        </Col>
                        <Col xs={{offset: 4, span: 20}} sm={{span: 5, offset: 1}} md={{span: 4}}>                            
                            <Link to="/artist"><Button>Portfolio</Button></Link>
                        </Col>
                        <Col xs={{offset: 4, span: 20}} sm={{span: 5, offset: 1}} md={{span: 4}}>                            
                            <Link to="/mystreamings"><Button>Streamings</Button></Link>
                        </Col>
                        <Col xs={{offset: 4, span: 20}} sm={{span: 5, offset: 1}} md={{span: 4}}>                            
                            <Link to="/dashboard"><Button>Dashboard</Button></Link>
                        </Col>
                    </Row> 
                    :  <Row style={{height: "100%"}} align="bottom">
                            {user.role === "student" ? 
                               <>
                                <Col  xs={{offset: 4, span: 20}} sm={{span: 10, offset: 2}} md={{offset: 4, span: 6}}>
                                    <Link style={{margin: "0 30px"}} to="/mystreamings"><Button>Mis streamings</Button></Link>
                                </Col>
                                <Col  xs={{offset: 4, span: 20}} sm={{span: 10, offset: 2}} md={{offset: 0, span: 6}}>
                                    <Link style={{margin: "0 30px"}} to="/dashboard"><Button>Dashboard</Button></Link>
                                </Col>
                                </>
                                : <></>}
                    </Row>}
                </Col>
                
                <Col xs={{offset: 4, span: 18}} md={{offset: 2, span: 20}}>    
                    <Link style={{position: "absolute", right: "0", color: "gray"}} to="/edit-user"><i className="far fa-edit"></i></Link>
                    <Descriptions column={{ xs: 1, sm: 2, lg: 4}} title="Información personal" layout="vertical">
                        <Descriptions.Item label="Nombre de usuario">{user.username}</Descriptions.Item>
                        <Descriptions.Item label="Contraseña">*********************</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Rol">{rol}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </ProfileStyled> )
     
}

export default Profile
