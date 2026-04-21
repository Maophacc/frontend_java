import React from 'react';
import HomeProductCard from '../home/HomeProductCard';

const DealList = ({ products = [] }) => {
    if (!products.length) {
        return <div className="text-center text-gray-500 py-10">Đang tải dữ liệu hoặc chưa có khuyến mãi nào...</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p) => (
                <HomeProductCard key={p.productId} product={p} />
            ))}
        </div>
    );
};

export default DealList;