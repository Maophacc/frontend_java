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
        <header className="section-header sticky-top shadow-sm z-50">
            {/* ================= TOP HEADER ================= */}
            <div className="bg-dark text-white py-2 d-none d-lg-block" style={{ backgroundColor: "#22222" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-sm">
                            <span className="mr-4">Call us: (+84) 911583051</span>
                            <span>Email: minhtri582005@gmail.com</span>
                        </div>
                        <div className="col-lg-6 text-right text-sm">
                            <span className="mr-4 cursor-pointer hover:text-pink-400">English ▼</span>
                            <span className="mr-4 cursor-pointer hover:text-pink-400">USD ▼</span>
                            <Link to="/deals" className="text-pink-400 font-bold hover:text-white transition-colors">Daily Deals</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MAIN HEADER ================= */}
            <div className="bg-white py-4 border-bottom border-gray-100">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Logo */}
                        <div className="col-lg-3 col-sm-4 col-4">
                            <Link to="/" className="brand-wrap">
                                <h2 className="m-0 font-black tracking-tighter" style={{ color: "#222222", fontSize: "24px" }}>
                                    LEO<span style={{ color: "#e97081" }}>STATIONERO</span>
                                </h2>
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="col-lg-6 col-sm-8 col-8 relative" ref={searchRef}>
                            <form onSubmit={handleSubmitSearch} className="d-flex w-100 position-relative">
                                <input
                                    type="text"
                                    className="form-control rounded-none border border-[#e5e5e5] px-4 py-2 text-sm focus:border-[#222222] focus:ring-0 transition-colors"
                                    placeholder="Search our catalog..."
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
                                    className="btn rounded-none px-4 text-white hover:bg-[#d65c6d] transition-colors flex items-center justify-center"
                                    style={{ backgroundColor: "#222222" }}
                                >
                                    <IonIcon icon={searchOutline} style={{ fontSize: '1.2rem' }} />
                                </button>
                            </form>

                            {/* Search Suggestions Dropdown */}
                            {showSuggestions && (searchText.trim().length >= 2) && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg z-50 rounded-b-md overflow-hidden">
                                    {isSearching ? (
                                        <div className="p-3 text-center text-sm text-gray-500">Đang tìm kiếm...</div>
                                    ) : searchSuggestions.length > 0 ? (
                                        <ul className="list-unstyled mb-0 max-h-[300px] overflow-y-auto">
                                            {searchSuggestions.map((item) => {
                                                const imgField = item.imageUrl || item.image;
                                                const imgUrl = (imgField && (imgField.startsWith("http") || imgField.startsWith("data:")))
                                                    ? imgField
                                                    : (imgField ? GET_IMG(imgField) : require("../asset/images/items/1.jpg"));
                                                
                                                const price = item.specialPrice || item.price || 0;

                                                return (
                                                    <li key={item.productId || item.ProductId} className="border-b border-gray-100 last:border-b-0">
                                                        <button 
                                                            type="button" 
                                                            className="w-full text-left p-2 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                                            onClick={() => handleSuggestionClick(item.productId || item.ProductId)}
                                                        >
                                                            <div className="w-12 h-12 flex-shrink-0 bg-white border border-gray-100 flex items-center justify-center p-1">
                                                                <img src={imgUrl} alt={item.productName || item.name} className="max-w-full max-h-full object-contain" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-sm text-[#222222] font-medium truncate">{item.productName || item.name}</div>
                                                                <div className="text-xs font-bold text-[#e97081] mt-1">{formatVND(price)}</div>
                                                            </div>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                            <li className="bg-gray-50 p-2 text-center border-t border-gray-200">
                                                <button 
                                                    type="button" 
                                                    onClick={handleSubmitSearch}
                                                    className="text-xs font-bold text-[#222222] hover:text-[#e97081] uppercase tracking-wide w-full"
                                                >
                                                    View All Results
                                                </button>
                                            </li>
                                        </ul>
                                    ) : (
                                        <div className="p-3 text-center text-sm text-gray-500">Không tìm thấy sản phẩm.</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Icons */}
                        <div className="col-lg-3 d-none d-lg-flex justify-content-end align-items-center gap-4">
                            {/* Account Dropdown */}
                            <div className="position-relative" ref={menuRef}>
                                <div
                                    className="d-flex flex-column align-items-center cursor-pointer group"
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                >
                                    <IonIcon icon={personOutline} style={{ fontSize: '1.5rem', color: "#222222" }} className="group-hover:text-[#e97081] transition-colors" />
                                    <span className="text-[10px] uppercase font-bold text-gray-500 mt-1">{isLoggedIn ? userName : "Đăng nhập"}</span>
                                </div>

                                {userMenuOpen && (
                                    <div className="position-absolute bg-white shadow border rounded p-2 z-50" style={{ top: '120%', right: 0, minWidth: '200px' }}>
                                        {isLoggedIn ? (
                                            <>
                                                <div className="px-3 py-2 border-bottom">
                                                    <span className="d-block font-weight-bold text-dark text-truncate">{userName}</span>
                                                    <small className="text-muted text-truncate">{getUserEmail()}</small>
                                                </div>
                                                <Link to="/profile" className="dropdown-item py-2 d-flex align-items-center gap-2" onClick={() => setUserMenuOpen(false)}>
                                                    <IonIcon icon={personOutline} /> Tài khoản của tôi
                                                </Link>
                                                <Link to="/profile/orders" className="dropdown-item py-2 d-flex align-items-center gap-2" onClick={() => setUserMenuOpen(false)}>
                                                    <IonIcon icon={listOutline} /> Đơn mua
                                                </Link>
                                                <Link to="/profile/setting" className="dropdown-item py-2 d-flex align-items-center gap-2" onClick={() => setUserMenuOpen(false)}>
                                                    <IonIcon icon={settingsOutline} /> Cài đặt
                                                </Link>
                                                <div className="dropdown-divider"></div>
                                                <button onClick={handleLogout} className="dropdown-item py-2 text-danger d-flex align-items-center gap-2">
                                                    <IonIcon icon={logOutOutline} /> Đăng xuất
                                                </button>
                                            </>
                                        ) : (
                                            <div className="p-2 text-center">
                                                <p className="small text-muted mb-2">Đăng nhập để theo dõi đơn hàng</p>
                                                <Link to="/login" className="btn btn-sm btn-block text-white mb-2" style={{ backgroundColor: "#222222" }} onClick={() => setUserMenuOpen(false)}>Đăng nhập</Link>
                                                <Link to="/register" className="btn btn-outline-dark btn-sm btn-block" onClick={() => setUserMenuOpen(false)}>Đăng ký</Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Cart */}
                            <Link to="/cart" className="d-flex flex-column align-items-center group text-decoration-none relative">
                                <div className="position-relative">
                                    <IonIcon icon={cartOutline} style={{ fontSize: '1.5rem', color: "#222222" }} className="group-hover:text-[#e97081] transition-colors" />
                                    {cartCount > 0 && (
                                        <span className="position-absolute bg-[#e97081] text-white rounded-circle d-flex align-items-center justify-content-center text-[10px] font-bold shadow-sm" style={{ top: '-5px', right: '-8px', width: '18px', height: '18px' }}>
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 mt-1">Giỏ hàng</span>
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
