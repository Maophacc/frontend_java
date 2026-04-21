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
        <footer className="section-footer bg-[#2D1B4D] text-white">
            <div className="container">
                <section className="footer-top padding-y-lg">
                    <div className="row">
                        <aside className="col-md-4 col-12">
                            <article className="mr-md-4">
                                <h5 className="title text-purple-300">Liên hệ</h5>
                                <p className="text-purple-100/70">Pastel Stationery - Nơi khởi nguồn đam mê học tập.</p>
                                <ul className="list-icon">
                                    <li className="d-flex align-items-center mb-2">
                                        <IonIcon icon={locationOutline} className="mr-2 text-purple-400" style={{ fontSize: '1.2rem' }} />
                                        <span>Số 123 Đường Bút Chì, Quận 1, TP. HCM</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-2">
                                        <IonIcon icon={mailOutline} className="mr-2 text-purple-400" style={{ fontSize: '1.2rem' }} />
                                        <span>hello@pastelstationery.vn</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-2">
                                        <IonIcon icon={callOutline} className="mr-2 text-purple-400" style={{ fontSize: '1.2rem' }} />
                                        <span>1900 1234 56</span>
                                    </li>
                                </ul>
                            </article>
                        </aside>
                        <aside className="col-md col-6">
                            <h5 className="title text-purple-300">Thông tin</h5>
                            <ul className="list-unstyled text-purple-100/80">
                                <li> <Link to="/about" className="hover:text-white">Về chúng tôi</Link></li>
                                <li> <Link to="/career" className="hover:text-white">Tuyển dụng</Link></li>
                                <li> <Link to="/store" className="hover:text-white">Tìm cửa hàng</Link></li>
                                <li> <Link to="/rules" className="hover:text-white">Điều khoản</Link></li>
                            </ul>
                        </aside>
                        <aside className="col-md col-6">
                            <h5 className="title text-purple-300">Dịch vụ</h5>
                            <ul className="list-unstyled text-purple-100/80">
                                <li> <Link to="/contact" className="hover:text-white">Liên hệ hỗ trợ</Link></li>
                                <li> <Link to="/refund" className="hover:text-white">Đổi trả hàng</Link></li>
                                <li> <Link to="/shipping" className="hover:text-white">Giao hàng</Link></li>
                            </ul>
                        </aside>
                        <aside className="col-md-4 col-12">
                            <h5 className="title text-purple-300">Ưu đãi mới nhất</h5>
                            <p className="text-purple-100/70 text-sm">Đăng ký để nhận các bộ sưu tập giới hạn sớm nhất.</p>
                            <form className="form-inline mb-3 mt-2">
                                <input type="text" placeholder="Email của bạn" className="border-0 w-auto form-control rounded-l-lg" name="" />
                                <button className="btn btn-primary rounded-l-none">Gói ngay</button>
                            </form>
                            <div className="flex gap-2">
                                <a href="#" className="w-10 h-10 rounded-full border border-purple-500 flex items-center justify-center hover:bg-purple-500 transition-colors"><IonIcon icon={logoFacebook} /></a>
                                <a href="#" className="w-10 h-10 rounded-full border border-purple-500 flex items-center justify-center hover:bg-purple-500 transition-colors"><IonIcon icon={logoInstagram} /></a>
                                <a href="#" className="w-10 h-10 rounded-full border border-purple-500 flex items-center justify-center hover:bg-purple-500 transition-colors"><IonIcon icon={logoYoutube} /></a>
                            </div>
                        </aside>
                    </div>
                </section>
                <section className="footer-bottom text-center py-4 border-t border-purple-800/30 mt-4">
                    <p className="text-purple-400 text-sm"> &copy; 2024 Pastel Stationery Shop. All rights reserved. </p>
                </section>
            </div>
        </footer>
    );
}

export default Footer;