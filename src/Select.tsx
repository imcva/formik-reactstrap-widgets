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

const getFirstOptionValue = (options: Array<{value: string}>, children: React.Component | JSX.Element) => {
  if (children) {
    const child = React.Children.toArray(children)[0]
    return child.props.value
  } else if (Array.isArray(options) && options.length) {
    const option = options[0]
    return option.value
  } else {
    return ''
  }
}

const checkOptionAvailable = (value: string, options: OptionsArray, children: React.Component | JSX.Element) => {
  if (children) {
    const child = React.Children.toArray(children).find(c => {
      if(c.props) {
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

type SelectProps = FieldGroupProps & InputProps

const Select: React.FC<SelectProps> = (props) => {
  return (
    <FieldGroup 
      name={props.name}
      component={props.component}
      validate={props.validate}
      render={(fieldProps: FieldGroupRenderProps) => { 
        const [ insertOption , setInsertOption ] = useState()
        useEffect(() => {
          if (fieldProps.value === undefined) {
            const firstOptionValue = getFirstOptionValue(fieldProps.options, fieldProps.children)
            fieldProps.formik.form.setFieldValue(fieldProps.name, firstOptionValue)
          } else {
            const optionExists = checkOptionAvailable(fieldProps.value, fieldProps.options, fieldProps.children)
            if (!optionExists) {
              setInsertOption(fieldProps.value) 
            }
          }
        }, [])

        return (
          <Input
            {...fieldProps.field}
            data-testid={fieldProps['data-testid']}
            disabled={props.disabled}
            type='select'
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
