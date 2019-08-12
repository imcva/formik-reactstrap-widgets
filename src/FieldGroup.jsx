import React from 'react'
import {
  Label,
  FormGroup,
  FormFeedback
} from 'reactstrap'
import get from 'lodash/get'
import { Field } from 'formik';

const Group = (props) => {
  const { formik, label, render, validate } = props
  const { field, form } = formik
  const { name } = field
  const { touched, errors } = form
  const fieldTouched = get(touched, name)
  const fieldErrors = get(errors, name)
  const invalid = fieldErrors && fieldTouched ? true : false
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
    <>
      {props.DisplayLabel === undefined || props.DisplayLabel === true
        ? <Label for={name}>{label}</Label>
        : null
      }
      { typeof render === 'function'
        ? render(inputProps) 
        : null
      }
      {invalid && validate
        ? <FormFeedback className='d-block' data-testid='invalid-text'>{errors[name]}</FormFeedback>
        : null
      }
    </>
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
      render={(formik) => {
        if (props.FormGroup === undefined || props.FormGroup === true) {
          return (
            <FormGroup row={props.row} check={props.check}>
              <Group formik={formik} {...props}  />
            </FormGroup>
          )
        } else {
          return <Group formik={formik} {...props}  />
        }
      }}
    />
  )
}

export default FieldGroup