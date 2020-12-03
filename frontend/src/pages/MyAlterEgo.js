import React from 'react'
import { Row, Col, Form, Input, Upload, Typography, Button, Descriptions } from 'antd'
import { useContextInfo } from '../hooks/context'
import { createArtistFn } from '../services/artist'
import { useHistory, Link } from "react-router-dom";

const MyAlterEgo = () => {
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

    return (
        <div className="page">
            <h1>Mi perfil de artista</h1>
            {artist ? <Row>
                <Col offset={2} span={20}>    
                    <Descriptions column={2} title="Información artística" layout="vertical">
                        <Descriptions.Item label="Nombre artístico">{artist.name}</Descriptions.Item>
                        <Descriptions.Item label="Profesión">{artist.profession}</Descriptions.Item>
                        <Descriptions.Item span={2} label="Biografía">{artist.bio}</Descriptions.Item>
                       
                        <Typography.title level={4}>Redes sociales</Typography.title>
                       
                        <Descriptions.Item label="Instagram">{artist.socialMedia.instagram}</Descriptions.Item>
                        <Descriptions.Item label="Facebook">{artist.socialMedia.facebook}</Descriptions.Item>
                        <Descriptions.Item label="Twitter">{artist.socialMedia.twitter}</Descriptions.Item>
                     
                        <Descriptions.Item span={1}><Link to="/"><Button>Editar alter ego</Button></Link></Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row> : <div>
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
                        <Upload name="file">
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
                        label="Twitter"
                        name="twitter"
                    >
                        <Input addonBefore="https://twitter.com/" />
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
            </div> }
        </div>
    )
}

export default MyAlterEgo
