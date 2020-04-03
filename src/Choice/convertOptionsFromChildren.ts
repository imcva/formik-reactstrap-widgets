import React from 'react'

const convertOptionsFromChildren = <O extends {}>(opts: Array<O> | undefined, children: React.ReactNode | undefined): Array<O> => {
  if (opts) {
    return opts
  } else if (children) {
    let options
    if (React.isValidElement(children)) {
      options = {...children.props, text: children.props.children}
    } else {
      options = React.Children.map(children, (child: React.Component) => {
        if (child) {
          return {...child.props, text: child.props.children, children: undefined}
        }
        return null
      })
    }
    return Array.isArray(options) ? options : new Array(options)
  } else {
    return []
  }
}

export default convertOptionsFromChildren