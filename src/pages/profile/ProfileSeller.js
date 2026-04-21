import React from 'react';
import ProfileSidebar from './ProfileSidebar';
import { IonIcon } from '@ionic/react';
import { createOutline, eyeOutline } from 'ionicons/icons';

const ProfileSeller = () => {
    return (
        <section className="section-content padding-y">
            <div className="container">
                <div className="row">
                    <ProfileSidebar />
                    <main className="col-md-9">
                        <article className="card shadow-sm border-0">
                            <div className="card-body">
                                <div className="row">
                                    {[1, 2].map((item, index) => (
                                        <div className="col-md-4" key={index}>
                                            <figure className="card card-product-grid border-0 shadow-sm">
                                                <div className="img-wrap">
                                                    <img src={require(`../../asset/images/items/${index + 1}.jpg`)} alt="" />
                                                </div>
                                                <figcaption className="info-wrap">
                                                    <a href="#" className="title mb-2 text-truncate">Sản phẩm bạn đang bán {item}</a>
                                                    <div className="price-wrap mb-3">
                                                        <span className="price">$32.00</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <a href="#" className="btn btn-sm btn-outline-secondary flex-grow-1 mr-1">
                                                            <IonIcon icon={createOutline} className="mr-1" /> Sửa
                                                        </a>
                                                        <a href="#" className="btn btn-sm btn-primary flex-grow-1">
                                                            <IonIcon icon={eyeOutline} className="mr-1" /> Xem
                                                        </a>
                                                    </div>
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

export default ProfileSeller;