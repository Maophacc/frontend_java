import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
    gridOutline,
    listOutline,
    chevronBackOutline,
    chevronForwardOutline,
} from "ionicons/icons";
import { useNavigate, useParams } from "react-router-dom";

import FilterTop from "../pages/listing/FilterTop";
import Sidebar from "../pages/listing/Sidebar";
import ProductItem from "../pages/listing/ProductItem";
import Subscribe from "../pages/listing/Subscribe";

import { GET_PRODUCT, GET_PRODUCTS_BY_CATEGORY, GET_CATEGORIES } from "../config/apiService";

const DEFAULT_SIZE = 8;

const Listing = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // data
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // paging (UI dùng 0-based)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(DEFAULT_SIZE);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [lastPage, setLastPage] = useState(false);

    // UI state
    const [viewMode, setViewMode] = useState("grid");
    const [sortKey, setSortKey] = useState("NEWEST");
    const [priceMin, setPriceMin] = useState("100");
    const [priceMax, setPriceMax] = useState("1000000");

    useEffect(() => {
        document.title = categoryId ? "Danh mục sản phẩm" : "Tất cả sản phẩm";
    }, [categoryId]);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const data = await GET_CATEGORIES(0, 100);
                setCategories(data);
            } catch (e) {
                console.error("Fetch categories error:", e);
            }
        };
        fetchCats();
    }, []);

    // Sort mapping
    const sortParams = useMemo(() => {
        let sortBy = "productId";
        let sortOrder = "desc";

        if (sortKey === "PRICE_ASC") {
            sortBy = "price"; // hoặc "specialPrice" nếu bạn muốn sort theo giá sau giảm
            sortOrder = "asc";
        } else if (sortKey === "PRICE_DESC") {
            sortBy = "price";
            sortOrder = "desc";
        } else {
            sortBy = "productId";
            sortOrder = "desc";
        }

        return { sortBy, sortOrder };
    }, [sortKey]);

    // ---- FETCH ----
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            // Backend controller is using 0-based pageNumber: Skip(pageNumber * pageSize)
            const apiPageNumber = page;

            let data;
            if (categoryId) {
                data = await GET_PRODUCTS_BY_CATEGORY(
                    categoryId,
                    apiPageNumber,
                    size,
                    sortParams.sortBy,
                    sortParams.sortOrder
                );
            } else {
                data = await GET_PRODUCT(
                    apiPageNumber,
                    size,
                    sortParams.sortBy,
                    sortParams.sortOrder
                );
            }

            // data shape: { products: [], pageNumber, pageSize, totalElements, totalPages, lastPage }
            const list = Array.isArray(data?.products) ? data.products : [];

            setProducts(list);
            setTotalPages(Number(data?.totalPages ?? 1));
            setTotalElements(Number(data?.totalElements ?? 0));
            setLastPage(Boolean(data?.lastPage));

            // backend trả pageNumber 0-based => sync lại UI
            if (typeof data?.pageNumber === "number") {
                setPage(data.pageNumber);
            }
        } catch (e) {
            console.error("Fetch listing error:", e);
            setError("Không tải được danh sách sản phẩm.");
            setProducts([]);
            setTotalPages(1);
            setTotalElements(0);
            setLastPage(false);
        } finally {
            setLoading(false);
        }
    }, [categoryId, page, size, sortParams.sortBy, sortParams.sortOrder]);

    // reset page khi đổi category hoặc sort/size hoặc filter giá
    useEffect(() => {
        setPage(0);
    }, [categoryId, sortKey, size, priceMin, priceMax]);

    // fetch khi page/category/sort/size thay đổi
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // ---- FILTER (client-side) ----
    const filteredProducts = useMemo(() => {
        const min = priceMin !== "" ? Number(priceMin) : null;
        const max = priceMax !== "" ? Number(priceMax) : null;

        return (products || []).filter((p) => {
            const price = Number(p?.specialPrice ?? p?.price ?? 0);
            if (min !== null && price < min) return false;
            if (max !== null && price > max) return false;
            return true;
        });
    }, [products, priceMin, priceMax]);

    // ---- pagination helpers ----
    const canPrev = page > 0;
    const canNext = page < totalPages - 1 && !lastPage;

    const goPrev = () => canPrev && setPage((p) => p - 1);
    const goNext = () => canNext && setPage((p) => p + 1);

    const goToPage = (p) => {
        if (p < 0 || p > totalPages - 1) return;
        setPage(p);
    };

    // render page numbers (tối đa 5 nút)
    const pageNumbers = useMemo(() => {
        const maxButtons = 5;
        const pages = [];
        const start = Math.max(0, page - 2);
        const end = Math.min(totalPages - 1, start + maxButtons - 1);

        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    }, [page, totalPages]);

    // ---- handlers ----
    const handleSortChange = (val) => setSortKey(val);
    const handleViewChange = (mode) => setViewMode(mode);

    const handleApplyPrice = ({ min, max }) => {
        setPriceMin(min);
        setPriceMax(max);
    };

    const handleCategoryChange = (id) => {
        if (!id || id === 0) navigate("/listing");
        else navigate(`/category/${id}`);
    };

    return (
        <>
            <section className="section-content padding-y">
                <div className="container">
                    <FilterTop
                        categoryId={categoryId}
                        title={categoryId ? "Danh sách theo danh mục" : "Tất cả sản phẩm"}
                    />

                    <div className="row">
                        <Sidebar
                            categories={categories}
                            selectedCategoryId={categoryId}
                            priceMin={priceMin}
                            priceMax={priceMax}
                            onApplyPrice={handleApplyPrice}
                            onCategoryChange={handleCategoryChange}
                        />

                        <main className="col-md-9">
                            <header className="mb-3 pb-3 border-bottom">
                                <div className="form-inline">
                                    <strong className="mr-md-auto">
                                        {loading
                                            ? "Đang tải..."
                                            : `${filteredProducts.length}/${totalElements} sản phẩm`}
                                    </strong>

                                    <select
                                        className="mr-2 form-control"
                                        value={sortKey}
                                        onChange={(e) => handleSortChange(e.target.value)}
                                    >
                                        <option value="NEWEST">Mới nhất</option>
                                        <option value="PRICE_ASC">Giá thấp nhất</option>
                                        <option value="PRICE_DESC">Giá cao nhất</option>
                                    </select>

                                    <div className="btn-group shadow-sm rounded overflow-hidden">
                                        <button
                                            type="button"
                                            className="btn btn-white border-0 py-2 px-3 transition-all"
                                            style={{ backgroundColor: viewMode === "list" ? "#ffd5a1" : "white" }}
                                            title="List view"
                                            onClick={() => handleViewChange("list")}
                                        >
                                            <IonIcon icon={listOutline} style={{ fontSize: "1.2rem", verticalAlign: "middle" }} />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-white border-0 py-2 px-3 transition-all"
                                            style={{ backgroundColor: viewMode === "grid" ? "#ffd5a1" : "white" }}
                                            title="Grid view"
                                            onClick={() => handleViewChange("grid")}
                                        >
                                            <IonIcon icon={gridOutline} style={{ fontSize: "1.2rem", verticalAlign: "middle" }} />
                                        </button>
                                    </div>
                                </div>
                            </header>

                            {error ? <div className="alert alert-danger">{error}</div> : null}

                            {!loading && !error && filteredProducts.length === 0 ? (
                                <div className="text-muted">Không có sản phẩm phù hợp.</div>
                            ) : null}

                            {loading ? (
                                <div className="text-muted">Đang tải danh sách...</div>
                            ) : (
                                <div className={viewMode === "grid" ? "row" : ""}>
                                    {filteredProducts.map((p) => (
                                        <ProductItem key={p.productId} product={p} viewMode={viewMode} />
                                    ))}
                                </div>
                            )}

                            {/* PAGINATION */}
                            <nav className="mb-4 mt-4" aria-label="Page navigation">
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${canPrev ? "" : "disabled"}`}>
                                        <button className="page-link" type="button" onClick={goPrev}>
                                            <IonIcon
                                                icon={chevronBackOutline}
                                                style={{ verticalAlign: "middle" }}
                                            />
                                        </button>
                                    </li>

                                    {pageNumbers.map((p) => (
                                        <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                                            <button
                                                className="page-link"
                                                type="button"
                                                onClick={() => goToPage(p)}
                                            >
                                                {p + 1}
                                            </button>
                                        </li>
                                    ))}

                                    <li className={`page-item ${canNext ? "" : "disabled"}`}>
                                        <button className="page-link" type="button" onClick={goNext}>
                                            <IonIcon
                                                icon={chevronForwardOutline}
                                                style={{ verticalAlign: "middle" }}
                                            />
                                        </button>
                                    </li>
                                </ul>

                                {!loading && totalPages > 0 ? (
                                    <div className="text-center text-muted mt-2">
                                        Trang {page + 1}/{totalPages}
                                    </div>
                                ) : null}
                            </nav>

                            <div className="card card-body text-center shadow-sm border-0 bg-light">
                                <p className="mb-2">Bạn có tìm thấy sản phẩm mong muốn không?</p>
                                <div>
                                    <button className="btn btn-outline-primary btn-sm mx-1" type="button">
                                        Có
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm mx-1" type="button">
                                        Không
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            <Subscribe />
        </>
    );
};

export default Listing;
