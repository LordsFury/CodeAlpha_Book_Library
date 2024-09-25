import React from 'react'
import Books from './Books'

const Comics = (props) => {
  let {mode}=props;
  return (
    <Books mode={mode} />
  )
}

export default Comics