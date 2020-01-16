import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  wait
} from '@testing-library/react'
import { Formik, Form } from 'formik'
import 'jest-dom/extend-expect'

import DatePicker from '../DatePicker'

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
  const labelText = 'Birthday: '
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        birthday: new Date('12/19/2019')
      }}
      onSubmit={onSubmit}
    >
      <DatePicker label={labelText} name='birthday' />
    </FormWrapper>
  )
  const label = getByTestId('input-label')
  const input = getByTestId('field-input')
  const form = getByTestId('form')
  expect(label.innerHTML).toBe(labelText)
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
  const { getByTestId } = render(
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
}
)
test('Plaintext Input', async () => {
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        birthday: '12/09/2019'
      }}
      onSubmit={(v, f) => null}
    >
      <DatePicker name='birthday' plaintext />
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

test('Input Props', async () => {
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        birthday: '12/09/2019'
      }}
      onSubmit={(v, f) => null}
    >
      <DatePicker name='birthday' validate={validateBetweenDates} inputProps={{ alt: 'Test Alt' }} />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  expect(input).toHaveAttribute('alt', 'Test Alt')
})

test('Custom onChange Method', async () => {
  const onSubmit = jest.fn()
  const { getByTestId, getAllByTestId } = render(
    <FormWrapper 
      initialValues={{
        birthday: '',
        nextBirthday: ''
      }}
      onSubmit={onSubmit}
    >
      <DatePicker name='birthday' onChange={(date, formikOnChange, formik) => {
        const today = new Date()
        const birthday = new Date(date)
        const next = new Date(birthday)
        next.setFullYear(today.getFullYear())
        if (next < today) {
          next.setFullYear(today.getFullYear()+1)
        }
        formik.form.setFieldValue('nextBirthday', next)
        formikOnChange(date)
      }} />
      <DatePicker name='nextBirthday' />
    </FormWrapper>
  )
  const form = getByTestId('form')
  const [ birthday, nextBirthday ] = getAllByTestId('field-input')
  const newValue = '09/26/2017'
  fireEvent.change(birthday, { target: { value: newValue } })
  expect(birthday.value).toBe(newValue)
  expect(nextBirthday.value).toBe('09/26/2020')
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ birthday: new Date(newValue), nextBirthday: new Date('09/26/2020') }, expect.any(Object))
  })
})

test('Input with FormText', async () => {
  const onSubmit = jest.fn()
  const text = 'Select Your Birthday!'
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        birthday: new Date('12/19/2019')
      }}
      onSubmit={onSubmit}
    >
      <DatePicker label='Birthday' formText={text} name='birthday' />
    </FormWrapper>
  )
  const formText = getByTestId('form-text')
  expect(formText.innerHTML).toBe(text)
})
