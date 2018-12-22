import React from 'react';
import { DatePicker, Input, Select } from "antd";
import moment from "moment";

class DatePickerInput extends React.PureComponent {
    handleChange = (date) => {
        this.props.input.onChange(moment(date).valueOf())
    }
    render () {
        const { input, meta: { error, touched }, required, ...rest } = this.props
        return (
            <React.Fragment>
                <label className='form-col-form-label' htmlFor={input.name}> {required ? '*' : ''}</label>
                <DatePicker {...rest}
                    autoOk
                    defaultValue={moment()}
                    onChange={this.handleChange}
                    selected={input.value ? moment(input.value) : null} />
                {touched && error && <span className='error-block'>{error}</span>}
            </React.Fragment>
        )
    }
}

export class InputWrap extends React.PureComponent {
    handleChange = (date) => {
        this.props.input.onChange(date)
    }
    render () {
        const { input, meta: { error, touched }, required, ...rest } = this.props
        return (
            <React.Fragment>
                <label className='form-col-form-label' htmlFor={input.name}> {required ? '*' : ''}</label>
                <Input {...rest}
                    onChange={this.handleChange}
                />
                {touched && error && <span className='error-block'>{error}</span>}
            </React.Fragment>
        )
    }
}

export class SelectWrap extends React.PureComponent {
    handleChange = (date) => {
        this.props.input.onChange(date)
    }
    render () {
        const { input, meta: { error, touched }, required, ...rest } = this.props
        return (
            <React.Fragment>
                <label className='form-col-form-label' htmlFor={input.name}> {required ? '*' : ''}</label>
                <Select {...rest}
                    onChange={this.handleChange}
                />
                {touched && error && <span className='error-block'>{error}</span>}
            </React.Fragment>
        )
    }
}

export default DatePickerInput;