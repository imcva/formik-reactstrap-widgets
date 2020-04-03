import React, { useState, useContext, createContext } from 'react'

interface IGlobalProps {
  [key: string]: any
}

const GlobalPropsContext = createContext<IGlobalProps>({
  globalProps: {},
  setGlobalProps: (props: any) => {return;}
}) 

const GlobalPropsProvider: React.FC = (props) => {
  const [ globalProps, setGlobalProps ] = useState(props)

  return (
    <GlobalPropsContext.Provider value={{ globalProps, setGlobalProps }}>
      {props.children}
    </GlobalPropsContext.Provider>
  )

}

const useGlobalProps = () => {
  return useContext(GlobalPropsContext)
}

export { GlobalPropsContext, GlobalPropsProvider, useGlobalProps }