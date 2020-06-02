import React from 'react';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Layout,
    Input,
    Select,
    Row,
    Col,
    DatePicker,
    Switch,
    Button,
    Divider
} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Formik, Form, Field } from 'formik';

const {Content} = Layout;
const Option = Select.Option;

const AddExpense = ({ onSubmit, reset, paymentMode, categories, handleSavings, savingAccounts }) => {
    // paymentMode
    const submit = (values) => {
        if (values.expense) {
            const getMode = paymentMode.find(k => k.key === values.mode);
            const payload = { ...values, mode: getMode };
            onSubmit(payload);
            return;
        }
        handleSavings(values);
    };
    return (
        <Content>
            <Row type="flex" justify='center'>
                <Col span={22}>
                    <Divider />
                    <h1>Add Income</h1>
                    <Divider />
                    <Formik
                        initialValues={{ title: '', amount: '', date: moment().unix()*1000, expense: true, accountId: '' }}
                        onSubmit={submit}
                    >
                        {({
                            setFieldValue,
                            values
                          }) => (
                            <Form>
                                <div style={{ marginBottom: 20 }}>
                                    <label htmlFor="title">Title</label>
                                    <Field name="title" as={Input} />
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                    <label htmlFor="amount">Amount</label>
                                    <Field name="amount" as={Input} />
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                    <Switch onChange={(e) => setFieldValue('expense', e)} checkedChildren="Expense" unCheckedChildren="Saving" defaultChecked />
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                    <label className='form-col-form-label'  htmlFor="date">Date</label>
                                    <DatePicker
                                        autoOk
                                        defaultValue={moment()}
                                        onChange={(e) => setFieldValue('date', e)}
                                    />
                                </div>
                                {!values.expense && <div style={{ marginBottom: 20 }}>
                                    <Row>
                                        <Col span={12}>
                                            <label>Select Saving Account</label>
                                            <Field
                                                name="accountId"
                                                style={{ width: '100%' }}
                                                component={Select}
                                                defaultValue=''
                                                onChange={(e) => setFieldValue('accountId', e)}
                                            >
                                                <Option value=''>
                                                    -- Select Saving Account --
                                                </Option>
                                                {
                                                    savingAccounts && savingAccounts.map(item => (
                                                            <Option value={item.key} key={item.key}>
                                                                {item.value.name}
                                                            </Option>
                                                        )
                                                    )
                                                }
                                            </Field>
                                        </Col>
                                    </Row>
                                </div>}
                                <div style={{ marginBottom: 20 }}>
                                    <Row>
                                        <Col span={12}>
                                            <Field
                                                name="mode"
                                                style={{ width: '100%' }}
                                                component={Select}
                                                defaultValue='Cash'
                                                onChange={(e) => setFieldValue('mode', e)}
                                            >
                                                <Option value=''>
                                                    -- Select Payment Method --
                                                </Option>
                                                {
                                                    paymentMode && paymentMode.map(item => (
                                                            <Option value={item.key} key={item.key}>
                                                                {item.value.name}
                                                            </Option>
                                                        )
                                                    )
                                                }
                                            </Field>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                    <Row>
                                        <Col span={12}>
                                            <Field
                                                name="category"
                                                style={{ width: '100%' }}
                                                component={Select}
                                                defaultValue='food'
                                                onChange={(e) => setFieldValue('category', e)}
                                            >
                                                <Option value=''>
                                                    -- Select Category --
                                                </Option>
                                                {
                                                    categories && categories.map(
                                                        item => (
                                                            <Option
                                                                value={item.value}
                                                                key={item.key}
                                                            >
                                                                {item.value}
                                                            </Option>
                                                        )
                                                    )
                                                }
                                            </Field>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <Row>
                                        <Col span={12}>
                                            <Button type="primary" htmlType="submit" block>Submit</Button>
                                        </Col>
                                        <Col span={12}>
                                            <Button onClick={reset} block >Clear Values</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Content>
    );
};

export default AddExpense;
