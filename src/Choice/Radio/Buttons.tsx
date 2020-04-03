import React from 'react'
import { FormGroup, ButtonGroup, InputProps } from 'reactstrap'
import { FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik'
// @ts-ignore
import get from 'lodash/get'

import { RadioOption } from '../types'
import Button from './Button'
import DisplayError from '../DisplayError'

interface ButtonsProps extends Omit<InputProps, 'onChange'> {
  options: RadioOption[]
  field: FieldInputProps<any>
  meta: FieldMetaProps<any>
  helpers: FieldHelperProps<any>
  onChange?: (value:any, field: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>]) => void
}

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { field, meta, helpers, options, ...rest } = props
  return (
    <>
      { props.group
        ? (
          <FormGroup>
            <ButtonGroup className={props.block ? 'btn-block' : ''}>
              {options.map((option, index) => ( 
                <Button
                  key={index}
                  field={field}
                  meta={meta}
                  helpers={helpers}
                  option={option}
                  {...rest}
                />
              ))}
            </ButtonGroup>
          </FormGroup>
        ) : (
          <>
            {options.map((option, index) => ( 
              <Button
                  key={index}
                  field={field}
                  meta={meta}
                  helpers={helpers}
                  option={option}
                  {...rest}
              />
            ))}
          </>
        )
      }
      <DisplayError error={meta.error} touched={meta.touched} />
    </>
  )
}

export default Buttons
