import Slider from '../pages/home/Slider';
import Recommended from '../pages/home/Recommended';
import Banner from '../pages/home/Banner';
import Daily from '../pages/home/Daily';
import BannerBottom from '../pages/home/BannerBottom';
import { useEffect, useState } from 'react';
import { GET_PRODUCT, GET_PRODUCTS_BY_CATEGORY, GET_CATEGORIES } from '../config/apiService';

const Home = () => {
    useEffect(() => {
        document.title = 'Pastel Stationery - Cửa hàng học cụ';
    }, []);

    const [recommendedData, setRecommendedData] = useState([]);
    const [dynamicCategories, setDynamicCategories] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHomeData = async () => {
        try {
            setLoading(true);
            
            // 1. Fetch recommended products (random)
            const recRes = await GET_PRODUCT(0, 5, "random");
            setRecommendedData(recRes?.products ?? []);

            // 2. Fetch first 5 categories and their products
            const allCats = await GET_CATEGORIES(0, 10, "categoryId", "asc"); // Fetch more to filter out empty ones
            const top5Cats = allCats.slice(0, 10); // Still check top ones
            
            const catCollections = await Promise.all(top5Cats.map(async (cat) => {
                const prodRes = await GET_PRODUCTS_BY_CATEGORY(cat.categoryId, 0, 5, "productId", "desc");
                return {
                    id: cat.categoryId,
                    name: cat.categoryName,
                    products: prodRes?.products ?? []
                };
            }));

            // Filter out empty categories and limit to 5
            setDynamicCategories(catCollections.filter(c => c.products.length > 0).slice(0, 5));

            // 3. Fetch daily deals (random from category 1 or just general deals)
            const dailyRes = await GET_PRODUCTS_BY_CATEGORY(1, 0, 5, "random");
            setDailyData(dailyRes?.products ?? []);

        } catch (error) {
            console.error("Lỗi lấy dữ liệu trang chủ:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeData();
    }, []);

    return (
        <div className="bg-[#f0f2f5] min-h-screen pb-20 font-sans">
            <Slider />
            <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col gap-12">
                <Banner />
                
                {/* General Recommended Section */}
                <Recommended 
                    products={recommendedData} 
                    title="GỢI Ý HÔM NAY" 
                    isFlashSale={true} 
                />

                {/* Dynamic Category Sections */}
                {dynamicCategories.map((cat, index) => (
                    <Recommended 
                        key={cat.id} 
                        products={cat.products} 
                        title={cat.name.toUpperCase()} 
                        categoryId={cat.id}
                        isFlashSale={false}
                    />
                ))}

                <Daily products={dailyData} />
                <BannerBottom />
            </div>
        </div>
    );
}

export default Home;