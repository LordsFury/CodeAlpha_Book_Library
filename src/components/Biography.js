import React from 'react'
import Books from './Books'

const Biography = (props) => {
  let {mode} =props;
  return (
    <Books mode={mode} />
  )
}

export default Biography