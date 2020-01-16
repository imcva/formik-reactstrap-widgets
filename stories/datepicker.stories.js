import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik'
import { Container, Row, Col, Button } from 'reactstrap'

import DatePicker from '../src/DatePicker';

import 'bootstrap/dist/css/bootstrap.css'

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

storiesOf('DatePicker Input', module)
  .addDecorator(storyFn => (
    <Container fluid>
      <Row>
        <Col sm={4} className='my-2'>
          <Formik
            onSubmit={action('form-submitted')}
            initialValues={{testInput: ''}}
            render={(props) => {
              return (
                <Form>
                  {storyFn()}
                  <Button>Submit</Button>
                </Form>
              )
            }}
          />
        </Col>
      </Row>
    </Container>
  ))
  .add('Basic Date Only', () => <DatePicker name='testInput' label='Test Input' />)
  .add('FormText', () => <DatePicker name='testInput' label='Test Input' formText='This is a FormText label' />)
  .add('Date and Time', () => (
    <DatePicker 
      name='testInput'
      label='Test Input'
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  ))
  .add('Time Only', () => (
    <DatePicker 
      name='testInput'
      label='Test Input'
      showTimeSelect
      showTimeSelectOnly
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="h:mm aa"
    />
  ))
  .add('Disabled', () => <DatePicker disabled name='testInput' label='Test Input' />)
  .add('Plaintext', () => <DatePicker plaintext name='testInput' label='Test Input' />)
  .add('Input Level Validation', () => (
    <DatePicker 
      name='testInput'
      label='Date:'
      validate={validateBetweenDates}
    />
  ))
  .add('Custom onChange Method', () => (
    <>
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
    </>
  ))
