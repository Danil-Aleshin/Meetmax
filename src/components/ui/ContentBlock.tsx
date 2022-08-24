import React from 'react'

interface propsContentBlock{
  className?:string,
  children:JSX.Element,
  name?:string,
}

const ContentBlock:React.FC<propsContentBlock> = ({className,children}) => {
  return (
    <div className={'p-4 rounded-xl bg-white dark:bg-lightBlack inline-block drop-shadow-md ' + className}>
      {children}
    </div>
  )
}

export default ContentBlock