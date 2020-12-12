import React, { useState } from 'react';
import { Modal, Form, Input, Typography, Checkbox, Alert } from 'antd';
import { signupFn } from '../services/auth'

const googleUrl = process.env.NODE_ENV === 'development' ?
  "http://localhost:3000/auth/google" : '/auth/google'

const SignupForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [registered, setRegistered] = useState(false)
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };
  
  const Formul = () => {
    const onFinish = async ({email, password}) => {
      try {
        await signupFn({email, password})
        setIsModalVisible(false);
        setRegistered(true)
      } catch(err) {
        console.log(err.response.data.err)
        // message.error(err.res.data.err.message)
      }
    };
  
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        style={{margin: "0 80px", fontFamily: "Roboto"}}
      >
        <Form.Item
          label="Email"
          name="email"
          
          rules={[
            {
              type: 'email',
              message: 'Ingresa un correo electrónico válido!',
            },
            {
              required: true,
              message: 'Por favor ingresa tu correo electrónico!',
            },
          ]}
        >
          <Input style={{width: "300px"}}/>
        </Form.Item>
  
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa una contraseña!',
            },
          ]}
          hasFeedback
        >
          <Input.Password style={{width: "300px"}}/>
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="Repite tu contraseña"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor confirma tu contraseña!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Las dos contraseñas no coinciden!');
              },
            }),
          ]}
        >
          <Input.Password style={{width: "300px"}}/>
        </Form.Item>
  
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Recordarme</Checkbox>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <button className="btn" htmlType="submit" style={{width: "230px"}}>
            Registrarse
          </button>
        </Form.Item>
      </Form>
    );
  };



  return (
    <>
      {registered && <Alert style={{top: "100px", width: "300px", backgroundColor: "#FDFAF7", border: "none"}} message="Registro exitoso" description="Revisa tu email para confirmar el registro" closeText="X" type="success" />}
      <p style={{cursor: "pointer"}} type="primary" onClick={showModal}>
        Registrate
      </p>
      <Modal
        style={{ top: 20 }}
        title="Registrate"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Formul />

        <Typography.Text>
          ----- O registrate con una red social -----
        </Typography.Text>
        <br />
        <br />

        <div>
          <div>
              <a href={googleUrl}><img alt="" src="./images/btn_google_signin_light_pressed_web@2x.png" style={{width: "50%", height: "auto"}}/></a>
            </div>
        </div>
      </Modal>
    </>
  );
}

export default SignupForm