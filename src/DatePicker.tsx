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

interface DatePickerInput extends InputProps {
  inputProps?: Object
}

const DatePickerInput: React.FC<DatePickerInput> = (props, ref) => {
  return ( 
    <InputGroup>
      <Input {...props} innerRef={ref} />
      {!props.plaintext
        ? (
          <InputGroupAddon addonType="append">
            <Button className='border' color='light' onClick={props.onClick}>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Button>
          </InputGroupAddon>
        ) : null
      }
    </InputGroup>
  )
}

const DatePickerInputWithRef = React.forwardRef(DatePickerInput)

type DatePickerProps = Partial<ReactDatePickerProps> & Omit<FieldGroupProps, 'render'> & DatePickerInput

const DatePicker: React.FC<DatePickerProps> = (props) => (
  <FieldGroup
    name={props.name}
    label={props.label}
    validate={props.validate}
    render={(fieldProps: FieldGroupRenderProps) => {
      return (
        <ReactDatePicker
          todayButton='Today'
          {...fieldProps.formik.field}
          disabled={props.disabled}
          readOnly={props.plaintext}
          value={undefined}
          selected={formatValue(fieldProps.formik.field.value)}
          onChange={(date) => {
            if (props.name) {
              fieldProps.formik.form.setFieldValue(props.name, date)
            }
          }}
          {...props.datePickerProps}
          customInput={
            <DatePickerInputWithRef
              data-testid={fieldProps['data-testid']}
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
              {...props.inputProps}
            />
         }
        />
      )
    }}
  />
)

export default DatePicker
export { DatePickerProps }
