import React from 'react'
import { ButtonGroup, FormGroup } from 'reactstrap'
// @ts-ignore
import className from 'classname'
import OptionLevelErrors, { OptionLevelErrorsProps } from './OptionLevelErrors'

interface GroupProps extends OptionLevelErrorsProps {
  group: boolean
}

const Group: React.FC<GroupProps> = (props) => {
  if (props.group) {
    return (
      <FormGroup>
        <ButtonGroup>
          {props.children}
        </ButtonGroup>
        <OptionLevelErrors
          options={props.options}
          multiple={props.multiple}
          fieldProps={props.fieldProps}
        />
      </FormGroup>
    )
  }
  return (
    <div>
      {props.children}
      <OptionLevelErrors {...props} />
    </div>
  )
}

export default Group
export { GroupProps }
