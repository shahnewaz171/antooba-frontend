import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import './AddProduct.css';

const AddProduct = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        mode: "all",
        reValidateMode: 'onChange'
    });
    const password = useRef();
    password.current = watch('password');

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
        // console.log(newInfo);
    }

    const handleImageUpload = (event) => {
        const newFile = event.target.files[0];
        setFile(newFile);
    }

    const onSubmit = () =>{
        const formData = new FormData()
      
        formData.append('file', file);
        formData.append('title', info.title);
        formData.append('description', info.description);

        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                reset();
                alert("Success")
            }
        })
        .catch(error => {
            console.error(error)
        })

    }


    return (
        <div className="text-center mt-5">
            <button onClick={openModal} className="btn btn-primary">Add Product</button>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="login-form signup-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group  mb-3">
                                <input type="file" onChange={handleImageUpload} className="form-control" name="image" required />
                            </div>
                            <div className="form-group  mb-3">
                                <input type="text" onChange={handleBlur} className="form-control" name="title" placeholder="Title" required />
                                
                            </div>
                            <div className="form-group  mb-3">
                                <input type="text" onChange={handleBlur} className="form-control" name="description" placeholder="Description" required />
                            </div>
                            <div className="form-group mb-3 pt-3">
                                <button type="submit" className="submit-btn text-center text-white fw-bolder text-uppercase add-btn" >Add Product</button>
                            </div>

                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default AddProduct;