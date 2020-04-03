import React from 'react'
// @ts-ignore
import get from 'lodash/get'
import { FormFeedback } from 'reactstrap'

export interface DisplayErrorProps {
  error: any
  touched: any
}

const DisplayError: React.FC<DisplayErrorProps> = (props) => {
  if (props.touched && props.error) {
    return <FormFeedback className='d-block' data-testid='invalid-text'>{`${props.error}`}</FormFeedback>
  }
  return null
}

export default DisplayError
