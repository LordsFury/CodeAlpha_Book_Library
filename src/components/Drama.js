import React from 'react'
import Books from './Books'

const Drama = (props) => {
  let {mode}=props;
  return (
    <Books mode={mode} />
  )
}

export default Drama