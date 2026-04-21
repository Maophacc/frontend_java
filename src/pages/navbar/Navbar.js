import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { menuOutline } from "ionicons/icons";

const Navbar = ({ toggleMenu, isMenuOpen, categories = [] }) => {
    return (
        <nav className="navbar navbar-main navbar-expand-lg navbar-light py-0 shadow-sm" style={{ backgroundColor: '#f9f5ff', minHeight: '45px' }}>
            <div className="container">
                {/* Mobile Menu Toggle Button */}
                <button
                    className="navbar-toggler border-0 shadow-none my-2"
                    type="button"
                    onClick={toggleMenu}
                >
                    <IonIcon icon={menuOutline} style={{ fontSize: "1.5rem", color: '#7c3aed' }} />
                </button>

                {/* Main Nav Content - Always show on lg, collapse on mobile */}
                <div className={`navbar-collapse ${isMenuOpen ? "d-block" : "d-none d-lg-flex"}`} id="main_nav">
                    <ul className="navbar-nav align-items-center w-100">
                        <li className="nav-item">
                            <Link className="nav-link px-3 font-weight-bold text-dark hover-purple py-2 mb-0" to="/">
                                Trang chủ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3 font-weight-bold text-dark hover-purple py-2 mb-0 border-right" to="/listing">
                                Sản phẩm
                            </Link>
                        </li>

                        {/* Category Items */}
                        {categories && categories.length > 0 ? (
                            categories.map((c) => (
                                <li className="nav-item" key={c.categoryId}>
                                    <Link
                                        className="nav-link px-3 text-secondary font-medium transition-all hover-translate py-2 mb-0"
                                        to={`/category/${c.categoryId}`}
                                        style={{ fontSize: '0.9rem' }}
                                    >
                                        {c.categoryName}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="nav-item">
                                <span className="nav-link text-muted small px-3 py-2 mb-0">Đang tải danh mục...</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .hover-purple:hover { color: #8b5cf6 !important; }
                .hover-translate:hover { 
                    color: #7c3aed !important; 
                    transform: translateY(-2px);
                }
                .transition-all { transition: all 0.2s ease; }
                .font-medium { font-weight: 500 !important; }
                .nav-link { color: #4b5563 !important; }
                @media (max-width: 991.98px) {
                    .navbar-nav { padding: 1rem 0; }
                    .border-right { border-right: none !important; }
                    .navbar-collapse.d-block { display: block !important; }
                }
                @media (min-width: 992px) {
                    .border-right { border-right: 1px solid #e5e7eb !important; }
                }
            `}} />
        </nav>
    );
};

export default Navbar;
