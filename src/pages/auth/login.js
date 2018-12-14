import React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import Media from 'react-media'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            console.log('Received values of form: ', values);
            }
        });
    };

    loginWithGoogle = e => {
        e.preventDefault();
        this.props.firebase.login({ provider: 'google', type: 'popup' })
    }

    render() {
        return (
            <Row
                type="flex"
                justify="center"
            >
                <Media query='(max-width: 900px)'>
                    {
                        matcher => matcher ? (
                            <React.Fragment>
                                <Col span={20}>
                                    <LoginForm
                                        form={this.props.form}
                                        handleSubmit={this.handleSubmit}
                                        loginWithGoogle={this.loginWithGoogle}
                                    />
                                </Col>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Col span={8}>
                                    <LoginForm
                                        form={this.props.form}
                                        handleSubmit={this.handleSubmit}
                                        loginWithGoogle={this.loginWithGoogle}
                                    />
                                </Col>
                            </React.Fragment>
                        )
                    }
                </Media>
            </Row>
        );
    }
}

// Login Form
const LoginForm = props => {
    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={props.handleSubmit} className="login-form">
            <FormItem>
                {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                />,
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                Log in
                </Button>
                <Button htmlType="submit" className="login-form-button" onClick={props.loginWithGoogle} block>
                Log in with Google
                </Button>
            </FormItem>
        </Form>
    )
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default compose(firebaseConnect(), connect())(WrappedNormalLoginForm);
