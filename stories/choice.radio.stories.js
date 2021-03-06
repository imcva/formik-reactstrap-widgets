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

import { Radio } from '../src/Choice'

import 'bootstrap/dist/css/bootstrap.css'

const validateRequired = (value) => {
  if (!value || value === '') {
    return 'This field is required'
  } else {
    return null
  }
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
              plaintextBasicRadios: {
                1: 'red',
                2: 'red'
              },
              plaintextButtonRadios: {
                1: 'blue',
                2: 'blue',
                3: 'blue'
              },
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
  .add('Plaintext Basic Radio', () => (
    <>
      <Radio name='plaintextBasicRadios.1' label='Select a Color (Required):' value='red' plaintext>
        <option value='blue' color='info'>Blue</option>
        <option value='red' color='danger'>Red</option>
      </Radio>
      <Radio name='plaintextBasicRadios.2' value='blue' label='Select a Color (Required):'>
        <option value='red' color='danger'>Red</option>
        <option value='blue' color='info' plaintext>Blue</option>
      </Radio>
    </>
  ))
  .add('Plaintext Button Radio', () => (
    <>
      <Radio name='plaintextButtonRadios.1' label='Select a Color (Required):' value='red' plaintext button>
        <option value='blue' color='info' className='mx-1'>Blue</option>
        <option value='red' color='danger' className='mx-1'>Red</option>
      </Radio>
      <Radio name='plaintextButtonRadios.2' value='blue' label='Select a Color (Required):' plaintext button group>
        <option value='red' color='danger'>Red</option>
        <option value='blue' color='info'>Blue</option>
      </Radio>
      <Radio name='plaintextButtonRadios.3' value='blue' label='Select a Color (Required):' plaintext button block>
        <option value='red' color='danger'>Red</option>
        <option value='blue' color='info'>Blue</option>
      </Radio>
    </>
  ))
  .add('Buttons w/ Validation', () => (
    <>
      <Radio name='regularButtons' label='Regular Buttons:' button>
        <option value='blue' color='info' className='mx-1'>Blue</option>
        <option value='red' color='danger' className='mx-1'>Red</option>
      </Radio>
      <Radio name='groupButtons' label='Group Buttons:' outline button group validate={validateRequired}>
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
  .add('Button Group Block', () => (
    <>
      <Radio name='regularButtons' label='Regular Buttons:' button group block validate={validateRequired} className={{'my-2': false}}>
        <option value='blue' color='info'>Blue</option>
        <option value='red' color='danger'>Red</option>
      </Radio>
    </>
  ))
