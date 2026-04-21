import React, { useEffect, useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import { IonIcon } from '@ionic/react';
import {
    locationOutline,
    createOutline,
    bagCheckOutline,
    heartCircleOutline,
    timeOutline,
    checkmarkDoneOutline,
    calendarOutline
} from 'ionicons/icons';
import { callApi, getUserObject } from '../../config/apiService';

const ProfileMain = () => {
    const [user, setUser] = useState(getUserObject() || {});
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const data = await callApi("Auth/profile", "GET");
            setUser(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        window.addEventListener("auth-change", fetchProfile);
        return () => window.removeEventListener("auth-change", fetchProfile);
    }, []);

    if (loading && !user.fullName) {
        return (
            <div className="text-center padding-y" style={{ minHeight: "60vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Đang tải...</span>
                </div>
            </div>
        );
    }

    return (
        <section className="section-content padding-y">
            <div className="container">
                <div className="row">
                    <ProfileSidebar />
                    <main className="col-md-9">
                        <article className="card mb-3 shadow-sm border-0">
                            <div className="card-body">
                                <figure className="icontext">
                                    <div className="icon">
                                        <img className="rounded-circle img-sm border" src={require('../../asset/images/avatars/avatar3.jpg')} alt="user" />
                                    </div>
                                    <div className="text">
                                        <strong> {user.fullName || user.username || "Người dùng"} </strong> <br />
                                        <p className="mb-2 text-muted"> {user.email || "Chưa cập nhật email"} </p>
                                        <button onClick={() => alert("Tính năng đang phát triển")} className="btn btn-light btn-sm px-3">
                                            <IonIcon icon={createOutline} style={{ verticalAlign: 'middle' }} /> Sửa
                                        </button>
                                    </div>
                                </figure>
                                <hr />
                                <p>
                                    <IonIcon icon={locationOutline} className="text-muted mr-2" />
                                    Tài khoản: <strong>{user.username}</strong> &nbsp; | &nbsp; 
                                    Vai trò: <span className="badge badge-info">{user.role || "User"}</span>
                                </p>

                                <article className="card-group card-stat mt-4">
                                    <figure className="card bg-light border-0 mr-2 rounded p-3">
                                        <div className="p-2 d-flex align-items-center">
                                            <div className="mr-3 text-primary"><IonIcon icon={bagCheckOutline} size="large" /></div>
                                            <div>
                                                <h4 className="title">0</h4>
                                                <span>Đơn hàng</span>
                                            </div>
                                        </div>
                                    </figure>
                                    <figure className="card bg-light border-0 mr-2 rounded p-3">
                                        <div className="p-2 d-flex align-items-center">
                                            <div className="mr-3 text-danger"><IonIcon icon={heartCircleOutline} size="large" /></div>
                                            <div>
                                                <h4 className="title">0</h4>
                                                <span>Yêu thích</span>
                                            </div>
                                        </div>
                                    </figure>
                                    <figure className="card bg-light border-0 rounded p-3">
                                        <div className="p-2 d-flex align-items-center">
                                            <div className="mr-3 text-warning"><IonIcon icon={timeOutline} size="large" /></div>
                                            <div>
                                                <h4 className="title">0</h4>
                                                <span>Đang chờ</span>
                                            </div>
                                        </div>
                                    </figure>
                                </article>
                            </div>
                        </article>

                        <article className="card mb-3 shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Hoạt động gần đây</h5>
                                <div className="text-center text-muted py-4">
                                    <p>Bạn chưa có đơn hàng hoặc hoạt động nào gần đây.</p>
                                </div>
                                <button onClick={() => alert("Chưa có danh sách đơn hàng")} className="btn btn-outline-primary btn-block mt-3"> Xem tất cả đơn hàng </button>
                            </div>
                        </article>
                    </main>
                </div>
            </div>
        </section>
    );
};

export default ProfileMain;