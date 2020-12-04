import React, {useState} from 'react'
import { Row, Col, Form, Input, Upload, Typography, Button } from 'antd'
import { useContextInfo } from '../hooks/context'
import { createArtistFn } from '../services/artist'
import { useHistory} from "react-router-dom";
import Portfolio from '../components/Portfolio'
import axios from 'axios'

const EditPortfolio = () => {
    const [img, setImg] = useState(null)
    const { user, artist, setUserArtistFn } = useContextInfo()
    let history = useHistory();

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
      const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
      };

        const onFinish = async (values) => {
            const id = user._id
            console.log(values)
            const {data: { newArtist } } = await createArtistFn( values)
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
          }

    return (
        <div>
            <Row style={{marginTop: "70px"}}>
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

                    <Form.Item
                        label="Imagen banner"
                        name="coverImage"
                    >       
                        <Upload beforeUpload={handleUploadFile} name="file">
                            <Button >Elegir imagen</Button>
                        </Upload>
                    </Form.Item>

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
                    >
                        <Input addonBefore="https://www.instagram.com/" />
                    </Form.Item>

                    <Form.Item
                        label="Facebook"
                        name="facebook"
                    >
                        <Input addonBefore="https://www.facebook.com/" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Otra"
                        name="other"
                    >
                        <Input />
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <button className="btn" htmlType="submit" style={{width: "230px"}}>
                        Crear artista
                        </button>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default EditPortfolio
