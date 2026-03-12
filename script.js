/**
 * Alsat - Makedonya İlan Platformu
 * Çok Dilli: TR, EN, MK, AL
 */

// ========== DİL SİSTEMİ ==========
window.currentLang = localStorage.getItem('alsat_lang') || 'tr';

function t(key, subKey) {
    const tr = window.TRANSLATIONS?.[window.currentLang] || window.TRANSLATIONS?.tr || {};
    if (subKey && tr[key]) return tr[key][subKey] ?? tr[key]?.[subKey] ?? key;
    return tr[key] ?? key;
}
function tCity(cityKey) {
    if (!cityKey) return '';
    const tr = window.TRANSLATIONS?.[window.currentLang]?.cities;
    return tr?.[cityKey] ?? cityKey;
}
function tDistrict(districtKey) {
    if (!districtKey) return '';
    const tr = window.TRANSLATIONS?.[window.currentLang]?.districts;
    return tr?.[districtKey] ?? districtKey;
}

function updateLanguage(lang) {
    window.currentLang = lang;
    localStorage.setItem('alsat_lang', lang);
    document.documentElement.lang = lang === 'tr' ? 'tr' : lang === 'en' ? 'en' : lang === 'mk' ? 'mk' : 'sq';
    var mainLang = document.getElementById('lang-select');
    if (mainLang) mainLang.value = lang;
    var mobLang = document.getElementById('mobile-lang-select');
    if (mobLang) mobLang.value = lang;
    const L = window.TRANSLATIONS?.[lang] || window.TRANSLATIONS?.tr || {};
    const set = (id, prop, val) => { const e = el(id); if (e && val) e[prop] = val; };
    document.title = L.pageTitle || document.title;
    set('searchInput', 'placeholder', L.search);
    set('dark-mode-toggle', 'title', L.themeToggle);
    set('mobile-txt-theme', 'textContent', L.themeToggle);
    set('mobile-txt-currency', 'textContent', L.currency || 'Döviz Kuru');
    set('mobile-txt-destek', 'textContent', L.support || 'Destek');
    set('mobile-txt-dil', 'textContent', L.language || 'Dil');
    set('mobile-txt-ilan-ver', 'textContent', L.postAd);
    set('mobile-txt-giris', 'textContent', L.login);
    set('mobile-profile-text', 'textContent', L.profile);
    set('mobile-logout-text', 'textContent', L.logout);
    set('mobile-txt-fav', 'textContent', L.myFavorites || 'Favoriler');
    set('mobile-txt-msg', 'textContent', L.messages || 'Mesajlar');
    set('mobile-txt-notif', 'textContent', L.notifications || 'Bildirimler');
    set('mobile-menu-title', 'textContent', L.menu || 'Menü');
    set('txt-ilan-ver', 'textContent', L.postAd);
    set('txt-giris', 'textContent', L.login);
    set('profile-text', 'textContent', L.profile);
    set('logout-text', 'textContent', L.logout);
    set('banner-hizli', 'textContent', L.bannerFast);
    set('p-hizli', 'textContent', L.bannerFastP);
    set('banner-yeni', 'textContent', L.bannerNew);
    set('p-yeni', 'textContent', L.bannerNewP);
    set('banner-ozel', 'textContent', L.bannerSpecial);
    set('tag-indirim', 'textContent', L.bannerDiscount);
    set('label-filtreler', 'innerHTML', '<i class="fa-solid fa-sliders"></i> ' + L.filters);
    set('btn-temizle', 'textContent', L.clear);
    set('label-lokasyon', 'innerHTML', '<i class="fa-solid fa-location-dot"></i> ' + L.address);
    set('label-fiyat', 'innerHTML', '<i class="fa-solid fa-tags"></i> ' + L.priceRange);
    set('label-durum', 'innerHTML', '<i class="fa-solid fa-star"></i> ' + L.productCondition);
    set('label-kimden', 'innerHTML', '<i class="fa-solid fa-user-tie"></i> ' + L.fromWho);
    set('minPrice', 'placeholder', L.minEur);
    set('maxPrice', 'placeholder', L.maxEur);
    set('durum-yeni', 'textContent', L.newItem);
    set('durum-2el', 'textContent', L.used);
    set('txt-sahibi', 'textContent', L.fromOwner);
    set('txt-galeri', 'textContent', L.fromStore);
    set('btn-uygula', 'textContent', L.showResults);
    set('label-populer', 'textContent', L.popularAds);
    set('f-1-h', 'textContent', L.f1Title);
    set('f-1-p', 'textContent', L.f1Desc);
    set('f-2-h', 'textContent', L.f2Title);
    set('f-2-p', 'textContent', L.f2Desc);
    set('f-3-h', 'textContent', L.f3Title);
    set('f-3-p', 'textContent', L.f3Desc);
    set('f-4-h', 'textContent', L.f4Title);
    set('f-4-p', 'textContent', L.f4Desc);
    if (el('kategori-listesi')) initCategorySidebar();
    set('modal-baslik', 'textContent', L.newAdTitle);
    set('form-label-baslik', 'textContent', L.adTitle);
    set('ilan-baslik', 'placeholder', L.adTitlePlaceholder);
    set('form-label-kat', 'textContent', L.category);
    set('form-label-fiyat', 'textContent', L.price);
    set('form-label-durum', 'textContent', L.productCondition);
    set('form-label-kimden', 'textContent', L.fromWho);
    set('form-label-tel', 'textContent', L.contactNum);
    set('form-label-sehir', 'textContent', L.city);
    set('form-label-ilce', 'textContent', L.district);
    set('form-label-aciklama', 'textContent', L.description);
    set('ilan-aciklama', 'placeholder', L.descriptionPlaceholder);
    set('form-label-foto', 'textContent', L.photos);
    set('form-label-surukle', 'textContent', L.dragOrClick);
    set('premium-baslik', 'innerHTML', '<i class="fa-solid fa-crown"></i> ' + L.paidPrivileges);
    set('prem-label-vitrin', 'textContent', L.featuredAd);
    set('prem-label-font', 'textContent', L.boldTitle);
    set('btn-yayinla-text', 'textContent', L.publishAd);
    set('login-baslik', 'textContent', L.secureLogin);
    set('login-email-label', 'textContent', L.emailOrUser);
    set('login-pass-label', 'textContent', L.password);
    set('login-password', 'placeholder', L.passwordPlaceholder);
    set('remember-text', 'textContent', L.rememberMe);
    set('forgot-password', 'textContent', L.forgotPassword);
    set('login-btn-text', 'textContent', L.loginBtn);
    set('or-text', 'textContent', L.or);
    set('signup-text', 'textContent', L.createAccount);
    set('signup-baslik', 'textContent', L.signup);
    set('signup-name-label', 'textContent', L.fullName);
    set('signup-name', 'placeholder', L.namePlaceholder);
    set('signup-email-label', 'textContent', L.email);
    set('signup-pass-label', 'textContent', L.password);
    set('signup-password', 'placeholder', L.passwordPlaceholder);
    set('signup-confirm-label', 'textContent', L.confirmPassword);
    set('signup-confirm', 'placeholder', L.confirmPlaceholder);
    set('agree-text', 'textContent', L.agreeTerms);
    set('signup-btn-text', 'textContent', L.signupBtn);
    set('back-text', 'textContent', L.back);
    set('login-text', 'textContent', L.haveAccount);
    qsa('#profile-link span').forEach(s => s.textContent = L.myProfile);
    qsa('#favorites-link span').forEach(s => s.textContent = L.myFavorites);
    qsa('#ads-link span').forEach(s => s.textContent = L.myAds);
    qsa('#logout-link span').forEach(s => s.textContent = L.logoutBtn);
    set('profile-page-title', 'textContent', L.myProfile);
    qsa('#back-profile-btn, #back-favorites-btn, #back-ads-btn').forEach(b => { b.innerHTML = '<i class="fa-solid fa-arrow-left"></i> ' + L.back; });
    qsa('.tab-btn[data-tab="profile-info"]').forEach(b => b.innerHTML = '<i class="fa-solid fa-user"></i> ' + (L.tabProfile || L.profile));
    document.querySelector('.tab-btn[data-tab="account-settings"]').innerHTML = '<i class="fa-solid fa-gear"></i> ' + (L.tabSettings || 'Ayarlar');
    document.querySelector('.tab-btn[data-tab="payment"]').innerHTML = '<i class="fa-solid fa-credit-card"></i> ' + (L.tabCredit || 'Kredi');
    document.querySelector('.tab-btn[data-tab="ratings"]').innerHTML = '<i class="fa-solid fa-star"></i> ' + (L.tabRatings || L.rating || 'Puanlar');
    const stats = el('profile-info');
    if (stats) {
        const lbs = stats.querySelectorAll('.profile-stats .stat-label');
        if (lbs[0]) lbs[0].textContent = L.statAds || 'İlan';
        if (lbs[1]) lbs[1].textContent = L.statFav || 'Favori';
        if (lbs[2]) lbs[2].textContent = L.tabCredit || 'Kredi';
    }
    const bioLabel = document.querySelector('.profile-bio-section label');
    if (bioLabel) bioLabel.textContent = L.aboutMe;
    const contactLabels = document.querySelectorAll('.profile-contact-section .contact-item label');
    if (contactLabels[0]) contactLabels[0].textContent = L.phone;
    if (contactLabels[1]) contactLabels[1].textContent = L.address;
    set('profile-bio', 'placeholder', L.bioPlaceholder);
    set('save-bio-btn', 'textContent', L.save);
    set('save-contact-btn', 'textContent', L.save);
    const contactH3 = document.querySelector('.profile-contact-section h3');
    if (contactH3) contactH3.textContent = L.contactInfo;
    const settingsH3s = document.querySelectorAll('.settings-card h3');
    if (settingsH3s[0]) settingsH3s[0].innerHTML = '<i class="fa-solid fa-lock"></i> ' + L.changePassword;
    const settingLabels = document.querySelectorAll('.settings-card .setting-item label');
    if (settingLabels[0]) settingLabels[0].textContent = L.currentPassword;
    if (settingLabels[1]) settingLabels[1].textContent = L.newPassword;
    if (settingLabels[2]) settingLabels[2].textContent = L.confirmPassLabel;
    set('old-password', 'placeholder', L.currentPassPlaceholder);
    set('new-password', 'placeholder', L.newPassPlaceholder);
    set('confirm-new-password', 'placeholder', L.confirmPassPlaceholder);
    set('change-password-btn', 'textContent', L.changePassword);
    if (settingsH3s[1]) settingsH3s[1].innerHTML = '<i class="fa-solid fa-bell"></i> ' + L.notifications;
    const toggleSpans = document.querySelectorAll('.toggle-item span');
    if (toggleSpans[0]) toggleSpans[0].textContent = L.notifyMessages;
    if (toggleSpans[1]) toggleSpans[1].textContent = L.notifyOffers;
    if (toggleSpans[2]) toggleSpans[2].textContent = L.notifyFavorites;
    set('save-notifications-btn', 'textContent', L.save);
    document.querySelectorAll('.settings-card.danger h3').forEach(h => h.innerHTML = '<i class="fa-solid fa-trash"></i> ' + L.dangerZone);
    const dangerP = document.querySelector('.settings-card.danger p');
    if (dangerP) dangerP.textContent = L.deleteWarning;
    set('delete-account-btn', 'textContent', L.deleteAccount);
    const creditH3 = document.querySelector('.credit-header h3');
    if (creditH3) creditH3.textContent = L.currentCredit;
    const creditSub = document.querySelector('.credit-subtitle');
    if (creditSub) creditSub.textContent = L.creditSubtitle;
    const pmH3s = document.querySelectorAll('.payment-methods h3');
    if (pmH3s[0]) pmH3s[0].textContent = L.creditTopUp;
    if (pmH3s[1]) pmH3s[1].textContent = L.customAmount;
    set('custom-amount', 'placeholder', L.amountPlaceholder);
    set('custom-payment-btn', 'textContent', L.continuePayment);
    const chH3 = document.querySelector('.credit-history h3');
    if (chH3) chH3.textContent = L.creditHistory;
    set('no-history', 'textContent', L.noCreditHistory);
    const rsH3 = document.querySelector('.ratings-summary h3');
    if (rsH3) rsH3.textContent = L.myStats;
    const ratingStats = document.querySelectorAll('#ratings .rating-stats .stat-label');
    if (ratingStats[0]) ratingStats[0].textContent = L.avgRating;
    if (ratingStats[1]) ratingStats[1].textContent = L.totalRatings;
    const ratingsH3s = document.querySelectorAll('#ratings h3');
    if (ratingsH3s[1]) ratingsH3s[1].textContent = L.receivedRatings;
    if (ratingsH3s[2]) ratingsH3s[2].textContent = L.givenRatings;
    const ratingEmpty = document.querySelectorAll('#ratings .empty-state');
    if (ratingEmpty[0]) ratingEmpty[0].textContent = L.noReceivedRatings;
    if (ratingEmpty[1]) ratingEmpty[1].textContent = L.noGivenRatings;
    const favH1 = document.querySelector('#favorites-page h1');
    if (favH1) favH1.textContent = L.myFavorites;
    set('no-favorites', 'textContent', L.noFavorites);
    const adsH1 = document.querySelector('#my-ads-page h1');
    if (adsH1) adsH1.textContent = L.myAds;
    set('new-ad-from-profile', 'innerHTML', '<i class="fa-solid fa-plus"></i> ' + L.newAd);
    set('no-ads', 'textContent', L.noAds);
    const msgTitle = document.querySelector('#messaging-modal .modal-title');
    if (msgTitle) msgTitle.innerHTML = '<i class="fa-solid fa-comments"></i> ' + L.messages;
    set('msg-search', 'placeholder', L.searchConversation);
    set('no-conversations', 'textContent', L.noConversations);
    const msgEmptyP = document.querySelector('.message-view-empty p');
    if (msgEmptyP) msgEmptyP.textContent = L.selectConversation;
    set('message-input', 'placeholder', L.yourMessage);
    const ratingTitle = document.querySelector('#rating-modal .modal-title');
    if (ratingTitle) ratingTitle.innerHTML = '<i class="fa-solid fa-star"></i> ' + L.rating;
    const ratingLabel = document.querySelector('#rating-form label');
    if (ratingLabel) ratingLabel.textContent = L.yourRating;
    set('star-text', 'textContent', L.selectRating);
    const ratingCommentLabel = document.querySelector('#rating-form label[for="rating-comment"]');
    if (ratingCommentLabel) ratingCommentLabel.textContent = L.yourComment;
    set('rating-comment', 'placeholder', L.commentPlaceholder);
    const ratingSubmitBtn = document.querySelector('#rating-form button[type="submit"]');
    if (ratingSubmitBtn) ratingSubmitBtn.textContent = L.submit;
    const payTitle = document.querySelector('#payment-modal .modal-title');
    if (payTitle) payTitle.innerHTML = '<i class="fa-solid fa-credit-card"></i> ' + L.paymentSystem;
    const payAmtLabel = document.querySelector('.payment-amount label');
    if (payAmtLabel) payAmtLabel.textContent = L.amount;
    const payBonusLabel = document.querySelector('.payment-bonus label');
    if (payBonusLabel) payBonusLabel.textContent = L.bonus;
    const cardNameLabel = document.querySelector('#payment-form label[for="card-name"]');
    if (cardNameLabel) cardNameLabel.textContent = L.cardHolder;
    set('card-name', 'placeholder', L.namePlaceholder);
    const cardNumLabel = document.querySelector('#payment-form label[for="card-number"]');
    if (cardNumLabel) cardNumLabel.textContent = L.cardNumber;
    const expiryLabel = document.querySelector('#payment-form label[for="card-expiry"]');
    if (expiryLabel) expiryLabel.textContent = L.expiry;
    const paymentInfo = document.querySelector('.payment-info');
    if (paymentInfo) paymentInfo.innerHTML = '<i class="fa-solid fa-info-circle"></i> ' + L.paymentTestInfo;
    set('pay-btn', 'textContent', L.completePayment);
    set('opt-sort-newest', 'textContent', L.sortNewest);
    set('opt-sort-price-asc', 'textContent', L.sortPriceAsc);
    set('opt-sort-price-desc', 'textContent', L.sortPriceDesc);
    set('opt-sort-views', 'textContent', L.sortViews);
    set('form-label-video', 'textContent', L.videoLabel);
    set('forgot-title', 'textContent', L.forgotPasswordTitle);
    set('forgot-desc', 'textContent', L.forgotPasswordDesc);
    set('forgot-send-btn', 'textContent', L.sendResetLink);
    const sehirOpt = el('sehir-select')?.querySelector('option[value=""]');
    if (sehirOpt) sehirOpt.textContent = L.allMacedonia;
    sehirListesi.forEach((city, i) => {
        const opt = el('sehir-select')?.options[i + 1];
        if (opt) opt.textContent = tCity(city);
    });
    const ilceOpt = el('ilce-select')?.querySelector('option[value=""]');
    if (ilceOpt) ilceOpt.textContent = L.districtSelect;
    const currSehir = el('sehir-select')?.value;
    if (currSehir && lokasyonlar[currSehir]) {
        const ilceSelect = el('ilce-select');
        const distOpts = ilceSelect?.querySelectorAll('option');
        if (distOpts && distOpts.length > 1) {
            lokasyonlar[currSehir].forEach((d, j) => {
                if (distOpts[j + 1]) distOpts[j + 1].textContent = tDistrict(d);
            });
        }
    }
    const formKat = el('form-kat-select')?.querySelector('option[value=""]');
    if (formKat) formKat.textContent = L.selectCategory;
    const formSehirOpt = el('form-sehir-select')?.querySelector('option[value=""]');
    if (formSehirOpt) formSehirOpt.textContent = L.selectCity;
    const formSehirOpts = el('form-sehir-select')?.querySelectorAll('option');
    if (formSehirOpts) sehirListesi.forEach((city, i) => {
        if (formSehirOpts[i + 1]) formSehirOpts[i + 1].textContent = tCity(city);
    });
    initCategorySelect();
    applyFilters();
}

// ========== VARSayILAN 100 İLAN (kategorilere göre ilgili fotoğraflar) ==========
const CATEGORY_IMAGES = {
    Otomobil: ["https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400","https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400","https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400","https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400","https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400"],
    Motosiklet: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400","https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400","https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400"],
    Bisiklet: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400","https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400","https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400"],
    "Yedek Parça": ["https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400","https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400"],
    Telefon: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400","https://images.unsplash.com/photo-1592286927505-1def25115558?w=400","https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400"],
    TV: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400","https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a5?w=400","https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400"],
    Bilgisayar: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400","https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400","https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400"],
    "Oyun Konsolu": ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400","https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400"],
    Mobilya: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400","https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400","https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400"],
    "Beyaz Eşya": ["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400","https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400"],
    Ayakkabı: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400","https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400"],
    Çanta: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400","https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400"],
    "Satılık Daire": ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"],
    "Kiralık Daire": ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400","https://images.unsplash.com/photo-1560185127-6a189efa9ad9?w=400"],
    Ofis: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=400","https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400"],
    default: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400","https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400"]
};

function getImgForCategory(sub, cat, idx) {
    const arr = CATEGORY_IMAGES[sub] || CATEGORY_IMAGES[cat] || CATEGORY_IMAGES.default;
    return arr[idx % arr.length];
}

