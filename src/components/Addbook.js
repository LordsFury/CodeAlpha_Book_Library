import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bookContext from '../context/bookcontext';

const Addbook = (props) => {
    let {mode}=props;
    const context = useContext(bookContext);
    const { addBook } = context;
    const [info, setinfo] = useState({
        title: "",
        author: "",
        category: "",
        description: "",
        price: "",
        Image: null
    });

    const handleChange = (e) => {
        if (e.target.name === 'Image') {
            setinfo({
                ...info,
                Image: e.target.files[0]
            });
        } else {
            setinfo({
                ...info,
                [e.target.name]: e.target.value
            });
        }
    };

    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        addBook(info.title, info.author, info.category, info.description, info.price, info.Image);
        setinfo({
            title: "",
            author: "",
            category: "",
            description: "",
            price: "",
            Image: null
        });
        history("/books");
    };

    return (
        <div className='d-flex py-5'>
            <div style={{marginLeft: '4rem'}}>
                <Link className='btn btn-success px-3' to="/books">Back</Link>
            </div>
            <div className='container'>
                <form className={`bg-${mode} p-4 rounded`} onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="title" className="form-label">Book Title</label>
                        <input type="text" className={`form-control bg-${props.mode}`} style={{color: mode === 'light' ? 'black' : 'white'}} id="title" value={info.title} onChange={handleChange} name='title' />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="author" className="form-label">Author Name</label>
                        <input type="text" className={`form-control bg-${props.mode}`} style={{color: mode === 'light' ? 'black' : 'white'}} id="author" value={info.author} onChange={handleChange} name='author' />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className={`form-control bg-${props.mode}`} style={{color: mode === 'light' ? 'black' : 'white'}} id="category" value={info.category} onChange={handleChange} name='category' />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className={`form-control bg-${props.mode}`} style={{color: mode === 'light' ? 'black' : 'white'}} id="description" value={info.description} onChange={handleChange} name='description' rows="2"></textarea>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="text" className={`form-control bg-${props.mode}`} style={{color: mode === 'light' ? 'black' : 'white'}} id="price" value={info.price} onChange={handleChange} name='price' />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="Image" className="form-label">Cover Image</label>
                        <input className={`form-control bg-${props.mode}`} style={{color: mode === 'light' ? 'black' : 'white'}} type="file" id="Image" onChange={handleChange} name='Image' />
                    </div>
                    <button type="submit" className="btn btn-primary my-2">
                        Publish
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addbook;
