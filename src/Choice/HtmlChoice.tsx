import React from 'react'
// @ts-ignore
import get from 'lodash/get'
import { Input as StrapInput, Label, FormGroup, InputProps } from 'reactstrap'
import { Field, FieldProps }  from 'formik'
// @ts-ignore
import className from 'classname'

import { getActive, setValue } from './helpers'

interface HtmlChoiceProps extends FieldProps, InputProps {
  children: string
  name: string
  multiple: boolean
  value: any
  form: any
}

const HtmlChoice: React.FC<HtmlChoiceProps> = (props) => {
  const { name, value } = props
  const id = `${name}-${value}`
  return (
    <Field
      name={name}
      validate={props.validate}
      render={(formik: FieldProps) => ( 
        <FormGroup check>
          <Label for={id} check>
            <StrapInput 
              {...formik.field}
              addon={props.addon}
              bsSize={props.bsSize}
              checked={getActive(name, value, formik)}
              className={props.className}
              data-testid={id}
              disabled={props.disabled}
              id={id}
              innerRef={props.innerRef}
              invalid={props.invalid}
              name={name}
              onBlur={formik.field.onBlur}
              onChange={(event) => {
                setValue(name, value, props.multiple, formik)
              }}
              plaintext={props.plaintext}
              size={props.size}
              tag={props.tag}
              type={props.multiple ? 'checkbox' : 'radio' }
              valid={props.valid}
              value={value}
            />
            {props.children}
          </Label>
        </FormGroup>
      )} 
    />
  )
}

export default HtmlChoice
export { HtmlChoiceProps }