function getDefaultAds() {
    const cities = ["Üsküp","Gostivar","Kalkandelen","Manastır","Ohri","Bitola","Pirlepe","Struga","Kumanova","Köprülü","Iştip","Ustrumca","Kavadar","Koçana","Karçova","Gevgelli","Radoviş","Eğri Dere","Delcevo","Debre","Berovo","Resen","Negotino","Sveti Nikole","Valandovo","Kratovo","Vinica","Makedonski Brod","Kruşevo","Demir Hisar","Kiçevo","Bogdanci"];
    const data = [
        {t:"Volkswagen Golf 2018",p:16500,cat:"Vasıta",sub:"Otomobil",cond:"İkinci El",from:"Sahibinden",d:"İyi durumda araç"},
        {t:"BMW 3 Serisi",p:22000,cat:"Vasıta",sub:"Otomobil",cond:"İkinci El",from:"Mağaza",d:"Full paket"},
        {t:"Mercedes C180",p:18500,cat:"Vasıta",sub:"Otomobil",cond:"Sıfır",from:"Mağaza",d:"Dizel, düşük km"},
        {t:"Honda Civic",p:12500,cat:"Vasıta",sub:"Otomobil",cond:"İkinci El",from:"Sahibinden",d:"Benzin"},
        {t:"Toyota Corolla",p:14500,cat:"Vasıta",sub:"Otomobil",cond:"İkinci El",from:"Sahibinden",d:"2020 model"},
        {t:"Honda CB 500",p:4500,cat:"Vasıta",sub:"Motosiklet",cond:"Sıfır",from:"Sahibinden",d:"Yeni model"},
        {t:"Yamaha MT-07",p:6200,cat:"Vasıta",sub:"Motosiklet",cond:"İkinci El",from:"Sahibinden",d:"2019"},
        {t:"Kawasaki Ninja",p:5800,cat:"Vasıta",sub:"Motosiklet",cond:"İkinci El",from:"Mağaza",d:"Hat aslında"},
        {t:"Bisiklet Dağ",p:320,cat:"Vasıta",sub:"Bisiklet",cond:"İkinci El",from:"Sahibinden",d:"21 vites"},
        {t:"Bisiklet Şehir",p:180,cat:"Vasıta",sub:"Bisiklet",cond:"Sıfır",from:"Mağaza",d:"Yeni"},
        {t:"Lastik Set 4 Adet",p:280,cat:"Vasıta",sub:"Yedek Parça",cond:"Sıfır",from:"Sahibinden",d:"205/55 R16"},
        {t:"iPhone 14 Pro",p:1200,cat:"Elektronik",sub:"Telefon",cond:"Sıfır",from:"Sahibinden",d:"Kutusunda"},
        {t:"Samsung S24",p:950,cat:"Elektronik",sub:"Telefon",cond:"Sıfır",from:"Mağaza",d:"256GB"},
        {t:"iPhone 12",p:450,cat:"Elektronik",sub:"Telefon",cond:"İkinci El",from:"Sahibinden",d:"128GB"},
        {t:"Xiaomi Redmi",p:220,cat:"Elektronik",sub:"Telefon",cond:"Sıfır",from:"Mağaza",d:"Yeni nesil"},
        {t:"Samsung TV 55\"",p:650,cat:"Elektronik",sub:"TV",cond:"Sıfır",from:"Mağaza",d:"Smart TV"},
        {t:"LG OLED 48\"",p:890,cat:"Elektronik",sub:"TV",cond:"Sıfır",from:"Mağaza",d:"4K"},
        {t:"MacBook Pro",p:1800,cat:"Elektronik",sub:"Bilgisayar",cond:"İkinci El",from:"Sahibinden",d:"M2 chip"},
        {t:"Dell Laptop",p:650,cat:"Elektronik",sub:"Bilgisayar",cond:"Sıfır",from:"Mağaza",d:"i5, 8GB RAM"},
        {t:"PlayStation 5",p:550,cat:"Elektronik",sub:"Oyun Konsolu",cond:"Sıfır",from:"Mağaza",d:"2 kol"},
        {t:"Xbox Series X",p:480,cat:"Elektronik",sub:"Oyun Konsolu",cond:"İkinci El",from:"Sahibinden",d:"1TB"},
        {t:"IKEA Kanepe",p:300,cat:"Ev Eşyaları",sub:"Mobilya",cond:"Sıfır",from:"Mağaza",d:"Kullanılmamış"},
        {t:"Koltuk Takımı",p:450,cat:"Ev Eşyaları",sub:"Mobilya",cond:"İkinci El",from:"Sahibinden",d:"3+2+1"},
        {t:"Yemek Masası",p:120,cat:"Ev Eşyaları",sub:"Mobilya",cond:"İkinci El",from:"Sahibinden",d:"6 kişilik"},
        {t:"Çocuk Odası",p:380,cat:"Ev Eşyaları",sub:"Mobilya",cond:"Sıfır",from:"Mağaza",d:"Yatak+dolap"},
        {t:"Buzdolabı Samsung",p:450,cat:"Ev Eşyaları",sub:"Beyaz Eşya",cond:"İkinci El",from:"Sahibinden",d:"A+ enerji"},
        {t:"Çamaşır Makinesi",p:280,cat:"Ev Eşyaları",sub:"Beyaz Eşya",cond:"Sıfır",from:"Mağaza",d:"9 kg"},
        {t:"Nike Ayakkabı",p:85,cat:"Moda",sub:"Ayakkabı",cond:"Sıfır",from:"Sahibinden",d:"Giyilmemiş"},
        {t:"Deri Çanta",p:75,cat:"Moda",sub:"Çanta",cond:"İkinci El",from:"Sahibinden",d:"Marka"},
        {t:"Kadın Mont",p:95,cat:"Moda",sub:"Kadın Giyim",cond:"Sıfır",from:"Mağaza",d:"Kışlık"},
        {t:"Deri Ceket",p:140,cat:"Moda",sub:"Erkek Giyim",cond:"Sıfır",from:"Mağaza",d:"Gerçek deri"},
        {t:"Saat Kol Saati",p:120,cat:"Moda",sub:"Saat",cond:"İkinci El",from:"Sahibinden",d:"Marka"},
        {t:"3+1 Daire Satılık",p:85000,cat:"Emlak",sub:"Satılık Daire",cond:"",from:"Mağaza",d:"Merkez konum"},
        {t:"2+1 Daire Satılık",p:55000,cat:"Emlak",sub:"Satılık Daire",cond:"",from:"Sahibinden",d:"Sıfır bina"},
        {t:"2+1 Kiralık",p:350,cat:"Emlak",sub:"Kiralık Daire",cond:"",from:"Sahibinden",d:"Eşyalı"},
        {t:"1+1 Kiralık",p:280,cat:"Emlak",sub:"Kiralık Daire",cond:"",from:"Mağaza",d:"Merkez"},
        {t:"Ofis Kiralık",p:800,cat:"Emlak",sub:"Ofis",cond:"",from:"Mağaza",d:"100 m²"},
        {t:"Web Tasarım",p:250,cat:"İş & Hizmetler",sub:"Hizmetler",cond:"",from:"Mağaza",d:"Profesyonel"},
        {t:"Grafik Tasarım",p:180,cat:"İş & Hizmetler",sub:"Freelance",cond:"",from:"Sahibinden",d:"Logo, broşür"}
    ];
    const sellers = ["Ahmet A.","Fatma K.","Mehmet B.","Ayşe Y.","Ali D.","Zeynep M.","Can Ö.","Elif S.","Burak T.","Selin K.","Murat K.","Seda Y."];
    const currencies = ['EUR','EUR','MKD','MKD','TRY'];
    let id = 1, ads = [];
    const now = new Date();
    for (let i = 0; i < 100; i++) {
        const d = data[i % data.length];
        const city = cities[i % cities.length];
        const distList = city === "Üsküp" ? ["Merkez","Aerodrom","Çayır","Gazi Baba","Butel"] : ["Merkez"];
        const imgUrl = getImgForCategory(d.sub, d.cat, i);
        const cur = currencies[i % currencies.length];
        const created = new Date(now);
        created.setDate(created.getDate() - (i % 14)); // Son 2 hafta içinde oluşturulmuş
        const createdStr = created.toISOString().slice(0, 10);
        const exp = new Date(created); exp.setDate(exp.getDate() + 30);
        ads.push({
            id: id++, title: d.t, price: d.p, currency: cur, category: d.cat, subCategory: d.sub, condition: d.cond || "İkinci El", sellerType: d.from,
            image: imgUrl, images: [imgUrl], video: null, phone: '+3897' + String(10000000 + id).slice(-8), city, cities: [city], district: distList[i % distList.length],
            seller: sellers[i % sellers.length], views: Math.floor(Math.random()*400)+50, description: d.d,
            createdAt: createdStr, expiryAt: exp.toISOString().slice(0, 10), userId: null, status: 'approved', featured: (i % 8) === 0
        });
    }
    return ads;
}

loadUsersDatabase();

(function() {
    const stored = localStorage.getItem('adsDatabase');
    let ads = stored ? JSON.parse(stored) : getDefaultAds();
    if (ads.length < 50) {
        ads = getDefaultAds();
        localStorage.setItem('adsDatabase', JSON.stringify(ads));
    } else {
        const now = new Date();
        const allExpired = ads.every(ad => {
            const exp = ad.expiryAt ? new Date(ad.expiryAt) : null;
            return exp && exp < now;
        });
        if (allExpired && ads.length > 0) {
            ads = getDefaultAds();
            localStorage.setItem('adsDatabase', JSON.stringify(ads));
        }
    }
    window.adsDatabase = ads;
})();

window.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
window.conversations = JSON.parse(localStorage.getItem('conversations') || '{}');
window.notifications = JSON.parse(localStorage.getItem('alsat_notifications_list') || '[]');
window.userRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
window.userCredits = JSON.parse(localStorage.getItem('userCredits') || '{}');
window.userVerifiedUntil = JSON.parse(localStorage.getItem('alsat_verified') || '{}');
window.reportsDatabase = JSON.parse(localStorage.getItem('alsat_reports') || '[]');
window.recentlyViewed = JSON.parse(localStorage.getItem('alsat_recently_viewed') || '[]');

function saveRecentlyViewed() { localStorage.setItem('alsat_recently_viewed', JSON.stringify(window.recentlyViewed || [])); }
window.userSession = { token: null, user: null };

function saveReports() { localStorage.setItem('alsat_reports', JSON.stringify(window.reportsDatabase || [])); }
window.savedFilters = JSON.parse(localStorage.getItem('alsat_saved_filters') || '[]');
window.priceAlerts = JSON.parse(localStorage.getItem('alsat_price_alerts') || '[]');
function savePriceAlerts() { localStorage.setItem('alsat_price_alerts', JSON.stringify(window.priceAlerts || [])); }
function saveSavedFilters() { localStorage.setItem('alsat_saved_filters', JSON.stringify(window.savedFilters || [])); }

const DEFAULT_SITE_SETTINGS = {
    premiumPrices: { vitrin: 5, font: 2, urgent: 3, stats: 4, extend: 3, multicity: 6, verified: 8 },
    bumpPrice: 2,
    maxPhotos: 15,
    maxVideoSeconds: 30,
    defaultAdDays: 30,
    extendedAdDays: 60,
    whatsappNumber: '+38970000000',
    viberNumber: '+38970000000',
    adRequiresApproval: true
};

function getSiteSettings() {
    const stored = localStorage.getItem('alsat_site_settings');
    if (!stored) return { ...DEFAULT_SITE_SETTINGS, premiumPrices: { ...DEFAULT_SITE_SETTINGS.premiumPrices } };
    const parsed = JSON.parse(stored);
    return {
        premiumPrices: { ...DEFAULT_SITE_SETTINGS.premiumPrices, ...(parsed.premiumPrices || {}) },
        bumpPrice: parsed.bumpPrice ?? DEFAULT_SITE_SETTINGS.bumpPrice,
        whatsappNumber: parsed.whatsappNumber ?? DEFAULT_SITE_SETTINGS.whatsappNumber,
        viberNumber: parsed.viberNumber ?? DEFAULT_SITE_SETTINGS.viberNumber,
        adRequiresApproval: parsed.adRequiresApproval ?? DEFAULT_SITE_SETTINGS.adRequiresApproval,
        maxPhotos: parsed.maxPhotos ?? DEFAULT_SITE_SETTINGS.maxPhotos,
        maxVideoSeconds: parsed.maxVideoSeconds ?? DEFAULT_SITE_SETTINGS.maxVideoSeconds,
        defaultAdDays: parsed.defaultAdDays ?? DEFAULT_SITE_SETTINGS.defaultAdDays,
        extendedAdDays: parsed.extendedAdDays ?? DEFAULT_SITE_SETTINGS.extendedAdDays
    };
}

function saveSiteSettings(s) {
    localStorage.setItem('alsat_site_settings', JSON.stringify(s));
}

// Kullanıcı veritabanı - tüm kullanıcılar
function loadUsersDatabase() {
    const stored = localStorage.getItem('alsat_users');
    window.usersDatabase = stored ? JSON.parse(stored) : {};
}

function saveUsersDatabase() {
    localStorage.setItem('alsat_users', JSON.stringify(window.usersDatabase || {}));
}

function getAllUserIds() {
    const ids = new Set();
    (window.adsDatabase || []).forEach(a => { if (a.userId != null) ids.add(Number(a.userId)); });
    (window.reportsDatabase || []).forEach(r => { if (r.reporterId != null) ids.add(Number(r.reporterId)); });
    Object.values(window.conversations || {}).forEach(c => { if (c?.buyerId) ids.add(Number(c.buyerId)); if (c?.sellerId) ids.add(Number(c.sellerId)); });
    (window.priceAlerts || []).forEach(function(a) { if (a?.userId) ids.add(Number(a.userId)); });
    Object.keys(window.userCredits || {}).forEach(id => ids.add(Number(id)));
    Object.keys(window.userVerifiedUntil || {}).forEach(id => ids.add(Number(id)));
    Object.keys(window.usersDatabase || {}).forEach(id => ids.add(Number(id)));
    const cur = getCurrentUser();
    if (cur && cur.id) ids.add(Number(cur.id));
    return [...ids];
}

function getOrCreateUser(id, email, name) {
    if (!window.usersDatabase) loadUsersDatabase();
    const uid = Number(id);
    if (window.usersDatabase[uid]) return window.usersDatabase[uid];
    const u = { id: uid, email: email || '', name: name || 'Kullanıcı', phone: '', address: '', bio: '', banned: false, createdAt: new Date().toISOString() };
    window.usersDatabase[uid] = u;
    saveUsersDatabase();
    return u;
}

