import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Input } from 'reactstrap'
import FieldGroup from './FieldGroup';

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"

const formatValue = (value) => {
  if (value) {
    const date = new Date(value)
    if (date.toString() === 'Invalid Date') {
      return undefined
    } {
      return date
    }
  }
  return undefined
}

const DatePicker = (props) => (
  <FieldGroup
    {...props}
    render={(fieldProps) => {
      return (<ReactDatePicker
        isClearable
        {...fieldProps}
        value={undefined}
        selected={formatValue(fieldProps.value)}
        onChange={(date) => {
          fieldProps.formik.form.setFieldValue(fieldProps.name, date)
        }}
        customInput={<Input {...fieldProps} />}
      />
    )}}
  />
)

export default DatePicker