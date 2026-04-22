# 🎨 UI/UX System Upgrade Documentation

## Overview

Toàn bộ hệ thống giao diện đã được nâng cấp với các tính năng sau:

✅ **Chế độ Sáng/Tối (Light/Dark Mode)**
✅ **Responsive Design cho tất cả thiết bị**
✅ **CSS Variables cho quản lý theme dễ dàng**
✅ **Thành phần UI cải tiến**
✅ **Hiệu ứng chuyển đổi mượt mà**
✅ **Hỗ trợ Accessibility (WCAG)**

---

## 📁 Cấu Trúc Thư Mục

```
src/
├── asset/
│   └── css/
│       ├── theme-variables.css      # CSS variables cho light/dark mode
│       ├── theme-components.css     # Styling cho các component
│       ├── theme-toggle.css         # Styling cho theme toggle button
│       └── responsive.scss          # Responsive breakpoints
├── context/
│   └── ThemeContext.jsx             # Context for theme management
├── components/
│   └── ThemeToggle.jsx              # Theme toggle button component
├── layouts/
│   ├── Header.jsx                   # Updated with theme support
│   └── Footer.jsx                   # Updated with theme support
├── index.js                         # Updated with ThemeProvider
├── index.css                        # Updated base styles
└── App.css                          # Updated app styles
```

---

## 🎯 Tính Năng Chính

### 1. **Chế Độ Sáng/Tối**

#### CSS Variables Được Hỗ Trợ:

**Light Mode (Mặc định)**

```css
:root,
[data-theme="light"] {
  --primary-color: #e97081;
  --text-primary: #1e293b;
  --bg-primary: #ffffff;
  --border-color: #e2e8f0;
  /* ... và nhiều hơn nữa */
}
```

**Dark Mode**

```css
[data-theme="dark"] {
  --primary-color: #f18396;
  --text-primary: #f1f5f9;
  --bg-primary: #0f172a;
  --border-color: #334155;
  /* ... và nhiều hơn nữa */
}
```

#### Cách Sử Dụng Theme:

```jsx
import { useTheme } from "./context/ThemeContext";

function MyComponent() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>{isDark ? "Light Mode" : "Dark Mode"}</button>
  );
}
```

---

### 2. **Responsive Design**

#### Breakpoints:

| Device             | Width    | CSS Class   |
| ------------------ | -------- | ----------- |
| Mobile             | < 576px  | `col-xs-*`  |
| Tablet             | ≥ 576px  | `col-sm-*`  |
| Tablet (landscape) | ≥ 768px  | `col-md-*`  |
| Laptop             | ≥ 992px  | `col-lg-*`  |
| Desktop            | ≥ 1200px | `col-xl-*`  |
| Large Desktop      | ≥ 1400px | `col-xxl-*` |

#### Media Queries:

```css
/* Mobile First Approach */
@media (min-width: 768px) {
  /* Tablet and up */
}

@media (min-width: 992px) {
  /* Desktop and up */
}

@media (max-width: 767.98px) {
  /* Mobile only */
}
```

#### Responsive Utilities:

```html
<!-- Hide on mobile -->
<div class="hide-mobile">Chỉ hiển thị trên desktop</div>

<!-- Hide on tablet -->
<div class="hide-md">Ẩn trên tablet</div>

<!-- Hide on desktop -->
<div class="hide-lg">Ẩn trên desktop</div>
```

---

### 3. **CSS Variables Reference**

#### Màu Sắc (Colors)

```css
--primary-color         /* Màu chính (#e97081) */
--primary-light         /* Màu chính nhạt */
--primary-deep          /* Màu chính đậm */
--secondary-color       /* Màu phụ */

--text-primary          /* Văn bản chính */
--text-secondary        /* Văn bản phụ */
--text-tertiary         /* Văn bản thứ ba */
--text-muted            /* Văn bản muted */

--bg-primary            /* Nền chính */
--bg-secondary          /* Nền phụ */
--bg-tertiary           /* Nền thứ ba */

--border-color          /* Màu viền */
--border-light          /* Viền nhạt */

--success-color         /* Màu thành công */
--warning-color         /* Màu cảnh báo */
--danger-color          /* Màu lỗi */
--info-color            /* Màu thông tin */
```

#### Kích Thước (Spacing)

```css
--spacing-xs    /* 4px */
--spacing-sm    /* 8px */
--spacing-md    /* 16px */
--spacing-lg    /* 24px */
--spacing-xl    /* 32px */
--spacing-2xl   /* 48px */
```

#### Border Radius

```css
--radius-sm     /* 4px */
--radius-md     /* 8px */
--radius-lg     /* 12px */
--radius-xl     /* 16px */
--radius-full   /* 9999px (fully rounded) */
```

#### Shadows

```css
--shadow-sm     /* Bóng nhỏ */
--shadow-md     /* Bóng trung bình */
--shadow-lg     /* Bóng lớn */
--shadow-xl     /* Bóng rất lớn */
```

#### Transitions

