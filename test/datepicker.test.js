import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  wait
} from '@testing-library/react'
import { Formik, Form } from 'formik'
import 'jest-dom/extend-expect'

import DatePicker from '../src/DatePicker'

afterEach(cleanup)

const validateBetweenDates = (value) => {
  let error;
  if (value && value != '') {
    value = new Date(value)
  }

  if (value instanceof Date) {
    const minDate = '7/1/2019'
    const maxDate = '7/31/2019'
    const timeValue = value.getTime()
    const minDateTime = new Date(minDate).getTime()
    const maxDateTime = new Date(maxDate).getTime()
    if (timeValue > minDateTime && timeValue > maxDateTime) {
      error = `Date must be between ${minDate} and ${maxDate}`;
    }
  }
  return error;
}

const FormWrapper = (props) => ( 
  <Formik
    {...props}
    children={undefined}
  >
    <Form data-testid='form'>
      {props.children}
    </Form>
  </Formik>
)

test('Basic Input onSubmit', async () => {
  const onSubmit = jest.fn()
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        birthday: new Date('12/19/2019')
      }}
      onSubmit={onSubmit}
    >
      <DatePicker name='birthday' />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  const form = getByTestId('form')
  expect(input.value).toBe('12/19/2019')
  const newValue = '01/23/2019'
  fireEvent.change(input, { target: { value: newValue } })
  expect(input.value).toBe(newValue)
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ birthday: new Date(newValue) }, expect.any(Object))
  })
})

test('Disabled Input', async () => {
  const { debug, getByTestId } = render(
    <FormWrapper 
      initialValues={{
        birthday: '12/09/2019'
      }}
      onSubmit={(v, f) => null}
    >
      <DatePicker name='birthday' disabled />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  expect(input).toBeDisabled()
})

test('Input Level Validation', async () => {
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        birthday: '12/09/2019'
      }}
      onSubmit={(v, f) => null}
    >
      <DatePicker name='birthday' validate={validateBetweenDates} />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  const form = getByTestId('form')
  fireEvent.submit(form)
  await wait(() => {
    expect(input).toHaveClass('is-invalid')
    const invalidText = getByTestId('invalid-text')
    expect(invalidText).toBeVisible()
  })
})
