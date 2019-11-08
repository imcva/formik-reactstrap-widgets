import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  wait,
  getAllByTestId
} from '@testing-library/react'
import { Formik, Form } from 'formik'
import 'jest-dom/extend-expect'

import Input from '../Input'

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
  const labelText = 'E-Mail: '
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        email: 'test'
      }}
      onSubmit={onSubmit}
    >
      <Input name='email' label={labelText} />
    </FormWrapper>
  )
  const label = getByTestId('input-label')
  const input = getByTestId('field-input')
  const form = getByTestId('form')
  expect(label.innerHTML).toBe(labelText)
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
  const { getByTestId } = render(
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

test('Plaintext Input', async () => {
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        email: 'test'
      }}
      onSubmit={(v, f) => null}
    >
      <Input name='email' plaintext />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  expect(input).toHaveClass('form-control-plaintext')
  expect(input).toHaveAttribute('readonly')
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

test('InputProps', async () => {
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        email: 'test'
      }}
      onSubmit={(v, f) => null}
    >
      <Input name='email' inputProps={{alt: 'Test ALT'}} validate={validateEmail} />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  expect(input).toHaveAttribute('alt', 'Test ALT')
})

test('Custom OnChange', async () => {
  const onSubmit = jest.fn()
  const { getByTestId, getAllByTestId } = render(
    <FormWrapper 
      initialValues={{
        number: 1,
        timesTwo: 2
      }}
      onSubmit={onSubmit}
    >
      <Input name='number' type='number' label='Number' onChange={(value, formikOnChange, formik) => { 
        formik.form.setFieldValue('timesTwo', Number(value) * 2)
        formikOnChange(Number(value))
      }} />
      <Input type='number' name='timesTwo' label='Times Two' />
    </FormWrapper>
  )
  const form = getByTestId('form')
  const [ number, timesTwo ] = getAllByTestId('field-input')
  expect(number.value).toBe('1')
  expect(timesTwo.value).toBe('2')
  const newValue = 4
  fireEvent.change(number, { target: { value: newValue } })
  expect(number.value).toBe(String(newValue))
  expect(timesTwo.value).toBe(String(Number(newValue) * 2))
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ number: newValue, timesTwo: (newValue * 2) }, expect.any(Object))
  })
})