// Admin panel - sadece bu e-posta ile giriş yapan erişebilir (site sahibi kendi e-postasını yazar)
const ADMIN_EMAIL = 'bayarburak87@gmail.com';
function isAdmin() {
    const u = getCurrentUser();
    return u && (u.email || '').toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

// Makedonya Şehir ve İlçeleri (32 şehir)
const lokasyonlar = {
    "": [],
    "Tüm Makedonya": [],
    "Üsküp": ["Merkez", "Aerodrom", "Çayır", "Gazi Baba", "Butel", "Saraj", "Karpoş", "Görçe Petrov", "Şuto Orizari", "Kisela Voda"],
    "Gostivar": ["Merkez"],
    "Kalkandelen": ["Merkez"],
    "Manastır": ["Merkez"],
    "Ohri": ["Merkez"],
    "Bitola": ["Merkez"],
    "Pirlepe": ["Merkez"],
    "Struga": ["Merkez"],
    "Kumanova": ["Merkez"],
    "Köprülü": ["Merkez"],
    "Iştip": ["Merkez"],
    "Ustrumca": ["Merkez"],
    "Kavadar": ["Merkez"],
    "Koçana": ["Merkez"],
    "Karçova": ["Merkez"],
    "Gevgelli": ["Merkez"],
    "Radoviş": ["Merkez"],
    "Eğri Dere": ["Merkez"],
    "Delcevo": ["Merkez"],
    "Debre": ["Merkez"],
    "Berovo": ["Merkez"],
    "Resen": ["Merkez"],
    "Negotino": ["Merkez"],
    "Sveti Nikole": ["Merkez"],
    "Valandovo": ["Merkez"],
    "Kratovo": ["Merkez"],
    "Vinica": ["Merkez"],
    "Makedonski Brod": ["Merkez"],
    "Kruşevo": ["Merkez"],
    "Demir Hisar": ["Merkez"],
    "Kiçevo": ["Merkez"],
    "Bogdanci": ["Merkez"]
};

const sehirListesi = Object.keys(lokasyonlar).filter(k => k && k !== "Tüm Makedonya");

const cityCoords = { 'Üsküp': [41.9973, 21.4280], 'Bitola': [41.0311, 21.3400], 'Manastır': [41.0311, 21.3400], 'Ohri': [41.1172, 20.8019], 'Pirlepe': [41.3462, 21.5549], 'Struga': [41.1784, 20.6778], 'Kumanova': [42.1322, 21.7144], 'Gostivar': [41.7974, 20.9081], 'Kalkandelen': [42.0111, 20.9717], 'Iştip': [41.7458, 22.1958], 'Ustrumca': [41.1406, 22.5933], 'Kavadar': [41.4331, 22.0119], 'Köprülü': [41.5142, 21.0003], 'Berovo': [41.7072, 22.8503], 'Resen': [41.0893, 21.0122], 'Negotino': [41.4839, 22.0892], 'Kiçevo': [41.5125, 20.9592] };

// Kategori özel alanları (Vasıta, Emlak)
window.CATEGORY_ATTRS = {
    vehicle: { cats: ['Otomobil', 'Motosiklet', 'Kamyonet', 'Ticari Araç'],
        fields: [
            { key: 'brand', label: 'attrBrand', type: 'vehicleBrand' },
            { key: 'model', label: 'attrModel', type: 'vehicleModel', dataDepends: 'brand' },
            { key: 'year', label: 'attrYear', type: 'vehicleYear' },
            { key: 'km', label: 'attrKm', type: 'vehicleKm' },
            { key: 'fuel', label: 'attrFuel', type: 'select', options: ['Benzin', 'Dizel', 'LPG', 'Elektrik', 'Hibrit'] },
            { key: 'gearbox', label: 'attrGearbox', type: 'select', options: ['Manuel', 'Otomatik', 'Yarı Otomatik'] },
            { key: 'engineSize', label: 'attrEngineSize', type: 'vehicleEngine', dataDepends: 'brand,model' }
        ]
    },
    property: { cats: ['Satılık Daire', 'Kiralık Daire', 'Satılık Arsa', 'Kiralık Ev', 'Ofis', 'Dükkan', 'Depo'],
        fields: [
            { key: 'm2', label: 'attrM2', type: 'number', placeholder: '100' },
            { key: 'roomCount', label: 'attrRoomCount', type: 'select', options: ['1+0', '1+1', '2+1', '3+1', '4+1', '5+1', '6+'] },
            { key: 'buildingAge', label: 'attrBuildingAge', type: 'select', options: ['0-5', '5-10', '10-20', '20+'] },
            { key: 'floor', label: 'attrFloor', type: 'number', placeholder: '3' },
            { key: 'heating', label: 'attrHeating', type: 'select', options: ['Kombi', 'Merkezi', 'Soba', 'Klima', 'Yerden Isıtma'] },
            { key: 'furnished', label: 'attrFurnished', type: 'select', options: ['Eşyalı', 'Eşyasız', 'Yarı Eşyalı'] }
        ]
    }
};

// Detaylı Kategoriler (Ana + Alt)
window.CATEGORIES_TREE = [
    { id: 'all', icon: 'fa-border-all', labelKey: 'all', sub: [] },
    { id: 'Vasıta', icon: 'fa-car', labelKey: 'Vasıta', sub: ['Otomobil', 'Motosiklet', 'Kamyonet', 'Ticari Araç', 'Bisiklet', 'Yedek Parça', 'Aksesuar'] },
    { id: 'Emlak', icon: 'fa-house', labelKey: 'Emlak', sub: ['Satılık Daire', 'Kiralık Daire', 'Satılık Arsa', 'Kiralık Ev', 'Ofis', 'Dükkan', 'Depo'] },
    { id: 'Elektronik', icon: 'fa-laptop', labelKey: 'Elektronik', sub: ['Bilgisayar', 'Telefon', 'Tablet', 'TV', 'Oyun Konsolu', 'Kamera', 'Kulaklık', 'Saat'] },
    { id: 'Ev Eşyaları', icon: 'fa-couch', labelKey: 'Ev Eşyaları', sub: ['Mobilya', 'Beyaz Eşya', 'Mutfak', 'Aydınlatma', 'Dekorasyon', 'Bahçe'] },
    { id: 'Moda', icon: 'fa-shirt', labelKey: 'Moda', sub: ['Kadın Giyim', 'Erkek Giyim', 'Çocuk Giyim', 'Ayakkabı', 'Çanta', 'Aksesuar', 'Saat'] },
    { id: 'İş & Hizmetler', icon: 'fa-briefcase', labelKey: 'İş & Hizmetler', sub: ['İş İlanları', 'Hizmetler', 'Eğitim', 'Etkinlik', 'Freelance'] }
];

// ========== DÖVİZ KURLARI ==========
window.exchangeRates = { EUR: 1, MKD: 61.5, TRY: 35 };
function fetchExchangeRates() {
    fetch('https://api.frankfurter.app/latest?from=EUR&to=MKD,TRY').then(r => r.json()).then(data => {
        if (data.rates) {
            window.exchangeRates = { EUR: 1, MKD: data.rates.MKD || 61.5, TRY: data.rates.TRY || 35 };
            updateCurrencyDisplay();
            updateCurrencyConverter();
        }
    }).catch(() => {});
}
function priceToEur(amount, currency) {
    const r = window.exchangeRates || { EUR: 1, MKD: 61.5, TRY: 35 };
    if (!currency || currency === 'EUR') return amount;
    return amount / (r[currency] || 1);
}
function formatPrice(ad) {
    const cur = ad.currency || 'EUR';
    return (ad.price || 0).toLocaleString('tr-TR') + ' ' + cur;
}
function updateCurrencyDisplay() {
    const r = window.exchangeRates || { EUR: 1, MKD: 61.5, TRY: 35 };
    const elt = el('currency-display');
    if (elt) elt.textContent = '1 EUR = ' + (r.MKD || 61.5).toFixed(1) + ' MKD';
    const ratesDiv = el('currency-rates');
    if (ratesDiv) ratesDiv.innerHTML = '<div class="rate-line">1 EUR = ' + (r.MKD || 61.5).toFixed(2) + ' MKD</div><div class="rate-line">1 EUR = ' + (r.TRY || 35).toFixed(2) + ' TRY</div>';
    updateCurrencyConverter();
}
function updateCurrencyConverter() {
    const r = window.exchangeRates || { EUR: 1, MKD: 61.5, TRY: 35 };
    const amount = parseFloat(el('currency-amount')?.value) || 1;
    const from = el('currency-from')?.value || 'EUR';
    const to = el('currency-to')?.value || 'EUR';
    const rateFrom = r[from] || 1;
    const rateTo = r[to] || 1;
    const eurVal = amount / rateFrom;
    const result = eurVal * rateTo;
    const resEl = el('currency-result');
    if (resEl) resEl.textContent = result.toFixed(2);
}
function initCurrencyWidget() {
    const w = el('currency-widget');
    const dd = el('currency-dropdown');
    if (!w || !dd) return;
    updateCurrencyDisplay();
    updateCurrencyConverter();
    w.addEventListener('click', function(e) {
        e.stopPropagation();
        dd.classList.toggle('open');
    });
    document.addEventListener('click', function() { dd?.classList.remove('open'); });
    el('currency-amount')?.addEventListener('input', updateCurrencyConverter);
    el('currency-amount')?.addEventListener('change', updateCurrencyConverter);
    el('currency-from')?.addEventListener('change', updateCurrencyConverter);
    el('currency-to')?.addEventListener('change', updateCurrencyConverter);
}
window.openSupportModal = function() { el('support-modal').style.display = 'flex'; el('support-modal')?.classList.add('active'); };
window.closeSupportModal = function() { el('support-modal').style.display = 'none'; el('support-modal')?.classList.remove('active'); };

// ========== HELPERS ==========
const el = (id) => document.getElementById(id);
const qsa = (sel) => document.querySelectorAll(sel);

function saveAdsDatabase() { localStorage.setItem('adsDatabase', JSON.stringify(window.adsDatabase)); }
function saveFavorites() { localStorage.setItem('favorites', JSON.stringify(window.favorites)); }
function saveCredits() { localStorage.setItem('userCredits', JSON.stringify(window.userCredits)); }
function saveVerified() { localStorage.setItem('alsat_verified', JSON.stringify(window.userVerifiedUntil)); }
function saveConversations() { localStorage.setItem('conversations', JSON.stringify(window.conversations)); }
function updateMsgBadge() {
    const user = getCurrentUser();
    const badge = el('msg-badge');
    if (!user || !badge) return;
    const unread = (window.notifications || []).filter(n => n.userId === user.id && !n.read && n.type === 'message').length;
    badge.textContent = unread > 0 ? String(unread) : '';
    badge.style.display = unread > 0 ? 'inline' : 'none';
}
function updateNotifBadge() {
    const user = getCurrentUser();
    const badge = el('notif-badge');
    if (!user || !badge) return;
    const unread = (window.notifications || []).filter(n => n.userId === user.id && !n.read).length;
    badge.textContent = unread > 0 ? String(unread) : '';
    badge.style.display = unread > 0 ? 'inline' : 'none';
}
window.toggleNotifDropdown = function() {
    const dd = el('notif-dropdown');
    if (!dd) return;
    if (dd.style.display === 'block') { dd.style.display = 'none'; return; }
    dd.style.display = 'block';
    renderNotifList();
    document.addEventListener('click', function closeNotif(e) {
        if (!e.target.closest('#notif-container')) { dd.style.display = 'none'; document.removeEventListener('click', closeNotif); }
    });
};
function renderNotifList() {
    const list = el('notif-list');
    const user = getCurrentUser();
    if (!list || !user) return;
    const items = (window.notifications || []).filter(n => n.userId === user.id).slice(-20).reverse();
    if (items.length === 0) { list.innerHTML = '<p class="empty-state" style="padding:20px;color:var(--text-muted);">Bildirim yok</p>'; return; }
    list.innerHTML = items.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n.id}" onclick="markNotifRead(${n.id});${n.type==='message' && n.data?.convKey ? 'window.openMessagingModal(\''+n.data.convKey+'\');' : ''}">
            <strong>${escapeHtml(n.title)}</strong>
            <p>${escapeHtml(n.body)}</p>
        </div>
    `).join('');
}
window.markNotifRead = function(id) {
    const n = (window.notifications || []).find(x => x.id === id);
    if (n) { n.read = true; saveNotifications(); updateNotifBadge(); updateMsgBadge(); renderNotifList(); }
};
function saveNotifications() { localStorage.setItem('alsat_notifications_list', JSON.stringify(window.notifications)); }

// ========== TOAST ==========
function showToast(messageOrKey, type = 'success', duration = 3000) {
    const message = (typeof messageOrKey === 'string' && window.TRANSLATIONS?.[window.currentLang]?.toast?.[messageOrKey]) ? window.TRANSLATIONS[window.currentLang].toast[messageOrKey] : messageOrKey;
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
}

// ========== USER SESSION ==========
function getCurrentUser() {
    const u = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!u) return null;
    const db = window.usersDatabase || {};
    const udb = db[u.id];
    if (udb && udb.banned) return null;
    return u;
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.userSession.user = user;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.userSession.user = null;
    updateHeaderUI();
    hideProfileDropdown();
    showToast('logout', 'info', 2000);
}

// ========== HEADER UI ==========
function updateHeaderUI() {
    const user = getCurrentUser();
    const loginBtn = el('login-button');
    const profileBtn = el('profile-button');
    const logoutBtn = el('logout-button');
    const msgBtn = el('messages-button');
    const favBadge = el('fav-badge');
    var mobileLogin = el('mobile-action-login');
    var mobileProfile = el('mobile-action-profile');
    var mobileLogout = el('mobile-action-logout');
    var mobileMsg = el('mobile-action-messages');
    var mobileNotif = el('mobile-action-notif');
    var mobileFavBadge = el('mobile-fav-badge');
    var mobileMsgBadge = el('mobile-msg-badge');
    var mobileNotifBadge = el('mobile-notif-badge');

    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileBtn) profileBtn.style.display = 'flex';
        if (logoutBtn) logoutBtn.style.display = 'flex';
        if (msgBtn) msgBtn.style.display = 'flex';
        const notifContainer = el('notif-container');
        if (notifContainer) notifContainer.style.display = 'block';
        if (favBadge) favBadge.textContent = String(window.favorites.length);
        if (mobileLogin) mobileLogin.style.display = 'none';
        if (mobileProfile) mobileProfile.style.display = 'flex';
        if (mobileLogout) mobileLogout.style.display = 'flex';
        if (mobileMsg) mobileMsg.style.display = 'flex';
        if (mobileNotif) mobileNotif.style.display = 'flex';
        if (mobileFavBadge) { mobileFavBadge.textContent = String(window.favorites.length); mobileFavBadge.style.display = ''; }
        updateMsgBadge();
        updateNotifBadge();
        var hMsg = el('msg-badge');
        if (mobileMsgBadge && hMsg) { mobileMsgBadge.textContent = hMsg.textContent || '0'; mobileMsgBadge.style.display = (hMsg.textContent && parseInt(hMsg.textContent, 10) > 0) ? '' : 'none'; }
        var hNotif = el('notif-badge');
        if (mobileNotifBadge && hNotif) { mobileNotifBadge.textContent = hNotif.textContent || '0'; mobileNotifBadge.style.display = (hNotif.textContent && parseInt(hNotif.textContent, 10) > 0) ? '' : 'none'; }
    } else {
        if (loginBtn) loginBtn.style.display = 'flex';
        if (profileBtn) profileBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (msgBtn) msgBtn.style.display = 'none';
        const notifContainer = el('notif-container');
        if (notifContainer) notifContainer.style.display = 'none';
        if (favBadge) favBadge.textContent = '0';
        if (mobileLogin) mobileLogin.style.display = 'flex';
        if (mobileProfile) mobileProfile.style.display = 'none';
        if (mobileLogout) mobileLogout.style.display = 'none';
        if (mobileMsg) mobileMsg.style.display = 'none';
        if (mobileNotif) mobileNotif.style.display = 'none';
        if (mobileFavBadge) mobileFavBadge.textContent = '0';
        if (mobileMsgBadge) mobileMsgBadge.style.display = 'none';
        if (mobileNotifBadge) mobileNotifBadge.style.display = 'none';
    }
}

// ========== PROFILE DROPDOWN ==========
function showProfileDropdown() {
    const user = getCurrentUser();
    if (!user) return;
    const menu = el('user-profile-menu');
    if (menu) {
        el('profile-dropdown-name').textContent = user.name || t('user');
        el('profile-dropdown-email').textContent = user.email || '';
        const adminLink = el('admin-link');
        if (adminLink) adminLink.style.display = isAdmin() ? 'flex' : 'none';
        menu.style.display = 'block';
    }
}

function hideProfileDropdown() {
    const menu = el('user-profile-menu');
    if (menu) menu.style.display = 'none';
}

// ========== ADMIN PANEL ==========
window.openAdminPage = function() {
    if (!isAdmin()) return;
    hideProfileDropdown();
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    el('admin-page').style.display = 'block';
    qsa('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    qsa('.admin-tab-pane').forEach(p => p.classList.remove('active'));
    el('admin-tab-stats')?.classList.add('active');
    qsa('.admin-tab-btn[data-admin-tab="stats"]').forEach(b => b.classList.add('active'));
    initAdminTabs();
    updateAdminStats();
    renderAdminAds();
};

function ensureUsersFromData() {
    const ids = getAllUserIds();
    const ads = window.adsDatabase || [];
    if (!window.usersDatabase) loadUsersDatabase();
    ids.forEach(uid => {
        if (!window.usersDatabase[uid]) {
            const ad = ads.find(a => Number(a.userId) === Number(uid));
            getOrCreateUser(uid, ad?.seller ? 'u' + uid + '@alsat.mk' : '', ad?.seller || 'Kullanıcı ' + uid);
        }
    });
}

function renderAdminReports() {
    if (!isAdmin()) return;
    const list = el('admin-reports-list');
    if (!list) return;
    const reports = (window.reportsDatabase || []).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    const reasonTxt = r => ({ spam: 'Spam', fake: 'Sahte', illegal: 'Yasadışı', other: 'Diğer' }[r] || r);
    if (reports.length === 0) {
        list.innerHTML = '<p class="admin-empty">Şikayet bulunamadı</p>';
        return;
    }
    list.innerHTML = reports.map(r => {
        const ad = window.adsDatabase?.find(a => a.id === r.adId);
        const statusClass = r.status === 'resolved' ? 'report-resolved' : '';
        return `<div class="admin-report-row ${statusClass}" data-id="${r.id}">
            <div class="admin-report-info">
                <strong>${escapeHtml(r.adTitle || 'İlan silinmiş')}</strong>
                <span>Şikayet: ${reasonTxt(r.reason)} · ${r.reporterName || 'Anonim'} · ${new Date(r.createdAt).toLocaleDateString('tr-TR')}</span>
                ${r.note ? `<p class="report-note">${escapeHtml(r.note)}</p>` : ''}
            </div>
            <div class="admin-report-actions">
                ${ad ? `<button class="admin-btn-small" onclick="window.ilanDetayAc(${ad.id}); return false;"><i class="fa-solid fa-eye"></i></button>` : ''}
                ${r.status !== 'resolved' ? `
                    <button class="admin-btn-small" onclick="adminResolveReport('${r.id}'); return false;"><i class="fa-solid fa-check"></i> Çözüldü</button>
                    ${ad ? `<button class="admin-btn-small" style="color:var(--danger,#dc3545)" onclick="adminDeleteAd(${ad.id}); adminResolveReport('${r.id}'); return false;"><i class="fa-solid fa-trash"></i> İlanı Sil</button>` : ''}
                ` : '<span class="badge-resolved">Çözüldü</span>'}
            </div>
        </div>`;
    }).join('');
}

function adminResolveReport(reportId) {
    if (!isAdmin()) return;
    const r = (window.reportsDatabase || []).find(x => String(x.id) === String(reportId));
    if (r) { r.status = 'resolved'; saveReports(); renderAdminReports(); renderAdminAnalytics(); showToast('saved', 'success', 2000); }
}

function renderAdminAnalytics() {
    if (!isAdmin()) return;
    const ads = window.adsDatabase || [];
    const now = new Date();
    const since7d = new Date(now); since7d.setDate(since7d.getDate() - 7);
    const ads7d = ads.filter(a => new Date(a.createdAt) >= since7d).length;
    const totalViews = ads.reduce((s, a) => s + (a.views || 0), 0);
    const totalClicks = ads.reduce((s, a) => s + (a.clicks || 0), 0);
    const pendingReports = (window.reportsDatabase || []).filter(r => r.status !== 'resolved').length;
    const set = (id, v) => { const e = el(id); if (e) e.textContent = v; };
    set('analytics-ads-7d', ads7d);
    set('analytics-total-views', totalViews);
    set('analytics-total-clicks', totalClicks);
    set('analytics-pending-reports', pendingReports);
    const byCat = {};
    ads.forEach(a => {
        const c = a.subCategory || a.category || 'Diğer';
        byCat[c] = (byCat[c] || 0) + 1;
    });
    const catList = el('analytics-by-category');
    if (catList) catList.innerHTML = Object.entries(byCat).sort((a,b)=>b[1]-a[1]).slice(0,15).map(([k,v])=>`<div class="analytics-row"><span>${k}</span><strong>${v}</strong></div>`).join('');
    const byCity = {};
    ads.forEach(a => {
        const c = a.city || (a.cities && a.cities[0]) || 'Belirsiz';
        byCity[c] = (byCity[c] || 0) + 1;
    });
    const cityList = el('analytics-by-city');
    if (cityList) cityList.innerHTML = Object.entries(byCity).sort((a,b)=>b[1]-a[1]).slice(0,15).map(([k,v])=>`<div class="analytics-row"><span>${tCity(k) || k}</span><strong>${v}</strong></div>`).join('');
}

function updateAdminStats() {
    ensureUsersFromData();
    const ads = window.adsDatabase || [];
    const users = Object.keys(window.usersDatabase || {}).length || new Set(getAllUserIds()).size;
    const cats = new Set(ads.map(a => a.category || a.subCategory).filter(Boolean));
    const cities = new Set(ads.map(a => a.city || (a.cities && a.cities[0])).filter(Boolean));
    const totalCredits = Object.values(window.userCredits || {}).reduce((s, c) => s + (c || 0), 0);
    const na = el('admin-total-ads'); if (na) na.textContent = ads.length;
    const nu = el('admin-total-users'); if (nu) nu.textContent = users;
    const nc = el('admin-total-cat'); if (nc) nc.textContent = cats.size;
    const nci = el('admin-total-city'); if (nci) nci.textContent = cities.size;
    const ncr = el('admin-total-credits'); if (ncr) ncr.textContent = totalCredits + ' EUR';
    const pending = (window.adsDatabase || []).filter(a => (a.status || '') === 'pending').length;
    const badge = el('admin-pending-badge'); if (badge) badge.textContent = pending;
}

function renderAdminPending() {
    if (!isAdmin()) return;
    const list = el('admin-pending-list');
    if (!list) return;
    const pending = (window.adsDatabase || []).filter(a => (a.status || '') === 'pending').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (pending.length === 0) {
        list.innerHTML = '<p class="admin-empty">Bekleyen ilan yok</p>';
        return;
    }
    list.innerHTML = pending.map(ad => {
        const img = (ad.images && ad.images[0]) || ad.image;
        return `<div class="admin-ad-row" data-id="${ad.id}">
            <img src="${img}" alt="">
            <div class="admin-ad-info">
                <strong>${escapeHtml(ad.title)}</strong>
                <span>${formatPrice(ad)} · ${tCity(ad.city)} · ${ad.seller || 'Anonim'}</span>
            </div>
            <div style="display:flex;gap:8px;">
                <button class="admin-btn" onclick="window.adminApproveAd(${ad.id})"><i class="fa-solid fa-check"></i> Onayla</button>
                <button class="admin-btn" style="background:#dc3545;" onclick="window.openAdminRejectModal(${ad.id})"><i class="fa-solid fa-times"></i> Reddet</button>
            </div>
        </div>`;
    }).join('');
}

function getApproveMessage(ad) {
    const loc = [tCity(ad.city), ad.district ? tDistrict(ad.district) : ''].filter(Boolean).join(', ');
    return `Hello, I'm writing from Alsat.com.mk. You have listed "${ad.title}" for ${formatPrice(ad)} in ${loc}. Is that correct?`;
}

window.adminApproveAd = function(adId) {
    if (!isAdmin()) return;
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (!ad || (ad.status || '') !== 'pending') return;
    ad.status = 'approved';
    saveAdsDatabase();
    if (ad.userId) addNotification(ad.userId, 'ad_approved', 'İlan onaylandı', '"' + ad.title + '" ilanınız yayına alındı.', { adId });
    updateAdminStats();
    renderAdminPending();
    applyFilters();
    const msg = getApproveMessage(ad);
    const ss = getSiteSettings();
    const waNum = (ss.whatsappNumber || '+38970000000').replace(/\D/g, '');
    const phone = (ad.phone || '').replace(/\D/g, '');
    const targetNum = phone || waNum;
    window.openAdminApproveModal(ad, msg);
};

window.openAdminRejectModal = function(adId) {
    el('adm-reject-ad-id').value = adId;
    el('adm-reject-reason').value = '';
    el('admin-reject-modal').style.display = 'flex';
};

window.closeAdminRejectModal = function() {
    el('admin-reject-modal').style.display = 'none';
};

window.openAdminApproveModal = function(ad, message) {
    const m = el('adm-approve-message');
    if (m) m.value = message || (ad ? getApproveMessage(ad) : '');
    const msg = m?.value || '';
    const ss = getSiteSettings();
    const num = (ad?.phone || '').replace(/\D/g, '') || ss.whatsappNumber.replace(/\D/g, '');
    const text = encodeURIComponent(msg);
    const waLink = el('adm-whatsapp-link');
    const vbLink = el('adm-viber-link');
    if (waLink) waLink.href = 'https://wa.me/' + num + '?text=' + text;
    if (vbLink) vbLink.href = 'viber://chat?number=' + num;
    el('adm-approve-confirm').onclick = () => { window.closeAdminApproveModal(); };
    el('admin-approve-modal').style.display = 'flex';
};

window.closeAdminApproveModal = function() {
    el('admin-approve-modal').style.display = 'none';
};

function renderAdminAds() {
    const list = el('admin-ads-list');
    const search = (el('admin-search-ads')?.value || '').toLowerCase();
    let ads = [...(window.adsDatabase || [])].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (search) ads = ads.filter(a => (a.title + ' ' + (a.description||'')).toLowerCase().includes(search));
    if (!list) return;
    if (ads.length === 0) {
        list.innerHTML = '<p class="admin-empty">İlan bulunamadı</p>';
        return;
    }
    const bulkDel = el('admin-bulk-delete');
    const selectAll = el('admin-select-all-ads');
    list.innerHTML = ads.slice(0, 100).map(ad => {
        const img = (ad.images && ad.images[0]) || ad.image;
        return `<div class="admin-ad-row" data-id="${ad.id}">
            <label class="admin-ad-check"><input type="checkbox" class="admin-ad-cb" data-id="${ad.id}"></label>
            <img src="${img}" alt="">
            <div class="admin-ad-info">
                <strong>${ad.title}</strong>
                <span>${formatPrice(ad)} · ${tCity(ad.city)} · ${ad.seller || 'Anonim'}</span>
            </div>
            <button class="admin-delete-btn" onclick="adminDeleteAd(${ad.id})"><i class="fa-solid fa-trash"></i></button>
        </div>`;
    }).join('');
    const updateBulk = () => {
        const checked = list.querySelectorAll('.admin-ad-cb:checked');
        const n = checked.length;
        if (bulkDel) { bulkDel.style.display = n ? 'inline-flex' : 'none'; bulkDel.onclick = () => adminBulkDeleteAds(); }
        const cnt = el('admin-selected-count'); if (cnt) cnt.textContent = n;
        if (selectAll) selectAll.checked = n > 0 && n === list.querySelectorAll('.admin-ad-cb').length;
    };
    list.addEventListener('change', function(e) {
        if (e.target.classList.contains('admin-ad-cb')) updateBulk();
    });
    if (selectAll) selectAll.addEventListener('change', function() {
        list.querySelectorAll('.admin-ad-cb').forEach(cb => { cb.checked = this.checked; });
        updateBulk();
    });
    updateBulk();
}

