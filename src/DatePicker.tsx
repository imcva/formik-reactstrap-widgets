import React from 'react'
import ReactDatePicker, { ReactDatePickerProps  } from 'react-datepicker'
import { Input, InputGroup, InputGroupAddon, Button, InputProps } from 'reactstrap'
import { FieldProps } from 'formik'
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

const DatePickerInput: React.FC<InputProps> = (props, ref) => {
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

const DatePickerInputWithRef: React.FC<InputProps> = React.forwardRef(DatePickerInput)

interface DatePickerProps extends Partial<Omit<ReactDatePickerProps, 'onChange'>>, Omit<FieldGroupProps, 'render'>, Omit<InputProps, 'onChange'> {
  onChange?: (date: Date | null, formikOnChange: (date: Date) => void, formik: FieldProps) => void
  inputProps?: object
}

const formikUpdateDate = (name: string | undefined, formik: FieldProps) => {
  return (date: Date | null) => {
    if (name) {
      formik.form.setFieldValue(name, date)
    }
  }
}

const DatePicker: React.FC<DatePickerProps> = (props) => (
  <FieldGroup
    name={props.name}
    label={props.label}
    validate={props.validate}
    formText={props.formText}
    FormGroup={props.FormGroup}
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
            const updateDate = formikUpdateDate(props.name, fieldProps.formik)
            if (typeof props.onChange === 'function') {
              props.onChange(date, updateDate, fieldProps.formik)
            } else {
              updateDate(date)
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
