import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  wait
} from '@testing-library/react'
import { Formik, Form } from 'formik'
import 'jest-dom/extend-expect'

import Choice from '../Choice'
import Option from '../Choice/Option'

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

test('Basic Radio With Children', async () => {
  const onSubmit = jest.fn()
  const labelText = 'Color: '
  const { debug, getByTestId, getByLabelText } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
      onSubmit={onSubmit}
    >
      <Choice name='color' label={labelText}>
        <Option value='red'>Red</Option>
        <Option value='blue'>Blue</Option>
        <Option value='green'>Green</Option>
      </Choice>
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
  expect(green.checked).not.toBeTruthy()
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ color: 'blue' }, expect.any(Object))
  })
})

test('Basic Radio With Options Prop', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red'},
    {value: 'blue', text: 'Blue'},
    {value: 'green', text: 'Green'}
  ]
  const { getByTestId, getByLabelText } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
      onSubmit={onSubmit}
    >
      <Choice name='color' options={options} />
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
  expect(green.checked).not.toBeTruthy()
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ color: 'blue' }, expect.any(Object))
  })
})

test('Button Radio With Options Prop', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red'},
    {value: 'blue', text: 'Blue'},
    {value: 'green', text: 'Green'}
  ]
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
      onSubmit={onSubmit}
    >
      <Choice button name='color' options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color-red')
  const green = getByTestId('color-green')
  const blue = getByTestId('color-blue')
  const form = getByTestId('form')
  expect(green).toHaveClass('active')
  expect(blue).not.toHaveClass('active')
  expect(red).not.toHaveClass('active')
  fireEvent.click(blue)
  expect(blue).toHaveClass('active')
  expect(green).not.toHaveClass('active')
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ color: 'blue' }, expect.any(Object))
  })
})

test('All Disabled Radios', async () => {
  const options = [
    {value: 'red', text: 'Red'},
    {value: 'blue', text: 'Blue'},
    {value: 'green', text: 'Green'}
  ]
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
    >
      <Choice disabled name='color' options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color-red')
  const blue = getByTestId('color-blue')
  const green = getByTestId('color-green')
  expect(red).toBeDisabled()
  expect(blue).toBeDisabled()
  expect(green).toBeDisabled()
})

test('Single Disabled Radios', async () => {
  const options = [
    {value: 'red', text: 'Red', disabled: true},
    {value: 'blue', text: 'Blue'},
    {value: 'green', text: 'Green'}
  ]
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
    >
      <Choice name='color' options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color-red')
  const blue = getByTestId('color-blue')
  const green = getByTestId('color-green')
  expect(red).toBeDisabled()
  expect(blue).not.toBeDisabled()
  expect(green).not.toBeDisabled()
})

test('Radio Validation', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: 'red', text: 'Red'},
    {value: 'blue', text: 'Blue'},
    {value: 'green', text: 'Green'}
  ]
  const { getByTestId } = render(
      <FormWrapper 
        initialValues={{
          color: ''
        }} 
        onSubmit={onSubmit}
      >
      <Choice name='color' options={options} validate={validateRequired} />
    </FormWrapper>
  )
  const form = getByTestId('form')
  fireEvent.submit(form)
  await wait(() => {
    const invalidText = getByTestId('invalid-text')
    expect(invalidText).toBeVisible()
  })
})

test('Radio Validation', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: true, text: 'True'},
    {value: false, text: 'False'},
  ]
  const { getByTestId } = render(
      <FormWrapper 
        initialValues={{
          bool: false
        }} 
        onSubmit={onSubmit}
      >
      <Choice name='bool' button group options={options} />
    </FormWrapper>
  )
  const trueButton = getByTestId('bool-true')
  const falseButton = getByTestId('bool-false')
  const form = getByTestId('form')
  expect(trueButton).not.toHaveClass('active')
  expect(falseButton).toHaveClass('active')
  fireEvent.click(trueButton)
  expect(trueButton).toHaveClass('active')
  expect(falseButton).not.toHaveClass('active')
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ bool: true }, expect.any(Object))
  })
})

test('Basic Radio With Children', async () => {
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
      onSubmit={() => null}
    >
      <Choice name='color' label='Color: ' inputProps={{alt: 'Test Alt'}}>
        <Option value='red'>Red</Option>
        <Option value='blue'>Blue</Option>
        <Option value='green'>Green</Option>
      </Choice>
    </FormWrapper>
  )
  const blue = getByTestId('color-blue')
  expect(blue).toHaveAttribute('alt', 'Test Alt')
})
