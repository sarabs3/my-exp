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
  const handleSubmit = (e) => {
    onSubmit(e);
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
              {() => (
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
                      />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <Row>
                        <Col span={12}>
                          <Field
                              name="mode"
                              style={{ width: '100%' }}
                              component={Select}
                              defaultValue='Cash'
                          >
                            <Option value=''>
                              -- Select Payment Method --
                            </Option>
                            {
                              paymentMode && paymentMode.map(item => (
                                      <Option value={item.value} key={item.key}>
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

export default AddIncome;
