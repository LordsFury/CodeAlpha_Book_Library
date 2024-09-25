import React, { useContext, useState } from 'react';
import { useLocation,Link, useNavigate } from 'react-router-dom';
import bookcontext from '../context/bookcontext';

const Navbar = (props) => {
    let {mode, toggleMode}=props;
    let location=useLocation();
    let history=useNavigate();
    const context=useContext(bookcontext);
    const {searchBook}=context;
    const [Search, setSearch] = useState("");
    const handleChange=(e)=>{
        setSearch(e.target.value);
        searchBook(e.target.value);
    }
    const handleLogout=()=>{
        if(localStorage.getItem("token")){
            localStorage.removeItem('token');
            history("/login");
        }
        if(localStorage.getItem("admintoken")){
            localStorage.removeItem('admintoken');
            history("/adlogin");
        }
    }

    return (
        <nav className={`navbar navbar-expand-lg bg-${mode} navbar-${mode} fixed-top`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">LibraryPlus</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/home'}?active: ""`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        {location.pathname === '/shelf' ? "" : <li className="nav-item">
                            <Link className="nav-link" to="/fiction">Fiction</Link>
                        </li>}
                        {location.pathname === '/shelf' ? "" : <li className="nav-item">
                            <Link className="nav-link" to="/biography">Biography</Link>
                        </li>}
                        {location.pathname === '/shelf' ? "" : <li className="nav-item">
                            <Link className="nav-link" to="/poetry">Poetry</Link>
                        </li>}
                        {location.pathname === '/shelf' ? "" : <li className="nav-item">
                            <Link className="nav-link" to="/history">History</Link>
                        </li>}
                        {location.pathname === '/shelf' ? "" : <li className="nav-item">
                            <Link className="nav-link" to="/novel">Novel</Link>
                        </li>}
                        {location.pathname === '/shelf' ? "" : <li className="nav-item">
                            <Link className="nav-link" to="/comics">Comics</Link>
                        </li>}
                        {location.pathname === '/shelf' ? "" : <li className="nav-item">
                            <Link className="nav-link" to="/technology">Technology</Link>
                        </li>}
                        {location.pathname === '/shelf' ? "" : <li className="nav-item">
                            <Link className="nav-link" to="/drama">Drama</Link>
                        </li>}
                        {(localStorage.getItem("admintoken")) ? <li className='nav-item'>
                            <Link className='nav-link' to="/addbook">Add Book</Link>
                        </li> : ""}
                        {(localStorage.getItem("token")) ? <li className='nav-item'>
                            <Link className='nav-link' to="/shelf">My Shelf</Link>
                        </li> : ""}
                    </ul>
                    {(location.pathname==="/login" || location.pathname==="/signup" || location.pathname==="/adlogin" || location.pathname==="/addbook") ? "" : <form className="d-flex mx-3" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name='search' id='search' value={Search} onChange={handleChange} />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>}
                </div>
                <div className={`form-check form-switch mx-3 text-${mode === 'light' ? 'black' : 'white'}`}>
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={toggleMode} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{`Enable ${mode==='light' ? 'dark' : 'light'} Mode`}</label>
                </div>
                {!(localStorage.getItem('token') || localStorage.getItem('admintoken')) ? <form>
                    <Link className='btn btn-primary mx-1' role='button' to="/login">Login</Link>
                    <Link className='btn btn-primary mx-1' role='button' to="/signup">SignUp</Link>
                    <Link className='btn btn-primary mx-1' role='button' to="/adlogin">Admin</Link>
                </form> : <div className='d-flex'>
                            {localStorage.getItem("token") ? <form>
                                <Link className='btn btn-warning mx-3' role='button' to="/edit">Edit Profile</Link>
                            </form> : ""}
                            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </div>}
            </div>
        </nav>
    )
}

export default Navbar