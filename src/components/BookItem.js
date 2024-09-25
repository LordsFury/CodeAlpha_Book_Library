import React, { useContext } from 'react';
import bookcontext from '../context/bookcontext';
import { useLocation } from 'react-router-dom';

const BookItem = (props) => {
    
    const context = useContext(bookcontext);
    const location=useLocation();
    const { deleteBook, addToShelf, removeFromShelf } = context;
    const { book, editBook } = props;
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    };
    const formattedDate = formatDate(book.date);
    const handleClick=()=>{
        if(location.pathname === '/shelf'){
            removeFromShelf(book);
        }
        else{
            addToShelf(book);
        }
    }
    return (
        <>
            <div style={{ width: '26.3rem' }}>
                <div className='card mx-1 my-2'>
                    <span className="badge rounded-pill text-bg-success" style={{
                        position: 'absolute', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginLeft: '21.1rem', width: '3rem', height: '3rem', borderRadius: '50%', textAlign: 'center',
                    }}>${book.price}</span>
                    <img src={`/images/${book.Image}`} className="card-img-top" alt="..." />
                    <div className={`card-body bg-${props.mode}`} style={{color: props.mode === 'light' ? 'black' : 'white'}}>
                        <h5 className="card-title" style={{ margin: '1px' }}>{book.title}</h5>
                        <h6 className="card-title" style={{ margin: '1px' }}>By {book.author}</h6>
                        <p className="card-text" style={{ margin: '1px' }}>{book.description}</p>
                        <p className="card-text" style={{ margin: '1px' }}>Published on: {formattedDate}</p>
                        {localStorage.getItem("admintoken") ? <div className='d-flex gap-5 my-1'>
                            <button className='btn btn-warning' onClick={() => { editBook(book) }}>Update</button>
                            <button className='btn btn-danger' onClick={() => { deleteBook(book._id) }}>Delete</button>
                        </div> : <div className='d-flex gap-5 my-1'>
                            <button className='btn btn-primary my-1' onClick={handleClick}>{location.pathname === '/shelf' ? "Remove from Shelf" : "Add to Shelf"}</button>
                            {location.pathname === '/shelf' ? <a className='btn btn-primary my-1' href={`https://en.wikipedia.org/wiki/${book.title}`} target="_blank" rel="noopener noreferrer">Read Book</a> : ""}
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookItem