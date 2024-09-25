import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import AlertContext from '../context/alertcontext';

const EditProfile = (props) => {
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
    const [newcredentials, setnewcredentials] = useState({nname: "",nemail: "",ppassword:"", npassword: ""});
    const handleChange=(e)=>{
        setnewcredentials({
            ...newcredentials, [e.target.name]: e.target.value
        });
    }
    const host="http://localhost:5000";
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch(`${host}/user/editprofile`,{
            method: "POST",
            body: JSON.stringify({nname: newcredentials.nname, nemail: newcredentials.nemail,ppassword: newcredentials.ppassword, npassword: newcredentials.npassword}),
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem("token")
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
        <div className='d-flex justify-content-center' style={{ marginTop: '2rem' }}>
            <form className={`bg-${mode} p-5 rounded text-${mode === 'light' ? 'black' : 'white'}`} style={{ width: '500px' }} onSubmit={handleSubmit}>
                <h1 className='mb-4 text-center'>Edit Your Account</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold" style={{ fontSize: '1rem' }}>
                        Name
                    </label>
                    <input
                        type="text"
                        name="nname"
                        id="nname"
                        value={newcredentials.nname}
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
                        id="nemail"
                        name='nemail'
                        value={newcredentials.nemail}
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
                        Previous Password
                    </label>
                    <input
                        type="password"
                        className={`form-control bg-${mode}`}
                        id="ppassword"
                        name='ppassword'
                        value={newcredentials.ppassword}
                        onChange={handleChange}
                        style={{ height: '50px', fontSize: '1.15rem', color: mode === 'light' ? 'black' : 'white' }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold" style={{ fontSize: '1rem' }}>
                        New Password
                    </label>
                    <input
                        type="password"
                        className={`form-control bg-${mode}`}
                        id="npassword"
                        name='npassword'
                        value={newcredentials.npassword}
                        onChange={handleChange}
                        style={{ height: '50px', fontSize: '1.15rem', color: mode === 'light' ? 'black' : 'white' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2" style={{ fontSize: '1.25rem', height: '50px' }}>
                    Update
                </button>
            </form>
        </div>
    )
}

export default EditProfile