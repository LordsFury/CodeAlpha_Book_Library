import React, { useContext, useEffect, useRef, useState } from 'react';
import bookcontext from '../context/bookcontext';
import BookItem from './BookItem';
import AlertContext from '../context/alertcontext';
import { useLocation } from 'react-router-dom';

const Books = (props) => {
    const location=useLocation();
    const context = useContext(bookcontext);
    const alcontext=useContext(AlertContext);
    const {showAlert}=alcontext;
    const { books, filterBooks, getBooks, updateBook, getReleventBooks } = context;
    const ref=useRef(null);
    const refClose=useRef(null);
    const [info, setinfo] = useState({id: "", etitle: "",eauthor: "",ecategory: "",edescription: "",eprice: "",eImage: null});
    
    useEffect(() => {
        if(location.pathname === '/' || location.pathname === '/books'){
            getBooks();
        }
        else{
            getReleventBooks();
        }
        // eslint-disable-next-line
    }, [])
    const handleChange=(e)=>{
        if(e.target.name==='eImage'){
            setinfo({
                ...info,eImage:e.target.files[0]
            });
        }
        else{
            setinfo({
                ...info,[e.target.name]: e.target.value
            });
        }
    }
    const handleClick=(e)=>{
        updateBook(info.id,info.etitle,info.eauthor,info.ecategory,info.edescription,info.eprice,info.eImage);
        refClose.current.click();
        showAlert("success", "Book Updated successfully");
    }
    const editBook=(currentBook)=>{
        ref.current.click();
        setinfo({id: currentBook._id,etitle: currentBook.title, eauthor: currentBook.author, ecategory: currentBook.category, edescription: currentBook.description,eprice: currentBook.price,eImage: currentBook.Image});
    }
    return (
        <div className='container-fluid my-2'>
            <button style={{display: 'none'}} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content bg-${props.mode}`}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Book</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ filter: props.mode === 'dark' ? 'invert(1)' : 'none' }}></button>

                        </div>
                        <form className={`bg-${props.mode} p-4 rounded`}>
                            <div className="mb-1">
                                <label htmlFor="etitle" className="form-label">Book Title</label>
                                <input type="text" className={`form-control bg-${props.mode}`} style={{color: props.mode === 'light' ? 'black' : 'white'}} id="etitle" name='etitle' value={info.etitle} onChange={handleChange} />
                            </div>
                            <div className="mb-1">
                                <label htmlFor="eauthor" className="form-label">Author Name</label>
                                <input type="text" className={`form-control bg-${props.mode}`} style={{color: props.mode === 'light' ? 'black' : 'white'}} id="eauthor" name='eauthor' value={info.eauthor} onChange={handleChange} />
                            </div>
                            <div className="mb-1">
                                <label htmlFor="ecategory" className="form-label">Category</label>
                                <input type="text" className={`form-control bg-${props.mode}`} style={{color: props.mode === 'light' ? 'black' : 'white'}} id="ecategory" name='ecategory' value={info.ecategory} onChange={handleChange} />
                            </div>
                            <div className="mb-1">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <textarea className={`form-control bg-${props.mode}`} style={{color: props.mode === 'light' ? 'black' : 'white'}} id="edescription" name='edescription' value={info.edescription} onChange={handleChange} rows="2"></textarea>
                            </div>
                            <div className="mb-1">
                                <label htmlFor="eprice" className="form-label">Price</label>
                                <input type="text" className={`form-control bg-${props.mode}`} style={{color: props.mode === 'light' ? 'black' : 'white'}} id="eprice" name='eprice' value={info.eprice} onChange={handleChange} />
                            </div>
                            <div className="mb-1">
                                <label htmlFor="eImage" className="form-label">Cover Image</label>
                                <input className={`form-control bg-${props.mode}`} style={{color: props.mode === 'light' ? 'black' : 'white'}} type='file' name='eImage' id='eImage' onChange={handleChange} />
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={info.etitle.length===0 || info.eauthor.length===0 || info.ecategory.length<3 || info.edescription.length<5 || info.eprice.length===0 || !info.eImage} type="button" className="btn btn-primary" onClick={handleClick}>Update Book</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='container'>
                    {books.length === 0 && "No Books to display"}
                </div>
                {filterBooks.map((book) => {
                    return <BookItem key={book._id} book={book} showAlert={props.showAlert} editBook={editBook} mode= {props.mode} />
                })}
            </div>
        </div>
    )
}

export default Books