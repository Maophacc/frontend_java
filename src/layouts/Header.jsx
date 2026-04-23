import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
    searchOutline,
    cartOutline,
    personOutline,
    logOutOutline,
    listOutline,
    settingsOutline,
    receiptOutline,
} from "ionicons/icons";
import Navbar from "../pages/navbar/Navbar";
import ThemeToggle from "../components/ThemeToggle";
import {
    GET_CATEGORIES,
    removeToken,
    removeEmail,
    getUserEmail,
    getUserObject,
    GET_CART_BY_USER_ID,
    GET_ORDERS_BY_EMAIL,
    GET_PRODUCTS_BY_KEYWORD,
    GET_USER_BY_EMAIL,
    GET_IMG,
} from "../config/apiService";

const Header = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    /* ================= STATE ================= */
    const [searchText, setSearchText] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("Tài khoản");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const toggleMenu = () => setIsMenuOpen((s) => !s);

    const menuRef = useRef(null);

    /* ================= CHECK AUTH & CART ================= */
    const checkAuth = async () => {
        const token = localStorage.getItem("jwt-token");
        const loggedIn = !!token;
        setIsLoggedIn(loggedIn);

        const user = getUserObject();
        if (user) {
            setUserName(user.fullName || user.username || getUserEmail() || "Tài khoản");

            try {
                const email = getUserEmail();
                let userId = user.userId || user.UserId;

                if (!userId && email) {
                    const uRes = await GET_USER_BY_EMAIL(email);
                    userId = uRes?.userId || uRes?.data?.userId;
                }

                if (userId) {
                    const cData = await GET_CART_BY_USER_ID(userId);
                    const items = Array.isArray(cData) ? cData : cData?.items || cData?.cartItems || [];
                    setCartCount(items.reduce((sum, item) => sum + (item.quantity || 1), 0));
                } else {
                    setCartCount(0);
                }

                if (email) {
                    const oData = await GET_ORDERS_BY_EMAIL(email);
                    const oList = Array.isArray(oData) ? oData : (oData?.orders || oData?.content || []);
                    setOrderCount(oList.length);
                } else {
                    setOrderCount(0);
                }

            } catch (error) {
                console.error("Lỗi lấy giỏ hàng:", error);
                setCartCount(0);
                setOrderCount(0);
            }
        } else {
            setUserName("Tài khoản");
            setCartCount(0);
            setOrderCount(0);
        }
    };

    /* ================= FETCH CATEGORY ================= */
    const fetchCategories = async () => {
        try {
            const data = await GET_CATEGORIES(0, 100, "categoryId", "asc");
            setCategories(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("Lỗi load category:", e);
            setCategories([]);
        }
    };

    useEffect(() => {
        checkAuth();
        fetchCategories();
        const handleAuthChange = () => checkAuth();
        window.addEventListener("storage", handleAuthChange);
        window.addEventListener("auth-change", handleAuthChange);
        window.addEventListener("cart-change", handleAuthChange);
        return () => {
            window.removeEventListener("storage", handleAuthChange);
            window.removeEventListener("auth-change", handleAuthChange);
            window.removeEventListener("cart-change", handleAuthChange);
        };
    }, []);

    /* ================= SEARCH AUTOCOMPLETE ================= */
    useEffect(() => {
        const timer = setTimeout(async () => {
            const kw = searchText.trim();
            if (kw.length >= 2) {
                setIsSearching(true);
                try {
                    const data = await GET_PRODUCTS_BY_KEYWORD(kw, 1, 5); // Fetch top 5
                    const root = data?.value || data;
                    const items = Array.isArray(root) ? root : (root.products || root.Products || root.content || root.data || []);
                    setSearchSuggestions(items.slice(0, 5));
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("Lỗi lấy gợi ý tìm kiếm:", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [searchText]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ================= SYNC INPUT SEARCH THEO URL ================= */
    useEffect(() => {
        const q = (searchParams.get("q") || "").trim();
        if (q && !searchText) setSearchText(q);
    }, [searchParams]);

    /* ================= LOGOUT ================= */
    const handleLogout = () => {
        removeToken();
        removeEmail();
        setUserMenuOpen(false);
        checkAuth();
        alert("Đăng xuất thành công!");
        navigate("/login", { replace: true });
    };

    /* ================= SUBMIT SEARCH ================= */
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        const kw = (searchText || "").trim();
        setShowSuggestions(false);
        if (!kw) return;
        navigate(`/search?q=${encodeURIComponent(kw)}`);
    };

    const handleSuggestionClick = (productId) => {
        setShowSuggestions(false);
        setSearchText("");
        navigate(`/product-detail/${productId}`);
    };

    const formatVND = (n) => Number(n ?? 0).toLocaleString("vi-VN") + "đ";

    return (
        <header className="section-header sticky-top shadow-sm z-50" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
            {/* ================= TOP HEADER ================= */}
            <div className="py-2 d-none d-lg-block" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-sm" style={{ color: 'var(--text-primary)' }}>
                            <span className="mr-4">Call us: (+84) 911583051</span>
                            <span>Email: minhtri582005@gmail.com</span>
                        </div>
                        <div className="col-lg-6 text-right text-sm" style={{ color: 'var(--text-primary)' }}>
                            <span className="mr-4 cursor-pointer" style={{ color: 'var(--text-secondary)' }}>English ▼</span>
                            <span className="mr-4 cursor-pointer" style={{ color: 'var(--text-secondary)' }}>USD ▼</span>
                            <Link to="/deals" className="font-bold" style={{ color: 'var(--primary-color)' }}>Daily Deals</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MAIN HEADER ================= */}
            <div className="py-3 py-md-4 border-bottom" style={{ backgroundColor: 'var(--bg-primary)', borderBottomColor: 'var(--border-color)' }}>
                <div className="container">
                    <div className="row align-items-center">
                        {/* Logo */}
                        <div className="col-lg-3 col-sm-4 col-4 order-1">
                            <Link to="/" className="brand-wrap">
                                <h2 className="m-0 font-black tracking-tighter" style={{ color: 'var(--text-primary)', fontSize: 'clamp(18px, 5vw, 24px)' }}>
                                    LEO<span style={{ color: 'var(--primary-color)' }}>STATIONERO</span>
                                </h2>
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="col-lg-6 col-12 mt-3 mt-lg-0 relative order-3 order-lg-2" ref={searchRef}>
                            <form onSubmit={handleSubmitSearch} className="d-flex w-100 position-relative">
                                <input
                                    type="text"
                                    className="form-control rounded-0 px-3 px-md-4 py-2 text-sm focus:ring-0 transition-colors"
                                    style={{
                                        border: '2px solid var(--border-color)',
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)'
                                    }}
                                    placeholder="Tìm kiếm sản phẩm..."
                                    value={searchText}
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => {
                                        if (searchSuggestions.length > 0) setShowSuggestions(true);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="btn rounded-0 px-3 px-md-4 text-white hover:opacity-80 transition-opacity flex items-center justify-center"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                >
                                    <IonIcon icon={searchOutline} style={{ fontSize: '1.2rem' }} />
                                </button>
                            </form>

                            {/* Search Suggestions Dropdown */}
                            {showSuggestions && (searchText.trim().length >= 2) && (
                                <div className="position-absolute top-full left-0 right-0 mt-1 rounded-b-md overflow-hidden shadow-lg z-50" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderTop: 'none' }}>
                                    {isSearching ? (
                                        <div className="p-3 text-center text-sm" style={{ color: 'var(--text-muted)' }}>Đang tìm kiếm...</div>
                                    ) : searchSuggestions.length > 0 ? (
                                        <ul className="list-unstyled mb-0 max-h-[300px] overflow-y-auto">
                                            {searchSuggestions.map((item) => {
                                                const imgField = item.imageUrl || item.image;
                                                const imgUrl = (imgField && (imgField.startsWith("http") || imgField.startsWith("data:")))
                                                    ? imgField
                                                    : (imgField ? GET_IMG(imgField) : require("../asset/images/items/1.jpg"));
                                                
                                                const price = item.specialPrice || item.price || 0;

                                                return (
                                                    <li key={item.productId || item.ProductId} style={{ borderBottom: '1px solid var(--border-color)' }} className="last:border-b-0">
                                                        <button 
                                                            type="button" 
                                                            className="w-100 text-left p-2 p-md-3 d-flex align-items-center gap-3 transition-colors"
                                                            style={{ 
                                                                backgroundColor: 'var(--bg-primary)',
                                                                color: 'var(--text-primary)',
                                                                border: 'none',
                                                                cursor: 'pointer'
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-secondary)'}
                                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--bg-primary)'}
                                                            onClick={() => handleSuggestionClick(item.productId || item.ProductId)}
                                                        >
                                                            <div className="flex-shrink-0 bg-white border d-flex align-items-center justify-content-center p-1" style={{ width: '48px', height: '48px', borderColor: 'var(--border-color)' }}>
                                                                <img src={imgUrl} alt={item.productName || item.name} className="mw-100 mh-100" style={{ objectFit: 'contain' }} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-sm font-weight-600 text-truncate" style={{ color: 'var(--text-primary)' }}>{item.productName || item.name}</div>
                                                                <div className="text-xs font-weight-bold mt-1" style={{ color: 'var(--primary-color)' }}>{formatVND(price)}</div>
                                                            </div>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                            <li style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }} className="p-2 p-md-3 text-center">
                                                <button 
                                                    type="button" 
                                                    onClick={handleSubmitSearch}
                                                    className="text-xs font-weight-bold uppercase tracking-wide w-100 border-0"
                                                    style={{ 
                                                        backgroundColor: 'transparent',
                                                        color: 'var(--text-primary)',
                                                        cursor: 'pointer',
                                                        transition: 'color var(--transition-fast)'
                                                    }}
                                                >
                                                    Xem tất cả kết quả
                                                </button>
                                            </li>
                                        </ul>
                                    ) : (
                                        <div className="p-3 text-center text-sm" style={{ color: 'var(--text-muted)' }}>Không tìm thấy sản phẩm.</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Actions */}
                        <div className="col-lg-3 col-sm-7 col-7 d-flex align-items-center justify-content-end justify-content-lg-start gap-4 order-2 order-lg-3 pl-lg-4">
                            {/* Theme Toggle */}
                            <ThemeToggle />

                            {/* Account Dropdown */}
                            <div className="position-relative" ref={menuRef} style={{ minWidth: '80px' }}>
                                <div
                                    className="d-flex flex-column align-items-center cursor-pointer group"
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    style={{ cursor: 'pointer', userSelect: 'none' }}
                                >
                                    <IonIcon icon={personOutline} style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }} />
                                    <span className="text-[10px] uppercase font-weight-bold mt-1" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>{isLoggedIn ? userName : "Đăng nhập"}</span>
                                </div>

                                {userMenuOpen && (
                                    <div className="position-absolute shadow rounded p-2 z-50" style={{ top: '120%', right: 0, minWidth: '200px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                                        {isLoggedIn ? (
                                            <>
                                                <div className="px-3 py-2" style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                                                    <span className="d-block font-weight-bold text-truncate">{userName}</span>
                                                    <small style={{ color: 'var(--text-muted)' }} className="text-truncate">{getUserEmail()}</small>
                                                </div>
                                                <Link to="/profile" className="dropdown-item py-2 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setUserMenuOpen(false)}>
                                                    <IonIcon icon={personOutline} /> Tài khoản của tôi
                                                </Link>
                                                <Link to="/profile/orders" className="dropdown-item py-2 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setUserMenuOpen(false)}>
                                                    <IonIcon icon={listOutline} /> Đơn mua
                                                </Link>
                                                <Link to="/profile/setting" className="dropdown-item py-2 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setUserMenuOpen(false)}>
                                                    <IonIcon icon={settingsOutline} /> Cài đặt
                                                </Link>
                                                <div style={{ borderTop: '1px solid var(--border-color)' }} className="my-2"></div>
                                                <button onClick={handleLogout} className="dropdown-item py-2 text-danger d-flex align-items-center gap-2 w-100" style={{ color: 'var(--danger-color)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                                                    <IonIcon icon={logOutOutline} /> Đăng xuất
                                                </button>
                                            </>
                                        ) : (
                                            <div className="p-2 text-center">
                                                <p className="small mb-2" style={{ color: 'var(--text-secondary)' }}>Đăng nhập để theo dõi đơn hàng</p>
                                                <Link to="/login" className="btn btn-sm btn-block text-white mb-2" style={{ backgroundColor: 'var(--primary-color)' }} onClick={() => setUserMenuOpen(false)}>Đăng nhập</Link>
                                                <Link to="/register" className="btn btn-outline-primary btn-sm btn-block" style={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => setUserMenuOpen(false)}>Đăng ký</Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Cart */}
                            <Link to="/cart" className="d-flex flex-column align-items-center group text-decoration-none position-relative" style={{ minWidth: '80px', color: 'var(--text-primary)' }}>
                                <div className="position-relative">
                                    <IonIcon icon={cartOutline} style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }} />
                                    {cartCount > 0 && (
                                        <span className="position-absolute d-flex align-items-center justify-content-center text-[10px] font-weight-bold shadow-sm text-white rounded-circle" style={{ top: '-5px', right: '-8px', width: '18px', height: '18px', backgroundColor: 'var(--primary-color)' }}>
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] uppercase font-weight-bold mt-1" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Giỏ hàng</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= BOTTOM NAVBAR ================= */}
            <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} categories={categories} />
        </header>
    );
};

export default Header;
