import React, { useRef, useEffect, useState } from 'react'
import { Input, InputProps } from 'reactstrap'
import FieldGroup, { FieldGroupProps, FieldGroupRenderProps } from './FieldGroup'
//@ts-ignore
import isEqual from 'lodash/isEqual'

import { convertOptionsFromChildren } from './Choice/helpers'

interface IOption {
  value: string,
  text: string
  [key: string]: any
}
type OptionsArray = Array<IOption> | undefined

interface OptionsProps {
  options: OptionsArray,
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

const checkOptionAvailable = (value: string, options: OptionsArray) => {
  if (options) {
    const option = options.find(o => o.value === value)
    return !!option
  } else {
    return false
  }
}

interface SelectProps extends Omit<FieldGroupProps, 'render'>, InputProps {
  filtered?: IOption[]
  inputProps: Object
}


// const filter = (opts: IOption[], key: string | undefined, value: any) => {
//   let results = opts
//   if (key) {
//     results = opts.filter(opt => opt[key] === value) 
//   }
//   console.log({ opts, key, value, results }, 'Filter params')
//   return results
// }

const Select: React.FC<SelectProps> = (props) => {
  const { options, } = props
  const baseOptions = convertOptionsFromChildren<IOption>(options, props.children)
  const filteredOptions = props.filtered || baseOptions

  return (
    <FieldGroup 
      name={props.name}
      label={props.label}
      validate={props.validate}
      render={(fieldProps: FieldGroupRenderProps) => { 
        const [ insertOption , setInsertOption ] = useState()
        const { formik } = fieldProps
        const { field } = formik

        const filteredOptionsRef = useRef<IOption[] | undefined>(undefined)
        useEffect(() => {
          if(!isEqual(filteredOptions, filteredOptionsRef.current)) {
            filteredOptionsRef.current = filteredOptions
            const filteredCheck = checkOptionAvailable(field.value, filteredOptions)
            const baseCheck = field.value === undefined || checkOptionAvailable(field.value, baseOptions)
            if (Array.isArray(filteredOptions) && filteredOptions.length && !filteredCheck && baseCheck) {
              const first = filteredOptions[0].value
              formik.form.setFieldValue(formik.field.name, first)
            }
          }
        })

        useEffect(() => {
          const baseCheck = checkOptionAvailable(field.value, baseOptions)
          if (field.value !== undefined && !baseCheck) {
            setInsertOption(field.value)
          }
        }, [])

        return (
          <Input
            {...formik.field}
            data-testid={fieldProps['data-testid']}
            disabled={props.disabled}
            type='select'
            size={props.size}
            bsSize={props.bsSize}
            valid={props.valid}
            invalid={props.invalid || fieldProps.invalid}
            tag={props.tag}
            innerRef={props.innerRef} 
            plaintext={props.plaintext}
            addon={props.addon}
            className={props.className}
            cssModule={props.cssModule}
            {...props.inputProps}
          >
            <Options
              options={filteredOptions}
              insertOption={insertOption}
            />
          </Input>
        )
      }}
    />
  )
}

export default Select
export { SelectProps }
