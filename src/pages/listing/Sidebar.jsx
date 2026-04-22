import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";

const Sidebar = ({ 
    categories = [], 
    selectedCategoryId = 0,
    priceMin, 
    priceMax, 
    onApplyPrice,
    onCategoryChange 
}) => {
    const [min, setMin] = useState(priceMin || "100");
    const [max, setMax] = useState(priceMax || "1000000");

    const apply = () => {
        onApplyPrice?.({ min, max });
    };

    const reset = () => {
        setMin("");
        setMax("");
        onApplyPrice?.({ min: "", max: "" });
    };

    return (
        <aside className="col-md-3">
            {/* Category Filter Group */}
            <div className="card mb-3 shadow-sm border-0">
                <div className="filter-group">
                    <header className="card-header bg-white border-bottom py-3">
                        <div className="d-flex align-items-center justify-content-between text-dark font-weight-bold">
                            <span className="text-uppercase small tracking-wider">Danh mục</span>
                            <IonIcon icon={chevronDownOutline} className="text-muted" />
                        </div>
                    </header>
                    <div className="filter-content px-3 py-3">
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                                <button
                                    onClick={() => onCategoryChange?.(0)}
                                    className={`btn btn-link btn-sm p-0 text-left w-100 no-underline shadow-none ${
                                        !selectedCategoryId || Number(selectedCategoryId) === 0 
                                        ? 'text-primary font-weight-bold' 
                                        : 'text-dark'
                                    }`}
                                    style={{ textDecoration: 'none', border: 'none', boxShadow: 'none' }}
                                >
                                    Tất cả sản phẩm
                                </button>
                            </li>
                            {categories && categories.length > 0 ? (
                                categories.map((cat) => (
                                    <li key={cat.categoryId} className="mb-2">
                                        <button
                                            onClick={() => onCategoryChange?.(cat.categoryId)}
                                            className={`btn btn-link btn-sm p-0 text-left w-100 no-underline shadow-none ${
                                                Number(selectedCategoryId) === Number(cat.categoryId) 
                                                ? 'text-primary font-weight-bold' 
                                                : 'text-dark'
                                            }`}
                                            style={{ textDecoration: 'none', border: 'none', boxShadow: 'none' }}
                                        >
                                            {cat.categoryName}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="text-muted small">Đang tải danh mục...</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Price Filter Group */}
            <div className="card mb-3 shadow-sm border-0">
                <div className="filter-group">
                    <header className="card-header bg-white border-bottom py-3">
                        <div className="d-flex align-items-center justify-content-between text-dark font-weight-bold">
                            <span className="text-uppercase small tracking-wider">Khoảng giá</span>
                            <IonIcon icon={chevronDownOutline} className="text-muted" />
                        </div>
                    </header>
                    <div className="filter-content">
                        <div className="card-body pt-3">
                            <div className="form-group mb-3">
                                <label className="text-dark mb-1 font-weight-bold" style={{ fontSize: '11px' }}>GIÁ TỪ (VNĐ)</label>
                                <input
                                    className="form-control form-control-sm bg-light border"
                                    type="number"
                                    placeholder="0"
                                    value={min}
                                    onChange={(e) => setMin(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-dark mb-1 font-weight-bold" style={{ fontSize: '11px' }}>ĐẾN (VNĐ)</label>
                                <input
                                    className="form-control form-control-sm bg-light border"
                                    type="number"
                                    placeholder="Vd: 500,000"
                                    value={max}
                                    onChange={(e) => setMax(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-sm btn-primary btn-block font-weight-bold shadow-sm" type="button" onClick={apply}>
                                ÁP DỤNG
                            </button>
                            <button className="btn btn-sm btn-light btn-block text-muted small mt-2 border" type="button" onClick={reset}>
                                XÓA BỘ LỌC
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
