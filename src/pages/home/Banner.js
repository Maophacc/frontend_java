import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <section className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Banner 1 - Stationery Sets */}
                <div className="relative rounded-2xl overflow-hidden shadow-sm group h-48 md:h-64 border border-purple-100">
                    <img
                        src="https://images.unsplash.com/photo-1513542789411-b6a5d4f313a4?q=80&w=1200&auto=format&fit=crop"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                        alt="Stationery Sets"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-900/40 to-transparent"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-center text-white w-2/3">
                        <h2 className="text-2xl md:text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 uppercase tracking-tight">Học cụ sáng tạo<br />Ươm mầm tài năng</h2>
                        <p className="mb-6 text-sm md:text-base text-purple-100 line-clamp-2">Ưu đãi đến 50% cho các bộ dụng cụ học tập mới nhất mùa tựu trường.</p>
                        <div>
                            <Link to="/listing" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2.5 px-7 rounded-full transition-all duration-300 hover:shadow-purple-500/40 hover:-translate-y-0.5">
                                MUA NGAY
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Banner 2 - Backpacks */}
                <div className="relative rounded-2xl overflow-hidden shadow-sm group h-48 md:h-64 border border-purple-100">
                    <img
                        src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                        alt="School Backpacks"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-pink-900/80 via-pink-900/40 to-transparent"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-end text-right text-white ml-auto w-2/3">
                        <h2 className="text-2xl md:text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-l from-yellow-200 to-pink-300 uppercase tracking-tight">Ba lô xinh xắn<br />Cùng bé tới trường</h2>
                        <p className="mb-6 text-sm md:text-base text-pink-100 line-clamp-2">Sản phẩm chống gù lưng, chất liệu cao cấp, bảo hành 12 tháng.</p>
                        <div>
                            <Link to="/listing" className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-2.5 px-7 rounded-full transition-all duration-300 hover:shadow-pink-400/40 hover:-translate-y-0.5">
                                XEM CHI TIẾT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
