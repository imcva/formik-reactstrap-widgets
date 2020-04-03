import React from 'react'
import { Input as StrapInput, InputProps as StrapInputProps } from 'reactstrap'
import FieldGroup from './FieldGroupExperimental';
import { 
  FieldConfig,
  FormikHandlers,
  FormikProps,
  useField,
  useFormikContext,
  FieldInputProps,
} from 'formik'
import { useGlobalProps } from './useGlobalProps';

interface FormikBag<Value = any> {
  field: FieldInputProps<Value>
  form: FormikProps<Value>
}

interface InputProps<Value = any> extends Omit<StrapInputProps, 'onChange'>, Omit<FieldConfig, keyof StrapInputProps> {
  name: string
  label?: React.Component | string
  onChange?: (value: any, formikOnChange: FormikHandlers['handleChange'], formik: FormikBag) => void
}


const Input: React.FC<InputProps> = (props) => { 
  const [ field, meta ] = useField<any>({
    name: props.name,
    validate: props.validate
  })
  const formik = useFormikContext()
  const formikBag = {
    field,
    form: formik,
    meta
  }
  const { globalProps } = useGlobalProps()
  const {
    label,
    onChange,
    validate,
    inputProps,
    ...rest
  } = props
  const plaintext = props.plaintext !== undefined ? props.plaintext : globalProps.plaintext 
  const invalid = meta.error !== undefined && meta.touched 
  return (
    <FieldGroup field={field} meta={meta} label={label} invalid={invalid}>
      <StrapInput
        {...field}
        {...rest}
        readOnly={plaintext}
        plaintext={plaintext}
        invalid={props.invalid || invalid}
        data-testid={props['data-testid'] || 'field-input'}
        onChange={(e) => {
          const newValue = e.target.value
          const formikOnChange = () => {
            field.onChange(e)
          }
          if (typeof onChange === 'function') {
            onChange(newValue, formikOnChange, formikBag)
          } else {
            formikOnChange()
          }
        }}
        {...inputProps}
      />
    </FieldGroup>
  )
}

export default Input
export { InputProps }