function adminBulkDeleteAds() {
    if (!isAdmin()) return;
    const ids = [...document.querySelectorAll('.admin-ad-cb:checked')].map(cb => parseInt(cb.dataset.id)).filter(Boolean);
    if (ids.length === 0) return;
    if (!confirm(ids.length + ' ilan silinecek. Devam?')) return;
    ids.forEach(id => {
        const ad = window.adsDatabase.find(a => a.id === id);
        if (ad?.userId) addNotification(ad.userId, 'ad_deleted', 'İlan silindi', '"' + ad.title + '" ilanınız yönetici tarafından kaldırıldı.', { adId: id });
        window.adsDatabase = window.adsDatabase.filter(a => a.id !== id);
    });
    saveAdsDatabase();
    window.favorites = (window.favorites || []).filter(id => !ids.includes(id));
    saveFavorites();
    renderAdminAds();
    applyFilters();
    updateAdminStats();
    showToast('adDeleted', 'info', 2000);
}

let adminTabsInited = false;
function initAdminTabs() {
    if (adminTabsInited) return;
    adminTabsInited = true;
    qsa('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.adminTab;
            qsa('.admin-tab-btn').forEach(b => b.classList.remove('active'));
            qsa('.admin-tab-pane').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const pane = el('admin-tab-' + tab);
            if (pane) pane.classList.add('active');
            if (tab === 'users') renderAdminUsers();
            if (tab === 'settings') loadAdminSettings();
            if (tab === 'analytics') renderAdminAnalytics();
            if (tab === 'reports') renderAdminReports();
            if (tab === 'pending') renderAdminPending();
        });
    });
    // Event delegation - kalıcı listener (dinamik butonlar için)
    const usersList = el('admin-users-list');
    if (usersList) {
        usersList.addEventListener('click', function(e) {
            const btn = e.target.closest('.admin-edit-btn');
            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                const rawId = (btn.getAttribute('data-user-id') || '').trim();
                if (rawId) openAdminUserModal(rawId);
            }
        });
    }
}

function renderAdminUsers() {
    const list = el('admin-users-list');
    const search = (el('admin-search-users')?.value || '').toLowerCase();
    ensureUsersFromData();
    let users = Object.values(window.usersDatabase || {}).map(u => ({
        ...u,
        credit: window.userCredits?.[u.id] || 0,
        verifiedUntil: window.userVerifiedUntil?.[u.id] || ''
    }));
    if (search) users = users.filter(u => (u.name + ' ' + u.email).toLowerCase().includes(search));
    users.sort((a,b) => (b.id || 0) - (a.id || 0));
    if (!list) return;
    if (users.length === 0) { list.innerHTML = '<p class="admin-empty">Kullanıcı bulunamadı</p>'; return; }
    list.innerHTML = users.map(u => `
        <div class="admin-user-row">
            <div class="admin-user-info">
                <strong>${escapeHtml(u.name || 'İsimsiz')}</strong>
                <span>${escapeHtml(u.email || '-')} · ID: ${u.id}</span>
                <span>Kredi: ${u.credit} EUR ${u.verifiedUntil ? '· Onaylı: ' + u.verifiedUntil : ''} ${u.banned ? '· <span class="badge-banned">ENGELLİ</span>' : ''}</span>
            </div>
            <button type="button" class="admin-edit-btn" data-user-id="${u.id}"><i class="fa-solid fa-pen"></i></button>
        </div>
    `).join('');
}

window.openAdminUserModal = function(userId) {
    ensureUsersFromData();
    loadUsersDatabase();
    if (userId == null || userId === '') return;
    var uidNum = typeof userId === 'number' ? userId : parseInt(String(userId).replace(/^user\s+/i, ''), 10);
    if (isNaN(uidNum)) uidNum = null;
    const db = window.usersDatabase || {};
    var u = db[uidNum] ?? db[String(uidNum)] ?? db[userId] ?? db[String(userId)];
    if (!u) u = Object.values(db).find(function(x) { var xid = x && (x.id || x.userId); return xid == userId || xid == uidNum || String(xid) === String(userId) || Number(xid) === uidNum; });
    if (!u) { showToast('Kullanıcı bulunamadı', 'warning', 2000); return; }
    const modal = el('admin-user-modal');
    if (!modal) return;
    document.body.appendChild(modal);
    var saveId = typeof u.id === 'number' && !isNaN(u.id) ? u.id : parseInt(String(u.id || '').replace(/^user\s+/i, ''), 10);
    if (isNaN(saveId)) saveId = uidNum;
    el('adm-edit-user-id').value = String(saveId != null && !isNaN(saveId) ? saveId : userId);
    el('adm-edit-name').value = u.name || '';
    el('adm-edit-email').value = u.email || '';
    var editId = u.id != null ? u.id : (uidNum || userId);
    el('adm-edit-credit').value = window.userCredits?.[editId] ?? window.userCredits?.[String(editId)] ?? 0;
    el('adm-edit-verified').value = window.userVerifiedUntil?.[editId] ?? window.userVerifiedUntil?.[String(editId)] ?? '';
    el('adm-edit-banned').checked = !!u.banned;
    const phoneInput = el('adm-edit-phone');
    if (phoneInput) phoneInput.value = u.phone || '';
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modal.style.zIndex = '99999';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.adminAdjustCredit = function(delta) {
    const inp = el('adm-edit-credit');
    if (!inp) return;
    const cur = parseInt(inp.value) || 0;
    inp.value = Math.max(0, cur + delta);
};

window.closeAdminUserModal = function() {
    const modal = el('admin-user-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
    document.body.style.overflow = '';
};

function loadAdminSettings() {
    const s = getSiteSettings();
    el('adm-price-vitrin').value = s.premiumPrices.vitrin;
    el('adm-price-font').value = s.premiumPrices.font;
    el('adm-price-urgent').value = s.premiumPrices.urgent;
    el('adm-price-stats').value = s.premiumPrices.stats;
    el('adm-price-extend').value = s.premiumPrices.extend;
    el('adm-price-multicity').value = s.premiumPrices.multicity;
    el('adm-price-verified').value = s.premiumPrices.verified;
    el('adm-price-bump').value = s.bumpPrice;
    el('adm-max-photos').value = s.maxPhotos;
    el('adm-max-video').value = s.maxVideoSeconds;
    el('adm-default-days').value = s.defaultAdDays;
    el('adm-extended-days').value = s.extendedAdDays;
    const wa = el('adm-whatsapp'); if (wa) wa.value = s.whatsappNumber || '';
    const vb = el('adm-viber'); if (vb) vb.value = s.viberNumber || '';
    const ar = el('adm-ad-requires-approval'); if (ar) ar.checked = s.adRequiresApproval !== false;
}

window.adminDeleteAd = function(id) {
    if (!isAdmin()) return;
    if (!confirm('Bu ilanı silmek istediğinize emin misiniz?')) return;
    const idx = window.adsDatabase.findIndex(a => a.id === id);
    if (idx >= 0) {
        const ad = window.adsDatabase[idx];
        const ownerId = ad.userId;
        window.adsDatabase.splice(idx, 1);
        const favIdx = window.favorites.indexOf(id);
        if (favIdx >= 0) { window.favorites.splice(favIdx, 1); saveFavorites(); }
        if (ownerId) addNotification(ownerId, 'ad_deleted', 'İlan silindi', '"' + ad.title + '" ilanınız yönetici tarafından kaldırıldı.', { adId: id });
        saveAdsDatabase();
        updateAdminStats();
        renderAdminAds();
        applyFilters();
        updateHeaderUI();
        showToast('adDeleted', 'info', 2000);
    }
};

// ========== LOKASYON SELECT ==========
function initLocationSelects() {
    const sehirSelect = el('sehir-select');
    const ilceSelect = el('ilce-select');
    if (!sehirSelect || !ilceSelect) return;

    sehirSelect.innerHTML = '<option value="">' + t('allMacedonia') + '</option>';
    sehirListesi.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = tCity(city);
        sehirSelect.appendChild(opt);
    });

    sehirSelect.addEventListener('change', function() {
        const districts = lokasyonlar[this.value] || [];
        ilceSelect.innerHTML = '<option value="">' + t('districtSelect') + '</option>' + districts.map(d => `<option value="${d}">${tDistrict(d)}</option>`).join('');
    });
}

function initFormLocationSelects() {
    const formSehir = el('form-sehir-select');
    const formIlce = el('form-ilce-select');
    if (!formSehir || !formIlce) return;

    formSehir.innerHTML = '<option value="">' + t('selectCity') + '</option>' + sehirListesi.map(c => `<option value="${c}">${tCity(c)}</option>`).join('');
    formSehir.addEventListener('change', function() {
        const districts = lokasyonlar[this.value] || [];
        formIlce.innerHTML = districts.length ? '<option value="">' + t('districtSelect') + '</option>' + districts.map(d => `<option value="${d}">${tDistrict(d)}</option>`).join('') : '<option value="">' + t('selectCityFirst') + '</option>';
    });
}

// ========== KATEGORİ SIDEBAR (SOL) ==========
function initCategorySidebar() {
    const list = el('kategori-listesi');
    if (!list) return;
    const L = window.TRANSLATIONS?.[window.currentLang]?.categories || {};
    list.innerHTML = window.CATEGORIES_TREE.map(g => {
        const label = L[g.labelKey] || g.labelKey;
        const subHtml = (g.sub || []).map(s => `<div class="kat-alt-item" data-kat="${s}">${L[s] || s}</div>`).join('');
        return `<div class="kat-grup">
            <div class="kat-grup-baslik" data-kat="${g.id}"><i class="fa-solid ${g.icon}"></i> ${label}</div>
            ${subHtml ? `<div class="kat-alt-liste">${subHtml}</div>` : ''}
        </div>`;
    }).join('');
    list.querySelectorAll('.kat-grup-baslik, .kat-alt-item').forEach(elm => {
        elm.addEventListener('click', function() {
            list.querySelectorAll('.kat-grup-baslik, .kat-alt-item').forEach(x => x.classList.remove('aktif'));
            this.classList.add('aktif');
            const cat = this.dataset.kat;
            if (cat) window.filterByCategory(cat);
        });
    });
    var toggleBtn = el('kat-toggle-btn');
    var katSidebar = el('kat-sidebar');
    if (toggleBtn && katSidebar && !toggleBtn.hasAttribute('data-kat-toggle-bound')) {
        toggleBtn.setAttribute('data-kat-toggle-bound', '1');
        toggleBtn.addEventListener('click', function() {
            var isOpen = katSidebar.classList.toggle('kat-open');
            toggleBtn.setAttribute('aria-expanded', isOpen);
        });
        toggleBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleBtn.click(); }
        });
    }
}

// ========== KATEGORİ SELECT (FORM) ==========
function initCategorySelect() {
    const katSelect = el('form-kat-select');
    if (!katSelect) return;
    const L = window.TRANSLATIONS?.[window.currentLang]?.categories || {};
    let opts = '<option value="">' + (L.selectCategory || 'Kategori Seçin') + '</option>';
    window.CATEGORIES_TREE.filter(g => g.id !== 'all').forEach(g => {
        opts += `<optgroup label="${L[g.labelKey] || g.labelKey}">`;
        opts += `<option value="${g.id}">${L[g.labelKey] || g.labelKey} (Tümü)</option>`;
        (g.sub || []).forEach(s => { opts += `<option value="${s}">${L[s] || s}</option>`; });
        opts += '</optgroup>';
    });
    katSelect.innerHTML = opts;
    katSelect.addEventListener('change', renderCategoryExtraFields);
}

function getCategoryAttrsForSelect(catVal) {
    if (!catVal) return null;
    for (var k in window.CATEGORY_ATTRS || {}) {
        var cfg = window.CATEGORY_ATTRS[k];
        if (cfg.cats && cfg.cats.indexOf(catVal) >= 0) return cfg;
    }
    return null;
}

function renderCategoryExtraFields() {
    var container = el('category-extra-fields');
    if (!container) return;
    var catVal = el('form-kat-select')?.value || '';
    var cfg = getCategoryAttrsForSelect(catVal);
    if (!cfg || !cfg.fields || !cfg.fields.length) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }
    container.style.display = 'block';
    var vd = window.VEHICLE_DATA;
    var vData = vd ? vd.getDataForCategory(catVal) : null;
    var html = '<div class="attrs-grid">';
    cfg.fields.forEach(function(f) {
        var lbl = t(f.label) || f.label;
        if (f.type === 'select') {
            var opts = (f.options || []).map(function(o) { return '<option value="' + escapeHtml(o) + '">' + escapeHtml(o) + '</option>'; }).join('');
            html += '<div class="input-group"><label>' + escapeHtml(lbl) + '</label><select id="attr-' + f.key + '" class="attr-input" data-attr-key="' + f.key + '"><option value="">' + (t('select') || 'Seçin') + '</option>' + opts + '</select></div>';
        } else if (f.type === 'vehicleBrand' && vData) {
            var brandOpts = (vData.brands || []).map(function(b) { return '<option value="' + escapeHtml(b) + '">' + escapeHtml(b) + '</option>'; }).join('');
            html += '<div class="input-group"><label>' + escapeHtml(lbl) + '</label><select id="attr-' + f.key + '" class="attr-input attr-vehicle-brand" data-attr-key="' + f.key + '"><option value="">' + (t('select') || 'Seçin') + '</option>' + brandOpts + '</select></div>';
        } else if (f.type === 'vehicleModel' && vData) {
            html += '<div class="input-group"><label>' + escapeHtml(lbl) + '</label><select id="attr-' + f.key + '" class="attr-input attr-vehicle-model" data-attr-key="' + f.key + '" data-depends="brand"><option value="">' + (t('select') || 'Seçin') + '</option></select><input type="text" id="attr-model-other" class="attr-input attr-model-other" placeholder="' + (t('modelOtherPlaceholder') || 'Model adı yazın') + '" style="display:none;margin-top:6px;"></div>';
        } else if (f.type === 'vehicleYear' && vd) {
            var yearOpts = (vd.years || []).map(function(y) { return '<option value="' + y + '">' + y + '</option>'; }).join('');
            html += '<div class="input-group"><label>' + escapeHtml(lbl) + '</label><select id="attr-' + f.key + '" class="attr-input" data-attr-key="' + f.key + '"><option value="">' + (t('select') || 'Seçin') + '</option>' + yearOpts + '</select></div>';
        } else if (f.type === 'vehicleKm' && vd) {
            var kmOpts = (vd.kmRanges || []).map(function(k) { return '<option value="' + escapeHtml(k) + '">' + escapeHtml(k) + ' km</option>'; }).join('');
            html += '<div class="input-group"><label>' + escapeHtml(lbl) + '</label><select id="attr-' + f.key + '" class="attr-input" data-attr-key="' + f.key + '"><option value="">' + (t('select') || 'Seçin') + '</option>' + kmOpts + '</select></div>';
        } else if (f.type === 'vehicleEngine' && vd) {
            html += '<div class="input-group"><label>' + escapeHtml(lbl) + '</label><select id="attr-' + f.key + '" class="attr-input attr-vehicle-engine" data-attr-key="' + f.key + '" data-depends="brand,model"><option value="">' + (t('select') || 'Seçin') + '</option></select></div>';
        } else {
            var attrs = 'id="attr-' + f.key + '" class="attr-input" placeholder="' + escapeHtml(f.placeholder || '') + '"';
            if (f.type === 'number') attrs += ' type="number" min="' + (f.min || 0) + '" max="' + (f.max || 999999) + '"';
            else attrs += ' type="text"';
            html += '<div class="input-group"><label>' + escapeHtml(lbl) + '</label><input ' + attrs + ' data-attr-key="' + f.key + '"></div>';
        }
    });
    html += '</div>';
    container.innerHTML = html;
    bindVehicleAttrChangeHandlers(catVal);
}

function bindVehicleAttrChangeHandlers(catVal) {
    var brandSel = el('attr-brand');
    var modelSel = el('attr-model');
    var engineSel = el('attr-engineSize');
    var vd = window.VEHICLE_DATA;
    if (!vd) return;
    var vData = vd.getDataForCategory(catVal || el('form-kat-select')?.value || 'Otomobil');

    function updateModelSelect() {
        if (!modelSel) return;
        var brand = brandSel ? brandSel.value : '';
        modelSel.innerHTML = '<option value="">' + (t('select') || 'Seçin') + '</option>';
        if (brand) {
            var models = vData.getModels(brand);
            var otherLabel = t('other') || 'Diğer';
            models.forEach(function(m) { modelSel.innerHTML += '<option value="' + escapeHtml(m) + '">' + escapeHtml(m === vd.OTHER_MODEL ? otherLabel : m) + '</option>'; });
        }
        modelSel.value = '';
        updateEngineSelect();
        var o = el('attr-model-other');
        if (o) { o.value = ''; o.style.display = 'none'; }
    }

    function updateEngineSelect() {
        if (!engineSel) return;
        var brand = brandSel ? brandSel.value : '';
        var model = modelSel ? modelSel.value : '';
        engineSel.innerHTML = '<option value="">' + (t('select') || 'Seçin') + '</option>';
        if (brand && model) {
            var engines = vData.getEngines(brand, model);
            engines.forEach(function(e) { engineSel.innerHTML += '<option value="' + escapeHtml(e) + '">' + escapeHtml(e) + '</option>'; });
        }
        engineSel.value = '';
    }

    if (brandSel) brandSel.addEventListener('change', updateModelSelect);
    var otherInput = el('attr-model-other');
    if (modelSel) {
        modelSel.addEventListener('change', function() {
            updateEngineSelect();
            if (otherInput) otherInput.style.display = modelSel.value === vd.OTHER_MODEL ? 'block' : 'none';
        });
    }
}

function getCategoryAttrsFromForm() {
    var catVal = el('form-kat-select')?.value || '';
    var cfg = getCategoryAttrsForSelect(catVal);
    if (!cfg || !cfg.fields) return {};
    var attrs = {};
    var vd = window.VEHICLE_DATA;
    cfg.fields.forEach(function(f) {
        var inp = el('attr-' + f.key);
        if (!inp) return;
        var v = (inp.value || '').trim();
        if (f.key === 'model' && vd && v === vd.OTHER_MODEL) {
            var otherInp = el('attr-model-other');
            v = otherInp ? (otherInp.value || '').trim() : '';
        }
        if (v) attrs[f.key] = v;
    });
    return attrs;
}

function setCategoryAttrsToForm(attrs) {
    if (!attrs || typeof attrs !== 'object') return;
    var vd = window.VEHICLE_DATA;
    var vData = vd ? vd.getDataForCategory(el('form-kat-select')?.value || 'Otomobil') : null;
    var brand = attrs.brand, model = attrs.model, engineSize = attrs.engineSize;
    var brandSel = el('attr-brand'), modelSel = el('attr-model'), engineSel = el('attr-engineSize');
    if (vData && brandSel && brand) {
        brandSel.value = brand;
        if (modelSel) {
            var otherLabel = t('other') || 'Diğer';
            modelSel.innerHTML = '<option value="">' + (t('select') || 'Seçin') + '</option>';
            vData.getModels(brand).forEach(function(m) { modelSel.innerHTML += '<option value="' + escapeHtml(m) + '">' + escapeHtml(m === vd.OTHER_MODEL ? otherLabel : m) + '</option>'; });
            var modelInList = vData.models[brand] && vData.models[brand].indexOf(model) >= 0;
            if (modelInList) {
                modelSel.value = model;
            } else if (model) {
                modelSel.value = vd.OTHER_MODEL;
                var otherInp = el('attr-model-other');
                if (otherInp) { otherInp.value = model; otherInp.style.display = 'block'; }
            }
        }
if (engineSel && model) {
            engineSel.innerHTML = '<option value="">' + (t('select') || 'Seçin') + '</option>';
            vData.getEngines(brand, model).forEach(function(e) { engineSel.innerHTML += '<option value="' + escapeHtml(e) + '">' + escapeHtml(e) + '</option>'; });
            if (engineSize) engineSel.value = engineSize;
        }
    }

    for (var k in attrs) {
        var inp = el('attr-' + k);
        if (!inp) continue;
        if (vData && (k === 'model' || k === 'engineSize') && brand) continue;
        inp.value = attrs[k] || '';
    }
}

var ATTR_LABELS = { brand: 'attrBrand', model: 'attrModel', year: 'attrYear', km: 'attrKm', fuel: 'attrFuel', gearbox: 'attrGearbox', engineSize: 'attrEngineSize', m2: 'attrM2', roomCount: 'attrRoomCount', buildingAge: 'attrBuildingAge', floor: 'attrFloor', heating: 'attrHeating', furnished: 'attrFurnished' };
function getAttrsDisplayHtml(ad) {
    var attrs = ad.attrs || {};
    if (!attrs || Object.keys(attrs).length === 0) return '';
    var parts = [];
    for (var k in attrs) {
        var v = attrs[k];
        if (!v) continue;
        var lbl = ATTR_LABELS[k] ? t(ATTR_LABELS[k]) : k;
        parts.push('<span class="attr-chip"><strong>' + escapeHtml(lbl) + ':</strong> ' + escapeHtml(String(v)) + '</span>');
    }
    if (parts.length === 0) return '';
    return '<div class="detail-attrs"><h4 style="margin:12px 0 8px;">' + (t('adDetails') || 'İlan Detayları') + '</h4><div class="attr-chips">' + parts.join(' ') + '</div></div>';
}

