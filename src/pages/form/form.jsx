import React from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {Layout, Form, Input, Select, Row, Col, Checkbox, Button} from 'antd';
import './form.css';
import DatePickerInput, {InputWrap, SelectWrap} from "../../components/datePickerInput";


const {Content} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const styles = {
    FormItem : {
        marginBottom: 0
    }
}

class SimpleForm extends React.Component {
    constructor () {
    super()
    this.state = {
        startDate: moment()
    }
    }
    // clear Form
    clearForm = () => {
        this.setState(() => ({}))
    }
    // handlesubmit
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.reset()
        this.props.handleSubmit()
    }
    render() {
        const { pristine, reset, submitting, handleSubmit } = this.props;
        return (
        <Content>
            <Row type="flex" justify='center'>
            <Col span={22}>
                <Form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <div>
                    <Field
                        name="title"
                        component={InputWrap}
                        type="text"
                        placeholder="Title"
                    />
                    </div>
                <FormItem style={styles.FormItem}>
                    <label>Select Date</label>
                    <div>
                    <Field name='date' component={DatePickerInput} />
                    </div>
                </FormItem>
                <FormItem style={styles.FormItem}>
                    <label>Category</label>
                    <div>
                    <Field name="category" component={SelectWrap}>
                        {this.props.categories && this.props.categories.map(item => (
                        <Option value={item.value} key={item.key}>{item.value}</Option>
                        ))}
                    </Field>
                    </div>
                </FormItem>
                <FormItem style={styles.FormItem}>
                    <label>Amount</label>
                    <div>
                    <Field
                        name="amount"
                        component={InputWrap}
                        type="text"
                        placeholder="Amount"
                        />
                    </div>
                </FormItem>
                <FormItem style={styles.FormItem}>
                    <label>Payment Mode</label>
                    <div>
                    <Field name="mode" component={SelectWrap}>
                        {this.props.paymentMode && this.props.paymentMode.map(item => (
                        <Option value={item.value} key={item.key}>{item.value}</Option>
                        ))}
                        {/* <Option value='kotak_credit'>Kotak Credit Card</Option>
                        <Option value='kotak_debit'>Kotak Debit Card</Option>
                        <Option value='hdfc_credit'>HDFC Credit Card</Option>
                        <Option value='hdfc_debit'>HDFC Debit Card</Option>
                        <Option value='axis'>Axis Bank</Option>
                        <Option value='paytm'>Paytm</Option> */}
                    </Field>
                    </div>
                </FormItem>
                <FormItem style={styles.FormItem}>
                    <label htmlFor="calculate">Calculate</label>
                    <div>
                    <Field
                        name="calculate"
                        id="calculate"
                        component={Checkbox}
                        type='checkbox'
                    />
                    </div>
                </FormItem>
                <FormItem style={styles.FormItem}>
                    <label>Notes</label>
                    <div>
                    <Field name="notes" component={TextArea} />
                    </div>
                </FormItem>
                <FormItem style={styles.FormItem}>
                    <Button type="primary" htmlType="submit" disabled={pristine || submitting}>Submit</Button>
                    <Button  onClick={reset}>
                    Clear Values
                    </Button>
                </FormItem>
                </Form>
            </Col>
            </Row>
        </Content>
        );
    }
};


const ReduxFormComponent = reduxForm({
    form: 'addEntry',
})(SimpleForm)


export default reduxForm({
    form: 'addEntry',
})(SimpleForm)
