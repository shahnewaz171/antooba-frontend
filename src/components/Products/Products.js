import React, { useEffect, useState } from 'react';
import localImage from '../localImages';
import axios from 'axios';
import './Products.css';

const Products = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        let mounted = true;
        axios.get("http://localhost:5000/products")
            .then(res => {
                if (mounted && res) {
                    setProduct(res.data);
                }
            })
            .catch(error => "")
        return () => {
            mounted = false
        }
    }, [])


    return (
        <div className="mb-4 mt-5 products">
            <div className="container">
                <div className="section-top mb-3">
                    <h2 className="section-title mb-0 position-relative d-inline-block">Products</h2>
                </div>
                <div className="px-2 row">
                    {product.map(item => {
                        return (
                            <div key={item._id} className="col-lg-4 col-md-4 col-6">
                                <div className="product-wrapper text-center py-2">
                                    <div className="card">
                                        <img src={`data:image/jpeg;base64,${item.image.img}`} className="card-img-top img-fluid" alt="product" />
                                        <div className="card-body mt-2">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p>{item.description}</p>
                                            <button className="btn btn-primary mt-2">Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Products;