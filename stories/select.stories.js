import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik'
import { Container, Row, Col, Button } from 'reactstrap'

import Select from '../src/Select'

import 'bootstrap/dist/css/bootstrap.css'

const validateRequired = (value) => {
  if (!value || value === '') {
    return 'Required';
  }
  return undefined;
}

const options = [
  { value: '', text: 'Select a Color' },
  { value: 'red', text: 'Red' },
  { value: 'blue', text: 'Blue' },
  { value: 'green', text: 'Green' }
] 

const options1 = [
  {value: 'red', text: 'Red'},
  {value: 'yellow', text: 'Yellow'},
  {value: 'blue', text: 'Blue'},
]
const options2 = [
  {value: '', text: ''},
  {value: 'orange', text: 'Orange', primary: 'red'},
  {value: 'purple', text: 'Purple', primary: 'blue'},
  {value: 'green', text: 'Green', primary: 'yellow'}
]

storiesOf('Select Input', module)
  .addDecorator(storyFn => (
    <Container fluid>
      <Row>
        <Col sm={4} className='my-2'>
          <Formik
            onSubmit={action('form-submitted')}
            initialValues={{color: 'blue', primary: 'blue'}}
            render={(props) => {
              return (
                <Form>
                  {storyFn(props)}
                  <Button>Submit</Button>
                </Form>
              )
            }}
          />
        </Col>
      </Row>
    </Container>
  ))
  .add('Options with children', () => (
    <Select name='color' label='Select A Color: '>
      <option value='red'>Red</option>
      <option value='blue'>Blue</option>
      <option value='green'>Green</option>
    </Select>
  ))
  .add('Options using array', () => ( 
    <Select options={options} name='color' label='Select A Color: ' />
  ))
  .add('Disabled', () => (
    <Select
      disabled
      options={options}
      name='color'
      label='Select A Color: '
    />
  )).add('Input Level Validation', () => (
    <Select
      options={options}
      validate={validateRequired}
      name='color'
      label='Select A Color: '
    />
  )).add('Cascading Dropdown', (props) => (
    <>
      <Select name='primary' options={options1} />
      <Select name='secondary' options={options2} filtered={options2.filter(opt => opt.primary === props.values.primary)} />
    </>
  ))
