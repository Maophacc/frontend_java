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
        <div className="group relative overflow-hidden bg-white border border-transparent hover:border-gray-200 transition-all duration-300">
            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-[#e97081] text-white text-[10px] font-bold uppercase tracking-wider">
                    -{discount}%
                </div>
            )}
            
            {/* Product Image Wrapper */}
            <div className="relative overflow-hidden">
                <Link to={`/product-detail/${productId}`} className="d-block w-full h-[250px] bg-white flex items-center justify-center p-4">
                    <img
                        src={imgUrl || require("../../asset/images/items/1.jpg")}
                        alt={productName}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.currentTarget.src = require("../../asset/images/items/1.jpg");
                        }}
                    />
                </Link>

                {/* Hover Action Buttons (Slide up from bottom of image) */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-white/80 backdrop-blur-sm">
                    <button onClick={handleAddToCart} className="w-10 h-10 rounded-full bg-[#222222] text-white flex items-center justify-center hover:bg-[#e97081] transition-colors" title="Add to cart">
                        <IonIcon icon={cartOutline} className="text-xl" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-[#222222] flex items-center justify-center hover:text-[#e97081] hover:border-[#e97081] transition-colors" title="Quick view">
                        <IonIcon icon={flashOutline} className="text-xl" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-[#222222] flex items-center justify-center hover:text-[#e97081] hover:border-[#e97081] transition-colors" title="Add to wishlist">
                        <IonIcon icon={heartOutline} className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 text-center">
                {/* Title */}
                <Link to={`/product-detail/${productId}`} className="block text-[#666666] hover:text-[#e97081] text-sm mb-2 transition-colors line-clamp-2 min-h-[40px]">
                    {productName}
                </Link>

                {/* Ratings */}
                <div className="flex items-center justify-center text-[#ffb503] text-[10px] mb-2">
                    <IonIcon icon={star} />
                    <IonIcon icon={star} />
                    <IonIcon icon={star} />
                    <IonIcon icon={star} />
                    <IonIcon icon={star} className="text-gray-300" />
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-center gap-2">
                    {specialPrice ? (
                        <>
                            <span className="text-[#222222] font-bold">{formatVND(specialPrice)}</span>
                            <span className="text-[#999999] text-xs line-through">{formatVND(price)}</span>
                        </>
                    ) : (
                        <span className="text-[#222222] font-bold">{formatVND(price)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeProductCard;
