import React from 'react'
import {Formik as BaseFormik, FormikConfig as BaseFormikConfig, FormikValues } from 'formik'

import { GlobalPropsProvider } from './useGlobalProps'

interface FormikConfig<Values> extends BaseFormikConfig<Values> {
  [key: string]: any
}

function Formik<Values extends FormikValues = FormikValues>(props: FormikConfig<Values>) {
  return (
    <GlobalPropsProvider {...props}>
      <BaseFormik
        {...props}
      />
    </GlobalPropsProvider>
  )
}

export default Formik