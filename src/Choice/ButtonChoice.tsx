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
}

const ButtonChoice: React.FC<ButtonChoiceProps> = (props) => {
  const { name, value } = props
  const id = `${name}-${value}`
  return (
    <Field
      name={name}
      validate={props.validate}
      render={(formik: FieldProps) => ( 
        <Button
          active={getActive(name, value, formik)}
          area-label={props['area-label']}
          block={!props.group && props.block}
          className={className(
            'my-2',
            'text-center',
            props.className
          )}
          color={props.color}
          data-testid={id}
          disabled={props.disabled}
          name={name}
          innerRef={props.innerRef}
          onBlur={formik.field.onBlur}
          onClick={(event) => {
            setValue(name, value, props.multiple, formik)
          }}
          outline={props.outline}
          size={props.size}
          tag={props.tag}
        >
          {props.children}
        </Button>
      )}
    />
  )
}

export default ButtonChoice
export { ButtonChoiceProps }
