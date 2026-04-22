<!-- ===== THEME & RESPONSIVE QUICK REFERENCE ===== -->

# 🎨 Leo Stationero - Theme & Responsive Quick Reference

## 🌙 Theme Usage Examples

### Example 1: Simple Themed Component

```jsx
import { useTheme } from "../context/ThemeContext";

export default function Card() {
  const { isDark } = useTheme();

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-color)",
        padding: "var(--spacing-md)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </div>
  );
}
```

### Example 2: Themed Button

```jsx
<button
  style={{
    backgroundColor: "var(--primary-color)",
    color: "white",
    padding: "var(--spacing-md) var(--spacing-lg)",
    border: "none",
    borderRadius: "var(--radius-lg)",
    cursor: "pointer",
    transition: "all var(--transition-base)",
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "var(--primary-deep)";
    e.target.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "var(--primary-color)";
    e.target.style.transform = "scale(1)";
  }}
>
  Click Me
</button>
```

### Example 3: Conditional Styling (Old Way - Not Recommended)

```jsx
// ❌ DON'T DO THIS
if (isDark) {
  backgroundColor = "#0f172a";
} else {
  backgroundColor = "#ffffff";
}

// ✅ DO THIS INSTEAD
backgroundColor: "var(--bg-primary)";
```

---

## 📱 Responsive Layout Examples

### Example 1: Responsive Grid (3 columns on desktop, 2 on tablet, 1 on mobile)

```jsx
<div className="row">
  <div className="col-12 col-md-6 col-lg-4">
    {/* 
      Mobile: 100% (col-12)
      Tablet: 50% (col-md-6)
      Desktop: 33.33% (col-lg-4)
    */}
  </div>
  <div className="col-12 col-md-6 col-lg-4">...</div>
  <div className="col-12 col-md-6 col-lg-4">...</div>
</div>
```

### Example 2: Responsive Font Sizes

```jsx
<h1 style={{ fontSize: "clamp(20px, 5vw, 48px)" }}>
  Responsive Heading
  {/* Automatically scales between 20px and 48px */}
</h1>
```

### Example 3: Hide/Show on Different Devices

```jsx
<div className="hide-mobile">
  {/* Only visible on tablets and desktops */}
</div>

<div className="hide-md">
  {/* Hidden on tablets, visible on mobile and desktop */}
</div>

<div className="hide-lg">
  {/* Only visible on mobile and tablet */}
</div>
```

### Example 4: Responsive Spacing

```jsx
<div className="m-2 m-md-3 m-lg-4">
  {/* 
    Mobile: margin 8px
    Tablet: margin 16px
    Desktop: margin 24px
  */}
</div>
```

---

## 🎯 Common CSS Variables

### Colors

```css
color: var(--text-primary); /* Main text color */
backgroundcolor: var(--bg-primary); /* Main background */
bordercolor: var(--border-color); /* Border color */
color: var(--primary-color); /* Brand color */
color: var(--danger-color); /* Error color */
```

### Spacing

```css
padding: var(--spacing-md); /* 16px */
margin: var(--spacing-lg); /* 24px */
gap: var(--spacing-sm); /* 8px */
```

### Sizing

```css
borderradius: var(--radius-lg); /* 12px */
boxshadow: var(--shadow-md); /* Medium shadow */
```

### Animations

```css
transition: all var(--transition-base); /* 0.3s smooth */
```

---

## 🎨 Utility Classes

### Quick Flexbox Layout

```html
<!-- Center items horizontally and vertically -->
<div class="d-flex justify-center items-center">Content here</div>

<!-- Space items evenly -->
<div class="d-flex justify-between">Item 1 Item 2 Item 3</div>

<!-- Stack vertically with gap -->
<div class="d-flex flex-column gap-3">Item 1 Item 2</div>
```

### Quick Text Utilities

```html
<p class="text-center font-bold text-primary">Centered bold text</p>
<p class="text-sm text-secondary mt-2 mb-4">Small secondary text</p>
```

