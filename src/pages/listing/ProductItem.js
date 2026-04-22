import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { star, checkmarkCircleOutline } from "ionicons/icons";
import { GET_IMG } from "../../config/apiService";

const ProductItem = ({ product, viewMode = "grid" }) => {
    const imgField = product?.image;
    const imgUrl = (imgField && (imgField.startsWith("http") || imgField.startsWith("data:")))
        ? imgField
        : (imgField ? GET_IMG(imgField) : null);

    const price = product?.price ?? 0;
    const special = product?.specialPrice ?? null;
    const discount = product?.discount ?? null;

    const formatVND = (n) => Number(n ?? 0).toLocaleString("vi-VN") + "đ";

    if (viewMode === "grid") {
        return (
            <div className="col-6 col-md-4 col-lg-3 mb-4">
                <article className="card h-100 shadow-sm border-0 rounded-xl overflow-hidden hover-shadow transition-all">
                    <div className="position-relative">
                        {discount ? (
                            <span className="badge badge-danger position-absolute" style={{ top: 10, left: 10, zIndex: 1 }}>
                                -{discount}%
                            </span>
                        ) : null}
                        <Link to={`/product-detail/${product.productId}`} className="d-block bg-light p-3">
                            <div className="img-wrap d-flex align-items-center justify-content-center" style={{ height: "150px" }}>
                                <img
                                    src={imgUrl || require("../../asset/images/items/1.jpg")}
                                    alt={product.productName}
                                    className="max-h-100 max-w-100 object-contain"
                                    onError={(e) => { e.currentTarget.src = require("../../asset/images/items/1.jpg"); }}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="card-body p-3 d-flex flex-column">
                        <Link to={`/product-detail/${product.productId}`} className="h6 text-dark font-weight-bold mb-2 text-truncate-2" style={{ height: "40px", overflow: "hidden" }}>
                            {product.productName}
                        </Link>
                        <div className="mt-auto">
                            {special ? (
                                <div className="d-flex flex-column">
                                    <span className="text-primary font-weight-bold">{formatVND(special)}</span>
                                    <small className="text-muted text-decoration-line-through">{formatVND(price)}</small>
                                </div>
                            ) : (
                                <span className="text-primary font-weight-bold">{formatVND(price)}</span>
                            )}
                        </div>
                    </div>
                </article>
            </div>
        );
    }

    // List View
    return (
        <article className="card card-product-list mb-3 shadow-sm border-0 rounded-lg hover-shadow overflow-hidden">
            <div className="row no-gutters">
                <aside className="col-4 col-md-3">
                    <Link
                        to={`/product-detail/${product.productId}`}
                        className="img-wrap h-100 bg-light d-flex align-items-center justify-content-center p-3"
                    >
                        {discount ? (
                            <span className="badge badge-danger position-absolute" style={{ top: 10, left: 10 }}>
                                -{discount}%
                            </span>
                        ) : null}
                        <img
                            src={imgUrl || require("../../asset/images/items/1.jpg")}
                            alt={product.productName}
                            style={{ maxHeight: 150 }}
                            className="img-fluid"
                            onError={(e) => { e.currentTarget.src = require("../../asset/images/items/1.jpg"); }}
                        />
                    </Link>
                </aside>

                <div className="col-8 col-md-6">
                    <div className="info-main p-3 p-md-4">
                        <Link to={`/product-detail/${product.productId}`} className="h6 h5-md title text-dark font-weight-bold">
                            {product.productName}
                        </Link>
                        <div className="rating-wrap mb-2 d-flex align-items-center small">
                            <ul className="rating-stars list-unstyled d-flex mb-0 mr-2 text-warning">
                                <li><IonIcon icon={star} /></li>
                                <li><IonIcon icon={star} /></li>
                                <li><IonIcon icon={star} /></li>
                                <li><IonIcon icon={star} /></li>
                                <li className="text-muted"><IonIcon icon={star} /></li>
                            </ul>
                            <span className="text-muted">4/5</span>
                        </div>
                        <p className="text-muted d-none d-md-block small">
                            {product?.description || "Không có mô tả"}
                        </p>
                    </div>
                </div>

                <aside className="col-12 col-md-3 border-left-md bg-light bg-md-transparent border-top border-md-top-0">
                    <div className="info-aside p-3 p-md-4 h-100 d-flex flex-row flex-md-column justify-content-between justify-content-md-center align-items-center align-items-md-stretch">
                        <div className="price-wrap mb-0 mb-md-2">
                            {special ? (
                                <div className="text-left text-md-center">
                                    <span className="h5 price text-primary font-weight-bold">{formatVND(special)}</span>
                                    <small className="text-muted d-block line-through-md"><del>{formatVND(price)}</del></small>
                                </div>
                            ) : (
                                <div className="text-left text-md-center">
                                    <span className="h5 price text-primary font-weight-bold">{formatVND(price)}</span>
                                    <small className="text-muted d-block">/sản phẩm</small>
                                </div>
                            )}
                        </div>
                        <Link to={`/product-detail/${product.productId}`} className="btn btn-primary btn-sm btn-md-block px-4 px-md-2">
                            Chi tiết
                        </Link>
                    </div>
                </aside>
            </div>
        </article>
    );
};

export default ProductItem;
