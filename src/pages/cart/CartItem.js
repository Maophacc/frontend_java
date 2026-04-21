import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { trashOutline, heartOutline } from "ionicons/icons";
import { GET_IMG } from "../../config/apiService";

const CartItem = ({
    item,
    onToggle,
    onQuantityChange,
    onDelete,
}) => {
    const {
        productId,
        productName,
        image,
        quantity,
        maxStock,
        isChecked,
        unitPrice, // productPrice từ backend
    } = item;

    const imgUrl = (image && (image.startsWith("http") || image.startsWith("data:")))
        ? image
        : (image ? GET_IMG(image) : null);

    const formatVND = (n) => Number(n ?? 0).toLocaleString("vi-VN") + "đ";
    const lineTotal = (unitPrice ?? 0) * (quantity ?? 0);

    return (
        <tr className="border-top">
            <td>
                <figure className="itemside align-items-center">
                    <div className="mr-3 d-flex align-items-center">
                        <input
                            type="checkbox"
                            checked={!!isChecked}
                            onChange={() => onToggle?.(productId)}
                            style={{ width: 18, height: 18 }}
                        />
                    </div>

                    <div className="aside">
                        <img
                            src={imgUrl || require("../../asset/images/items/1.jpg")}
                            className="img-sm border rounded"
                            alt={productName}
                            onError={(e) => {
                                e.currentTarget.src = require("../../asset/images/items/1.jpg");
                            }}
                        />
                    </div>

                    <figcaption className="info">
                        <Link to={`/product-detail/${productId}`} className="title text-dark">
                            {productName}
                        </Link>
                        <p className="text-muted small mb-0">
                            Kho: {maxStock}
                        </p>
                    </figcaption>
                </figure>
            </td>

            <td style={{ width: 130 }}>
                <select
                    className="form-control"
                    value={quantity}
                    onChange={(e) => onQuantityChange?.(productId, Number(e.target.value))}
                >
                    {Array.from({ length: Math.min(10, maxStock || 10) }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </td>

            <td style={{ width: 160 }}>
                <div className="price-wrap">
                    <var className="price">{formatVND(lineTotal)}</var>
                    <small className="text-muted">{formatVND(unitPrice)} / cái</small>
                </div>
            </td>

            <td className="text-right" style={{ width: 200 }}>
                <button
                    type="button"
                    className="btn btn-light mr-2 text-danger"
                    onClick={() => onDelete?.(productId)}
                    title="Xóa"
                >
                    <IonIcon icon={trashOutline} />
                </button>
                <button
                    type="button"
                    className="btn btn-light text-primary"
                    onClick={() => console.log("Wishlist:", productId)}
                    title="Yêu thích"
                >
                    <IonIcon icon={heartOutline} />
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
