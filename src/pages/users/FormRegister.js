import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
    mailOutline,
    lockClosedOutline,
    personOutline,
} from "ionicons/icons";
import { POST_REGISTER } from "../../config/apiService";

const FormRegister = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: true,
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const validate = () => {
        if (!form.username.trim()) return "Vui lòng nhập tên đăng nhập.";
        if (form.username.length < 3) return "Tên đăng nhập tối thiểu 3 ký tự.";
        if (!form.fullName.trim()) return "Vui lòng nhập họ tên.";
        if (!form.email.trim()) return "Vui lòng nhập email.";
        if (!form.password) return "Vui lòng nhập mật khẩu.";
        if (form.password.length < 6) return "Mật khẩu tối thiểu 6 ký tự.";
        if (form.password !== form.confirmPassword) return "Mật khẩu nhập lại không khớp.";
        if (!form.agree) return "Bạn cần đồng ý điều khoản sử dụng.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        const msg = validate();
        if (msg) {
            setErrorMsg(msg);
            return;
        }

        try {
            setLoading(true);
            await POST_REGISTER(
                form.username.trim(),
                form.email.trim(),
                form.fullName.trim(),
                form.password
            );
            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            navigate("/login", { replace: true });
        } catch (err) {
            const serverMsg =
                err?.response?.data ||
                err?.response?.data?.message ||
                "Đăng ký thất bại. Vui lòng thử lại.";
            setErrorMsg(typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-content padding-y" style={{ backgroundColor: "#f8f9fa", minHeight: "84vh" }}>
            <div className="card mx-auto shadow-sm border-0 rounded-lg" style={{ maxWidth: "450px", marginTop: "40px" }}>
                <article className="card-body">
                    <header className="mb-4 text-center">
                        <h4 className="card-title font-weight-bold">Đăng ký tài khoản</h4>
                        <small className="text-muted">Tham gia cộng đồng học cụ Pastel ngay</small>
                    </header>

                    {errorMsg ? (
                        <div className="alert alert-danger" role="alert">
                            {errorMsg}
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit}>
                        {/* Username */}
                        <div className="form-group">
                            <label>Tên đăng nhập</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-light">
                                        <IonIcon icon={personOutline} />
                                    </span>
                                </div>
                                <input
                                    name="username"
                                    value={form.username}
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ví dụ: nguyenvan_a"
                                    required
                                />
                            </div>
                        </div>

                        {/* FullName */}
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input
                                name="fullName"
                                value={form.fullName}
                                onChange={onChange}
                                type="text"
                                className="form-control"
                                placeholder="Nguyễn Văn A"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label>Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-light">
                                        <IonIcon icon={mailOutline} />
                                    </span>
                                </div>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={onChange}
                                    type="email"
                                    className="form-control"
                                    placeholder="example@gmail.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Mật khẩu</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light">
                                            <IonIcon icon={lockClosedOutline} />
                                        </span>
                                    </div>
                                    <input
                                        name="password"
                                        value={form.password}
                                        onChange={onChange}
                                        className="form-control"
                                        type="password"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Nhập lại</label>
                                <input
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={onChange}
                                    className="form-control"
                                    type="password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group mt-4">
                            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                                {loading ? "Đang xử lý..." : "Đăng ký ngay"}
                            </button>
                        </div>

                        <div className="form-group text-center">
                            <label className="custom-control custom-checkbox d-inline-block">
                                <input
                                    name="agree"
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={form.agree}
                                    onChange={onChange}
                                />
                                <div className="custom-control-label small">
                                    Tôi đồng ý với <a href="#" className="text-purple-600">điều khoản sử dụng</a>
                                </div>
                            </label>
                        </div>
                    </form>
                </article>
            </div>

            <p className="text-center mt-4">
                Đã có tài khoản?{" "}
                <Link to="/login" className="font-weight-bold text-purple-600">
                    Đăng nhập
                </Link>
            </p>
        </section>
    );
};

export default FormRegister;
