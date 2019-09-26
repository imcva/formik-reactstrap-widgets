import React, { useEffect, useState } from 'react'
import { Input, InputProps } from 'reactstrap'
import FieldGroup, { FieldGroupProps, FieldGroupRenderProps } from './FieldGroup';

interface IOption {
  value: string,
  text: string
  [key: string]: any
}
type OptionsArray = Array<IOption>

interface OptionsProps {
  options: OptionsArray,
  insertOption?: string
}

const Options: React.FC<OptionsProps> = (props) => {
  const { options, children, insertOption } = props
  if (children) {
    return (
      <>
        {children}
        {insertOption
          ? <option value={insertOption} disabled>{insertOption}</option>
          : null
        }
      </>
    ) 
  } else if (Array.isArray(options) && options.length) {
    const opts = props.options.map((opt, index) => {
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
  } else {
    return null
  }
}

const getFirstOptionValue = (options: Array<{value: string}>, children: React.Component | JSX.Element | React.ReactNode) => {
  if (children) {
    const child = React.Children.toArray(children)[0]
    if (child && React.isValidElement(child)) {
      return child.props.value
    }
    return ''
  } else if (Array.isArray(options) && options.length) {
    const option = options[0]
    return option.value
  } else {
    return ''
  }
}

const checkOptionAvailable = (value: string, options: OptionsArray, children: React.ReactNode) => {
  if (children) {
    const child = React.Children.toArray(children).find(c => {
      if(c && React.isValidElement(c)) {
        return c.props.value == value
      } 
      return false
    })
    return !!child
  } else if (options) {
    const option = options.find(o => o.value === value)
    return !!option
  } else {
    return false
  }
}

type SelectProps = Omit<FieldGroupProps, 'render'> & InputProps

const Select: React.FC<SelectProps> = (props) => {
  return (
    <FieldGroup 
      name={props.name}
      validate={props.validate}
      render={(fieldProps: FieldGroupRenderProps) => { 
        const [ insertOption , setInsertOption ] = useState()
        const { formik } = fieldProps
        useEffect(() => {
          if (formik.field.value === undefined) {
            const firstOptionValue = getFirstOptionValue(props.options, props.children)
            fieldProps.formik.form.setFieldValue(formik.field.name, firstOptionValue)
          } else {
            const optionExists = checkOptionAvailable(formik.field.value, props.options, props.children)
            if (!optionExists) {
              setInsertOption(props.value) 
            }
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
          >
            <Options
              options={props.options}
              children={props.children}
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
