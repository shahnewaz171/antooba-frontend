import React, { useRef, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Redirect, useHistory, useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [getUser, setGetUser] = useState([]);
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

    // useEffect(() => {
    //     let mounted = true;
    //     axios.get("http://localhost:5000/users")
    //         .then(res => {
    //             if (mounted && res) {
    //                 setGetUser(res.data);
    //             }
    //         })
    //         .catch(error => "")
    //     return () => {
    //         mounted = false
    //     }
    // }, [login])


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
                axios.post('http://localhost:5000/signup', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    if(res){
                        setDisable(false);
                        toast.success("Success!", {
                            theme: "dark",
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 2000
                        });
                        reset();
                        setLogin(true);
                        console.log(res);
                    }
                })
                .catch(error => {
                    console.error(error)
                })
            }, 1000);
            setDisable(true);
        }
        else if(login){

            // window.localStorage.setItem("userInfo",  JSON.stringify(singleUser));
            // history.replace(from);
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
                                                <button disabled={disable} type="submit" className={"submit-btn text-center text-white fw-bolder text-uppercase "+ (disable ? "bg-secondary" : "")} >{!login ? "Register" : "Login"}</button>
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