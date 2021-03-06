import React from 'react'
import {
  act,
  render,
  fireEvent,
  cleanup,
  wait
} from '@testing-library/react'
import { Formik, Form } from 'formik'
import 'jest-dom/extend-expect'

import { Radio } from '../Choice'

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
  const { getByTestId, getByLabelText } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
      onSubmit={onSubmit}
    >
      <Radio name='color' label={labelText}>
        <option value='red'>Red</option>
        <option value='blue'>Blue</option>
        <option value='green'>Green</option>
      </Radio>
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
      <Radio name='color' options={options} />
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
      <Radio button name='color' options={options} />
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
      <Radio disabled name='color' options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color-red')
  const blue = getByTestId('color-blue')
  const green = getByTestId('color-green')
  expect(red).toBeDisabled()
  expect(blue).toBeDisabled()
  expect(green).toBeDisabled()
})

test('All Plaintext Radios', async () => {
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
      <Radio plaintext name='color' options={options} />
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
      <Radio name='color' options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color-red')
  const blue = getByTestId('color-blue')
  const green = getByTestId('color-green')
  expect(red).toBeDisabled()
  expect(blue).not.toBeDisabled()
  expect(green).not.toBeDisabled()
})

test('Single Plaintext Radios', async () => {
  const options = [
    {value: 'red', text: 'Red', plaintext: true},
    {value: 'blue', text: 'Blue'},
    {value: 'green', text: 'Green'}
  ]
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
    >
      <Radio name='color' options={options} />
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
      <Radio name='color' options={options} validate={validateRequired} />
    </FormWrapper>
  )
  const form = getByTestId('form')
  fireEvent.submit(form)
  await wait(() => {
    const invalidText = getByTestId('invalid-text')
    expect(invalidText).toBeVisible()
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
      <Radio name='color' label='Color: ' alt='Test Alt'>
        <Option value='red'>Red</Option>
        <Option value='blue'>Blue</Option>
        <Option value='green'>Green</Option>
      </Radio>
    </FormWrapper>
  )
  const blue = getByTestId('color-blue')
  expect(blue).toHaveAttribute('alt', 'Test Alt')
})

test('Custom global onChange with basic radio', async () => {
  const changeFunction = jest.fn()
  const { debug, getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
      onSubmit={() => null}
    >
      <Radio name='color' label='Color: ' onChange={(value, [ , , helpers ]) => {
        changeFunction(value) 
        act(() => {
          helpers.setValue(value)
        })
      }}>
        <Option value='red' label='Red'>Red</Option>
        <Option value='blue' label='Blue'>Blue</Option>
        <Option value='green' label='Green'>Green</Option>
      </Radio>
    </FormWrapper>
  )
  const red = getByTestId('color-red')
  const blue = getByTestId('color-blue')
  const green = getByTestId('color-green')
  expect(red.checked).not.toBeTruthy()
  expect(blue.checked).not.toBeTruthy()
  expect(green.checked).toBeTruthy()
  fireEvent.click(blue)
  await wait(() => {
    expect(changeFunction).toHaveBeenCalledTimes(1)
    expect(changeFunction).toHaveBeenCalledWith('blue')
    expect(red.checked).not.toBeTruthy()
    expect(blue.checked).toBeTruthy()
    expect(green.checked).not.toBeTruthy()
  })
})

test('Custom global onChange with button radio', async () => {
  const changeFunction = jest.fn()
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
      onSubmit={() => null}
    >
      <Radio button name='color' label='Color: ' onChange={(value, [ , , helpers ]) => {
        changeFunction(value) 
        act(() => {
          helpers.setValue(value)
        })
      }}>
        <Option value='red' label='Red'>Red</Option>
        <Option value='blue' label='Blue'>Blue</Option>
        <Option value='green' label='Green'>Green</Option>
      </Radio>
    </FormWrapper>
  )
  const red = getByTestId('color-red')
  const blue = getByTestId('color-blue')
  const green = getByTestId('color-green')
  expect(red).not.toHaveClass('active')
  expect(blue).not.toHaveClass('active')
  expect(green).toHaveClass('active')
  fireEvent.click(blue)
  await wait(() => {
    expect(changeFunction).toHaveBeenCalledTimes(1)
    expect(changeFunction).toHaveBeenCalledWith('blue')
    expect(red).not.toHaveClass('active')
    expect(blue).toHaveClass('active')
    expect(green).not.toHaveClass('active')
  })
})