// ========== FILTER & RENDER ADS ==========
window.filterByCategory = function (category) {
    const list = el('kategori-listesi');
    if (list) {
        list.querySelectorAll('.kat-grup-baslik, .kat-alt-item').forEach(el => {
            el.classList.toggle('aktif', el.dataset.kat === category);
        });
    }
    window.currentFilterCategory = category;
    applyFilters();
};

function getCurrentFilterState() {
    return {
        category: window.currentFilterCategory || document.querySelector('.kat-grup-baslik.aktif, .kat-alt-item.aktif')?.dataset?.kat || 'all',
        minPrice: el('minPrice')?.value || '',
        maxPrice: el('maxPrice')?.value || '',
        city: el('sehir-select')?.value || '',
        district: el('ilce-select')?.value || '',
        search: el('searchInput')?.value || '',
        sortBy: el('sort-select')?.value || 'newest',
        yeni: !!el('yeni')?.checked,
        ikinciEl: !!el('ikinci-el')?.checked,
        sahibinden: !!el('cb-sahibi')?.checked,
        galeri: !!el('cb-galeri')?.checked,
        advDate: el('adv-date')?.value || '',
        advWithPhoto: !!el('adv-with-photo')?.checked,
        advExactPhrase: !!el('adv-exact-phrase')?.checked
    };
}
function applyFilterState(s) {
    if (!s) return;
    window.currentFilterCategory = s.category || 'all';
    if (el('minPrice')) el('minPrice').value = s.minPrice ?? '';
    if (el('maxPrice')) el('maxPrice').value = s.maxPrice ?? '';
    if (el('sehir-select')) el('sehir-select').value = s.city ?? '';
    initLocationSelects();
    setTimeout(() => {
        if (el('ilce-select')) el('ilce-select').value = s.district ?? '';
    }, 100);
    if (el('searchInput')) el('searchInput').value = s.search ?? '';
    if (el('sort-select')) el('sort-select').value = s.sortBy ?? 'newest';
    if (el('yeni')) el('yeni').checked = !!s.yeni;
    if (el('ikinci-el')) el('ikinci-el').checked = !!s.ikinciEl;
    if (el('cb-sahibi')) el('cb-sahibi').checked = !!s.sahibinden;
    if (el('cb-galeri')) el('cb-galeri').checked = !!s.galeri;
    if (el('adv-date')) el('adv-date').value = s.advDate ?? '';
    if (el('adv-with-photo')) el('adv-with-photo').checked = !!s.advWithPhoto;
    if (el('adv-exact-phrase')) el('adv-exact-phrase').checked = !!s.advExactPhrase;
    document.querySelectorAll('.kat-grup-baslik, .kat-alt-item').forEach(x => x?.classList.remove('aktif'));
    const kat = document.querySelector(`[data-kat="${s.category}"]`);
    if (kat) kat.classList.add('aktif');
    applyFilters();
}
function openSaveFilterModal() {
    const name = prompt(t('saveFilterPrompt') || 'Filtre adı girin:', '');
    if (!name || !name.trim()) return;
    const state = getCurrentFilterState();
    window.savedFilters = window.savedFilters || [];
    window.savedFilters.push({ id: 'f' + Date.now(), name: name.trim(), state, createdAt: new Date().toISOString() });
    if (window.savedFilters.length > 10) window.savedFilters.shift();
    saveSavedFilters();
    renderSavedFiltersSelect();
    showToast('saved', 'success', 2000);
}
function renderSavedFiltersSelect() {
    const sel = el('saved-filters-select');
    if (!sel) return;
    const opts = (window.savedFilters || []).map(f => `<option value="${f.id}">${escapeHtml(f.name)}</option>`).join('');
    sel.innerHTML = '<option value="">' + (t('savedFilters') || 'Kayıtlı Filtreler') + '</option>' + opts;
}

function applyFilters() {
    const category = window.currentFilterCategory || document.querySelector('.kat-grup-baslik.aktif, .kat-alt-item.aktif')?.dataset?.kat || 'all';
    const minPrice = parseFloat(el('minPrice')?.value) || 0;
    const maxPrice = parseFloat(el('maxPrice')?.value) || Infinity;
    const city = el('sehir-select')?.value;
    const district = el('ilce-select')?.value;
    let searchTerm = (el('searchInput')?.value || '').trim();
    const advExactPhrase = el('adv-exact-phrase')?.checked;
    const sortBy = el('sort-select')?.value || 'newest';
    const filtYeni = el('yeni')?.checked;
    const filtIkinciEl = el('ikinci-el')?.checked;
    const filtSahibi = el('cb-sahibi')?.checked;
    const filtGaleri = el('cb-galeri')?.checked;

    let filtered = (window.adsDatabase || []).filter(ad => (ad.status || 'approved') === 'approved');
    if (category && category !== 'all') {
        const grp = window.CATEGORIES_TREE?.find(g => g.id === category);
        const matchCats = grp ? [grp.id, ...(grp.sub || [])] : [category];
        filtered = filtered.filter(ad => matchCats.includes(ad.category) || matchCats.includes(ad.subCategory));
    }
    filtered = filtered.filter(ad => {
        const priceEur = priceToEur(ad.price, ad.currency);
        return priceEur >= minPrice && (maxPrice === Infinity || priceEur <= maxPrice);
    });
    if (city) filtered = filtered.filter(ad => ad.city === city || (ad.cities && ad.cities.includes(city)));
    if (district) filtered = filtered.filter(ad => ad.district === district);
    if (searchTerm) {
        const txt = searchTerm.toLowerCase();
        if (advExactPhrase) {
            filtered = filtered.filter(ad => {
                const full = (ad.title + ' ' + (ad.description || '')).toLowerCase();
                return full.includes(txt);
            });
        } else {
            const terms = txt.split(/\s+/).filter(Boolean);
            filtered = filtered.filter(ad => {
                const full = (ad.title + ' ' + (ad.description || '')).toLowerCase();
                return terms.every(t => full.includes(t));
            });
        }
    }
    if (filtYeni || filtIkinciEl) {
        const condMatch = ad => {
            const c = (ad.condition || '').toLowerCase();
            const isNew = c.includes('sıfır') || c.includes('yeni') || ad.condition === '0';
            const isUsed = c.includes('ikinci') || c.includes('2.el');
            const noCond = !ad.condition || c === '';
            if (filtYeni && filtIkinciEl) return isNew || isUsed || noCond;
            if (filtYeni) return isNew || noCond;
            return isUsed || noCond;
        };
        filtered = filtered.filter(condMatch);
    }
    const advDate = parseInt(el('adv-date')?.value) || 0;
    if (advDate > 0) {
        const since = new Date(); since.setHours(since.getHours() - advDate);
        filtered = filtered.filter(ad => new Date(ad.createdAt) >= since);
    }
    if (el('adv-with-photo')?.checked) filtered = filtered.filter(ad => (ad.images && ad.images.length) || ad.image);
    if (window.bannerFeaturedOnly) filtered = filtered.filter(ad => ad.featured);
    if (filtSahibi || filtGaleri) {
        const sellerMatch = ad => {
            const s = (ad.sellerType || 'Sahibinden').toLowerCase();
            const isSahibi = s.includes('sahibinden') || !ad.sellerType;
            const isMagaza = s.includes('mağaza') || s.includes('galeri');
            if (filtSahibi && filtGaleri) return isSahibi || isMagaza;
            if (filtSahibi) return isSahibi;
            return isMagaza;
        };
        filtered = filtered.filter(sellerMatch);
    }

    filtered = filtered.filter(ad => {
        const expiry = ad.expiryAt ? new Date(ad.expiryAt) : null;
        if (expiry && expiry < new Date()) return false;
        if (!expiry && ad.durationDays) {
            const created = new Date(ad.createdAt);
            const exp = new Date(created); exp.setDate(exp.getDate() + (ad.durationDays || 30));
            if (exp < new Date()) return false;
        }
        return true;
    });
    if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => priceToEur(a.price, a.currency) - priceToEur(b.price, b.currency));
    else if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => priceToEur(b.price, b.currency) - priceToEur(a.price, a.currency));
    else if (sortBy === 'views') filtered = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0));
    else filtered = [...filtered].sort((a, b) => {
        const aFeat = a.featured ? 1 : 0;
        const bFeat = b.featured ? 1 : 0;
        if (aFeat !== bFeat) return bFeat - aFeat;
        const aBump = a.lastBumpAt ? new Date(a.lastBumpAt).getTime() : 0;
        const bBump = b.lastBumpAt ? new Date(b.lastBumpAt).getTime() : 0;
        if (aBump || bBump) return (bBump || new Date(b.createdAt).getTime()) - (aBump || new Date(a.createdAt).getTime());
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    window.filteredAdsCache = filtered;
    window.currentAdsPage = 1;
    renderRecentlyViewed();
    renderAds(filtered);
}

function renderRecentlyViewed() {
    const section = el('recently-viewed-section');
    const grid = el('recently-viewed-grid');
    if (!section || !grid) return;
    window.recentlyViewed = window.recentlyViewed || [];
    const ids = window.recentlyViewed.slice(0, 12);
    const now = new Date();
    const valid = ids.map(id => window.adsDatabase?.find(a => a.id === id)).filter(a => a && (!a.expiryAt || new Date(a.expiryAt) >= now));
    if (valid.length === 0) {
        section.style.display = 'none';
        return;
    }
    section.style.display = 'block';
    el('label-recently-viewed').textContent = t('recentlyViewed');
    grid.innerHTML = valid.map(ad => {
        const imgSrc = (ad.images && ad.images[0]) || ad.image;
        return `<div class="recent-ad-card" data-ad-id="${ad.id}">
            <img src="${imgSrc}" alt="" onclick="window.ilanDetayAc(${ad.id})">
            <div onclick="window.ilanDetayAc(${ad.id})" style="cursor:pointer;"><strong>${escapeHtml(ad.title)}</strong><span>${formatPrice(ad)}</span></div>
            <button type="button" class="recent-ad-remove" onclick="event.stopPropagation();window.removeFromRecentlyViewed(${ad.id});" title="Kaldır"><i class="fa-solid fa-xmark"></i></button>
        </div>`;
    }).join('');
    grid.style.display = 'grid';
    grid.querySelectorAll('.recent-ad-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.onclick = function(e) { if (!e.target.closest('.recent-ad-remove')) window.ilanDetayAc(parseInt(this.dataset.adId)); };
    });
}

window.removeFromRecentlyViewed = function(adId) {
    window.recentlyViewed = (window.recentlyViewed || []).filter(id => id !== adId);
    saveRecentlyViewed();
    renderRecentlyViewed();
};

window.clearRecentlyViewed = function() {
    window.recentlyViewed = [];
    saveRecentlyViewed();
    renderRecentlyViewed();
    showToast('saved', 'success', 1500);
};

