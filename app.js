// New Era Furniture - Product Display App
// Handles tabs, show more functionality, product loading, and detail modals

// Product display state
const displayState = {
    recliningSofas: { visible: 8, increment: 8 },
    sectionals: { visible: 8, increment: 8 },
    bedroomSets: { visible: 8, increment: 8 },
    diningSets: { visible: 8, increment: 8 },
    mattresses: { visible: 5, increment: 5 },
    consoleTables: { visible: 5, increment: 5 },
    recent: { visible: 20, increment: 20 }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    loadAllCategories();
    loadRecentProducts();
    initializeMobileMenu();
});

// Initialize mobile menu
function initializeMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Initialize tab functionality
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current tab and content
            btn.classList.add('active');
            const content = document.getElementById(tabId);
            if (content) content.classList.add('active');
        });
    });
}

// Load products for all categories
function loadAllCategories() {
    const categories = ['recliningSofas', 'sectionals', 'bedroomSets', 'diningSets', 'mattresses', 'consoleTables'];
    
    categories.forEach(category => {
        const container = document.querySelector(`[data-category="${category}"]`);
        if (container && furnitureCatalog[category]) {
            const state = displayState[category];
            renderProducts(container, furnitureCatalog[category], state.visible);
            
            // Setup show more button
            const btn = container.nextElementSibling;
            if (btn && btn.classList.contains('show-more-btn')) {
                btn.addEventListener('click', () => showMore(category, container, btn));
                
                // Hide button if all products shown
                if (state.visible >= furnitureCatalog[category].length) {
                    btn.style.display = 'none';
                }
            }
        }
    });
}

// Load recent products (all products combined)
function loadRecentProducts() {
    const container = document.getElementById('recent-products-grid');
    const showMoreBtn = document.getElementById('recent-show-more');
    
    if (!container) return;
    
    // Combine all products
    const allProducts = [];
    Object.values(furnitureCatalog).forEach(categoryProducts => {
        allProducts.push(...categoryProducts);
    });
    
    // Shuffle products for variety
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    
    // Store for pagination
    container.allProducts = shuffled;
    container.currentIndex = 0;
    
    // Render initial 20
    renderMoreProducts(container, 20);
    
    // Setup show more button
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            renderMoreProducts(container, 20);
            
            // Update count
            const visibleCount = container.querySelectorAll('.product-card').length;
            const countSpan = document.querySelector('#recent .visible-count');
            if (countSpan) countSpan.textContent = visibleCount;
            
            // Hide button if all shown
            if (visibleCount >= shuffled.length) {
                showMoreBtn.style.display = 'none';
                showMoreBtn.textContent = 'All Products Shown';
            }
        });
    }
}

// Render products to container
function renderProducts(container, products, count) {
    const html = products.slice(0, count).map(product => createProductCard(product)).join('');
    container.innerHTML = html;
}

// Render more products (for recent tab)
function renderMoreProducts(container, count) {
    const products = container.allProducts;
    const start = container.currentIndex;
    const end = Math.min(start + count, products.length);
    
    const newProducts = products.slice(start, end);
    const html = newProducts.map(product => createProductCard(product)).join('');
    
    container.insertAdjacentHTML('beforeend', html);
    container.currentIndex = end;
}

// Show more products for a category
function showMore(category, container, btn) {
    const state = displayState[category];
    const products = furnitureCatalog[category];
    
    state.visible += state.increment;
    
    // Re-render with more products
    renderProducts(container, products, state.visible);
    
    // Update count display
    const countSpan = container.previousElementSibling?.querySelector('.visible-count');
    if (countSpan) countSpan.textContent = Math.min(state.visible, products.length);
    
    // Hide button if all shown
    if (state.visible >= products.length) {
        btn.style.display = 'none';
        btn.textContent = 'All Products Shown';
    }
}

