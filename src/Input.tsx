import React from 'react'
import { Input as StrapInput, InputProps as StrapInputProps } from 'reactstrap'
import FieldGroup, { FieldGroupProps, FieldGroupRenderProps } from './FieldGroup';
import { FieldProps, FormikHandlers } from 'formik'

interface InputProps extends Omit<StrapInputProps, 'onChange'>, FieldGroupProps {
  onChange?: (value: any, formikOnChange: FormikHandlers['handleChange'], formik: FieldProps) => void
  inputProps?: Object
}

const Input: React.FC<InputProps> = (props) => { 
  return (
    <FieldGroup
      label={props.label}
      name={props.name}
      validate={props.validate}
      render={(fieldProps: FieldGroupRenderProps) => (
        <StrapInput
          {...fieldProps.formik.field}
          data-testid={fieldProps['data-testid']}
          disabled={props.disabled}
          readOnly={props.plaintext}
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
          onChange={(e) => {
            const newValue = e.target.value
            const formikOnChange = (val: any) => {
              if (props.name) {
                fieldProps.formik.form.setFieldValue(props.name, val)
              }
            }
            if (typeof props.onChange === 'function') {
              props.onChange(newValue, formikOnChange, fieldProps.formik)
            } else {
              formikOnChange(newValue)
            }
          }}
          {...props.inputProps}
        />
      )}
    />
  )
}

export default Input
export { InputProps }
