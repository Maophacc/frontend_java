import React from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
    locationOutline,
    mailOutline,
    callOutline,
    timeOutline,
    logoFacebook,
    logoTwitter,
    logoInstagram,
    logoYoutube
} from 'ionicons/icons';

const Footer = () => {
    return (
        <footer className="section-footer bg-[#222222] text-[#cccccc]">
            {/* Newsletter Section (Top of Footer) */}
            <div className="border-b border-[#333333] py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <h4 className="text-white font-bold mb-1 tracking-wide">SIGN UP FOR NEWSLETTER</h4>
                            <p className="text-sm m-0">Get the latest updates on new products and upcoming sales</p>
                        </div>
                        <div className="col-md-6">
                            <form className="d-flex w-100">
                                <input type="email" placeholder="Your email address..." className="form-control rounded-0 border-0 px-4 py-3 bg-[#333333] text-white focus:outline-none" />
                                <button className="btn text-white font-bold px-4 rounded-0 uppercase tracking-widest hover:bg-[#d65c6d] transition-colors" style={{ backgroundColor: "#e97081" }}>Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <section className="footer-top py-5">
                    <div className="row">
                        <aside className="col-md-4 col-12 mb-4 mb-md-0">
                            <article className="mr-md-4">
                                <h5 className="title text-white font-bold mb-4 uppercase tracking-wide">Contact Us</h5>
                                <ul className="list-icon list-unstyled text-sm leading-loose">
                                    <li className="d-flex align-items-start mb-3">
                                        <IonIcon icon={locationOutline} className="mr-3 text-[#e97081] mt-1" style={{ fontSize: '1.2rem' }} />
                                        <span>Leo Stationero HQ, 123 Designer Street, New York, NY 10001</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                        <IonIcon icon={mailOutline} className="mr-3 text-[#e97081]" style={{ fontSize: '1.2rem' }} />
                                        <span className="hover:text-[#e97081] cursor-pointer transition-colors">support@leostationero.com</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                        <IonIcon icon={callOutline} className="mr-3 text-[#e97081]" style={{ fontSize: '1.2rem' }} />
                                        <span>(+84) 123 456 789</span>
                                    </li>
                                </ul>
                            </article>
                        </aside>
                        <aside className="col-md col-6">
                            <h5 className="title text-white font-bold mb-4 uppercase tracking-wide">Information</h5>
                            <ul className="list-unstyled text-sm leading-loose">
                                <li className="mb-2"> <Link to="/about" className="text-[#cccccc] hover:text-[#e97081] transition-colors no-underline">About Us</Link></li>
                                <li className="mb-2"> <Link to="/career" className="text-[#cccccc] hover:text-[#e97081] transition-colors no-underline">Careers</Link></li>
                                <li className="mb-2"> <Link to="/store" className="text-[#cccccc] hover:text-[#e97081] transition-colors no-underline">Store Locator</Link></li>
                                <li className="mb-2"> <Link to="/rules" className="text-[#cccccc] hover:text-[#e97081] transition-colors no-underline">Terms & Conditions</Link></li>
                            </ul>
                        </aside>
                        <aside className="col-md col-6">
                            <h5 className="title text-white font-bold mb-4 uppercase tracking-wide">Customer Service</h5>
                            <ul className="list-unstyled text-sm leading-loose">
                                <li className="mb-2"> <Link to="/contact" className="text-[#cccccc] hover:text-[#e97081] transition-colors no-underline">Contact Support</Link></li>
                                <li className="mb-2"> <Link to="/refund" className="text-[#cccccc] hover:text-[#e97081] transition-colors no-underline">Returns & Exchanges</Link></li>
                                <li className="mb-2"> <Link to="/shipping" className="text-[#cccccc] hover:text-[#e97081] transition-colors no-underline">Shipping Info</Link></li>
                                <li className="mb-2"> <Link to="/faq" className="text-[#cccccc] hover:text-[#e97081] transition-colors no-underline">FAQ</Link></li>
                            </ul>
                        </aside>
                        <aside className="col-md-3 col-12 mt-4 mt-md-0">
                            <h5 className="title text-white font-bold mb-4 uppercase tracking-wide">Follow Us</h5>
                            <div className="d-flex gap-3 mt-2">
                                <a href="#" className="w-10 h-10 rounded-full bg-[#333333] text-white flex items-center justify-center hover:bg-[#e97081] transition-colors"><IonIcon icon={logoFacebook} /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#333333] text-white flex items-center justify-center hover:bg-[#e97081] transition-colors"><IonIcon icon={logoInstagram} /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#333333] text-white flex items-center justify-center hover:bg-[#e97081] transition-colors"><IonIcon icon={logoTwitter} /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#333333] text-white flex items-center justify-center hover:bg-[#e97081] transition-colors"><IonIcon icon={logoYoutube} /></a>
                            </div>
                        </aside>
                    </div>
                </section>
                <section className="footer-bottom text-center py-4 border-t border-[#333333] mt-2">
                    <p className="text-sm m-0"> &copy; {new Date().getFullYear()} Leo Stationero Demo. All rights reserved. </p>
                </section>
            </div>
        </footer>
    );
}

export default Footer;