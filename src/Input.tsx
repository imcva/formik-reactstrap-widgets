import React from 'react'
import { Input as StrapInput, InputProps as StrapInputProps } from 'reactstrap'
import FieldGroup, { FieldGroupProps, FieldGroupRenderProps } from './FieldGroup';

type InputProps = StrapInputProps & FieldGroupProps

const Input: React.FC<InputProps> = (props) => { 
  return (
    <FieldGroup
      name={props.name}
      children={props.children}
      component={props.component}
      validate={props.validate}
      render={(fieldProps: FieldGroupRenderProps) => (
        <StrapInput
          {...fieldProps.field}
          data-testid={fieldProps['data-testid']}
          disabled={props.disabled}
          type={props.type}
          size={props.size}
          bsSize={props.bsSize}
          valid={props.valid}
          invalid={!!props.invalid ? props.invalid : fieldProps.invalid}
          tag={props.tag}
          innerRef={props.innerRef} 
          plaintext={props.plaintext}
          addon={props.addon}
          className={props.className}
          cssModule={props.cssModule}
        />
      )}
    />
  )
}

export default Input
export { InputProps }
