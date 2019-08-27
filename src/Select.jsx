import React, { useEffect, useState } from 'react'
import { Input } from 'reactstrap'
import FieldGroup from './FieldGroup';

const Options = (props) => {
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

const getFirstOptionValue = (options, children) => {
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

const checkOptionAvailable = (value, options, children) => {
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

const Select = (props) => {
  return (
    <FieldGroup 
      {...props}
      render={(fieldProps) => { 
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
            {...fieldProps}
            type='select'
          >
            <Options
              options={fieldProps.options}
              children={fieldProps.children}
              insertOption={insertOption}
            />
          </Input>
        )
      }}
    />
  )
}

export default Select