```css
--transition-fast   /* 0.15s ease-in-out */
--transition-base   /* 0.3s ease-in-out */
--transition-slow   /* 0.5s ease-in-out */
```

---

## 🚀 Cách Sử Dụng

### 1. **Thêm Theme Support vào Component**

```jsx
import { useTheme } from "../context/ThemeContext";

function MyComponent() {
  const { isDark } = useTheme();

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {isDark ? "Dark Mode" : "Light Mode"}
    </div>
  );
}
```

### 2. **Sử dụng CSS Variables trong CSS**

```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.my-component:hover {
  background-color: var(--bg-secondary);
  box-shadow: var(--shadow-lg);
}
```

### 3. **Responsive Layout**

```jsx
<div className="row">
  <div className="col-12 col-md-6 col-lg-3">
    {/* Responsive columns */}
    {/* Mobile: 100% | Tablet: 50% | Desktop: 25% */}
  </div>
</div>
```

---

## 🎨 Hỏi & Đáp

### Q: Làm sao để thay đổi màu chủ đề?

**A:** Chỉnh sửa các biến CSS trong `src/asset/css/theme-variables.css`:

```css
:root,
[data-theme="light"] {
  --primary-color: #e97081; /* Thay đổi màu chính */
  /* ... */
}
```

### Q: Làm sao để thêm một component mới với theme support?

**A:**

1. Import `useTheme` hook
2. Sử dụng CSS variables cho màu sắc
3. Thêm responsive classes cho layout

```jsx
import { useTheme } from "../context/ThemeContext";

export default function NewComponent() {
  const { isDark } = useTheme();

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      Content here
    </div>
  );
}
```

### Q: Hình ảnh hoặc SVG có thay đổi theo theme không?

**A:** Không tự động, nhưng bạn có thể thêm filter CSS:

```css
[data-theme="dark"] img {
  filter: brightness(0.8);
}
```

---

## 📱 Device Testing

### Responsive Breakpoints Được Hỗ Trợ:

```
Extra Small (XS): 0 - 575px        (Phones)
Small (SM):       576px - 767px    (Phones landscape)
Medium (MD):      768px - 991px    (Tablets)
Large (LG):       992px - 1199px   (Desktops)
Extra Large (XL): 1200px - 1399px  (Large Desktops)
XXL:              1400px+          (Extra Large Desktops)
```

### Kiểm Tra Responsive:

1. **Mobile**: Mở DevTools, chọn "Mobile" viewport
2. **Tablet**: Chọn iPad hoặc tablet resolution
3. **Desktop**: Chọn desktop resolution

---

## ✨ Hiệu Ứng Chuyển Đổi Theme

Tất cả các chuyển đổi giữa light/dark mode được thực hiện mượt mà nhờ CSS transitions:

```css
* {
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    border-color var(--transition-fast);
}
```

---

## 🔒 Storage

Theme preference được lưu trong `localStorage`:

```javascript
localStorage.getItem("theme-mode"); // 'light' hoặc 'dark'
```

Khi người dùng vào lại website, theme sẽ tự động khôi phục.

---

## 🎯 Best Practices

1. ✅ Luôn sử dụng CSS variables cho màu sắc
2. ✅ Test responsive design trên cả light/dark modes
3. ✅ Sử dụng semantic HTML untuk accessibility
4. ✅ Không hard-code màu sắc
5. ✅ Sử dụng responsive spacing utilities
6. ✅ Test trên nhiều thiết bị thực tế

---

## 📝 Notes

- Theme toggle button được đặt ở header
- Dark mode tự động phát hiện từ system preferences
- Tất cả các component đã được cập nhật để hỗ trợ theme
- Responsive design được test trên tất cả các breakpoints

---

## 🔗 Files Đã Thay Đổi

- ✅ `src/context/ThemeContext.jsx` - Theme context provider
- ✅ `src/components/ThemeToggle.jsx` - Theme toggle button
- ✅ `src/asset/css/theme-variables.css` - CSS variables
- ✅ `src/asset/css/theme-components.css` - Component styles
- ✅ `src/asset/css/theme-toggle.css` - Toggle button styles
- ✅ `src/asset/css/responsive.scss` - Responsive styles
- ✅ `src/layouts/Header.jsx` - Updated with theme support
- ✅ `src/layouts/Footer.jsx` - Updated with theme support
- ✅ `src/index.js` - Added ThemeProvider
- ✅ `src/index.css` - Updated base styles
- ✅ `src/App.css` - Updated app styles
- ✅ `public/index.html` - Updated meta tags

---

## 🆘 Troubleshooting

### Theme không thay đổi?

- Kiểm tra xem ThemeProvider có wrap App không
- Clear cache browser (Ctrl+Shift+Delete)

### Component không responsive?

- Kiểm tra xem có đúng responsive class không
- Test với DevTools device emulation

### CSS variables không hoạt động?

- Kiểm tra xem CSS files đã được import không
- Kiểm tra developer console cho errors

---

**Cập nhật lần cuối**: April 23, 2026
**Version**: 1.0.0
