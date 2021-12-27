import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Sidebar from '../Sidebar/Sidebar';
import './AddProduct.css';

const AddService = () => {
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const toastId = useRef(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "all", 
        reValidateMode: 'onChange'
    });

    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const onSubmit = () =>{
        const formData = new FormData()
        formData.append('file', file);
        formData.append('title', info.title);
        formData.append('price', info.price);

        axios.post('https://lit-garden-34641.herokuapp.com/addProduct', formData)
        .then(res => {
            if(res){
                toast.dismiss(toastId.current);
                toast.success("Product successfully added!", {
                    theme: "dark",
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 3000
                });
                reset();
            }
        })
        .catch(error => {
            console.error(error);
        })

    }

    const handleImageUpload = (event) => {
        const newFile = event.target.files[0];
        setFile(newFile);
        
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;

    return (
        <>
            {
               <Sidebar></Sidebar>
            }
             <div className="title">
                <h3 className="title-name">Add Product</h3>
                {
                    userInfo == null ? "" : userInfo.email ? <h5>{userInfo.name == null ? userInfo.email : userInfo.name}</h5> : ''
                }
            </div>
            <div className="addProduct-info">
                <div className="mx-5 mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-white border-radius">
                            <div className="row mx-lg-2 pad">
                                <div className="col-12 col-md-6 form-group mb-4">
                                    <label className="font-600 mb-2">Product Title</label>
                                    <input {...register("title", { required: true })} onChange={handleBlur} name="title"  className="form-control"/>
                                    {errors.title && <span className="text-danger">This field is required</span>}
                                </div>

                                <div className="col-12 col-md-6 form-group mb-4">
                                    <label className="font-600 mb-2">Price</label>
                                    <input type="number" {...register("price", { required: true })} onChange={handleBlur}  name="price" className="form-control"/>
                                    {errors.price && <span className="text-danger">This field is required</span>}
                                </div>

                                <div className="col-12 col-md-6 form-group mb-4">
                                    <label className="font-600 mb-2">Add Photo</label>
                                    <input {...register("image", { required: true })} onChange={handleImageUpload} type="file" name="image" className="custom-file-input form-control"/>
                                    {errors.image && <span className="text-danger">This field is required</span>}
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 d-inline-block">
                           <button className="btn btn-style submitBtn px-3 text-white" type="submit">Submit</button>
                        </div>
                    </form>   
                </div>
            </div>
            {
                <ToastContainer />
            }
        </>
    );
};

export default AddService;