const ADS_PER_PAGE = 24;
function renderAds(ads) {
    const grid = el('ilan-grid');
    const paginationContainer = el('ilan-pagination');
    if (!grid) return;

    if (ads.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">' + t('noResults') + '</p>';
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    const totalPages = Math.ceil(ads.length / ADS_PER_PAGE);
    const page = Math.min(Math.max(1, window.currentAdsPage || 1), totalPages);
    window.currentAdsPage = page;
    const start = (page - 1) * ADS_PER_PAGE;
    const pageAds = ads.slice(start, start + ADS_PER_PAGE);

    grid.innerHTML = pageAds.map(ad => {
        const isFav = window.favorites.includes(ad.id);
        const imgSrc = (ad.images && ad.images[0]) || ad.image;
        const urgentBadge = ad.urgent ? '<span class="badge-urgent">ACİL SATILIK</span>' : '';
        const titleClass = ad.boldTitle ? 'ilan-baslik-kalin' : '';
        return `
        <div class="ilan-kart" data-id="${ad.id}">
            <div class="resim-alani">
                ${urgentBadge}
                <img src="${imgSrc}" alt="${ad.title}">
                <div class="fav-btn-container" onclick="window.toggleFavorite(${ad.id}, event)">
                    <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart fav-btn ${isFav ? 'favorilendi' : ''}"></i>
                </div>
            </div>
            <div class="ilan-bilgi">
                <h4 class="${titleClass}">${ad.title}</h4>
                <p class="fiyat">${formatPrice(ad)}</p>
                <p class="konum"><i class="fa-solid fa-location-dot"></i> ${tCity(ad.city)}</p>
                <button class="mesaj-gonder-btn" onclick="window.sendMessageToAd(${ad.id}); event.stopPropagation();">${t('sendMessage')}</button>
            </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.ilan-kart').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.fav-btn-container') && !e.target.closest('.mesaj-gonder-btn')) {
                window.ilanDetayAc(parseInt(this.dataset.id));
            }
        });
    });

    if (paginationContainer && totalPages > 1) {
        let html = '<div class="pagination">';
        html += '<button class="page-btn" onclick="goToAdsPage(1)" ' + (page <= 1 ? 'disabled' : '') + '><i class="fa-solid fa-angles-left"></i></button>';
        html += '<button class="page-btn" onclick="goToAdsPage(' + (page - 1) + ')" ' + (page <= 1 ? 'disabled' : '') + '><i class="fa-solid fa-chevron-left"></i></button>';
        html += '<span class="page-info">' + page + ' / ' + totalPages + '</span>';
        html += '<button class="page-btn" onclick="goToAdsPage(' + (page + 1) + ')" ' + (page >= totalPages ? 'disabled' : '') + '><i class="fa-solid fa-chevron-right"></i></button>';
        html += '<button class="page-btn" onclick="goToAdsPage(' + totalPages + ')" ' + (page >= totalPages ? 'disabled' : '') + '><i class="fa-solid fa-angles-right"></i></button>';
        html += '</div>';
        paginationContainer.innerHTML = html;
    } else if (paginationContainer) paginationContainer.innerHTML = '';
}
window.goToAdsPage = function(p) {
    window.currentAdsPage = p;
    if (window.filteredAdsCache) renderAds(window.filteredAdsCache);
};

function getSimilarAds(ad, limit) {
    const now = new Date();
    return (window.adsDatabase || [])
        .filter(a => a.id !== ad.id && (!a.expiryAt || new Date(a.expiryAt) >= now))
        .sort((a, b) => {
            let scoreA = 0, scoreB = 0;
            if (a.category === ad.category) scoreA += 2;
            if (a.subCategory === ad.subCategory) scoreA += 3;
            if (a.city === ad.city) scoreA += 1;
            if (b.category === ad.category) scoreB += 2;
            if (b.subCategory === ad.subCategory) scoreB += 3;
            if (b.city === ad.city) scoreB += 1;
            return scoreB - scoreA;
        })
        .slice(0, limit);
}
function getSimilarAdsHtml(ad) {
    const similar = getSimilarAds(ad, 6);
    if (similar.length === 0) return '';
    const L = t('similarAds');
    return `<div class="similar-ads-section" style="margin-top:30px;border-top:1px solid var(--border-color);padding-top:20px;">
        <h3 style="margin-bottom:15px;"><i class="fa-solid fa-layer-group"></i> ${L}</h3>
        <div class="similar-ads-grid">${similar.map(s => {
            const img = (s.images && s.images[0]) || s.image;
            return `<div class="similar-ad-card" onclick="window.closeDetailModal();window.ilanDetayAc(${s.id});" style="cursor:pointer;border:1px solid var(--border-color);border-radius:12px;overflow:hidden;">
                <img src="${img}" alt="" style="width:100%;height:120px;object-fit:cover;">
                <div style="padding:10px;"><strong style="font-size:13px;">${escapeHtml(s.title)}</strong><p style="font-size:12px;color:var(--text-muted);margin:4px 0 0;">${formatPrice(s)}</p></div>
            </div>`;
        }).join('')}</div></div>`;
}

// ========== İLAN DETAY ==========
window.ilanDetayAc = function (adId) {
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (!ad) return;
    window.recentlyViewed = window.recentlyViewed || [];
    window.recentlyViewed = [adId, ...window.recentlyViewed.filter(id => id !== adId)].slice(0, 20);
    saveRecentlyViewed();
    ad.views = (ad.views || 0) + 1;
    ad.clicks = (ad.clicks || 0) + 1;
    saveAdsDatabase();
    const imgs = ad.images && ad.images.length ? ad.images : [ad.image];
    const hasVideo = !!ad.video;
    const videoEl = hasVideo ? `<video class="detail-main-media detail-video" src="${ad.video}" controls style="${imgs.length ? 'display:none' : ''}"></video>` : '';
    const imgEl = `<img class="detail-main-media detail-img" src="${imgs[0]}" alt="${ad.title}" style="${hasVideo ? 'display:none' : ''}">`;
    const galleryItems = [];
    if (hasVideo) galleryItems.push(`<div class="detail-gallery-thumb gallery-video-thumb active" data-type="video"><i class="fa-solid fa-video"></i></div>`);
    imgs.forEach((src, i) => {
        galleryItems.push(`<img class="detail-gallery-thumb ${!hasVideo && i === 0 ? 'active' : ''}" data-src="${src}" data-type="img" src="${src}">`);
    });
    const galleryHtml = galleryItems.length > 1 ? `<div class="detail-gallery">${galleryItems.join('')}</div>` : '';
    const phone = (ad.phone || '').replace(/\D/g, '');
    const waText = encodeURIComponent('Merhaba, "' + ad.title + '" ilanı hakkında bilgi almak istiyorum.');
    const whatsappUrl = phone ? `https://wa.me/${phone}?text=${waText}` : '#';
    const callUrl = ad.phone ? `tel:${ad.phone}` : '#';

    let modal = el('listing-detail-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'listing-detail-modal';
        modal.className = 'modern-modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px;">
            <span class="close-btn" onclick="window.closeDetailModal()">&times;</span>
            <h2>${ad.title}</h2>
            <div class="detail-media-wrap">${videoEl}${imgEl}</div>
            ${galleryHtml}
            <p><strong>${t('priceLabel')}:</strong> ${formatPrice(ad)}</p>
            <p><strong>${t('category')}:</strong> ${(window.TRANSLATIONS?.[window.currentLang]?.categories?.[ad.subCategory || ad.category]) || ad.subCategory || ad.category}</p>
            ${getAttrsDisplayHtml(ad)}
            ${ad.condition ? `<p><strong>${t('productCondition')}:</strong> ${ad.condition}</p>` : ''}
            ${ad.sellerType ? `<p><strong>${t('fromWho')}:</strong> ${ad.sellerType}</p>` : ''}
            <p><strong>${t('location')}:</strong> ${tCity(ad.city)} ${ad.district ? '- ' + tDistrict(ad.district) : ''}</p>
            <p><strong>${t('seller')}:</strong> ${ad.seller} ${(ad.userId && window.userVerifiedUntil && new Date(window.userVerifiedUntil[ad.userId] || '1970-01-01') > new Date()) ? ' <span class="badge-verified"><i class="fa-solid fa-badge-check"></i> Onaylı Satıcı</span>' : ''}</p>
            ${ad.detailedStats ? `<p class="ad-stats"><strong>İstatistikler:</strong> Görüntülenme: ${ad.views || 0} | Tıklanma: ${ad.clicks || 0} | Favori: ${ad.favCount || 0}</p>` : ''}
            <p><strong>${t('descriptionLabel')}:</strong> ${ad.description || t('noDesc')}</p>
            ${ad.city && cityCoords[ad.city] ? `<div id="map-container" style="margin:15px 0;"><iframe width="100%" height="250" frameborder="0" style="border:0;border-radius:10px;" src="https://www.openstreetmap.org/export/embed.html?bbox=${cityCoords[ad.city][1]-0.15}%2C${cityCoords[ad.city][0]-0.08}%2C${cityCoords[ad.city][1]+0.15}%2C${cityCoords[ad.city][0]+0.08}&layer=mapnik&marker=${cityCoords[ad.city][0]}%2C${cityCoords[ad.city][1]}"></iframe></div>` : ''}
            <div class="ilan-iletisim-butonlar">
                ${ad.phone ? `<a href="${callUrl}" class="btn-ara"><i class="fa-solid fa-phone"></i> ${t('call')}</a>` : ''}
                ${ad.phone ? `<a href="${whatsappUrl}" target="_blank" class="btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> ${t('whatsapp')}</a>` : ''}
            </div>
            <button class="modern-submit-btn" onclick="window.sendMessageToAd(${ad.id}); window.closeDetailModal();" style="margin-top:10px">${t('messageSeller')}</button>
            <button class="modern-submit-btn" onclick="window.openRatingModal(${ad.id}); return false;" style="margin-top: 10px">${t('rateSeller')}</button>
            <button class="modern-submit-btn btn-outline" onclick="window.openReportModal(${ad.id}); return false;" style="margin-top: 10px; color: var(--danger, #dc3545); border-color: var(--danger, #dc3545);"><i class="fa-solid fa-flag"></i> ${t('reportAd')}</button>
            ${getCurrentUser() ? `<button class="modern-submit-btn btn-outline" id="btn-price-alert-${ad.id}" onclick="window.togglePriceAlert(${ad.id}); return false;" style="margin-top: 10px;"><i class="fa-solid fa-bell"></i> <span id="price-alert-txt-${ad.id}">${hasPriceAlert(ad.id) ? t('priceAlertOff') : t('priceAlertOn')}</span></button>` : ''}
            <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
                <button class="modern-submit-btn btn-outline" onclick="window.shareAdViaWhatsApp(${ad.id}); return false;" style="font-size:13px;"><i class="fa-brands fa-whatsapp" style="color:#25D366"></i> ${t('shareWhatsApp') || 'WhatsApp\'ta Paylaş'}</button>
                <button class="modern-submit-btn btn-outline" onclick="window.copyAdLink(${ad.id}); return false;" style="font-size:13px;"><i class="fa-solid fa-link"></i> ${t('copyLink') || 'Linki Kopyala'}</button>
            </div>
            ${getSimilarAdsHtml(ad)}
        </div>
    `;
    modal.style.display = 'flex';
    modal.classList.add('active');
    const videoElem = modal.querySelector('.detail-video');
    const imgElem = modal.querySelector('.detail-img');
    modal.querySelectorAll('.detail-gallery-thumb').forEach((thumb) => {
        thumb.onclick = () => {
            modal.querySelectorAll('.detail-gallery-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            if (thumb.dataset.type === 'video' && videoElem) {
                if (videoElem) { videoElem.style.display = 'block'; videoElem.play(); }
                if (imgElem) imgElem.style.display = 'none';
            } else {
                const src = thumb.dataset.src || thumb.src;
                if (imgElem && src) { imgElem.src = src; imgElem.style.display = 'block'; }
                if (videoElem) { videoElem.pause(); videoElem.style.display = 'none'; }
            }
        };
    });
};

window.closeDetailModal = function () {
    const modal = el('listing-detail-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
    renderRecentlyViewed();
};

window.openReportModal = function (adId) {
    const user = getCurrentUser();
    if (!user) {
        showToast('loginRequired', 'warning', 2000);
        el('login-modal').style.display = 'flex';
        return;
    }
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (!ad) return;
    const reasons = [
        { key: 'spam', label: t('reportSpam') },
        { key: 'fake', label: t('reportFake') },
        { key: 'illegal', label: t('reportIllegal') },
        { key: 'other', label: t('reportOther') }
    ];
    let m = el('report-ad-modal');
    if (!m) {
        m = document.createElement('div');
        m.id = 'report-ad-modal';
        m.className = 'modern-modal';
        document.body.appendChild(m);
    }
    m.innerHTML = `
        <div class="modal-content" style="max-width:420px;">
            <span class="close-btn" onclick="this.closest('.modern-modal').style.display='none'">&times;</span>
            <h3><i class="fa-solid fa-flag"></i> ${t('reportAd')}</h3>
            <p style="color:var(--text-muted);margin-bottom:16px;">"${escapeHtml(ad.title)}"</p>
            <label style="display:block;margin-bottom:8px;">${t('reportReason')}</label>
            <select id="report-reason" class="modern-input" style="width:100%;margin-bottom:16px;">
                ${reasons.map(r => `<option value="${r.key}">${r.label}</option>`).join('')}
            </select>
            <label style="display:block;margin-bottom:8px;">${t('reportNote')} (${t('optional')})</label>
            <textarea id="report-note" class="modern-input" rows="3" placeholder="${t('reportNotePlaceholder')}" style="width:100%;margin-bottom:16px;"></textarea>
            <button class="modern-submit-btn" onclick="window.submitReport(${adId})">${t('reportSubmit')}</button>
        </div>
    `;
    m.style.display = 'flex';
};

function hasPriceAlert(adId) {
    const u = getCurrentUser();
    if (!u) return false;
    return (window.priceAlerts || []).some(a => a.adId === adId && a.userId === u.id);
}
window.togglePriceAlert = function (adId) {
    const u = getCurrentUser();
    if (!u) { showToast('loginRequired', 'warning', 2000); el('login-modal').style.display = 'flex'; return; }
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (!ad) return;
    const priceEur = priceToEur(ad.price, ad.currency);
    window.priceAlerts = window.priceAlerts || [];
    const idx = window.priceAlerts.findIndex(a => a.adId === adId && a.userId === u.id);
    if (idx >= 0) {
        window.priceAlerts.splice(idx, 1);
        savePriceAlerts();
        showToast('priceAlertRemoved', 'info', 2000);
    } else {
        window.priceAlerts.push({ adId, userId: u.id, priceAtSubscribe: priceEur, adTitle: ad.title, createdAt: new Date().toISOString() });
        savePriceAlerts();
        showToast('priceAlertAdded', 'success', 2000);
    }
    const detailModal = el('listing-detail-modal');
    if (detailModal && detailModal.style.display === 'flex') {
        const txt = el('price-alert-txt-' + adId);
        if (txt) txt.textContent = hasPriceAlert(adId) ? t('priceAlertOff') : t('priceAlertOn');
    }
};

window.shareAdViaWhatsApp = function(adId) {
    const ad = window.adsDatabase?.find(a => a.id === adId);
    if (!ad) return;
    const url = location.origin + location.pathname + '#ad=' + adId;
    const text = encodeURIComponent(ad.title + ' - ' + formatPrice(ad) + '\n' + url);
    window.open('https://wa.me/?text=' + text, '_blank');
};
window.copyAdLink = function(adId) {
    const url = location.origin + location.pathname + '#ad=' + adId;
    navigator.clipboard?.writeText(url).then(() => showToast('linkCopied', 'success', 1500));
};

window.submitReport = function (adId) {
    const user = getCurrentUser();
    if (!user) return;
    const reason = (el('report-reason')?.value) || 'other';
    const note = (el('report-note')?.value || '').trim();
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (!ad) return;
    window.reportsDatabase = window.reportsDatabase || [];
    window.reportsDatabase.push({
        id: Date.now(),
        adId,
        adTitle: ad.title,
        reporterId: user.id,
        reporterName: user.name,
        reason,
        note,
        createdAt: new Date().toISOString(),
        status: 'pending'
    });
    saveReports();
    el('report-ad-modal').style.display = 'none';
    showToast('reportSuccess', 'success', 2500);
};

// ========== FAVORİ ==========
window.toggleFavorite = function (adId, event) {
    if (event) event.stopPropagation();
    const user = getCurrentUser();
    if (!user) {
        showToast('favAdd', 'warning', 2000);
        el('login-modal').style.display = 'flex';
        return;
    }
    const idx = window.favorites.indexOf(adId);
    if (idx >= 0) {
        window.favorites.splice(idx, 1);
        showToast('favRemoved', 'info', 1500);
    } else {
        window.favorites.push(adId);
        const ad = window.adsDatabase.find(a => a.id === adId);
        if (ad && ad.detailedStats) ad.favCount = (ad.favCount || 0) + 1;
        if (ad) saveAdsDatabase();
        showToast('favAdded', 'success', 1500);
    }
    saveFavorites();
    applyFilters();
    updateHeaderUI();
};

// ========== PROFIL SAYFASI ==========
function openProfilePage() {
    const user = getCurrentUser();
    if (!user) {
        showToast('loginRequired', 'warning', 2000);
        return;
    }
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    el('profile-page').style.display = 'block';
    hideProfileDropdown();
    updateProfilePage(user);
}

function updateProfilePage(user) {
    el('profile-name-disp').textContent = user.name || 'Kullanıcı';
    el('profile-email-disp').textContent = user.email || '';
    const myAds = window.adsDatabase.filter(a => a.userId === user.id);
    el('profile-ad-count').textContent = myAds.length;
    el('profile-fav-count').textContent = window.favorites.length;
    const credit = (window.userCredits[user.id] || 0);
    el('profile-credit-disp').textContent = credit + ' EUR';
    el('current-credit').textContent = credit + ' EUR';
    el('profile-bio').value = user.bio || '';
    el('profile-phone').value = user.phone || '';
    el('profile-address').value = user.address || '';
}

// Tab switching
function initProfileTabs() {
    qsa('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            qsa('.tab-btn').forEach(b => b.classList.remove('active'));
            qsa('.tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const tabId = this.dataset.tab;
            el(tabId)?.classList.add('active');
        });
    });
}

// ========== FAVORİLER SAYFASI ==========
window.openFavoritesPage = function () {
    const user = getCurrentUser();
    if (!user) {
        showToast('loginRequired', 'warning', 2000);
        el('login-modal').style.display = 'flex';
        return;
    }
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    el('favorites-page').style.display = 'block';
    hideProfileDropdown();
    const grid = el('favorites-grid');
    const favs = window.adsDatabase.filter(a => window.favorites.includes(a.id));
    if (favs.length === 0) {
        grid.innerHTML = '<p id="no-favorites">' + t('noFavorites') + '</p>';
    } else {
        grid.innerHTML = favs.map(ad => {
            const imgSrc = (ad.images && ad.images[0]) || ad.image;
            return `
            <div class="ilan-kart" data-id="${ad.id}">
                <div class="resim-alani"><img src="${imgSrc}" alt="${ad.title}"></div>
                <div class="ilan-bilgi">
                    <h4>${ad.title}</h4>
                    <p class="fiyat">${formatPrice(ad)}</p>
                    <p class="konum"><i class="fa-solid fa-location-dot"></i> ${tCity(ad.city)}</p>
                    <button class="mesaj-gonder-btn">${t('sendMessage')}</button>
                </div>
            </div>
        `;
        }).join('');
    }
};

// ========== İLANLARIM ==========
function openMyAdsPage() {
    const user = getCurrentUser();
    if (!user) return;
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    el('my-ads-page').style.display = 'block';
    hideProfileDropdown();
    const list = el('my-ads-list');
    const myAds = window.adsDatabase.filter(a => a.userId === user.id);
    if (myAds.length === 0) {
        list.innerHTML = '<p id="no-ads">' + t('noAds') + '</p>';
    } else {
        list.innerHTML = myAds.map(ad => {
            const status = ad.status || 'approved';
            const statusBadge = status === 'pending' ? '<span class="badge-pending">' + (t('pendingApproval') || 'Beklemede') + '</span>' : (status === 'rejected' ? '<span class="badge-rejected">' + (t('rejected') || 'Reddedildi') + '</span>' : '');
            const imgSrc = (ad.images && ad.images[0]) || ad.image;
            const statsHtml = (ad.detailedStats || ad.views) ? `<p class="my-ad-stats">Görüntülenme: ${ad.views||0}${ad.detailedStats ? ' | Tıklanma: '+(ad.clicks||0)+' | Favori: '+(ad.favCount||0) : ''}</p>` : '';
            const bumpDisabled = status !== 'approved';
            return `
            <div class="my-ad-card" data-ad-id="${ad.id}">
                <div class="resim-alani">${statusBadge}<img src="${imgSrc}" alt="${ad.title}"></div>
                <div class="my-ad-card-body">
                    <h4>${ad.title}</h4>
                    <p>${formatPrice(ad)}</p>
                    <p>${tCity(ad.city)}</p>
                    ${statsHtml}
                    <div class="my-ad-actions">
                        <button class="ad-action-btn ad-bump-btn" data-id="${ad.id}" ${bumpDisabled ? 'disabled' : ''}>Yukarı Taşı (${getSiteSettings().bumpPrice} EUR)</button>
                        <button class="ad-action-btn ad-edit-btn" data-id="${ad.id}">${t('edit')}</button>
                        <button class="ad-action-btn ad-delete-btn" onclick="deleteAd(${ad.id})">${t('delete')}</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
        list.querySelectorAll('.ad-bump-btn').forEach(btn => {
            btn.addEventListener('click', function(e) { e.stopPropagation(); bumpAd(parseInt(this.dataset.id)); });
        });
        list.querySelectorAll('.ad-edit-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                openIlanModalForEdit(parseInt(this.dataset.id));
            });
        });
    }
}

window.bumpAd = function(id) {
    const user = getCurrentUser();
    if (!user) return;
    const ad = window.adsDatabase.find(a => a.id === id && a.userId === user.id);
    if (!ad) return;
    const bumpPrice = getSiteSettings().bumpPrice;
    const credit = window.userCredits[user.id] || 0;
    if (credit < bumpPrice) {
        showToast('insufficientCredit', 'error', 3000);
        openPaymentModal(bumpPrice - credit, 0);
        return;
    }
    window.userCredits[user.id] = credit - bumpPrice;
    saveCredits();
    ad.lastBumpAt = new Date().toISOString();
    ad.bumpCount = (ad.bumpCount || 0) + 1;
    saveAdsDatabase();
    openMyAdsPage();
    updateProfilePage(user);
    showToast('bumpSuccess', 'success', 2000);
};

function deleteAd(id) {
    if (!confirm(t('deleteConfirm') || 'Bu ilanı silmek istediğinize emin misiniz?')) return;
    const favIdx = window.favorites.indexOf(id);
    if (favIdx >= 0) { window.favorites.splice(favIdx, 1); saveFavorites(); }
    window.adsDatabase = window.adsDatabase.filter(a => a.id !== id);
    saveAdsDatabase();
    openMyAdsPage();
    applyFilters();
    updateHeaderUI();
    showToast('adDeleted', 'info', 2000);
}

// ========== MESAJLAŞMA (SİTE İÇİ) ==========
function getConvKey(adId, buyerId) { return adId + '_' + buyerId; }

function addNotification(userId, type, title, body, data) {
    if (!userId) return;
    const n = { id: Date.now(), userId, type, title, body, data: data || {}, read: false };
    window.notifications = window.notifications || [];
    window.notifications.push(n);
    saveNotifications();
    updateHeaderUI();
}

// Süresi dolan ilanlar için kullanıcıya bildirim
function checkExpiredAdsAndNotify() {
    const now = new Date();
    let changed = false;
    (window.adsDatabase || []).forEach(ad => {
        if (!ad.userId || ad.expiryNotified) return;
        const expiry = ad.expiryAt ? new Date(ad.expiryAt) : null;
        if (expiry && expiry < now) {
            addNotification(ad.userId, 'ad_expired', 'İlan süresi doldu', '"' + ad.title + '" ilanınızın süresi doldu ve sistem tarafından kaldırıldı.', { adId: ad.id });
            ad.expiryNotified = true;
            changed = true;
        }
    });
    if (changed) saveAdsDatabase();
}

window.openMessagingModal = function (openConvKey) {
    const user = getCurrentUser();
    if (!user) { showToast('loginRequired', 'warning', 2000); return; }
    renderConversationList(user);
    if (openConvKey) selectConversation(openConvKey);
    else {
        const first = Object.keys(window.conversations).find(k => {
            const c = window.conversations[k];
            return c.sellerId === user.id || c.buyerId === user.id;
        });
        if (first) selectConversation(first);
        else {
            el('message-view').innerHTML = '<div class="message-view-empty"><i class="fa-solid fa-comments"></i><p>' + t('selectConversation') + '</p></div>';
            el('message-form-container').style.display = 'none';
        }
    }
    el('messaging-modal').style.display = 'flex';
    el('messaging-modal').classList.add('active');
};

window.closeMessagingModal = function () {
    el('messaging-modal').style.display = 'none';
    el('messaging-modal').classList.remove('active');
};

function renderConversationList(user) {
    const list = el('conversations');
    if (!list) return;
    const convs = Object.entries(window.conversations).filter(([_, c]) => c.sellerId === user.id || c.buyerId === user.id);
    convs.sort((a, b) => (b[1].lastMsgTime || 0) - (a[1].lastMsgTime || 0));
    if (convs.length === 0) {
        list.innerHTML = '<p id="no-conversations" class="empty-state">' + t('noConversations') + '</p>';
        return;
    }
    list.innerHTML = convs.map(([key, c]) => {
        const other = c.sellerId === user.id ? c.buyerName : c.sellerName;
        const preview = (c.messages && c.messages[c.messages.length - 1]?.text) || '';
        return `<div class="conv-item" data-conv="${key}">
            <div class="conv-avatar"><i class="fa-solid fa-user"></i></div>
            <div class="conv-info">
                <div class="conv-name">${other}</div>
                <div class="conv-preview">${preview.slice(0, 40)}${preview.length > 40 ? '...' : ''}</div>
            </div>
        </div>`;
    }).join('');
    list.querySelectorAll('.conv-item').forEach(item => {
        item.onclick = () => selectConversation(item.dataset.conv);
    });
}

function selectConversation(convKey) {
    const c = window.conversations[convKey];
    if (!c) return;
    const user = getCurrentUser();
    if (!user) return;
    qsa('#conversations .conv-item').forEach(x => x.classList.toggle('aktif', x.dataset.conv === convKey));
    const mv = el('message-view');
    const mfc = el('message-form-container');
    if (!mv) return;
    const otherName = c.sellerId === user.id ? c.buyerName : c.sellerName;
    const ad = window.adsDatabase.find(a => a.id === c.adId);
    const imgSrc = ad && ((ad.images && ad.images[0]) || ad.image);
    let dealHtml = '';
    const isSeller = c.sellerId === user.id;
    const bothConfirmed = c.sellerConfirmed && c.buyerConfirmed;
    if (isSeller) {
        dealHtml = c.sellerConfirmed ? '<span class="deal-status">✓ Sattığınızı onayladınız</span>' : `<button class="deal-btn sold" data-action="sellerConfirm">${t('confirmSold') || 'Evet Sattım'}</button>`;
    } else {
        dealHtml = c.buyerConfirmed ? '<span class="deal-status">✓ Aldığınızı onayladınız</span>' : `<button class="deal-btn bought" data-action="buyerConfirm">${t('confirmBought') || 'Evet Aldım'}</button>`;
        if (bothConfirmed && !c.rated) dealHtml += ` <button class="deal-btn rate" data-action="rate">${t('rateSeller')}</button>`;
    }
    mv.innerHTML = `
        <div class="message-header" style="padding:15px;border-bottom:1px solid var(--border-color);display:flex;align-items:center;gap:12px;">
            ${imgSrc ? `<img src="${imgSrc}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;">` : ''}
            <div>
                <strong>${c.adTitle || 'İlan'}</strong>
                <p style="font-size:12px;color:var(--text-muted);">${otherName}</p>
            </div>
        </div>
        <div class="message-list" style="flex:1;overflow-y:auto;padding:15px;display:flex;flex-direction:column;">
            ${(c.messages || []).map(m => {
                const isMe = m.from === user.id;
                return `<div class="msg-bubble ${isMe ? 'sent' : 'received'}">${escapeHtml(m.text)}</div>`;
            }).join('')}
        </div>
        <div class="deal-buttons" style="padding:10px 15px;border-top:1px solid var(--border-color);">${dealHtml}</div>
    `;
    mv.dataset.convKey = convKey;
    if (mfc) mfc.style.display = 'flex';
    el('message-input').value = '';
    mv.querySelectorAll('[data-action]').forEach(btn => {
        btn.onclick = () => handleDealAction(convKey, btn.dataset.action);
    });
}

function escapeHtml(s) { const d=document.createElement('div'); d.textContent=s||''; return d.innerHTML; }

function handleDealAction(convKey, action) {
    const c = window.conversations[convKey];
    if (!c) return;
    const user = getCurrentUser();
    if (!user) return;
    if (action === 'sellerConfirm') { c.sellerConfirmed = true; saveConversations(); selectConversation(convKey); showToast('confirmSaved', 'success', 2000); addNotification(c.buyerId, 'deal', 'Satıcı onayladı', 'Satıcı ürünü sattığını onayladı.', { convKey }); updateNotifBadge(); }
    else if (action === 'buyerConfirm') { c.buyerConfirmed = true; saveConversations(); selectConversation(convKey); showToast('confirmSaved', 'success', 2000); addNotification(c.sellerId, 'deal', 'Alıcı onayladı', 'Alıcı ürünü aldığını onayladı.', { convKey }); updateNotifBadge(); }
    else if (action === 'rate') { window.closeMessagingModal(); el('rating-modal').dataset.convKey = convKey; window.openRatingModal(c.adId); }
}

