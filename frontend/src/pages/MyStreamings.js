import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Card, Col, Row, Button, Modal, Form, Input, Select, InputNumber, Typography } from 'antd';
import { useContextInfo } from '../hooks/context'
import { createWorkFn, getOneWorkFn, editWorkFn, deleteWorkFn } from '../services/works'
import { createStreamingFn, getMyStreamingsFn, getOneStreamingFn, editStreamingFn, deleteStreamingFn } from '../services/streaming'
import axios from 'axios'

const MyStreamings = () => {
    const { artist, myStreamings, setMyStreamingsFn } = useContextInfo()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModal2Visible, setIsModal2Visible] = useState(false);
    const [isModal3Visible, setIsModal3Visible] = useState(false);
    const [editStreaming, setEditStreaming] = useState(null)
    const [streamingToBeEdited, setStreamingToBeEdited] = useState(null)
    const [form] = Form.useForm();
    let userStreamings
    if(myStreamings) userStreamings = [...myStreamings]
    
    useEffect(() => {
        async function setStreamingToEdit() {
            const {data} = await getOneStreamingFn(editStreaming)
            setStreamingToBeEdited(data)
        }
        setStreamingToEdit()
    }, [isModal2Visible, isModal3Visible])

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
      const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
      };

        const onFinish = async (values) => {
            let h = null
            if(values.hours && values.minutes){
                h = values.hours.toString() + ":" + values.minutes.toString() + "hs"
            }
            const {data: { newStreaming } } = await createStreamingFn({...values, hour: h})
            setMyStreamingsFn()
            setIsModalVisible(false)
            form.resetFields()
        };

        const onFinish2 = async (values) => {
            const id = streamingToBeEdited._id
            const {data: { editStreaming }} = await editStreamingFn(id, {...values})
            setMyStreamingsFn()
            setIsModal2Visible(false)
            setStreamingToBeEdited(null)
            setEditStreaming(null)
        }

        const deleteStreaming = async () => {
            const id = streamingToBeEdited._id
            await deleteStreamingFn(id)
            setMyStreamingsFn()
            setIsModal3Visible(false)
            setStreamingToBeEdited(null)
        }
      
        const onFinishFailed = errorInfo => {
          console.log('Failed:', errorInfo);
        };
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModal2 = () => {
        setIsModal2Visible(true);
    };
    
    const showModal3 = () => {
        setIsModal3Visible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModal2Visible(false);
        setIsModal3Visible(false);
        setStreamingToBeEdited(null)
        setEditStreaming(null)
    };

    return (
        <div className="page">
            <Link style={{position: "fixed", top: "70px", left: "70px", zIndex: "5"}} className="back" to="/profile"><i style={{marginRight: "10px"}} class="fas fa-arrow-left"></i>Perfil</Link>
            <h1>Mis streamings</h1>
            <Button onClick={showModal}>Agregar un streaming</Button>

            <Modal
                style={{ top: 20 }}
                title="Agregar streaming"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >

                <Form
                    {...layout}
                    form={form}
                    name="addStreaming"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 80px"}}
                    >
                     <Form.Item
                        label="Título de la clase/concierto/charla"
                        name="title"
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Descripción"
                        name="description"
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Input.Group>
                        <Row>
                            <Col offset={8} span={8}>
                                <Typography.Text>Hora de inicio:</Typography.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={2} span={9}>
                            <Form.Item
                                name="hours"
                            >
                                <InputNumber 
                                min={0}
                                max={23} />
                            </Form.Item>
                            </Col>
                            <Col span={1}>
                            <Typography.Text> : </Typography.Text>
                            </Col>
                            <Col span={9}>
                            <Form.Item
                                name="minutes"
                                >
                                <InputNumber 
                                min={0}
                                max={59} />
                            </Form.Item>
                            </Col>
                        </Row>
                    </Input.Group>

                    <Form.Item
                        label="Tipo de stream"
                        name="type"
                    >
                        <Select placeholder="Tipo de stream" >
                            <Select.Option value="private">Privado</Select.Option>
                            <Select.Option value="public">Público</Select.Option>
                        </Select>
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <button className="btn" htmlType="submit" style={{width: "230px"}}>
                        Agregar
                        </button>
                    </Form.Item>
                    </Form>

            </Modal>

            <Modal
                style={{ top: 20 }}
                title="Editar streaming"
                visible={isModal2Visible}
                onCancel={handleCancel}
                footer={null}
            >
            {streamingToBeEdited &&
                <Form
                    {...layout}
                    name="editStreaming"
                    initialValues={{ remember: true }}
                    onFinish={onFinish2}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 80px"}}
                    >
                     <Form.Item
                        label="Título de la clase/concierto/charla"
                        name="title"
                        initialValue={streamingToBeEdited.title}
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Descripción"
                        name="description"
                        initialValue={streamingToBeEdited.description}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item
                        label="Tipo de stream"
                        name="type"
                        initialValue={streamingToBeEdited.type}
                    >
                        <Select placeholder="Tipo de stream" >
                            <Select.Option value="private">Privado</Select.Option>
                            <Select.Option value="public">Público</Select.Option>
                        </Select>
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <button className="btn" htmlType="submit" style={{width: "230px"}}>
                        Guardar cambios
                        </button>
                    </Form.Item>
                    </Form>}

            </Modal>

            <Modal
                style={{ top: 20 }}
                title="Borrar streaming"
                visible={isModal3Visible}
                onCancel={handleCancel}
                onOk={deleteStreaming}
                okText="Borrar"
                cancelText="Cancelar"
                okType="danger primary"
                
            >
            <Typography.Title type="danger" level={5}>Estás segura de borrar este streaming?</Typography.Title>

            </Modal>

            {myStreamings ?
                <Row style={{padding: "40px"}} gutter={16}>
                {myStreamings.map(stream => (<Col lg={{span:8}} md={{span:12}} xs={{span: 24}}>
                    <i onClick={() => {
                        setEditStreaming(stream._id)
                        showModal2()
                    } } style={{cursor: "pointer", position: "absolute", top: "20px", right: "40px", zIndex: "5", color: "white"}} class="far fa-edit"></i>
                    <i onClick={() => {
                        setEditStreaming(stream._id)
                        showModal3()
                    } } style={{cursor: "pointer", position: "absolute", top: "20px", left: "40px", color: "red", zIndex: "5"}} class="far fa-trash-alt"></i>
                    <Card cover={<video controls></video>} bordered={false}>
                    <Typography.Title level={3}>{stream.title}</Typography.Title>
                    <Typography.Text>{stream.hour}</Typography.Text><br />
                    <Typography.Text>{stream.description}</Typography.Text><br />
                    <Typography.Text>Copiá el siguiente código para empezar a stremear:</Typography.Text><br />
                    <Typography.Text>{stream.streamKey}</Typography.Text><br />
                    <Typography.Text>Te recomendamos <a href="https://obsproject.com/es">OBS</a> que es gratis y de código abierto</Typography.Text><br />
                    <Link to={`/streaming/${stream._id}`}><Button>Accion</Button></Link><br />
                    {artist && <Typography.Text>{artist.name}</Typography.Text>}
                    </Card>
                    
                </Col>))}
            </Row> : <div></div>}
            
        </div>
    )
}

export default MyStreamings
