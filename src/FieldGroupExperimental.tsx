import React from 'react'
import {
  Label,
  FormGroup,
  FormFeedback
} from 'reactstrap'
// @ts-ignore
import get from 'lodash/get'
import { FieldInputProps } from 'formik';

interface GroupProps<Value = any> {
  field: FieldInputProps<Value>
  meta: any
  label?: React.Component | String
  invalid?: boolean
}

const Group: React.FC<GroupProps> = (props) => {
  const { field, meta, label, invalid, children} = props
  return (
    <>
      {label !== undefined
        ? <Label data-testid='input-label' for={field.name}>{label}</Label>
        : null
      }
      {children}
      {invalid 
        ? <FormFeedback className='d-block' data-testid='invalid-text'>{meta.error}</FormFeedback>
        : null
      }
    </>
  )
} 

interface FieldGroupProps extends GroupProps {
  row?: boolean
  group?: boolean
  check?: boolean 
}

const FieldGroup: React.FC<FieldGroupProps> = (props) => {
  const {
    field,
    meta,
    group = true,
    check,
    row,
    label,
    invalid,
    children
  } = props
  return (
    <>
      {group
        ? (
          <FormGroup row={row} check={check}>
            <Group field={field} meta={meta} label={label} invalid={invalid}>
              {children}
            </Group>
          </FormGroup>
        ) : (
          <Group field={field} meta={meta} label={label} invalid={invalid}>
            {children}
          </Group> 
        )
      }
    </>
  )
}

export default FieldGroup
export { FieldGroupProps, GroupProps }
