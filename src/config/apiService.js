// APIService.js (React Web)

import axios from "axios";

const API_URL = "https://studentshop.onrender.com/api";

// ===== Token & Email (localStorage) =====
export function getToken() {
  return localStorage.getItem("jwt-token");
}

export function setToken(token) {
  localStorage.setItem("jwt-token", token);
}

export function removeToken() {
  localStorage.removeItem("jwt-token");
}

export function getUserEmail() {
  return localStorage.getItem("user-email");
}

export function setUserEmail(email) {
  localStorage.setItem("user-email", email);
}

export function removeEmail() {
  localStorage.removeItem("user-email");
}

export function getBestEmail() {
  const email = getUserEmail();
  if (email) return email;
  
  const user = getUserObject();
  return user?.email || user?.Email || user?.username || user?.Username || "";
}

export function setUserObject(userObj) {
  localStorage.setItem("user", JSON.stringify(userObj));
}

export function getUserObject() {
  const raw = localStorage.getItem("user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function removeUserObject() {
  localStorage.removeItem("user");
}

// ===== Axios instance =====
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Auto attach token
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ===== callApi (return res.data giống file Web bạn đang dùng) =====
export async function callApi(endpoint, method = "GET", data = null, params = null) {
  try {
    const res = await axiosInstance({
      method,
      url: endpoint.startsWith("/") ? endpoint : `/${endpoint}`,
      data,
      params,
    });
    return res.data;
  } catch (error) {
    console.error("API call error:", error?.response || error);
    throw error;
  }
}

// ===== Common CRUD =====
export function GET_ALL(endpoint, params) {
  return callApi(endpoint, "GET", null, params);
}

export function GET_ID(endpoint, id) {
  return callApi(`${endpoint}/${id}`, "GET");
}

export function POST_ADD(endpoint, data) {
  return callApi(endpoint, "POST", data);
}

export function PUT_EDIT(endpoint, data) {
  return callApi(endpoint, "PUT", data);
}

export function DELETE_ID(endpoint, id) {
  return callApi(`${endpoint}/${id}`, "DELETE");
}

// ===== Helpers =====
export function GET_IMG(imgName) {
  if (!imgName) return "";
  // Kết nối với backend .NET: link ảnh thường ở /images/ hoặc /api/Product/image/
  // Dựa vào Swagger, nếu bạn chưa thấy endpoint /image, thường là do file được serve tĩnh
  return `${API_URL.replace("/api", "")}/images/${imgName}`;
}

// ===== Products / Categories (Updated for .NET Backend) =====
export const transformProduct = (p) => ({
  ...p,
  productId: p.productId || p.ProductId,
  productName: p.name || p.productName,
  image: p.imageUrl || p.image,
  quantity: p.stock ?? p.quantity,
});

export async function GET_PRODUCT(pageNumber = 0, pageSize = 10, sortBy = "productId", sortOrder = "desc") {
  // New API: api/Product returns plain array
  const data = await callApi("Product", "GET", null, { pageNumber, pageSize, sortBy, sortOrder });
  
  // Robust extraction
  const root = data?.value || data;
  const items = Array.isArray(root) ? root : (root.products || root.Products || root.content || root.data || []);
  
  return {
    products: items.map(transformProduct),
    totalPages: root.totalPages || root.TotalPages || 1,
    totalElements: root.totalCount || root.TotalCount || items.length
  };
}

export async function GET_CATEGORIES(pageNumber = 0, pageSize = 100, sortBy = "categoryId", sortOrder = "asc") {
  // New API: api/Categories returns plain array
  const data = await callApi("Categories", "GET", null, { pageNumber, pageSize, sortBy, sortOrder });
  const items = Array.isArray(data) ? data : (data.value || data.content || data.data || []);
  return items.map(c => ({
    ...c,
    categoryName: c.name || c.categoryName
  }));
}

export async function GET_PRODUCTS_BY_CATEGORY(categoryId, pageNumber = 0, pageSize = 10, sortBy = "productId", sortOrder = "desc") {
  const data = await callApi("Product", "GET", null, { categoryId, pageNumber, pageSize, sortBy, sortOrder });
  
  const root = data?.value || data;
  const items = Array.isArray(root) ? root : (root.products || root.Products || root.content || root.data || []);
  
  return {
    products: items.map(transformProduct),
    totalPages: root.totalPages || root.TotalPages || 1,
    totalElements: root.totalCount || root.TotalCount || items.length
  };
}

export async function GET_PRODUCTS_BY_KEYWORD(
  keyword,
  pageNumber = 0,
  pageSize = 10,
  sortBy = "productId",
  sortOrder = "desc",
  categoryId = 0
) {
  const params = {
    search: keyword,
    pageNumber,
    pageSize,
    sortBy,
    sortOrder,
  };
  if (categoryId > 0) {
    params.categoryId = categoryId;
  }

  const data = await callApi("Product", "GET", null, params);

  const root = data?.value || data;
  const items = Array.isArray(root) ? root : (root.products || root.Products || root.content || root.data || []);
  
  return {
    products: items.map(transformProduct),
    totalPages: root.totalPages || root.TotalPages || 1,
    totalElements: root.totalCount || root.TotalCount || items.length,
    pageNumber: root.pageNumber || root.PageNumber
  };
}

// ===== Users =====
export function GET_USER_BY_ID(userId) {
  return callApi(`Auth/users/${userId}`, "GET");
}

export function GET_USER_BY_EMAIL(email) {
  return callApi(`Auth/users`, "GET").then(users => {
    // Fallback if there is no direct email search endpoint
    const list = Array.isArray(users) ? users : users?.data || [];
    return list.find(u => u.email === email || u.Email === email);
  });
}

export function GET_USER_ADDRESSES(userId) {
  return callApi(`User/${userId}/addresses`, "GET");
}

export function CREATE_USER_ADDRESS(userId, data) {
  return callApi(`User/${userId}/addresses`, "POST", data);
}

// ===== Cart =====
export function GET_CART_BY_USER_ID(userId) {
  return callApi(`Cart/${userId}`, "GET");
}

export function ADD_TO_CART(userId, productId, quantity) {
  return callApi("Cart", "POST", { userId, productId, quantity });
}

export function UPDATE_CART_QUANTITY(cartItemId, quantity) {
  return callApi(`Cart/${cartItemId}`, "PUT", quantity);
}

export function DELETE_FROM_CART(cartItemId) {
  return callApi(`Cart/${cartItemId}`, "DELETE");
}

export function CLEAR_CART(userId) {
  return callApi(`Cart/user/${userId}`, "DELETE");
}

// ===== Orders =====
export function PLACE_ORDER(data) {
  return callApi("Order/checkout", "POST", data);
}

export async function GET_ORDERS_BY_EMAIL(email) {
  // If we have a user object in storage, use it first
  const user = getUserObject();
  let userId = user?.userId || user?.UserId;

  if (!userId && email) {
    const uRes = await GET_USER_BY_EMAIL(email);
    userId = uRes?.userId || uRes?.data?.userId;
  }

  if (userId) {
    return callApi(`Order/user/${userId}`, "GET");
  }
  
  return [];
}

export function GET_ORDER_DETAIL(orderId) {
  return callApi(`Order/${orderId}`, "GET");
}

// ===== Password APIs (bạn thêm ở RN) =====
export function CHANGE_PASSWORD(oldPassword, newPassword) {
  return callApi(`Auth/change-password`, "POST", { oldPassword, newPassword });
}

export function FORGOT_PASSWORD(email) {
  return callApi(`Auth/forgot-password`, "POST", { email });
}

export function RESET_PASSWORD(token, newPassword) {
  return callApi(`Auth/reset-password`, "POST", { token, newPassword });
}

// ===== Auth (Login/Register) =====
export async function POST_LOGIN(username, password) {
  // login returns { Message, Token, User: { UserId, Username, FullName, Email, Role } }
  const data = await callApi("Auth/login", "POST", { username, password });
  const token = data?.token || data?.Token;
  
  if (!token) throw new Error("Không nhận được token");

  setToken(token);
  
  const user = data?.user || data?.User;
  if (user) {
    setUserObject(user);
    const email = user.email || user.Email || user.username || user.Username || username;
    if (email) setUserEmail(email);
  } else {
    setUserEmail(username);
  }

  window.dispatchEvent(new Event("auth-change"));

  return data;
}

export function POST_REGISTER(username, email, fullName, password) {
  return callApi("Auth/register", "POST", { username, email, fullName, password });
}

// ===== Logout helper =====
export function LOGOUT() {
  removeToken();
  removeEmail();
  removeUserObject();
  window.dispatchEvent(new Event("auth-change"));
}
