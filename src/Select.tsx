import React, { useRef, useEffect, useMemo } from 'react'
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
  insertOption?: IOption
}

const Options: React.FC<OptionsProps> = (props) => {
  const { options } = props
  if (Array.isArray(options) && options.length) {
    const opts = options.map((opt, index) => {
      return (<option {...opt} key={index}>{opt.text}</option>)
    })
    return (
      <>
        {opts}
      </>
    ) 
  } else {
    return null
  }
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
  InsertBlank?: boolean | IOption
}

const Select: React.FC<SelectProps> = (props) => {
  const [ field, meta ]  = useField<any>({
    validate: props.validate,
    name: props.name
  })
  const form = useFormikContext<any>()
  const { globalProps } = useGlobalProps()
  const formikBag = {
    field,
    form,
    meta
  }

  const { 
    options,
    filtered,
    label,
    onChange,
    inputProps,
    validate, 
    InsertBlank,
    children,
    ...rest 
  } = props
  const { value } = field
  const base = filtered || options

  const originalValue = useRef(value);
  const opts = useMemo(() => {
    const converted = convertOptionsFromChildren<IOption>(base, children)
    const lessArchived = converted.filter((o) => o.archived !== true);
    const baseValue = converted.find((o) => o.value === originalValue.current);
    const nonArchivedValue = lessArchived.find(
      (o) => o.value === originalValue.current
    );
    if (originalValue.current !== undefined && originalValue.current !== "") {
      if (baseValue && !nonArchivedValue) {
        lessArchived.push({ ...baseValue, disabled: true });
      } else if (!baseValue && !nonArchivedValue) {
        lessArchived.push({
          disabled: true,
          text: originalValue.current,
          value: originalValue.current
        });
      }
    }
    if (InsertBlank === true) {
      lessArchived.unshift({ text: "", value: "" });
    } else if (typeof InsertBlank === 'object') {
      lessArchived.unshift(InsertBlank);
    }
    return lessArchived;
  }, [base, children, InsertBlank, originalValue]) 

  useEffect(() => {
    if(opts.find(o => o.value === value) === undefined) {
      console.log('Value not in opts', { new: opts[0].value, opts })
      form.setFieldValue(field.name, opts[0].value)
    }
  }, [opts, value, form])

  /**
   * Warn that the filtered prop is depreciated.
   */
  useEffect(() => {
    if (filtered) {
      console.warn('Filtered prop is deprecated on Select. Please only use the options prop.')
    }
  }, [filtered])

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
        value={plaintext ? getSelectedText(field.value, opts) : field.value}
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
        plaintext={plaintext}
        {...inputProps}
      >
        {!plaintext
          ? (
            <Options
              options={opts}
            />
          ) : null
        }
      </Input>
    </FieldGroup>
  )
}

export default Select
export { SelectProps }
