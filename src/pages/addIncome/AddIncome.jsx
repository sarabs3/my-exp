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
  Button,
  Divider
} from 'antd';
import './addIncome.css';
import { Formik, Form, Field } from 'formik';

const {Content} = Layout;
const Option = Select.Option;

const AddIncome = ({ onSubmit, reset, paymentMode }) => {
  const handleSubmit = (values) => {
    const payload = { ...values };
    const getMode = paymentMode ? paymentMode.find(k => k.key === values.mode) : null;
    if (paymentMode) { payload.mode = getMode.key }
    onSubmit(payload);
  };
  return (
      <Content>
        <Row type="flex" justify='center'>
          <Col span={22}>
            <Divider />
            <h1>Add Income</h1>
            <Divider />
            <Formik
                initialValues={{ title: '', amount: '', date: moment().unix()*1000 }}
                onSubmit={handleSubmit}
            >
              {({
                  setFieldValue
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
                      <label className='form-col-form-label'  htmlFor="date">Date</label>
                      <DatePicker
                          autoOk
                          defaultValue={moment()}
                          onChange={(e) => setFieldValue('date', e)}
                      />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <Row>
                        <Col span={12}>
                          <Field
                              name="mode"
                              style={{ width: '100%' }}
                              component={Select}
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

export default AddIncome;
