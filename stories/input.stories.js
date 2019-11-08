import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik'
import { Container, Row, Col, Button } from 'reactstrap'

import Input from '../src/Input'

import 'bootstrap/dist/css/bootstrap.css'

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

storiesOf('Text Input', module)
  .addDecorator(storyFn => (
    <Container fluid>
      <Row>
        <Col sm={4} className='my-2'>
          <Formik
            onSubmit={action('form-submitted')}
            initialValues={{testInput: '', secondaryInput: ''}}
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
  .add('Basic', () => <Input name='testInput' label='Test Input' />)
  .add('Disabled', () => <Input disabled name='testInput' label='Test Input' />)
  .add('Plaintext Input', () => <Input name='testInput' plaintext label='Password:' />)
  .add('Password Type Input', () => <Input name='testInput' type='password' label='Password:' />)
  .add('Input Level Validation', () => (
    <Input 
      name='testInput'
      label='E-Mail:'
      validate={validateEmail}
    />
  ))
  .add('Custom OnChange Method', () => (
    <>
      <Input name='testInput' type='number' label='Number' onChange={(value, formikOnChange, formik) => {
        formik.form.setFieldValue('secondaryInput', Number(value) * 2)
        formikOnChange(value)
      }} />
      <Input name='secondaryInput' type='number' label='Times Two' />
    </>
  ))
