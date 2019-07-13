import React from 'react'
import { FormFeedback } from 'reactstrap'

const FieldErrorText = (props) => {
  if (props.touched && props.error) {
    return (<FormFeedback data-testid='invalid-text'>{props.error}</FormFeedback>)
  } else {
    return null
  }
}

export default FieldErrorText