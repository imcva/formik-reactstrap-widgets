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
  insertOption?: IOption
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
          ? <option value={insertOption.value} disabled>{insertOption.text}</option>
          : null
        }
      </>
    ) 
  } else if (insertOption) {
    return (<option value={insertOption.value} disabled>{insertOption.text}</option>)
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
  InsertBlank?: boolean | IOption
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
    filtered,
    label,
    onChange,
    inputProps,
    validate, 
    InsertBlank,
    ...rest 
  } = props
  const opts = filtered || options
  const baseOptions = convertOptionsFromChildren<IOption>(opts, props.children)
  const [ filteredOptions, setFilteredOptions] = useState(baseOptions.filter(opt => opt.archived !== true))
  const [ insertOption , setInsertOption ] = useState<IOption | undefined>()
  const [ blankInserted, setBlankInserted ] = useState(false)

  /**
   * Warn that the filtered prop is depreciated.
   */
  useEffect(() => {
    if (filtered) {
      console.warn('Filtered prop is deprecated on Select. Please only use the options prop.')
    }
  }, [filtered])

  const filteredOptionsRef = useRef<IOption[] | undefined>(undefined)
  useEffect(() => {
    if(!isEqual(filteredOptions, filteredOptionsRef.current)) {
      filteredOptionsRef.current = filteredOptions
      let options = filteredOptions
      if(InsertBlank === true && blankInserted === false) {
        const newOptions = [...filteredOptions]
        newOptions.unshift({ text: '', value: ''})
        setFilteredOptions(newOptions)
        setBlankInserted(true)
        options = newOptions
      } else if (InsertBlank && InsertBlank !== true && blankInserted === false) {
        const newOptions = [...filteredOptions]
        newOptions.unshift(InsertBlank)
        setFilteredOptions(newOptions)
        setBlankInserted(true)
        options = newOptions
      }

      // Set first Option
      const filteredCheck = checkOptionAvailable(field.value, options)
      const baseCheck = field.value === undefined || checkOptionAvailable(field.value, options)
      if (Array.isArray(options) && options.length && !filteredCheck && baseCheck) {
        const first = options[0].value
        form.setFieldValue(props.name, first)
      }
    }
  })

  const baseOptionsRef = useRef(baseOptions)
  useEffect(() => {
    if(!isEqual(baseOptions, baseOptionsRef.current)) {
      setFilteredOptions(baseOptions)
    }
  }, [baseOptions])


  useEffect(() => {
    const baseCheck = checkOptionAvailable(field.value, filteredOptions)
    const archivedOpt = baseOptions.find(opt => opt.value === field.value)
    if (field.value !== undefined && !baseCheck && archivedOpt) {
      setInsertOption(archivedOpt)
    } else if (field.value !== undefined && !baseCheck) {
      setInsertOption({ value: field.value, text: field.value })
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
