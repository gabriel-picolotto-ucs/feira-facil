let cart = [];
let selectedProductForCart = null;
let currentFairName = 'Feira Agroecológica do Canteiro';
let activeCategoryFilter = 'Todos';

/* --- VARIÁVEIS DE FILTRO DAS FEIRAS --- */
let selectedMaxDistance = null; // Ex: 5, 10, 20
let selectedDay = null;         // Ex: 'Sáb', 'Dom', 'Seg'...

let userProfileData = {
    name: 'Usuário',
    email: 'usuario@email.com',
    phone: '(54) 99999-8888',
    address: 'Rua das Flores, 123 - Centro'
};

let notificationsList = [
    {
        id: 1,
        title: 'Pedido #1024 Entregue!',
        time: 'Há 20 min',
        desc: 'Seu pedido da Feira Agroecológica foi entregue com sucesso.',
        icon: 'fa-check-circle',
        color: '#2e7d32'
    },
    {
        id: 2,
        title: 'Pedido #1025 Aceito',
        time: 'Há 1 hora',
        desc: 'A Tenda do Zé das Frutas já separou seus produtos.',
        icon: 'fa-box-open',
        color: '#e65100'
    }
];

let activeOrders = [];
let historyOrders = [
    {
        id: '#1024',
        date: 'Ontem às 10:15',
        total: 28.50,
        items: [
            { name: 'Maçã Gala Orgânica', amount: 1, unit: 'kg', stallName: 'Tenda do Zé das Frutas', price: 7.90, icon: 'fa-apple-alt', type: 'Frutas' },
            { name: 'Queijo Minas Frescal', amount: 0.5, unit: 'kg', stallName: 'Tenda Laticínios Colonial', price: 14.00, icon: 'fa-cheese', type: 'Laticínios' }
        ]
    }
];

/* ==================== BASE DE DADOS DE FEIRAS ==================== */
const fairsDatabase = {
    'Feira da Segunda Central': {
        distanceKm: 1.8,
        freightCost: 5.00,
        address: 'Rua Principal, 50 - Centro',
        days: ['Segunda', 'Seg'],
        dayBadge: 'Segunda',
        stalls: [
            { name: 'Tenda do Zé das Frutas', desc: 'Frutas Orgânicas • Tenda nº 12' },
            { name: 'Tenda Horta & Cia da Maria', desc: 'Verduras e Folhas • Tenda nº 05' }
        ]
    },
    'Feira Terça das Hortaliças': {
        distanceKm: 4.2,
        freightCost: 7.50,
        address: 'Praça das Flores, Bairro Verde',
        days: ['Terça', 'Ter'],
        dayBadge: 'Terça',
        stalls: [
            { name: 'Tenda Legumes do Sítio', desc: 'Legumes Diversos • Tenda nº 18' },
            { name: 'Tenda das Ervas & Temperos', desc: 'Temperos Frescos e Medicinais • Tenda nº 09' }
        ]
    },
    'Feira Agroecológica de Quarta': {
        distanceKm: 8.5,
        freightCost: 11.00,
        address: 'Av. Brasil, 2500 - Jardim América',
        days: ['Quarta', 'Qua'],
        dayBadge: 'Quarta',
        stalls: [
            { name: 'Tenda Cogumelos do Vale', desc: 'Cogumelos Frescos • Tenda nº 14' },
            { name: 'Tenda Laticínios Colonial', desc: 'Queijos, Requeijão e Leite • Tenda nº 08' }
        ]
    },
    'Feira Livre Quinta Produtiva': {
        distanceKm: 14.8,
        freightCost: 16.50,
        address: 'Rodovia dos Agricultores, Km 5',
        days: ['Quinta', 'Qui'],
        dayBadge: 'Quinta',
        stalls: [
            { name: 'Padaria Artesanal Seu João', desc: 'Pães, Cucas e Biscoitos • Tenda nº 03' },
            { name: 'Tenda Empório dos Grãos', desc: 'Grãos, Cereais e Castanhas • Tenda nº 11' }
        ]
    },
    'Feira das Artes & Sabores (Sexta)': {
        distanceKm: 3.5,
        freightCost: 6.00,
        address: 'Parque das Águas, Centro',
        days: ['Sexta', 'Sex'],
        dayBadge: 'Sexta',
        stalls: [
            { name: 'Tenda Peixaria Beira-Mar', desc: 'Pescados e Frutos do Mar • Tenda nº 02' },
            { name: 'Tenda Das Bebidas e Polpas', desc: 'Sucos Naturais e Polpas • Tenda nº 15' }
        ]
    },
    'Feira Agroecológica do Canteiro': {
        distanceKm: 1.2,
        freightCost: 4.80,
        address: 'Praça Central, Centro',
        days: ['Sábado', 'Sáb'],
        dayBadge: 'Sábado',
        stalls: [
            { name: 'Tenda do Zé das Frutas', desc: 'Frutas Orgânicas • Tenda nº 12' },
            { name: 'Tenda Horta & Cia da Maria', desc: 'Verduras e Folhas • Tenda nº 05' },
            { name: 'Tenda das Ervas & Temperos', desc: 'Temperos Frescos e Medicinais • Tenda nº 09' },
            { name: 'Tenda Cogumelos do Vale', desc: 'Cogumelos Frescos • Tenda nº 14' }
        ]
    },
    'Feira Orgânica do Bairro': {
        distanceKm: 7.9,
        freightCost: 10.50,
        address: 'Av. das Flores, 1200',
        days: ['Sábado', 'Domingo', 'Sáb', 'Dom'],
        dayBadge: 'Sáb e Dom',
        stalls: [
            { name: 'Tenda Legumes do Sítio', desc: 'Legumes Diversos • Tenda nº 18' },
            { name: 'Tenda Doces da Roça', desc: 'Doces Caseiros e Compotas • Tenda nº 22' },
            { name: 'Tenda do Mel & Geleias Natural', desc: 'Produtos Naturais • Tenda nº 07' },
            { name: 'Tenda do Pastel & Salgados', desc: 'Pastéis e Salgados Assados • Tenda nº 01' }
        ]
    },
    'Feira Livre São José': {
        distanceKm: 18.5,
        freightCost: 19.80,
        address: 'Rua Dom Pedro II, Bairro Distante',
        days: ['Domingo', 'Dom'],
        dayBadge: 'Domingo',
        stalls: [
            { name: 'Tenda Laticínios Colonial', desc: 'Queijos, Requeijão e Leite • Tenda nº 08' },
            { name: 'Padaria Artesanal Seu João', desc: 'Pães, Cucas e Biscoitos • Tenda nº 03' },
            { name: 'Tenda do Milho & Derivados', desc: 'Pamonha, Curau e Milho Verde • Tenda nº 20' }
        ]
    }
};

