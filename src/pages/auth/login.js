import React from 'react';
import { Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import Media from 'react-media'
import './login.css';


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
            <div className="loginPage">
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
            </div>
        );
    }
}

// Login Form
const LoginForm = props => {
    // const { getFieldDecorator } = props.form;
    return (
        /*<Form onSubmit={props.handleSubmit} className="loginPage__login-form">
            <FormItem>
                {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
                })(<Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                />,
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                Log in
                </Button>

            </FormItem>
        </Form>*/
        <Button htmlType="submit" className="login-form-button" onClick={props.loginWithGoogle} block>
        Log in with Google
        </Button>
    )
};

const WrappedNormalLoginForm = NormalLoginForm;

export default compose(firebaseConnect(), connect())(WrappedNormalLoginForm);
