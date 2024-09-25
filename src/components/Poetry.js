import React from 'react'
import Books from './Books'

const Poetry = (props) => {
  let {mode}=props;
  return (
    <Books mode={mode} />
  )
}

export default Poetry