import React from 'react'
import ReactDatePicker, { ReactDatePickerProps  } from 'react-datepicker'
import { Input, InputGroup, InputGroupAddon, Button, InputProps } from 'reactstrap'
import { useField, useFormikContext, FieldInputProps, FormikProps } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'

import FieldGroup from './FieldGroupExperimental';
import { useGlobalProps } from './useGlobalProps'

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"

interface FormikBag<Value = any> {
  field: FieldInputProps<Value>
  form: FormikProps<Value>
}

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

const DatePickerInput: React.RefForwardingComponent<any, InputProps> = (props, ref) => {
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

interface DatePickerProps extends Partial<Omit<ReactDatePickerProps, 'onChange'>>, Omit<InputProps, 'onChange'> {
  name: string
  onChange?: (date: Date | null, formikOnChange: (date: Date) => void, formik: FormikBag) => void
}

const formikUpdateDate = (name: string | undefined, formik: FormikBag) => {
  return (date: Date | null) => {
    if (name) {
      formik.form.setFieldValue(name, date)
    }
  }
}

const DatePicker: React.FC<DatePickerProps> = (props) => { 
  const [ field, meta ] = useField<any>({
    name: props.name,
    validate: props.validate
  })
  const formik = useFormikContext()
  const formikBag = {
    field,
    form: formik,
    meta
  }
  const { globalProps } = useGlobalProps()
  const {
    label,
    onChange,
    validate,
    onSelect,
    inputProps,
    ...rest
  } = props
  const plaintext = props.plaintext !== undefined ? props.plaintext : globalProps.plaintext 
  const invalid = meta.error !== undefined && meta.touched 
  return (
    <FieldGroup field={field} meta={meta} label={label} invalid={invalid}>
      <ReactDatePicker
        todayButton='Today'
        {...field}
        {...rest}
        disabled={props.disabled}
        readOnly={plaintext}
        value={undefined}
        selected={formatValue(field.value)}
        onSelect={onSelect}
        onChange={(date) => {
          const updateDate = formikUpdateDate(props.name, formikBag)
          if (typeof props.onChange === 'function') {
            props.onChange(date, updateDate, formikBag)
          } else {
            updateDate(date)
          }
        }}
        customInput={
          <DatePickerInputWithRef 
            {...rest} 
            data-testid={props['data-testid'] || 'field-input'}
            disabled={props.disabled}
            readOnly={plaintext}
            plaintext={plaintext}
            invalid={invalid}
            {...inputProps}
          />
        }
      />
    </FieldGroup>
  )
 }
  
export default DatePicker
export { DatePickerProps }