const stallToFairMap = {
    'Tenda do Zé das Frutas': 'Feira Agroecológica do Canteiro',
    'Tenda Horta & Cia da Maria': 'Feira Agroecológica do Canteiro',
    'Tenda das Ervas & Temperos': 'Feira Agroecológica do Canteiro',
    'Tenda Cogumelos do Vale': 'Feira Agroecológica do Canteiro',
    'Tenda Legumes do Sítio': 'Feira Orgânica do Bairro',
    'Tenda Doces da Roça': 'Feira Orgânica do Bairro',
    'Tenda do Mel & Geleias Natural': 'Feira Orgânica do Bairro',
    'Tenda do Pastel & Salgados': 'Feira Orgânica do Bairro',
    'Tenda Laticínios Colonial': 'Feira Livre São José',
    'Padaria Artesanal Seu João': 'Feira Livre São José',
    'Tenda Empório dos Grãos': 'Feira Livre São José',
    'Tenda Peixaria Beira-Mar': 'Feira das Artes & Sabores (Sexta)',
    'Tenda Das Bebidas e Polpas': 'Feira das Artes & Sabores (Sexta)',
    'Tenda do Milho & Derivados': 'Feira Livre São José'
};

const stallProductsDatabase = {
    'Tenda do Zé das Frutas': [
        { name: 'Maçã Gala Orgânica', price: 7.90, icon: 'fa-apple-alt', type: 'Frutas' },
        { name: 'Banana Prata', price: 5.50, icon: 'fa-apple-alt', type: 'Frutas' },
        { name: 'Limão Taiti', price: 4.20, icon: 'fa-lemon', type: 'Frutas' },
        { name: 'Mamão Papaia', price: 8.50, icon: 'fa-apple-alt', type: 'Frutas' },
        { name: 'Laranja Pera Doce', price: 4.80, icon: 'fa-apple-alt', type: 'Frutas' },
        { name: 'Morango Fresco Orgânico', price: 14.00, icon: 'fa-apple-alt', type: 'Frutas' }
    ],
    'Tenda Horta & Cia da Maria': [
        { name: 'Alface Crespa Fresca', price: 3.50, icon: 'fa-leaf', type: 'Verduras' },
        { name: 'Rúcula Orgânica', price: 4.00, icon: 'fa-leaf', type: 'Verduras' },
        { name: 'Couve Manteiga', price: 3.80, icon: 'fa-leaf', type: 'Verduras' }
    ],
    'Tenda das Ervas & Temperos': [
        { name: 'Alecrim Fresco', price: 3.00, icon: 'fa-seedling', type: 'Temperos' },
        { name: 'Manjericão Orgânico', price: 3.50, icon: 'fa-seedling', type: 'Temperos' },
        { name: 'Alho Roxo Orgânico', price: 22.00, icon: 'fa-pepper-hot', type: 'Temperos' }
    ],
    'Tenda Cogumelos do Vale': [
        { name: 'Cogumelo Shimeji Preto', price: 16.00, icon: 'fa-seedling', type: 'Legumes' },
        { name: 'Cogumelo Paris Fresco', price: 14.50, icon: 'fa-seedling', type: 'Legumes' }
    ],
    'Tenda Legumes do Sítio': [
        { name: 'Tomate Italiano Orgânico', price: 8.30, icon: 'fa-seedling', type: 'Legumes' },
        { name: 'Cenoura Fresca', price: 5.50, icon: 'fa-carrot', type: 'Legumes' },
        { name: 'Pimentão Verde', price: 6.80, icon: 'fa-pepper-hot', type: 'Legumes' }
    ],
    'Tenda Doces da Roça': [
        { name: 'Doce de Leite Caseiro', price: 18.00, icon: 'fa-cookie', type: 'Padaria' },
        { name: 'Geleia de Morango', price: 16.50, icon: 'fa-jar', type: 'Padaria' }
    ],
    'Tenda do Mel & Geleias Natural': [
        { name: 'Mel Silvestre Puro 500g', price: 24.00, icon: 'fa-jar', type: 'Padaria' }
    ],
    'Tenda do Pastel & Salgados': [
        { name: 'Pastel de Carne', price: 9.00, icon: 'fa-utensils', type: 'Padaria' },
        { name: 'Caldo de Cana 500ml', price: 7.00, icon: 'fa-wine-glass-alt', type: 'Padaria' }
    ],
    'Tenda Laticínios Colonial': [
        { name: 'Queijo Minas Frescal', price: 28.00, icon: 'fa-cheese', type: 'Laticínios' },
        { name: 'Queijo Colonial Curado', price: 34.00, icon: 'fa-cheese', type: 'Laticínios' },
        { name: 'Requeijão Cremoso de Corte', price: 18.50, icon: 'fa-cheese', type: 'Laticínios' }
    ],
    'Padaria Artesanal Seu João': [
        { name: 'Pão de Milho Caseiro', price: 12.00, icon: 'fa-bread-slice', type: 'Padaria' },
        { name: 'Bolo de Fubá com Goiabada', price: 15.00, icon: 'fa-birthday-cake', type: 'Padaria' }
    ],
    'Tenda Empório dos Grãos': [
        { name: 'Castanha-do-Pará Selecionada', price: 45.00, icon: 'fa-seedling', type: 'Grãos' },
        { name: 'Granola Artesanal sem Açúcar', price: 14.00, icon: 'fa-cookie', type: 'Grãos' }
    ],
    'Tenda Peixaria Beira-Mar': [
        { name: 'Filé de Tilápia Fresco 1kg', price: 38.00, icon: 'fa-fish', type: 'Legumes' }
    ],
    'Tenda Das Bebidas e Polpas': [
        { name: 'Suco de Laranja Integral 1L', price: 9.00, icon: 'fa-wine-bottle', type: 'Frutas' }
    ],
    'Tenda do Milho & Derivados': [
        { name: 'Pamonha Doce Caseira', price: 8.00, icon: 'fa-utensils', type: 'Padaria' }
    ]
};

