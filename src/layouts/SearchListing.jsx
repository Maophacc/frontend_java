import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
    gridOutline,
    listOutline,
    chevronBackOutline,
    chevronForwardOutline,
    searchOutline,
} from "ionicons/icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import Sidebar from "../pages/listing/Sidebar";
import ProductItem from "../pages/listing/ProductItem";
import Subscribe from "../pages/listing/Subscribe";

import { GET_PRODUCTS_BY_KEYWORD, GET_CATEGORIES } from "../config/apiService";

const DEFAULT_SIZE = 8;

const SearchListing = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // lấy keyword từ URL: /search?q=...
    const q = (searchParams.get("q") || "").trim();

    // local input (để người dùng gõ)
    const [keyword, setKeyword] = useState(q);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // data
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // paging (UI 0-based)
    const [page, setPage] = useState(0);
    const [size] = useState(DEFAULT_SIZE);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [lastPage, setLastPage] = useState(false);

    // Filtering
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    // UI state
    const [viewMode, setViewMode] = useState("grid");
    const [sortKey, setSortKey] = useState("NEWEST");
    const [priceMin, setPriceMin] = useState("100");
    const [priceMax, setPriceMax] = useState("1000000");

    useEffect(() => {
        document.title = q ? `Tìm kiếm: ${q}` : "Tìm kiếm sản phẩm";
    }, [q]);

    // Sync input khi URL đổi
    useEffect(() => {
        setKeyword(q);
        setSelectedCategoryId(0); // Reset filter khi đổi keyword chính
    }, [q]);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const data = await GET_CATEGORIES(0, 100);
                setCategories(data);
            } catch (e) {
                console.error("Fetch search cats error:", e);
            }
        };
        fetchCats();
    }, []);

    // Sort mapping
    const sortParamsMemo = useMemo(() => {
        let sortBy = "productId";
        let sortOrder = "desc";

        if (sortKey === "PRICE_ASC") {
            sortBy = "price"; // hoặc "specialPrice" nếu BE hỗ trợ sort field đó
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

    // Fetch
    const fetchProducts = useCallback(async () => {
        // nếu chưa có keyword thì không call API
        if (!q) {
            setLoading(false);
            setError("");
            setProducts([]);
            setTotalPages(1);
            setTotalElements(0);
            setLastPage(true);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const apiPageNumber = page;

            const data = await GET_PRODUCTS_BY_KEYWORD(
                q,
                apiPageNumber,
                size,
                sortParamsMemo.sortBy,
                sortParamsMemo.sortOrder,
                selectedCategoryId
            );

            const list = Array.isArray(data?.products) ? data.products : [];

            setProducts(list);
            setTotalPages(Number(data?.totalPages ?? 1));
            setTotalElements(Number(data?.totalElements ?? 0));
            setLastPage(page >= (data?.totalPages ?? 1) - 1);

            // sync page từ server (0-based)
            if (typeof data?.pageNumber === "number") {
                setPage(data.pageNumber);
            }
        } catch (e) {
            console.error("Fetch search error:", e);
            setError("Không tải được kết quả tìm kiếm.");
            setProducts([]);
            setTotalPages(1);
            setTotalElements(0);
            setLastPage(false);
        } finally {
            setLoading(false);
        }
    }, [q, page, size, sortParamsMemo.sortBy, sortParamsMemo.sortOrder]);

    // reset page khi đổi q/sort/filter
    useEffect(() => {
        setPage(0);
    }, [q, sortKey, priceMin, priceMax, selectedCategoryId]);

    // fetch khi thay đổi
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Filter giá client-side (giống Listing)
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

    // pagination helpers
    const canPrev = page > 0;
    const canNext = page < totalPages - 1 && !lastPage;

    const goPrev = () => canPrev && setPage((p) => p - 1);
    const goNext = () => canNext && setPage((p) => p + 1);

    const goToPage = (p) => {
        if (p < 0 || p > totalPages - 1) return;
        setPage(p);
    };

    const pageNumbers = useMemo(() => {
        const maxButtons = 5;
        const pages = [];
        const start = Math.max(0, page - 2);
        const end = Math.min(totalPages - 1, start + maxButtons - 1);
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    }, [page, totalPages]);

    // handlers
    const handleViewChange = (mode) => setViewMode(mode);
    const handleSortChange = (val) => setSortKey(val);

    const handleApplyPrice = ({ min, max }) => {
        setPriceMin(min);
        setPriceMax(max);
    };

    const handleCategoryChange = (id) => {
        setSelectedCategoryId(id);
    };

    // submit search -> update URL
    const onSubmitSearch = (e) => {
        e.preventDefault();
        const next = (keyword || "").trim();
        if (!next) {
            setSearchParams({});
            return;
        }
        navigate(`/search?q=${encodeURIComponent(next)}`);
    };

    return (
        <>
            <section className="section-content padding-y">
                <div className="container">
                    {/* SEARCH BAR */}
                    <div className="card card-body mb-3">
                        <form onSubmit={onSubmitSearch} className="form-inline">
                            <div className="input-group w-100">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <IonIcon icon={searchOutline} />
                                    </span>
                                </div>
                                <input
                                    className="form-control"
                                    placeholder="Nhập tên sản phẩm..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="submit">
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-2 text-muted">
                            {q ? (
                                <>Từ khoá: <strong>{q}</strong></>
                            ) : (
                                <>Nhập từ khoá để tìm sản phẩm.</>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        {/* SIDEBAR filter */}
                        <Sidebar
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
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
                                            : q
                                                ? `${filteredProducts.length}/${totalElements} sản phẩm`
                                                : "Chưa có từ khoá"}
                                    </strong>

                                    <select
                                        className="mr-2 form-control"
                                        value={sortKey}
                                        onChange={(e) => handleSortChange(e.target.value)}
                                        disabled={!q}
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

                            {!q && !loading ? (
                                <div className="text-muted">Hãy nhập từ khoá để tìm kiếm.</div>
                            ) : null}

                            {q && !loading && !error && filteredProducts.length === 0 ? (
                                <div className="text-muted">Không có sản phẩm phù hợp.</div>
                            ) : null}

                            {loading ? (
                                <div className="text-muted">Đang tải danh sách...</div>
                            ) : (
                                filteredProducts.map((p) => (
                                    <ProductItem key={p.productId} product={p} viewMode={viewMode} />
                                ))
                            )}

                            {/* PAGINATION */}
                            {q ? (
                                <nav className="mb-4 mt-4" aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${canPrev ? "" : "disabled"}`}>
                                            <button className="page-link" type="button" onClick={goPrev}>
                                                <IonIcon icon={chevronBackOutline} style={{ verticalAlign: "middle" }} />
                                            </button>
                                        </li>

                                        {pageNumbers.map((p) => (
                                            <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                                                <button className="page-link" type="button" onClick={() => goToPage(p)}>
                                                    {p + 1}
                                                </button>
                                            </li>
                                        ))}

                                        <li className={`page-item ${canNext ? "" : "disabled"}`}>
                                            <button className="page-link" type="button" onClick={goNext}>
                                                <IonIcon icon={chevronForwardOutline} style={{ verticalAlign: "middle" }} />
                                            </button>
                                        </li>
                                    </ul>

                                    {!loading && totalPages > 0 ? (
                                        <div className="text-center text-muted mt-2">
                                            Trang {page + 1}/{totalPages}
                                        </div>
                                    ) : null}
                                </nav>
                            ) : null}
                        </main>
                    </div>
                </div>
            </section>

            <Subscribe />
        </>
    );
};

export default SearchListing;
