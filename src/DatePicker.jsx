import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Input } from 'reactstrap'
import FieldGroup from './FieldGroup';

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"

const DatePicker = (props) => (
  <FieldGroup
    {...props}
    render={(fieldProps) => (
      <ReactDatePicker
        isClearable
        {...fieldProps}
        selected={(fieldProps.value && new Date(fieldProps.value)) || null}
        onChange={(date) => {
          fieldProps.formik.form.setFieldValue(fieldProps.name, date)
        }}
        customInput={<Input {...fieldProps} />}
      />
    )}
  />
)

export default DatePicker