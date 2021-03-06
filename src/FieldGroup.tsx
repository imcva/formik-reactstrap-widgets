import React from 'react'
import {
  Label,
  FormGroup,
  FormFeedback
} from 'reactstrap'
// @ts-ignore
import get from 'lodash/get'
import { Field, FieldProps } from 'formik';
import { useGlobalProps } from './useGlobalProps';

interface GroupProps {
  formik: FieldProps
  render?: (props: FieldGroupRenderProps) => React.ReactNode
  validate?: any
  DisplayLabel?: boolean
  label?: React.Component | String
  plaintext?: boolean
}

interface FieldGroupRenderProps {
  formik: FieldProps
  field: Object
  id: string
  invalid: boolean
  'data-testid': string
  plaintext?: boolean
}

const Group: React.FC<GroupProps> = (props) => {
  const { formik, label, render, validate } = props
  const { field, form } = formik
  const { name } = field
  const { touched, errors } = form
  const fieldTouched = get(touched, name)
  const fieldErrors = get(errors, name)
  const invalid = fieldErrors && fieldTouched ? true : false
  const inputProps: FieldGroupRenderProps = {
    formik: props.formik,
    field: field,
    plaintext: props.plaintext,
    invalid,
    id: name,
    'data-testid': 'field-input'
  }
  return (
    <>
      {props.DisplayLabel === undefined || props.DisplayLabel === true
        ? <Label data-testid='input-label' for={name}>{label}</Label>
        : null
      }
      { render && typeof render === 'function'
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

interface FieldGroupProps extends Omit<GroupProps, 'formik'> {
  row?: boolean
  FormGroup?: boolean
  check?: boolean 
  name?: string
}

const FieldGroup: React.FC<FieldGroupProps> = (props) => {
  const { globalProps } = useGlobalProps()
  return (
    <Field
      name={props.name}
      validate={props.validate}
      render={(formik: FieldProps) => {
        console.log(formik)
        if (props.FormGroup === undefined || props.FormGroup === true) {
          return (
            <FormGroup row={props.row} check={props.check}>
              <Group 
                formik={formik}
                label={props.label}
                render={props.render}
                DisplayLabel={props.DisplayLabel}
                validate={props.validate}
                plaintext={globalProps.plaintext}
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
              plaintext={globalProps.plaintext}
            />
          )
        }
      }}
    />
  )
}

export default FieldGroup
export { FieldGroupProps, FieldGroupRenderProps }
