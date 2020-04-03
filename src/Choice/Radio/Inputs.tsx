import React from 'react'
import { InputProps } from 'reactstrap'
import { FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik'

import { RadioOption } from '../types'
import Input from './Input'
import DisplayError from '../DisplayError'

interface InputsProps extends Omit<InputProps, 'onChange'> {
  options: RadioOption[]
  field: FieldInputProps<any>
  meta: FieldMetaProps<any>
  helpers: FieldHelperProps<any>
  onChange?: (value:any, field: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>]) => void
}

const Inputs: React.FC<InputsProps> = (props) => {
  const { options } = props
  return (
    <>
      {options.map((option, index) => ( 
        <Input
          key={index}
          option={option}
          {...props}
        />
      ))}
      <DisplayError error={props.meta.error} touched={props.meta.touched} />
    </>
  )
}

export default Inputs
