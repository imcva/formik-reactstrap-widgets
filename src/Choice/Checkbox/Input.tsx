import React from 'react'
import { FormGroup, Label, Input as StrapInput } from 'reactstrap'
import { useField } from 'formik'

import { CheckboxOption } from '../types'
import DisplayError from '../DisplayError'

interface InputProps extends CheckboxOption {}

const Input: React.FC<InputProps> = (props) => {
  const { name, validate, ...rest } = props
  const [ field, meta, helpers ] = useField({
    name: props.name,
    validate: props.validate
  })
  const isChecked = !!meta.value
  const disabled = props.disabled || props.plaintext
  return (
    <FormGroup check>
      <Label for={field.name}>
        <StrapInput
          {...rest}
          {...field}
          plaintext={undefined}
          disabled={disabled}
          checked={isChecked}
          type='checkbox'
          id={field.name}
          data-testid={field.name}
          onChange={(e) => {
            const newValue = !meta.value
            if (typeof props.onChange === 'function') {
              props.onChange(newValue, [field, meta, helpers])
            } else {
              helpers.setValue(newValue)
            }
          }}
          value={undefined}
        />
        {props.text}
      </Label>
      <DisplayError error={meta.error} touched={meta.touched} />
    </FormGroup>
  )
}

export default Input
