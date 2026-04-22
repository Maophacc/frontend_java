import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { menuOutline } from "ionicons/icons";

const Navbar = ({ toggleMenu, isMenuOpen, categories = [] }) => {
    return (
        <nav className="navbar navbar-main navbar-expand-lg navbar-light py-0 border-bottom" style={{ backgroundColor: '#ffffff', minHeight: '50px' }}>
            <div className="container">
                {/* Mobile Menu Toggle Button */}
                <button
                    className="navbar-toggler border-0 shadow-none my-2"
                    type="button"
                    onClick={toggleMenu}
                >
                    <IonIcon icon={menuOutline} style={{ fontSize: "1.5rem", color: '#222222' }} />
                </button>

                {/* Main Nav Content - Always show on lg, collapse on mobile */}
                <div className={`navbar-collapse ${isMenuOpen ? "d-block" : "d-none d-lg-flex"}`} id="main_nav">
                    <ul className="navbar-nav align-items-center w-100">
                        <li className="nav-item">
                            <Link className="nav-link px-3 font-weight-bold py-3 mb-0 hover-leo text-uppercase" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3 font-weight-bold py-3 mb-0 hover-leo text-uppercase" to="/listing">
                                Shop
                            </Link>
                        </li>

                        {/* Category Items */}
                        {categories && categories.length > 0 ? (
                            categories.map((c) => (
                                <li className="nav-item" key={c.categoryId}>
                                    <Link
                                        className="nav-link px-3 py-3 mb-0 hover-leo font-weight-bold text-uppercase"
                                        to={`/category/${c.categoryId}`}
                                        style={{ fontSize: '0.85rem' }}
                                    >
                                        {c.categoryName}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="nav-item">
                                <span className="nav-link text-muted small px-3 py-3 mb-0">Đang tải danh mục...</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .hover-leo { color: #222222 !important; transition: all 0.3s ease; }
                .hover-leo:hover { color: #e97081 !important; }
                .nav-link { color: #222222 !important; letter-spacing: 0.5px; }
                @media (max-width: 991.98px) {
                    .navbar-nav { padding: 1rem 0; }
                    .navbar-collapse.d-block { display: block !important; }
                }
            `}} />
        </nav>
    );
};

export default Navbar;
