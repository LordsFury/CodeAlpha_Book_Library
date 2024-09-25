import React from 'react'
import Books from './Books'

const Fiction = (props) => {
  let {mode}=props;
  return (
    <Books mode={mode} />
  )
}

export default Fiction