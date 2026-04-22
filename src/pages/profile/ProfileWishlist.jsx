import React from 'react';
import ProfileSidebar from './ProfileSidebar';
import { IonIcon } from '@ionic/react';
import { cartOutline, trashOutline } from 'ionicons/icons';

const ProfileWishlist = () => {
    return (
        <section className="section-content padding-y">
            <div className="container">
                <div className="row">
                    <ProfileSidebar />
                    <main className="col-md-9">
                        <article className="card shadow-sm border-0">
                            <div className="card-body">
                                <div className="row">
                                    {[1, 2, 3].map((item, index) => (
                                        <div className="col-md-6" key={index}>
                                            <figure className="itemside mb-4">
                                                <div className="aside">
                                                    <img src={require(`../../asset/images/items/${index + 1}.jpg`)} className="border img-md rounded" alt="" />
                                                </div>
                                                <figcaption className="info">
                                                    <a href="#" className="title h6">Tên sản phẩm yêu thích {item}</a>
                                                    <p className="price mb-2 text-danger font-weight-bold">$80</p>

                                                    <a href="#" className="btn btn-primary btn-sm mr-2">
                                                        <IonIcon icon={cartOutline} className="mr-1" /> Thêm giỏ hàng
                                                    </a>
                                                    <a href="#" className="btn btn-light btn-sm text-danger border" title="Xóa khỏi wishlist">
                                                        <IonIcon icon={trashOutline} />
                                                    </a>
                                                </figcaption>
                                            </figure>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </main>
                </div>
            </div>
        </section>
    );
};

export default ProfileWishlist;