import React, {useEffect, useState} from 'react';
import {Col, Row, Button, Form, Input} from "antd";
import PageTitle from "../../components/PageTitle/PageTitle";
import {connect} from "react-redux";
import {firebaseConnect} from "react-redux-firebase";

const AddCategories = ({ firebase, uid, history, match, location }) => {
    const [form] = Form.useForm();
    const [edit, setEdit] = useState(false);
    const onFinish = (values) => {
        if (match.params.id) {
            firebase.update(`Categories/${uid}/${match.params.id}`, { ...values })
                .then(() => history.push("/dashboard/categories"))
                .catch(a => console.log('error', a))
            return;
        }
        firebase.push(`Categories/${uid}/`,{ ...values })
            .then(() => history.push("/dashboard/categories"))
            .catch(a => console.log('error', a))
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        if (match.params.id) {
            setEdit(true);
        }
    }, [])
    return (
        <div className="site-layout-content">
            <Row>
                <Col span={12}>
                    <PageTitle>{edit ? "Edit" :"Add"} Category</PageTitle>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <Form
                        layout="vertical"
                        name="addCategories"
                        form={form}
                        onFinish={onFinish}
                        initialValues={
                            edit ? { title: "", description: "" }
                            : {title: "", description: "",...location.state}}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                        >
                            <Input
                                type="text"
                                placeholder="Title"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                        >
                        <Input
                            type="text"
                            placeholder="Description"
                        />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
const FormEnhancer = firebaseConnect(() => [])(AddCategories);

export default connect(({firebase}) => ({
    uid: firebase.auth.uid
}))(FormEnhancer);
