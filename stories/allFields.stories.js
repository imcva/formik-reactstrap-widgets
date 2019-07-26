import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik'
import { Container, Row, Col, Button } from 'reactstrap'

import {
  DatePicker,
  Input,
  Select,
  Choice
} from '../src';

import 'bootstrap/dist/css/bootstrap.css'

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
                <Select name='gender' label='Gender:'>
                  <option value='female'>Female</option>
                  <option value='male'>Male</option>
                  <option value='other'>Other</option>
                </Select>
                <Choice name='color' label='Favorite Color:'>
                  <option value='red'>Red</option>
                  <option value='green'>Green</option>
                  <option value='blue'>Blue</option>
                  <option value='other'>Other</option>
                </Choice>
                <Choice multiple name='pet' button group label='Favorite Pets (Multiple):'>
                  <option name='dog-favorite' value='dog'>Dog</option>
                  <option name='cat-favorite' value='cat'>Cat</option>
                  <option name='fish-favorite' value='fish'>Fish</option>
                  <option name='other-favorite' value='other'>Other</option>
                </Choice>
                <Button>Submit</Button>
              </Form>
            )}
          />
        </Col>
      </Row>
    </Container>
  ))