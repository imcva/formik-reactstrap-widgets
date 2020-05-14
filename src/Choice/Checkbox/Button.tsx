import React from 'react'
import { Button as StrapButton } from 'reactstrap'
import { useField } from 'formik'

import { CheckboxOption } from '../types'

// @ts-ignore
import className from 'classnames'

interface ButtonProps  extends CheckboxOption {}

const Button: React.FC<ButtonProps> = (props) => {
  const [ field, meta, helpers ] = useField({
    name: props.name,
    validate: props.validate
  })
  const isChecked = !!meta.value
  const disabled = props.disabled || props.plaintext
  return (
    <>
      <StrapButton
        active={isChecked}
        aria-label={props['area-label'] || props.text}
        block={!props.group && props.block}
        className={className(
          'my-2',
          'text-center',
          props.className
        )}
        color={props.color}
        data-testid={field.name}
        disabled={disabled}
        name={field.name}
        innerRef={props.innerRef}
        onBlur={field.onBlur}
        onClick={(e) => {
          const newValue = !meta.value
          if (typeof props.onChange === 'function') {
            props.onChange(newValue, [field, meta, helpers])
          } else {
            helpers.setValue(newValue)
          }
        }}
        outline={props.plaintext ? !isChecked : props.outline}
        size={props.size}
        tag={props.tag}
      >
        {props.text}
      </StrapButton>
    </>
  )
}

export default Button
