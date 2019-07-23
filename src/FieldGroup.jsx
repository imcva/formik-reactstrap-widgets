import React from 'react'
import {
  Label,
  FormGroup,
  FormFeedback
} from 'reactstrap'
import { Field } from 'formik';

const Group = (props) => {
  const { formik, label, render } = props
  const { field, form } = formik
  const { name } = field
  const { touched, errors } = form
  const invalid = touched[name] && errors[name] ? true : false
  const baseProps = {
    ...props,
    ...field,
    invalid,
    id: name,
    'data-testid': 'field-input'
  }
  const inputProps = Object.assign({}, baseProps)  
  delete inputProps.validate
  delete inputProps.render
  return (
    <FormGroup row={props.row}>
      <Label for={name}>{label}</Label>
      { typeof render === 'function'
        ? render(inputProps) 
        : null
      }
      {invalid
        ? <FormFeedback className='d-block' data-testid='invalid-text'>{errors[name]}</FormFeedback>
        : null
      }
    </FormGroup>
  )
}

const FieldGroup = (props) => {
  const fieldProps = Object.assign({}, props)
  delete fieldProps.children
  delete fieldProps.render
  delete fieldProps.component
  return (
    <Field
      {...fieldProps}
      render={(formik) => ( 
        <Group formik={formik} {...props}  />
      )}
    />
  )
}

export default FieldGroup