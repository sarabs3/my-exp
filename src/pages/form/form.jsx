import React from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Layout,
    Form,
    Input,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    Divider
} from 'antd';
import './form.css';
import DatePickerInput, {
    InputWrap,
    SelectWrap
} from "../../components/datePickerInput";


const {Content} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

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
        const {
            pristine,
            reset,
            submitting,
            handleSubmit,
            paymentMode,
            categories
        } = this.props;
        return (
            <Content>
                <Row type="flex" justify='center'>
                    <Col span={22}>
                        <Divider />
                        <h1>Log Entry</h1>
                        <Divider />
                        <Form onSubmit={handleSubmit}>
                            <FormItem style={styles.FormItem}>
                                <Field
                                    name="title"
                                    component={InputWrap}
                                    type="text"
                                    placeholder="Title"
                                />
                            </FormItem>
                            <FormItem style={styles.FormItem}>
                                <Field
                                    name='date'
                                    component={DatePickerInput}
                                />
                            </FormItem>
                            <FormItem style={styles.FormItem}>
                                <Field
                                    name="category"
                                    component={SelectWrap}
                                    defaultValue=''
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
                            </FormItem>
                            <FormItem style={styles.FormItem}>
                                <Field
                                    name="amount"
                                    component={InputWrap}
                                    type="text"
                                    placeholder="Amount"
                                    />
                            </FormItem>
                            <FormItem style={styles.FormItem}>
                                <Field
                                    name="mode"
                                    component={SelectWrap}
                                    defaultValue=''
                                >
                                    <Option value=''>
                                        -- Select Payment Method --
                                    </Option>
                                    {
                                        paymentMode && paymentMode.map(
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
                            </FormItem>
                            <FormItem style={styles.FormItem}>
                                <label>Count </label>
                                <Field
                                    name="calculate"
                                    id="calculate"
                                    component={Checkbox}
                                    type='checkbox'
                                />
                            </FormItem>
                            <FormItem style={styles.FormItem}>
                                <Field name="notes" component={TextArea} />
                            </FormItem>
                            <FormItem style={styles.FormItem}>
                                <Row>
                                    <Col span={12}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            disabled={pristine || submitting}
                                            block
                                        >
                                            Submit
                                        </Button>
                                    </Col>
                                    <Col span={12}>
                                        <Button
                                            onClick={reset}
                                            block
                                        >
                                            Clear Values
                                        </Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Content>
        );
    }
};

export default reduxForm({
    form: 'addEntry',
})(SimpleForm)
