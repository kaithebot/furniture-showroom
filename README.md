# New Era Furniture - Houston Showroom Website

A modern, elegant furniture showroom website built for a Houston-based furniture wholesaler. Features WhatsApp ordering integration, product galleries, and a smooth user experience.

## 🌐 Live Website

**Repository:** https://github.com/kaithebot/furniture-showroom

**To enable live site:**
1. Go to https://github.com/kaithebot/furniture-showroom/settings/pages
2. Select Source: `main` branch, `/ (root)` folder
3. Click Save
4. Site will be live at: https://kaithebot.github.io/furniture-showroom/

## ✨ Features

### Design
- 🎨 Modern black/gold luxury aesthetic
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations and transitions
- 🖼️ Product detail modals with enlarged images
- 💬 Floating WhatsApp button for easy contact

### Functionality
- 📦 **7 Product Categories:**
  - Console Tables (6 products)
  - Coffee Tables (3 products)
  - Fireplaces (4 products)
  - LED Mirrors (3 products)
  - Living Room Sets (3 products)
- 💬 **WhatsApp Integration:** Every product has direct WhatsApp ordering
- ⭐ **Customer Testimonials:** Real reviews displayed
- 🔍 **SEO Optimized:** Meta tags, lazy loading, semantic HTML
- ♿ **Accessibility:** ARIA labels, keyboard navigation

### Products Included
**Console Tables:**
- A-C07 Bianca - Wood frame with carving design
- A-C11 Salma - Gold leaf finish with handcrafted details
- A-C12 Paros - Grey wood with gold steel doors
- A-C14 Adora - Black lacquer with gold accents
- A-C16 Aster - White lacquer with gold leaf
- A-C29 Nimbus - White & black lacquer with gold accents

**Coffee Tables:**
- A-CT02 Dima - Warm wood sophistication
- A-CT03 Alma - Smart table with wireless charging & Bluetooth
- A-CT06 Helios - Gold leaf with handcrafted design

**Fireplaces:**
- A-F01 Camila - Elegant modern design
- A-F03 Pebble - Black with LED & Bluetooth
- A-F04 Versa - LED, Bluetooth & fireplace
- A-F07 Maya - Ambiance and functionality

**LED Mirrors:**
- A-FM01 Glow - LED illuminated mirror
- A-FM02 Celeste - Elegant LED lighting
- A-FM07 Jeni - Black/White with smart features

## 📞 Contact Information

- **Business:** New Era Furniture
- **Phone:** (713) 808-9064
- **WhatsApp:** +1 (713) 808-9064
- **Address:** 13393 South Main St Ste 100, Houston, TX 77035
- **Hours:** Mon-Sat: 10AM - 7PM, Sun: 12PM - 5PM

## 🛠️ Technical Details

### Built With
- HTML5 (semantic markup)
- CSS3 (Grid, Flexbox, custom properties)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Playfair Display, Quicksand)
- Unsplash images (placeholder product photos)

### File Structure
```
├── index.html          # Main website
├── styles.css          # All styles (485 lines)
├── script.js           # Interactivity (127 lines)
├── DEPLOYMENT.md       # Deployment guide
└── README.md          # This file
```

### Performance Features
- ✅ Lazy loading on all images
- ✅ Async decoding for images
- ✅ Efficient CSS with CSS variables
- ✅ Minimal JavaScript footprint
- ✅ Semantic HTML for SEO

## 🚀 Quick Start

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/kaithebot/furniture-showroom.git
   cd furniture-showroom
   ```

2. Open `index.html` in your browser:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Or using Node
   npx serve
   
   # Or simply open the file directly
   open index.html
   ```

3. Visit `http://localhost:8000` to view the site

### Deployment
The site is ready to deploy on GitHub Pages:
1. Push all files to the `main` branch
2. Enable GitHub Pages in repository settings
3. Select `main` branch as source
4. Site will be live in 2-3 minutes

## 📝 Customization

### Change WhatsApp Number
Edit the `href` attributes in `index.html`:
```html
<a href="https://wa.me/YOUR_NUMBER?text=...">
```

### Add More Products
Copy a product card template and update:
```html
<div class="product-card">
    <img src="IMAGE_URL" alt="Product Name">
    <h3>Product Code Name</h3>
    <p>Product description</p>
    <a href="https://wa.me/..." class="btn-whatsapp">Order</a>
</div>
```

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --gold: #c9a962;
    --black: #0a0a0a;
    --white: #ffffff;
}
```

## 🧪 Testing Checklist

- [x] All product images load correctly
- [x] WhatsApp links work on all products
- [x] Mobile menu functions properly
- [x] Product modals open/close correctly
- [x] Navigation scrolls smoothly
- [x] Contact information is accurate
- [x] All buttons are clickable
- [x] Site is responsive on all devices
- [x] Loading animations work
- [x] SEO meta tags are present

## 📄 License

This project was created for New Era Furniture Houston.

## 🤝 Credits

- Design & Development: OpenClaw Agent (Kai)
- Images: Unsplash (placeholder images)
- Fonts: Google Fonts
- Icons: WhatsApp brand assets

---

**Questions or issues?** Contact via WhatsApp: (713) 808-9064
