import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  wait
} from '@testing-library/react'
import { Formik, Form } from 'formik'
import 'jest-dom/extend-expect'

import Choice, { Option } from '../Choice'

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
      <Choice multiple label={labelText}>
        <Option name='color.red' value='red'>Red</Option>
        <Option name='color.blue' value='blue'>Blue</Option>
        <Option name='color.green' value='green'>Green</Option>
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
  const red = getByTestId('color.red-true')
  const green = getByTestId('color.green-true')
  const blue = getByTestId('color.blue-true')
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
  const red = getByTestId('color.red-true')
  const green = getByTestId('color.green-true')
  const blue = getByTestId('color.blue-true')
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
      <Choice plaintext multiple options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color.red-true')
  const green = getByTestId('color.green-true')
  const blue = getByTestId('color.blue-true')
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
  const red = getByTestId('color.red-true')
  const green = getByTestId('color.green-true')
  const blue = getByTestId('color.blue-true')
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
      <Choice multiple options={options} />
    </FormWrapper>
  )
  const red = getByTestId('color.red-true')
  const green = getByTestId('color.green-true')
  const blue = getByTestId('color.blue-true')
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

test('Basic Radio With Children', async () => {
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
      onSubmit={() => null}
    >
      <Choice multiple label='Color: ' inputProps={{alt: 'Test Alt'}}>
        <Option name='red' value={true}>Red</Option>
        <Option name='blue' value={true}>Blue</Option>
        <Option name='green' value={true}>Green</Option>
      </Choice>
    </FormWrapper>
  )
  const blue = getByTestId('blue-true')
  expect(blue).toHaveAttribute('alt', 'Test Alt')
})

test('Custom global onChange with basic radio', async () => {
  const changeFunction = jest.fn()
  const { debug, getByTestId } = render(
    <FormWrapper 
      initialValues={{
        green: true
      }}
      onSubmit={() => null}
    >
      <Choice multiple label='Color: ' onChange={(value, formikOnChange, formik) => {
        changeFunction(value, formik.field.name) 
        formikOnChange(value)
      }}>
        <Option name='red' value={true}>Red</Option>
        <Option name='blue' value={true}>Blue</Option>
        <Option name='green' value={true}>Green</Option>
      </Choice>
    </FormWrapper>
  )
  const red = getByTestId('red-true')
  const blue = getByTestId('blue-true')
  const green = getByTestId('green-true')
  expect(red.checked).not.toBeTruthy()
  expect(blue.checked).not.toBeTruthy()
  expect(green.checked).toBeTruthy()
  fireEvent.click(blue)
  expect(changeFunction).toHaveBeenCalledTimes(1)
  expect(changeFunction).toHaveBeenCalledWith(true, 'blue')
  expect(red.checked).not.toBeTruthy()
  expect(blue.checked).toBeTruthy()
  expect(green.checked).toBeTruthy()
  fireEvent.click(green)
  expect(changeFunction).toHaveBeenCalledTimes(2)
  expect(changeFunction).toHaveBeenCalledWith(false, 'green')
  expect(red.checked).not.toBeTruthy()
  expect(blue.checked).toBeTruthy()
  expect(green.checked).not.toBeTruthy()
})

test('Custom global onChange with button radio', async () => {
  const changeFunction = jest.fn()
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        green: true
      }}
      onSubmit={() => null}
    >
      <Choice multiple button label='Color: ' onChange={(value, formikOnChange, formik) => {
        changeFunction(value, formik.field.name) 
        formikOnChange(value)
      }}>
        <Option name='red' value={true}>Red</Option>
        <Option name='blue' value={true}>Blue</Option>
        <Option name='green' value={true}>Green</Option>
      </Choice>
    </FormWrapper>
  )
  const red = getByTestId('red-true')
  const blue = getByTestId('blue-true')
  const green = getByTestId('green-true')
  expect(red).not.toHaveClass('active')
  expect(blue).not.toHaveClass('active')
  expect(green).toHaveClass('active')
  fireEvent.click(blue)
  expect(changeFunction).toHaveBeenCalledTimes(1)
  expect(changeFunction).toHaveBeenCalledWith(true, 'blue')
  expect(red).not.toHaveClass('active')
  expect(blue).toHaveClass('active')
  expect(green).toHaveClass('active')
  fireEvent.click(green)
  expect(changeFunction).toHaveBeenCalledTimes(2)
  expect(changeFunction).toHaveBeenCalledWith(false, 'green')
  expect(red).not.toHaveClass('active')
  expect(blue).toHaveClass('active')
  expect(green).not.toHaveClass('active')
})

test('Input with FormText', async () => {
  const onSubmit = jest.fn()
  const text = 'Select your favorite color(s).'
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: {
          green: true
        }
      }}
      onSubmit={onSubmit}
    >
      <Choice multiple label='Color' formText={text}>
        <Option name='color.red' value='red'>Red</Option>
        <Option name='color.blue' value='blue'>Blue</Option>
        <Option name='color.green' value='green'>Green</Option>
      </Choice>
    </FormWrapper>
  )
  const formText = getByTestId('form-text')
  expect(formText.innerHTML).toBe(text)
})
