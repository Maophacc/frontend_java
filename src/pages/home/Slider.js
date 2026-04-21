const Slider = () => {
    return (
        <section className="bg-white pt-8 pb-8">
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
                {/* Main Slider (Left) */}
                <div className="w-full lg:w-3/4 rounded-[30px] overflow-hidden shadow-xl relative border border-purple-50 group">
                    <div id="carousel1_indicator" className="carousel slide h-full" data-ride="carousel" data-interval="5000">
                        <ol className="carousel-indicators mb-6">
                            <li data-target="#carousel1_indicator" data-slide-to="0" className="active w-8 h-1.5 rounded-full mx-1"></li>
                            <li data-target="#carousel1_indicator" data-slide-to="1" className="w-8 h-1.5 rounded-full mx-1"></li>
                            <li data-target="#carousel1_indicator" data-slide-to="2" className="w-8 h-1.5 rounded-full mx-1"></li>
                        </ol>
                        <div className="carousel-inner h-full">
                            {/* Slide 1 - Pens */}
                            <div className="carousel-item active h-full">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-transparent z-10"></div>
                                <img src="https://images.unsplash.com/photo-1585336139118-b0a5146c8793?q=80&w=1200&auto=format&fit=crop" className="d-block w-full h-full object-cover animate-ken-burns group-hover:scale-105" alt="Stationery Set" style={{minHeight: '420px'}} />
                                <div className="absolute bottom-12 left-12 z-20 max-w-md animate-in slide-in-from-left-8 duration-700">
                                    <span className="bg-white/90 text-purple-600 px-4 py-1.5 rounded-full text-xs font-black mb-4 inline-block tracking-widest uppercase">Bộ sưu tập mới</span>
                                    <h2 className="text-4xl font-black text-white mb-4 leading-tight drop-shadow-lg">BÚT XINH MỖI NGÀY <br/>CHÍNH HÃNG 100%</h2>
                                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-purple-500/40">
                                        SĂN DEAL NGAY
                                    </button>
                                </div>
                            </div>
                            {/* Slide 2 - Notebooks */}
                            <div className="carousel-item h-full">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-transparent z-10"></div>
                                <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop" className="d-block w-full h-full object-cover animate-ken-burns group-hover:scale-105" alt="Notebooks" style={{minHeight: '420px'}} />
                                <div className="absolute bottom-12 left-12 z-20 max-w-md animate-in slide-in-from-left-8 duration-700">
                                    <h2 className="text-4xl font-black text-white mb-4 leading-tight drop-shadow-lg">GÓC HỌC TẬP <br/>MƠ ƯỚC</h2>
                                    <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold transition-all shadow-xl">
                                        KHÁM PHÁ BỘ SƯU TẬP
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right static banners */}
                <div className="w-full lg:w-1/4 flex flex-col gap-6">
                    <div className="rounded-[25px] overflow-hidden shadow-lg h-1/2 flex-1 border border-purple-50 group relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110" alt="Học cụ" />
                        <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                            <p className="text-white font-black text-lg">SỔ TAY VINTAGE</p>
                            <span className="text-white/80 text-xs font-bold">GIẢM ĐẾN 20%</span>
                        </div>
                    </div>
                    <div className="rounded-[25px] overflow-hidden shadow-lg h-1/2 flex-1 border border-purple-50 group relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img src="https://images.unsplash.com/photo-1603539855734-d07937aa83f6?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110" alt="Bút vẽ" />
                        <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                            <p className="text-white font-black text-lg">BỘ BÚT VẼ MÀU</p>
                            <span className="text-white/80 text-xs font-bold">BỘ SƯU TẬP MỚI</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Slider;