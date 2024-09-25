import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import AlertContext from '../context/alertcontext';

const Login = (props) => {
    let {mode}=props;
    const context=useContext(AlertContext);
    const {showAlert}=context;
    useEffect(() => {
        document.body.classList.add("img")
        return()=>{
          document.body.classList.remove("img")
        }
      }, [])
    let history=useNavigate();
    const [credentials, setcredentials] = useState({email: "", password: ""});
    const handleChange=(e)=>{
        setcredentials({
            ...credentials, [e.target.name]: e.target.value
        });
    }
    const host="http://localhost:5000";
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch(`${host}/user/login`, {
            method: "POST",
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json=await response.json();
        if(json.success){
            localStorage.setItem('token', json.authToken);
            showAlert("success", "User LoggedIn successfully!");
            history("/");
        }
        else{
            showAlert("danger", "Invalid Credentials");
        }
    }
    return (
        <div className='d-flex justify-content-center' style={{ marginTop: '8rem' }}>
            <form onSubmit={handleSubmit} className={`bg-${mode} p-5 rounded text-${mode === 'light' ? 'black' : 'white'}`} style={{ width: '500px' }}>
                <h1 className='mb-4 text-center'>Login Your Account</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label fw-bold" style={{ fontSize: '1rem' }}>
                        Email address
                    </label>
                    <input
                        type="email"
                        className={`form-control bg-${mode}`}
                        id="emai"
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                        style={{ height: '50px', fontSize: '1rem', color: mode === 'light' ? 'black' : 'white' }}
                    />
                    <div id="emailHelp" className={`form-text text-${mode === 'light' ? 'dark' : 'light'}`} style={{ fontSize: '.75rem' }}>
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold" style={{ fontSize: '1rem' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        className={`form-control bg-${mode}`}
                        id="password"
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                        style={{ height: '50px', fontSize: '1rem', color: mode === 'light' ? 'black' : 'white' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2" style={{ fontSize: '1.25rem', height: '50px' }}>
                    Login
                </button>
            </form>
        </div>
    )
}
export default Login