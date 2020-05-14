import React from 'react'
import { Button as StrapButton, ButtonProps as StrapButtonProps } from 'reactstrap'
import { FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik'

import { RadioOption } from '../types'

// @ts-ignore
import className from 'classnames'

interface ButtonProps extends Omit<StrapButtonProps, 'onChange'> {
  field: FieldInputProps<any>
  meta: FieldMetaProps<any>
  helpers: FieldHelperProps<any>
  option: RadioOption
  onChange?: (value:any, field: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>]) => void
}

const Button: React.FC<ButtonProps> = (props) => {
  const { field, meta, helpers, option, onChange, ...rest } = props
  const id = `${field.name}-${option.value}`
  const isChecked = meta.value === option.value
  const disabled = props.disabled || props.plaintext
  return (
    <>
      <StrapButton
        {...rest}
        {...option}
        active={isChecked}
        aria-label={props['area-label'] || props.text}
        block={!props.group && props.block}
        className={className(
          'my-2',
          'text-center',
          props.className
        )}
        data-testid={id}
        disabled={disabled}
        name={field.name}
        onBlur={field.onBlur}
        onClick={(e) => {
          const newValue = option.value
          if (typeof onChange === 'function') {
            onChange(newValue, [field, meta, helpers])
          } else {
            helpers.setValue(newValue)
          }
        }}
        outline={props.plaintext ? !isChecked : props.outline}
      >
        {option.text}
      </StrapButton>
    </>
  )
}

export default Button
