
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik'
import { Container, Row, Col, Button } from 'reactstrap'
import * as yup from 'yup'

import { Input, DatePicker, Choice } from '../src'

import 'bootstrap/dist/css/bootstrap.css'

storiesOf('Yup Valiation Schema', module)
  .add('Yup Schema Validation', () => ( 
    <Container fluid>
      <Row>
        <Col sm={4} className='my-2'>
          <Formik
            onSubmit={action('form-submitted')}
            initialValues={{
              email: '',
              name: {
                first: '',
                last: ''
              }
            }}
            validationSchema={yup.object().shape({
              name: yup.object().shape({
                first: yup.string().required(),
                last: yup.string().required()
              }),
              email: yup.string().email().required(),
              dob: yup.date().max(new Date()).required(),
              color: yup.string().required()
            })}
            render={(props) => {
              console.log(props)
              return (
                <Form>
                  <Input
                    name='name.first'
                    label='First Name:'
                  />
                  <Input
                    name='name.last'
                    label='Last Name:'
                  />
                  <Input
                    name='email'
                    label='E-Mail:'
                  />
                  <DatePicker
                    name='dob'
                    label='Date Of Birth:'
                  />
                  <Choice name='color' label='Favorate Color:'>
                    <option value='blue' color='info'>Blue</option>
                    <option value='red' color='danger'>Red</option>
                    <option value='red' color='danger'>Yellow</option>
                  </Choice>
                  <Button>Submit</Button>
                </Form>
              )
            }}
          />
        </Col>
      </Row>
    </Container>
  ))