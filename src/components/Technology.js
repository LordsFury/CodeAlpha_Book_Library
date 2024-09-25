import React from 'react'
import Books from './Books'

const Technology = (props) => {
  let {mode}=props;
  return (
    <Books mode={mode} />
  )
}

export default Technology