import React from 'react'
import FieldGroup, { FieldGroupRenderProps, FieldGroupProps } from '../FieldGroup';

import { convertOptionsFromChildren } from './helpers'
import ChoiceChildren, { ChoiceChildrenProps } from './ChoiceChildren'

interface IOption {
  value: string,
  text: string
  [key: string]: any
}

type ChoiceProps = ChoiceChildrenProps & FieldGroupProps

const Choice: React.FC<ChoiceProps> = (props) => { 
  const opts = convertOptionsFromChildren<IOption>(props.options, props.children)
  return (
    <FieldGroup
      name={props.name}
      component={props.component}
      validate={props.name ? props.validate : undefined}
      render={(fieldProps: FieldGroupRenderProps) => { 
        return (
          <ChoiceChildren 
            button={props.button}
            multiple={props.multiple}
            group={props.group}
            options={opts}
            fieldProps={fieldProps}
            {...props}
          />
        )
      }}
    />
  )
}

export default Choice
export { ChoiceProps }
