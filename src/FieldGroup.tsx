import React from 'react'
import {
  Label,
  FormGroup,
  FormFeedback
} from 'reactstrap'
// @ts-ignore
import get from 'lodash/get'
import { Field, FieldProps } from 'formik';

interface GroupProps {
  formik: FieldProps,
  render: (inputProps: any) => React.Component | JSX.Element
  validate: any
  DisplayLabel?: boolean
  label?: React.Component | String
}

interface FieldGroupRenderProps extends GroupProps {
  field: Object
  id: string
  invalid: boolean
  [key: string]: any
}

const Group: React.FC<GroupProps> = (props) => {
  const { formik, label, render, validate } = props
  const { field, form } = formik
  const { name } = field
  const { touched, errors } = form
  const fieldTouched = get(touched, name)
  const fieldErrors = get(errors, name)
  const invalid = fieldErrors && fieldTouched ? true : false
  const baseProps: FieldGroupRenderProps = {
    ...props,
    ...field,
    field: field,
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

interface FieldGroupProps extends Omit<GroupProps, 'formik'>{
  component: React.Component
  row?: boolean
  FormGroup?: boolean
  check?: boolean 
  name: string
}

const FieldGroup: React.FC<FieldGroupProps> = (props) => {
  const fieldProps = Object.assign({}, props)
  delete fieldProps.children
  delete fieldProps.render
  delete fieldProps.component
  return (
    <Field
      {...fieldProps}
      render={(formik: FieldProps) => {
        if (props.FormGroup === undefined || props.FormGroup === true) {
          return (
            <FormGroup row={props.row} check={props.check}>
              <Group 
                formik={formik}
                label={props.label}
                render={props.render}
                DisplayLabel={props.DisplayLabel}
                validate={props.validate}
              />
            </FormGroup>
          )
        } else {
          return (
            <Group 
              formik={formik}
              label={props.label}
              render={props.render}
              DisplayLabel={props.DisplayLabel}
              validate={props.validate}
            />
          )
        }
      }}
    />
  )
}

export default FieldGroup
export { FieldGroupProps, FieldGroupRenderProps }
