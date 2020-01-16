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

import Choice, { Option } from '../src/Choice'

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
      <Choice label='Select Your Favorite Colors (Required):' multiple validate={validateRequired}>
        <option name='basicCheckbox.blue' value='blue' color='info'>Blue</option>
        <option name='basicCheckbox.green' value='green' color='info'>Green</option>
        <option name='basicCheckbox.red' value='red' color='danger'>Red</option>
      </Choice>
      <Choice label='Select Your Favorite Colors (Required):' multiple disabled>
        <option name='allDisabled-blue' value='blue' color='info'>Blue</option>
        <option name='allDisabled-green' value='green' color='info'>Green</option>
        <option name='allDisabled-blue' value='red' color='danger'>Red</option>
      </Choice>
      <Choice label='Select Your Favorite Colors (Required):' multiple>
        <option name='singleDisabled-blue' value='blue' color='info' disabled>Blue</option>
        <option name='singleDisabled-green' value='green' color='info' validate={validateRequired}>Green</option>
        <option name='singleDisabled-red' value='red' color='danger' validate={validateRequired}>Red</option>
      </Choice>
    </>
  ))
  .add('FormText', () => (
    <>
      <Choice name='basicRadio' label='Color' formText='Select your favorite color(s).' multiple>
        <option name='basicCheckbox.blue' value='blue' color='info'>Blue</option>
        <option name='basicCheckbox.green' value='green' color='info'>Green</option>
        <option name='basicCheckbox.red' value='red' color='danger'>Red</option>
      </Choice>
    </>
  ))
  .add('Plaintext Basic Checkbox', () => (
    <>
      <Choice label='Select Your Favorite Colors (Required):' multiple plaintext>
        <option name='plaintextBasicCheckbox.1.blue' value='blue' color='info'>Blue</option>
        <option name='plaintextBasicCheckbox.1.green' value='green' color='info'>Green</option>
        <option name='plaintextBasicCheckbox.1.red' value='red' color='danger'>Red</option>
      </Choice>
      <Choice label='Select Your Favorite Colors (Required):' multiple plaintext>
        <option name='plaintextBasicCheckbox.2.blue' value='blue' color='info'>Blue</option>
        <option name='plaintextBasicCheckbox.2.green' value='green' color='info'>Green</option>
        <option name='plaintextBasicCheckbox.2.red' value='red' color='danger'>Red</option>
      </Choice>
    </>
  ))
  .add('Plaintext Button Checkbox', () => (
    <>
      <Choice label='Regular Buttons:' multiple plaintext button>
        <option name='plaintextButtonCheckbox.1.blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='plaintextButtonCheckbox.1.green' value='green' color='info' className='mx-1'>Green</option>
        <option name='plaintextButtonCheckbox.1.red' value='red' color='danger' className='mx-1'>Red</option>
      </Choice>
      <Choice label='Group Buttons:' multiple plaintext button group>
        <option name='plaintextButtonCheckbox.2.blue' value='blue' color='info'>Blue</option>
        <option name='plaintextButtonCheckbox.2.green' value='green' color='info'>Green</option>
        <option name='plaintextButtonCheckbox.2.red' value='red' color='danger'>Red</option>
      </Choice>
      <Choice label='Block Buttons:' multiple plaintext button block>
        <option name='plaintextButtonCheckbox.3.blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='plaintextButtonCheckbox.3.green' value='green' color='info' className='mx-1'>Green</option>
        <option name='plaintextButtonCheckbox.3.red' value='red' color='danger' className='mx-1'>Red</option>
      </Choice>
    </>
  ))
  .add('Buttons w/ Validation', () => (
    <>
      <Choice label='Regular Buttons:' multiple button validate={validateRequired}>
        <option name='regular-blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='regular-green' value='green' color='info' className='mx-1'>Green</option>
        <option name='regular-red' value='red' color='danger' className='mx-1'>Red</option>
      </Choice>
      <Choice label='Group Buttons:' multiple button group validate={validateRequired}>
        <option name='group-blue' value='blue' color='info'>Blue</option>
        <option name='group-green' value='green' color='info'>Green</option>
        <option name='group-red' value='red' color='danger'>Red</option>
      </Choice>
      <Choice label='Block Buttons:' multiple button block validate={validateRequired}>
        <option name='block-blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='block-green' value='green' color='info' className='mx-1'>Green</option>
        <option name='block-red' value='red' color='danger' className='mx-1'>Red</option>
      </Choice>
    </>
  ))
  .add('All Buttons Disabled', () => (
    <>
      <Choice label='Regular Buttons:' multiple disabled button>
        <option name='regular-blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='regular-green' value='green' color='info' className='mx-1'>Green</option>
        <option name='regular-red' value='red' color='danger' className='mx-1'>Red</option>
      </Choice>
      <Choice label='Group Buttons' multiple disabled button group>
        <option name='group-blue' value='blue' color='info'>Blue</option>
        <option name='group-green' value='green' color='info'>Green</option>
        <option name='group-red' value='red' color='danger'>Red</option>
      </Choice>
      <Choice label='Block Buttons:' multiple disabled button block>
        <option name='block-blue' value='blue' color='info' className='mx-1'>Blue</option>
        <option name='block-green' value='green' color='info' className='mx-1'>Green</option>
        <option name='block-red' value='red' color='danger' className='mx-1'>Red</option>
      </Choice>
    </>
  ))
  .add('Single Buttons Disabled', () => (
    <>
      <Choice label='Regular Buttons:' multiple button validate={validateRequired}>
        <Option name='regular-blue' value='blue' color='info' className='mx-1'>Blue</Option>
        <Option name='regular-green' value='green' color='info' className='mx-1'>Green</Option>
        <Option name='regular-red' value='red' color='danger' className='mx-1'>Red</Option>
      </Choice>
      <Choice label='Group Buttons:' multiple button group validate={validateRequired}>
        <Option name='group-blue' value='blue' color='info' disabled>Blue</Option>
        <Option name='group-green' value='green' color='info'>Green</Option>
        <Option name='group-red' value='red' color='danger'>Red</Option>
      </Choice>
      <Choice label='Block Buttons:' multiple button block validate={validateRequired}>
        <Option name='block-blue' value='blue' color='info' className='mx-1' disabled>Blue</Option>
        <Option name='block-green' value='green' color='info' className='mx-1'>Green</Option>
        <Option name='block-red' value='red' color='danger' className='mx-1'>Red</Option>
      </Choice>
    </>
  ))
