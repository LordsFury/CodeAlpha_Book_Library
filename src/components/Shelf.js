import React, { useContext, useEffect } from 'react';
import Books from './Books';
import bookcontext from '../context/bookcontext';

const Shelf = (props) => {
  let {mode}=props;
  const context=useContext(bookcontext);
  const {getshelfbooks}=context;

  useEffect(() => {
    getshelfbooks();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
      <Books mode={mode} />
    </div>
  )
}

export default Shelf