// Create product card HTML
function createProductCard(product) {
    const productJson = JSON.stringify(product).replace(/"/g, '&quot;');
    const mainImage = product.images ? product.images[0] : product.image;
    
    return `
        <div class="product-card" onclick='openProductModal(${productJson})' style="cursor: pointer;">
            <img src="${mainImage}" alt="${product.name}" loading="lazy" decoding="async">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <button class="btn-view-details" onclick="event.stopPropagation(); openProductModal(${productJson})">View Details</button>
            </div>
        </div>
    `;
}

// Product Detail Modal Functions
let currentModalProduct = null;
let currentImageIndex = 0;

function openProductModal(product) {
    currentModalProduct = product;
    currentImageIndex = 0;
    
    let modal = document.getElementById('product-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'product-modal';
        modal.className = 'product-modal';
        document.body.appendChild(modal);
    }
    
    const images = product.images || [product.image];
    const whatsappText = `Hi! I'm interested in ${product.name} (${product.sku || product.id}). Can you provide more details?`;
    const whatsappLink = `https://wa.me/17138089064?text=${encodeURIComponent(whatsappText)}`;
    
    const thumbnailsHtml = images.map((img, idx) => `
        <img src="${img}" alt="${product.name} - view ${idx + 1}" 
             class="thumbnail ${idx === 0 ? 'active' : ''}" 
             onclick="changeModalImage(${idx})">
    `).join('');
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeProductModal()">&times;</button>
            <div class="modal-body">
                <div class="modal-images">
                    <div class="modal-main-image-container">
                        <img src="${images[0]}" alt="${product.name}" class="modal-main-image" id="modal-main-image">
                        ${images.length > 1 ? `
                            <button class="gallery-nav prev" onclick="prevImage()">&#10094;</button>
                            <button class="gallery-nav next" onclick="nextImage()">&#10095;</button>
                        ` : ''}
                    </div>
                    ${images.length > 1 ? `
                        <div class="modal-thumbnails">
                            ${thumbnailsHtml}
                        </div>
                    ` : ''}
                </div>
                <div class="modal-info">
                    <span class="modal-category">${product.category}</span>
                    <h2>${product.name}</h2>
                    <p class="modal-price">${product.price}</p>
                    <div class="modal-details">
                        <h4>Product Details</h4>
                        <ul>
                            <li><strong>SKU:</strong> ${product.sku || product.id}</li>
                            <li><strong>Category:</strong> ${product.category}</li>
                            <li><strong>Material:</strong> ${product.material || 'Premium Quality'}</li>
                            <li><strong>Color:</strong> ${product.color || 'As shown'}</li>
                            ${product.dimensions ? `<li><strong>Dimensions:</strong> ${product.dimensions}</li>` : ''}
                            <li><strong>Availability:</strong> <span class="in-stock">${product.availability || 'In Stock'}</span></li>
                        </ul>
                        ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
                    </div>
                    <a href="${whatsappLink}" class="btn-whatsapp-modal" target="_blank">
                        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Get More Info on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    currentModalProduct = null;
    currentImageIndex = 0;
}

function changeModalImage(index) {
    if (!currentModalProduct) return;
    
    const images = currentModalProduct.images || [currentModalProduct.image];
    if (index < 0 || index >= images.length) return;
    
    currentImageIndex = index;
    const mainImage = document.getElementById('modal-main-image');
    if (mainImage) {
        mainImage.src = images[index];
    }
    
    // Update thumbnails
    document.querySelectorAll('.modal-thumbnails .thumbnail').forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === index);
    });
}

function nextImage() {
    if (!currentModalProduct) return;
    const images = currentModalProduct.images || [currentModalProduct.image];
    const nextIndex = (currentImageIndex + 1) % images.length;
    changeModalImage(nextIndex);
}

function prevImage() {
    if (!currentModalProduct) return;
    const images = currentModalProduct.images || [currentModalProduct.image];
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    changeModalImage(prevIndex);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeProductModal();
    }
};

// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('product-modal');
    if (!modal || modal.style.display !== 'block') return;
    
    if (e.key === 'Escape') {
        closeProductModal();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

console.log('✨ New Era Furniture App loaded! 150+ products ready.');
console.log('📱 WhatsApp ordering enabled');
console.log('🖼️ Product detail modals with image gallery active');

// Add loaded class to body to show content
document.body.classList.add('loaded');
