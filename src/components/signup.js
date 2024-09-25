import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import AlertContext from '../context/alertcontext';

const Signup = (props) => {
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
    const [credentials, setcredentials] = useState({name: "",email: "", password: ""});
    const handleChange=(e)=>{
        setcredentials({
            ...credentials, [e.target.name]: e.target.value
        });
    }
    const host="http://localhost:5000";
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch(`${host}/user/signup`,{
            method: "POST",
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json=await response.json();
        if(json.success){
            localStorage.setItem("token", json.authToken);
            showAlert("success", "Account created Successfully!");
            history("/");
        }
        else{
            showAlert("danger", "Wrong credentials");
        }
    }
    return (
        <div className='d-flex justify-content-center' style={{ marginTop: '4rem' }}>
            <form className={`bg-${mode} p-5 rounded text-${mode === 'light' ? 'black' : 'white'}`} style={{ width: '500px' }} onSubmit={handleSubmit}>
                <h1 className='mb-4 text-center'>Create New Account</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold" style={{ fontSize: '1rem' }}>
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={credentials.name}
                        onChange={handleChange}
                        className={`form-control bg-${mode}`}
                        aria-describedby="emailHelp"
                        style={{ height: '50px', fontSize: '1rem', color: mode === 'light' ? 'black' : 'white' }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold" style={{ fontSize: '1rem' }}>
                        Email address
                    </label>
                    <input
                        type="email"
                        className={`form-control bg-${mode}`}
                        id="email"
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                        style={{ height: '50px', fontSize: '1.15rem', color: mode === 'light' ? 'black' : 'white' }}
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
                        style={{ height: '50px', fontSize: '1.15rem', color: mode === 'light' ? 'black' : 'white' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2" style={{ fontSize: '1.25rem', height: '50px' }}>
                    SignUp
                </button>
            </form>
        </div>
    )
}

export default Signup