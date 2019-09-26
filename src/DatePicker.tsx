import React from 'react'
import ReactDatePicker, { ReactDatePickerProps  } from 'react-datepicker'
import { Input, InputGroup, InputGroupAddon, Button, InputProps } from 'reactstrap'
import FieldGroup, { FieldGroupRenderProps, FieldGroupProps } from './FieldGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"

const formatValue = (value: string) => {
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

const DatePickerInput: React.FC<InputProps> = (props) => {
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

type DatePickerProps = ReactDatePickerProps & FieldGroupProps & InputProps

const DatePicker: React.FC<DatePickerProps> = (props) => (
  <FieldGroup
    component={props.component}
    name={props.name}
    validate={props.validate}
    render={(fieldProps: FieldGroupRenderProps) => {
      return (
        <ReactDatePicker
          todayButton='Today'
          {...fieldProps.field}
          disabled={props.disabled}
          value={undefined}
          selected={formatValue(fieldProps.value)}
          onChange={(date) => {
            fieldProps.formik.form.setFieldValue(fieldProps.name, date)
          }}
          customInput={
            <DatePickerInput 
              data-testid={fieldProps['data-testid']}
              disabled={props.disabled}
              type={props.type}
              size={props.size}
              bsSize={props.bsSize}
              valid={props.valid}
              invalid={!!props.invalid ? props.invalid : fieldProps.invalid}
              tag={props.tag}
              innerRef={props.innerRef} 
              plaintext={props.plaintext}
              addon={props.addon}
              className={props.className}
              cssModule={props.cssModule}
            />
         }
        />
      )
    }}
  />
)

export default DatePicker
export { DatePickerProps }
