import React from 'react'
import Books from './Books'

const History = (props) => {
  let {mode}=props;
  return (
    <Books mode={mode} />
  )
}

export default History