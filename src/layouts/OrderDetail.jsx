import React, { useEffect, useMemo, useState } from "react";
import ProfileSidebar from "../pages/profile/ProfileSidebar";
import { IonIcon } from "@ionic/react";
import {
    arrowBackOutline,
    printOutline,
    cardOutline,
    locationOutline,
    callOutline,
    mailOutline,
} from "ionicons/icons";
import { useNavigate, useParams } from "react-router-dom";

import { GET_ORDER_DETAIL, getUserObject, GET_IMG } from "../config/apiService";

const formatMoney = (v) => {
    const n = Number(v || 0);
    return n.toLocaleString("vi-VN") + " đ";
};

const formatDateTime = (s) => {
    if (!s) return "—";
    const d = new Date(s);
    if (isNaN(d.getTime())) return String(s);
    return d.toLocaleString("vi-VN");
};

// mapping mềm
const getOrderId = (o) => o?.orderId ?? o?.OrderId ?? o?.id ?? o?.orderNumber ?? "—";
const getOrderDate = (o) => o?.orderDate ?? o?.OrderDate ?? o?.createdAt ?? o?.date ?? null;
const getOrderStatus = (o) => o?.orderStatus ?? o?.Status ?? o?.status ?? "—";
const getPaymentMethod = (o) => o?.bill?.paymentMethod?.name ?? o?.Bill?.PaymentMethod?.Name ?? o?.paymentMethod ?? "—";

