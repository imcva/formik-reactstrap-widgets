import React from 'react'
import { useField, FieldConfig, FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik'
import { InputProps } from 'reactstrap'

import FieldGroup from '../../FieldGroupExperimental'
import convertOptionsFromChildren from '../convertOptionsFromChildren'

import { RadioOption } from '../types'
import Inputs from './Inputs'
import Buttons from './Buttons'
import { useGlobalProps } from '../../useGlobalProps'

interface RadioProps extends FieldConfig, Omit<InputProps, 'onChange'> {
  options?: RadioOption[]
  onChange?: (value:any, field: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>]) => void
}

const Radio: React.FC<RadioProps> = (props) => {
  const { label, name, validate, ...rest } = props
  const opts = convertOptionsFromChildren<RadioOption>(props.options, props.children)
  if (!name) {
    throw new Error('Must pass a name to Radio!')
  }
  const [ field, meta, helpers ] = useField({
    name: name,
    validate: validate
  })
  const { globalProps } = useGlobalProps()
  return (
    <FieldGroup
      label={label}
      field={field}
      meta={meta}
    >
      { props.button
        ? (
          <Buttons
            options={opts}
            field={field}
            meta={meta}
            helpers={helpers}
            plaintext={globalProps.plaintext}
            {...rest}
          />
        ) : (
          <Inputs
            options={opts}
            field={field}
            meta={meta}
            helpers={helpers}
            plaintext={globalProps.plaintext}
            {...rest}
          />
        )
      }
    </FieldGroup>
  )
}

export default Radio
