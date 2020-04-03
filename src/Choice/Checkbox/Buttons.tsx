import React from 'react'
import { FormGroup, ButtonGroup, InputProps } from 'reactstrap'
import { FieldInputProps, FieldMetaProps, FieldHelperProps, useFormikContext } from 'formik'
// @ts-ignore
import get from 'lodash/get'

import { CheckboxOption } from '../types'
import Button from './Button'
import DisplayError from '../DisplayError'

interface ButtonsProps extends Omit<InputProps, 'onChange'> {
  options: CheckboxOption[]
  onChange?: (value:any, field: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>]) => void
}

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { options, ...rest } = props
  const formik = useFormikContext()
  const errors = options.map((option) => {
    return { 
      error: get(formik.errors, option.name),
      touched: get(formik.touched, option.name),
      name: option.name
    }
  }) 
  return (
    <>
      { props.group
        ? (
          <FormGroup>
            <ButtonGroup className={props.block ? 'btn-block' : ''}>
              {options.map((option, index) => ( 
                <Button
                  key={index}
                  {...rest}
                  {...option}
                />
              ))}
            </ButtonGroup>
          </FormGroup>
        ) : (
          <>
            {options.map((option, index) => ( 
              <Button
                key={index}
                {...rest}
                {...option}
              />
            ))}
          </>
        )
      }
      { errors.map((field, index) => {
        return <DisplayError key={index} {...field} />
      })}
    </>
  )
}

export default Buttons
