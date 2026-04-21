import { Link } from "react-router-dom";
import HomeProductCard from "./HomeProductCard";

const Recommended = ({ products = [], title, isFlashSale = false, categoryId }) => {
    if (!products.length) {
        return (
            <section className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100">
                <header className="mb-6">
                    <h3 className="section-title">{title}</h3>
                </header>
                <div className="text-gray-400 italic bg-gray-50 p-4 rounded-xl text-center">
                    Hiện tại chưa có sản phẩm nào trong mục này.
                </div>
            </section>
        );
    }

    const viewAllLink = categoryId ? `/category/${categoryId}` : "/listing";

    return (
        <section className={`rounded-[20px] overflow-hidden shadow-md transition-shadow hover:shadow-lg border border-gray-100 ${isFlashSale ? 'bg-gradient-to-br from-blue-700 to-indigo-900' : 'bg-white'}`}>
            <header className={`px-6 py-5 flex justify-between items-center ${isFlashSale ? '' : 'border-b border-gray-50'}`}>
                <h3 className={`m-0 ${isFlashSale ? 'text-white text-xl font-black uppercase tracking-tight' : 'section-title'}`}>
                    {title}
                </h3>
                <Link to={viewAllLink} className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                    isFlashSale 
                    ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md' 
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}>
                    Xem tất cả
                </Link>
            </header>

            <div className={`p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 ${isFlashSale ? 'bg-white/5 backdrop-blur-sm' : ''}`}>
                {products.slice(0, 5).map((p) => (
                    <HomeProductCard key={p.productId} product={p} />
                ))}
            </div>
        </section>
    );
};

export default Recommended;
