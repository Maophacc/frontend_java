import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
    searchOutline,
    personOutline,
    cartOutline,
    receiptOutline,
    logOutOutline,
    settingsOutline,
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
    GET_USER_BY_EMAIL
} from "../config/apiService";

const Header = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const menuRef = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [categories, setCategories] = useState([]);

    // ===== search state =====
    const [searchText, setSearchText] = useState("");

    const toggleMenu = () => setIsMenuOpen((s) => !s);

    /* ================= AUTH ================= */
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
                    const cItems = cData?.cartItems || cData?.data?.cartItems || [];
                    setCartCount(cItems.length);
                }

                if (email) {
                    const oData = await GET_ORDERS_BY_EMAIL(email);
                    const oList = Array.isArray(oData) ? oData : (oData?.orders || oData?.content || []);
                    setOrderCount(oList.length);
                }
            } catch (err) {
                console.error("Header auto-sync failed:", err);
            }
        } else {
            setUserName("");
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

        const onStorage = () => checkAuth();
        window.addEventListener("storage", onStorage);
        window.addEventListener("auth-change", onStorage);
        return () => {
            window.removeEventListener("storage", onStorage);
            window.removeEventListener("auth-change", onStorage);
        };
    }, []);

    /* ================= SYNC INPUT SEARCH THEO URL (tuỳ chọn) ================= */
    useEffect(() => {
        // nếu đang ở trang /search?q=... thì set lên input luôn
        const q = (searchParams.get("q") || "").trim();
        setSearchText(q);
    }, [searchParams]);

    /* ================= CLICK OUTSIDE ================= */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
        if (!kw) return; // không tìm nếu rỗng
        navigate(`/search?q=${encodeURIComponent(kw)}`);
    };

    return (
        <header className="section-header sticky-top">
            {/* ================= TOP HEADER ================= */}
            <section className="header-main border-bottom bg-white py-3">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Logo */}
                        <div className="col-lg-3 col-sm-4 col-12">
                            <Link to="/" className="brand-wrap flex items-center gap-2 no-underline">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 shadow-sm">
                                    <IonIcon icon={settingsOutline} className="text-2xl" />
                                </div>
                                <span className="text-xl font-black tracking-tighter text-purple-600">PASTEL<span className="text-pink-400">SHOP</span></span>
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="col-lg-5 col-xl-6 col-sm-8 col-12">
                            <form className="search-header" onSubmit={handleSubmitSearch}>
                                <div className="input-group w-100">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Bạn đang tìm gì?"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary px-3" type="submit" aria-label="Search">
                                            <IonIcon icon={searchOutline} />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Right icons */}
                        <div className="col-lg-4 col-xl-3 col-12">
                            <div className="d-flex justify-content-end align-items-center mt-3 mt-lg-0">
                                {/* USER */}
                                {!isLoggedIn ? (
                                    <div className="widget-header mr-3">
                                        <Link to="/login" className="widget-view">
                                            <div className="icon-area">
                                                <IonIcon icon={personOutline} />
                                            </div>
                                            <small className="text d-none d-sm-block">Đăng nhập</small>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="widget-header mr-2 mr-md-3 position-relative" ref={menuRef}>
                                        <button
                                            className="widget-view btn p-0 border-0 bg-transparent"
                                            onClick={() => setUserMenuOpen((s) => !s)}
                                            type="button"
                                        >
                                            <div className="icon-area">
                                                <IonIcon icon={personOutline} />
                                            </div>
                                            <small className="text d-none d-sm-block">{userName || "Tài khoản"}</small>
                                        </button>

                                        {userMenuOpen && (
                                            <div className="dropdown-menu show" style={{ right: 0, left: "auto" }}>
                                                <Link className="dropdown-item" to="/profile" onClick={() => setUserMenuOpen(false)}>
                                                    <IonIcon icon={settingsOutline} className="mr-2" />
                                                    Thông tin cá nhân
                                                </Link>
                                                <button className="dropdown-item text-danger" onClick={handleLogout} type="button">
                                                    <IonIcon icon={logOutOutline} className="mr-2" />
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Orders & Cart */}
                                {isLoggedIn && (
                                    <>
                                        <div className="widget-header mr-3">
                                            <Link to="/profile/orders" className="widget-view no-underline">
                                                <div className="icon-area">
                                                    <IonIcon icon={receiptOutline} />
                                                    {orderCount > 0 && (
                                                        <span className="badge badge-pill badge-warning notify">{orderCount}</span>
                                                    )}
                                                </div>
                                                <small className="text d-none d-sm-block">Đơn hàng</small>
                                            </Link>
                                        </div>
                                        <div className="widget-header mr-2 mr-md-3">
                                            <Link to="/cart" className="widget-view no-underline">
                                                <div className="icon-area">
                                                    <IonIcon icon={cartOutline} />
                                                    {cartCount > 0 && (
                                                        <span className="badge badge-pill badge-danger notify">{cartCount}</span>
                                                    )}
                                                </div>
                                                <small className="text d-none d-sm-block">Giỏ hàng</small>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= NAVBAR ================= */}
            <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} categories={categories} />
        </header>
    );
};

export default Header;
