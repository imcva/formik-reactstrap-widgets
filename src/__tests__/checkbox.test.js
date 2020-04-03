import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  wait
} from '@testing-library/react'
import { Formik, Form } from 'formik'
import 'jest-dom/extend-expect'

import { Checkbox } from '../Choice'

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
  const labelText = 'Color: '
  const { getByTestId, getByLabelText } = render(
    <FormWrapper 
      initialValues={{
        color: {
          green: true
        }
      }}
      onSubmit={onSubmit}
    >
      <Checkbox label={labelText}>
        <option name='color.red' value='red'>Red</option>
        <option name='color.blue' value='blue'>Blue</option>
        <option name='color.green' value='green'>Green</option>
      </Checkbox>
    </FormWrapper>
  )
  const label = getByTestId('input-label')
  const red = getByLabelText('Red')
  const green = getByLabelText('Green')
  const blue = getByLabelText('Blue')
  const form = getByTestId('form')
  expect(label.innerHTML).toBe(labelText)
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

test('Basic Checkbox With Options Prop', async () => {
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
      <Checkbox options={options} />
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

test('Button Checkbox With Options Prop', async () => {
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
      <Checkbox button options={options} />
    </FormWrapper>
  )
  const red = getByLabelText('Red')
  const green = getByLabelText('Green')
  const blue = getByLabelText('Blue')
  const form = getByTestId('form')
  expect(green).toHaveClass('active')
  expect(blue).not.toHaveClass('active')
  expect(red).not.toHaveClass('active')
  fireEvent.click(blue)
  expect(blue).toHaveClass('active')
  expect(green).toHaveClass('active')
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
      <Checkbox disabled options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color.red')
  const green = getByTestId('color.green')
  const blue = getByTestId('color.blue')
  expect(red).toBeDisabled()
  expect(green).toBeDisabled()
  expect(blue).toBeDisabled()
})

test('All Plaintext Radios', async () => {
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
      <Checkbox plaintext options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color.red')
  const green = getByTestId('color.green')
  const blue = getByTestId('color.blue')
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
      <Checkbox options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color.red')
  const green = getByTestId('color.green')
  const blue = getByTestId('color.blue')
  expect(red).toBeDisabled()
  expect(blue).not.toBeDisabled()
  expect(green).not.toBeDisabled()
})

test('Single Plaintext Radios', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red', name: 'color.red', plaintext: true},
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
      <Checkbox options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color.red')
  const green = getByTestId('color.green')
  const blue = getByTestId('color.blue')
  expect(red).toBeDisabled()
  expect(blue).not.toBeDisabled()
  expect(green).not.toBeDisabled()
})

test('Checkbox Validation', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red', name: 'color.red', validate: validateRequired},
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
      <Checkbox options={options}  />
    </FormWrapper>
  )
  const form = getByTestId('form')
  fireEvent.submit(form)
  await wait(() => {
    const invalidText = getAllByTestId('invalid-text')
    expect(invalidText.length).toBe(1)
  })
})

test('Checkbox Button Validation', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red', name: 'color.red', validate: validateRequired},
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
      <Checkbox button options={options} />
    </FormWrapper>
  )
  const form = getByTestId('form')
  fireEvent.submit(form)
  await wait(() => {
    const invalidText = getAllByTestId('invalid-text')
    expect(invalidText.length).toBe(1)
  })
})