window.sendMessageToAd = function (adId) {
    const user = getCurrentUser();
    if (!user) { showToast('loginRequired', 'warning', 2000); el('login-modal').style.display = 'flex'; return; }
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (!ad) return;
    const sellerId = ad.userId || 0;
    if (sellerId === user.id) { showToast('ownAd', 'warning', 2000); return; }
    const convKey = getConvKey(adId, user.id);
    if (!window.conversations[convKey]) {
        window.conversations[convKey] = {
            adId, sellerId, buyerId: user.id,
            sellerName: ad.seller || 'Satıcı', buyerName: user.name || 'Alıcı',
            adTitle: ad.title, sellerConfirmed: false, buyerConfirmed: false, rated: false,
            messages: [], lastMsgTime: 0
        };
        saveConversations();
        addNotification(sellerId, 'message', 'Yeni mesaj', user.name + ' ' + ad.title + ' ilanı hakkında mesaj gönderdi.', { convKey, adId });
    }
    window.closeDetailModal();
    window.openMessagingModal(convKey);
};

function sendMessage() {
    const user = getCurrentUser();
    const input = el('message-input');
    const convKey = el('message-view')?.dataset?.convKey;
    if (!user || !input || !convKey) return;
    const text = input.value.trim();
    if (!text) return;
    const c = window.conversations[convKey];
    if (!c) return;
    c.messages = c.messages || [];
    c.messages.push({ from: user.id, text, time: Date.now() });
    c.lastMsgTime = Date.now();
    saveConversations();
    input.value = '';
    selectConversation(convKey);
    const otherId = c.sellerId === user.id ? c.buyerId : c.sellerId;
    addNotification(otherId, 'message', 'Yeni mesaj', text.slice(0, 50), { convKey }); updateMsgBadge(); updateNotifBadge();
    updateMsgBadge();
}

// ========== RATING ==========
window.openRatingModal = function (adId) {
    const user = getCurrentUser();
    if (!user) {
        showToast('loginRequired', 'warning', 2000);
        return;
    }
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (!ad) return;
    el('rating-seller-name').textContent = ad.seller;
    el('rating-seller-category').textContent = ad.category;
    el('rating-modal').style.display = 'flex';
    el('rating-modal').classList.add('active');
    el('rating-modal').dataset.adId = adId;
    qsa('#star-rating .star').forEach(s => s.classList.remove('active'));
    el('star-text').textContent = 'Lütfen bir puan seçin';
};

window.closeRatingModal = function () {
    el('rating-modal').style.display = 'none';
    el('rating-modal').classList.remove('active');
};

// ========== PAYMENT ==========
window.openPaymentModal = function (amount, bonus = 0) {
    const user = getCurrentUser();
    if (!user) {
        showToast('loginRequired', 'warning', 2000);
        return;
    }
    el('payment-amount').textContent = amount + ' EUR';
    el('payment-bonus').textContent = bonus + ' EUR';
    el('payment-modal').dataset.amount = amount;
    el('payment-modal').dataset.bonus = bonus;
    el('payment-modal').style.display = 'flex';
};

window.closePaymentModal = function () {
    el('payment-modal').style.display = 'none';
};

// ========== MODAL HELPERS ==========
window.closeLoginModal = function () { el('login-modal').style.display = 'none'; };
window.closeSignupModal = function () { el('signup-modal').style.display = 'none'; };
window.closeForgotModal = function () { el('forgot-modal').style.display = 'none'; };
window.closeModal = function () { el('ilan-modal').style.display = 'none'; };

// Close modal on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modern-modal')) {
        e.target.style.display = 'none';
        e.target.classList.remove('active');
    }
});

// ========== FOTO & VİDEO UPLOAD ==========
let selectedImages = [];
let selectedVideo = null;
const fotoInput = el('foto-input');
const fotoTetik = el('foto-yukle-tetik');
const fotoOnizleme = el('foto-onizleme-alani');
const videoInput = el('video-input');
const videoTetik = el('video-yukle-tetik');
const videoOnizleme = el('video-onizleme-alani');

if (fotoTetik) {
    fotoTetik.addEventListener('click', (e) => { e.stopPropagation(); fotoInput?.click(); });
    fotoTetik.addEventListener('dragover', e => { e.preventDefault(); fotoTetik.classList.add('dragover'); });
    fotoTetik.addEventListener('dragleave', () => fotoTetik.classList.remove('dragover'));
    fotoTetik.addEventListener('drop', e => {
        e.preventDefault();
        fotoTetik.classList.remove('dragover');
        const imgFiles = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith('image/'));
        const slotsLeft = (getSiteSettings().maxPhotos || 15) - selectedImages.length;
        imgFiles.slice(0, slotsLeft).forEach(file => {
            const reader = new FileReader();
            reader.onload = ev => {
                selectedImages.push(ev.target.result);
                rebuildPhotoPreviews();
            };
            reader.readAsDataURL(file);
        });
    });
}
if (fotoInput) {
    fotoInput.addEventListener('change', function() {
        const newFiles = Array.from(this.files || []).filter(f => f.type.startsWith('image/'));
        const slotsLeft = (getSiteSettings().maxPhotos || 15) - selectedImages.length;
        const filesToAdd = newFiles.slice(0, slotsLeft);
        this.value = '';
        if (filesToAdd.length === 0) return;
        filesToAdd.forEach((file) => {
            const reader = new FileReader();
            reader.onload = ev => {
                selectedImages.push(ev.target.result);
                rebuildPhotoPreviews();
            };
            reader.readAsDataURL(file);
        });
    });
}
function rebuildPhotoPreviews() {
    if (!fotoOnizleme) return;
    fotoOnizleme.innerHTML = '';
    selectedImages.forEach((src, i) => {
        const div = document.createElement('div');
        div.className = 'onizleme-kutu';
        div.innerHTML = `<img src="${src}" alt=""><button type="button" class="remove-preview" onclick="removePhotoPreview(${i})">&times;</button>`;
        fotoOnizleme.appendChild(div);
    });
}
window.removePhotoPreview = function(idx) {
    selectedImages.splice(idx, 1);
    rebuildPhotoPreviews();
};

if (videoTetik) {
    videoTetik.addEventListener('click', (e) => { e.stopPropagation(); videoInput?.click(); });
    videoTetik.addEventListener('dragover', e => { e.preventDefault(); videoTetik.classList.add('dragover'); });
    videoTetik.addEventListener('dragleave', () => videoTetik.classList.remove('dragover'));
    videoTetik.addEventListener('drop', e => {
        e.preventDefault();
        videoTetik.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            const v = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('video/'));
            if (v) { videoInput.files = new DataTransfer().items.add(v).files; videoInput.dispatchEvent(new Event('change')); }
        }
    });
}
if (videoInput) {
    videoInput.addEventListener('change', function() {
        const file = this.files?.[0];
        if (!file) { selectedVideo = null; if (videoOnizleme) videoOnizleme.innerHTML = ''; return; }
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
            URL.revokeObjectURL(video.src);
            const maxSec = getSiteSettings().maxVideoSeconds || 30;
            if (video.duration > maxSec || isNaN(video.duration)) {
                showToast('videoTooLong', 'error', 3000);
                videoInput.value = '';
                selectedVideo = null;
                if (videoOnizleme) videoOnizleme.innerHTML = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = ev => {
                selectedVideo = ev.target.result;
                if (videoOnizleme) videoOnizleme.innerHTML = `<video src="${selectedVideo}" controls style="max-width:100%;max-height:200px;border-radius:8px;margin-top:10px;"></video><button type="button" class="remove-video-btn" onclick="videoInput.value='';selectedVideo=null;el('video-onizleme-alani').innerHTML='';">&times; Kaldır</button>`;
            };
            reader.readAsDataURL(file);
        };
        video.src = URL.createObjectURL(file);
    });
}

// ========== İLAN FORM ==========
function getAdFormData(editId) {
    const user = getCurrentUser();
    const images = selectedImages.length ? selectedImages : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'];
    const katVal = el('form-kat-select').value || '';
    let parentCat = katVal, subCat = '';
    const grp = window.CATEGORIES_TREE?.find(g => g.id === katVal || (g.sub || []).includes(katVal));
    if (grp) {
        if (grp.sub && grp.sub.includes(katVal)) { parentCat = grp.id; subCat = katVal; }
        else { parentCat = katVal; }
    }
    const premVitrin = el('prem-vitrin')?.checked;
    const premFont = el('prem-font')?.checked;
    const premUrgent = el('prem-urgent')?.checked;
    const premStats = el('prem-stats')?.checked;
    const premExtend = el('prem-extend')?.checked;
    const premMulticity = el('prem-multicity')?.checked;
    const premVerified = el('prem-verified')?.checked;
    const baseCity = el('form-sehir-select').value || '';
    const extraCities = premMulticity ? [el('prem-city2')?.value, el('prem-city3')?.value].filter(Boolean) : [];
    const cities = premMulticity && baseCity ? [baseCity, ...extraCities].filter((v,i,a)=>a.indexOf(v)===i) : [baseCity];
    const ss = getSiteSettings();
    const adDuration = premExtend ? (ss.extendedAdDays || 60) : (ss.defaultAdDays || 30);
    const existing = editId ? window.adsDatabase.find(a => a.id === editId) : null;
    return {
        id: editId || Date.now(),
        title: el('ilan-baslik').value.trim(),
        price: parseFloat(el('ilan-fiyat').value) || 0,
        currency: el('ilan-para-birimi')?.value || 'EUR',
        category: parentCat || subCat || 'Diğer',
        subCategory: subCat || '',
        condition: el('ilan-durum')?.value || 'İkinci El',
        sellerType: el('ilan-kimden')?.value || 'Sahibinden',
        city: baseCity,
        cities: cities,
        district: el('form-ilce-select').value || '',
        image: images[0],
        images: images,
        video: selectedVideo || null,
        phone: el('ilan-tel').value.trim(),
        seller: user?.name,
        description: el('ilan-aciklama').value.trim(),
        views: existing?.views || 0,
        clicks: existing?.clicks || 0,
        favCount: existing?.favCount || 0,
        createdAt: existing?.createdAt || new Date().toISOString().slice(0,10),
        lastBumpAt: existing?.lastBumpAt || null,
        bumpCount: existing?.bumpCount || 0,
        expiryAt: existing?.expiryAt || (() => { const d = new Date(); d.setDate(d.getDate() + adDuration); return d.toISOString().slice(0,10); })(),
        userId: user?.id,
        featured: !!premVitrin,
        boldTitle: !!premFont,
        urgent: !!premUrgent,
        detailedStats: !!premStats,
        durationDays: adDuration,
        verifiedSeller: !!premVerified,
        premiumCost: (() => { const p = getSiteSettings().premiumPrices; return (premVitrin?p.vitrin:0)+(premFont?p.font:0)+(premUrgent?p.urgent:0)+(premStats?p.stats:0)+(premExtend?p.extend:0)+(premMulticity?p.multicity:0)+(premVerified?p.verified:0); })(),
        status: editId ? (existing?.status || 'approved') : (getSiteSettings().adRequiresApproval ? 'pending' : 'approved'),
        attrs: getCategoryAttrsFromForm()
    };
}
function getPremiumTotal() {
    const p = getSiteSettings().premiumPrices;
    let t = 0;
    if (el('prem-vitrin')?.checked) t += p.vitrin;
    if (el('prem-font')?.checked) t += p.font;
    if (el('prem-urgent')?.checked) t += p.urgent;
    if (el('prem-stats')?.checked) t += p.stats;
    if (el('prem-extend')?.checked) t += p.extend;
    if (el('prem-multicity')?.checked) t += p.multicity;
    if (el('prem-verified')?.checked) t += p.verified;
    return t;
}
function validateAdForm() {
    const L = window.TRANSLATIONS?.[window.currentLang] || window.TRANSLATIONS?.tr || {};
    const title = el('ilan-baslik')?.value?.trim();
    const price = parseFloat(el('ilan-fiyat')?.value);
    const cat = el('form-kat-select')?.value;
    const city = el('form-sehir-select')?.value;
    const phone = el('ilan-tel')?.value?.trim();
    if (!title) { showToast(L.adTitlePlaceholder || 'İlan başlığı gerekli', 'warning', 2000); return false; }
    if (!price || price < 0) { showToast(L.invalidAmount || 'Geçerli fiyat girin', 'warning', 2000); return false; }
    if (!cat) { showToast(L.selectCategory || 'Kategori seçin', 'warning', 2000); return false; }
    if (!city) { showToast(L.selectCity || 'Şehir seçin', 'warning', 2000); return false; }
    if (!phone || phone.replace(/\D/g,'').length < 9) { showToast(L.contactNum || 'Geçerli telefon girin', 'warning', 2000); return false; }
    return true;
}
function resetAdForm() {
    selectedImages = [];
    selectedVideo = null;
    if (fotoOnizleme) fotoOnizleme.innerHTML = '';
    if (videoOnizleme) videoOnizleme.innerHTML = '';
    if (videoInput) videoInput.value = '';
    if (fotoInput) fotoInput.value = '';
    qsa('#ilan-formu [id^="prem-"]').forEach(cb => { if (cb.type === 'checkbox') cb.checked = false; });
    el('prem-multicity-cities').style.display = 'none';
    el('prem-city2').value = '';
    el('prem-city3').value = '';
    updatePremiumTotal();
    el('ilan-modal').dataset.editId = '';
    const curSel = el('ilan-para-birimi');
    if (curSel) curSel.value = 'EUR';
    el('modal-baslik').textContent = window.TRANSLATIONS?.[window.currentLang]?.newAdTitle || 'Yeni İlan Oluştur';
    renderCategoryExtraFields();
}
function updatePremiumTotal() {
    const tot = getPremiumTotal();
    const elt = el('premium-total');
    if (elt) elt.textContent = (window.TRANSLATIONS?.[window.currentLang]?.premiumTotal || 'Toplam ek ücret') + ': ' + tot + ' EUR';
}
function updatePremiumLabels() {
    const p = getSiteSettings().premiumPrices;
    const bump = getSiteSettings().bumpPrice;
    qsa('.premium-option .price').forEach((span, i) => {
        const prices = [p.vitrin, p.font, p.urgent, p.stats, p.extend, p.multicity, p.verified];
        if (prices[i] !== undefined) span.textContent = '+' + prices[i] + ' EUR';
    });
}

function initBannerClicks() {
    var hizli = el('banner-hizli-satis');
    var yeni = el('banner-yeni-ilanlar');
    var ozel = el('banner-ozel-teklifler');
    function doHizli() {
        if (!getCurrentUser()) { showToast('postAdRequired', 'warning', 2000); el('login-modal').style.display = 'flex'; return; }
        el('ilan-modal').style.display = 'flex';
    }
    function doYeni() {
        window.bannerFeaturedOnly = false;
        if (el('adv-date')) el('adv-date').value = '24';
        if (el('sort-select')) el('sort-select').value = 'newest';
        var p = el('advanced-search-panel');
        if (p) p.style.display = 'block';
        window.filterByCategory('all');
        applyFilters();
    }
    function doOzel() {
        window.bannerFeaturedOnly = true;
        if (el('sort-select')) el('sort-select').value = 'newest';
        applyFilters();
    }
    [hizli, yeni, ozel].forEach(function(b) { if (!b) return; b.addEventListener('click', function() { if (b === hizli) doHizli(); else if (b === yeni) doYeni(); else doOzel(); }); b.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (b === hizli) doHizli(); else if (b === yeni) doYeni(); else doOzel(); } }); });
}

function initPremiumForm() {
    const opt = c => `<option value="${c}">${tCity(c)}</option>`;
    const pc2 = el('prem-city2'), pc3 = el('prem-city3');
    if (pc2) pc2.innerHTML = '<option value="">Ek şehir 1</option>' + sehirListesi.map(opt).join('');
    if (pc3) pc3.innerHTML = '<option value="">Ek şehir 2</option>' + sehirListesi.map(opt).join('');
    qsa('#ilan-formu [id^="prem-"]').forEach(cb => {
        if (cb.type === 'checkbox') cb.addEventListener('change', () => {
            if (cb.id === 'prem-multicity') el('prem-multicity-cities').style.display = cb.checked ? 'block' : 'none';
            updatePremiumTotal();
        });
    });
    el('form-sehir-select')?.addEventListener('change', updatePremiumTotal);
    updatePremiumLabels();
    updatePremiumTotal();
}
window.openIlanModalForEdit = function(adId) {
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (!ad) return;
    selectedImages = (ad.images && ad.images.length) ? [...ad.images] : (ad.image ? [ad.image] : []);
    selectedVideo = ad.video || null;
    rebuildPhotoPreviews();
    if (videoOnizleme) {
        videoOnizleme.innerHTML = selectedVideo ? `<video src="${selectedVideo}" controls style="max-width:100%;max-height:200px;border-radius:8px;margin-top:10px;"></video><button type="button" class="remove-video-btn" onclick="videoInput.value='';selectedVideo=null;el('video-onizleme-alani').innerHTML='';">&times; Kaldır</button>` : '';
    }
    if (videoInput) videoInput.value = '';
    el('ilan-baslik').value = ad.title;
    el('ilan-fiyat').value = ad.price;
    const curSel = el('ilan-para-birimi');
    if (curSel) curSel.value = ad.currency || 'EUR';
    el('form-kat-select').value = ad.subCategory || ad.category;
    const durumEl = el('ilan-durum');
    const kimdenEl = el('ilan-kimden');
    if (durumEl) durumEl.value = ad.condition || 'İkinci El';
    if (kimdenEl) kimdenEl.value = ad.sellerType || 'Sahibinden';
    el('form-sehir-select').value = ad.city;
    const formIlce = el('form-ilce-select');
    if (ad.city && lokasyonlar[ad.city]) {
        formIlce.innerHTML = '<option value="">' + t('districtSelect') + '</option>' + lokasyonlar[ad.city].map(d => `<option value="${d}">${tDistrict(d)}</option>`).join('');
        formIlce.value = ad.district || '';
    }
    el('ilan-tel').value = ad.phone || '';
    el('ilan-aciklama').value = ad.description || '';
    el('prem-vitrin').checked = !!ad.featured;
    el('prem-font').checked = !!ad.boldTitle;
    el('prem-urgent').checked = !!ad.urgent;
    el('prem-stats').checked = !!ad.detailedStats;
    el('prem-extend').checked = (ad.durationDays || 30) >= 60;
    el('prem-multicity').checked = !!(ad.cities && ad.cities.length > 1);
    el('prem-verified').checked = !!ad.verifiedSeller;
    if (el('prem-multicity-cities')) el('prem-multicity-cities').style.display = ad.cities && ad.cities.length > 1 ? 'block' : 'none';
    if (ad.cities && ad.cities.length >= 2) el('prem-city2').value = ad.cities[1] || '';
    if (ad.cities && ad.cities.length >= 3) el('prem-city3').value = ad.cities[2] || '';
    renderCategoryExtraFields();
    setCategoryAttrsToForm(ad.attrs || {});
    updatePremiumTotal();
    el('ilan-modal').dataset.editId = adId;
    el('modal-baslik').textContent = (window.TRANSLATIONS?.[window.currentLang]?.editAd || 'İlan Düzenle');
    el('ilan-modal').style.display = 'flex';
};
el('ilan-formu')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) { showToast('loginRequired', 'warning', 2000); return; }
    if (!validateAdForm()) return;
    const editId = parseInt(el('ilan-modal').dataset.editId);
    const adData = getAdFormData(editId);
    const premCost = adData.premiumCost || 0;
    const credit = window.userCredits[user.id] || 0;
    if (premCost > 0) {
        if (credit < premCost) {
            showToast('insufficientCredit', 'error', 3000);
            openPaymentModal(premCost - credit, 0);
            return;
        }
        window.userCredits[user.id] = credit - premCost;
        saveCredits();
    }
    if (adData.verifiedSeller && !editId) {
        const until = new Date();
        until.setMonth(until.getMonth() + 1);
        window.userVerifiedUntil[user.id] = until.toISOString().slice(0,10);
        saveVerified();
    }
    delete adData.premiumCost;
    if (editId) {
        const idx = window.adsDatabase.findIndex(a => a.id === editId);
        const oldAd = idx >= 0 ? window.adsDatabase[idx] : null;
        const newPriceEur = priceToEur(adData.price, adData.currency);
        if (idx >= 0) window.adsDatabase[idx] = { ...window.adsDatabase[idx], ...adData };
        (window.priceAlerts || []).filter(a => a.adId === editId && a.priceAtSubscribe > newPriceEur).forEach(a => {
            addNotification(a.userId, 'price_drop', t('priceDropped'), '"' + (adData.title || a.adTitle) + '" ' + (t('priceDropBody') || 'fiyatı düştü: ') + formatPrice(adData), { adId: editId });
        });
        window.priceAlerts = (window.priceAlerts || []).filter(a => !(a.adId === editId && a.priceAtSubscribe > newPriceEur));
        savePriceAlerts();
        showToast('adEdited', 'success', 2000);
    } else {
        window.adsDatabase.push(adData);
        const msg = getSiteSettings().adRequiresApproval ? (t('adPendingApproval') || 'İlanınız yönetici onayına gönderildi.') : (t('adPublished') || 'İlan yayınlandı');
        showToast(getSiteSettings().adRequiresApproval ? 'adPendingApproval' : 'adPublished', 'success', 2000);
    }
    saveAdsDatabase();
    el('ilan-modal').style.display = 'none';
    resetAdForm();
    this.reset();
    applyFilters();
    openMyAdsPage();
});

