import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'
import FieldGroup from './FieldGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'

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

const DatePickerInput = (props) => {
  return ( 
    <InputGroup>
      <Input {...props} />
      <InputGroupAddon addonType="append">
        <Button className='border' color='light' onClick={props.onClick}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}

const DatePicker = (props) => (
  <FieldGroup
    {...props}
    render={(fieldProps) => {
      return (<ReactDatePicker
        todayButton='Today'
        {...fieldProps}
        value={undefined}
        selected={formatValue(fieldProps.value)}
        onChange={(date) => {
          fieldProps.formik.form.setFieldValue(fieldProps.name, date)
        }}
        customInput={<DatePickerInput {...fieldProps} />}
      />
    )}}
  />
)

export default DatePicker