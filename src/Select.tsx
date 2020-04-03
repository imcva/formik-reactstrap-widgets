import React, { useRef, useEffect, useState } from 'react'
import { Input, InputProps } from 'reactstrap'
import FieldGroup from './FieldGroupExperimental'
import {
  useField,
  FormikHandlers,
  useFormikContext,
  FieldConfig,
  FieldInputProps,
  FormikProps
} from 'formik'
//@ts-ignore
import isEqual from 'lodash/isEqual'

import convertOptionsFromChildren from './Choice/convertOptionsFromChildren'
import { useGlobalProps } from './useGlobalProps'

interface IOption {
  value: string,
  text: string
  [key: string]: any
}

interface OptionsProps {
  options: IOption[],
  insertOption?: string
}

const Options: React.FC<OptionsProps> = (props) => {
  const { options, insertOption } = props
  if (Array.isArray(options) && options.length) {
    const opts = options.map((opt, index) => {
      return (<option {...opt} key={index}>{opt.text}</option>)
    })
    return (
      <>
        {opts}
        {insertOption
          ? <option value={insertOption} disabled>{insertOption}</option>
          : null
        }
      </>
    ) 
  } else if (insertOption) {
    return (<option value={insertOption} disabled>{insertOption}</option>)
  } else {
    return null
  }
}

const checkOptionAvailable = (value: string, options: IOption[]) => {
  return options ? !!options.find(o => o.value === value) : false
}

const getSelectedText = (value: any, options: IOption[]) => {
  const opt = options.find(o => o.value === value)
  return opt ? opt.text : value
}

interface FormikBag<Value = any> {
  field: FieldInputProps<Value>
  form: FormikProps<Value>
}

interface SelectProps extends Omit<InputProps, 'onChange'>, Omit<FieldConfig, keyof InputProps> {
  onChange?: (value: any, formikOnChange: FormikHandlers['handleChange'], formik: FormikBag) => void
  filtered?: IOption[]
  fieldConfig?: Object
}

const Select: React.FC<SelectProps> = (props) => {
  const [ field, meta ]  = useField<any>({
    validate: props.validate,
    name: props.name
  })
  const form = useFormikContext<any>()
  const globalProps = useGlobalProps()
  const formikBag = {
    field,
    form,
    meta
  }

  const { 
    options,
    label,
    onChange,
    inputProps,
    validate, 
    ...rest 
  } = props
  const baseOptions = convertOptionsFromChildren<IOption>(options, props.children)
  const filteredOptions = props.filtered || baseOptions
  const [ insertOption , setInsertOption ] = useState()

  const filteredOptionsRef = useRef<IOption[] | undefined>(undefined)
  useEffect(() => {
    if(!isEqual(filteredOptions, filteredOptionsRef.current)) {
      filteredOptionsRef.current = filteredOptions
      const filteredCheck = checkOptionAvailable(field.value, filteredOptions)
      const baseCheck = field.value === undefined || checkOptionAvailable(field.value, baseOptions)
      if (Array.isArray(filteredOptions) && filteredOptions.length && !filteredCheck && baseCheck) {
        const first = filteredOptions[0].value
        form.setFieldValue(props.name, first)
      }
    }
  })

  useEffect(() => {
    const baseCheck = checkOptionAvailable(field.value, baseOptions)
    if (field.value !== undefined && !baseCheck) {
      setInsertOption(field.value)
    }
  }, [])

  const plaintext = props.plaintext !== undefined
    ? props.plaintext
    : globalProps.plaintext
  const invalid = meta.error !== undefined && meta.touched 
  return (
    <FieldGroup field={field} meta={meta} label={label} invalid={invalid}>
      <Input
        {...field}
        {...rest}
        type='select'
        data-testid={props['data-testid'] || 'field-input'}
        invalid={props.invalid || invalid}
        plaintext={plaintext}
        readOnly={plaintext}
        value={plaintext ? getSelectedText(field.value, filteredOptions) : field.value}
        onChange={(e) => {
          const { value } = e.target
          const formikOnChange = (value: any) => {
            if (field.name) {
              form.setFieldValue(field.name, value)
            }
          }
          if (typeof props.onChange === 'function') {
            props.onChange(value, formikOnChange, formikBag)
          } else {
            formikOnChange(value)
          }
        }}
        {...inputProps}
      >
        {!plaintext
          ? (
            <Options
              options={filteredOptions}
              insertOption={insertOption}
            />
          ) : null
        }
      </Input>
    </FieldGroup>
  )
}

export default Select
export { SelectProps }
