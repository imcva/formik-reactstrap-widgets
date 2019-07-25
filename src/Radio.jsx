import React from 'react'
import { Input as StrapInput, Label, Button, ButtonGroup, FormGroup } from 'reactstrap'
import FieldGroup from './FieldGroup';
import className from 'classname'

const ButtonRadio = (props) => {
  const { row, name, value, fieldProps, label } = props
  const id = `${name}-${value}`
  return (
    <Button
      active={value === fieldProps.value}
      area-label={props['area-label']}
      block={props.block}
      className={className(
        'my-2',
        props.className
      )}
      color={props.color}
      data-testid={id}
      disabled={props.disabled}
      id={id}
      innerRef={props.innerRef}
      onClick={(event) => {
        fieldProps.formik.form.setFieldValue(name, value)
      }}
      outline={props.outline}
      size={props.size}
      tag={props.tag}
      onBlur={fieldProps.formik.field.onBlur}
    >
      {props.children}
    </Button>
  )
}

const HtmlRadio = (props) => {
  const { name, fieldProps, value, label } = props
  const id = `${name}-${value}`
  return (
    <FormGroup check>
      <Label for={id} check>
        <StrapInput 
          {...fieldProps.formik.field}
          addon={props.addon}
          bsSize={props.bsSize}
          checked={value === fieldProps.value}
          className={props.className}
          data-testid={id}
          disabled={props.disabled}
          id={id}
          innerRef={props.innerRef}
          invalid={props.invalid}
          plaintext={props.plaintext}
          size={props.size}
          tag={props.tag}
          type='radio'
          valid={props.valid}
          value={value}
        />
        {props.children}
      </Label>
    </FormGroup>
  )
}

const Group = (props) => {
  if (props.group) {
    return (
      <FormGroup>
        <ButtonGroup>
          {props.children}
        </ButtonGroup>
      </FormGroup>
    )
  } else {
    return <div>{props.children}</div>
  }
}

const RadioChildren = (props) => {
  const { options, children, button, group, optionProps } = props
  const Component = button ? ButtonRadio : HtmlRadio
  if (Array.isArray(options) && options.length) {
    return (
      <Group group={props.group && button}>
        {options.map((opt, index) => {
          return (
            <Component {...optionProps} {...opt} key={index}>
              {opt.text}
            </Component>
          )
        })}
      </Group>
    )
  } else if (Array.isArray(children) && children.length) {
    return (
      <Group group={props.group}>
        {React.Children.map(children, (child, index) => {
          return (
            <Component {...optionProps} {...child.props} key={index}>
              {child.props.children}
            </Component>
          )
        })}
      </Group>
    )
  }
}


const Radio = (props) => { 
  return (
    <FieldGroup
      {...props}
      render={(fieldProps) => { 
          const optionProps = { ...props, fieldProps }
          return (
            <RadioChildren 
              button={props.button}
              children={props.children}
              group={props.group}
              options={props.options}
              optionProps={optionProps}
            />
          )
      }}
    />
  )
}

export default Radio