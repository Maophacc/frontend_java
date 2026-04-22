import { Link } from "react-router-dom"
import HomeProductCard from "./HomeProductCard"
import { IonIcon } from "@ionic/react"
import { flash } from "ionicons/icons"

const Daily = ({ products = [] }) => {
    if (!products.length) return null;

    return (
        <section className="bg-white rounded-[20px] overflow-hidden shadow-md border border-gray-100">
            <header className="px-6 py-5 flex justify-between items-center bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-xl backdrop-blur-md">
                        <IonIcon icon={flash} className="text-2xl text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black uppercase text-white m-0 tracking-tight">
                            ƯU ĐÃI HỌC TẬP
                        </h3>
                        <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Săn deal chớp nhoáng</p>
                    </div>
                </div>
                <Link to="/deals" className="text-xs font-bold uppercase tracking-wider text-white bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-all backdrop-blur-md">
                    Xem tất cả
                </Link>
            </header>

            <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 bg-orange-50/20">
                {products.slice(0, 5).map((p) => (
                    <HomeProductCard key={p.productId} product={p} />
                ))}
            </div>
        </section>
    )
}

export default Daily