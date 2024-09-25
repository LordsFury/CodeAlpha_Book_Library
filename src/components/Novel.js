import React from 'react'
import Books from './Books'

const Novel = (props) => {
  let {mode}=props;
  return (
    <Books mode={mode} />
  )
}

export default Novel