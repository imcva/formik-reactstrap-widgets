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

import { Checkbox } from '../src/Choice'

import 'bootstrap/dist/css/bootstrap.css'

const validateRequired = (value) => {
  if (!value || value === '') {
    return 'This field is required'
  } else {
    return null
  }
}

storiesOf('Checkbox Input', module)
  .addDecorator(storyFn => (
    <Container fluid>
      <Row>
        <Col sm={4} className='my-2'>
          <Formik
            onSubmit={action('form-submitted')}
            initialValues={{
              plaintextBasicCheckbox: {
                1: {
                  blue: true,
                  red: true,
                  gree: false
                },
                2: {
                  blue: true,
                  red: true,
                  gree: false
                }
              },
              plaintextButtonCheckbox: {
                1: {
                  blue: true,
                  red: true,
                  gree: false
                },
                2: {
                  blue: true,
                  red: true,
                  gree: false
                },
                3: {
                  blue: true,
                  red: true,
                  gree: false
                }
              }
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
  .add('Basic Checkbox w/ Validation', () => (
    <>
      <Checkbox label='Select Your Favorite Colors (Required):' multiple validate={validateRequired}>
        <option name='basicCheckbox.blue' value='blue' color='info'>Blue</option>
        <option name='basicCheckbox.green' value='green' color='info'>Green</option>
        <option name='basicCheckbox.red' value='red' color='danger'>Red</option>
      </Checkbox>
      <Checkbox label='Select Your Favorite Colors (Required):' multiple disabled>
        <option name='allDisabled-blue' value='blue' color='info'>Blue</option>
        <option name='allDisabled-green' value='green' color='info'>Green</option>
        <option name='allDisabled-blue' value='red' color='danger'>Red</option>
      </Checkbox>
      <Checkbox label='Select Your Favorite Colors (Required):' multiple>
        <option name='singleDisabled-blue' value='blue' color='info' disabled>Blue</option>
        <option name='singleDisabled-green' value='green' color='info' validate={validateRequired}>Green</option>
        <option name='singleDisabled-red' value='red' color='danger' validate={validateRequired}>Red</option>
      </Checkbox>
    </>
  ))
  .add('Plaintext Basic Checkbox', () => (
    <>
      <Checkbox label='Select Your Favorite Colors (Required):' multiple plaintext>
        <option name='plaintextBasicCheckbox.1.blue' value='blue' color='info'>Blue</option>
        <option name='plaintextBasicCheckbox.1.green' value='green' color='info'>Green</option>
        <option name='plaintextBasicCheckbox.1.red' value='red' color='danger'>Red</option>
      </Checkbox>
      <Checkbox label='Select Your Favorite Colors (Required):' multiple plaintext>
        <option name='plaintextBasicCheckbox.2.blue' value='blue' color='info'>Blue</option>
        <option name='plaintextBasicCheckbox.2.green' value='green' color='info'>Green</option>
        <option name='plaintextBasicCheckbox.2.red' value='red' color='danger'>Red</option>
      </Checkbox>
    </>
  ))
  .add('Plaintext Button Checkbox', () => (
    <>
      <Checkbox label='Regular Buttons:' multiple plaintext button>
        <option name='plaintextButtonCheckbox.1.blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='plaintextButtonCheckbox.1.green' value='green' color='info' className='mx-1'>Green</option>
        <option name='plaintextButtonCheckbox.1.red' value='red' color='danger' className='mx-1'>Red</option>
      </Checkbox>
      <Checkbox label='Group Buttons:' multiple plaintext button group>
        <option name='plaintextButtonCheckbox.2.blue' value='blue' color='info'>Blue</option>
        <option name='plaintextButtonCheckbox.2.green' value='green' color='info'>Green</option>
        <option name='plaintextButtonCheckbox.2.red' value='red' color='danger'>Red</option>
      </Checkbox>
      <Checkbox label='Block Buttons:' multiple plaintext button block>
        <option name='plaintextButtonCheckbox.3.blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='plaintextButtonCheckbox.3.green' value='green' color='info' className='mx-1'>Green</option>
        <option name='plaintextButtonCheckbox.3.red' value='red' color='danger' className='mx-1'>Red</option>
      </Checkbox>
    </>
  ))
  .add('Buttons w/ Validation', () => (
    <>
      <Checkbox label='Regular Buttons:' multiple button validate={validateRequired}>
        <option name='regular-blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='regular-green' value='green' color='info' className='mx-1'>Green</option>
        <option name='regular-red' value='red' color='danger' className='mx-1'>Red</option>
      </Checkbox>
      <Checkbox label='Group Buttons:' multiple button group validate={validateRequired}>
        <option name='group-blue' value='blue' color='info'>Blue</option>
        <option name='group-green' value='green' color='info'>Green</option>
        <option name='group-red' value='red' color='danger'>Red</option>
      </Checkbox>
      <Checkbox label='Block Buttons:' multiple button block validate={validateRequired}>
        <option name='block-blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='block-green' value='green' color='info' className='mx-1'>Green</option>
        <option name='block-red' value='red' color='danger' className='mx-1'>Red</option>
      </Checkbox>
    </>
  ))
  .add('All Buttons Disabled', () => (
    <>
      <Checkbox label='Regular Buttons:' multiple disabled button>
        <option name='regular-blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='regular-green' value='green' color='info' className='mx-1'>Green</option>
        <option name='regular-red' value='red' color='danger' className='mx-1'>Red</option>
      </Checkbox>
      <Checkbox label='Group Buttons' multiple disabled button group>
        <option name='group-blue' value='blue' color='info'>Blue</option>
        <option name='group-green' value='green' color='info'>Green</option>
        <option name='group-red' value='red' color='danger'>Red</option>
      </Checkbox>
      <Checkbox label='Block Buttons:' multiple disabled button block>
        <option name='block-blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='block-green' value='green' color='info' className='mx-1'>Green</option>
        <option name='block-red' value='red' color='danger' className='mx-1'>Red</option>
      </Checkbox>
    </>
  ))
  .add('Single Buttons Disabled', () => (
    <>
      <Checkbox label='Regular Buttons:' multiple button validate={validateRequired}>
        <option name='regular-blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='regular-green' value='green' color='info' className='mx-1'>Green</option>
        <option name='regular-red' value='red' color='danger' className='mx-1'>Red</option>
      </Checkbox>
      <Checkbox label='Group Buttons:' multiple button group validate={validateRequired}>
        <option name='group-blue' value='blue' color='info' disabled>Blue</option>
        <option name='group-green' value='green' color='info'>Green</option>
        <option name='group-red' value='red' color='danger'>Red</option>
      </Checkbox>
      <Checkbox label='Block Buttons:' multiple button block validate={validateRequired}>
        <option name='block-blue' value='blue' color='info' className='mx-1' disabled>Blue</option>
        <option name='block-green' value='green' color='info' className='mx-1'>Green</option>
        <option name='block-red' value='red' color='danger' className='mx-1'>Red</option>
      </Checkbox>
    </>
  ))
