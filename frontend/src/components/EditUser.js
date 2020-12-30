import React, {useState} from 'react'
import { Row, Col, Form, Input, Select } from 'antd'
import { useContextInfo } from '../hooks/context'   
import { editFn } from '../services/auth'
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components'

const EditStyled = styled.div`
 .back-mobile {
    position: fixed; 
    top: 100px; 
    left: 110px; 
    z-index: 15;
}
.back {
    display: none;
}
@media ${props => props.theme.device.tablet} {
    .back {
        display: block;
        position: fixed; 
        top: 70px; 
        left: 70px; 
        z-index: 15;
        i {
            margin-right: 10px;
        }
    }
    .back-mobile {
        display: none;
    }
}
`

const EditUser = () => {
    const { user, login } = useContextInfo()
    let history = useHistory();
    const [enabled, setEnabled] = useState(null)

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
      const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
      };

        const onFinish = async (values) => {
          const id = user._id
          if (!values.confirm) {
           const {data: { editedUser } } = await editFn(id, {email: values.email, role: values.role, username: values.username})
            login(editedUser)
            return history.push("/profile")
            }
            const {data: { editedUser } } = await editFn(id, {email: values.email, role: values.role, username: values.username, oldPassword: values.oldPassword, confirm: values.confirm})
            login(editedUser)
            history.push("/profile")
        };
      
        const onFinishFailed = errorInfo => {
          console.log('Failed:', errorInfo);
        };

        function enable({target: {value}}) {
            if (value === '') return setEnabled(null)
            setEnabled(true)
        }

    return user && (
        <EditStyled className="page">
            <Link className="back-mobile" to="/profile"><i className="fas fa-user-alt"></i></Link>
            <Link className="back" to="/profile"><i style={{marginRight: "10px"}} className="fas fa-arrow-left"></i>Perfil</Link>
            <h1>Editá tu perfil</h1>
            <Row style={{marginTop: "70px"}}>
                <Col xs={{ offset: 2, span: 20 }} lg={{ span: 8, offset: 8 }}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
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
                        name="oldPassword"
                        label="Contraseña actual"
                        hasFeedback
                    >
                        <Input.Password onChange={enable}/>
                    </Form.Item>
                
                    <Form.Item
                        name="password"
                        label="Nueva contraseña"
                        hasFeedback
                    >
                        <Input.Password disabled={!enabled} />
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
                        <Input.Password disabled={!enabled} />
                    </Form.Item>

                    <Form.Item
                    name="role"
                    label="Rol"
                    initialValue={user.role}>
                        <Select placeholder="Elegi tu rol" >
                            <Select.Option value="user">Usuario</Select.Option>
                            {/* <Select.Option value="artist">Artista</Select.Option> */}
                            <Select.Option value="student">Estudiante</Select.Option>
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
        </EditStyled>
    )
}

export default EditUser
