import React, { ReactNode } from 'react'
import { FieldProps } from 'formik'
// @ts-ignore
import get from 'lodash/get'

const getValue = (name: string | undefined, formik: FieldProps) => {
  return get(formik.form.values, name)
}

const getNewValue = (name: string | undefined, value: any, multiple: boolean | undefined, formik: FieldProps) => {
  if (name) {
    const currentValue = getValue(name, formik)
    const multipleValue = currentValue ? false : true
    return multiple ? multipleValue : value
  } else {
    return undefined
  }
}

const setValue = (name: string | undefined, value: any, multiple: boolean | undefined, formik: FieldProps) => {
  if (name) {
    const newValue = getNewValue(name, value, multiple, formik)
    formik.form.setFieldValue(name, newValue)
  }
}

const getActive = (name: string | undefined, value: any, formik: FieldProps) => {
  const currentValue = getValue(name, formik)
  return currentValue === value ? true : false
}

const convertOptionsFromChildren = <O extends {}>(opts: Array<O> | undefined, children: ReactNode | undefined): Array<O> => {
  if (opts) {
    return opts
  } else if (children) {
    let options
    if (React.isValidElement(children)) {
      options = {...children.props, text: children.props.children}
    } else {
      options = React.Children.map(children, (child: React.Component) => {
        if (child) {
          return {...child.props, text: child.props.children}
        }
        return null
      })
    }
    return Array.isArray(options) ? options : new Array(options)
  } else {
    return []
  }
}

export { getValue, getNewValue, setValue, getActive, convertOptionsFromChildren }
