import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import localImages from "../localImages";
import './HeaderBanner.css';

const HeaderBanner = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    };

    return (
        <>
            <div className="container mt-4">
                <div className="header-banner-slider">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={localImages.bannerImg1} className="d-block w-100" alt="..." />
                                <div className="carousel-caption d-md-block dark-overlay">
                                   <div className="banner-details px-5">
                                    <h2 className="text-uppercase">Antooba Pvt Ltd Bangladesh</h2>
                                        <p>As Antooba Technologies Ltd is a Tech-based Company so we propose each consumer</p>
                                   </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={localImages.bannerImg2} className="d-block w-100" alt="..." />
                                <div className="carousel-caption d-md-block dark-overlay">
                                   <div className="banner-details px-5">
                                    <h2 className="text-uppercase">Antooba Pvt Ltd Bangladesh</h2>
                                        <p>Antooba provide the best App for any user</p>
                                   </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={localImages.bannerImg3} className="d-block w-100" alt="..." />
                                <div className="carousel-caption d-none d-md-block dark-overlay">
                                   <div className="banner-details px-5">
                                    <h2 className="text-uppercase">Antooba Pvt Ltd Bangladesh</h2>
                                        <p>In the modern era, Website is one of the most popular technology for make a business easier</p>
                                   </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderBanner;