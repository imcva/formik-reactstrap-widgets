import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik'
import { Container, Row, Col, Button } from 'reactstrap'

import {
  DatePicker,
  Input,
  Select
} from '../src';

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

storiesOf('All Input Fields', module)
  .add('Jane Doe', () => (
    <Container fluid>
      <Row>
        <Col sm={4} className='my-2'>
          <Formik
            onSubmit={action('form-submitted')}
            initialValues={{
              name: 'Jane Doe',
              birthday: '1/1/1900',
              gender: 'female'
            }}
            render={(props) => ( 
              <Form>
                <Input name='name' label='Name:' />
                <DatePicker name='birthday' label='Birthday:' />
                <Select name='gender' label='gender'>
                  <option value='female'>Female</option>
                  <option value='male'>Male</option>
                  <option value='other'>Other</option>
                </Select>
                <Button>Submit</Button>
              </Form>
            )}
          />
        </Col>
      </Row>
    </Container>
  ))