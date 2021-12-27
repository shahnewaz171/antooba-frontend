import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import './Login.css';

const Login = () => {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [disable, setDisable] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        mode: "all", 
        reValidateMode: 'onChange'
    });
    const toastId = useRef(null);
    const password = useRef();
    password.current = watch('password');

    const handleBlur = (e) => {
        const userInfo = { ...user };
        userInfo[e.target.name] = e.target.value;
        setUser({ ...userInfo })
    }

    let { from } = location.state || { from: { pathname: "/home" }};


    const onSubmit = data => {
        const formData = new FormData();
      
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);

        if(!login && user.email && user.password){
            setTimeout(() => {
                axios.post('https://lit-garden-34641.herokuapp.com/signup', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    if(res.data.error){
                        setDisable(false);
                        toast.dismiss(toastId.current);
                        toast.error(res.data.error, {
                            theme: "dark",
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 3000
                        });
                    }
                    else{
                        setDisable(false);
                        toast.success("Success", {
                            theme: "dark",
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 3000
                        });
                        reset();
                        setLogin(true);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
            }, 1000);
            setDisable(true);
        }
        else if(login){
            setTimeout(() => {
                axios.post('https://lit-garden-34641.herokuapp.com/login', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    if(res.data.error){
                        setDisable(false);
                        toast.dismiss(toastId.current);
                        toast.error(res.data.error, {
                            theme: "dark",
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 3000
                        });
                    }
                    else{
                        setDisable(false);
                        toast.success("User Authorized", {
                            theme: "dark",
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 3000
                        });
                        const { token } = res.data;
                        window.localStorage.setItem('jwtToken', token);
                        window.localStorage.setItem('userInfo', JSON.stringify(res.data?.user));
                        history.replace(from);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
            }, 1000);
            setDisable(true);
        }
    };


    return (
        <>
            <div className="login-signup">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="tab-menu">
                                <div className="nav nav-tabs">
                                    <p to="/signup" onClick={() => {reset(); setLogin(false)}}className={"nav-item nav-link "+ (!login ? "active" : "")}>
                                        Register
                                    </p>
                                    <p to="/login" onClick={() => {reset(); setLogin(true)}} className={"nav-item nav-link "+ (login ? "active" : "")}>
                                        Login
                                    </p>
                                </div>
                            </div>
                            <div className="tab-content">
                                <div className="login-area signup-area bg-white">
                                    <div className="header-area mb-4 text-center">
                                        <h4 className="title fw-bolder text-uppercase">{!login ? "Signup Now" : "Login Now"}</h4>
                                    </div>
                                    <div className="login-form signup-form">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                        {!login && <div className="form-group  mb-3">
                                                <input type="name" {...register("name", { required: true })} onBlur={(e) =>  handleBlur(e)} className="form-control" name="name" placeholder="Full Name" />
                                                {errors.name && <span className="text-danger">This field is required</span>}
                                            </div>}
                                            <div className="form-group  mb-3">
                                                <input type="email" {...register("email", { required: true })} onChange={(e) =>  handleBlur(e)} className="form-control" name="email" placeholder="Email Address" autoComplete="off" />
                                                {errors.email && <span className="text-danger">This field is required</span>}
                                            </div>
                                            <div className="form-group  mb-3">
                                                <input type="password" {...register("password", { required: true })} onBlur={(e) =>  handleBlur(e)} className="form-control" name="password" placeholder="Password" />
                                                {errors.password && <span className="text-danger">This field is required</span>}
                                            </div>
                                            {!login && <div className="form-group  mb-3">
                                                <input type="password" {...register("c_password", { required: true, validate: (value) => value === password.current })} onBlur={(e) =>  handleBlur(e)} name="c_password" placeholder="Confirm Password" className="form-control" />
                                                {errors.c_password && errors.c_password.type === "required" && <span className="text-danger">This field is required</span>}
                                                {errors.c_password && errors.c_password.type === "validate" && <span className="text-danger">Password does not match</span>}
                                            </div>}
                                            <div className="form-group mb-3 pt-3">
                                                {!login && <button disabled={disable} type="submit" className={"submit-btn text-center text-white fw-bolder "+ (disable ? "bg-secondary" : "")} >{ disable ? "Registering...": "Register" }</button>
                                                }
                                                {login && <button disabled={disable} type="submit" className={"submit-btn text-center text-white fw-bolder "+ (disable ? "bg-secondary" : "")} >{ disable ? "Signing In...": "Sign In" }</button>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                <ToastContainer />
            }
        </>
    );
};

export default Login;