// ========== LOGIN / SIGNUP ==========
el('login-formu')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = (el('login-username')?.value || '').trim();
    const existing = Object.values(window.usersDatabase || {}).find(u => (u.email || '').toLowerCase() === email.toLowerCase());
    const user = existing ? { id: existing.id, email: existing.email, name: existing.name } : { id: Date.now(), email, name: 'Kullanıcı' };
    getOrCreateUser(user.id, user.email, user.name);
    setCurrentUser(user);
    updateHeaderUI();
    closeLoginModal();
    showToast('loginSuccess', 'success', 2000);
    this.reset();
});

el('signup-formu')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = { id: Date.now(), email: el('signup-email').value, name: el('signup-name').value };
    getOrCreateUser(user.id, user.email, user.name);
    setCurrentUser(user);
    updateHeaderUI();
    closeSignupModal();
    showToast('signupSuccess', 'success', 2000);
    this.reset();
});

// Switch modals
el('switch-signup')?.addEventListener('click', function(e) {
    e.preventDefault();
    closeLoginModal();
    el('signup-modal').style.display = 'flex';
});

el('switch-login')?.addEventListener('click', function(e) {
    e.preventDefault();
    closeSignupModal();
    el('login-modal').style.display = 'flex';
});

// Password toggle
qsa('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
});

// ========== EVENT BINDINGS ==========
document.addEventListener('DOMContentLoaded', function() {
    const langSelect = el('lang-select');
    if (langSelect) {
        langSelect.value = window.currentLang;
        langSelect.addEventListener('change', function() {
            updateLanguage(this.value);
        });
    }
    updateLanguage(window.currentLang);
    fetchExchangeRates();
    initCurrencyWidget();
    initLocationSelects();
    initFormLocationSelects();
    initCategorySelect();
    renderSavedFiltersSelect();
    initCategorySidebar();
    initPremiumForm();
    window.currentFilterCategory = 'all';
    el('kategori-listesi')?.querySelector('.kat-grup-baslik[data-kat="all"]')?.classList.add('aktif');
    initProfileTabs();
    checkExpiredAdsAndNotify();
    applyFilters();
    initThemeIcon();
    updateHeaderUI();
    var isSecureOrigin = location.protocol === 'http:' || location.protocol === 'https:';
    if (isSecureOrigin) {
        var link = document.querySelector('link[rel="manifest"]') || document.createElement('link');
        link.rel = 'manifest';
        link.href = 'manifest.json';
        if (!link.parentNode) document.head.appendChild(link);
    }
    if (isSecureOrigin && 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(function() {});
    }
    const hash = location.hash;
    const m = hash && hash.match(/^#ad=(\d+)/);
    if (m) { setTimeout(() => window.ilanDetayAc(parseInt(m[1])), 300); }

    // Profile button - open dropdown
    el('profile-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        const menu = el('user-profile-menu');
        if (menu?.style.display === 'block') hideProfileDropdown();
        else showProfileDropdown();
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-profile-dropdown') && !e.target.closest('#profile-button')) {
            hideProfileDropdown();
        }
    });

    el('profile-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        openProfilePage();
    });
    el('favorites-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        openFavoritesPage();
    });
    el('ads-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        openMyAdsPage();
    });
    el('admin-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        openAdminPage();
    });
    el('back-admin-btn')?.addEventListener('click', function() {
        el('admin-page').style.display = 'none';
    });
    el('admin-reset-ads')?.addEventListener('click', function() {
        if (!isAdmin()) return;
        if (!confirm('Tüm ilanlar silinecek ve 100 varsayılan ilan yüklenecek. Devam?')) return;
        window.adsDatabase = getDefaultAds();
        saveAdsDatabase();
        updateAdminStats();
        renderAdminAds();
        applyFilters();
        showToast('saved', 'success', 2000);
    });
    el('admin-search-ads')?.addEventListener('input', renderAdminAds);
    el('admin-search-ads')?.addEventListener('keyup', renderAdminAds);
    el('admin-search-users')?.addEventListener('input', renderAdminUsers);
    el('admin-search-users')?.addEventListener('keyup', renderAdminUsers);
    el('admin-save-user')?.addEventListener('click', function() {
        if (!isAdmin()) return;
        var rawVal = (el('adm-edit-user-id')?.value || '').trim();
        var id = parseInt(rawVal.replace(/^user\s+/i, ''), 10);
        if (!rawVal || (isNaN(id) && !rawVal)) return;
        if (isNaN(id)) id = rawVal;
        var numId = typeof id === 'number' ? id : parseInt(String(id).replace(/^user\s+/i, ''), 10);
        if (isNaN(numId)) numId = id;
        window.userCredits = window.userCredits || {};
        window.userCredits[numId] = parseInt(el('adm-edit-credit')?.value) || 0;
        const v = (el('adm-edit-verified')?.value || '').trim();
        if (!window.userVerifiedUntil) window.userVerifiedUntil = {};
        if (v) window.userVerifiedUntil[numId] = v; else delete window.userVerifiedUntil[numId];
        const db = window.usersDatabase || {};
        var u = db[id] ?? db[String(id)];
        if (!u) u = Object.values(db).find(function(x) { var xid = x && (x.id || x.userId); return xid == id || String(xid) === String(id) || Number(xid) === id; });
        if (u) {
            u.name = (el('adm-edit-name')?.value || '').trim() || u.name;
            u.email = (el('adm-edit-email')?.value || '').trim() || u.email;
            u.phone = (el('adm-edit-phone')?.value || '').trim() || '';
            u.banned = !!el('adm-edit-banned')?.checked;
            var normId = typeof u.id === 'number' ? u.id : numId;
            if (normId != null && !isNaN(normId)) u.id = normId;
            var oldKey = Object.keys(db).find(function(k) { return db[k] === u; });
            if (oldKey && oldKey !== String(normId)) delete db[oldKey];
            db[String(normId != null ? normId : u.id || id)] = u;
            saveUsersDatabase();
            if (u.banned) {
                const cur = getCurrentUser();
                var curId = cur && (cur.id || cur.userId);
                if (cur && (curId == id || curId == numId || Number(curId) === numId)) { localStorage.removeItem('currentUser'); window.userSession.user = null; updateHeaderUI(); hideProfileDropdown(); }
            }
        }
        saveCredits();
        saveVerified();
        closeAdminUserModal();
        renderAdminUsers();
        updateAdminStats();
        showToast('saved', 'success', 2000);
    });
    el('admin-reject-submit')?.addEventListener('click', function() {
        if (!isAdmin()) return;
        const adId = parseInt(el('adm-reject-ad-id')?.value);
        const reason = (el('adm-reject-reason')?.value || '').trim();
        const ad = window.adsDatabase.find(a => a.id === adId);
        if (!ad) return;
        ad.status = 'rejected';
        ad.rejectReason = reason;
        saveAdsDatabase();
        if (ad.userId) addNotification(ad.userId, 'ad_rejected', 'İlan reddedildi', '"' + ad.title + '" ilanınız reddedildi. Sebep: ' + (reason || '-'), { adId });
        window.closeAdminRejectModal();
        updateAdminStats();
        renderAdminPending();
        showToast('adRejected', 'info', 2000);
    });
    el('adm-copy-message')?.addEventListener('click', function() {
        const ta = el('adm-approve-message');
        if (ta) { ta.select(); navigator.clipboard?.writeText(ta.value); showToast('saved', 'success', 1500); }
    });
    el('adm-approve-confirm')?.addEventListener('click', function() { window.closeAdminApproveModal(); });
    el('admin-save-settings')?.addEventListener('click', function() {
        if (!isAdmin()) return;
        const s = {
            premiumPrices: {
                vitrin: parseInt(el('adm-price-vitrin')?.value) || 5,
                font: parseInt(el('adm-price-font')?.value) || 2,
                urgent: parseInt(el('adm-price-urgent')?.value) || 3,
                stats: parseInt(el('adm-price-stats')?.value) || 4,
                extend: parseInt(el('adm-price-extend')?.value) || 3,
                multicity: parseInt(el('adm-price-multicity')?.value) || 6,
                verified: parseInt(el('adm-price-verified')?.value) || 8
            },
            bumpPrice: parseInt(el('adm-price-bump')?.value) || 2,
            maxPhotos: parseInt(el('adm-max-photos')?.value) || 15,
            maxVideoSeconds: parseInt(el('adm-max-video')?.value) || 30,
            defaultAdDays: parseInt(el('adm-default-days')?.value) || 30,
            extendedAdDays: parseInt(el('adm-extended-days')?.value) || 60,
            whatsappNumber: (el('adm-whatsapp')?.value || '').trim() || '+38970000000',
            viberNumber: (el('adm-viber')?.value || '').trim() || '+38970000000',
            adRequiresApproval: !!el('adm-ad-requires-approval')?.checked
        };
        saveSiteSettings(s);
        updatePremiumLabels();
        showToast('saved', 'success', 2000);
    });
    el('logout-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });

    el('back-profile-btn')?.addEventListener('click', () => {
        el('profile-page').style.display = 'none';
    });
    el('back-favorites-btn')?.addEventListener('click', () => {
        el('favorites-page').style.display = 'none';
    });
    el('back-ads-btn')?.addEventListener('click', () => {
        el('my-ads-page').style.display = 'none';
    });

    el('btnIlanVer')?.addEventListener('click', function(e) {
        e.preventDefault();
        if (!getCurrentUser()) {
            showToast('postAdRequired', 'warning', 2000);
            el('login-modal').style.display = 'flex';
            return;
        }
        el('ilan-modal').style.display = 'flex';
    });

    el('new-ad-from-profile')?.addEventListener('click', function(e) {
        e.preventDefault();
        el('my-ads-page').style.display = 'none';
        el('ilan-modal').style.display = 'flex';
    });

    el('support-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        openSupportModal();
    });
    el('login-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        el('login-modal').style.display = 'flex';
    });
    el('forgot-password')?.addEventListener('click', function(e) {
        e.preventDefault();
        el('login-modal').style.display = 'none';
        el('forgot-modal').style.display = 'flex';
    });
    el('forgot-send-btn')?.addEventListener('click', function() {
        const email = el('forgot-email')?.value?.trim();
        if (!email) { showToast('invalidAmount', 'warning', 2000); return; }
        showToast('resetLinkSent', 'success', 2500);
        el('forgot-email').value = '';
        window.closeForgotModal();
    });

    initBannerClicks();
    el('btn-uygula')?.addEventListener('click', applyFilters);
    el('sort-select')?.addEventListener('change', applyFilters);
    el('btn-save-filter')?.addEventListener('click', openSaveFilterModal);
    el('saved-filters-select')?.addEventListener('change', function() {
        const id = this.value;
        if (!id) return;
        const f = (window.savedFilters || []).find(x => x.id === id);
        if (f && f.state) applyFilterState(f.state);
        this.value = '';
    });
    el('btn-advanced-search')?.addEventListener('click', function() {
        const p = el('advanced-search-panel');
        if (p) p.style.display = p.style.display === 'none' ? 'block' : 'none';
    });
    el('btn-clear-recently')?.addEventListener('click', window.clearRecentlyViewed);
    el('btn-temizle')?.addEventListener('click', function() {
        el('minPrice').value = '';
        el('maxPrice').value = '';
        el('sehir-select').value = '';
        const ilceSelect = el('ilce-select');
        if (ilceSelect) ilceSelect.innerHTML = '<option value="">' + t('districtSelect') + '</option>';
        el('searchInput').value = '';
        qsa('#yeni, #ikinci-el, #cb-sahibi, #cb-galeri').forEach(cb => { if (cb) cb.checked = false; });
        if (el('adv-date')) el('adv-date').value = '';
        if (el('adv-with-photo')) el('adv-with-photo').checked = false;
        if (el('adv-exact-phrase')) el('adv-exact-phrase').checked = false;
        window.bannerFeaturedOnly = false;
        window.filterByCategory('all');
    });

    el('searchInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyFilters();
    });
    el('searchBtn')?.addEventListener('click', applyFilters);

    function applyTheme(isDark) {
        document.body.classList.toggle('dark-theme', isDark);
        document.body.classList.toggle('light-theme', !isDark);
        localStorage.setItem('alsat_theme', isDark ? 'dark' : 'light');
        var icon = document.querySelector('.dark-mode-switch i');
        if (icon) { icon.classList.toggle('fa-moon', isDark); icon.classList.toggle('fa-sun', !isDark); }
        var mobIcon = document.querySelector('.mobile-theme-icon');
        if (mobIcon) { mobIcon.classList.toggle('fa-moon', isDark); mobIcon.classList.toggle('fa-sun', !isDark); }
    }
    function initThemeIcon() {
        var isDark = document.body.classList.contains('dark-theme');
        var icon = document.querySelector('.dark-mode-switch i');
        if (icon) { icon.classList.toggle('fa-moon', isDark); icon.classList.toggle('fa-sun', !isDark); }
        var mobIcon = document.querySelector('.mobile-theme-icon');
        if (mobIcon) { mobIcon.classList.toggle('fa-moon', isDark); mobIcon.classList.toggle('fa-sun', !isDark); }
    }
    el('dark-mode-toggle')?.addEventListener('click', function() {
        var isDark = document.body.classList.contains('dark-theme');
        applyTheme(!isDark);
    });

    function openMobileMenu() {
        var overlay = el('mobile-menu-overlay');
        if (overlay) { overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
        var rates = el('mobile-currency-rates');
        if (rates && window.exchangeRates) {
            var r = window.exchangeRates;
            var html = '';
            if (r.MKD) html += '<div class="mobile-rate-line">1 EUR = ' + r.MKD + ' MKD</div>';
            if (r.TRY) html += '<div class="mobile-rate-line">1 EUR = ' + r.TRY + ' TRY</div>';
            rates.innerHTML = html || '<span class="loading-rates">Yükleniyor...</span>';
        }
    }
    function closeMobileMenu() {
        var overlay = el('mobile-menu-overlay');
        if (overlay) { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
    }
    el('mobile-menu-btn')?.addEventListener('click', openMobileMenu);
    el('mobile-menu-close')?.addEventListener('click', closeMobileMenu);
    el('mobile-menu-overlay')?.addEventListener('click', function(e) {
        if (e.target === this) closeMobileMenu();
    });
    el('mobile-action-theme')?.addEventListener('click', function() {
        var isDark = document.body.classList.contains('dark-theme');
        applyTheme(!isDark);
    });
    el('mobile-action-theme')?.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); } });
    el('mobile-action-support')?.addEventListener('click', function(e) { e.preventDefault(); el('support-btn')?.click(); closeMobileMenu(); });
    el('mobile-action-ilan')?.addEventListener('click', function(e) { e.preventDefault(); el('btnIlanVer')?.click(); closeMobileMenu(); });
    el('mobile-action-login')?.addEventListener('click', function(e) { e.preventDefault(); el('login-modal').style.display = 'flex'; closeMobileMenu(); });
    el('mobile-action-profile')?.addEventListener('click', function(e) { e.preventDefault(); window.openProfilePage?.(); closeMobileMenu(); });
    el('mobile-action-logout')?.addEventListener('click', function(e) { e.preventDefault(); logout(); closeMobileMenu(); });
    el('mobile-action-fav')?.addEventListener('click', function(e) { e.preventDefault(); window.openFavoritesPage?.(); closeMobileMenu(); });
    el('mobile-action-messages')?.addEventListener('click', function(e) { e.preventDefault(); window.openMessagingModal?.(); closeMobileMenu(); });
    el('mobile-action-notif')?.addEventListener('click', function(e) { e.preventDefault(); window.toggleNotifDropdown?.(); closeMobileMenu(); });
    var mobileLang = el('mobile-lang-select');
    if (mobileLang) {
        mobileLang.value = window.currentLang;
        mobileLang.addEventListener('change', function() { updateLanguage(this.value); });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && el('mobile-menu-overlay')?.classList.contains('open')) closeMobileMenu();
    });

    qsa('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modern-modal');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
            }
        });
    });

    // Save profile
    el('save-bio-btn')?.addEventListener('click', function() {
        const user = getCurrentUser();
        if (user) {
            user.bio = el('profile-bio').value;
            setCurrentUser(user);
            const udb = window.usersDatabase?.[user.id];
            if (udb) { udb.bio = user.bio; saveUsersDatabase(); }
            showToast('saved', 'success', 1500);
        }
    });
    el('save-contact-btn')?.addEventListener('click', function() {
        const user = getCurrentUser();
        if (user) {
            user.phone = el('profile-phone').value;
            user.address = el('profile-address').value;
            setCurrentUser(user);
            const udb = window.usersDatabase?.[user.id];
            if (udb) { udb.phone = user.phone; udb.address = user.address; saveUsersDatabase(); }
            showToast('saved', 'success', 1500);
        }
    });

    const loadNotificationSettings = () => {
        const s = JSON.parse(localStorage.getItem('alsat_notifications') || '{"messages":true,"offers":true,"favorites":true}');
        const nm = el('notify-messages'), no = el('notify-offers'), nf = el('notify-favorites');
        if (nm) nm.checked = s.messages;
        if (no) no.checked = s.offers;
        if (nf) nf.checked = s.favorites;
    };
    loadNotificationSettings();
    el('save-notifications-btn')?.addEventListener('click', function() {
        const s = {
            messages: el('notify-messages')?.checked ?? true,
            offers: el('notify-offers')?.checked ?? true,
            favorites: el('notify-favorites')?.checked ?? true
        };
        localStorage.setItem('alsat_notifications', JSON.stringify(s));
        showToast('saved', 'success', 1500);
    });

    // Payment options
    qsa('.payment-option').forEach(btn => {
        btn.addEventListener('click', function() {
            qsa('.payment-option').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            const amount = parseInt(this.dataset.amount);
            const bonus = { 5: 1, 10: 2, 20: 5, 50: 15 }[amount] || 0;
            openPaymentModal(amount, bonus);
        });
    });

    el('custom-payment-btn')?.addEventListener('click', function() {
        const amount = parseInt(el('custom-amount').value);
        if (!amount || amount < 1) {
            showToast('invalidAmount', 'warning', 2000);
            return;
        }
        openPaymentModal(amount, 0);
    });

    // Star rating
    const starRating = el('star-rating');
    if (starRating) {
        starRating.addEventListener('click', function(e) {
            const star = e.target.closest('.star');
            if (!star) return;
            const val = parseInt(star.dataset.value);
            starRating.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('active', i < val));
            el('star-text').textContent = val + ' ' + (window.TRANSLATIONS?.[window.currentLang]?.stars || 'yıldız');
        });
    }

    el('rating-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const adId = parseInt(el('rating-modal')?.dataset?.adId);
        if (!adId) return;
        const ad = window.adsDatabase.find(a => a.id === adId);
        const user = getCurrentUser();
        if (ad && user) {
            const buyerId = user.id;
            const convKey = el('rating-modal')?.dataset?.convKey || Object.keys(window.conversations).find(k => {
                const c = window.conversations[k];
                return c.adId === adId && c.buyerId === buyerId && c.sellerConfirmed && c.buyerConfirmed;
            });
            if (convKey && window.conversations[convKey]) window.conversations[convKey].rated = true;
            saveConversations();
            const actives = document.querySelectorAll('#star-rating .star.active');
            const stars = actives.length ? parseInt(actives[actives.length - 1]?.dataset?.value || 5) : 5;
            const comment = el('rating-comment')?.value || '';
            window.userRatings[ad.userId || 'anon'] = window.userRatings[ad.userId || 'anon'] || [];
            window.userRatings[ad.userId || 'anon'].push({ from: buyerId, stars: stars || 5, comment, adId });
            localStorage.setItem('userRatings', JSON.stringify(window.userRatings));
        }
        showToast('ratingSent', 'success', 2000);
        window.closeRatingModal();
    });

    el('send-message-btn')?.addEventListener('click', sendMessage);
    el('message-input')?.addEventListener('keypress', function(e) { if (e.key === 'Enter') sendMessage(); });

    el('payment-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = getCurrentUser();
        if (!user) return;
        const amount = parseInt(el('payment-modal').dataset.amount || 0);
        const bonus = parseInt(el('payment-modal').dataset.bonus || 0);
        window.userCredits[user.id] = (window.userCredits[user.id] || 0) + amount + bonus;
        saveCredits();
        window.closePaymentModal();
        updateProfilePage(user);
        showToast('paymentSuccess', 'success', 2000);
    });
});
