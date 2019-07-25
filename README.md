# formik-reactstrap-widgets

[Reactstrap]() style [Formik]() form fields.

# Installation

```
npm install --save formik-reactstrap-widgets
```

## Dependencies

Installing formik-reactstrap-widgets does not include the following dependencies:

  - bootstrap css
  - formik
  - reactstrap
  - react
  - react-dom

Install these dependencies with the follwoing commands:

```
npm install --save boostrap reactstrap formik react react-dom
```

## Adding Bootstrap CSS

import Bootstrap CSS in the `src/index.js` file:

```
import 'bootstrap/dist/css/bootstrap.css'
```

Now you are ready to use the formik-reactstrap-widgets!

# Usage

All form fields can be used inside a Formik component

```
import React from 'react'
import { Formik, Form } from 'formik'
import { Button } from 'reactstrap'
import {
  Input,
  DatePicker,
  Select,
  Radio
} from 'formik-reactstrap-widgets'

const MyForm = (props) => ( 
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
        <Radio name='color' label='Favorite Color:'>
          <option value='red'>Red</option>
          <option value='green'>Green</option>
          <option value='blue'>Blue</option>
          <option value='other'>Other</option>
        </Radio>
        <Radio name='pet' button group label='Favorite Pet:'>
          <option value='dog'>Dog</option>
          <option value='cat'>Cat</option>
          <option value='fish'>Fish</option>
          <option value='other'>Other</option>
        </Radio>
        <Button>Submit</Button>
      </Form>
    )}
  />
)

default export MyForm
```