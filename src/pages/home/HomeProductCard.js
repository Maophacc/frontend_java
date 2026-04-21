import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { star, cartOutline, heartOutline, flashOutline } from "ionicons/icons";
import { ADD_TO_CART, GET_IMG, getUserObject } from "../../config/apiService";

const HomeProductCard = ({ product }) => {
    const {
        productId,
        productName,
        image,
        price,
        specialPrice,
        discount,
    } = product;

    // Determine the final image URL. 
    // If 'image' is an absolute URL (starts with http), use it. 
    // Otherwise use GET_IMG helper.
    const imgUrl = (image && (image.startsWith("http") || image.startsWith("data:")))
        ? image 
        : (image ? GET_IMG(image) : null);

    const formatVND = (n) => Number(n ?? 0).toLocaleString("vi-VN") + "đ";

    const handleAddToCart = async (e) => {
        e.preventDefault();
        try {
            const user = getUserObject();
            const userId = user?.userId || user?.UserId;

            if (!userId) {
                alert("Vui lòng đăng nhập để thêm vào giỏ hàng.");
                return;
            }

            await ADD_TO_CART(userId, product.productId, 1);
            alert("Đã thêm vào giỏ hàng!");
        } catch (error) {
            console.error("Add to cart error:", error);
            alert("Thêm vào giỏ thất bại.");
        }
    };

    return (
        <div className="card-product-grid flex flex-col h-full group overflow-hidden">
            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur shadow-sm rounded-full text-gray-400 hover:text-red-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                <IonIcon icon={heartOutline} className="text-xl" />
            </button>

            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-red-600 text-white text-[11px] font-black rounded-lg shadow-lg flex items-center gap-1">
                    <IonIcon icon={flashOutline} />
                    -{discount}%
                </div>
            )}
            
            {/* Product Image Wrapper */}
            <Link to={`/product-detail/${productId}`} className="img-wrap flex items-center justify-center relative bg-white">
                <img
                    src={imgUrl || require("../../asset/images/items/1.jpg")}
                    alt={productName}
                    className="max-h-full max-w-full object-contain p-6 transition-transform duration-700"
                    onError={(e) => {
                        e.currentTarget.src = require("../../asset/images/items/1.jpg");
                    }}
                />
            </Link>

            {/* Content Area */}
            <div className="info-wrap flex flex-col flex-grow">
                {/* Brand/Category Tag (Small) */}
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 mb-2 opacity-70">
                    Chính hãng
                </span>

                {/* Title */}
                <Link to={`/product-detail/${productId}`} className="title hover:text-blue-700 transition-colors">
                    {productName}
                </Link>

                <div className="mt-auto">
                    {/* Ratings */}
                    <div className="flex items-center text-amber-400 text-[10px] mb-3">
                        <IonIcon icon={star} />
                        <IonIcon icon={star} />
                        <IonIcon icon={star} />
                        <IonIcon icon={star} />
                        <IonIcon icon={star} className="text-gray-200" />
                        <span className="text-gray-400 ml-2 font-semibold">4.0</span>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                            {specialPrice ? (
                                <>
                                    <span className="price">{formatVND(specialPrice)}</span>
                                    <span className="text-xs text-gray-400 line-through mt-0.5">{formatVND(price)}</span>
                                </>
                            ) : (
                                <span className="price">{formatVND(price)}</span>
                            )}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full h-11 bg-gray-50 text-blue-700 hover:bg-blue-700 hover:text-white rounded-xl text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                        <IonIcon icon={cartOutline} className="text-lg group-hover/btn:scale-125 transition-transform" />
                        <span>MUA NGAY</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeProductCard;
