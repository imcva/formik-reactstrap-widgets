import React from 'react'
import { FormGroup, Label, Input as StrapInput, InputProps as StrapInputProps } from 'reactstrap'
import { FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik'

import { RadioOption } from '../types'

interface InputProps extends Omit<StrapInputProps, 'onChange'> {
  field: FieldInputProps<any>
  meta: FieldMetaProps<any>
  helpers: FieldHelperProps<any>
  option: RadioOption
  onChange?: (value:any, field: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>]) => void
}

const Input: React.FC<InputProps> = (props) => {
  const { field, meta, helpers, option, onChange, ...rest } = props
  const id = `${field.name}-${option.value}`
  const isChecked = meta.value === option.value
  const disabled = option.disabled || option.plaintext || props.disabled || props.plaintext
  return (
    <FormGroup check>
      <Label for={id}>
        <StrapInput
          {...rest}
          {...field}
          {...option}
          plaintext={undefined}
          checked={isChecked}
          disabled={disabled}
          type='radio'
          id={id}
          data-testid={id}
          onChange={(e) => {
            const newValue = option.value
            if (typeof onChange === 'function') {
              onChange(newValue, [field, meta, helpers])
            } else {
              helpers.setValue(newValue)
            }
          }}
        />
        {option.text}
      </Label>
    </FormGroup>
  )
}

export default Input
