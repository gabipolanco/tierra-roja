import React from 'react'
import { Row, Col, Form, Input, Select } from 'antd'
import { useContextInfo } from '../hooks/context'   
import { editFn } from '../services/auth'
import { useHistory } from "react-router-dom";

const EditUser = () => {
    const { user, login } = useContextInfo()
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
          const {data: { editedUser } } = await editFn(id, values)
          login(editedUser)
          history.push("/profile")
        };
      
        const onFinishFailed = errorInfo => {
          console.log('Failed:', errorInfo);
        };

    return user && (
        <div className="page">
            <h1>Editá tu perfil</h1>
            <Row style={{marginTop: "70px"}}>
                <Col xs={{ span: 24 }} lg={{ span: 8, offset: 8 }}>
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
                        label="Nombre de usuario"
                        name="username"
                        initialValue={user.username}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={user.email}
                        
                        rules={[
                        {
                            type: 'email',
                            message: 'Ingresa un correo electrónico válido!',
                        },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Contraseña actual"
                        hasFeedback
                    >
                        <Input.Password/>
                    </Form.Item>
                
                    <Form.Item
                        name="password"
                        label="Nueva contraseña"
                        hasFeedback
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Repite tu contraseña"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Las dos contraseñas no coinciden!');
                            },
                        }),
                        ]}>
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                    name="role"
                    label="Rol"
                    initialValue={user.role}>
                        <Select placeholder="Elegi tu rol" >
                            <Select.Option value="guest">Cliente</Select.Option>
                            <Select.Option value="artist">Artista</Select.Option>
                        </Select>
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

export default EditUser
