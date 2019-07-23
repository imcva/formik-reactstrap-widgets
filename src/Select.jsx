import React from 'react'
import { Input } from 'reactstrap'
import FieldGroup from './FieldGroup';

const Options = (props) => {
  if (props.children) {
    return props.children
  } else if (props.options) {
    return props.options.map((opt, index) => {
      return (<option {...opt} key={index}>{opt.text}</option>)
    })
  } else {
    return null
  }
}

const Select = (props) => {
  return (
    <FieldGroup 
      {...props}
      render={(fieldProps) => (
        <Input
          {...fieldProps}
          type='select'
        >
          <Options options={fieldProps.options} children={fieldProps.children} />
        </Input>
      )}
    />
  )
}

export default Select