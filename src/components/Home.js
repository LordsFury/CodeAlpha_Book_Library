import React from 'react'
import Books from './Books'

const Home = (props) => {
  let {mode} =props;
  return (
    <Books mode={mode} />
  )
}

export default Home