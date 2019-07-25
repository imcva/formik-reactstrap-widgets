import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik'
import { 
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  FormGroup,
  Label
} from 'reactstrap'

import Radio from '../src/Radio'

import 'bootstrap/dist/css/bootstrap.css'

const validateRequired = (value) => {
  if (!value || value === '') {
    return 'This field is required'
  } else {
    return null
  }
}

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

storiesOf('Radio Input', module)
  .addDecorator(storyFn => (
    <Container fluid>
      <Row>
        <Col sm={4} className='my-2'>
          <Formik
            onSubmit={action('form-submitted')}
            initialValues={{
              basicRadio: '',
              basicRadioAllDisabled: '',
              basicRadioSingleDisabled: '',
              regularButtons: '',
              groupButtons: '',
              blockButtons: ''
            }}
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
  .add('Basic Radio w/ Validation', () => (
    <>
      <Radio name='basicRadio' label='Select a Color (Required):' validate={validateRequired}>
        <option value='blue' color='info'>Blue</option>
        <option value='red' color='danger'>Red</option>
      </Radio>
      <Radio name='basicRadioAllDisabled' label='Select a Color (Required):' disabled>
        <option value='blue' color='info'>Blue</option>
        <option value='red' color='danger'>Red</option>
      </Radio>
      <Radio name='basicRadioSingleDisabled' label='Select a Color (Required):'>
        <option value='blue' color='info' disabled>Blue</option>
        <option value='red' color='danger'>Red</option>
      </Radio>
    </>
  ))
  .add('Buttons w/ Validation', () => (
    <>
      <Radio name='regularButtons' label='Regular Buttons:' button validate={validateRequired}>
        <option value='blue' color='info' className='mx-1'>Blue</option>
        <option value='red' color='danger' className='mx-1'>Red</option>
      </Radio>
      <Radio name='groupButtons' label='Group Buttons:' button group validate={validateRequired}>
        <option value='blue' color='info'>Blue</option>
        <option value='red' color='danger'>Red</option>
      </Radio>
      <Radio name='blockButtons' label='Block Buttons:' button block validate={validateRequired}>
        <option value='blue' color='info' className='mx-1'>Blue</option>
        <option value='red' color='danger' className='mx-1'>Red</option>
      </Radio>
    </>
  ))
  .add('All Buttons Disabled', () => (
    <>
      <Radio name='regularButtons' label='Regular Buttons:' disabled button validate={validateRequired}>
        <option value='blue' color='info' className='mx-1'>Blue</option>
        <option value='red' color='danger' className='mx-1'>Red</option>
      </Radio>
      <Radio name='groupButtons' label='Group Buttons' disabled button group validate={validateRequired}>
        <option value='blue' color='info'>Blue</option>
        <option value='red' color='danger'>Red</option>
      </Radio>
      <Radio name='blockButtons' label='Block Buttons:' disabled button block validate={validateRequired}>
        <option value='blue' color='info' className='mx-1'>Blue</option>
        <option value='red' color='danger' className='mx-1'>Red</option>
      </Radio>
    </>
  ))
  .add('Single Buttons Disabled', () => (
    <>
      <Radio name='regularButtons' label='Regular Buttons:' button validate={validateRequired}>
        <option value='blue' color='info' className='mx-1' disabled>Blue</option>
        <option value='red' color='danger' className='mx-1'>Red</option>
      </Radio>
      <Radio name='groupButtons' label='Group Buttons:' button group validate={validateRequired}>
        <option value='blue' color='info' disabled>Blue</option>
        <option value='red' color='danger'>Red</option>
      </Radio>
      <Radio name='blockButtons' label='Block Buttons:' button block validate={validateRequired}>
        <option value='blue' color='info' className='mx-1' disabled>Blue</option>
        <option value='red' color='danger' className='mx-1'>Red</option>
      </Radio>
    </>
  ))
