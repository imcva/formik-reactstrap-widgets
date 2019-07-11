import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  wait
} from '@testing-library/react'
import { Formik, Form } from 'formik'
import 'jest-dom/extend-expect'

import Input from '../src/Input'

afterEach(cleanup)

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
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
        email: 'test'
      }}
      onSubmit={onSubmit}
    >
      <Input name='email' />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  const form = getByTestId('form')
  expect(input.value).toBe('test')
  const newValue = 'Hello World'
  fireEvent.change(input, { target: { value: newValue } })
  expect(input.value).toBe(newValue)
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ email: newValue }, expect.any(Object))
  })
})

test('Disabled Input', async () => {
  const { debug, getByTestId } = render(
    <FormWrapper 
      initialValues={{
        email: 'test'
      }}
      onSubmit={(v, f) => null}
    >
      <Input name='email' disabled />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  expect(input).toBeDisabled()
})

test('Input Level Validation', async () => {
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        email: 'test'
      }}
      onSubmit={(v, f) => null}
    >
      <Input name='email' validate={validateEmail} />
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
