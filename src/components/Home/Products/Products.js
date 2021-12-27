import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../Loading.jsx';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://lit-garden-34641.herokuapp.com/products")
        .then(res => {
            if (res) {
                setProducts(res.data);
                console.log(res);
            }
        })
        .catch(error => "");
    }, [])


    return (
        <div className="mb-4 mt-5 products">
            <div className="container">
                <div className="section-top mb-3">
                    <h2 className="section-title mb-0 position-relative d-inline-block">Products</h2>
                </div>
                {products.length > 0 ? 
                    <div className="px-2 row">
                        {products.map(item => {
                            return (
                                <div key={item._id} className="col-lg-4 col-md-4 col-6">
                                    <div className="product-wrapper text-center py-2">
                                        <div className="card">
                                            <img src={`data:image/jpeg;base64,${item.image.img}`} className="card-img-top img-fluid" alt="product" />
                                            <div className="card-body mt-2">
                                                <h5 className="card-title">{item.title}</h5>
                                                <p>{item.price}</p>
                                                <button className="btn btn-primary mt-2">Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    : <Loading />
                }
            </div>
        </div>
    );
};

export default Products;