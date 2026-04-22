import React, { useEffect, useMemo, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
    bagCheckOutline,
    locationOutline,
    cardOutline,
    cashOutline,
    chevronDownOutline,
    personOutline,
    phonePortraitOutline,
} from "ionicons/icons";
import { useNavigate } from "react-router-dom";

import {
    GET_CART_BY_USER_ID,
    PLACE_ORDER,
    getUserObject,
    GET_IMG,
} from "../config/apiService";

const PAYMENT_METHODS = [
    { id: 1, type: "CASH_ON_DELIVERY", detail: "Thanh toán khi nhận hàng (COD)" },
    { id: 2, type: "VNPAY", detail: "Thanh toán qua VNPAY" },
];

const Checkout = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // user/cart
    const [userId, setUserId] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    // Shipping Form
    const [shippingName, setShippingName] = useState("");
    const [shippingPhone, setShippingPhone] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");

    // Payment
    const [selectedMethodId, setSelectedMethodId] = useState(1); // Mặc định COD
    const [methodOpen, setMethodOpen] = useState(false);

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount || 0);

    useEffect(() => {
        document.title = "Thanh toán đơn hàng";
        
        const user = getUserObject();
        if (!user) {
            navigate("/login", { replace: true });
            return;
        }
        
        setUserId(user.userId || user.UserId);
        setShippingName(user.fullName || user.FullName || "");
        // Auto-fill phone if available in user object
        setShippingPhone(user.phone || user.Phone || "");

        fetchCartData(user.userId || user.UserId);
    }, [navigate]);

    const fetchCartData = async (uid) => {
        try {
            setLoading(true);
            const cartRes = await GET_CART_BY_USER_ID(uid);
            const cartItemsRaw = cartRes?.cartItems || cartRes?.CartItems || [];

            const mappedCartItems = cartItemsRaw.map((ci) => {
                const p = ci.product || ci.Product || {};
                return {
                    productId: p.productId || p.ProductId,
                    productName: p.productName || p.Name,
                    image: p.image || p.ImageUrl,
                    quantity: ci.quantity || ci.Quantity,
                    unitPrice: ci.productPrice ?? p.specialPrice ?? p.price ?? 0,
                };
            });
            setCartItems(mappedCartItems);
            
            if (mappedCartItems.length === 0) {
                alert("Giỏ hàng của bạn đang trống.");
                navigate("/cart");
            }
        } catch (e) {
            console.error("Lỗi lấy giỏ hàng:", e);
        } finally {
            setLoading(false);
        }
    };

    const totalAmount = useMemo(() => {
        return cartItems.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
    }, [cartItems]);

    const handleConfirmPayment = async () => {
        if (!shippingName.trim() || !shippingPhone.trim() || !shippingAddress.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin giao hàng (Tên, Số điện thoại, Địa chỉ)");
            return;
        }

        const ok = window.confirm(
            `Xác nhận đặt hàng?\nTổng tiền: ${formatCurrency(totalAmount)}\nPhương thức: ${
                PAYMENT_METHODS.find((m) => m.id === selectedMethodId)?.detail
            }`
        );
        if (!ok) return;

        try {
            setIsSubmitting(true);
            
            const orderData = {
                userId: userId,
                paymentMethodId: selectedMethodId,
                voucherCode: null,
                shippingName: shippingName,
                shippingPhone: shippingPhone,
                shippingAddress: shippingAddress,
                items: cartItems.map(it => ({
                    productId: it.productId,
                    quantity: it.quantity
                }))
            };

            await PLACE_ORDER(orderData);
            navigate("/order-success", { replace: true });
        } catch (e) {
            console.error("Lỗi đặt hàng:", e);
            alert(e?.response?.data?.message || e?.response?.data || "Đặt hàng thất bại. Vui lòng thử lại.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-400 animate-pulse">Đang chuẩn bị dữ liệu thanh toán...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans text-gray-800">
            {/* Header section */}
            <section className="bg-white border-b py-8 mb-8">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-black flex items-center gap-3">
                        <IonIcon icon={bagCheckOutline} className="text-blue-600" />
                        THANH TOÁN
                    </h2>
                    <p className="text-gray-400 mt-1">Hoàn tất các bước cuối cùng để nhận hàng</p>
                </div>
            </section>

            <section className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Shipping & Items */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        
                        {/* SHIPPING INFO FORM */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <IonIcon icon={locationOutline} className="text-blue-600" />
                                Thông tin giao hàng
                            </h4>
                            
                            <div className="grid gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Họ và tên người nhận</label>
                                    <div className="relative">
                                        <IonIcon icon={personOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input 
                                            type="text" 
                                            className="w-full h-12 pl-11 pr-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                            placeholder="Nhập tên người nhận hàng"
                                            value={shippingName}
                                            onChange={(e) => setShippingName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Số điện thoại liên lạc</label>
                                    <div className="relative">
                                        <IonIcon icon={phonePortraitOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input 
                                            type="text" 
                                            className="w-full h-12 pl-11 pr-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                            placeholder="Nhập số điện thoại"
                                            value={shippingPhone}
                                            onChange={(e) => setShippingPhone(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Địa chỉ chi tiết</label>
                                    <textarea 
                                        rows="3"
                                        className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/tp"
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* PRODUCT LIST SUMMARY */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h4 className="text-lg font-bold mb-6">Sản phẩm đã chọn ({cartItems.length})</h4>
                            <div className="divide-y divide-gray-50">
                                {cartItems.map((p) => {
                                    const imgUrl = (p.image && (p.image.startsWith("http") || p.image.startsWith("data:")))
                                        ? p.image
                                        : (p.image ? GET_IMG(p.image) : null);
                                    return (
                                        <div key={p.productId} className="py-4 flex items-center gap-4 group">
                                            <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-gray-100">
                                                <img
                                                    src={imgUrl || require("../asset/images/items/1.jpg")}
                                                    alt={p.productName}
                                                    className="max-w-full max-h-full object-contain"
                                                    onError={(e) => { e.currentTarget.src = require("../asset/images/items/1.jpg"); }}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{p.productName}</div>
                                                <div className="text-gray-400 text-sm mt-1">
                                                    Số lượng: <span className="text-gray-900 font-medium">{p.quantity}</span> • Đơn giá: <span className="text-gray-900 font-medium">{formatCurrency(p.unitPrice)}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-black text-blue-600">
                                                    {formatCurrency(p.unitPrice * p.quantity)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Summary & Payment */}
                    <div className="flex flex-col gap-6">
                        
                        {/* PAYMENT METHOD SELECTOR */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <IonIcon icon={cardOutline} className="text-blue-600" />
                                Thanh toán
                            </h4>

                            <div className="relative">
                                <button
                                    onClick={() => setMethodOpen(!methodOpen)}
                                    className="w-full h-14 px-5 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-between font-bold hover:bg-blue-100 transition-all border border-blue-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <IonIcon icon={selectedMethodId === 1 ? cashOutline : cardOutline} className="text-xl" />
                                        <span>{PAYMENT_METHODS.find(m => m.id === selectedMethodId)?.detail}</span>
                                    </div>
                                    <IonIcon icon={chevronDownOutline} className={`transition-transform duration-300 ${methodOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {methodOpen && (
                                    <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {PAYMENT_METHODS.map((m) => (
                                            <button
                                                key={m.id}
                                                onClick={() => {
                                                    setSelectedMethodId(m.id);
                                                    setMethodOpen(false);
                                                }}
                                                className={`w-full px-5 py-4 text-left hover:bg-gray-50 flex items-center justify-between transition-colors ${m.id === selectedMethodId ? 'bg-blue-50/50' : ''}`}
                                            >
                                                <span className={`${m.id === selectedMethodId ? 'text-blue-700 font-bold' : 'text-gray-600 font-medium'}`}>{m.detail}</span>
                                                {m.id === selectedMethodId && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ORDER SUMMARY TOTAL */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-gray-400">
                                    <span className="text-sm font-medium">Tiền hàng ({cartItems.length} món)</span>
                                    <span className="text-gray-900 font-bold">{formatCurrency(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400">
                                    <span className="text-sm font-medium">Phí vận chuyển</span>
                                    <span className="text-green-600 font-black tracking-wider text-[10px] uppercase bg-green-50 px-2 py-1 rounded-md">MIỄN PHÍ</span>
                                </div>
                            </div>
                            
                            <div className="pt-6 border-t border-dashed border-gray-100 flex flex-col gap-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tổng thanh toán</div>
                                        <div className="text-3xl font-black text-blue-700">{formatCurrency(totalAmount)}</div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleConfirmPayment}
                                    disabled={isSubmitting || cartItems.length === 0}
                                    className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <IonIcon icon={bagCheckOutline} className="text-2xl" />
                                            <span>ĐẶT HÀNG NGAY</span>
                                        </>
                                    )}
                                </button>
                                
                                <p className="text-center text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                    Đảm bảo bảo mật & an toàn 100%
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Checkout;