const OrderDetail = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [order, setOrder] = useState(null);

    const fetchDetail = async () => {
        try {
            setLoading(true);
            setError("");

            const userObj = getUserObject();
            if (!userObj) {
                setError("Bạn chưa đăng nhập.");
                setOrder(null);
                return;
            }

            const data = await GET_ORDER_DETAIL(orderId);
            setOrder(data);
        } catch (e) {
            console.error("Fetch order detail error:", e);
            setError("Không tải được chi tiết đơn hàng.");
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

    const items = useMemo(() => {
        if (!order) return [];
        return Array.isArray(order?.orderDetails)
            ? order.orderDetails
            : Array.isArray(order?.OrderDetails)
                ? order.OrderDetails
                : Array.isArray(order?.items)
                    ? order.items
                    : [];
    }, [order]);

    const subtotal = useMemo(() => {
        return items.reduce((sum, it) => {
            const qty = Number(it?.quantity ?? it?.qty ?? 1);
            const price = Number(it?.orderedProductPrice ?? it?.price ?? it?.product?.specialPrice ?? it?.product?.price ?? 0);
            return sum + qty * price;
        }, 0);
    }, [items]);

    const shippingFee = 0; // .NET models don't have this yet, or you can get from Bill
    const total = Number(order?.bill?.total ?? order?.Bill?.Total ?? order?.totalAmount ?? (subtotal + shippingFee));

    const ship = order?.customer ?? order?.Customer ?? {};
    const userInfo = order?.customer ?? order?.Customer ?? order?.user ?? order?.User ?? {};

    const handlePrint = () => window.print();

    return (
        <section className="section-content padding-y">
            <div className="container">
                <div>


                    <main >
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)} type="button">
                                <IonIcon icon={arrowBackOutline} className="mr-1" /> Quay lại
                            </button>

                            <button className="btn btn-outline-secondary btn-sm" onClick={handlePrint} type="button">
                                <IonIcon icon={printOutline} className="mr-1" /> In hóa đơn
                            </button>
                        </div>

                        {error ? <div className="alert alert-danger">{error}</div> : null}

                        {loading ? (
                            <div className="text-muted">Đang tải chi tiết đơn hàng...</div>
                        ) : !order ? (
                            <div className="card card-body text-muted">Không có dữ liệu đơn hàng.</div>
                        ) : (
                            <article className="card mb-4 shadow-sm border-0">
                                <header className="card-header bg-white">
                                    <strong className="d-inline-block mr-3">Mã đơn: #{getOrderId(order)}</strong>
                                    <span className="text-muted">Ngày đặt: {formatDateTime(getOrderDate(order))}</span>

                                    <div className="mt-2">
                                        <span className="badge badge-info mr-2">{getOrderStatus(order)}</span>
                                        <span className="text-muted">Thanh toán: {getPaymentMethod(order)}</span>
                                    </div>
                                </header>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h6 className="text-muted">Giao đến</h6>

                                            <div className="mb-2">
                                                <strong>{userInfo?.customerName ?? userInfo?.CustomerName ?? userInfo?.fullName ?? userInfo?.FullName ?? "—"}</strong>
                                            </div>

                                            <div className="text-muted">
                                                <div className="d-flex align-items-center mb-1">
                                                    <IonIcon icon={mailOutline} className="mr-2" />
                                                    {userInfo?.email ?? userInfo?.Email ?? "—"}
                                                </div>

                                                <div className="d-flex align-items-center mb-1">
                                                    <IonIcon icon={callOutline} className="mr-2" />
                                                    {ship?.phone ?? ship?.Phone ?? userInfo?.phone ?? userInfo?.Phone ?? "—"}
                                                </div>

                                                <div className="d-flex align-items-start">
                                                    <IonIcon icon={locationOutline} className="mr-2 mt-1" />
                                                    <span>
                                                        {ship?.address ?? ship?.Address ?? "—"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <h6 className="text-muted">Thanh toán</h6>
                                            <span className="text-success d-flex align-items-center">
                                                <IonIcon icon={cardOutline} className="mr-2 font-size-lg" />
                                                {getPaymentMethod(order)}
                                            </span>

                                            <p className="mt-2 mb-0">
                                                Tạm tính: {formatMoney(subtotal)} <br />
                                                Phí ship: {formatMoney(shippingFee)} <br />
                                                <span className="b font-weight-bold">Tổng cộng: {formatMoney(total)}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="text-muted bg-light">
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th className="text-center">SL</th>
                                                <th className="text-right">Giá</th>
                                                <th className="text-right">Thành tiền</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {items.map((it, idx) => {
                                                const p = it?.product ?? it?.Product ?? {};
                                                const name = p?.productName ?? p?.ProductName ?? p?.name ?? p?.Name ?? it?.productName ?? "Sản phẩm";
                                                const qty = Number(it?.quantity ?? it?.Quantity ?? 1);
                                                const price = Number(it?.unitPrice ?? it?.UnitPrice ?? p?.specialPrice ?? p?.Price ?? 0);
                                                const lineTotal = qty * price;

                                                const imgField = p?.imageUrl ?? p?.ImageUrl ?? p?.image ?? p?.Image;
                                                const imgSrc = (imgField && (imgField.startsWith("http") || imgField.startsWith("data:")))
                                                    ? imgField
                                                    : (imgField ? GET_IMG(imgField) : null);

                                                return (
                                                    <tr key={it?.orderItemId ?? idx}>
                                                        <td width="420">
                                                            <div className="d-flex align-items-center">
                                                                <div className="mr-3">
                                                                    {imgSrc ? (
                                                                        <img
                                                                            src={imgSrc}
                                                                            alt={name}
                                                                            className="img-xs border rounded"
                                                                            style={{ width: 48, height: 48, objectFit: "cover" }}
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            className="border rounded bg-light"
                                                                            style={{ width: 48, height: 48 }}
                                                                        />
                                                                    )}
                                                                </div>

                                                                <div>
                                                                    <div className="font-weight-bold">{name}</div>
                                                                    {p?.category?.categoryName ? (
                                                                        <small className="text-muted">{p.category.categoryName}</small>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="text-center">{qty}</td>
                                                        <td className="text-right">{formatMoney(price)}</td>
                                                        <td className="text-right font-weight-bold">{formatMoney(lineTotal)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>

                                    </table>
                                </div>
                            </article>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
};

export default OrderDetail;
