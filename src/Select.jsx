import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import { Field } from 'formik'
import FieldErrorText from './FieldErrorText'

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

const SelectField = (props) => {
  const { field, form, selectProps } = props
  const { label, children, row } = selectProps
  const { name } = field
  const { touched, errors } = form
  return (
    <FormGroup row={row}>
      <Label for={name}>{label}</Label>
      <Input
        {...selectProps}
        {...field}
        type='select'
        data-testid="field-input"
        id={name}
        invalid={touched[name] && errors[name] ? true : false}
        validate={undefined}
      >
        <Options options={selectProps.options} children={children} />
      </Input>
      <FieldErrorText touched={touched[name]} error={errors[name]} />
    </FormGroup>
  )
}

const Select = (props) => {
  return (
    <Field
      {...props}
      name={props.name}
      component={SelectField}
      render={undefined}
      children={undefined}
      selectProps={props}
    />
  )
}

export default Select