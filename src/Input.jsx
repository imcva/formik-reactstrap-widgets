import React from 'react'
import { Input as StrapInput } from 'reactstrap'
import FieldGroup from './FieldGroup';

const Input = (props) => { 
  return (
    <FieldGroup
      {...props}
      render={(fieldProps) => (
        <StrapInput {...fieldProps} />
      )}
    />
  )
}

export default Input