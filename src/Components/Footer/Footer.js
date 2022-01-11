import React from 'react';
import { AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import './Footer.css'

const Footer = () => {
    return (
        <div>
            <div className="footer__component py-3 mt-5">
                <div className="footer_main py-3 w-75 mx-auto">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="footer-menu py-2 mx-5">
                                <h6 className="my-3 footer-header"> Menu </h6>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#privacy"> About US </a>
                                    </li>
                                    <li>
                                        <a href="#cookies"> Privacy Policy </a>
                                    </li>
                                    <li>
                                        <a href="#purchasing"> Purchasing Policy </a>
                                    </li>
                                    <li>
                                        <a href="#terms"> Terms &amp; Conditions </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mx-5 px-4 py-2">
                                <h6 className="my-3 footer-header">Contact Us</h6>
                                <p>A: New York City, USA</p>
                                <p>App: Viber, Whatsapp</p>
                                <p>E: royal.motor@gmail.com</p>
                                <p>P: +8801711111111</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="social-icons py-2 text-center">
                                <h6 className="my-3 pb-2 footer-header">Get in Touch</h6>
                                <a href="https://facebook.com" className="social_bg facebook-bg">
                                    <FaFacebookF />
                                </a>
                                <a href="https://iastagram.com" className="social_bg instagram-bg">
                                    <AiOutlineInstagram />
                                </a>
                                <a href="https://youtube.com" className="social_bg youtube-bg">
                                    <AiOutlineYoutube />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <p className="text-center pt-3">
                    &copy; 2021 All rights reserved.
                </p>

            </div>
        </div>
    );
};

export default Footer;