import React from 'react'
import { FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik'
import { InputProps, FormGroup, Label } from 'reactstrap'

import convertOptionsFromChildren from '../convertOptionsFromChildren'

import { CheckboxOption } from '../types'
import Inputs from './Inputs'
import Buttons from './Buttons'

interface CheckboxProps extends Omit<InputProps, 'onChange'> {
  button?: boolean
  label?: string
  options?: CheckboxOption[]
  onChange?: (value:any, field: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>]) => void
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { label, button, options, children, ...rest } = props
  const opts = convertOptionsFromChildren<CheckboxOption>(options, children)
  return (
    <FormGroup>
      {label !== undefined
        ? <Label data-testid='input-label'>{label}</Label>
        : null
      }
      { button
        ? (
          <Buttons 
            {...rest}
            options={opts}
          />
        ): (
          <Inputs 
            {...rest}
            options={opts}
          />
        )
      }
    </FormGroup>
  )
}

export default Checkbox
