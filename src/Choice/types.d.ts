import { FieldConfig } from 'formik'
import { InputProps, ButtonProps } from 'reactstrap'

export interface CheckboxOption extends Omit<FieldConfig, 'children'>,
                                 Omit<InputProps, 'children'>,
                                 Omit<ButtonProps, keyof FieldConfig> {
  text: string
}

export interface RadioOption extends Omit<InputProps, 'children'>,
                                 Omit<ButtonProps, keyof FieldConfig> {
  text: string
}