### Quick Padding/Margin

```html
<div class="p-3 mt-4 mb-2">Padded with margins</div>
<div class="px-4 py-2">Horizontal padding, less vertical</div>
```

### Quick Border & Shadow

```html
<div class="border rounded-lg shadow-md p-3">Card with shadow</div>
<div class="border-t border-b">Box with top and bottom borders</div>
```

---

## 🚀 Best Practices

### ✅ DO:

```jsx
// Use CSS variables
style={{ color: 'var(--text-primary)' }}

// Use utility classes
<div className="d-flex gap-3 p-3">

// Use semantic spacing
padding: 'var(--spacing-md)'

// Use transitions
transition: 'all var(--transition-base)'
```

### ❌ DON'T:

```jsx
// Hard-code colors
style={{ color: '#1e293b' }}

// Hard-code spacing
padding: '16px'

// Inline media queries
if (window.innerWidth < 768)

// Multiple shadow definitions
boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
```

---

## 🔧 Responsive Breakpoints Cheat Sheet

| Breakpoint | Min Width | Max Width | Use Case            |
| ---------- | --------- | --------- | ------------------- |
| XS         | 0         | 575px     | Mobile phones       |
| SM         | 576px     | 767px     | Phone landscape     |
| MD         | 768px     | 991px     | Tablets             |
| LG         | 992px     | 1199px    | Desktops            |
| XL         | 1200px    | 1399px    | Large desktops      |
| XXL        | 1400px    | ∞         | Extra large screens |

### Media Query Examples

```css
/* Mobile first - default styles apply to mobile */
/* Then override for larger screens */

/* Tablet and up */
@media (min-width: 768px) {
}

/* Desktop and up */
@media (min-width: 992px) {
}

/* Large desktop and up */
@media (min-width: 1200px) {
}

/* Mobile only */
@media (max-width: 767.98px) {
}

/* Tablet only */
@media (min-width: 768px) and (max-width: 991.98px) {
}
```

---

## 💡 Real-World Examples

### Responsive Product Card

```jsx
<div
  style={{
    backgroundColor: "var(--bg-primary)",
    border: "1px solid var(--border-color)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    transition: "all var(--transition-base)",
    boxShadow: "var(--shadow-sm)",
  }}
>
  <img src="product.jpg" className="w-full" />
  <div
    style={{
      padding: "var(--spacing-md)",
      color: "var(--text-primary)",
    }}
  >
    <h3 className="font-bold m-0">Product Name</h3>
    <p className="text-secondary m-0 mt-1">$19.99</p>
  </div>
</div>
```

### Responsive Header

```jsx
<header
  style={{
    backgroundColor: "var(--bg-primary)",
    borderBottom: "1px solid var(--border-color)",
    padding: "var(--spacing-lg)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  }}
>
  <div className="container">
    <div className="row align-items-center">
      <div className="col-6 col-md-3">Logo</div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">Search</div>
      <div className="col-6 col-md-3">Icons</div>
    </div>
  </div>
</header>
```

---

## 📚 File References

- **Theme Context**: `src/context/ThemeContext.jsx`
- **CSS Variables**: `src/asset/css/theme-variables.css`
- **Component Styles**: `src/asset/css/theme-components.css`
- **Utilities**: `src/asset/css/utilities.css`
- **Responsive**: `src/asset/css/responsive.scss`
- **Theme Toggle**: `src/components/ThemeToggle.jsx`

---

## 🐛 Common Issues & Solutions

### Issue: Dark mode not applying

**Solution**: Ensure ThemeProvider wraps your App in index.js

### Issue: Responsive classes not working

**Solution**: Import responsive.scss in your component or index.js

### Issue: Colors not changing when theme toggles

**Solution**: Use `var(--color-name)` instead of hard-coded colors

### Issue: Component not responsive

**Solution**: Use responsive classes: `col-12 col-md-6 col-lg-4`

---

**Last Updated**: April 23, 2026  
**Version**: 1.0.0
