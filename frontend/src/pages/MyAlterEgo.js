import React, {useState} from 'react'
import { Row, Col, Form, Input, Typography } from 'antd'
import { useContextInfo } from '../hooks/context'
import { createArtistFn } from '../services/artist'
import { useHistory, Link} from "react-router-dom";
import Portfolio from '../components/Portfolio'
import axios from 'axios'

const MyAlterEgo = () => {
    const [img, setImg] = useState("https://res.cloudinary.com/gabipf/image/upload/v1607097840/bannerportfolio_psi9u4.jpg")
    const [ uploadImg, setUploadImg ] = useState(null)
    const { artist, setUserArtistFn } = useContextInfo()
    let history = useHistory();

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
      const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
      };

        const onFinish = async ({bio, email, instagram, facebook, name, other, profession}) => {
            // console.log({bio, email, instagram, facebook, name, other, profession})
            const {data: { newArtist } } = await createArtistFn( {bio, email, instagram, facebook, other, name, profession,  coverImage: img})
            setUserArtistFn(newArtist)
            history.push("/artist")
        };
      
        const onFinishFailed = errorInfo => {
          console.log('Failed:', errorInfo);
        };

        async function handleUploadFile({target: {files}}) {
            const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/tomiscattini/image/upload'
            const data = new FormData()
            data.append('file', files[0])
            data.append('upload_preset', 'tierra-roja-preset')
            
            const {data: {secure_url}}= await axios.post(cloudinaryAPI, data)
            setImg(secure_url);
            setUploadImg(secure_url);
          }

    return (
        <div className="page">
            {artist ? <Row>
                <Portfolio />
            </Row> : <div>
            <Row style={{marginTop: "70px"}}>
            <Link style={{position: "fixed", top: "70px", left: "70px", zIndex: "5"}} className="back" to="/profile"><i style={{marginRight: "10px"}} className="fas fa-arrow-left"></i>Perfil</Link>

                <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 80px"}}
                    >
                    <Typography.Title level={2}>Crear portfolio</Typography.Title>
                     <Form.Item
                        label="Nombre de artista"
                        name="name"
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Profesión"
                        name="profession"
                    >
                        <Input/>
                    </Form.Item>

                    <label htmlFor="coverImage" style={{width: "100%"}}>Imagen de fondo:</label>   
                    <input type="file" onChange={handleUploadFile} name="coverImage" />
                    

                    <Form.Item
                        label="Bio"
                        name="bio"
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Typography.Title level={5}>Redes sociales</Typography.Title>

                    <Form.Item
                        label="Instagram"
                        name="instagram"
                        initialValue=""
                    >
                        <Input addonBefore="https://www.instagram.com/" />
                    </Form.Item>

                    <Form.Item
                        label="Facebook"
                        name="facebook"
                        initialValue=""
                    >
                        <Input addonBefore="https://www.facebook.com/" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        type="email"
                        initialValue=""
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Otra"
                        name="other"
                        initialValue=""
                    >
                        <Input />
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <button disabled={!uploadImg} className="btn" type="submit" style={{width: "230px"}}>
                        Crear artista
                        </button>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
            </div> }
        </div>
    )
}

export default MyAlterEgo
