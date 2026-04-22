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
        <footer className="section-footer" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
            {/* Newsletter Section (Top of Footer) */}
            <div style={{ borderBottom: '1px solid var(--border-color)' }} className="py-4 py-md-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <h4 className="font-weight-bold mb-1 tracking-wide" style={{ color: 'var(--text-primary)' }}>ĐĂNG KÝ NHẬN TIN</h4>
                            <p className="text-sm m-0" style={{ color: 'var(--text-secondary)' }}>Nhận cập nhật mới về sản phẩm và ưu đãi sắp tới</p>
                        </div>
                        <div className="col-md-6">
                            <form className="d-flex w-100 gap-0">
                                <input 
                                    type="email" 
                                    placeholder="Địa chỉ email của bạn..." 
                                    className="form-control rounded-0 border-0 px-3 px-md-4 py-2 py-md-3"
                                    style={{
                                        backgroundColor: 'var(--bg-primary)',
                                        color: 'var(--text-primary)',
                                        flex: 1
                                    }}
                                />
                                <button 
                                    className="btn text-white font-weight-bold px-3 px-md-4 rounded-0 uppercase tracking-widest" 
                                    style={{ 
                                        backgroundColor: 'var(--primary-color)',
                                        transition: 'all var(--transition-fast)'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-deep)'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
                                >
                                    Đăng ký
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <section className="footer-top py-4 py-md-5">
                    <div className="row">
                        <aside className="col-md-4 col-12 mb-4 mb-md-0">
                            <article className="mr-md-4">
                                <h5 className="title font-weight-bold mb-3 mb-md-4 uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>Liên Hệ Chúng Tôi</h5>
                                <ul className="list-icon list-unstyled text-sm" style={{ lineHeight: '1.8' }}>
                                    <li className="d-flex align-items-start mb-3">
                                        <IonIcon icon={locationOutline} className="mr-3 flex-shrink-0 mt-1" style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }} />
                                        <span style={{ color: 'var(--text-secondary)' }}>Leo Stationero, 123 Đường Designer, New York, NY 10001</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                        <IonIcon icon={mailOutline} className="mr-3 flex-shrink-0" style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }} />
                                        <a href="mailto:support@leostationero.com" className="text-decoration-none" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>support@leostationero.com</a>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                        <IonIcon icon={callOutline} className="mr-3 flex-shrink-0" style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }} />
                                        <a href="tel:+84123456789" className="text-decoration-none" style={{ color: 'var(--text-secondary)' }}>(+84) 123 456 789</a>
                                    </li>
                                </ul>
                            </article>
                        </aside>
                        <aside className="col-md col-6">
                            <h5 className="title font-weight-bold mb-3 mb-md-4 uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>Thông Tin</h5>
                            <ul className="list-unstyled text-sm" style={{ lineHeight: '1.8' }}>
                                <li className="mb-2"> <Link to="/about" className="text-decoration-none" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Về Chúng Tôi</Link></li>
                                <li className="mb-2"> <Link to="/career" className="text-decoration-none" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Cơ Hội Việc Làm</Link></li>
                                <li className="mb-2"> <Link to="/store" className="text-decoration-none" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Tìm Cửa Hàng</Link></li>
                                <li className="mb-2"> <Link to="/rules" className="text-decoration-none" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Điều Khoản & Điều Kiện</Link></li>
                            </ul>
                        </aside>
                        <aside className="col-md col-6">
                            <h5 className="title font-weight-bold mb-3 mb-md-4 uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>Dịch Vụ Khách Hàng</h5>
                            <ul className="list-unstyled text-sm" style={{ lineHeight: '1.8' }}>
                                <li className="mb-2"> <Link to="/contact" className="text-decoration-none" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Liên Hệ Hỗ Trợ</Link></li>
                                <li className="mb-2"> <Link to="/refund" className="text-decoration-none" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Hoàn Trả & Trao Đổi</Link></li>
                                <li className="mb-2"> <Link to="/shipping" className="text-decoration-none" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Thông Tin Vận Chuyển</Link></li>
                                <li className="mb-2"> <Link to="/faq" className="text-decoration-none" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Câu Hỏi Thường Gặp</Link></li>
                            </ul>
                        </aside>
                        <aside className="col-md-3 col-12 mt-4 mt-md-0">
                            <h5 className="title font-weight-bold mb-3 mb-md-4 uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>Theo Dõi Chúng Tôi</h5>
                            <div className="d-flex gap-2 gap-md-3 mt-2">
                                <a href="#" className="rounded-circle text-white d-flex align-items-center justify-content-center transition-all" style={{ width: '40px', height: '40px', backgroundColor: 'var(--bg-primary)', transition: 'background-color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--bg-primary)'}><IonIcon icon={logoFacebook} /></a>
                                <a href="#" className="rounded-circle text-white d-flex align-items-center justify-content-center transition-all" style={{ width: '40px', height: '40px', backgroundColor: 'var(--bg-primary)', transition: 'background-color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--bg-primary)'}><IonIcon icon={logoInstagram} /></a>
                                <a href="#" className="rounded-circle text-white d-flex align-items-center justify-content-center transition-all" style={{ width: '40px', height: '40px', backgroundColor: 'var(--bg-primary)', transition: 'background-color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--bg-primary)'}><IonIcon icon={logoTwitter} /></a>
                                <a href="#" className="rounded-circle text-white d-flex align-items-center justify-content-center transition-all" style={{ width: '40px', height: '40px', backgroundColor: 'var(--bg-primary)', transition: 'background-color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--bg-primary)'}><IonIcon icon={logoYoutube} /></a>
                            </div>
                        </aside>
                    </div>
                </section>
                <section className="footer-bottom text-center py-3 py-md-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                    <p className="text-sm m-0" style={{ color: 'var(--text-muted)' }}> &copy; {new Date().getFullYear()} Leo Stationero. Tất cả quyền được bảo lưu. </p>
                </section>
            </div>
        </footer>
    );
}

export default Footer;