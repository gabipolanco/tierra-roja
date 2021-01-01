import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { createCourseFn, editCourseFn, deleteCourseFn, getOneCourseFn, 
    addClassFn, getOneClassFn, editClassFn, deleteClassFn } from '../services/courses'
import {Row, Col, Typography, Divider, Button, Modal, Form, Input, Select, DatePicker } from 'antd'
import { useContextInfo } from '../hooks/context'
const { RangePicker } = DatePicker;

const DashboardArtist = () => {
    const { user, userCourses, setUserCoursesFn, myStreamings } = useContextInfo()
    const [courses, setCourses] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModal2Visible, setIsModal2Visible] = useState(false);
    const [isModal3Visible, setIsModal3Visible] = useState(false);
    const [isModal4Visible, setIsModal4Visible] = useState(false);
    const [isModal5Visible, setIsModal5Visible] = useState(false);
    const [isModal6Visible, setIsModal6Visible] = useState(false);
    const [editCourse, setEditCourse] = useState(null)
    const [editClass, setEditClass] = useState(null)
    const [courseToBeEdited, setCourseToBeEdited] = useState(null)
    const [classToBeEdited, setClassToBeEdited] = useState(null)
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    useEffect(() => {
        function setMyCourses() {
            if(userCourses) setCourses([...userCourses])
        }
        setMyCourses()
    }, [userCourses])

    useEffect(() => {
        async function setCourseToEdit() {
            if (editCourse) {const {data} = await getOneCourseFn(editCourse)
            setCourseToBeEdited(data)}
        }
        setCourseToEdit()
    }, [isModal2Visible, isModal3Visible, editCourse])
    
    useEffect(() => {
        async function setClassToEdit() {
            if (editClass) {
                const {data} = await getOneClassFn(editClass)
                setClassToBeEdited(data)
            }
        }
        setClassToEdit()
    }, [isModal5Visible, isModal6Visible, editClass])

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
      const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
      };

    const onFinish = async (values) => {
        let date = values.date
        if (date) {date = [date[0].toDate(), date[1].toDate()]}
        await createCourseFn({name: values.name, description: values.description, date})
        setIsModalVisible(false)
        setUserCoursesFn()
    }

    const onFinish2 = async (values) => {
        const courseId = courseToBeEdited._id
        let date = values.date
        if (date) {date = [date[0].toDate(), date[1].toDate()]} else {date = courseToBeEdited.date} 
        await editCourseFn(courseId, {name: values.name, description: values.description, date})
        setIsModal2Visible(false)
        setCourseToBeEdited(null)
        setEditCourse(null)
        setUserCoursesFn()
    }

    const deleteCourse = async () => {
        const id = courseToBeEdited._id
        await deleteCourseFn(id)
        setIsModal3Visible(false)
        setCourseToBeEdited(null)
        setUserCoursesFn()
    }

    const onFinishAddClass = async ({name, description, contentLink, slideShowLink, video, hour}) => {
        const courseId = courseToBeEdited._id
        if (hour) hour = hour.toDate()
        await addClassFn(courseId, { name, description, contentLink, slideShowLink, video, hour })
        setIsModal4Visible(false)
        setUserCoursesFn()
        form2.resetFields()
    }

    const onFinishEditClass = async ({name, description, contentLink, slideShowLink, video, hour}) => {
        const id = classToBeEdited._id
        if (hour) hour = hour.toDate()
        await editClassFn(id, { name, description, contentLink, slideShowLink, video, hour })
        setIsModal5Visible(false)
        setUserCoursesFn()
        form2.resetFields()
    }

    const deleteClass = async () => {
        const courseId = courseToBeEdited._id
        const id = classToBeEdited._id
        await deleteClassFn(courseId, id)
        setIsModal6Visible(false)
        setClassToBeEdited(null)
        setUserCoursesFn()
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

    const showModal4 = () => {
        setIsModal4Visible(true);
    };

    const showModal5 = () => {
        setIsModal5Visible(true);
    };

    const showModal6 = () => {
        setIsModal6Visible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModal2Visible(false);
        setIsModal3Visible(false);
        setIsModal4Visible(false);
        setIsModal5Visible(false);
        setIsModal6Visible(false);
        setCourseToBeEdited(null)
        setClassToBeEdited(null)
        setEditCourse(null)
        setEditClass(null)
    };

    return user && (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                    <div style={{width: "100px", height: "100px", margin: "0 auto", borderRadius: "50%", overflow: "hidden"}}>
                        <img style={{height: "100%", objectFit: "cover"}} src={user.image} alt=""/>
                    </div>                    
                </Col>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 4, offset:0 }}>
                    <Typography.Title level={3}>{user.username}</Typography.Title>
                </Col>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 4, offset:6 }}>
                    {user.role === "artist" && <Button onClick={showModal}>Agregar un curso</Button>}
                </Col>
            </Row>

            <Divider><Typography.Title level={3}>Cursos</Typography.Title></Divider>
             
            {courses && courses.map((course) => {
                let desde
                let hasta
                if (course.date.length !== 0) {
                    desde = new Date(course.date[0]).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric'}).toString()
                    hasta = new Date(course.date[1]).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric'}).toString()
                }
                
                return <Row gutter={[16, 16]}>

                <Col offset={2} span={4}>
                    <i onClick={() => {
                        setEditCourse(course._id)
                        showModal2()
                    } } style={{cursor: "pointer", position: "absolute", top: "20px", right: "-40px", zIndex: "5"}} className="far fa-edit"></i>
                    <i onClick={() => {
                        setEditCourse(course._id)
                        showModal3()
                    } } style={{cursor: "pointer", position: "absolute", top: "20px", right: "-80px", color: "red", zIndex: "5"}} className="far fa-trash-alt"></i>
                   <i onClick={() => {
                        setEditCourse(course._id)
                        showModal4()
                    } } style={{cursor: "pointer", position: "absolute", top: "20px", right: "-120px", zIndex: "5"}} className="fas fa-plus"></i>
                   
                    <Typography.Title level={5}>{course.name}</Typography.Title>
                    {course.date.length !== 0 && <Typography.Text>Del: {desde} al {hasta}</Typography.Text>}<br/>
                    <Typography.Text>{course.description}</Typography.Text>
                </Col>

                <Col offset={2} span={16}>
                    {course.classes && course.classes.map(c => 
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Row>
                                <Col span={10}>
                                    <Typography.Title level={5}>{c.name}</Typography.Title>
                                    <Typography.Text>{c.description}</Typography.Text>
                                </Col>

                                <Col span={1}>
                                <i onClick={() => {
                                    setEditCourse(course._id)
                                    setEditClass(c._id)
                                    showModal5()
                                } } style={{cursor: "pointer", zIndex: "5"}} className="far fa-edit"></i>
                                </Col>

                                <Col span={1}>
                                <i onClick={() => {
                                    setEditCourse(course._id)
                                    setEditClass(c._id)
                                    showModal6()
                                } } style={{cursor: "pointer", color: "red", zIndex: "5"}} className="far fa-trash-alt"></i>
                                </Col>

                                <Col span={4}>
                                    <Link rel="noopener noreferrer" to={`/streaming/${c.video}`}><Button>Clase</Button></Link>
                                </Col>
                                
                                <Col span={4}>
                                    <a rel="noopener noreferrer" target="_blank" href={c.slideShowLink}><Button>Diapositivas</Button></a>
                                </Col>

                                <Col span={4}>
                                    <a rel="noopener noreferrer" target="_blank" href={c.contentLink}><Button>Material</Button></a>
                                </Col>
                            </Row>
                            <Divider />
                        </Col>

                    </Row>)}
                </Col>

                <Divider />
                </Row>})}


                <Modal
                style={{ top: 20 }}
                title="Agregar un curso"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                >

                <Form
                    {...layout}
                    form={form}
                    name="addCourse"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 15%", fontFamily: "Roboto"}}
                    >
                    <Form.Item
                        label="Nombre del curso"
                        name="name"
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Descripción"
                        name="description"
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item
                        label="Fechas de inicio y final"
                        name="date"
                    >
                        <RangePicker />
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
            {courseToBeEdited &&
                <Form
                    {...layout}
                    name="editCourse"
                    initialValues={{ remember: true }}
                    onFinish={onFinish2}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 15%", fontFamily: "Roboto"}}
                    >
                     <Form.Item
                        label="Nombre del curso"
                        name="name"
                        initialValue={courseToBeEdited.name}
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Descripción"
                        name="description"
                        initialValue={courseToBeEdited.description}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item
                        label="Fechas de inicio y final"
                        name="date"
                    >
                        <RangePicker />
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
                title="Borrar curso"
                visible={isModal3Visible}
                onCancel={handleCancel}
                onOk={deleteCourse}
                okText="Borrar"
                cancelText="Cancelar"
                okType="danger primary"
                
            >
            <Typography.Title style={{fontFamily: "Roboto"}} type="danger" level={5}>Estás segura de borrar este curso?</Typography.Title>

            </Modal>

            <Modal
                style={{ top: 20 }}
                title="Agregar una clase"
                visible={isModal4Visible}
                onCancel={handleCancel}
                footer={null}
                >

                <Form
                    {...layout}
                    form={form2}
                    name="addClass"
                    initialValues={{ remember: true }}
                    onFinish={onFinishAddClass}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 80px", fontFamily: "Roboto"}}
                    >
                    <Form.Item
                        label="Nombre de la clase"
                        name="name"
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Descripción"
                        name="description"
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item
                        label="Fecha y hora de la clase (opcional)"
                        name="hour"
                    >
                        <DatePicker showTime />
                    </Form.Item>

                    <Form.Item
                        label="Material de la clase (Link externo)"
                        name="contentLink"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Diapositicas (Link externo)"
                        name="slideShowLink"
                    >
                        <Input/>
                    </Form.Item>                    

                    <Form.Item
                    name="video"
                    label="Video de la clase">
                        <Select placeholder="Elegi el video" >
                            {myStreamings && myStreamings.map((stream => 
                            <Select.Option value={stream._id}>{stream.title}</Select.Option>
                            ))}
                        </Select>
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
                title="Editar una clase"
                visible={isModal5Visible}
                onCancel={handleCancel}
                footer={null}
                >

                {classToBeEdited && <Form
                    {...layout}
                    form={form}
                    name="editClass"
                    initialValues={{ remember: true }}
                    onFinish={onFinishEditClass}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 80px", fontFamily: "Roboto"}}
                    >
                    <Form.Item
                        label="Nombre de la clase"
                        name="name"
                        initialValue={classToBeEdited.name}
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Descripción"
                        name="description"
                        initialValue={classToBeEdited.description}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item
                        label="Fecha y hora de la clase (opcional)"
                        name="hour"
                    >
                        <DatePicker showTime />
                    </Form.Item>

                    <Form.Item
                        label="Material de la clase (Link externo)"
                        name="contentLink"
                        initialValue={classToBeEdited.contentLink}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Diapositicas (Link externo)"
                        name="slideShowLink"
                        initialValue={classToBeEdited.slideShowLink}
                    >
                        <Input/>
                    </Form.Item>                    

                    <Form.Item
                    name="video"
                    label="Video de la clase"
                    initialValue={classToBeEdited.video}
                    >
                        <Select placeholder="Elegi el video" >
                            {myStreamings && myStreamings.map((stream => 
                            <Select.Option value={stream._id}>{stream.title}</Select.Option>
                            ))}
                        </Select>
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
                    title="Borrar clase"
                    visible={isModal6Visible}
                    onCancel={handleCancel}
                    onOk={deleteClass}
                    okText="Borrar"
                    cancelText="Cancelar"
                    okType="danger primary"
                    
                >
                <Typography.Title style={{fontFamily: "Roboto"}} type="danger" level={5}>Estás segura de borrar esta clase?</Typography.Title>

                </Modal>
            
        </div>
    )
}

export default DashboardArtist
