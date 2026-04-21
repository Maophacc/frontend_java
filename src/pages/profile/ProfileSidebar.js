import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
    personOutline,
    locationOutline,
    bagHandleOutline,
    heartOutline,
    storefrontOutline,
    settingsOutline,
    logOutOutline
} from 'ionicons/icons';
import { LOGOUT } from '../../config/apiService';

const ProfileSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path ? 'active font-weight-bold' : '';

    const handleLogout = (e) => {
        e.preventDefault();
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
            LOGOUT();
            navigate('/', { replace: true });
            window.location.reload(); // Đảm bảo trạng thái Navbar cũng được cập nhật
        }
    };

    return (
        <aside className="col-md-3">
            <nav className="list-group mb-4">
                <Link className={`list-group-item list-group-item-action ${isActive('/profile')}`} to="/profile">
                    <IonIcon icon={personOutline} className="mr-2" style={{ verticalAlign: '-2px' }} /> Tổng quan
                </Link>
                <Link className={`list-group-item list-group-item-action ${isActive('/profile/address')}`} to="/profile/address">
                    <IonIcon icon={locationOutline} className="mr-2" style={{ verticalAlign: '-2px' }} /> Địa chỉ
                </Link>
                <Link className={`list-group-item list-group-item-action ${isActive('/profile/wishlist')}`} to="/profile/wishlist">
                    <IonIcon icon={heartOutline} className="mr-2" style={{ verticalAlign: '-2px' }} /> Yêu thích
                </Link>
                <Link className={`list-group-item list-group-item-action ${isActive('/profile/seller')}`} to="/profile/seller">
                    <IonIcon icon={storefrontOutline} className="mr-2" style={{ verticalAlign: '-2px' }} /> Sản phẩm bán
                </Link>
                <Link className={`list-group-item list-group-item-action ${isActive('/profile/setting')}`} to="/profile/setting">
                    <IonIcon icon={settingsOutline} className="mr-2" style={{ verticalAlign: '-2px' }} /> Cài đặt
                </Link>
                <button 
                    className="list-group-item list-group-item-action text-danger border-top-0" 
                    onClick={handleLogout}
                    style={{ background: 'none', textAlign: 'left', cursor: 'pointer' }}
                >
                    <IonIcon icon={logOutOutline} className="mr-2" style={{ verticalAlign: '-2px' }} /> Đăng xuất
                </button>
            </nav>
        </aside>
    );
};

export default ProfileSidebar;