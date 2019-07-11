import React from 'react'
import { FormFeedback, FormGroup, Label, Input as StrapInput } from 'reactstrap'
import { Field } from 'formik'

const Input = (props) => ( 
  <Field {...props}>
    {({field, form}) => {
      const { touched, errors } = form
      return (
        <FormGroup row={props.row}>
          <Label for={props.name}>{props.label}</Label>
          <StrapInput 
            {...props}
            {...field}
            data-testid="field-input"
            id={props.name}
            invalid={touched[field.name] && errors[field.name] ? true : false}
            validate={undefined}
          />
          {touched[field.name] && errors[field.name]
            ? <FormFeedback data-testid='invalid-text'>{errors[field.name]}</FormFeedback>
            : null
          }
        </FormGroup>
      )
  }}
  </Field>
)

export default Input