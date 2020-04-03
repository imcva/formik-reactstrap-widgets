import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  wait
} from '@testing-library/react'
import { Formik, Form } from 'formik'
import 'jest-dom/extend-expect'

import Select from '../Select'

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

test('Basic Select With Children', async () => {
  const onSubmit = jest.fn()
  const labelText = 'Color: '
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: 'green'
      }}
      onSubmit={onSubmit}
    >
      <Select name='color' label={labelText}>
        <option value='red'>Red</option>
        <option value='blue'>Blue</option>
        <option value='green'>Green</option>
      </Select>
    </FormWrapper>
  )
  const label = getByTestId('input-label')
  const input = getByTestId('field-input')
  const form = getByTestId('form')
  expect(label.innerHTML).toBe(labelText)
  expect(input.value).toBe('green')
  const newValue = 'blue'
  fireEvent.change(input, { target: { value: newValue } })
  expect(input.value).toBe(newValue)
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ color: newValue }, expect.any(Object))
  })
})

test('Test First Value and Options Reset', async () => {
  const onSubmit = jest.fn()
  const options1 = [
    {value: 'red', text: 'Red'},
    {value: 'yellow', text: 'Yellow'},
    {value: 'blue', text: 'Blue'},
  ]
  const options2 = [
    {value: 'orange', text: 'Orange', primary: 'red'},
    {value: 'purple', text: 'Purple', primary: 'blue'},
    {value: 'green', text: 'Green', primary: 'yellow'}
  ]
  const { getByTestId } = render(
    <Formik onSubmit={onSubmit} initialValues={{}}>
      {(props) => {
        return (
          <Form data-testid='form'>
            <Select name='primary' options={options1} inputProps={{'data-testid': 'primary-input'}} />
            <Select name='secondary' options={options2} filtered={options2.filter(opt => props.values ? opt.primary === props.values.primary : false)} inputProps={{'data-testid': 'secondary-input'}} />
          </Form>
        )
      }}
    </Formik>
  )
  const form = getByTestId('form')
  const primary = getByTestId('primary-input')
  const secondary = getByTestId('secondary-input')
  expect(primary.value).toBe('red')
  expect(secondary.value).toBe('orange')
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ primary: 'red', secondary: 'orange' }, expect.any(Object))
  })
})

test('Basic Select With Options Prop', async () => {
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
      <Select name='color' options={options} />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  const form = getByTestId('form')
  expect(input.value).toBe('green')
  const newValue = 'blue'
  fireEvent.change(input, { target: { value: newValue } })
  expect(input.value).toBe(newValue)
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ color: newValue }, expect.any(Object))
  })
})

test('Disabled Input', async () => {
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
      <Select disabled name='color' options={options} />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  expect(input).toBeDisabled()
}
)
test('Plaintext Input', async () => {
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
      <Select plaintext name='color' options={options} />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  expect(input).toHaveClass('form-control-plaintext')
  expect(input).toHaveAttribute('readonly')
})

test('Input Level Validation', async () => {
  const onSubmit = jest.fn()
  const options = [
    {value: '', text: 'N/A'},
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
      <Select name='color' options={options} validate={validateRequired} />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  const form = getByTestId('form')
  fireEvent.submit(form)
  await wait(() => {
    expect(input.value).toBe('')
    expect(input).toHaveClass('is-invalid')
    const invalidText = getByTestId('invalid-text')
    expect(invalidText).toBeVisible()
  })
})

test('Render empty options', async () => {
  const onSubmit = jest.fn()
  const options = []
  const { getByTestId } = render(
    <FormWrapper 
      initialValues={{
        color: ''
      }}
      onSubmit={onSubmit}
    >
      <Select name='color' options={options} />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  const form = getByTestId('form')
  fireEvent.submit(form)
  await wait(() => {
    expect(input.value).toBe('')
  })
})

test('Input Props', async () => {
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
      <Select name='color' options={options} inputProps={{ alt: 'Test Alt' }} />
    </FormWrapper>
  )
  const input = getByTestId('field-input')
  expect(input).toHaveAttribute('alt', 'Test Alt')
})

test('Custom onChange Event', async () => {
  const onSubmit = jest.fn()
  const onChangeMethod = jest.fn()
  const options = [
    {value: 'red', text: 'Red'},
    {value: 'yellow', text: 'Yellow'},
    {value: 'blue', text: 'Blue'},
  ]
  const { getByTestId } = render(
    <Formik onSubmit={onSubmit} initialValues={{}} >
      {props => {
        return (
          <Form data-testid='form'>
            <Select name='primary' onChange={(value, formikOnChange) => {
              onChangeMethod(value)
              formikOnChange(value)
            }} options={options} inputProps={{ 'data-testid': 'primary-input' }} />
          </Form>
        )
      }}
    </Formik>
  )
  const form = getByTestId('form')
  const primary = getByTestId('primary-input')
  fireEvent.change(primary, { target: { value: 'blue' } })
  expect(onChangeMethod).toHaveBeenCalledTimes(1)
  expect(primary.value).toBe('blue')
  fireEvent.submit(form)
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ primary: 'blue' }, expect.any(Object))
  })
})
