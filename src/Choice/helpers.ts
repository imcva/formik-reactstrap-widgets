import React, { ReactNode } from 'react'
import { FieldProps } from 'formik'
// @ts-ignore
import get from 'lodash/get'

const getValue = (name: string, formik: FieldProps) => {
  return get(formik.form.values, name)
}

const setValue = (name: string, value: any, multiple: boolean, formik: FieldProps) => {
  const currentValue = getValue(name, formik)
  const multipleValue = currentValue ? false : true
  const newValue = multiple ? multipleValue : value
  formik.form.setFieldValue(name, newValue)
}

const getActive = (name: string, value: any, formik: FieldProps) => {
  const currentValue = getValue(name, formik)
  return currentValue === true ? true : value === currentValue
}

const convertOptionsFromChildren = <O extends {}>(opts: Array<O>, children: ReactNode ): Array<O> => {
  if (opts) {
    return opts
  } else if (children) {
    let options
    if (React.isValidElement(children)) {
      options = {...children.props}
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

export { getValue, setValue, getActive, convertOptionsFromChildren }