/* --- LÓGICA DE FILTRAGEM DE FEIRAS --- */
function toggleDistanceFilter(distance, btnElement) {
    const chips = document.querySelectorAll('.distance-chip');
    
    if (selectedMaxDistance === distance) {
        selectedMaxDistance = null;
        btnElement.classList.remove('active');
    } else {
        selectedMaxDistance = distance;
        chips.forEach(c => c.classList.remove('active'));
        btnElement.classList.add('active');
    }
    
    filterFairsList();
}

function toggleDayFilter(day, btnElement) {
    const chips = document.querySelectorAll('.day-chip');
    
    if (selectedDay === day) {
        selectedDay = null;
        btnElement.classList.remove('active');
    } else {
        selectedDay = day;
        chips.forEach(c => c.classList.remove('active'));
        btnElement.classList.add('active');
    }
    
    filterFairsList();
}

function filterFairsList() {
    const searchInput = document.getElementById('fairs-search-input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const container = document.getElementById('fairs-full-list');

    if (!container) return;

    const filteredFairs = Object.keys(fairsDatabase).filter(fairName => {
        const fair = fairsDatabase[fairName];

        const matchesSearch = fairName.toLowerCase().includes(searchTerm) || 
                              fair.address.toLowerCase().includes(searchTerm);

        const matchesDistance = selectedMaxDistance === null || fair.distanceKm <= selectedMaxDistance;

        const matchesDay = selectedDay === null || fair.days.some(d => d.toLowerCase().includes(selectedDay.toLowerCase()));

        return matchesSearch && matchesDistance && matchesDay;
    });

    if (filteredFairs.length === 0) {
        container.innerHTML = `
            <div class="empty-list" style="padding: 30px 0;">
                <i class="fas fa-search-location"></i>
                <p>Nenhuma feira encontrada com esses filtros.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredFairs.map(fairName => {
        const fair = fairsDatabase[fairName];
        return `
            <div class="fair-detail-card fair-btn-card" onclick="openFairDetailScreen('${fairName}')">
                <div class="fair-card-header">
                    <h3 class="fair-title">${fairName}</h3>
                    <span class="day-badge">${fair.dayBadge}</span>
                </div>
                <div class="fair-card-body">
                    <p><i class="fas fa-map-marker-alt"></i> ${fair.address} • <strong>${fair.distanceKm} km</strong></p>
                    <p><i class="fas fa-truck"></i> Entrega: <strong>R$ ${fair.freightCost.toFixed(2).replace('.', ',')}</strong></p>
                </div>
            </div>
        `;
    }).join('');
}

/* --- FUNÇÃO PARA CATEGORIAS NA TELA INÍCIO --- */
function selectHomeCategory(categoryName) {
    document.querySelectorAll('.bottom-nav .nav-item').forEach(i => i.classList.remove('active'));
    const fairsNavItem = document.querySelector('.bottom-nav [data-target="fairs-screen"]');
    if (fairsNavItem) fairsNavItem.classList.add('active');

    activeCategoryFilter = categoryName;

    openFairDetailScreen(currentFairName);

    const allChips = document.querySelectorAll('.fair-cat-chip');
    let targetBtn = null;

    allChips.forEach(chip => {
        chip.classList.remove('active');
        const chipText = chip.querySelector('span') ? chip.querySelector('span').textContent.trim() : '';
        if (chipText === categoryName) {
            targetBtn = chip;
        }
    });

    if (targetBtn) {
        targetBtn.classList.add('active');
        targetBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else if (allChips[0]) {
        allChips[0].classList.add('active');
    }

    filterProductsByCategory(categoryName);
}

/* --- FUNÇÕES DE PERFIL DE USUÁRIO --- */
function openProfileScreen() {
    document.getElementById('user-name-input').value = userProfileData.name;
    document.getElementById('user-email-input').value = userProfileData.email;
    document.getElementById('user-phone-input').value = userProfileData.phone;
    document.getElementById('user-address-input').value = userProfileData.address;

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('profile-screen').classList.add('active');
}

function closeProfileScreen() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('home-screen').classList.add('active');
    document.querySelectorAll('.bottom-nav .nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector('.bottom-nav [data-target="home-screen"]').classList.add('active');
}

function saveUserProfile(event) {
    event.preventDefault();
    userProfileData.name = document.getElementById('user-name-input').value;
    userProfileData.email = document.getElementById('user-email-input').value;
    userProfileData.phone = document.getElementById('user-phone-input').value;
    userProfileData.address = document.getElementById('user-address-input').value;

    document.getElementById('header-user-name').textContent = `Olá, ${userProfileData.name}!`;
    document.getElementById('profile-display-name').textContent = userProfileData.name;
    document.getElementById('profile-display-email').textContent = userProfileData.email;

    showToast("Perfil atualizado com sucesso!");
}

/* --- FUNÇÕES DO POP-UP DE NOTIFICAÇÕES --- */
function toggleNotificationsModal() {
    const modal = document.getElementById('notifications-modal');
    if (modal.classList.contains('hidden')) {
        renderNotificationsUI();
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

function closeNotificationsModalOnOutside(e) {
    if (e.target.id === 'notifications-modal') {
        document.getElementById('notifications-modal').classList.add('hidden');
    }
}

function renderNotificationsUI() {
    const container = document.getElementById('notifications-list');
    const badge = document.getElementById('notification-badge');

    if (badge) {
        badge.textContent = notificationsList.length;
        if (notificationsList.length === 0) badge.classList.add('hidden');
        else badge.classList.remove('hidden');
    }

    if (notificationsList.length === 0) {
        container.innerHTML = `<div class="empty-list" style="padding: 20px 0;"><p>Nenhuma notificação por enquanto.</p></div>`;
        return;
    }

    container.innerHTML = notificationsList.map(n => `
        <div class="notification-item">
            <div class="notification-icon" style="background-color: ${n.color}15; color: ${n.color};">
                <i class="fas ${n.icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-header-row">
                    <strong>${n.title}</strong>
                    <span class="notification-time">${n.time}</span>
                </div>
                <p>${n.desc}</p>
            </div>
        </div>
    `).join('');
}

/* --- FUNÇÃO DE TOAST CUSTOMIZADO --- */
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    
    if (toast && toastMsg) {
        toastMsg.textContent = message;
        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Navegação Principal
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    const screens = document.querySelectorAll('.screen');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetScreenId = item.getAttribute('data-target');
            if (!targetScreenId) return;

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            screens.forEach(screen => {
                screen.id === targetScreenId ? screen.classList.add('active') : screen.classList.remove('active');
            });
        });
    });

    // Filtros Expansíveis
    const toggleFairsFilterBtn = document.getElementById('toggle-fairs-filter-btn');
    const fairsDropdownFilter = document.getElementById('fairs-dropdown-filter');
    if (toggleFairsFilterBtn && fairsDropdownFilter) {
        toggleFairsFilterBtn.addEventListener('click', () => {
            fairsDropdownFilter.classList.toggle('hidden');
        });
    }

    // Modal de Quantidade
    const qtyModal = document.getElementById('quantity-modal');
    const closeQtyModalBtn = document.getElementById('close-qty-modal-btn');
    const cancelQtyModalBtn = document.getElementById('cancel-qty-modal-btn');
    const quantityForm = document.getElementById('quantity-form');

    const closeQuantityModal = () => {
        qtyModal.classList.add('hidden');
        selectedProductForCart = null;
    };

    if (closeQtyModalBtn) closeQtyModalBtn.addEventListener('click', closeQuantityModal);
    if (cancelQtyModalBtn) cancelQtyModalBtn.addEventListener('click', closeQuantityModal);

    if (quantityForm) {
        quantityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const amountInput = document.getElementById('qty-amount-input');
            const unitSelect = document.getElementById('qty-unit-select');

            const amount = parseFloat(amountInput.value);
            const unit = unitSelect ? unitSelect.value : 'kg';

            if (selectedProductForCart && amount > 0) {
                let finalPrice = selectedProductForCart.price * amount;
                if (unit === 'g') {
                    finalPrice = selectedProductForCart.price * (amount / 1000);
                }

                cart.push({
                    name: selectedProductForCart.name,
                    stallName: selectedProductForCart.stallName,
                    fairName: selectedProductForCart.fairName,
                    icon: selectedProductForCart.icon,
                    price: finalPrice,
                    amount: amount,
                    unit: unit,
                    type: selectedProductForCart.type
                });

                updateCartUI();
                closeQuantityModal();
                showToast(`${amount}${unit} de "${selectedProductForCart.name}" adicionado ao carrinho!`);
            }
        });
    }

    renderOrdersUI();
    filterFairsList();
});

function openFairDetailScreen(fairName) {
    currentFairName = fairName;
    document.getElementById('selected-fair-title').textContent = fairName;
    switchFairSubtab('products');

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('fair-detail-screen').classList.add('active');
}

function backToFairs() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('fairs-screen').classList.add('active');
}

function switchFairSubtab(tab) {
    const btnProducts = document.getElementById('tab-btn-products');
    const btnStalls = document.getElementById('tab-btn-stalls');
    const productsContainer = document.getElementById('fair-products-container');
    const stallsContainer = document.getElementById('fair-stalls-container');
    const categoriesFilter = document.getElementById('fair-categories-filter');

    if (tab === 'products') {
        btnProducts.classList.add('active');
        btnStalls.classList.remove('active');
        productsContainer.classList.remove('hidden');
        stallsContainer.classList.add('hidden');
        if (categoriesFilter) categoriesFilter.classList.remove('hidden');

        renderFairProducts(currentFairName);
    } else {
        btnStalls.classList.add('active');
        btnProducts.classList.remove('active');
        stallsContainer.classList.remove('hidden');
        productsContainer.classList.add('hidden');
        if (categoriesFilter) categoriesFilter.classList.add('hidden');

        renderFairStalls(currentFairName);
    }
}

function filterProductsByCategory(category, btnElement) {
    const allChips = document.querySelectorAll('.fair-cat-chip');
    
    if (activeCategoryFilter === category && category !== 'Todos') {
        activeCategoryFilter = 'Todos';
        allChips.forEach(chip => chip.classList.remove('active'));
        if (allChips[0]) allChips[0].classList.add('active');
    } else {
        activeCategoryFilter = category;
        allChips.forEach(chip => chip.classList.remove('active'));
        if (btnElement) btnElement.classList.add('active');
    }

    const productCards = document.querySelectorAll('#fair-products-container .stall-product-card-page');
    
    productCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        if (activeCategoryFilter === 'Todos' || cardType === activeCategoryFilter) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function renderFairProducts(fairName) {
    const productsContainer = document.getElementById('fair-products-container');
    const fairData = fairsDatabase[fairName];

    let allProducts = [];

    if (fairData && fairData.stalls) {
        fairData.stalls.forEach(stall => {
            const products = stallProductsDatabase[stall.name] || [];
            products.forEach(p => {
                allProducts.push({ ...p, stallName: stall.name });
            });
        });
    }

    if (allProducts.length === 0) {
        productsContainer.innerHTML = `<div class="empty-list"><p>Nenhum produto cadastrado para esta feira.</p></div>`;
        return;
    }

    productsContainer.innerHTML = allProducts.map(p => `
        <div class="stall-product-card-page" data-type="${p.type || ''}">
            <div class="product-icon-box">
                <i class="fas ${p.icon || 'fa-apple-alt'}"></i>
            </div>
            
            <div class="product-info-page">
                <span class="p-stall-tag"><i class="fas fa-store"></i> ${p.stallName}</span>
                <span class="p-name-page">${p.name}</span>
                <span class="p-price-page">R$ ${p.price.toFixed(2).replace('.', ',')} <small>/kg</small></span>
            </div>

            <button class="btn-add-cart-circle" onclick="openQuantityModal('${p.name}', ${p.price}, '${p.stallName}', '${p.icon || 'fa-apple-alt'}', '${p.type || 'Frutas'}')">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    `).join('');

    const allChips = document.querySelectorAll('.fair-cat-chip');
    let activeBtn = null;
    allChips.forEach(chip => {
        const chipText = chip.querySelector('span') ? chip.querySelector('span').textContent.trim() : '';
        if (chipText === activeCategoryFilter) activeBtn = chip;
    });
    filterProductsByCategory(activeCategoryFilter, activeBtn);
}

function renderFairStalls(fairName) {
    const stallsContainer = document.getElementById('fair-stalls-container');
    const fairData = fairsDatabase[fairName];

    if (!fairData || !fairData.stalls || fairData.stalls.length === 0) {
        stallsContainer.innerHTML = `<div class="empty-list"><p>Nenhuma tenda encontrada nesta feira.</p></div>`;
        return;
    }

    stallsContainer.innerHTML = fairData.stalls.map(stall => `
        <div class="stall-card" onclick="filterByStallProducts('${stall.name}')">
            <div class="stall-icon"><i class="fas fa-store"></i></div>
            <div class="stall-info">
                <h3>${stall.name}</h3>
                <p>${stall.desc}</p>
            </div>
            <i class="fas fa-chevron-right arrow-icon"></i>
        </div>
    `).join('');
}

function filterByStallProducts(stallName) {
    const productsContainer = document.getElementById('fair-products-container');
    const products = stallProductsDatabase[stallName] || [];

    switchFairSubtab('products');

    productsContainer.innerHTML = products.map(p => `
        <div class="stall-product-card-page" data-type="${p.type || ''}">
            <div class="product-icon-box">
                <i class="fas ${p.icon || 'fa-apple-alt'}"></i>
            </div>
            
            <div class="product-info-page">
                <span class="p-stall-tag"><i class="fas fa-store"></i> ${stallName}</span>
                <span class="p-name-page">${p.name}</span>
                <span class="p-price-page">R$ ${p.price.toFixed(2).replace('.', ',')} <small>/kg</small></span>
            </div>

            <button class="btn-add-cart-circle" onclick="openQuantityModal('${p.name}', ${p.price}, '${stallName}', '${p.icon || 'fa-apple-alt'}', '${p.type || 'Frutas'}')">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    `).join('');

    const allChips = document.querySelectorAll('.fair-cat-chip');
    let activeBtn = null;
    allChips.forEach(chip => {
        const chipText = chip.querySelector('span') ? chip.querySelector('span').textContent.trim() : '';
        if (chipText === activeCategoryFilter) activeBtn = chip;
    });
    filterProductsByCategory(activeCategoryFilter, activeBtn);
}

/* --- FUNÇÃO PARA ABRIR O MODAL DE ADICIONAR AO CARRINHO --- */
function openQuantityModal(name, price, stallName, icon, type) {
    const fairName = stallToFairMap[stallName] || currentFairName;
    selectedProductForCart = { name, price, stallName, fairName, icon, type };

    document.getElementById('qty-modal-product-name').textContent = name;
    document.getElementById('qty-modal-stall-name').innerHTML = `<i class="fas fa-store"></i> ${stallName}`;
    document.getElementById('qty-modal-product-price').textContent = `R$ ${price.toFixed(2).replace('.', ',')} /kg`;
    document.getElementById('qty-amount-input').value = '1';

    const unitSelect = document.getElementById('qty-unit-select');
    if (unitSelect) unitSelect.value = 'kg';

    document.getElementById('quantity-modal').classList.remove('hidden');
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const summary = document.getElementById('cart-summary');
    const freightDetailsContainer = document.getElementById('freight-details-container');

    if (cart.length === 0) {
        container.innerHTML = '';
        emptyMsg.classList.remove('hidden');
        summary.classList.add('hidden');
        return;
    }

    emptyMsg.classList.add('hidden');
    summary.classList.remove('hidden');

    let subtotal = 0;
    const uniqueFairs = new Set();

    container.innerHTML = cart.map((item, index) => {
        subtotal += item.price;
        uniqueFairs.add(item.fairName);

        return `
            <div class="cart-item">
                <div class="cart-item-icon-box">
                    <i class="fas ${item.icon || 'fa-apple-alt'}"></i>
                </div>

                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-stall"><i class="fas fa-store"></i> ${item.stallName}</span>
                    <p>${item.amount}${item.unit} • R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                </div>

                <button class="action-btn delete-btn" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    let totalFreight = 0;
    let freightBreakdownHTML = '';

    uniqueFairs.forEach(fairName => {
        const fairData = fairsDatabase[fairName] || { distanceKm: 2.0, freightCost: 6.00 };
        totalFreight += fairData.freightCost;

        freightBreakdownHTML += `
            <div class="freight-item">
                <span><i class="fas fa-map-marker-alt"></i> ${fairName} (${fairData.distanceKm} km)</span>
                <span>R$ ${fairData.freightCost.toFixed(2).replace('.', ',')}</span>
            </div>
        `;
    });

    freightDetailsContainer.innerHTML = freightBreakdownHTML;

    const total = subtotal + totalFreight;

    document.getElementById('subtotal-val').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('freight-total-val').textContent = `R$ ${totalFreight.toFixed(2).replace('.', ',')}`;
    document.getElementById('total-val').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    showToast("Item removido do carrinho.");
}

function clearCart() {
    cart = [];
    updateCartUI();
    showToast("Carrinho limpo com sucesso.");
}

/* --- FLUXO DE CHECKOUT E SELEÇÃO DE PAGAMENTO --- */
function checkoutOrder() {
    if (cart.length === 0) return;

    let subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const uniqueFairs = new Set(cart.map(i => i.fairName));
    let totalFreight = 0;
    uniqueFairs.forEach(fairName => {
        const fairData = fairsDatabase[fairName] || { freightCost: 6.00 };
        totalFreight += fairData.freightCost;
    });

    const total = subtotal + totalFreight;
    document.getElementById('checkout-total-val').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('payment-screen').classList.add('active');
}

function backToCart() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('cart-screen').classList.add('active');
}

function confirmPaymentAndOrder() {
    let subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const uniqueFairs = new Set(cart.map(i => i.fairName));
    let totalFreight = 0;
    uniqueFairs.forEach(fairName => {
        const fairData = fairsDatabase[fairName] || { freightCost: 6.00 };
        totalFreight += fairData.freightCost;
    });

    const orderId = `#${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
        id: orderId,
        date: 'Hoje às ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        total: subtotal + totalFreight,
        items: [...cart]
    };

    activeOrders.unshift(newOrder);

    notificationsList.unshift({
        id: Date.now(),
        title: `Pedido ${orderId} Realizado!`,
        time: 'Agora',
        desc: 'Seu pedido foi recebido e está em preparação pelos feirantes.',
        icon: 'fa-shopping-basket',
        color: '#2e7d32'
    });

    cart = [];
    updateCartUI();
    renderNotificationsUI();

    document.querySelectorAll('.bottom-nav .nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector('.bottom-nav [data-target="orders-screen"]').classList.add('active');

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('orders-screen').classList.add('active');

    renderOrdersUI();
    showToast("Pedido realizado com sucesso!");
}

function switchOrderTab(tab) {
    const activeBtn = document.querySelectorAll('.order-tab-btn')[0];
    const historyBtn = document.querySelectorAll('.order-tab-btn')[1];
    const activeContainer = document.getElementById('active-orders-container');
    const historyContainer = document.getElementById('history-orders-container');

    if (tab === 'active') {
        activeBtn.classList.add('active');
        historyBtn.classList.remove('active');
        activeContainer.classList.remove('hidden');
        historyContainer.classList.add('hidden');
    } else {
        historyBtn.classList.add('active');
        activeBtn.classList.remove('active');
        historyContainer.classList.remove('hidden');
        activeContainer.classList.add('hidden');
    }
}

function renderOrdersUI() {
    const activeContainer = document.getElementById('active-orders-container');
    const historyContainer = document.getElementById('history-orders-container');

    if (activeOrders.length === 0) {
        activeContainer.innerHTML = `<div class="empty-list"><i class="fas fa-box-open"></i><p>Nenhum pedido em andamento.</p></div>`;
    } else {
        activeContainer.innerHTML = activeOrders.map(order => `
            <div class="order-card">
                <div class="order-card-header">
                    <div>
                        <span class="order-id">${order.id}</span>
                        <div class="order-date">${order.date}</div>
                    </div>
                    <span class="order-status-badge badge-prep"><i class="fas fa-spinner fa-spin"></i> Em Preparação</span>
                </div>

                <div class="order-items-preview">
                    ${order.items.map(i => `• ${i.amount}${i.unit} ${i.name} (${i.stallName})`).join('<br>')}
                </div>

                <div class="order-card-footer">
                    <span>Total</span>
                    <span class="order-total-price">R$ ${order.total.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
        `).join('');
    }

    if (historyOrders.length === 0) {
        historyContainer.innerHTML = `<div class="empty-list"><i class="fas fa-history"></i><p>Nenhum histórico disponível.</p></div>`;
    } else {
        historyContainer.innerHTML = historyOrders.map((order, idx) => `
            <div class="order-card">
                <div class="order-card-header">
                    <div>
                        <span class="order-id">${order.id}</span>
                        <div class="order-date">${order.date}</div>
                    </div>
                    <span class="order-status-badge badge-done"><i class="fas fa-check-circle"></i> Entregue</span>
                </div>

                <div class="order-items-preview">
                    ${order.items.map(i => `• ${i.amount}${i.unit} ${i.name} (${i.stallName})`).join('<br>')}
                </div>

                <div class="order-card-footer">
                    <span class="order-total-price">R$ ${order.total.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-reorder" onclick="reorderItems(${idx})">
                        <i class="fas fa-redo"></i> Pedir Novamente
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function reorderItems(index) {
    const historyOrder = historyOrders[index];
    if (historyOrder) {
        historyOrder.items.forEach(item => cart.push({ ...item }));
        updateCartUI();
        showToast("Itens adicionados ao seu carrinho!");

        document.querySelectorAll('.bottom-nav .nav-item').forEach(i => i.classList.remove('active'));
        document.querySelector('.bottom-nav [data-target="cart-screen"]').classList.add('active');

        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('cart-screen').classList.add('active');
    }
}