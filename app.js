// New Era Furniture - Product Display App
// Handles tabs, show more functionality, and product loading

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
});

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
            document.getElementById(tabId).classList.add('active');
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
    const countSpan = container.previousElementSibling.querySelector('.visible-count');
    if (countSpan) countSpan.textContent = Math.min(state.visible, products.length);
    
    // Hide button if all shown
    if (state.visible >= products.length) {
        btn.style.display = 'none';
        btn.textContent = 'All Products Shown';
    }
}

// Create product card HTML
function createProductCard(product) {
    const whatsappLink = `https://wa.me/17138089064?text=Hi! I'm interested in ${encodeURIComponent(product.name)}`;
    
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <a href="${whatsappLink}" class="btn-whatsapp" target="_blank">Order via WhatsApp</a>
            </div>
        </div>
    `;
}

console.log('✨ New Era Furniture App loaded! 150+ products ready.');
console.log('📱 WhatsApp ordering enabled');
console.log('🖼️ Product tabs and pagination active');

// Add loaded class to body to show content (removes opacity: 0)
document.body.classList.add('loaded');
