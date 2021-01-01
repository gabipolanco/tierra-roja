import React, {useState, useEffect} from 'react'
import { Row, Col, Form, Input, Typography } from 'antd'
import { useContextInfo } from '../hooks/context'
import { editArtistFn } from '../services/artist'
import { useHistory, Link} from "react-router-dom";
import axios from 'axios'

const EditPortfolio = () => {
    const { artist, setUserArtistFn } = useContextInfo()
    const [img, setImg] = useState(null)
    let history = useHistory();

    useEffect(() => {
        artist && setImg(artist.coverImage)
    }, [artist])

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
      const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
      };

        const onFinish = async (values) => {
            const id = artist._id
            const {data: { editedArtist } } = await editArtistFn(id, {...values, coverImage: img})
            setUserArtistFn(editedArtist)
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
          }

    return artist && (
        <div className="page">
            <Row>
            <Link style={{position: "fixed", top: "70px", left: "70px", zIndex: "5"}} className="back" to="/artist"><i style={{marginRight: "10px"}} className="fas fa-arrow-left"></i>Portfolio</Link>
                <Col style={{marginTop: "100px"}} xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 15%"}}
                    >
                    <Typography.Title level={2}>Editar portfolio</Typography.Title>
                     <Form.Item
                        label="Nombre de artista"
                        name="name"
                        initialValue={artist.name}
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Profesión"
                        name="profession"
                        initialValue={artist.profession}
                    >
                        <Input/>
                    </Form.Item>

                    <label htmlFor="coverImage" style={{width: "100%", margin: "40px 0"}}>Imagen de fondo:</label>   
                    <input type="file" style={{margin: "40px auto"}} onChange={handleUploadFile} name="coverImage" />
                    

                    <Form.Item
                        label="Bio"
                        name="bio"
                        initialValue={artist.bio}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Typography.Title level={5}>Redes sociales</Typography.Title>

                    <Form.Item
                        label="Instagram"
                        name="instagram"
                        initialValue={artist.socialMedia.instagram}
                    >
                        <Input addonBefore="https://www.instagram.com/" />
                    </Form.Item>

                    <Form.Item
                        label="Facebook"
                        name="facebook"
                        initialValue={artist.socialMedia.facebook}
                    >
                        <Input addonBefore="https://www.facebook.com/" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={artist.socialMedia.email}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Otra"
                        name="other"
                        initialValue={artist.socialMedia.other}
                    >
                        <Input />
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <button className="btn" htmlType="submit" style={{width: "230px"}}>
                        Guardar cambios
                        </button>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default EditPortfolio
