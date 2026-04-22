import React from "react";

// =====================================================================
// HƯỚNG DẪN THAY ĐỔI ẢNH BANNER:
// 1. Chuẩn bị ảnh của bạn và copy/paste vào thư mục: src/asset/images/banners/
// 2. Thay đổi tên file ở các dòng import bên dưới cho khớp với tên ảnh của bạn.
// =====================================================================
import slide1 from "../../asset/images/banners/banner_2.png";
import subBanner1 from "../../asset/images/banners/banner_3.jpg";
import subBanner2 from "../../asset/images/banners/banner_1.jpg";

const Slider = () => {
    return (
        <section className="bg-white pb-8">
            <div className="w-full">
                {/* Main Slider (Full Width) */}
                <div className="w-full overflow-hidden relative group">
                    <div id="carousel1_indicator" className="carousel slide h-full" data-ride="carousel">
                        <div className="carousel-inner h-full">
                            {/* Slide 1 */}
                            <div className="carousel-item active h-full">
                                <img src={slide1} className="d-block w-full h-full object-cover" alt="Main Banner" style={{minHeight: '400px', maxHeight: '600px'}} />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-2xl px-4 text-center animate-in slide-in-from-bottom-8 duration-700">
                                    <span className="text-gray-800 text-sm md:text-base font-bold mb-2 inline-block tracking-widest uppercase bg-white/70 px-2 py-1 rounded">New Arrivals 2026</span>
                                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight drop-shadow-md">WORKSTATION <br className="hidden md:block"/>ESSENTIALS</h2>
                                    <p className="text-gray-800 font-medium mb-6 d-none d-md-block mx-auto max-w-md bg-white/70 p-2 rounded">Discover our latest collection of premium office and study supplies designed to boost your productivity.</p>
                                    <button className="bg-[#e97081] hover:bg-[#d65c6d] text-white px-8 py-3 font-bold text-sm uppercase transition-all mx-auto shadow-lg">
                                        SHOP NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-Banners Below Slider */}
                <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2 overflow-hidden group relative">
                        <img src={subBanner1} className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-105" alt="Học cụ" />
                        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Sale up to 20%</span>
                            <h3 className="text-gray-900 font-black text-2xl mt-1 mb-3">SỔ TAY<br/>VINTAGE</h3>
                            <a href="#" className="text-sm font-bold text-[#e97081] hover:text-[#222222] uppercase border-b-2 border-[#e97081] pb-1 transition-colors">Shop Now</a>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 overflow-hidden group relative">
                        <img src={subBanner2} className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-105" alt="Bút vẽ" />
                        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">New Arrival</span>
                            <h3 className="text-gray-900 font-black text-2xl mt-1 mb-3">BỘ BÚT<br/>VẼ MÀU</h3>
                            <a href="#" className="text-sm font-bold text-[#e97081] hover:text-[#222222] uppercase border-b-2 border-[#e97081] pb-1 transition-colors">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Slider;