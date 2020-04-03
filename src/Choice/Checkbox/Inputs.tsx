import React from 'react'
import { InputProps } from 'reactstrap'
import { FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik'

import { CheckboxOption } from '../types'
import Input from './Input'

interface InputsProps extends Omit<InputProps, 'onChange'> {
  options: CheckboxOption[]
  onChange?: (value:any, field: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>]) => void
}

const Inputs: React.FC<InputsProps> = (props) => {
  const { options, ...rest } = props
  return (
    <>
      {options.map((option, index) => ( 
        <Input
          key={index}
          {...rest}
          {...option}
        />
      ))}
    </>
  )
}

export default Inputs
