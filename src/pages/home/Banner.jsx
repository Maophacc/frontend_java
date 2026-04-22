import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    const banners = [
        {
            id: 1,
            title: "OFFICE ESSENTIALS",
            subtitle: "Up to 30% Off",
            imgUrl: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=800&auto=format&fit=crop",
            link: "/category/1"
        },
        {
            id: 2,
            title: "ART SUPPLIES",
            subtitle: "New Arrivals",
            imgUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
            link: "/category/2"
        },
        {
            id: 3,
            title: "DESK ORGANIZERS",
            subtitle: "Minimalist Design",
            imgUrl: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop",
            link: "/category/3"
        }
    ];

    return (
        <section className="py-2">
            <div className="container">
                <div className="row">
                    {banners.map((banner) => (
                        <div key={banner.id} className="col-md-4 mb-4 mb-md-0">
                            <div className="group relative overflow-hidden h-[300px] w-full cursor-pointer">
                                {/* Image with zoom effect */}
                                <img 
                                    src={banner.imgUrl} 
                                    alt={banner.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Overlay & Content */}
                                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                                    <span className="text-white text-sm font-bold uppercase tracking-widest mb-2 opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {banner.subtitle}
                                    </span>
                                    <h3 className="text-white text-2xl font-black uppercase tracking-wide mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                        {banner.title}
                                    </h3>
                                    <Link 
                                        to={banner.link} 
                                        className="inline-block px-6 py-2 bg-white text-[#222222] font-bold text-xs uppercase tracking-widest hover:bg-[#e97081] hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;
