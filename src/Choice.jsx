import React from 'react'
import get from 'lodash/get'
import { Input as StrapInput, Label, Button, ButtonGroup, FormGroup, FormFeedback } from 'reactstrap'
import { Field }  from 'formik'
import className from 'classname'

import FieldGroup from './FieldGroup';

const getValue = (name, formik) => {
  return get(formik.form.values, name)
}

const setValue = (name, value, multiple, formik) => {
  const currentValue = getValue(name, formik)
  const multipleValue = currentValue ? false : true
  const newValue = multiple ? multipleValue : value
  formik.form.setFieldValue(name, newValue)
}

const getActive = (name, value, formik) => {
  const currentValue = getValue(name, formik)
  return currentValue === true ? true : value === currentValue
}

const ButtonChoice = (props) => {
  const { name, value } = props
  const id = `${name}-${value}`
  return (
    <Field
      name={name}
      validate={props.validate}
      render={(formik) => ( 
        <Button
          active={getActive(name, value, formik)}
          area-label={props['area-label']}
          block={props.block}
          className={className(
            'my-2',
            props.className
          )}
          color={props.color}
          data-testid={id}
          disabled={props.disabled}
          name={name}
          innerRef={props.innerRef}
          onBlur={formik.field.onBlur}
          onClick={(event) => {
            setValue(name, value, props.multiple, formik)
          }}
          outline={props.outline}
          size={props.size}
          tag={props.tag}
        >
          {props.children}
        </Button>
      )}
    />
  )
}

const HtmlChoice = (props) => {
  const { name, value, label } = props
  const id = `${name}-${value}`
  return (
    <Field
      name={name}
      validate={props.validate}
      render={(formik) => ( 
        <FormGroup check>
          <Label for={id} check>
            <StrapInput 
              {...formik.field}
              addon={props.addon}
              bsSize={props.bsSize}
              checked={getActive(name, value, formik)}
              className={props.className}
              data-testid={id}
              disabled={props.disabled}
              id={id}
              innerRef={props.innerRef}
              invalid={props.invalid}
              name={name}
              onBlur={formik.field.onBlur}
              onChange={(event) => {
                setValue(name, value, props.multiple, formik)
              }}
              plaintext={props.plaintext}
              size={props.size}
              tag={props.tag}
              type={props.multiple ? 'checkbox' : 'radio' }
              valid={props.valid}
              value={value}
            />
            {props.children}
          </Label>
        </FormGroup>
      )} 
    />
  )
}

const Group = (props) => {
  if (props.group) {
    return (
      <FormGroup>
        <ButtonGroup>
          {props.children}
        </ButtonGroup>
        <OptionLevelErrors {...props} />
      </FormGroup>
    )
  } else {
    return (
      <div>
        {props.children}
        <OptionLevelErrors {...props} />
      </div>
    )
  }
}

const ChoiceChildren = (props) => {
  const { options, children, button, optionProps } = props
  const Component = button ? ButtonChoice : HtmlChoice
  if (Array.isArray(options) && options.length) {
    return (
      <Group {...optionProps} {...props} group={props.group && button}>
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
      <Group {...optionProps} {...props} group={props.group}>
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

const displayError = (name, label, index, formik) => {
  const error = get(formik.form.errors, name)
  const touched = get(formik.form.touched, name)
  if (touched && error) {
    return <FormFeedback key={index} className='d-block' data-testid='invalid-text'>{`${label}: ${error}`}</FormFeedback>
  }
  return null
}

const OptionLevelErrors = (props) => {
  const { options, children, multiple, fieldProps: { formik } } = props
  if (multiple) {
    if (Array.isArray(options) && options.length) {
      return options.map((opt, index) => {
        return displayError(opt.name, opt.text, index, formik)
      })
    } else if (Array.isArray(children) && children.length) {
      return React.Children.map(children, (child, index) => {
        return displayError(child.props.name, child.props.children, index, formik)
      })
    }
  } else {
    return null
  }
}

const Choice = (props) => { 
  return (
    <FieldGroup
      {...props}
      validate={props.name ? props.validate : undefined}
      render={(fieldProps) => { 
        const optionProps = { ...props, fieldProps }
        return (
          <ChoiceChildren 
            button={props.button}
            children={props.children}
            multiple={props.multiple}
            group={props.group}
            options={props.options}
            optionProps={optionProps}
          />
        )
      }}
    />
  )
}

export default Choice