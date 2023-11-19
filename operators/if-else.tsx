import React, { ReactNode } from 'react'

interface IfElseProps {
  condition: boolean
  children?: ReactNode
  elseChildren?: ReactNode
}

const IfElse: React.FC<IfElseProps> = ({
  condition,
  children,
  elseChildren,
}) => {
  if (condition) {
    return <>{children}</>
  }
  return <>{elseChildren}</>
}

export default IfElse
