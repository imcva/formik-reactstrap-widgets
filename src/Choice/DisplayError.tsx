import React from 'react'
// @ts-ignore
import get from 'lodash/get'
import { FieldProps } from 'formik'
import { FormFeedback } from 'reactstrap'

const DisplayError = (name: string, label: string, index: number, formik: FieldProps) => {
  const error = get(formik.form.errors, name)
  const touched = get(formik.form.touched, name)
  if (touched && error) {
    return <FormFeedback key={index} className='d-block' data-testid='invalid-text'>{`${label}: ${error}`}</FormFeedback>
  }
  return null
}

export default DisplayError
