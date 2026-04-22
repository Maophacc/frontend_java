import React, { useEffect, useState } from 'react';
import DealDescription from '../pages/deals/DealDescription';
import DealList from '../pages/deals/DealList';
import { GET_PRODUCT } from '../config/apiService';

const Deals = () => {
    const [dealProducts, setDealProducts] = useState([]);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                // Fetch latest products since "discount" sort might return empty if no deals exist in DB
                const data = await GET_PRODUCT(0, 12, "productId", "desc");
                setDealProducts(data?.products ?? []);
            } catch (err) {
                console.error("Lỗi lấy dữ liệu Deals:", err);
            }
        };
        fetchDeals();
    }, []);

    return (
        <div className="bg-thns-gray-bg min-h-screen">
            <DealDescription />
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mt-4">
                        <DealList products={dealProducts} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Deals;