
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik'
import { Container, Row, Col, Button } from 'reactstrap'
import * as yup from 'yup'

import Input from '../src/Input'

import 'bootstrap/dist/css/bootstrap.css'

storiesOf('Yup Valiation Schema', module)
  .add('Yup Schema Validation', () => ( 
    <Container fluid>
      <Row>
        <Col sm={4} className='my-2'>
          <Formik
            onSubmit={action('form-submitted')}
            initialValues={{email: ''}}
            validationSchema={yup.object().shape({
              email: yup.string().email()
            })}
            render={(props) => {
              return (
                <Form>
                  <Input
                    name='email'
                    label='E-Mail:'
                  />
                  <Button>Submit</Button>
                </Form>
              )
            }}
          />
        </Col>
      </Row>
    </Container>
  ))