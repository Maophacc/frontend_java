import { Link } from 'react-router-dom'

const BannerBottom = () => {
    return (
        <section className="mb-8">
            <article className="relative rounded-2xl overflow-hidden shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500">
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
                
                <div className="text-white mr-auto z-10 flex flex-col gap-2">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Quà tặng ý nghĩa!</h3>
                    <p className="text-purple-100 text-lg">Miễn phí gói quà cho mọi đơn hàng từ 200k. Gửi gắm yêu thương qua từng trang giấy.</p>
                </div>
                <div className="mt-6 md:mt-0 z-10">
                    <Link to="/listing" className="inline-block bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300 font-bold uppercase py-3 px-8 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                        XEM NGAY BỘ SƯU TẬP
                    </Link>
                </div>
            </article>
        </section>
    )
}

export default BannerBottom