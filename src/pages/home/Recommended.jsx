import { Link } from "react-router-dom";
import HomeProductCard from "./HomeProductCard";

const Recommended = ({ products = [], title, isFlashSale = false, categoryId }) => {
    if (!products.length) {
        return null; // Do not render empty sections
    }

    const viewAllLink = categoryId ? `/category/${categoryId}` : "/listing";

    return (
        <section className="bg-white py-5">
            <div className="container">
                <header className="mb-5 text-center">
                    <h3 className="m-0 text-[28px] font-bold uppercase tracking-wide text-[#222222] relative inline-block pb-3">
                        {title}
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[2px] bg-[#e97081]"></span>
                    </h3>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0 border-t border-l border-gray-100">
                    {products.slice(0, 5).map((p) => (
                        <div key={p.productId} className="border-r border-b border-gray-100">
                            <HomeProductCard product={p} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link to={viewAllLink} className="inline-block px-8 py-3 border-2 border-[#222222] text-[#222222] font-bold uppercase text-sm tracking-widest hover:bg-[#222222] hover:text-white transition-colors">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Recommended;
