import React from 'react'
// @ts-ignore
import get from 'lodash/get'
import { Button, ButtonProps } from 'reactstrap'
import { Field, FieldProps }  from 'formik'
// @ts-ignore
import className from 'classname'

import { getActive, setValue } from './helpers'

interface ButtonChoiceProps extends FieldProps, ButtonProps {
  children: string
  name?: string
  value: any
  form: any
  inputProps?: Object
}

const ButtonChoice: React.FC<ButtonChoiceProps> = (props) => {
  const { name } = props
  const value = props.multiple ? true : props.value
  const id = `${name}-${value}`
  return (
    <Field
      name={name}
      validate={props.validate}
      render={(formik: FieldProps) => { 
        const active = getActive(name, value, formik)
        return (
          <Button
            active={active}
            area-label={props['area-label']}
            block={!props.group && props.block}
            className={className(
              'my-2',
              'text-center',
              props.className
            )}
            color={props.color}
            data-testid={id}
            disabled={props.disabled || props.plaintext}
            name={name}
            innerRef={props.innerRef}
            onBlur={formik.field.onBlur}
            onClick={(event) => {
              setValue(name, value, props.multiple, formik)
            }}
            outline={props.plaintext ? !active : props.outline}
            size={props.size}
            tag={props.tag}
            {...props.inputProps}
          >
            {props.children}
          </Button>
        )
  }}
    />
  )
}

export default ButtonChoice
export { ButtonChoiceProps }
