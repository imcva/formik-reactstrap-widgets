import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  wait
} from '@testing-library/react'
import { Formik, Form } from 'formik'
import 'jest-dom/extend-expect'

import Choice from '../src/Choice'

afterEach(cleanup)

const validateRequired = (value) => {
  if (!value || value === '') {
    return 'Required';
  }
  return undefined;
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

test('Basic Checkbox With Children', async () => {
  const onSubmit = jest.fn()
  const { getByTestId, getByLabelText } = render(
    <FormWrapper 
      initialValues={{
        color: {
          green: true
        }
      }}
      onSubmit={onSubmit}
    >
      <Choice multiple label='Color: '>
        <option name='color.red' value='red'>Red</option>
        <option name='color.blue' value='blue'>Blue</option>
        <option name='color.green' value='green'>Green</option>
      </Choice>
    </FormWrapper>
  )
  const red = getByLabelText('Red')
  const green = getByLabelText('Green')
  const blue = getByLabelText('Blue')
  const form = getByTestId('form')
  expect(green.checked).toBeTruthy()
  expect(blue.checked).not.toBeTruthy()
  expect(red.checked).not.toBeTruthy()
  fireEvent.click(blue)
  expect(blue.checked).toBeTruthy()
  expect(green.checked).toBeTruthy()
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { color: { green: true, blue: true } },
      expect.any(Object)
    )
  })
})

test('Basic Radio With Options Prop', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red', name: 'color.red'},
    {value: 'blue', text: 'Blue', name: 'color.blue'},
    {value: 'green', text: 'Green', name: 'color.green'}
  ]
  const { getByTestId, getByLabelText } = render(
    <FormWrapper 
      initialValues={{
        color: {
          green: true
        }
      }}
      onSubmit={onSubmit}
    >
      <Choice multiple options={options} />
    </FormWrapper>
  )
  const red = getByLabelText('Red')
  const green = getByLabelText('Green')
  const blue = getByLabelText('Blue')
  const form = getByTestId('form')
  expect(green.checked).toBeTruthy()
  expect(blue.checked).not.toBeTruthy()
  expect(red.checked).not.toBeTruthy()
  fireEvent.click(blue)
  expect(blue.checked).toBeTruthy()
  expect(green.checked).toBeTruthy()
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { color: { green: true, blue: true } },
      expect.any(Object)
    )
  })
})

test('Button Radio With Options Prop', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red', name: 'color.red'},
    {value: 'blue', text: 'Blue', name: 'color.blue'},
    {value: 'green', text: 'Green', name: 'color.green'}
  ]
  const { getByTestId, getByLabelText } = render(
    <FormWrapper 
      initialValues={{
        color: {
          green: true
        }
      }}
      onSubmit={onSubmit}
    >
      <Choice button multiple options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color.red-red')
  const green = getByTestId('color.green-green')
  const blue = getByTestId('color.blue-blue')
  const form = getByTestId('form')
  expect(green).toHaveClass('active')
  expect(blue).not.toHaveClass('active')
  expect(red).not.toHaveClass('active')
  fireEvent.click(blue)
  expect(blue).toHaveClass('active')
  expect(green).toHaveClass('active')
  expect(red).not.toHaveClass('active')
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { color: { green: true, blue: true } },
      expect.any(Object)
    )
  })
})

test('All Disabled Radios', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red', name: 'color.red'},
    {value: 'blue', text: 'Blue', name: 'color.blue'},
    {value: 'green', text: 'Green', name: 'color.green'}
  ]
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: {
          green: true
        }
      }}
      onSubmit={onSubmit}
    >
      <Choice disabled multiple options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color.red-red')
  const green = getByTestId('color.green-green')
  const blue = getByTestId('color.blue-blue')
  expect(red).toBeDisabled()
  expect(green).toBeDisabled()
  expect(blue).toBeDisabled()
})

test('Single Disabled Radios', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red', name: 'color.red', disabled: true},
    {value: 'blue', text: 'Blue', name: 'color.blue'},
    {value: 'green', text: 'Green', name: 'color.green'}
  ]
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: {
          green: true
        }
      }}
      onSubmit={onSubmit}
    >
      <Choice multiple options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color.red-red')
  const green = getByTestId('color.green-green')
  const blue = getByTestId('color.blue-blue')
  expect(red).toBeDisabled()
  expect(blue).not.toBeDisabled()
  expect(green).not.toBeDisabled()
})

test('Radio Validation', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red', name: 'color.red'},
    {value: 'blue', text: 'Blue', name: 'color.blue'},
    {value: 'green', text: 'Green', name: 'color.green'}
  ]
  const { getByTestId, getAllByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: {
          green: false,
          blue: false,
          red: false
        }
      }}
      onSubmit={onSubmit}
    >
      <Choice multiple options={options} validate={validateRequired} />
    </FormWrapper>
  )
  const form = getByTestId('form')
  fireEvent.submit(form)
  await wait(() => {
    const invalidText = getAllByTestId('invalid-text')
    expect(invalidText.length).toBe(3)
  })
})
