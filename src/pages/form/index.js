import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import 'react-datepicker/dist/react-datepicker.css';
import {Link} from 'react-router-dom'
import {Layout,  Row, Col, Card} from 'antd'

const {Content} = Layout;

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
  const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
        <Content>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title</label>
            <div>
              <Field
                name="title"
                component="input"
                type="text"
                placeholder="Title"
              />
            </div>
          </div>
          <div>
            <label>Select Date</label>
            <div>
            <Field name='date' component={DatePickerInput} />
            </div>
          </div>
          <div>
            <label>Category</label>
            <div>
              <Field name="category" component="select">
                {this.props.categories && this.props.categories.map(item => (
                  <option value={item.value} key={item.key}>{item.value}</option>
                ))}
              </Field>
            </div>
          </div>
          <div>
            <label>Amount</label>
            <div>
              <Field
                  name="amount"
                  component="input"
                  type="text"
                  placeholder="Amount"
                />
            </div>
          </div>
          <div>
            <label htmlFor="employed">Calculate</label>
            <div>
              <Field
                name="employed"
                id="employed"
                component="input"
                type="checkbox"
              />
            </div>
          </div>
          <div>
            <label>Notes</label>
            <div>
              <Field name="notes" component="textarea" />
            </div>
          </div>
          <div>
            <button type="submit" disabled={pristine || submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </form>
        </Content>
    );
  }
};

class DatePickerInput extends React.PureComponent {

  handleChange = (date) => {
    this.props.input.onChange(moment(date).valueOf())
  }

  render () {
    const { input, className, meta: { error, touched }, required, ...rest } = this.props

    return (
      <div>
        <label className='form-col-form-label' htmlFor={input.name}> {required ? '*' : ''}</label>
        <DatePicker {...rest}
          autoOk
          onChange={this.handleChange}
          selected={input.value ? moment(input.value) : null} />
        {touched && error && <span className='error-block'>{error}</span>}
      </div>
    )
  }
}

export default compose(
  firebaseConnect(['Categories']),
  connect(({firebase}) => ({categories: firebase.ordered.Categories})))(reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm));


