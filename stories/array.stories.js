import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Formik, Form, useField } from 'formik'
import { Label, Container, Row, Col, Button } from 'reactstrap'

import {
  Input,
  useFieldArray
} from '../src';

import 'bootstrap/dist/css/bootstrap.css'

const Statuses = () => {
  const [statuses, add ] = useFieldArray('statuses')
  return (
    <>
      <Row>
        <Col>
          <Label>Statuses</Label>
        </Col>
        <Col>
          <Button
            onClick={() => {
              add({})
            }}
          >
            + Add
          </Button>
        </Col>
      </Row>
      {statuses.map((item, index) => {
        return (
          <Row>
            <Col>
              <Input name={item.getName('name')} label='Name:' />
            </Col>
            <Col xs={1}>
              <a onClick={() => item.remove()}>x</a>
            </Col>
          </Row>
        )
      })}
    </>
  )
}

storiesOf('Arrays', module)
  .add('Basic Input Array', () => {
    return (
      <Container fluid>
        <Row>
          <Col sm={4} className='my-2'>
            <Formik
              onSubmit={action('form-submitted')}
              initialValues={{
                statuses: []
              }}
            >
              {props => {
                return (
                  <Form>
                    <Statuses />
                  </Form>
                )
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    )
  })