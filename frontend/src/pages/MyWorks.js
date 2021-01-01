import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Card, Col, Row, Button, Modal, Form, Input, InputNumber, Select, Typography } from 'antd';
import { useContextInfo } from '../hooks/context'
import { createWorkFn, getOneWorkFn, editWorkFn, deleteWorkFn } from '../services/works'
import axios from 'axios'

const MyWorks = () => {
    const { artist, works, setUserWorksFn } = useContextInfo()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModal2Visible, setIsModal2Visible] = useState(false);
    const [isModal3Visible, setIsModal3Visible] = useState(false);
    const [editWork, setEditWork] = useState(null)
    const [workToBeEdited, setWorkToBeEdited] = useState(null)
    const [img, setImg] = useState(null)
    const [form] = Form.useForm();
    let userWorks
    if(works) userWorks = [...works]
    
    useEffect(() => {
        async function setWorkToEdit() {
            if (editWork) {
            const {data} = await getOneWorkFn(editWork)
            setWorkToBeEdited(data)
        }
        }
        setWorkToEdit()
    }, [isModal2Visible, isModal3Visible, editWork])

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
      const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
      };

        const onFinish = async (values) => {
            await createWorkFn({...values, media: img})
            setIsModalVisible(false)
            setImg(null)
            form.resetFields()
            setUserWorksFn()
        };

        const onFinish2 = async (values) => {
            let media
            let qty
            img ? media = img : media = workToBeEdited.media
            values.qty ? qty = values.qty : qty = workToBeEdited.qty
            const workId = workToBeEdited._id
            await editWorkFn(workId, {...values, media, qty})
            setUserWorksFn()
            setIsModal2Visible(false)
            setWorkToBeEdited(null)
            setEditWork(null)
            setImg(null)
        }

        const deleteWork = async () => {
            const id = workToBeEdited._id
            await deleteWorkFn(id)
            setUserWorksFn()
            setIsModal3Visible(false)
            setWorkToBeEdited(null)
        }
      
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
        setWorkToBeEdited(null)
        setEditWork(null)
    };

    return (
        <div className="page">
            <Link style={{position: "fixed", top: "70px", left: "70px", zIndex: "5"}} className="back" to="/profile"><i style={{marginRight: "10px"}} className="fas fa-arrow-left"></i>Perfil</Link>
            <h1>Mis trabajos</h1>
            <Button onClick={showModal}>Agregar un trabajo</Button>

            <Modal
                style={{ top: 20 }}
                title="Agregar trabajo"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >

                <Form
                    {...layout}
                    form={form}
                    name="addWork"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 15%", fontFamily: "Roboto"}}
                    >
                     <Form.Item
                        label="Título de la obra/producto"
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

                    <label htmlFor="media" style={{width: "100%", margin: "40px 0"}}>Foto:</label>   
                    <input type="file" style={{margin: "40px auto"}} onChange={handleUploadFile} name="media" />

                    <Form.Item
                        label="A la venta"
                        name="workType"
                    >
                        <Select placeholder="Elegir" >
                            <Select.Option value="art">No</Select.Option>
                            <Select.Option value="craft">Sí</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Precio (si está en venta)"
                        name="price"
                    >
                        <Input addonBefore="ARS$"/>
                    </Form.Item>

                    <Form.Item
                        label="Cantidad disponible"
                        name="qty"
                    >
                        <InputNumber min="1" defaultValue="1" />
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <button className="btn" type="submit" style={{width: "230px"}}>
                        Agregar
                        </button>
                    </Form.Item>
                    </Form>

            </Modal>

            <Modal
                style={{ top: 20 }}
                title="Editar trabajo"
                visible={isModal2Visible}
                onCancel={handleCancel}
                footer={null}
            >
            {workToBeEdited &&
                <Form
                    {...layout}
                    name="editWork"
                    initialValues={{ remember: true }}
                    onFinish={onFinish2}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 15%", fontFamily: "Roboto"}}
                    >
                     <Form.Item
                        label="Título de la obra/producto"
                        name="title"
                        initialValue={workToBeEdited.title}
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Descripción"
                        name="description"
                        initialValue={workToBeEdited.description}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <label htmlFor="media" style={{width: "100%", margin: "40px 0"}}>Foto:</label>   
                    <input type="file" style={{margin: "40px auto"}} onChange={handleUploadFile} name="media" />

                    <Form.Item
                        label="A la venta"
                        name="workType"
                        initialValue={workToBeEdited.workType}
                    >
                        <Select placeholder="Elegir" >
                            <Select.Option value="art">No</Select.Option>
                            <Select.Option value="craft">Sí</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Precio (si está en venta)"
                        name="price"
                        initialValue={workToBeEdited.price}
                    >
                        <Input addonBefore="ARS$"/>
                    </Form.Item>

                    <Form.Item
                        label="Cantidad disponible"
                        name="qty"
                    >
                        <InputNumber min="1" />
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <button className="btn" type="submit" style={{width: "230px"}}>
                        Guardar cambios
                        </button>
                    </Form.Item>
                    </Form>}

            </Modal>

            <Modal
                style={{ top: 20 }}
                title="Borrar trabajo"
                visible={isModal3Visible}
                onCancel={handleCancel}
                onOk={deleteWork}
                okText="Borrar"
                cancelText="Cancelar"
                okType="danger primary"
                
            >
            <Typography.Title style={{fontFamily: "Roboto"}} type="danger" level={5}>Estás segura de borrar este trabajo?</Typography.Title>

            </Modal>

            {userWorks ?
                <Row style={{padding: "40px"}} gutter={16}>
                {userWorks.map(work => (<Col lg={{span:8}} md={{span:12}} xs={{span: 24}}>
                    <i onClick={() => {
                        setEditWork(work._id)
                        showModal2()
                    } } style={{cursor: "pointer", position: "absolute", top: "20px", right: "40px", zIndex: "5"}} className="far fa-edit"></i>
                    <i onClick={() => {
                        setEditWork(work._id)
                        showModal3()
                    } } style={{cursor: "pointer", position: "absolute", top: "20px", left: "40px", color: "red", zIndex: "5"}} className="far fa-trash-alt"></i>
                    <Card hoverable cover={<img style={{objectFit: "cover", height: "250px"}} src={work.media} alt={work.title} />} title={work.title} bordered={false}>
                    <Typography.Text>{work.description}</Typography.Text><br />
                    {work.price && <> <Typography.Text>$ {work.price}</Typography.Text><br /></>}
                    {artist && <Typography.Text>{artist.name}</Typography.Text>}<br />
                    <Typography.Text>{work.qty} disponibles</Typography.Text>
                    </Card>
                </Col>))}
            </Row> : <div></div>}
            
        </div>
    )
}

export default MyWorks
