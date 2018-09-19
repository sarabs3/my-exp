import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {Link} from 'react-router-dom'

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
      <React.Fragment>
        <ul>
          <li>
              <Link to='/'>Add</Link>
          </li>
          <li>
              <Link to='/page2'>List</Link>
          </li>
        </ul>

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
                <option />
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="clothes">Clothes</option>
                <option value="living">Living</option>
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

      </React.Fragment>
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

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);


