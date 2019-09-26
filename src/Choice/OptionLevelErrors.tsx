import React from 'react'
import { FieldProps } from 'formik'

import displayError from './DisplayError'

interface IOption {
  value: string
  text: string
  [key: string]: any
}
type OptionsArray = Array<IOption>

interface OptionLevelErrorsProps {
  options?: OptionsArray
  multiple?: boolean
  fieldProps: {
    formik: FieldProps
  }
}

const OptionLevelErrors: React.FC<OptionLevelErrorsProps> = (props) => {
  const { options, multiple, fieldProps: { formik } } = props
  if (multiple && Array.isArray(options) && options.length) {
    return (
      <>
        {options.map((opt, index) => {
          return displayError(opt.name, opt.text, index, formik)
        })}
      </>
    )
  }
  return null
}

export default OptionLevelErrors
export { OptionLevelErrorsProps }
