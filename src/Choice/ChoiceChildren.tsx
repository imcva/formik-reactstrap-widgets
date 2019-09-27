import React from 'react'
import Group from './Group'
import ButtonChoice, { ButtonChoiceProps } from './ButtonChoice'
import HtmlChoice, { HtmlChoiceProps } from './HtmlChoice'
import { FieldProps } from 'formik'

interface IOption {
  value: string,
  text: string
  [key: string]: any
}

interface ChoiceChildrenProps extends Omit<ButtonChoiceProps, 'innerRef'>, Omit<HtmlChoiceProps, 'innerRef'> {
  options?: Array<IOption>
  button?: boolean
  name?: string
  multiple?: boolean
  group?: boolean
  fieldProps: {
    formik: FieldProps
    [key: string]: any
  }
}

const ChoiceChildren: React.FC<ChoiceChildrenProps> = (props) => {
  const Component = props.button ? ButtonChoice : HtmlChoice
  if (Array.isArray(props.options)) {
    return (
      <Group 
        group={props.group && props.button}
        multiple={props.multiple}
        fieldProps={props.fieldProps}
        options={props.options}
        block={props.block}
      >
        {props.options.map((opt, index) => {
          return (
            <Component 
              name={props.name}
              multiple={props.multiple}
              {...props.fieldProps.formik}
              {...props}
              {...opt}
              key={index}
            >
              {opt.text}
            </Component>
          )
        })}
      </Group>
    )
  } 
  return null
}

export default ChoiceChildren
export { ChoiceChildrenProps }
