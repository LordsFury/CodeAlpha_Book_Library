import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alertcontext';

const Admin = (props) => {
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
        const response=await fetch(`${host}/admin/adlogin`, {
            method: "POST",
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json=await response.json();
        if(json.success){
            localStorage.setItem('admintoken', json.adminToken);
            showAlert("success", "Admin LoggedIn successfully!");
            history("/books");
        }
        else{
            showAlert("danger", "Invalid Credentials");
        }
    }
    return (
        <div className='d-flex justify-content-center' style={{ marginTop: '8rem' }}>
            <form onSubmit={handleSubmit} className={`bg-${mode} p-5 rounded text-${mode === 'light' ? 'black' : 'white'}`} style={{ width: '500px' }}>
                <h1 className='mb-4 text-center'>Admin Login</h1>
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
                        style={{ height: '50px', fontSize: '1rem', color: mode === 'light' ? 'black' : 'white'  }}
                    />
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
                        style={{ height: '50px', fontSize: '1rem', color: mode === 'light' ? 'black' : 'white'  }}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2" style={{ fontSize: '1.25rem', height: '50px' }}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Admin