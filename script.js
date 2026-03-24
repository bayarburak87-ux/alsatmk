/**
 * Alsat - Makedonya İlan Platformu
 * Çok Dilli: TR, EN, MK, AL
 */

// ========== DİL SİSTEMİ ==========
window.currentLang = localStorage.getItem('alsat_lang') || 'mk';

function t(key, subKey) {
    const tr = window.TRANSLATIONS?.[window.currentLang] || window.TRANSLATIONS?.mk || {};
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

function updateMetaTags(title, desc) {
    const L = window.TRANSLATIONS?.[window.currentLang] || window.TRANSLATIONS?.mk || {};
    document.title = title || L.pageTitle || 'Alsat';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && desc) metaDesc.setAttribute('content', desc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title || L.pageTitle || 'Alsat');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && desc) ogDesc.setAttribute('content', desc);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title || L.pageTitle || 'Alsat');
}

function updateLanguage(lang) {
    window.currentLang = lang;
    localStorage.setItem('alsat_lang', lang);
    const htmlLang = lang === 'tr' ? 'tr' : lang === 'en' ? 'en' : lang === 'mk' ? 'mk' : 'sq';
    document.documentElement.lang = htmlLang;
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', htmlLang.replace('-','_') + '_' + htmlLang.toUpperCase());
    var mainLang = document.getElementById('lang-select');
    if (mainLang) mainLang.value = lang;
    var mobLang = document.getElementById('mobile-lang-select');
    if (mobLang) mobLang.value = lang;
    const L = window.TRANSLATIONS?.[lang] || window.TRANSLATIONS?.mk || {};
    const set = (id, prop, val) => { const e = el(id); if (e && val) e[prop] = val; };
    document.title = L.pageTitle || document.title;
    set('searchInput', 'placeholder', L.search);
    set('searchInput', 'aria-label', L.search);
    const searchBtn = el('searchBtn');
    if (searchBtn) searchBtn.setAttribute('aria-label', L.search);
    set('txt-destek', 'textContent', L.support);
    set('dark-mode-toggle', 'title', L.themeToggle);
    set('dark-mode-toggle', 'aria-label', L.themeToggle);
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
    set('mobile-push-txt', 'textContent', (L.enableNotifications || 'Bildirimlere İzin Ver'));
    set('mobile-txt-admin', 'textContent', L.adminPanel || 'Admin Panel');
    set('mobile-menu-title', 'textContent', L.menu || 'Menü');
    set('fav-dropdown-title', 'textContent', L.myFavorites || 'Favoriler');
    set('fav-dropdown-all-txt', 'textContent', L.viewAll || 'Tümünü Gör');
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
    const bannerStore = el('banner-alsat-store-title');
    if (bannerStore) bannerStore.innerHTML = '<i class="fa-solid fa-store"></i> ' + (L.alsatStore || 'Alsat Store');
    const bannerStoreDesc = el('banner-alsat-store-desc');
    if (bannerStoreDesc) bannerStoreDesc.textContent = L.alsatStoreBannerDesc || 'Profesyonel mağazalar, ürünler & değerlendirmeler';
    const labelKat = el('label-kategoriler');
    if (labelKat) labelKat.innerHTML = '<i class="fa-solid fa-layer-group"></i> ' + (L.categories?.all || L.filters || 'Kategoriler');
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
    set('stores-page-title', 'textContent', L.alsatStore || 'Alsat Store');
    set('alsat-store-search', 'placeholder', L.searchProductCategory || 'Ürün, kategori veya marka ara');
    set('alsat-login-txt', 'textContent', L.login || 'Giriş Yap');
    set('alsat-profile-txt', 'textContent', L.profile || 'Profilim');
    set('alsat-cart-txt', 'textContent', L.myCart || 'Sepetim');
    set('nav-kategoriler', 'textContent', L.navCategories || 'Kategoriler');
    set('nav-flash', 'textContent', L.flashProducts || 'Flaş Ürünler');
    set('nav-bestsellers', 'textContent', L.bestsellers || 'Çok Satanlar');
    set('populer-urunler-title', 'textContent', L.popularProducts || 'Popüler Ürünler');
    set('kategori-indirim-title', 'textContent', L.discoverCategoryDiscounts || 'Kategorilerdeki İndirimleri Keşfet');
    set('kampanya-title', 'textContent', L.campaigns || 'Kampanyalar');
    set('tum-urunler-title', 'textContent', L.allProducts || 'Tüm Ürünler');
    const viewAllBtn = el('alsat-view-all-products');
    if (viewAllBtn) viewAllBtn.textContent = L.viewAll || 'Tümünü Gör';
    set('discount-banner-5', 'textContent', L.discount5 || '%5 ve üzeri indirim');
    set('discount-banner-10', 'textContent', L.discount10 || '%10 ve üzeri indirim');
    set('discount-banner-30', 'textContent', L.discount30 || '%30 ve üzeri indirim');
    set('discount-banner-50', 'textContent', L.discount50 || '%50 ve üzeri indirim');
    set('nav-cat-kadin', 'textContent', L.storeCatKadin || 'Kadın');
    set('nav-cat-erkek', 'textContent', L.storeCatErkek || 'Erkek');
    set('nav-cat-anne', 'textContent', L.storeCatAnne || 'Anne & Çocuk');
    set('nav-cat-ev', 'textContent', L.storeCatEv || 'Ev & Yaşam');
    set('nav-cat-super', 'textContent', L.storeCatSuper || 'Süpermarket');
    set('nav-cat-kozmetik', 'textContent', L.storeCatKozmetik || 'Kozmetik');
    set('nav-cat-ayakkabi', 'textContent', L.storeCatAyakkabi || 'Ayakkabı & Çanta');
    set('nav-cat-elektronik', 'textContent', L.storeCatElektronik || 'Elektronik');
    set('nav-cat-saat', 'textContent', L.storeCatSaat || 'Saat & Aksesuar');
    set('nav-cat-spor', 'textContent', L.storeCatSpor || 'Spor & Outdoor');
    set('filter-category-label', 'textContent', L.filterCategory || 'Kategori');
    set('filter-brand-label', 'textContent', L.filterBrand || 'Marka');
    set('filter-category-search', 'placeholder', L.searchCategory || 'Kategori Ara');
    set('filter-brand-search', 'placeholder', L.searchBrand || 'Marka Ara');
    set('quick-high-rated', 'textContent', L.quickHighRated || 'Yüksek Puanlı');
    set('quick-freeship', 'textContent', L.quickFreeship || 'Kargo Bedava');
    set('quick-discount', 'textContent', L.quickDiscount || 'Çok Al Az Öde');
    set('quick-new', 'textContent', L.quickNew || 'Yeni Ürünler');
    set('sort-label-txt', 'textContent', L.sortLabel || 'Sıralama:');
    set('sort-recommended', 'textContent', L.sortRecommended || 'Önerilen');
    set('sort-price-asc', 'textContent', L.sortPriceAsc || 'Fiyat (Düşük-Yüksek)');
    set('sort-price-desc', 'textContent', L.sortPriceDesc || 'Fiyat (Yüksek-Düşük)');
    set('sort-rating', 'textContent', L.sortRating || 'Puana Göre');
    set('sort-newest', 'textContent', L.sortNewest || 'En Yeni');
    const filterClearBtn = el('alsat-filter-clear-btn'); if (filterClearBtn) filterClearBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> ' + (L.filterClear || 'Filtreleri Temizle');
    const filterToggleTxt = el('alsat-filter-toggle-txt'); if (filterToggleTxt) filterToggleTxt.textContent = L.filters || 'Filtreler';
    updateMetaTags(L.pageTitle);
    if (el('kategori-listesi')) initCategorySidebar();
    if (typeof refreshHomepageContent === 'function') refreshHomepageContent();
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
    set('signup-phone-label', 'textContent', L.phone || 'TELEFON');
    set('signup-phone', 'placeholder', L.phonePlaceholder || '+389 70 123 456');
    set('signup-pass-label', 'textContent', L.password);
    set('signup-password', 'placeholder', L.passwordPlaceholder);
    set('signup-confirm-label', 'textContent', L.confirmPassword);
    set('signup-confirm', 'placeholder', L.confirmPlaceholder);
    const agreePrefix = el('agree-prefix');
    const agreeLink = el('open-terms-link');
    const agreeSuffix = el('agree-suffix');
    if (agreePrefix) agreePrefix.textContent = L.agreeTermsPrefix || '';
    if (agreeLink) { agreeLink.textContent = L.termsOfUse || L.termsLink || 'Kullanım koşulları'; agreeLink.title = L.termsModalTitle || ''; }
    if (agreeSuffix) agreeSuffix.textContent = L.agreeTermsSuffix || '';
    set('terms-modal-close', 'textContent', L.modalClose || 'Kapat');
    set('signup-btn-text', 'textContent', L.signupBtn);
    set('back-text', 'textContent', L.back);
    set('login-text', 'textContent', L.haveAccount);
    qsa('#profile-link span').forEach(s => s.textContent = L.myProfile);
    qsa('#favorites-link span').forEach(s => s.textContent = L.myFavorites);
    qsa('#ads-link span').forEach(s => s.textContent = L.myAds);
    qsa('#logout-link span').forEach(s => s.textContent = L.logoutBtn);
    set('profile-page-title', 'textContent', L.myProfile);
    qsa('#back-profile-btn, #back-favorites-btn, #back-ads-btn, #back-stores-btn').forEach(b => { if (b) b.innerHTML = '<i class="fa-solid fa-arrow-left"></i> ' + L.back; });
    qsa('.tab-btn[data-tab="profile-info"]').forEach(b => b.innerHTML = '<i class="fa-solid fa-user"></i> ' + (L.tabProfile || L.profile));
    const tabAccount = document.querySelector('.tab-btn[data-tab="account-settings"]');
    if (tabAccount) tabAccount.innerHTML = '<i class="fa-solid fa-gear"></i> ' + (L.tabSettings || 'Ayarlar');
    const tabPayment = document.querySelector('.tab-btn[data-tab="payment"]');
    if (tabPayment) tabPayment.innerHTML = '<i class="fa-solid fa-credit-card"></i> ' + (L.tabCredit || 'Kredi');
    const tabRatings = document.querySelector('.tab-btn[data-tab="ratings"]');
    if (tabRatings) tabRatings.innerHTML = '<i class="fa-solid fa-star"></i> ' + (L.tabRatings || L.rating || 'Puanlar');
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
    set('txt-taslak-kaydet', 'textContent', L.saveDraft || 'Taslak Kaydet');
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
    set('forgot-code-desc', 'textContent', L.forgotCodeDesc || 'E-postanıza gelen 6 haneli kodu girin ve yeni şifrenizi belirleyin.');
    set('signup-code-desc', 'textContent', L.signupCodeDesc || 'E-postanıza gelen 6 haneli doğrulama kodunu girin.');
    const scTxt = el('signup-send-code-txt');
    if (scTxt) scTxt.textContent = L.sendCodeBtn || 'Doğrulama Kodu Gönder';
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
    window.adsDatabase = [];
    localStorage.setItem('adsDatabase', '[]');
})();

window.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
window.favoriteLists = JSON.parse(localStorage.getItem('alsat_favorite_lists') || '{}');
function saveFavoriteLists() { localStorage.setItem('alsat_favorite_lists', JSON.stringify(window.favoriteLists || {})); }
window.conversations = JSON.parse(localStorage.getItem('conversations') || '{}');
window.notifications = JSON.parse(localStorage.getItem('alsat_notifications_list') || '[]');
window.userRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
window.userCredits = JSON.parse(localStorage.getItem('userCredits') || '{}');
window.userVerifiedUntil = JSON.parse(localStorage.getItem('alsat_verified') || '{}');
window.reportsDatabase = JSON.parse(localStorage.getItem('alsat_reports') || '[]');
window.recentlyViewed = JSON.parse(localStorage.getItem('alsat_recently_viewed') || '[]');
window.searchHistory = JSON.parse(localStorage.getItem('alsat_search_history') || '[]');
window.compareList = JSON.parse(localStorage.getItem('alsat_compare_list') || '[]');
window.storeFavorites = JSON.parse(localStorage.getItem('alsat_store_favorites') || '[]');
window.storeCart = JSON.parse(localStorage.getItem('alsat_store_cart') || '[]');
window.sellerApplications = JSON.parse(localStorage.getItem('alsat_seller_applications') || '[]');
window.storePhotoRequests = JSON.parse(localStorage.getItem('alsat_store_photo_requests') || '[]');
function saveStorePhotoRequests() { localStorage.setItem('alsat_store_photo_requests', JSON.stringify(window.storePhotoRequests || [])); }
window.storeProductRequests = JSON.parse(localStorage.getItem('alsat_store_product_requests') || '[]');
function saveStoreProductRequests() { localStorage.setItem('alsat_store_product_requests', JSON.stringify(window.storeProductRequests || [])); }
window.productQuestions = JSON.parse(localStorage.getItem('alsat_product_questions') || '[]');
function saveProductQuestions() { localStorage.setItem('alsat_product_questions', JSON.stringify(window.productQuestions || [])); }
window.approveStorePhotoRequest = function(id) {
    const req = (window.storePhotoRequests || []).find(r => r.id === id);
    if (!req || req.status !== 'pending') return;
    const store = (window.storesDatabase || []).find(s => s.id === req.storeId);
    if (store) {
        if (req.type === 'cover') store.cover = req.newUrl || '';
        if (req.type === 'logo') store.logo = req.newUrl || '';
        localStorage.setItem('alsat_stores', JSON.stringify(window.storesDatabase));
    }
    req.status = 'approved';
    saveStorePhotoRequests();
    const storeId = req.storeId;
    openStoreDetail(storeId, { adminMode: true });
    showToast(t('photoRequestApproved'), 'success', 2000);
};
window.rejectStorePhotoRequest = function(id) {
    const req = (window.storePhotoRequests || []).find(r => r.id === id);
    if (!req || req.status !== 'pending') return;
    req.status = 'rejected';
    saveStorePhotoRequests();
    const storeId = req.storeId;
    openStoreDetail(storeId, { adminMode: true });
    showToast(t('photoRequestRejected'), 'info', 2000);
};

function saveRecentlyViewed() { localStorage.setItem('alsat_recently_viewed', JSON.stringify(window.recentlyViewed || [])); }
function saveSearchHistory() { localStorage.setItem('alsat_search_history', JSON.stringify((window.searchHistory || []).slice(0, 20))); }
function saveCompareList() { localStorage.setItem('alsat_compare_list', JSON.stringify((window.compareList || []).slice(0, 3))); }
function saveStoreFavorites() { localStorage.setItem('alsat_store_favorites', JSON.stringify(window.storeFavorites || [])); }
function saveStoreCart() { localStorage.setItem('alsat_store_cart', JSON.stringify(window.storeCart || [])); }
function saveSellerApplications() { localStorage.setItem('alsat_seller_applications', JSON.stringify(window.sellerApplications || [])); }
window.userSession = { token: null, user: null };

function saveReports() { localStorage.setItem('alsat_reports', JSON.stringify(window.reportsDatabase || [])); }
window.savedFilters = JSON.parse(localStorage.getItem('alsat_saved_filters') || '[]');
window.priceAlerts = JSON.parse(localStorage.getItem('alsat_price_alerts') || '[]');
function savePriceAlerts() { localStorage.setItem('alsat_price_alerts', JSON.stringify(window.priceAlerts || [])); }
window.searchAlerts = JSON.parse(localStorage.getItem('alsat_search_alerts') || '[]');
function saveSearchAlerts() { localStorage.setItem('alsat_search_alerts', JSON.stringify(window.searchAlerts || [])); }
window.soldSurveyDone = JSON.parse(localStorage.getItem('alsat_sold_survey_done') || '[]');
function saveSoldSurveyDone() { localStorage.setItem('alsat_sold_survey_done', JSON.stringify(window.soldSurveyDone || [])); }
window.adminAuditLog = JSON.parse(localStorage.getItem('alsat_admin_audit_log') || '[]');
function saveAdminAuditLog() { const log = (window.adminAuditLog || []).slice(-500); localStorage.setItem('alsat_admin_audit_log', JSON.stringify(log)); }
function addAdminAudit(action, details) { window.adminAuditLog = window.adminAuditLog || []; window.adminAuditLog.push({ id: Date.now(), action, details, when: new Date().toISOString() }); saveAdminAuditLog(); }
function saveSavedFilters() { localStorage.setItem('alsat_saved_filters', JSON.stringify(window.savedFilters || [])); }

const DEFAULT_SITE_SETTINGS = {
    premiumPrices: { vitrin: 310, font: 125, urgent: 185, stats: 250, extend: 185, multicity: 370, verified: 500 },
    bumpPrice: 125,
    maxPhotos: 15,
    maxVideoSeconds: 30,
    defaultAdDays: 30,
    extendedAdDays: 60,
    whatsappNumber: '+38970000000',
    viberNumber: '+38970000000',
    adRequiresApproval: true,
    sellerAppMsgIntro: '',
    sellerAppMsgConfirm: ''
};

function getSiteSettings() {
    const stored = localStorage.getItem('alsat_site_settings');
    if (!stored) return { ...DEFAULT_SITE_SETTINGS, premiumPrices: { ...DEFAULT_SITE_SETTINGS.premiumPrices } };
    var parsed;
    try { parsed = JSON.parse(stored); } catch (e) { return { ...DEFAULT_SITE_SETTINGS, premiumPrices: { ...DEFAULT_SITE_SETTINGS.premiumPrices } }; }
    if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_SITE_SETTINGS, premiumPrices: { ...DEFAULT_SITE_SETTINGS.premiumPrices } };
    return {
        premiumPrices: { ...DEFAULT_SITE_SETTINGS.premiumPrices, ...(parsed.premiumPrices || {}) },
        bumpPrice: parsed.bumpPrice ?? DEFAULT_SITE_SETTINGS.bumpPrice,
        whatsappNumber: parsed.whatsappNumber ?? DEFAULT_SITE_SETTINGS.whatsappNumber,
        viberNumber: parsed.viberNumber ?? DEFAULT_SITE_SETTINGS.viberNumber,
        adRequiresApproval: parsed.adRequiresApproval ?? DEFAULT_SITE_SETTINGS.adRequiresApproval,
        maxPhotos: parsed.maxPhotos ?? DEFAULT_SITE_SETTINGS.maxPhotos,
        maxVideoSeconds: parsed.maxVideoSeconds ?? DEFAULT_SITE_SETTINGS.maxVideoSeconds,
        defaultAdDays: parsed.defaultAdDays ?? DEFAULT_SITE_SETTINGS.defaultAdDays,
        extendedAdDays: parsed.extendedAdDays ?? DEFAULT_SITE_SETTINGS.extendedAdDays,
        sellerAppMsgIntro: parsed.sellerAppMsgIntro ?? DEFAULT_SITE_SETTINGS.sellerAppMsgIntro,
        sellerAppMsgConfirm: parsed.sellerAppMsgConfirm ?? DEFAULT_SITE_SETTINGS.sellerAppMsgConfirm
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
    (window.searchAlerts || []).forEach(function(a) { if (a?.userId) ids.add(Number(a.userId)); });
    Object.keys(window.userCredits || {}).forEach(id => ids.add(Number(id)));
    Object.keys(window.userVerifiedUntil || {}).forEach(id => ids.add(Number(id)));
    Object.keys(window.usersDatabase || {}).forEach(id => ids.add(Number(id)));
    const cur = getCurrentUser();
    if (cur && cur.id) ids.add(Number(cur.id));
    return [...ids];
}

function getOrCreateUser(id, email, name, phone) {
    if (!window.usersDatabase) loadUsersDatabase();
    const uid = Number(id);
    if (window.usersDatabase[uid]) return window.usersDatabase[uid];
    const u = { id: uid, email: email || '', name: name || 'Kullanıcı', phone: phone || '', address: '', bio: '', banned: false, createdAt: new Date().toISOString() };
    window.usersDatabase[uid] = u;
    saveUsersDatabase();
    return u;
}

// Admin panel - info@alsatmk.com (veya ?admin=1 ile giriş yapmış herkes)
var ADMIN_EMAIL = 'info@alsatmk.com';
function isAdmin() {
    const u = getCurrentUser();
    if (!u) return false;
    if (u.isAdmin === true) return true;
    if (localStorage.getItem('alsat_admin_ok') === '1') return true;
    var em = (u.email || '').toLowerCase().trim();
    if (!em && u.id && window.usersDatabase) {
        const udb = window.usersDatabase[u.id];
        if (udb && udb.email) em = (udb.email || '').toLowerCase().trim();
    }
    if (!em) return false;
    if (em.indexOf('info@alsatmk.com') >= 0) return true;
    var adminEm = (window.ADMIN_EMAIL || ADMIN_EMAIL || 'info@alsatmk.com').toLowerCase().trim();
    return em === adminEm;
}

// Alsat Store - sadece admin görebilir; kullanıcılar sadece 2. el ilanlara odaklanır
function updateStoreVisibility() {
    const show = isAdmin();
    const banner = el('homepage-alsat-store-banner');
    if (banner) banner.style.display = show ? '' : 'none';
    const listingBanner = el('banner-alsat-store');
    if (listingBanner) listingBanner.style.display = show ? '' : 'none';
    const cbGaleri = el('cb-galeri');
    const galeriLabel = cbGaleri?.closest('label.inline-check');
    if (galeriLabel) galeriLabel.style.display = show ? '' : 'none';
    if (!show && cbGaleri) cbGaleri.checked = false;
    if (!show) {
        const sp = el('stores-page'), cart = el('cart-page'), storeDetail = el('store-detail-page'), productDetail = el('product-detail-page');
        if (sp?.style.display === 'block' || cart?.style.display === 'block' || storeDetail?.style.display === 'block' || productDetail?.style.display === 'block') {
            [sp, cart, storeDetail, productDetail].forEach(p => { if (p) p.style.display = 'none'; });
            el('homepage-view')?.style.setProperty('display', 'block');
            el('listing-view')?.style.setProperty('display', 'none');
        }
    }
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
    },
    job: { cats: ['İş İlanları'],
        fields: [
            { key: 'jobType', label: 'jobType', type: 'select', options: (window.JOB_ATTRS && window.JOB_ATTRS.jobType) || ['Tam Zamanlı', 'Yarı Zamanlı', 'Staj', 'Freelance', 'Proje Bazlı'] },
            { key: 'experience', label: 'experience', type: 'select', options: (window.JOB_ATTRS && window.JOB_ATTRS.experience) || ['Deneyimsiz', '1-2 yıl', '3-5 yıl', '5-10 yıl', '10+ yıl'] },
            { key: 'education', label: 'education', type: 'select', options: (window.JOB_ATTRS && window.JOB_ATTRS.education) || ['Lise', 'Ön Lisans', 'Lisans', 'Yüksek Lisans', 'Doktora'] },
            { key: 'workMode', label: 'workMode', type: 'select', options: (window.JOB_ATTRS && window.JOB_ATTRS.workMode) || ['Ofis', 'Uzaktan', 'Hibrit'] },
            { key: 'company', label: 'company', type: 'text', placeholder: 'Şirket adı' },
            { key: 'salaryMin', label: 'minSalary', type: 'number', placeholder: 'Min Maaş MKD' },
            { key: 'salaryMax', label: 'salaryMaxLabel', type: 'number', placeholder: 'Max Maaş MKD' },
            { key: 'benefits', label: 'benefitsLabel', type: 'text', placeholder: 'Yan haklar (sigorta, yemek vb.)' },
            { key: 'requirements', label: 'requirementsLabel', type: 'text', placeholder: 'Aranan nitelikler' }
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
    const amt = parseFloat(el('currency-amount')?.value) || 1;
    if (elt) elt.textContent = amt + ' EUR';
    const ratesDiv = el('currency-rates');
    if (ratesDiv) ratesDiv.innerHTML = '<div class="rate-line">1 EUR = ' + (r.MKD || 61.5).toFixed(2) + ' MKD</div><div class="rate-line">1 EUR = ' + (r.TRY || 35).toFixed(2) + ' TRY</div>';
    updateCurrencyConverter();
}
function updateCurrencyConverter() {
    const r = window.exchangeRates || { EUR: 1, MKD: 61.5, TRY: 35 };
    const amount = parseFloat(el('currency-amount')?.value) || 1;
    const mkd = (amount * (r.MKD || 61.5)).toFixed(2);
    const try_ = (amount * (r.TRY || 35)).toFixed(2);
    const resEl = el('currency-result-multi');
    if (resEl) resEl.innerHTML = '<span class="rate-mkd">' + mkd + ' MKD</span><span class="rate-sep">, </span><span class="rate-try">' + try_ + ' TRY</span>';
    const dispEl = el('currency-display');
    if (dispEl) dispEl.textContent = amount + ' EUR';
}
function initCurrencyWidget() {
    const w = el('currency-widget');
    const dd = el('currency-dropdown');
    if (!w || !dd) return;
    updateCurrencyDisplay();
    updateCurrencyConverter();
    w.addEventListener('click', function(e) {
        e.stopPropagation();
        if (e.target.closest('#currency-dropdown')) return;
        dd.classList.toggle('open');
    });
    dd.addEventListener('click', function(e) { e.stopPropagation(); });
    dd.addEventListener('mousedown', function(e) { e.stopPropagation(); });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#currency-widget')) dd?.classList.remove('open');
    });
    var amtEl = el('currency-amount');
    if (amtEl) {
        amtEl.addEventListener('input', updateCurrencyConverter);
        amtEl.addEventListener('change', updateCurrencyConverter);
        amtEl.addEventListener('focus', function() { dd.classList.add('open'); });
    }
}
window.openSupportModal = function() { var m = el('support-modal'); if (m) { m.style.display = 'flex'; m.classList.add('active'); document.body.style.overflow = 'hidden'; } };
window.closeSupportModal = function() { var m = el('support-modal'); if (m) { m.style.display = 'none'; m.classList.remove('active'); document.body.style.overflow = ''; } };

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
    if (window.innerWidth <= 768) { window.openMobileNotifModal?.(); return; }
    const dd = el('notif-dropdown');
    if (!dd) return;
    if (dd.style.display === 'block') { dd.style.display = 'none'; return; }
    dd.style.display = 'block';
    renderNotifList();
    document.addEventListener('click', function closeNotif(e) {
        if (!e.target.closest('#notif-container')) { dd.style.display = 'none'; document.removeEventListener('click', closeNotif); }
    });
};
window.openMobileNotifModal = function() {
    renderNotifList();
    const titleEl = el('mobile-notif-title');
    if (titleEl) titleEl.textContent = t('notifications') || 'Bildirimler';
    const m = el('mobile-notif-modal');
    if (m) { m.style.display = 'flex'; m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
};
window.closeMobileNotifModal = function() {
    const m = el('mobile-notif-modal');
    if (m) { m.style.display = 'none'; m.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
};
function renderNotifList() {
    const user = getCurrentUser();
    const items = user ? (window.notifications || []).filter(n => n.userId === user.id).slice(-20).reverse() : [];
    const emptyHtml = '<p class="empty-state" style="padding:20px;color:var(--text-muted);">Bildirim yok</p>';
    const itemHtml = items.length === 0 ? emptyHtml : items.map(n => {
        let extra = '';
        if (n.type === 'message' && n.data?.convKey) extra = 'window.openMessagingModal(\'' + n.data.convKey + '\');window.closeMobileNotifModal&&window.closeMobileNotifModal();';
        else if (n.type === 'store_qa' && n.data?.storeId) extra = 'window.openStoreDetailWithQa&&window.openStoreDetailWithQa(' + n.data.storeId + ');window.closeMobileNotifModal&&window.closeMobileNotifModal();';
        else if (n.type === 'search_alert' && n.data?.adIds && n.data.adIds[0]) extra = 'showListingPage();setTimeout(function(){window.ilanDetayAc&&window.ilanDetayAc(' + n.data.adIds[0] + ');},400);window.closeMobileNotifModal&&window.closeMobileNotifModal();';
        return `<div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n.id}" onclick="markNotifRead(${n.id});window.closeMobileNotifModal&&window.closeMobileNotifModal();${extra}" role="button" tabindex="0">` +
            `<strong>${escapeHtml(n.title)}</strong><p>${escapeHtml(n.body)}</p></div>`;
    }).join('');
    const list = el('notif-list');
    if (list) list.innerHTML = itemHtml;
    const mobList = el('mobile-notif-list');
    if (mobList) mobList.innerHTML = itemHtml;
}
window.markNotifRead = function(id) {
    const n = (window.notifications || []).find(x => x.id === id);
    if (n) { n.read = true; saveNotifications(); updateNotifBadge(); updateMsgBadge(); renderNotifList(); }
};

function renderFavDropdown() {
    var list = el('fav-dropdown-list');
    var dd = el('fav-dropdown');
    if (!list || !dd) return;
    var favs = (window.adsDatabase || []).filter(function(a) { return (window.favorites || []).indexOf(a.id) >= 0; });
    if (favs.length === 0) {
        list.innerHTML = '<p class="fav-dropdown-empty">' + (t('noFavorites') || 'Henüz favori yok') + '</p>';
        return;
    }
    list.innerHTML = favs.slice(0, 8).map(function(ad) {
        var imgSrc = (ad.images && ad.images[0]) || ad.image || '';
        var title = (ad.title || '').slice(0, 35);
        return '<div class="fav-dropdown-item" data-id="' + ad.id + '" onclick="if(!event.target.closest(\'.fav-dropdown-remove\')){window.ilanDetayAc(' + ad.id + ');el(\'fav-dropdown\').style.display=\'none\';}">' +
            '<img src="' + imgSrc + '" alt="">' +
            '<span class="fav-dropdown-item-title">' + escapeHtml(title) + (ad.title && ad.title.length > 35 ? '...' : '') + '</span>' +
            '<span class="fav-dropdown-item-price">' + formatPrice(ad) + '</span>' +
            '<button type="button" class="fav-dropdown-remove" title="' + (t('removeFromFavorites') || 'Favorilerden kaldır') + '" data-id="' + ad.id + '"><i class="fa-solid fa-trash-can"></i></button>' +
            '</div>';
    }).join('');
}
window.toggleFavDropdown = function() {
    var dd = el('fav-dropdown');
    if (!dd) return;
    if (dd.style.display === 'block') { dd.style.display = 'none'; return; }
    renderFavDropdown();
    dd.style.display = 'block';
    document.addEventListener('click', function closeFav(e) {
        if (!e.target.closest('#fav-container')) { dd.style.display = 'none'; document.removeEventListener('click', closeFav); }
    });
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
    var u = null;
    try { u = JSON.parse(sessionStorage.getItem('alsat_currentUser') || 'null'); } catch(e) {}
    if (!u) try { u = JSON.parse(localStorage.getItem('alsat_currentUser') || 'null'); } catch(e) {}
    if (!u) return null;
    const db = window.usersDatabase || {};
    const udb = db[u.id];
    if (udb && udb.banned) return null;
    return u;
}

function setCurrentUser(user, remember) {
    if (remember === undefined) {
        remember = !!localStorage.getItem('alsat_currentUser');
    }
    sessionStorage.removeItem('alsat_currentUser');
    localStorage.removeItem('alsat_currentUser');
    if (remember) {
        localStorage.setItem('alsat_currentUser', JSON.stringify(user));
    } else {
        sessionStorage.setItem('alsat_currentUser', JSON.stringify(user));
    }
    window.userSession.user = user;
}

function logout() {
    if (window.API_BASE && window.AlsatAPI && typeof window.AlsatAPI.logout === 'function') {
        window.AlsatAPI.logout();
    }
    sessionStorage.removeItem('alsat_currentUser');
    localStorage.removeItem('alsat_currentUser');
    window.userSession.user = null;
    updateHeaderUI();
    hideProfileDropdown();
    showToast('logout', 'info', 2000);
}
window.logout = logout;

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
    var mobileAdmin = el('mobile-action-admin');
    var mobileLogout = el('mobile-action-logout');
    var mobileMsg = el('mobile-action-messages');
    var mobileNotif = el('mobile-action-notif');
    var mobileFavBadge = el('mobile-fav-badge');
    var mobileMsgBadge = el('mobile-msg-badge');
    var mobileNotifBadge = el('mobile-notif-badge');

    const adminHeaderBtn = el('admin-header-btn');
    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileBtn) profileBtn.style.display = 'flex';
        if (adminHeaderBtn) adminHeaderBtn.style.display = isAdmin() ? 'flex' : 'none';
        const profileTxt = el('profile-text');
        if (profileTxt) profileTxt.textContent = user.name || t('profile');
        const mobileProfileTxt = el('mobile-profile-text');
        if (mobileProfileTxt) mobileProfileTxt.textContent = user.name || t('profile');
        if (logoutBtn) logoutBtn.style.display = 'flex';
        if (msgBtn) msgBtn.style.display = 'flex';
        const notifContainer = el('notif-container');
        if (notifContainer) notifContainer.style.display = 'block';
        if (favBadge) favBadge.textContent = String((window.favorites?.length || 0) + (isAdmin() ? (window.storeFavorites?.length || 0) : 0));
        if (mobileLogin) mobileLogin.style.display = 'none';
        if (mobileProfile) mobileProfile.style.display = 'flex';
        if (mobileAdmin) mobileAdmin.style.display = isAdmin() ? 'flex' : 'none';
        if (mobileLogout) mobileLogout.style.display = 'flex';
        if (mobileMsg) mobileMsg.style.display = 'flex';
        if (mobileNotif) mobileNotif.style.display = 'flex';
        if (mobileFavBadge) { mobileFavBadge.textContent = String((window.favorites?.length || 0) + (isAdmin() ? (window.storeFavorites?.length || 0) : 0)); mobileFavBadge.style.display = ''; }
        updateMsgBadge();
        updateNotifBadge();
        var hMsg = el('msg-badge');
        if (mobileMsgBadge && hMsg) { mobileMsgBadge.textContent = hMsg.textContent || '0'; mobileMsgBadge.style.display = (hMsg.textContent && parseInt(hMsg.textContent, 10) > 0) ? '' : 'none'; }
        var hNotif = el('notif-badge');
        if (mobileNotifBadge && hNotif) { mobileNotifBadge.textContent = hNotif.textContent || '0'; mobileNotifBadge.style.display = (hNotif.textContent && parseInt(hNotif.textContent, 10) > 0) ? '' : 'none'; }
        const pushPrompt = el('mobile-push-prompt');
        if (pushPrompt && typeof Notification !== 'undefined') {
            pushPrompt.style.display = Notification.permission === 'default' ? 'flex' : 'none';
        }
        const sp = el('stores-page');
        if (sp && sp.style.display === 'block') {
            const loginTxt = el('alsat-login-txt');
            if (loginTxt) loginTxt.textContent = user.name || (window.TRANSLATIONS?.[window.currentLang]?.profile || 'Profilim');
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'flex';
        if (profileBtn) profileBtn.style.display = 'none';
        if (adminHeaderBtn) adminHeaderBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (msgBtn) msgBtn.style.display = 'none';
        const notifContainer = el('notif-container');
        if (notifContainer) notifContainer.style.display = 'none';
        if (favBadge) favBadge.textContent = '0';
        if (mobileLogin) mobileLogin.style.display = 'flex';
        if (mobileProfile) mobileProfile.style.display = 'none';
        if (mobileAdmin) mobileAdmin.style.display = 'none';
        if (mobileLogout) mobileLogout.style.display = 'none';
        if (mobileMsg) mobileMsg.style.display = 'none';
        if (mobileNotif) mobileNotif.style.display = 'none';
        const pushPromptOff = el('mobile-push-prompt');
        if (pushPromptOff) pushPromptOff.style.display = 'none';
        if (mobileFavBadge) mobileFavBadge.textContent = '0';
        if (mobileMsgBadge) mobileMsgBadge.style.display = 'none';
        if (mobileNotifBadge) mobileNotifBadge.style.display = 'none';
        const sp2 = el('stores-page');
        if (sp2 && sp2.style.display === 'block') {
            const loginTxt2 = el('alsat-login-txt');
            if (loginTxt2) loginTxt2.textContent = window.TRANSLATIONS?.[window.currentLang]?.login || 'Giriş Yap';
        }
    }
    updateStoreVisibility();
}

// ========== PROFILE DROPDOWN ==========
function showProfileDropdown() {
    const user = getCurrentUser();
    if (!user) return;
    const menu = el('user-profile-menu');
    if (menu) {
        el('profile-dropdown-name').textContent = user.name || t('user');
        const profileTxt = el('profile-text');
        if (profileTxt) profileTxt.textContent = user.name || t('profile');
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
    const badge = el('admin-seller-apps-badge');
    if (badge) badge.textContent = (window.sellerApplications || []).filter(a => a.status === 'pending').length;
    const prBadge = el('admin-product-requests-badge');
    if (prBadge) prBadge.textContent = (window.storeProductRequests || []).filter(r => r.status === 'pending').length;
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
        list.innerHTML = '<p class="admin-empty">' + t('noReports') + '</p>';
        return;
    }
    list.innerHTML = reports.map(r => {
        const ad = window.adsDatabase?.find(a => a.id === r.adId);
        const statusClass = r.status === 'resolved' ? 'report-resolved' : '';
        return `<div class="admin-report-row ${statusClass}" data-id="${r.id}">
            <div class="admin-report-info">
                <strong>${escapeHtml(r.adTitle || t('adDeletedTitle'))}</strong>
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
    if (r) { r.status = 'resolved'; saveReports(); addAdminAudit('report_resolved', (typeof t('reportResolvedWithId') === 'string' ? t('reportResolvedWithId').replace('{0}', reportId) : t('reportResolved'))); renderAdminReports(); renderAdminAnalytics(); showToast('saved', 'success', 2000); }
}

function toWhatsAppPhone(phone) {
    if (!phone) return '';
    let num = String(phone).replace(/\D/g, '');
    if (num.startsWith('389') && num.length >= 9) return num;
    if (num.startsWith('0')) num = '389' + num.slice(1);
    else if (num.length === 9 && (num.startsWith('7') || num.startsWith('2'))) num = '389' + num;
    else if (num.length < 9) return '';
    return num.startsWith('389') ? num : '389' + num;
}

function getSellerAppWhatsAppMessage(app, isConfirm) {
    const ss = getSiteSettings();
    const L = window.TRANSLATIONS?.[window.currentLang || 'mk'] || window.TRANSLATIONS?.mk || {};
    const catLabels = { kadin: L.storeCatKadin||'Kadın', erkek: L.storeCatErkek||'Erkek', 'anne-cocuk': L.storeCatAnne||'Anne & Çocuk', 'ev-yasam': L.storeCatEv||'Ev & Yaşam', supermarket: L.storeCatSuper||'Süpermarket', kozmetik: L.storeCatKozmetik||'Kozmetik', 'ayakkabi-canta': L.storeCatAyakkabi||'Ayakkabı & Çanta', elektronik: L.storeCatElektronik||'Elektronik', 'saat-aksesuar': L.storeCatSaat||'Saat & Aksesuar', spor: L.storeCatSpor||'Spor & Outdoor' };
    const companyTypeLabel = app.companyType === 'sahis' ? (L.sellerAppSahis||'Şahıs') : (L.sellerAppKurumsal||'Kurumsal');
    const city = (typeof tCity === 'function' ? tCity(app.district || app.city || '') : null) || app.district || app.city || '-';
    const defaultConfirm = 'Mağazanızın güvenilirliği ve size yardımcı olabilmemiz için ürünlerinize ait en az bir (1) fotoğraf göndermenizi rica ediyoruz. Fotoğrafı aldıktan sonra mağaza durumunuz işlem sırasına alınacaktır. Teşekkür ederiz.';
    const defaultIntro = 'Merhabalar 😊 Sizlere alsat.com.mk\'dan yazıyorum. Öncelikle bizleri tercih ettiğiniz için teşekkür ederiz 💐 Mağazanız ile alakalı bilgileri onaylamanızı rica ediyoruz:';
    if (isConfirm) {
        return (ss.sellerAppMsgConfirm || L.sellerAppMsgConfirm || defaultConfirm).trim() || defaultConfirm;
    }
    const intro = (ss.sellerAppMsgIntro || L.sellerAppMsgIntro || defaultIntro).trim() || defaultIntro;
    const lines = [
        (L.sellerAppStoreName||'Mağaza adı') + ': ' + (app.company || '-'),
        (L.sellerAppCategory||'Satılacak ürün kategorisi') + ': ' + (catLabels[app.category] || app.category || '-'),
        (L.sellerAppCompanyType||'Şirket türü') + ': ' + companyTypeLabel,
        (L.sellerAppCity||'İl') + ': ' + city,
        (L.sellerAppDistrict||'İlçe') + ': ' + (app.district && app.district !== app.city ? (typeof tDistrict === 'function' ? tDistrict(app.district) : app.district) : '-'),
        (L.sellerAppRef||'Referans kodu') + ': ' + (app.ref || '-'),
        (L.sellerAppEmail||'E-posta') + ': ' + (app.email || '-')
    ];
    return intro + '\n\n' + lines.join('\n') + '\n\n' + (L.sellerAppPleaseConfirm||'Bu bilgiler size ait ise lütfen onaylayınız.').trim();
}

function renderAdminSellerApps() {
    if (!isAdmin()) return;
    const list = el('admin-seller-apps-list');
    const badge = el('admin-seller-apps-badge');
    if (!list) return;
    const apps = (window.sellerApplications || []).sort((a,b) => (b.id || 0) - (a.id || 0));
    const pendingCount = apps.filter(a => a.status === 'pending').length;
    if (badge) badge.textContent = pendingCount;
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    const catLabels = { kadin: L.storeCatKadin||'Kadın', erkek: L.storeCatErkek||'Erkek', 'anne-cocuk': L.storeCatAnne||'Anne & Çocuk', 'ev-yasam': L.storeCatEv||'Ev & Yaşam', supermarket: L.storeCatSuper||'Süpermarket', kozmetik: L.storeCatKozmetik||'Kozmetik', 'ayakkabi-canta': L.storeCatAyakkabi||'Ayakkabı & Çanta', elektronik: L.storeCatElektronik||'Elektronik', 'saat-aksesuar': L.storeCatSaat||'Saat & Aksesuar', spor: L.storeCatSpor||'Spor & Outdoor' };
    const statusLabels = { pending: L.sellerAppPending||'Beklemede', approved: L.sellerAppApproved||'Onaylandı', rejected: L.sellerAppRejected||'Reddedildi' };
    const companyTypeLabels = { sahis: L.sellerAppSahis||'Şahıs', kurumsal: L.sellerAppKurumsal||'Kurumsal' };
    if (apps.length === 0) {
        list.innerHTML = '<p class="admin-empty">' + (L.sellerAppEmpty||'Henüz satıcı başvurusu yok') + '</p>';
        return;
    }
    const trackLabels = { waReplied: L.sellerTrackWaReplied||'WhatsApp geri dönüş', storeApproved: L.sellerTrackStoreApproved||'Mağazayı onayladı', msg2Sent: L.sellerTrackMsg2||'2. mesaj gönderildi', photoSent: L.sellerTrackPhoto||'Ürün fotoğrafı gönderdi', storeCreated: L.sellerTrackStoreCreated||'Mağaza oluşturuldu' };
    list.innerHTML = apps.map(a => {
        const waPhone = toWhatsAppPhone(a.phone);
        const waMsg = encodeURIComponent(getSellerAppWhatsAppMessage(a, false));
        const waHref = waPhone ? `https://wa.me/${waPhone}?text=${waMsg}` : '#';
        const mailHref = a.email ? 'mailto:' + encodeURIComponent(a.email) : '#';
        const toggleTrack = (field) => { const app = (window.sellerApplications||[]).find(x=>String(x.id)===String(a.id)); if(app){ app[field]=!app[field]; saveSellerApplications(); renderAdminSellerApps(); } };
        const tracks = ['waReplied','storeApproved','msg2Sent','photoSent','storeCreated'].map(f => 
            `<label class="admin-seller-track"><input type="checkbox" ${a[f]?'checked':''} onchange="(function(){const app=(window.sellerApplications||[]).find(x=>String(x.id)==='${a.id}');if(app){app.${f}=!app.${f};saveSellerApplications();renderAdminSellerApps();}})()"> ${trackLabels[f]}</label>`
        ).join('');
        return `
        <div class="admin-seller-app-row" data-id="${a.id}">
            <div class="admin-seller-app-info">
                <strong>${escapeHtml(a.company || '-')}</strong>
                <span>${escapeHtml(a.email || '-')} · ${escapeHtml(a.phone || '-')}</span>
                <span>${L.category||'Kategori'}: ${catLabels[a.category] || a.category || '-'} · ${companyTypeLabels[a.companyType] || '-'}</span>
                <span style="font-size:12px;color:var(--text-muted);">${new Date(a.createdAt).toLocaleString('tr-TR')} · ${statusLabels[a.status] || a.status}</span>
                ${a.rejectReason ? '<span style="font-size:12px;color:#dc3545;">Red sebebi: ' + escapeHtml(a.rejectReason) + '</span>' : ''}
                <div class="admin-seller-tracks">${tracks}</div>
            </div>
            <div class="admin-seller-app-actions">
                ${a.email ? `<a href="${mailHref}" class="admin-btn-small" style="background:#6c757d;color:white;text-decoration:none;"><i class="fa-solid fa-envelope"></i> ${L.sellerAppEmailBtn||'E-posta'}</a>` : ''}
                <a href="${waHref}" target="_blank" rel="noopener" class="admin-btn-small" style="background:#25D366;color:white;text-decoration:none;"><i class="fa-brands fa-whatsapp"></i> ${L.sellerAppContactWhatsApp||'WhatsApp'}</a>
                ${a.status === 'pending' ? `
                <button type="button" class="admin-btn-small" onclick="window.openSellerAppApproveModal('${a.id}'); return false;"><i class="fa-solid fa-check"></i> ${L.sellerAppApprove||'Onayla'}</button>
                <button type="button" class="admin-btn-small" style="color:#dc3545" onclick="window.openSellerAppRejectModal('${a.id}'); return false;"><i class="fa-solid fa-times"></i> ${L.sellerAppReject||'Reddet'}</button>` : ''}
            </div>
        </div>`;
    }).join('');
}

function adminSellerAppStatus(appId, status, rejectReason) {
    if (!isAdmin()) return;
    const app = (window.sellerApplications || []).find(x => String(x.id) === String(appId));
    if (!app) return;
    app.status = status;
    if (status === 'rejected' && rejectReason) app.rejectReason = rejectReason;
    saveSellerApplications();
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    const userByEmail = app.email ? Object.values(window.usersDatabase || {}).find(u => (u.email || '').toLowerCase() === (app.email || '').toLowerCase()) : null;
    const userId = userByEmail?.id;
    if (status === 'approved' && userId) {
        addNotification(userId, 'seller_approved', L.sellerAppApprovedNotifTitle||'Satıcı başvurunuz onaylandı', L.sellerAppApprovedNotifBody||'Mağaza başvurunuz onaylandı. En kısa sürede sizinle iletişime geçeceğiz.', { appId: app.id });
        if (typeof updateNotifBadge === 'function') updateNotifBadge();
    } else if (status === 'rejected' && userId) {
        addNotification(userId, 'seller_rejected', L.sellerAppRejectedNotifTitle||'Satıcı başvurunuz reddedildi', (L.sellerAppRejectedNotifBody||'Mağaza başvurunuz reddedildi. Sebep: ') + (app.rejectReason || '-'), { appId: app.id });
        if (typeof updateNotifBadge === 'function') updateNotifBadge();
    }
    renderAdminSellerApps();
    showToast(status === 'approved' ? (L.sellerAppApprovedToast||'Başvuru onaylandı') : (L.sellerAppRejectedToast||'Başvuru reddedildi'), 'info', 2000);
}

async function renderAdminOnlineUsers() {
    if (!isAdmin()) return;
    const totalEl = el('admin-online-total');
    const ipsEl = el('admin-online-ips');
    const tbody = el('admin-online-tbody');
    const badge = el('admin-online-badge');
    if (totalEl) totalEl.textContent = '...';
    if (ipsEl) ipsEl.textContent = '...';
    if (tbody) tbody.innerHTML = '<tr><td colspan="4">Yükleniyor...</td></tr>';
    let data = { total: 0, uniqueIps: 0, users: [] };
    if (window.API_BASE && window.AlsatAPI?.getOnlineUsers) {
        try {
            const token = localStorage.getItem('alsat_admin_token') || '';
            data = await window.AlsatAPI.getOnlineUsers(token);
        } catch (e) {}
    }
    if (totalEl) totalEl.textContent = data.total;
    if (ipsEl) ipsEl.textContent = data.uniqueIps;
    if (badge) badge.textContent = data.total;
    if (tbody) {
        if (data.users.length === 0) tbody.innerHTML = '<tr><td colspan="4">Şu an sitede kimse yok veya API bağlı değil.</td></tr>';
        else tbody.innerHTML = data.users.map(u => {
            const last = u.lastActivity ? new Date(u.lastActivity).toLocaleString('tr-TR') : '-';
            return `<tr><td><code>${escapeHtml(u.ip || '-')}</code></td><td style="font-size:12px;max-width:200px;overflow:hidden;text-overflow:ellipsis;" title="${escapeHtml(u.userAgent || '')}">${escapeHtml((u.userAgent || '').slice(0, 60))}${(u.userAgent || '').length > 60 ? '...' : ''}</td><td>${u.userId || 'Misafir'}</td><td>${last}</td></tr>`;
        }).join('');
    }
    const refreshBtn = el('admin-refresh-online');
    if (refreshBtn && !refreshBtn.dataset.bound) {
        refreshBtn.dataset.bound = '1';
        refreshBtn.addEventListener('click', () => renderAdminOnlineUsers());
    }
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

function renderAdminPlatform() {
    const alerts = window.searchAlerts || [];
    const cntEl = el('admin-search-alerts-count');
    const listEl = el('admin-search-alerts-list');
    if (cntEl) cntEl.textContent = alerts.length + ' kayıtlı arama bildirimi';
    if (listEl) listEl.innerHTML = alerts.length === 0 ? '<p class="admin-empty">' + t('none') + '</p>' : alerts.map(a => {
        const u = Object.values(window.usersDatabase || {}).find(u => u.id === a.userId);
        const s = a.state || {};
        return `<div style="padding:10px;border:1px solid var(--border-color);border-radius:8px;margin-bottom:8px;font-size:13px;">${escapeHtml(u?.email || u?.name || 'User '+a.userId)} · "${(s.search||'-')}" · ${s.city||'Tümü'} · ${s.category||'all'}</div>`;
    }).join('');

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    const soldByUser = {};
    (window.adsDatabase || []).filter(a => a.status === 'sold' && a.soldAt && new Date(a.soldAt) >= cutoff && a.userId).forEach(a => { soldByUser[a.userId] = (soldByUser[a.userId] || 0) + 1; });
    const fastSellers = Object.entries(soldByUser).filter(([,c]) => c >= 2).sort((a,b) => b[1] - a[1]);
    const fsCnt = el('admin-fast-sellers-count');
    const fsList = el('admin-fast-sellers-list');
    if (fsCnt) fsCnt.textContent = fastSellers.length + ' hızlı satan satıcı';
    if (fsList) fsList.innerHTML = fastSellers.length === 0 ? '<p class="admin-empty">' + t('none') + '</p>' : fastSellers.slice(0, 20).map(([uid, c]) => {
        const u = Object.values(window.usersDatabase || {}).find(x => x.id == uid);
        return `<div style="padding:10px;border:1px solid var(--border-color);border-radius:8px;margin-bottom:8px;font-size:13px;"><strong>${escapeHtml(u?.name || u?.email || 'User '+uid)}</strong> · ${c} satış (son 30 gün)</div>`;
    }).join('');

    const ratings = window.userRatings || {};
    const allRatings = Object.entries(ratings).flatMap(([k, arr]) => (Array.isArray(arr) ? arr : []).map(r => ({ ...r, userId: k })));
    const rCnt = el('admin-ratings-summary');
    const rList = el('admin-ratings-list');
    if (rCnt) rCnt.textContent = allRatings.length + ' toplam değerlendirme';
    if (rList) rList.innerHTML = allRatings.length === 0 ? '<p class="admin-empty">' + t('none') + '</p>' : allRatings.slice(-15).reverse().map(r => {
        const u = Object.values(window.usersDatabase || {}).find(x => x.id == r.userId || x.id == r.from);
        return `<div style="padding:10px;border:1px solid var(--border-color);border-radius:8px;margin-bottom:8px;font-size:13px;">★ ${r.stars || 5} · ${escapeHtml((r.comment||'').slice(0,60))} ${(r.comment||'').length > 60 ? '...' : ''} · ${u?.name || 'User'}</div>`;
    }).join('');

    const done = window.soldSurveyDone || [];
    const ssEl = el('admin-sold-survey-stats');
    if (ssEl) ssEl.textContent = done.length + ' anket tamamlandı (satıldı/hayır)';

    const now = new Date();
    const cutoff30 = new Date(now);
    cutoff30.setDate(cutoff30.getDate() - 30);
    const ads = (window.adsDatabase || []).filter(a => (a.status||'approved')==='approved' && a.price > 0 && (!a.expiryAt || new Date(a.expiryAt) >= now) && new Date(a.createdAt) >= cutoff30);
    const byCat = {};
    const r = window.exchangeRates || { EUR: 1, MKD: 61.5, TRY: 35 };
    ads.forEach(a => { const c = a.subCategory || a.category || 'Diğer'; if (!byCat[c]) byCat[c] = []; byCat[c].push(priceToEur(a.price, a.currency) * (r.MKD || 61.5)); });
    const trends = Object.entries(byCat).filter(([,prices]) => prices.length >= 3).map(([cat, prices]) => ({ cat, avg: Math.round(prices.reduce((a,b)=>a+b,0)/prices.length), count: prices.length })).sort((a,b)=>b.count - a.count).slice(0, 12);
    const ptEl = el('admin-price-trends');
    if (ptEl) ptEl.innerHTML = trends.length === 0 ? '<p class="admin-empty">' + t('insufficientData') + '</p>' : trends.map(t => `<div style="padding:8px;border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;font-size:13px;"><strong>${escapeHtml(t.cat)}</strong> · Ort ~${t.avg} MKD (${t.count} ilan)</div>`).join('');

    const dupListEl = el('admin-duplicates-list');
    if (dupListEl) dupListEl.innerHTML = '<p class="admin-empty" id="admin-dup-placeholder">' + t('adminScanPlaceholder') + '</p>';
    if (!el('admin-scan-duplicates')?.dataset.bound) {
        el('admin-scan-duplicates')?.addEventListener('click', function() {
            const dupListEl = el('admin-duplicates-list');
            if (!dupListEl) return;
            const found = [];
            (window.adsDatabase || []).filter(a => (a.status||'approved')==='approved').forEach(ad => {
                const similar = findSimilarExistingAds(ad.title, ad.category, ad.subCategory, ad.id);
                if (similar.length >= 2) found.push({ ad, similar });
            });
            dupListEl.innerHTML = found.length === 0 ? '<p class="admin-empty">' + t('noDuplicateAds') + '</p>' : found.slice(0,15).map(({ ad, similar }) => `<div style="padding:8px;border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;font-size:12px;"><strong>${escapeHtml((ad.title||'').slice(0,30))}</strong> · ${similar.length} benzer · <a href="#" onclick="window.ilanDetayAc(${ad.id}); return false;">Gör</a></div>`).join('');
        });
        if (el('admin-scan-duplicates')) el('admin-scan-duplicates').dataset.bound = '1';
    }
    if (!el('admin-export-search-alerts')?.dataset.bound) {
        el('admin-export-search-alerts')?.addEventListener('click', function() {
            const alerts = window.searchAlerts || [];
            const headers = 'userId,email,search,category,city,minPrice,maxPrice,createdAt';
            const rows = alerts.map(a => {
                const u = Object.values(window.usersDatabase || {}).find(x => x.id === a.userId);
                const s = a.state || {};
                return [a.userId, (u?.email||'').replace(/,/g,';'), (s.search||'').replace(/,/g,';'), s.category||'', s.city||'', s.minPrice||'', s.maxPrice||'', a.createdAt||''].join(',');
            });
            const csv = '\uFEFF' + headers + '\n' + rows.join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'arama_kayitlari_' + new Date().toISOString().slice(0,10) + '.csv';
            a.click();
            URL.revokeObjectURL(a.href);
            showToast(t('csvDownloaded'), 'success', 1500);
        });
        if (el('admin-export-search-alerts')) el('admin-export-search-alerts').dataset.bound = '1';
    }

    const auditList = el('admin-audit-list');
    if (auditList) {
        const log = (window.adminAuditLog || []).slice(-30).reverse();
        auditList.innerHTML = log.length === 0 ? '<p class="admin-empty">' + t('noAuditYet') + '</p>' : log.map(l => `<div style="padding:6px;border-bottom:1px solid var(--border-color);font-size:12px;"><strong>${escapeHtml(l.action)}</strong> · ${l.details || '-'} · ${l.when ? new Date(l.when).toLocaleString('tr-TR') : ''}</div>`).join('');
    }
}

function renderAdminStores() {
    const list = el('admin-stores-list');
    if (!list) return;
    const stores = (window.storesDatabase || []).slice().sort((a,b) => (b.id||0) - (a.id||0));
    if (stores.length === 0) { list.innerHTML = '<p class="admin-empty">' + t('noStores') + '</p>'; return; }
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    list.innerHTML = stores.map(s => {
        const owner = s.ownerId ? Object.values(window.usersDatabase || {}).find(u => u.id === s.ownerId) : null;
        const prodCount = (window.storeProducts || []).filter(p => p.storeId === s.id).length;
        return `<div class="admin-store-row" data-store-id="${s.id}">
            <div class="admin-store-info">
                <img src="${s.logo || ''}" alt="" style="width:48px;height:48px;object-fit:cover;border-radius:8px;">
                <div>
                    <strong>${escapeHtml(s.name || '-')}</strong>
                    <span>ID: ${s.id} · ${prodCount} ürün · ${owner ? escapeHtml(owner.email || owner.name || '-') : '-'}</span>
                </div>
            </div>
            <button type="button" class="admin-btn-small admin-store-open-btn" data-store-id="${s.id}"><i class="fa-solid fa-external-link-alt"></i> Aç</button>
        </div>`;
    }).join('');
    list.querySelectorAll('.admin-store-open-btn').forEach(btn => {
        btn.onclick = function() {
            const id = parseInt(this.dataset.storeId);
            document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
            el('admin-page').style.display = 'none';
            openStoreDetail(id, { adminMode: true });
            el('store-detail-page').style.display = 'block';
        };
    });
}

function renderAdminProductRequests() {
    const list = el('admin-product-requests-list');
    if (!list) return;
    const pending = (window.storeProductRequests || []).filter(r => r.status === 'pending');
    const badge = el('admin-product-requests-badge');
    if (badge) badge.textContent = pending.length;
    if (pending.length === 0) { list.innerHTML = '<p class="admin-empty">' + t('noPendingProductRequests') + '</p>'; return; }
    list.innerHTML = pending.map(r => {
        const store = (window.storesDatabase || []).find(s => s.id === r.storeId);
        const owner = store && store.ownerId ? Object.values(window.usersDatabase || {}).find(u => u.id === store.ownerId) : null;
        const p = r.product || {};
        const imgSrc = p.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100';
        return `<div class="admin-product-request-card" data-request-id="${r.id}" style="display:flex;gap:20px;align-items:flex-start;padding:16px;background:var(--card-bg);border:1px solid var(--border-color);border-radius:12px;margin-bottom:12px;">
            <img src="${imgSrc}" alt="" style="width:100px;height:100px;object-fit:cover;border-radius:10px;background:#eee;flex-shrink:0;" onerror="this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'">
            <div style="flex:1;min-width:0;">
                <strong style="display:block;margin-bottom:6px;">${r.action === 'edit' ? 'Düzenleme' : 'Yeni Ürün'}: ${escapeHtml(p.title || '-')}</strong>
                <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">
                    <span><i class="fa-solid fa-store"></i> Mağaza: <strong style="color:var(--text-main)">${store ? escapeHtml(store.name) : r.storeId}</strong></span>
                    ${owner ? ' · <span>' + escapeHtml(owner.email || owner.name || '') + '</span>' : ''}
                </div>
                <div style="font-size:12px;display:flex;flex-wrap:wrap;gap:12px 20px;">
                    <span><strong>Fiyat:</strong> ${(p.price||0)} MKD</span>
                    ${(p.originalPrice && p.originalPrice > (p.price||0)) ? '<span><strong>Eski:</strong> ' + p.originalPrice + ' MKD</span>' : ''}
                    ${p.category ? '<span><strong>Kategori:</strong> ' + escapeHtml(p.category) + '</span>' : ''}
                    ${p.material ? '<span><strong>Materyal:</strong> ' + escapeHtml(p.material) + '</span>' : ''}
                    ${p.color ? '<span><strong>Renk:</strong> ' + escapeHtml(p.color) + '</span>' : ''}
                </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;flex-shrink:0;">
                <button type="button" class="admin-btn-small" onclick="window.approveStoreProductRequest(${r.id})"><i class="fa-solid fa-check"></i> Onayla</button>
                <button type="button" class="admin-btn-small" style="color:#dc3545" onclick="window.rejectStoreProductRequest(${r.id})"><i class="fa-solid fa-times"></i> Reddet</button>
            </div>
        </div>`;
    }).join('');
}

window.approveStoreProductRequest = function(reqId) {
    if (!isAdmin()) return;
    const req = (window.storeProductRequests || []).find(r => r.id === reqId);
    if (!req || req.status !== 'pending') return;
    const p = req.product || {};
    window.storeProducts = window.storeProducts || [];
    if (req.action === 'add') {
        const newId = Math.max(0, ...window.storeProducts.map(x => x.id)) + 1;
        window.storeProducts.push({ id: newId, storeId: req.storeId, ...p });
    } else if (req.action === 'edit' && req.productId) {
        const idx = window.storeProducts.findIndex(x => x.id === req.productId);
        if (idx >= 0) {
            const existing = window.storeProducts[idx];
            window.storeProducts[idx] = { ...existing, ...p, id: existing.id, storeId: existing.storeId };
        }
    }
    req.status = 'approved';
    saveStoreProductRequests();
    localStorage.setItem('alsat_store_products', JSON.stringify(window.storeProducts));
    renderAdminProductRequests();
    const badge = el('admin-product-requests-badge');
    if (badge) badge.textContent = (window.storeProductRequests || []).filter(r => r.status === 'pending').length;
    showToast(t('productRequestApproved'), 'success', 2000);
};

window.rejectStoreProductRequest = function(reqId) {
    if (!isAdmin()) return;
    const req = (window.storeProductRequests || []).find(r => r.id === reqId);
    if (!req || req.status !== 'pending') return;
    req.status = 'rejected';
    saveStoreProductRequests();
    renderAdminProductRequests();
    const badge = el('admin-product-requests-badge');
    if (badge) badge.textContent = (window.storeProductRequests || []).filter(r => r.status === 'pending').length;
    showToast(t('productRequestRejected'), 'info', 2000);
};

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
    const ncr = el('admin-total-credits'); if (ncr) ncr.textContent = totalCredits + ' MKD';
    const pending = (window.adsDatabase || []).filter(a => (a.status || '') === 'pending').length;
    const badge = el('admin-pending-badge'); if (badge) badge.textContent = pending;
}

function renderAdminPending() {
    if (!isAdmin()) return;
    const list = el('admin-pending-list');
    if (!list) return;
    const pending = (window.adsDatabase || []).filter(a => (a.status || '') === 'pending').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (pending.length === 0) {
        list.innerHTML = '<p class="admin-empty">' + t('noPendingAds') + '</p>';
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
    addAdminAudit('ad_approved', 'İlan #' + adId + ' onaylandı: ' + (ad.title||'').slice(0,40));
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
        list.innerHTML = '<p class="admin-empty">' + t('noAdsFound') + '</p>';
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
            if (tab === 'online') renderAdminOnlineUsers();
            if (tab === 'reports') renderAdminReports();
            if (tab === 'pending') renderAdminPending();
            if (tab === 'seller-apps') renderAdminSellerApps();
            if (tab === 'platform') renderAdminPlatform();
            if (tab === 'stores') renderAdminStores();
            if (tab === 'product-requests') renderAdminProductRequests();
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
    if (users.length === 0) { list.innerHTML = '<p class="admin-empty">' + t('userNotFound') + '</p>'; return; }
    list.innerHTML = users.map(u => {
        const createdAt = u.created_at || u.createdAt ? (typeof u.created_at === 'string' ? new Date(u.created_at).toLocaleDateString('tr-TR') : (u.createdAt ? new Date(u.createdAt).toLocaleDateString('tr-TR') : '')) : '';
        return `<div class="admin-user-row">
            <div class="admin-user-info">
                <strong>${escapeHtml(u.name || 'İsimsiz')}</strong>
                <span>${escapeHtml(u.email || '-')} · ID: ${u.id}</span>
                <span>${u.phone ? 'Tel: ' + escapeHtml(u.phone) + ' · ' : ''}${createdAt ? 'Kayıt: ' + createdAt + ' · ' : ''}Kredi: ${u.credit} MKD ${u.verifiedUntil ? '· Onaylı: ' + u.verifiedUntil : ''} ${u.banned ? '· <span class="badge-banned">ENGELLİ</span>' : ''}</span>
            </div>
            <button type="button" class="admin-edit-btn" data-user-id="${u.id}"><i class="fa-solid fa-pen"></i></button>
        </div>`;
    }).join('');
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
    if (!u) { showToast(t('userNotFound'), 'warning', 2000); return; }
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
    const mi = el('adm-seller-msg-intro'); if (mi) mi.value = s.sellerAppMsgIntro || '';
    const mc = el('adm-seller-msg-confirm'); if (mc) mc.value = s.sellerAppMsgConfirm || '';
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
        addAdminAudit('ad_deleted', 'İlan #' + id + ' silindi: ' + (ad.title||'').slice(0,40));
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

// ========== HOMEPAGE / LİSTİNG SAYFA GEÇİŞİ ==========
window.showHomepage = function () {
    const home = el('homepage-view');
    const list = el('listing-view');
    if (!home || !list) return;
    if (home.style.display === 'block') return;
    list.classList.add('page-enter-start');
    list.classList.remove('page-enter');
    home.classList.remove('page-exit');
    home.classList.add('page-enter-start');
    home.style.display = 'block';
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            home.classList.remove('page-enter-start');
            home.classList.add('page-enter');
        });
    });
    setTimeout(function () {
        list.style.display = 'none';
        list.classList.remove('page-enter-start', 'page-enter');
        home.classList.remove('page-enter-start');
    }, 260);
    const ps = el('popular-searches');
    if (ps) ps.style.display = 'none';
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    window.scrollTo(0, 0);
};
window.showListingPage = function (category, city) {
    const home = el('homepage-view');
    const list = el('listing-view');
    if (!home || !list) return;
    if (list.style.display === 'block') {
        if (category) filterByCategory(category);
        else applyFilters();
        if (city != null) {
            if (el('sehir-select')) el('sehir-select').value = city;
            initLocationSelects();
            setTimeout(applyFilters, 100);
        }
        return;
    }
    home.classList.add('page-exit');
    list.classList.remove('page-enter-start');
    list.style.display = 'block';
    list.classList.add('page-enter-start');
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            list.classList.remove('page-enter-start');
            list.classList.add('page-enter');
        });
    });
    setTimeout(function () {
        home.style.display = 'none';
        home.classList.remove('page-exit');
    }, 260);
    const ps = el('popular-searches');
    if (ps) ps.style.display = 'flex';
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    if (category) filterByCategory(category);
    else applyFilters();
    if (city != null) {
        if (el('sehir-select')) el('sehir-select').value = city;
        initLocationSelects();
        setTimeout(applyFilters, 100);
    }
};

function refreshHomepageContent() {
    const grid = el('homepage-category-grid');
    if (!grid) return;
    const L = window.TRANSLATIONS?.[window.currentLang] || window.TRANSLATIONS?.mk || {};
    const cats = (window.CATEGORIES_TREE || []).filter(g => g.id !== 'all');
    const catMap = L.categories || {};
    grid.innerHTML = cats.map(g => {
        const label = catMap[g.labelKey] || catMap[g.id] || g.labelKey || g.id;
        return `<a href="javascript:void(0)" class="homepage-cat-item" data-homepage-cat="${g.id}"><i class="fa-solid ${g.icon || 'fa-folder'}"></i>${label}</a>`;
    }).join('');
    const regions = el('homepage-regions');
    if (regions) {
        const allTxt = t('allMacedonia') || 'Tüm Makedonya';
        const opts = sehirListesi.map(c => `<a href="javascript:void(0)" class="region-link region-btn" data-city="${c}">${tCity(c) || c}</a>`).join('');
        const linksWrap = regions.querySelector('.homepage-regions-links');
        if (linksWrap) linksWrap.innerHTML = '<a href="javascript:void(0)" class="region-link region-btn active" data-city="">' + allTxt + '</a>' + opts;
        const selMobile = el('homepage-regions-select-mobile');
        if (selMobile) {
            selMobile.innerHTML = '<option value="">' + allTxt + '</option>' + sehirListesi.map(c => '<option value="' + c + '">' + (tCity(c) || c) + '</option>').join('');
        }
    }
    const countEl = el('homepage-ad-count');
    if (countEl) {
        const n = (window.adsDatabase || []).filter(a => (a.status || 'approved') === 'approved').length;
        const base = t('adsSearchCount') || '600.000+ ilan arasında ara';
        countEl.textContent = n > 0 ? (n.toLocaleString('tr-TR') + ' ' + base.replace(/^[\d.,+\s]+/, '').trim()) : base;
    }
    const newAdsGrid = el('homepage-new-ads-grid');
    if (newAdsGrid) {
        const ads = (window.adsDatabase || []).filter(a => (a.status || 'approved') === 'approved');
        const recent = [...ads].sort((a, b) => (b.createdAt || b.id || 0) - (a.createdAt || a.id || 0)).slice(0, 8);
        newAdsGrid.innerHTML = recent.map(ad => {
            const img = (ad.images && ad.images[0]) || ad.image || getImgForCategory(ad.subCategory, ad.category, ad.id || 0);
            return `<a href="#" class="ilan-kart homepage-new-ad-card" data-ad-id="${ad.id}" aria-label="${escapeHtml(ad.title || '')} - ${formatPrice(ad)}"><div class="resim-alani"><img src="${img}" alt="${escapeHtml(ad.title || '')}" loading="lazy"></div><div class="ilan-bilgi"><h4>${escapeHtml(ad.title || '')}</h4><div class="fiyat">${formatPrice(ad)}</div></div></a>`;
        }).join('');
    }
    const newAdsTitle = el('homepage-new-ads-title');
    if (newAdsTitle) newAdsTitle.textContent = L.homepageNewAds || 'Son eklenen ilanlar';
    const txtIlanVer = el('homepage-txt-ilan-ver');
    if (txtIlanVer) txtIlanVer.textContent = L.postAd || 'İlan Ver';
}

function initHomepage() {
    refreshHomepageContent();
    const grid = el('homepage-category-grid');
    if (grid && !grid.dataset.homepageBound) {
        grid.dataset.homepageBound = '1';
        grid.addEventListener('click', function (e) {
            const item = e.target.closest('.homepage-cat-item');
            if (item) { e.preventDefault(); showListingPage(item.dataset.homepageCat); }
        });
    }
    const regions = el('homepage-regions');
    if (regions && !regions.dataset.homepageBound) {
        regions.dataset.homepageBound = '1';
        regions.addEventListener('click', function (e) {
            const link = e.target.closest('.region-link');
            if (link) {
                e.preventDefault();
                regions.querySelectorAll('.region-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const city = link.dataset.city || null;
                const selM = el('homepage-regions-select-mobile');
                if (selM) selM.value = city || '';
                showListingPage(null, city);
            }
        });
        const selMobile = el('homepage-regions-select-mobile');
        if (selMobile) selMobile.addEventListener('change', function () {
            const city = this.value || null;
            regions.querySelectorAll('.region-link').forEach(l => l.classList.remove('active'));
            const link = regions.querySelector('.region-link[data-city="' + (city || '') + '"]');
            if (link) link.classList.add('active');
            showListingPage(null, city);
        });
    }
    const newAdsGrid = el('homepage-new-ads-grid');
    if (newAdsGrid && !newAdsGrid.dataset.homepageBound) {
        newAdsGrid.dataset.homepageBound = '1';
        newAdsGrid.addEventListener('click', function (e) {
            const card = e.target.closest('.ilan-kart[data-ad-id]');
            if (card) { e.preventDefault(); const id = parseInt(card.dataset.adId, 10); if (id) window.ilanDetayAc?.(id); }
        });
    }
    const ilanVerBtn = el('homepage-ilan-ver');
    if (ilanVerBtn && !ilanVerBtn.dataset.homepageBound) {
        ilanVerBtn.dataset.homepageBound = '1';
        ilanVerBtn.addEventListener('click', function (e) { e.preventDefault(); el('btnIlanVer')?.click(); });
    }
    const storesBtn = el('homepage-stores-btn');
    if (storesBtn && !storesBtn.dataset.bound) {
        storesBtn.dataset.bound = '1';
        storesBtn.addEventListener('click', function (e) { e.preventDefault(); if (window.openStoresPage) window.openStoresPage(); });
    }
    const storesTitle = el('homepage-stores-title');
    if (storesTitle) storesTitle.textContent = t('alsatStore') || 'Profesyonel Mağazalar';
    const storesDesc = el('homepage-stores-desc');
    if (storesDesc) storesDesc.textContent = t('alsatStoreDesc') || 'Kayıtlı mağazalar, ürünler, fotoğraflı yorumlar & soru-cevap';
    const storesBtnTxt = el('homepage-stores-btn-txt');
    if (storesBtnTxt) storesBtnTxt.textContent = t('goToAlsatStore') || "Alsat Store'a Git";
    initCategoryExtraFilters();
}

function updateCategoryExtraFiltersVisibility() {
    const cat = window.currentFilterCategory || 'all';
    const extra = el('category-extra-filters');
    const otoBlock = el('otomobil-filters');
    const konutBlock = el('konut-filters');
    const isBlock = el('is-ilanlari-filters');
    if (!extra || !otoBlock || !konutBlock) return;
    const otoCats = ['Otomobil', 'Vasıta', 'Motosiklet', 'Kamyonet', 'Ticari Araç'];
    const konutCats = ['Emlak', 'Satılık Daire', 'Kiralık Daire', 'Satılık Arsa', 'Kiralık Ev', 'Ofis', 'Dükkan', 'Depo'];
    const isCats = ['İş İlanları', 'İş & Hizmetler'];
    const showOto = otoCats.includes(cat);
    const showKonut = konutCats.includes(cat);
    const showIs = isCats.includes(cat);
    extra.style.display = (showOto || showKonut || showIs) ? 'block' : 'none';
    otoBlock.style.display = showOto ? 'block' : 'none';
    konutBlock.style.display = showKonut ? 'block' : 'none';
    if (isBlock) isBlock.style.display = showIs ? 'block' : 'none';
}

function initCategoryExtraFilters() {
    const vd = window.VEHICLE_DATA;
    const markaSel = el('lf-marka');
    const modelSel = el('lf-model');
    const yilSel = el('lf-yil');
    if (!markaSel) return;
    const data = vd ? vd.getDataForCategory('Otomobil') : null;
    if (data && data.brands) {
        data.brands.forEach(b => { const o = document.createElement('option'); o.value = b; o.textContent = b; markaSel.appendChild(o); });
    }
    let curYear = new Date().getFullYear();
    for (let y = curYear; y >= 1990; y--) { const o = document.createElement('option'); o.value = y; o.textContent = y; yilSel.appendChild(o); }
    markaSel?.addEventListener('change', function() {
        modelSel.innerHTML = '<option value="">Model</option>';
        const brand = this.value;
        if (brand && data) {
            (data.getModels(brand) || []).filter(m => m !== '__DIGER__').forEach(m => {
                const o = document.createElement('option'); o.value = m; o.textContent = m; modelSel.appendChild(o);
            });
        }
    });
    el('btn-uygula-oto')?.addEventListener('click', function() { syncListingFiltersFromOto(); applyFilters(); });
    el('btn-uygula-konut')?.addEventListener('click', function() { syncListingFiltersFromKonut(); applyFilters(); });
    el('btn-uygula-is')?.addEventListener('click', function() { syncListingFiltersFromJob(); applyFilters(); });
}
function syncListingFiltersFromJob() {
    window.homepageQuickFilters = window.homepageQuickFilters || {};
    window.homepageQuickFilters.jobType = el('lf-job-type')?.value || null;
    window.homepageQuickFilters.jobExp = el('lf-job-exp')?.value || null;
    window.homepageQuickFilters.jobCompany = el('lf-job-company')?.value || null;
    window.homepageQuickFilters.jobSalaryMin = el('lf-job-salary-min')?.value || null;
}

function syncListingFiltersFromOto() {
    window.homepageQuickFilters = {
        brand: el('lf-marka')?.value || null,
        model: el('lf-model')?.value || null,
        year: el('lf-yil')?.value || null,
        fuel: el('lf-yakit')?.value || null,
        gearbox: el('lf-vites')?.value || null
    };
    const minP = el('lf-fiyat-min')?.value;
    const maxP = el('lf-fiyat-max')?.value;
    if (el('minPrice')) el('minPrice').value = minP || '';
    if (el('maxPrice')) el('maxPrice').value = maxP || '';
}
function syncListingFiltersFromKonut() {
    const konutTip = el('lf-konut-tip')?.value;
    const oda = el('lf-oda')?.value;
    const m2 = el('lf-m2')?.value;
    window.homepageQuickFilters = { konutTip: konutTip || null, roomCount: oda || null, m2: m2 || null };
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
    updateCategoryExtraFiltersVisibility();
    applyFilters();
};

function getCurrentFilterState() {
    const s = {
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
    const otoBlock = el('otomobil-filters');
    const konutBlock = el('konut-filters');
    if (otoBlock && otoBlock.style.display !== 'none') {
        s.otoFilters = { brand: el('lf-marka')?.value || '', model: el('lf-model')?.value || '', year: el('lf-yil')?.value || '', minP: el('lf-fiyat-min')?.value || '', maxP: el('lf-fiyat-max')?.value || '', fuel: el('lf-yakit')?.value || '', gearbox: el('lf-vites')?.value || '' };
    }
    if (konutBlock && konutBlock.style.display !== 'none') {
        s.konutFilters = { konutTip: el('lf-konut-tip')?.value || '', oda: el('lf-oda')?.value || '', m2: el('lf-m2')?.value || '' };
    }
    s.homepageQuickFilters = window.homepageQuickFilters || null;
    return s;
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
    window.homepageQuickFilters = s.homepageQuickFilters ?? null;
    if (s.otoFilters) {
        const o = s.otoFilters;
        const markaEl = el('lf-marka');
        if (markaEl) { markaEl.value = o.brand ?? ''; markaEl.dispatchEvent(new Event('change')); }
        setTimeout(() => { if (el('lf-model')) el('lf-model').value = o.model ?? ''; }, 0);
        if (el('lf-yil')) el('lf-yil').value = o.year ?? '';
        if (el('lf-fiyat-min')) el('lf-fiyat-min').value = o.minP ?? '';
        if (el('lf-fiyat-max')) el('lf-fiyat-max').value = o.maxP ?? '';
        if (el('lf-yakit')) el('lf-yakit').value = o.fuel ?? '';
        if (el('lf-vites')) el('lf-vites').value = o.gearbox ?? '';
    }
    if (s.konutFilters) {
        const k = s.konutFilters;
        if (el('lf-konut-tip')) el('lf-konut-tip').value = k.konutTip ?? '';
        if (el('lf-oda')) el('lf-oda').value = k.oda ?? '';
        if (el('lf-m2')) el('lf-m2').value = k.m2 ?? '';
    }
    const q = s.homepageQuickFilters || {};
    if (q.jobType && el('lf-job-type')) el('lf-job-type').value = q.jobType;
    if (q.jobExp && el('lf-job-exp')) el('lf-job-exp').value = q.jobExp;
    if (q.jobCompany && el('lf-job-company')) el('lf-job-company').value = q.jobCompany;
    if (q.jobSalaryMin && el('lf-job-salary-min')) el('lf-job-salary-min').value = q.jobSalaryMin;
    document.querySelectorAll('.kat-grup-baslik, .kat-alt-item').forEach(x => x?.classList.remove('aktif'));
    const kat = document.querySelector(`[data-kat="${s.category}"]`);
    if (kat) kat.classList.add('aktif');
    updateCategoryExtraFiltersVisibility();
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
function filterAdsByState(state) {
    let ads = (window.adsDatabase || []).filter(a => (a.status || 'approved') === 'approved');
    const category = state.category || 'all';
    if (category !== 'all') {
        const grp = window.CATEGORIES_TREE?.find(g => g.id === category);
        const matchCats = grp ? [grp.id, ...(grp.sub || [])] : [category];
        ads = ads.filter(a => matchCats.includes(a.category) || matchCats.includes(a.subCategory));
    }
    const r = window.exchangeRates || { EUR: 1, MKD: 61.5, TRY: 35 };
    const minMkd = parseFloat(state.minPrice) || 0, maxMkd = parseFloat(state.maxPrice) || Infinity;
    const minEur = minMkd / (r.MKD || 61.5);
    const maxEur = maxMkd === Infinity ? Infinity : maxMkd / (r.MKD || 61.5);
    ads = ads.filter(a => { const eur = priceToEur(a.price, a.currency); return eur >= minEur && (maxEur === Infinity || eur <= maxEur); });
    if (state.city) ads = ads.filter(a => a.city === state.city || (a.cities && a.cities.includes(state.city)));
    if (state.district) ads = ads.filter(a => a.district === state.district);
    if (state.search) {
        const txt = state.search.toLowerCase();
        const terms = txt.split(/\s+/).filter(Boolean);
        const buildSearchable = (ad) => ((ad.title||'')+' '+(ad.description||'')+' '+(ad.subCategory||'')+' '+(ad.category||'')).toLowerCase();
        ads = ads.filter(a => terms.every(t => buildSearchable(a).includes(t)));
    }
    return ads.map(a => a.id);
}
window.toggleSearchAlert = function() {
    const user = getCurrentUser();
    if (!user) { showToast('loginRequired', 'warning', 2000); window.openLoginModal(); return; }
    const state = getCurrentFilterState();
    window.searchAlerts = window.searchAlerts || [];
    const key = JSON.stringify({ c: state.category, s: state.search, city: state.city, min: state.minPrice, max: state.maxPrice });
    const idx = window.searchAlerts.findIndex(a => a.userId === user.id && JSON.stringify({ c: a.state.category, s: a.state.search, city: a.state.city, min: a.state.minPrice, max: a.state.maxPrice }) === key);
    if (idx >= 0) {
        window.searchAlerts.splice(idx, 1);
        saveSearchAlerts();
        showToast(t('searchAlertRemoved'), 'info', 1500);
    } else {
        const ids = filterAdsByState(state);
        window.searchAlerts.push({ id: 'sa'+Date.now(), userId: user.id, state, lastSeenIds: ids, createdAt: new Date().toISOString() });
        saveSearchAlerts();
        showToast(t('searchAlertAdded'), 'success', 1500);
    }
    updateSearchAlertButton();
};
function updateSearchAlertButton() {
    const user = getCurrentUser();
    const btn = el('btn-search-alert');
    const txt = el('txt-search-alert');
    if (!btn || !txt) return;
    const state = getCurrentFilterState();
    const key = JSON.stringify({ c: state.category, s: state.search, city: state.city, min: state.minPrice, max: state.maxPrice });
    const has = (window.searchAlerts || []).some(a => a.userId === user?.id && JSON.stringify({ c: a.state.category, s: a.state.search, city: a.state.city, min: a.state.minPrice, max: a.state.maxPrice }) === key);
    txt.textContent = has ? 'Bildirimi Kaldır' : 'Bildirim Al';
    btn.classList.toggle('search-alert-active', !!has);
}
function checkSearchAlerts() {
    (window.searchAlerts || []).forEach(alert => {
        const ids = filterAdsByState(alert.state);
        const prev = alert.lastSeenIds || [];
        const newIds = ids.filter(id => !prev.includes(id));
        if (newIds.length > 0) {
            addNotification(alert.userId, 'search_alert', 'Yeni ilanlar', newIds.length + ' yeni ilan arama kriterlerinize uyuyor.', { adIds: newIds });
            updateNotifBadge();
        }
        alert.lastSeenIds = ids;
    });
    saveSearchAlerts();
}

function applyFilters() {
    const category = window.currentFilterCategory || document.querySelector('.kat-grup-baslik.aktif, .kat-alt-item.aktif')?.dataset?.kat || 'all';
    const otoBlock = el('otomobil-filters');
    const konutBlock = el('konut-filters');
    if (otoBlock && otoBlock.style.display !== 'none') syncListingFiltersFromOto();
    else if (konutBlock && konutBlock.style.display !== 'none') syncListingFiltersFromKonut();
    const r = window.exchangeRates || { EUR: 1, MKD: 61.5, TRY: 35 };
    const minMkd = parseFloat(el('minPrice')?.value) || 0;
    const maxMkd = parseFloat(el('maxPrice')?.value) || Infinity;
    const minPrice = minMkd / (r.MKD || 61.5);
    const maxPrice = maxMkd === Infinity ? Infinity : maxMkd / (r.MKD || 61.5);
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
        window.searchHistory = window.searchHistory || [];
        const hist = window.searchHistory.filter(h => h.toLowerCase() !== searchTerm.toLowerCase());
        window.searchHistory = [searchTerm, ...hist].slice(0, 20);
        saveSearchHistory();
        if (window.AlsatAPI?.recordPopularSearch) window.AlsatAPI.recordPopularSearch(searchTerm).catch(function(){});
        const txt = searchTerm.toLowerCase();
        const buildSearchable = (ad) => {
            let s = (ad.title || '') + ' ' + (ad.description || '') + ' ' + (ad.subCategory || '') + ' ' + (ad.category || '');
            const attrs = ad.attrs || {};
            Object.keys(attrs).forEach(k => { s += ' ' + (String(attrs[k] || '')); });
            return s.toLowerCase();
        };
        if (advExactPhrase) {
            filtered = filtered.filter(ad => buildSearchable(ad).includes(txt));
        } else {
            const terms = txt.split(/\s+/).filter(Boolean);
            filtered = filtered.filter(ad => terms.every(t => buildSearchable(ad).includes(t)));
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
    if (window.homepageQuickFilters) {
        const q = window.homepageQuickFilters;
        if (q.brand) filtered = filtered.filter(ad => (ad.attrs && ad.attrs.brand) === q.brand);
        if (q.model) filtered = filtered.filter(ad => (ad.attrs && ad.attrs.model) === q.model);
        if (q.year) filtered = filtered.filter(ad => (ad.attrs && String(ad.attrs.year)) === String(q.year));
        if (q.fuel) filtered = filtered.filter(ad => (ad.attrs && ad.attrs.fuel) === q.fuel);
        if (q.gearbox) filtered = filtered.filter(ad => (ad.attrs && ad.attrs.gearbox) === q.gearbox);
        if (q.konutTip) filtered = filtered.filter(ad => (ad.subCategory || ad.category) === q.konutTip);
        if (q.roomCount) filtered = filtered.filter(ad => (ad.attrs && ad.attrs.roomCount) === q.roomCount);
        if (q.m2) filtered = filtered.filter(ad => (ad.attrs && parseFloat(ad.attrs.m2)) >= parseFloat(q.m2));
        if (q.jobType) filtered = filtered.filter(ad => (ad.attrs && ad.attrs.jobType) === q.jobType);
        if (q.jobExp) filtered = filtered.filter(ad => (ad.attrs && ad.attrs.experience) === q.jobExp);
        if (q.jobCompany) filtered = filtered.filter(ad => {
            const c = (ad.attrs && ad.attrs.company) || '';
            return c.toLowerCase().includes((q.jobCompany || '').toLowerCase());
        });
        if (q.jobSalaryMin) filtered = filtered.filter(ad => (ad.attrs && parseFloat(ad.attrs.salaryMin || 0)) >= parseFloat(q.jobSalaryMin));
    }
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
    const countEl = el('filter-result-count');
    if (countEl) countEl.textContent = filtered.length > 0 ? `(${filtered.length} ${(t('adsFound') || 'ilan')})` : '';
    renderPopularSearches();
    renderFilterChips();
    renderBreadcrumb();
    renderRecentlyViewed();
    renderAds(filtered);
    renderListingMap(filtered);
    checkSearchAlerts();
    updateSearchAlertButton();
    renderCompareBar();
}
window.listingMapVisible = false;
window.toggleListingMap = function() {
    window.listingMapVisible = !window.listingMapVisible;
    const mapContainer = el('listing-map-container');
    const gridEl = el('ilan-grid');
    const paginationEl = el('ilan-pagination');
    const btn = el('btn-map-view');
    if (btn) btn.textContent = window.listingMapVisible ? 'Liste Görünümü' : 'Harita';
    if (!window.listingMapVisible) {
        if (mapContainer) mapContainer.style.display = 'none';
        if (gridEl) gridEl.style.display = '';
        if (paginationEl) paginationEl.style.display = '';
        return;
    }
    renderListingMap(window.filteredAdsCache || []);
};
function renderListingMap(ads) {
    const mapContainer = el('listing-map-container');
    const gridEl = el('ilan-grid');
    const paginationEl = el('ilan-pagination');
    if (!mapContainer || !window.listingMapVisible) return;
    const withCoords = (ads || []).filter(a => a.city && cityCoords[a.city]).slice(0, 50);
    if (withCoords.length === 0) { mapContainer.style.display = 'none'; return; }
    let minLat = 90, maxLat = -90, minLon = 180, maxLon = -180;
    withCoords.forEach(a => { const c = cityCoords[a.city]; minLat = Math.min(minLat, c[0]); maxLat = Math.max(maxLat, c[0]); minLon = Math.min(minLon, c[1]); maxLon = Math.max(maxLon, c[1]); });
    const pad = 0.15;
    const bbox = `${minLon - pad},${minLat - pad},${maxLon + pad},${maxLat + pad}`;
    mapContainer.innerHTML = `<div style="height:100%;display:flex;flex-direction:column;"><iframe width="100%" height="320" frameborder="0" style="border:0;border-radius:12px;" src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik"></iframe><div style="padding:12px;display:flex;flex-wrap:wrap;gap:8px;background:var(--card-bg);border-top:1px solid var(--border-color);">${withCoords.slice(0, 12).map(a => `<a href="#" onclick="window.ilanDetayAc(${a.id}); return false;" class="map-ad-chip">${escapeHtml((a.title||'').slice(0,25))} - ${formatPrice(a)} (${tCity(a.city)||a.city})</a>`).join('')}</div></div>`;
    mapContainer.style.display = 'block';
    if (gridEl) gridEl.style.display = 'none';
    if (paginationEl) paginationEl.style.display = 'none';
}
function renderFilterChips() {
    const container = el('filter-chips');
    if (!container) return;
    const chips = [];
    const cat = window.currentFilterCategory || 'all';
    if (cat && cat !== 'all') {
        const L = window.TRANSLATIONS?.[window.currentLang]?.categories || {};
        chips.push({ key: 'cat', label: L[cat] || cat, clear: () => window.filterByCategory('all') });
    }
    const minP = el('minPrice')?.value;
    const maxP = el('maxPrice')?.value;
    if (minP || maxP) chips.push({ key: 'price', label: (minP || '0') + ' - ' + (maxP || '∞') + ' MKD', clear: () => { el('minPrice').value = ''; el('maxPrice').value = ''; applyFilters(); } });
    const city = el('sehir-select')?.value;
    if (city) chips.push({ key: 'city', label: tCity(city), clear: () => { el('sehir-select').value = ''; initLocationSelects(); applyFilters(); } });
    const q = window.homepageQuickFilters;
    if (q) {
        if (q.brand) chips.push({ key: 'brand', label: q.brand, clear: () => { window.homepageQuickFilters = { ...q, brand: null, model: null }; if (el('lf-marka')) { el('lf-marka').value = ''; el('lf-marka').dispatchEvent(new Event('change')); } if (el('lf-model')) { el('lf-model').value = ''; el('lf-model').innerHTML = '<option value="">Model</option>'; } applyFilters(); } });
        if (q.model) chips.push({ key: 'model', label: q.model, clear: () => { window.homepageQuickFilters = { ...q, model: null }; if (el('lf-model')) el('lf-model').value = ''; applyFilters(); } });
        if (q.konutTip) chips.push({ key: 'konut', label: q.konutTip, clear: () => { window.homepageQuickFilters = { ...q, konutTip: null }; if (el('lf-konut-tip')) el('lf-konut-tip').value = ''; applyFilters(); } });
        if (q.jobType) chips.push({ key: 'jobType', label: q.jobType, clear: () => { window.homepageQuickFilters = { ...q, jobType: null }; if (el('lf-job-type')) el('lf-job-type').value = ''; applyFilters(); } });
        if (q.jobExp) chips.push({ key: 'jobExp', label: q.jobExp, clear: () => { window.homepageQuickFilters = { ...q, jobExp: null }; if (el('lf-job-exp')) el('lf-job-exp').value = ''; applyFilters(); } });
        if (q.jobCompany) chips.push({ key: 'jobCompany', label: q.jobCompany, clear: () => { window.homepageQuickFilters = { ...q, jobCompany: null }; if (el('lf-job-company')) el('lf-job-company').value = ''; applyFilters(); } });
        if (q.jobSalaryMin) chips.push({ key: 'jobSalary', label: t('minSalary') + ': ' + q.jobSalaryMin, clear: () => { window.homepageQuickFilters = { ...q, jobSalaryMin: null }; if (el('lf-job-salary-min')) el('lf-job-salary-min').value = ''; applyFilters(); } });
    }
    const search = (el('searchInput')?.value || '').trim();
    if (search) chips.push({ key: 'search', label: '"' + search.substring(0, 20) + (search.length > 20 ? '...' : '') + '"', clear: () => { el('searchInput').value = ''; applyFilters(); } });
    container.innerHTML = chips.length ? chips.map(c => `<span class="filter-chip">${escapeHtml(c.label)} <button type="button" class="filter-chip-remove" data-key="${c.key}">&times;</button></span>`).join('') : '';
    container.querySelectorAll('.filter-chip-remove').forEach(btn => {
        const chip = chips.find(x => x.key === btn.dataset.key);
        if (chip) btn.onclick = () => chip.clear();
    });
}
function renderPopularSearches() {
    const container = el('popular-searches');
    if (!container) return;
    const q = (el('searchInput')?.value || '').trim().toLowerCase();
    const L = window.TRANSLATIONS?.[window.currentLang]?.categories || {};
    const cats = (window.CATEGORIES_TREE || []).flatMap(g => [g.id, ...(g.sub || [])]).filter(c => c && c !== 'all');
    const catLabels = cats.map(c => (L[c] || c));
    const history = (window.searchHistory || []).slice(0, 8);
    let suggestions = [...new Set([...history, ...catLabels])].filter(s => s && (!q || String(s).toLowerCase().includes(q))).slice(0, 10);
    const render = (terms) => {
        container.innerHTML = terms.length ? terms.map(term => `<span class="popular-search-chip" role="button" tabindex="0">${escapeHtml(term)}</span>`).join('') : '';
        container.querySelectorAll('.popular-search-chip').forEach(chip => {
            const term = chip.textContent;
            chip.onclick = () => { el('searchInput').value = term; showListingPage(); applyFilters(); };
            chip.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chip.click(); } };
        });
    };
    render(suggestions);
    if (window.AlsatAPI?.getPopularSearches) {
        window.AlsatAPI.getPopularSearches(8).then(api => {
            const apiTerms = (api || []).map(x => x.query).filter(Boolean);
            suggestions = [...new Set([...suggestions, ...apiTerms])].filter(s => s && (!q || String(s).toLowerCase().includes(q))).slice(0, 12);
            render(suggestions);
        }).catch(function(){});
    }
}
function renderBreadcrumb() {
    const nav = el('breadcrumb');
    if (!nav) return;
    const cat = window.currentFilterCategory || 'all';
    const catTrans = window.TRANSLATIONS?.[window.currentLang]?.categories || {};
    const parts = [{ label: catTrans.all || 'Tümü', cat: 'all' }];
    if (cat && cat !== 'all') parts.push({ label: catTrans[cat] || cat, cat });
    nav.innerHTML = parts.map((p, i) => i < parts.length - 1
        ? `<a href="#" class="breadcrumb-link" data-cat="${p.cat}">${escapeHtml(p.label)}</a> <span class="breadcrumb-sep">›</span> `
        : `<span class="breadcrumb-current">${escapeHtml(p.label)}</span>`
    ).join('');
    nav.querySelectorAll('.breadcrumb-link').forEach(a => {
        a.onclick = (e) => { e.preventDefault(); window.filterByCategory(a.dataset.cat); };
    });
}

function renderRecentlyViewed() {
    const section = el('recently-viewed-section');
    const grid = el('recently-viewed-grid');
    if (!section || !grid) return;
    const notifSettings = JSON.parse(localStorage.getItem('alsat_notifications') || '{}');
    if (notifSettings.showRecentlyViewed === false) { section.style.display = 'none'; return; }
    window.recentlyViewed = (window.recentlyViewed || []).map(x => typeof x === 'object' ? x : { id: x, viewedAt: new Date().toISOString() }).slice(0, 20);
    const ids = window.recentlyViewed.slice(0, 12).map(x => typeof x === 'object' ? x.id : x);
    const now = new Date();
    const valid = ids.map(id => ({ ad: window.adsDatabase?.find(a => a.id === id), viewedAt: (window.recentlyViewed || []).find(x => (x.id || x) === id)?.viewedAt })).filter(x => x.ad && (!x.ad.expiryAt || new Date(x.ad.expiryAt) >= now));
    if (valid.length === 0) {
        section.style.display = 'none';
        return;
    }
    section.style.display = 'block';
    el('label-recently-viewed').textContent = t('recentlyViewed');
    grid.innerHTML = valid.map(({ ad, viewedAt }) => {
        const imgSrc = (ad.images && ad.images[0]) || ad.image || getImgForCategory(ad.subCategory, ad.category, ad.id);
        const timeAgo = viewedAt ? getTimeAgo(viewedAt) : '';
        const isFav = (window.favorites || []).includes(ad.id);
        const inCompare = (window.compareList || []).includes(ad.id);
        const catLabel = (window.TRANSLATIONS?.[window.currentLang]?.categories || {})[ad.subCategory || ad.category] || ad.subCategory || ad.category || '';
        const cityLabel = tCity(ad.city) || ad.city || '';
        const descShort = (ad.description || '').replace(/<[^>]*>/g,'').trim().slice(0,80);
        const tooltip = descShort ? (escapeHtml(ad.title) + ' - ' + escapeHtml(descShort) + (descShort.length >= 80 ? '...' : '')) : escapeHtml(ad.title);
        return `<div class="recent-ad-card" data-ad-id="${ad.id}" title="${tooltip}">
            <img src="${imgSrc}" alt="${escapeHtml(ad.title)}" loading="lazy" onclick="window.ilanDetayAc(${ad.id})">
            <div class="recent-ad-content" onclick="window.ilanDetayAc(${ad.id})" style="cursor:pointer;">
                ${catLabel ? `<span class="recent-ad-badge">${escapeHtml(catLabel)}</span>` : ''}
                <span class="recent-ad-title">${escapeHtml(ad.title)}</span>
                <span class="recent-ad-price">${formatPrice(ad)}</span>
                <div class="recent-ad-meta">${cityLabel ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(cityLabel)}</span>` : ''}${timeAgo ? `<span class="recent-viewed-time">${escapeHtml(timeAgo)}</span>` : ''}</div>
            </div>
            <button type="button" class="recent-ad-remove" onclick="event.stopPropagation();window.removeFromRecentlyViewed(${ad.id});" title="${t('removeFromList')}"><i class="fa-solid fa-xmark"></i></button>
            <button type="button" class="recent-ad-fav ${isFav?'favorilendi':''}" onclick="event.stopPropagation();window.toggleFavorite(${ad.id},event);" title="${isFav ? t('removeFromFavorites') : t('addToFavorites')}"><i class="fa-${isFav?'solid':'regular'} fa-heart"></i></button>
            <button type="button" class="recent-ad-compare ${inCompare?'in-compare':''}" onclick="event.stopPropagation();window.toggleCompare(${ad.id},event);" title="${t('addToCompare')}"><i class="fa-solid fa-code-compare"></i></button>
        </div>`;
    }).join('');
    grid.style.display = 'grid';
    grid.querySelectorAll('.recent-ad-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.onclick = function(e) { if (!e.target.closest('.recent-ad-remove, .recent-ad-fav, .recent-ad-compare')) window.ilanDetayAc(parseInt(this.dataset.adId)); };
    });
}
function getTimeAgo(isoDate) {
    const d = new Date(isoDate);
    const diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 60) return (t('timeAgoMin') || 'Az önce');
    if (diff < 3600) return Math.floor(diff / 60) + ' ' + (t('timeAgoMins') || 'dk önce');
    if (diff < 86400) return Math.floor(diff / 3600) + ' ' + (t('timeAgoHours') || 'saat önce');
    if (diff < 604800) return Math.floor(diff / 86400) + ' ' + (t('timeAgoDays') || 'gün önce');
    return d.toLocaleDateString();
}

window.removeFromRecentlyViewed = function(adId) {
    window.recentlyViewed = (window.recentlyViewed || []).filter(x => (x.id || x) !== adId);
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
function getSkeletonCardsHtml(n) {
    n = n || 8;
    return Array(n).fill(0).map(() => `<div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-body"><div class="skeleton-line"></div><div class="skeleton-line short"></div><div class="skeleton-line shorter"></div></div></div>`).join('');
}
function adToCardHtml(ad) {
    const isFav = window.favorites.includes(ad.id);
    const inCompare = (window.compareList || []).includes(ad.id);
    const imgSrc = (ad.images && ad.images[0]) || ad.image;
    const urgentBadge = ad.urgent ? '<span class="badge-urgent">ACİL SATILIK</span>' : '';
    const fastSellerBadge = ad.userId && isFastSeller(ad.userId) ? '<span class="badge-fast-seller"><i class="fa-solid fa-bolt"></i> Hızlı Satan</span>' : '';
    const sellerRating = ad.userId ? getSellerRating(ad.userId) : null;
    const ratingBadge = sellerRating ? `<span class="badge-seller-rating"><i class="fa-solid fa-star"></i> ${sellerRating.avg}</span>` : '';
    const titleClass = ad.boldTitle ? 'ilan-baslik-kalin' : '';
    const desc = (ad.description || '').replace(/<[^>]*>/g, '').trim();
    const descShort = desc ? escapeHtml(desc).slice(0, 90) + (desc.length > 90 ? '...' : '') : '';
    return `<div class="ilan-kart" data-id="${ad.id}">
        <div class="resim-alani">
            ${urgentBadge}${fastSellerBadge}${ratingBadge}
            <img src="${imgSrc}" alt="${ad.title}" loading="lazy">
            <div class="fav-btn-container" onclick="window.toggleFavorite(${ad.id}, event)">
                <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart fav-btn ${isFav ? 'favorilendi' : ''}"></i>
            </div>
            <div class="share-btn-container" onclick="event.stopPropagation(); window.shareAdViaWhatsApp(${ad.id});" title="Paylaş"><i class="fa-solid fa-share-nodes"></i></div>
            <div class="compare-btn-container ${inCompare ? 'in-compare' : ''}" onclick="event.stopPropagation(); window.toggleCompare(${ad.id}, event);" title="Karşılaştır"><i class="fa-solid fa-code-compare"></i></div>
        </div>
        <div class="ilan-bilgi">
            <h4 class="${titleClass}">${ad.title}</h4>
            <p class="fiyat">${formatPrice(ad)}</p>
            <p class="konum"><i class="fa-solid fa-location-dot"></i> ${tCity(ad.city)}</p>
            <button class="mesaj-gonder-btn" onclick="window.sendMessageToAd(${ad.id}); event.stopPropagation();">${t('sendMessage')}</button>
            ${descShort ? `<p class="ilan-aciklama-ozet">${descShort}</p>` : ''}
        </div>
    </div>`;
}
function attachCardClickHandlers(container) {
    if (!container) return;
    container.querySelectorAll('.ilan-kart').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.fav-btn-container') && !e.target.closest('.mesaj-gonder-btn') && !e.target.closest('.share-btn-container') && !e.target.closest('.compare-btn-container')) {
                window.ilanDetayAc(parseInt(this.dataset.id));
            }
        });
    });
}
function renderAds(ads, opts) {
    opts = opts || {};
    const append = !!opts.append;
    const grid = el('ilan-grid');
    const paginationContainer = el('ilan-pagination');
    if (!grid) return;
    if (!append) grid.innerHTML = getSkeletonCardsHtml(12);
    const doRender = () => {
    if (ads.length === 0) {
        if (!append) {
            const suggest = t('noResultsSuggest');
            const tryWider = t('tryWiderSearch');
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--text-muted);"><p style="font-size: 16px; margin-bottom: 12px;">' + t('noResults') + '</p><p style="font-size: 14px; margin-bottom: 20px;">' + suggest + '</p><button type="button" class="filtre-uygula-btn" onclick="document.getElementById(\'btn-temizle\')?.click(); document.getElementById(\'searchInput\').value=\'\'; applyFilters();" style="margin: 0 auto;">' + tryWider + '</button></div>';
            if (paginationContainer) paginationContainer.innerHTML = '';
        }
        return;
    }

    const totalPages = Math.ceil(ads.length / ADS_PER_PAGE);
    const page = Math.min(Math.max(1, window.currentAdsPage || 1), totalPages);
    window.currentAdsPage = page;
    const start = (page - 1) * ADS_PER_PAGE;
    const pageAds = ads.slice(start, start + ADS_PER_PAGE);

    if (append) {
        const frag = document.createDocumentFragment();
        const tmp = document.createElement('div');
        tmp.innerHTML = pageAds.map(ad => adToCardHtml(ad)).join('');
        while (tmp.firstChild) frag.appendChild(tmp.firstChild);
        grid.appendChild(frag);
        attachCardClickHandlers(grid);
    } else {
        grid.innerHTML = pageAds.map(ad => adToCardHtml(ad)).join('');
        attachCardClickHandlers(grid);
    }

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
    };
    setTimeout(doRender, 60);
}
window.goToAdsPage = function(p) {
    window.currentAdsPage = p;
    if (window.filteredAdsCache) renderAds(window.filteredAdsCache);
    const bolum = document.querySelector('.ilan-bolumu');
    if (bolum) bolum.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function setupInfiniteScroll() {
    const sentinel = el('ilan-infinite-sentinel');
    if (!sentinel) return;
    const obs = new IntersectionObserver(function(entries) {
        const e = entries[0];
        if (!e || !e.isIntersecting || window.infiniteScrollLoading) return;
        const ads = window.filteredAdsCache;
        if (!ads || ads.length === 0) return;
        const totalPages = Math.ceil(ads.length / ADS_PER_PAGE);
        if ((window.currentAdsPage || 1) >= totalPages) return;
        window.infiniteScrollLoading = true;
        window.currentAdsPage = (window.currentAdsPage || 1) + 1;
        renderAds(ads, { append: true });
        window.infiniteScrollLoading = false;
    }, { rootMargin: '200px', threshold: 0 });
    obs.observe(sentinel);
}

function getSellerRating(userId) {
    const key = userId || 'anon';
    const ratings = (window.userRatings || {})[key];
    if (!ratings || !Array.isArray(ratings) || ratings.length === 0) return null;
    const avg = ratings.reduce((s, r) => s + (r.stars || 5), 0) / ratings.length;
    return { avg: Math.round(avg * 10) / 10, count: ratings.length };
}
function getSellerSoldCount(userId) {
    if (!userId) return 0;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    return (window.adsDatabase || []).filter(a => a.userId === userId && a.status === 'sold' && a.soldAt && new Date(a.soldAt) >= cutoff).length;
}
function isFastSeller(userId) {
    return getSellerSoldCount(userId) >= 2;
}
function getCategoryAvgPrice(category, subCategory) {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - 30);
    const ads = (window.adsDatabase || []).filter(a =>
        (a.status || 'approved') === 'approved' && a.price > 0 &&
        (!a.expiryAt || new Date(a.expiryAt) >= now) &&
        new Date(a.createdAt) >= cutoff &&
        (a.category === category || a.subCategory === subCategory)
    );
    if (ads.length < 3) return null;
    const r = window.exchangeRates || { EUR: 1, MKD: 61.5, TRY: 35 };
    const sum = ads.reduce((s, a) => s + priceToEur(parseFloat(a.price) || 0, a.currency) * (r.MKD || 61.5), 0);
    return Math.round(sum / ads.length);
}
function findSimilarExistingAds(title, category, subCategory, excludeId) {
    const t = (title || '').toLowerCase();
    const words = t.split(/\s+/).filter(w => w.length > 2);
    if (words.length < 2) return [];
    return (window.adsDatabase || []).filter(a => {
        if (a.id === excludeId) return false;
        if ((a.status || 'approved') !== 'approved') return false;
        const at = (a.title || '').toLowerCase();
        const matchCat = a.category === category || a.subCategory === subCategory;
        const matchWords = words.filter(w => at.includes(w)).length;
        return matchCat && matchWords >= Math.min(2, words.length);
    }).slice(0, 3);
}

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
    return `<div class="similar-ads-section">
        <h3 class="similar-ads-title"><i class="fa-solid fa-layer-group"></i> ${L}</h3>
        <div class="similar-ads-grid">${similar.map(s => {
            const img = (s.images && s.images[0]) || s.image;
            return `<div class="similar-ad-card" onclick="window.closeDetailModal();window.ilanDetayAc(${s.id});">
                <div class="similar-ad-card-img"><img src="${img}" alt="" loading="lazy"></div>
                <div class="similar-ad-card-body">
                    <span class="similar-ad-card-title">${escapeHtml(s.title)}</span>
                    <span class="similar-ad-card-price">${formatPrice(s)}</span>
                </div>
            </div>`;
        }).join('')}</div></div>`;
}

// ========== İLAN DETAY ==========
function updateOgMetaForAd(ad) {
    if (!ad) return;
    const url = location.origin + location.pathname + '#ad=' + ad.id;
    const img = (ad.images && ad.images[0]) || ad.image || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800';
    const setMeta = (prop, content) => { let m = document.querySelector(`meta[property="${prop}"]`) || document.querySelector(`meta[name="${prop.replace('og:','twitter:')}"]`); if (m) m.setAttribute('content', content); };
    setMeta('og:title', (ad.title || 'İlan') + ' - Alsat');
    setMeta('og:description', ((ad.description || '').replace(/<[^>]*>/g,'').slice(0, 160) || ad.title || '') + ' - ' + formatPrice(ad));
    setMeta('og:image', img);
    setMeta('og:url', url);
}

window.ilanDetayAc = function (adId) {
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (!ad) return;
    updateOgMetaForAd(ad);
    window.recentlyViewed = window.recentlyViewed || [];
    const prevEntry = window.recentlyViewed.find(x => (x.id || x) === adId);
    const lastViewedAgo = prevEntry && (prevEntry.viewedAt || prevEntry.viewedAt === 0) ? getTimeAgo(prevEntry.viewedAt) : '';
    const now = new Date().toISOString();
    window.recentlyViewed = [{ id: adId, viewedAt: now }, ...window.recentlyViewed.map(x => typeof x === 'object' ? x : { id: x, viewedAt: now }).filter(x => (x.id || x) !== adId)].slice(0, 20);
    saveRecentlyViewed();
    ad.views = (ad.views || 0) + 1;
    ad.clicks = (ad.clicks || 0) + 1;
    saveAdsDatabase();
    const imgs = ad.images && ad.images.length ? ad.images : [ad.image];
    const hasVideo = !!ad.video;
    const videoEl = hasVideo ? `<video class="detail-main-media detail-video" src="${ad.video}" controls style="${imgs.length ? 'display:none' : ''}" onclick="event.stopPropagation()"></video>` : '';
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
            <div class="detail-media-wrap detail-media-clickable" role="button" tabindex="0" title="Büyütmek için tıklayın">${videoEl}${imgEl}<span class="detail-zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i></span></div>
            ${galleryHtml}
            ${lastViewedAgo ? `<p class="detail-last-viewed"><i class="fa-solid fa-clock"></i> ${(t('lastViewed') || 'Son görüntüleme')}: ${lastViewedAgo}</p>` : ''}
            <p><strong>${t('priceLabel')}:</strong> ${formatPrice(ad)}</p>
            <p><strong>${t('category')}:</strong> ${(window.TRANSLATIONS?.[window.currentLang]?.categories?.[ad.subCategory || ad.category]) || ad.subCategory || ad.category}</p>
            ${getAttrsDisplayHtml(ad)}
            ${ad.condition ? `<p><strong>${t('productCondition')}:</strong> ${ad.condition}</p>` : ''}
            ${ad.sellerType ? `<p><strong>${t('fromWho')}:</strong> ${ad.sellerType}</p>` : ''}
            ${ad.acceptTrade ? `<p><span class="badge-takas"><i class="fa-solid fa-arrow-right-arrow-left"></i> Takas kabul edilir</span></p>` : ''}
            <p><strong>${t('location')}:</strong> ${tCity(ad.city)} ${ad.district ? '- ' + tDistrict(ad.district) : ''}</p>
            <p><strong>${t('seller')}:</strong> ${ad.seller} ${(ad.userId && window.userVerifiedUntil && new Date(window.userVerifiedUntil[ad.userId] || '1970-01-01') > new Date()) ? ' <span class="badge-verified"><i class="fa-solid fa-badge-check"></i> Onaylı Satıcı</span>' : ''} ${ad.userId && isFastSeller(ad.userId) ? ' <span class="badge-fast-seller"><i class="fa-solid fa-bolt"></i> Hızlı Satan</span>' : ''} ${(ad.userId && getSellerRating(ad.userId)) ? ' <span class="badge-seller-rating"><i class="fa-solid fa-star"></i> ' + getSellerRating(ad.userId).avg + ' (' + getSellerRating(ad.userId).count + ')</span>' : ''}</p>
            ${(ad.userId === (getCurrentUser()?.id) || ad.detailedStats) ? `<p class="ad-stats"><strong>İstatistikler:</strong> Görüntülenme: ${ad.views || 0} | Tıklanma: ${ad.clicks || 0} | Favori: ${ad.favCount || 0}</p>` : ''}
            <p><strong>${t('descriptionLabel')}:</strong> ${ad.description || t('noDesc')}</p>
            <div class="detail-action-buttons">
                ${ad.phone ? (ad.hide_phone ? `<button type="button" class="detail-btn detail-btn-call" id="btn-show-phone-${ad.id}" onclick="window.revealPhone(${ad.id});"><i class="fa-solid fa-phone"></i> ${t('showPhone') || 'Numarayı Göster'}</button><span id="phone-revealed-${ad.id}" style="display:none;"><a href="${callUrl}" class="detail-btn detail-btn-call"><i class="fa-solid fa-phone"></i> ${t('call')}</a> <a href="${whatsappUrl}" target="_blank" class="detail-btn detail-btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> ${t('whatsapp')}</a></span>` : `<a href="${callUrl}" class="detail-btn detail-btn-call"><i class="fa-solid fa-phone"></i> ${t('call')}</a><a href="${whatsappUrl}" target="_blank" class="detail-btn detail-btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> ${t('whatsapp')}</a>`) : ''}
                <button type="button" class="detail-btn detail-btn-primary" onclick="window.sendMessageToAd(${ad.id}); window.closeDetailModal();"><i class="fa-solid fa-message"></i> ${t('messageSeller')}</button>
                ${canUserRateAd(ad.id) ? `<button type="button" class="detail-btn detail-btn-outline" onclick="window.openRatingModal(${ad.id}); return false;"><i class="fa-solid fa-star"></i> ${t('rateSeller')}</button>` : ''}
                <button type="button" class="detail-btn detail-btn-outline detail-btn-danger" onclick="window.openReportModal(${ad.id}); return false;"><i class="fa-solid fa-flag"></i> ${t('reportAd')}</button>
                ${getCurrentUser() ? `<button type="button" class="detail-btn detail-btn-outline" id="btn-price-alert-${ad.id}" onclick="window.togglePriceAlert(${ad.id}); return false;"><i class="fa-solid fa-bell"></i> <span id="price-alert-txt-${ad.id}">${hasPriceAlert(ad.id) ? t('priceAlertOff') : t('priceAlertOn')}</span></button>` : ''}
                <button type="button" class="detail-btn detail-btn-outline" onclick="window.shareAdViaWhatsApp(${ad.id}); return false;"><i class="fa-brands fa-whatsapp" style="color:#25D366"></i> WhatsApp</button>
                <button type="button" class="detail-btn detail-btn-outline" onclick="window.shareAdViaFacebook(${ad.id}); return false;"><i class="fa-brands fa-facebook" style="color:#1877f2"></i> Facebook</button>
                <button type="button" class="detail-btn detail-btn-outline" onclick="window.shareAdViaTwitter(${ad.id}); return false;"><i class="fa-brands fa-x-twitter"></i> X</button>
                <button type="button" class="detail-btn detail-btn-outline" onclick="window.copyAdLink(${ad.id}); return false;"><i class="fa-solid fa-link"></i> ${t('copyLink') || 'Link'}</button>
                <button type="button" class="detail-btn detail-btn-outline" onclick="window.shareAdViaQR(${ad.id}); return false;"><i class="fa-solid fa-qrcode"></i> QR Kod</button>
                <button type="button" class="detail-btn detail-btn-outline" onclick="window.toggleCompare(${ad.id}, event); renderCompareBar(); return false;"><i class="fa-solid fa-code-compare"></i> ${(window.compareList || []).includes(ad.id) ? 'Karşılaştırmadan Çıkar' : 'Karşılaştırmaya Ekle'}</button>
            </div>
            ${(() => { const avg = getCategoryAvgPrice(ad.category, ad.subCategory); return avg ? `<p class="category-avg-price"><i class="fa-solid fa-chart-line"></i> Bu kategoride son 30 gün ortalama: ~${avg} MKD</p>` : ''; })()}
            ${(ad.priceHistory && ad.priceHistory.length > 1) ? `<p class="price-history"><strong>Fiyat geçmişi:</strong> ${ad.priceHistory.slice(-5).reverse().map(h => formatPrice({price:h.price,currency:h.currency}) + ' (' + (h.date ? new Date(h.date).toLocaleDateString('tr-TR') : '') + ')').join(' → ')}</p>` : ''}
            ${getSimilarAdsHtml(ad)}
            ${ad.city && cityCoords[ad.city] ? `<div id="map-container" class="detail-map-bottom"><iframe width="100%" height="220" frameborder="0" style="border:0;border-radius:10px;" src="https://www.openstreetmap.org/export/embed.html?bbox=${cityCoords[ad.city][1]-0.15}%2C${cityCoords[ad.city][0]-0.08}%2C${cityCoords[ad.city][1]+0.15}%2C${cityCoords[ad.city][0]+0.08}&layer=mapnik&marker=${cityCoords[ad.city][0]}%2C${cityCoords[ad.city][1]}"></iframe></div>` : ''}
        </div>
    `;
    modal.style.display = 'flex';
    modal.classList.add('active');
    if (typeof updateMetaTags === 'function') updateMetaTags(ad.title, (ad.description || '').slice(0, 160));
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
    const mediaWrap = modal.querySelector('.detail-media-clickable');
    if (mediaWrap) {
        mediaWrap.onclick = function(e) {
            if (e.target.closest('.detail-zoom-hint') || e.target.classList.contains('detail-main-media')) {
                const img = this.querySelector('.detail-img');
                const vid = this.querySelector('.detail-video');
                const gallery = modal.querySelectorAll('.detail-gallery-thumb[data-type="img"]');
                const imgSrcs = gallery.length ? Array.from(gallery).map(g => g.dataset.src || g.src).filter(Boolean) : (img && img.src ? [img.src] : []);
                const curSrc = img && img.style.display !== 'none' ? img.src : (imgSrcs[0] || '');
                const curIdx = imgSrcs.indexOf(curSrc);
                if (vid && vid.style.display !== 'none') window.openDetailMediaLightbox([vid.src], 0, 'video');
                else if (imgSrcs.length) window.openDetailMediaLightbox(imgSrcs, curIdx >= 0 ? curIdx : 0, 'img');
            }
        };
    }
};

window.openDetailMediaLightbox = function(sources, index, type) {
    if (!sources || !sources.length) return;
    const items = sources;
    let idx = Math.max(0, Math.min(index || 0, items.length - 1));
    let lb = el('detail-media-lightbox');
    if (!lb) {
        lb = document.createElement('div');
        lb.id = 'detail-media-lightbox';
        lb.className = 'detail-media-lightbox';
        lb.innerHTML = '<div class="detail-lightbox-backdrop"></div><div class="detail-lightbox-content"><button type="button" class="detail-lightbox-close" aria-label="Kapat">&times;</button><button type="button" class="detail-lightbox-prev" aria-label="Önceki"><i class="fa-solid fa-chevron-left"></i></button><button type="button" class="detail-lightbox-next" aria-label="Sonraki"><i class="fa-solid fa-chevron-right"></i></button><button type="button" class="detail-lightbox-zoom-in" aria-label="Yakınlaştır"><i class="fa-solid fa-plus"></i></button><button type="button" class="detail-lightbox-zoom-out" aria-label="Uzaklaştır"><i class="fa-solid fa-minus"></i></button><span class="detail-lightbox-counter"></span><div class="detail-lightbox-inner"></div></div>';
        document.body.appendChild(lb);
        lb.querySelector('.detail-lightbox-backdrop').onclick = () => window.closeDetailMediaLightbox();
        lb.querySelector('.detail-lightbox-close').onclick = () => window.closeDetailMediaLightbox();
        let scale = 1;
        lb.querySelector('.detail-lightbox-zoom-in').onclick = (e) => { e.stopPropagation(); scale = Math.min(3, scale + 0.25); lb.querySelector('.detail-lightbox-inner').style.transform = 'scale(' + scale + ')'; };
        lb.querySelector('.detail-lightbox-zoom-out').onclick = (e) => { e.stopPropagation(); scale = Math.max(0.5, scale - 0.25); lb.querySelector('.detail-lightbox-inner').style.transform = 'scale(' + scale + ')'; };
    }
    const render = () => {
        const src = items[idx];
        const inner = lb.querySelector('.detail-lightbox-inner');
        inner.innerHTML = type === 'video' ? '<video src="' + src + '" controls autoplay style="max-width:90vw;max-height:85vh;border-radius:8px;"></video>' : '<img src="' + src + '" alt="" style="max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;">';
        inner.style.transform = 'scale(1)';
        scale = 1;
        const prevBtn = lb.querySelector('.detail-lightbox-prev');
        const nextBtn = lb.querySelector('.detail-lightbox-next');
        const counter = lb.querySelector('.detail-lightbox-counter');
        prevBtn.style.display = items.length > 1 ? 'flex' : 'none';
        nextBtn.style.display = items.length > 1 ? 'flex' : 'none';
        counter.textContent = items.length > 1 ? (idx + 1) + ' / ' + items.length : '';
        prevBtn.onclick = (e) => { e.stopPropagation(); idx = (idx - 1 + items.length) % items.length; render(); };
        nextBtn.onclick = (e) => { e.stopPropagation(); idx = (idx + 1) % items.length; render(); };
    };
    render();
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
    window._detailLightboxEsc = (ev) => { if (ev.key === 'Escape') window.closeDetailMediaLightbox(); };
    document.addEventListener('keydown', window._detailLightboxEsc);
};
window.closeDetailMediaLightbox = function() {
    const lb = el('detail-media-lightbox');
    if (lb) {
        lb.classList.remove('active');
        document.body.style.overflow = '';
        if (window._detailLightboxEsc) document.removeEventListener('keydown', window._detailLightboxEsc);
    }
};

window.closeDetailModal = function () {
    window.closeDetailMediaLightbox();
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
        window.openLoginModal();
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
    if (!u) { showToast('loginRequired', 'warning', 2000); window.openLoginModal(); return; }
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
window.revealPhone = function(adId) {
    const btn = el('btn-show-phone-' + adId);
    const span = el('phone-revealed-' + adId);
    if (btn && span) {
        btn.style.display = 'none';
        span.style.display = 'inline';
        if (window.API_BASE && window.AlsatAPI?.isLoggedIn?.() && window.AlsatAPI.recordPhoneView) {
            window.AlsatAPI.recordPhoneView(adId).catch(function(){});
        }
    }
};
window.copyAdLink = function(adId) {
    const url = location.origin + location.pathname + '#ad=' + adId;
    navigator.clipboard?.writeText(url).then(() => showToast('linkCopied', 'success', 1500));
};
window.shareAdViaFacebook = function(adId) {
    const ad = window.adsDatabase?.find(a => a.id === adId);
    if (!ad) return;
    const url = encodeURIComponent(location.origin + location.pathname + '#ad=' + adId);
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank', 'width=600,height=400');
};
window.shareAdViaTwitter = function(adId) {
    const ad = window.adsDatabase?.find(a => a.id === adId);
    if (!ad) return;
    const text = encodeURIComponent(ad.title + ' - ' + formatPrice(ad));
    const url = encodeURIComponent(location.origin + location.pathname + '#ad=' + adId);
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank', 'width=600,height=400');
};
window.shareAdViaQR = function(adId) {
    const ad = window.adsDatabase?.find(a => a.id === adId);
    if (!ad) return;
    const url = location.origin + location.pathname + '#ad=' + adId;
    const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=' + encodeURIComponent(url);
    let m = el('qr-modal');
    if (!m) {
        m = document.createElement('div');
        m.id = 'qr-modal';
        m.className = 'modern-modal';
        m.innerHTML = '<div class="modal-content" style="max-width:320px;text-align:center;"><span class="close-btn" onclick="this.closest(\'.modern-modal\').style.display=\'none\'">&times;</span><h3>QR Kod</h3><p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">' + t('qrScanToShare') + '</p><img id="qr-modal-img" src="" alt="QR" style="width:256px;height:256px;border:1px solid var(--border-color);border-radius:12px;"></div>';
        document.body.appendChild(m);
    }
    el('qr-modal-img').src = qrUrl;
    m.style.display = 'flex';
};

window.submitReport = async function (adId) {
    const user = getCurrentUser();
    if (!user) return;
    const reason = (el('report-reason')?.value) || 'other';
    const note = (el('report-note')?.value || '').trim();
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (!ad) return;
    if (window.API_BASE && window.AlsatAPI && window.AlsatAPI.isLoggedIn && window.AlsatAPI.isLoggedIn()) {
        try {
            await window.AlsatAPI.reportAd(adId, reason + (note ? ': ' + note : ''));
        } catch (e) {
            showToast(e && e.error ? e.error : 'Rapor gönderilemedi', 'error', 2500);
            return;
        }
    } else {
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
    }
    el('report-ad-modal').style.display = 'none';
    showToast('reportSuccess', 'success', 2500);
};

// ========== FAVORİ ==========
window.toggleFavorite = async function (adId, event) {
    if (event) event.stopPropagation();
    const user = getCurrentUser();
    if (!user) {
        showToast('favAdd', 'warning', 2000);
        window.openLoginModal();
        return;
    }
    const idx = window.favorites.indexOf(adId);
    const ad = window.adsDatabase.find(a => a.id === adId);
    if (window.API_BASE && window.AlsatAPI && window.AlsatAPI.isLoggedIn && window.AlsatAPI.isLoggedIn()) {
        try {
            if (idx >= 0) {
                await window.AlsatAPI.removeFavorite(user.id, adId);
                window.favorites.splice(idx, 1);
                showToast('favRemoved', 'info', 1500);
            } else {
                await window.AlsatAPI.addFavorite(adId);
                window.favorites.push(adId);
                showToast('favAdded', 'success', 1500);
            }
        } catch (e) {
            showToast(e && e.error ? e.error : 'Bir hata oluştu', 'error', 2000);
            return;
        }
    } else {
        if (idx >= 0) {
            window.favorites.splice(idx, 1);
            if (ad) { ad.favCount = Math.max(0, (ad.favCount || 0) - 1); saveAdsDatabase(); }
            showToast('favRemoved', 'info', 1500);
        } else {
            window.favorites.push(adId);
            if (ad) { ad.favCount = (ad.favCount || 0) + 1; saveAdsDatabase(); }
            showToast('favAdded', 'success', 1500);
        }
        saveFavorites();
    }
    applyFilters();
    updateHeaderUI();
};

window.toggleCompare = function(adId, e) {
    if (e) e.stopPropagation();
    window.compareList = window.compareList || [];
    const idx = window.compareList.indexOf(adId);
    if (idx >= 0) {
        window.compareList.splice(idx, 1);
        showToast(t('compareRemoved'), 'info', 1500);
    } else if (window.compareList.length >= 3) {
        showToast(t('maxCompare3'), 'warning', 2000);
        return;
    } else {
        window.compareList.push(adId);
        showToast(t('compareAdded'), 'success', 1500);
    }
    saveCompareList();
    renderCompareBar();
    applyFilters();
};
function renderCompareBar() {
    const bar = el('compare-bar');
    const txt = el('compare-bar')?.querySelector('.compare-bar-text');
    const btn = el('compare-bar-btn');
    if (!bar) return;
    const list = window.compareList || [];
    if (list.length === 0) {
        bar.classList.remove('visible');
        return;
    }
    bar.classList.add('visible');
    if (txt) txt.textContent = list.length + ' ilan seçildi';
    btn.onclick = () => window.openCompareModal();
    var clearBtn = bar.querySelector('.compare-bar-clear');
    if (clearBtn) clearBtn.onclick = function() {
        window.compareList = [];
        saveCompareList();
        renderCompareBar();
        applyFilters();
    };
}
window.openCompareModal = function() {
    const ids = window.compareList || [];
    if (ids.length === 0) return;
    const ads = ids.map(id => window.adsDatabase?.find(a => a.id === id)).filter(Boolean);
    if (ads.length === 0) return;
    let m = el('compare-modal');
    if (!m) {
        m = document.createElement('div');
        m.id = 'compare-modal';
        m.className = 'modern-modal';
        document.body.appendChild(m);
    }
    const rows = ['title', 'price', 'city', 'condition', 'category'];
    const labels = { title: 'Başlık', price: 'Fiyat', city: 'Şehir', condition: 'Durum', category: 'Kategori' };
    m.innerHTML = `<div class="modal-content" style="max-width:900px;"><span class="close-btn" onclick="this.closest('.modern-modal').style.display='none'">&times;</span><h3>İlan Karşılaştırma</h3><table class="compare-table"><thead><tr><th>Özellik</th>${ads.map(a => `<th>${escapeHtml((a.title||'').slice(0,30))}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr><td>${labels[r]||r}</td>${ads.map(a => `<td>${r === 'price' ? formatPrice(a) : escapeHtml(String((a[r]||a.subCategory||a.category||'-')))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    m.style.display = 'flex';
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
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function updateProfilePage(user) {
    el('profile-name-disp').textContent = user.name || 'Kullanıcı';
    el('profile-email-disp').textContent = user.email || '';
    const myAds = window.adsDatabase.filter(a => a.userId === user.id);
    el('profile-ad-count').textContent = myAds.length;
    el('profile-fav-count').textContent = window.favorites.length;
    const credit = (window.userCredits[user.id] || 0);
    el('profile-credit-disp').textContent = credit + ' MKD';
    el('current-credit').textContent = credit + ' MKD';
    const tabPayment = el('tab-btn-payment');
    const creditStat = el('profile-credit-stat');
    if (tabPayment) tabPayment.style.display = isAdmin() ? '' : 'none';
    if (creditStat) creditStat.style.display = isAdmin() ? '' : 'none';
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

// ========== MAĞAZALAR ==========
function getUserStore() {
    const user = getCurrentUser();
    if (!user) return null;
    return (window.storesDatabase || []).find(s => s.ownerId === user.id) || null;
}
function isStoreOwner(userId) {
    return (window.storesDatabase || []).some(s => s.ownerId === userId);
}

function toggleStoreFollow(storeId) {
    const user = getCurrentUser();
    if (!user) { showToast('loginRequired', 'warning'); window.openLoginModal(); return; }
    let arr = JSON.parse(localStorage.getItem('alsat_followed_stores') || '[]');
    if (arr.includes(storeId)) arr = arr.filter(id => id !== storeId);
    else arr.push(storeId);
    localStorage.setItem('alsat_followed_stores', JSON.stringify(arr));
    openStoreDetail(storeId);
}

function renderStoreReviewsList(storeId) {
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    const reviews = (window.storeReviews || []).filter(r => r.storeId === storeId);
    const sortVal = el('store-reviews-sort')?.value || 'newest';
    let sorted = [...reviews];
    if (sortVal === 'highest') sorted.sort((a,b) => (b.stars||0) - (a.stars||0));
    else if (sortVal === 'lowest') sorted.sort((a,b) => (a.stars||0) - (b.stars||0));
    else sorted.sort((a,b) => (b.id||0) - (a.id||0));
    const reviewsList = el('store-reviews-list');
    if (!reviewsList) return;
    if (sorted.length === 0) { reviewsList.innerHTML = '<p class="empty-state" style="text-align:center;padding:40px;">' + (L.noReviews || 'Henüz yorum yok') + '</p>'; return; }
    reviewsList.innerHTML = sorted.map(r => {
        const photos = (r.photos || []).map(src => '<img src="' + src + '" alt="" style="width:80px;height:80px;object-fit:cover;border-radius:8px;cursor:pointer;" onclick="window.open(this.src)">').join('');
        return '<div class="store-review-item" style="background:var(--card-bg);border-radius:12px;padding:16px;margin-bottom:12px;border:1px solid var(--border-color);"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><span style="color:var(--primary);font-weight:700;">★ ' + (r.stars||5) + '</span><span style="font-size:12px;color:var(--text-muted);">' + (r.userName||'Kullanıcı') + '</span></div><p style="margin:0 0 8px;font-size:14px;">' + escapeHtml(r.comment||'') + '</p>' + (photos ? '<div style="display:flex;gap:8px;flex-wrap:wrap;">' + photos + '</div>' : '') + '</div>';
    }).join('');
}

function showProductQuickView(productId) {
    const prod = (window.storeProducts || []).find(p => p.id === productId);
    if (!prod) return;
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    showToast(prod.title + ' - ' + (prod.price||0) + ' MKD', 'info');
}

function renderAlsatProductCard(p, L) {
    const op = p.originalPrice && p.originalPrice > (p.price||0);
    const dPct = op && p.originalPrice ? Math.round(100 - (p.price||0) / p.originalPrice * 100) : (p.discountPercent || 0);
    const discountBadge = (op && dPct > 0) ? '<span class="product-badge-best">-%' + dPct + '</span>' : (p.bestSeller ? '<span class="product-badge-best">EN ÇOK SATAN</span>' : (p.goodPrice ? '<span class="product-badge-good">İYİ FİYAT</span>' : ''));
    const favCount = (p.favoritedCount || 0) > 0 ? '<p class="product-fav-count">' + p.favoritedCount + ' ' + (L.favorited || 'kişi favoriledi!') + '</p>' : '';
    const origPrice = op ? '<span class="product-original">' + p.originalPrice + ' MKD</span>' : '';
    const priceSpan = op ? '<span class="product-price product-price-discount">' + (p.price||0) + ' MKD</span>' : '<span class="product-price">' + (p.price||0) + ' MKD</span>';
    const freeShip = p.freeShipping ? '<p class="product-shipping"><i class="fa-solid fa-truck"></i> ' + (L.freeShipping || 'Kargo Bedava') + '</p>' : '';
    const isFav = (window.storeFavorites || []).includes(p.id);
    const favIcon = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    return `
    <div class="alsat-product-card-trendyol" data-product-id="${p.id}" data-store-id="${p.storeId}">
        <div class="product-img-wrap" style="background:url(${p.image||''}) center/cover;">${discountBadge}
            <button type="button" class="product-fav-btn ${isFav ? 'favorited' : ''}" data-product-id="${p.id}"><i class="${favIcon}"></i></button>
            <button type="button" class="product-cart-btn" data-product-id="${p.id}" title="${L.addToCart || 'Sepete Ekle'}"><i class="fa-solid fa-cart-plus"></i></button>
        </div>
        <div class="product-body">
            <h4 class="product-title">${escapeHtml(p.title)}</h4>${favCount}
            <div class="product-rating"><i class="fa-solid fa-star" style="color:#ffc107;"></i> ${(p.rating||0)} (${p.reviewCount||0})</div>
            <div>${origPrice} ${priceSpan}</div>${freeShip}
        </div>
    </div>`;
}

function addToStoreCart(productId, qty) {
    const prod = (window.storeProducts || []).find(p => p.id === productId);
    if (!prod) return;
    qty = qty || 1;
    window.storeCart = window.storeCart || [];
    const existing = window.storeCart.find(x => x.productId === productId);
    if (existing) existing.qty = (existing.qty || 1) + qty; else window.storeCart.push({ productId, qty: qty });
    saveStoreCart();
    const badge = el('alsat-cart-badge');
    if (badge) { const cnt = (window.storeCart || []).reduce((a,x) => a + (x.qty||1), 0); badge.textContent = cnt; badge.style.display = cnt ? 'inline-flex' : 'none'; }
    showToast((prod.title || 'Ürün') + ' ' + (window.TRANSLATIONS?.[window.currentLang]?.addedToCart || 'sepete eklendi'), 'success');
}

function toggleStoreProductFavorite(productId) {
    window.storeFavorites = window.storeFavorites || [];
    const idx = window.storeFavorites.indexOf(productId);
    if (idx >= 0) {
        window.storeFavorites.splice(idx, 1);
        saveStoreFavorites();
        showToast('favRemoved', 'info');
    } else {
        window.storeFavorites.push(productId);
        saveStoreFavorites();
        showToast('favAdded', 'success');
    }
    updateHeaderUI();
    renderAlsatStorePage();
}
function ensureAlsatStoreData() {
    if (!window.storeProducts || window.storeProducts.length === 0) {
        if (typeof window.initStoreProducts === 'function') {
            window.storeProducts = window.initStoreProducts();
            try { localStorage.setItem('alsat_store_products', JSON.stringify(window.storeProducts)); } catch(e){}
        } else {
            try { localStorage.removeItem('alsat_store_products'); } catch(e){}
            if (location.reload) location.reload();
        }
    }
}

function getAlsatFilterState() {
    const cats = []; qsa('#filter-category-list input:checked').forEach(cb => cats.push(cb.value));
    const brands = []; qsa('#filter-brand-list input:checked').forEach(cb => brands.push(parseInt(cb.value, 10)));
    let minDisc = 0; ['filter-disc-5','filter-disc-10','filter-disc-30','filter-disc-50'].forEach(id => { const cb = el(id); if (cb?.checked) minDisc = Math.max(minDisc, parseInt(cb.value, 10)); });
    const quick = document.querySelector('.alsat-quick-filter.active')?.dataset?.quick || 'recommended';
    const sort = (el('alsat-sort-select')?.value || 'recommended');
    return { cats, brands, minDisc, quick, sort };
}
function initAlsatFilterSidebar() {
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    const cats = window.storeCategories || [];
    const stores = window.storesDatabase || [];
    const catList = el('filter-category-list');
    const brandList = el('filter-brand-list');
    if (catList) catList.innerHTML = cats.map(c => `<label><input type="checkbox" value="${c.name}"> <span>${escapeHtml(c.name)}</span></label>`).join('');
    if (brandList) brandList.innerHTML = stores.map(s => `<label><input type="checkbox" value="${s.id}"> <span>${escapeHtml(s.name)}</span></label>`).join('');
    const catSearch = el('filter-category-search'); if (catSearch) catSearch.placeholder = (L.searchCategory || 'Kategori Ara');
    const brandSearch = el('filter-brand-search'); if (brandSearch) brandSearch.placeholder = (L.searchBrand || 'Marka Ara');
    function filterList(listId, searchId) { const q = (el(searchId)?.value || '').trim().toLowerCase(); qsa('#' + listId + ' label').forEach(l => { const txt = (l.textContent || '').trim(); l.style.display = !q || txt.toLowerCase().includes(q) ? '' : 'none'; }); }
    if (catSearch) catSearch.oninput = () => filterList('filter-category-list', 'filter-category-search');
    if (brandSearch) brandSearch.oninput = () => filterList('filter-brand-list', 'filter-brand-search');
    qsa('.alsat-filter-header').forEach(h => { h.onclick = () => h.closest('.alsat-filter-section')?.classList.toggle('collapsed'); });
    const clearBtn = el('alsat-filter-clear-btn'); if (clearBtn) clearBtn.onclick = () => { qsa('#alsat-filter-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false); document.querySelectorAll('.alsat-quick-filter').forEach(b => b.classList.remove('active')); document.querySelector('.alsat-quick-filter[data-quick="recommended"]')?.classList.add('active'); const sel = el('alsat-sort-select'); if (sel) sel.value = 'recommended'; renderAlsatStorePage(); };
    qsa('#alsat-filter-sidebar input[type="checkbox"]').forEach(cb => { cb.onchange = () => renderAlsatStorePage(); });
    const toggleBtn = el('alsat-filter-toggle-mobile'); const sidebar = el('alsat-filter-sidebar'); const mainWrap = el('alsat-main-with-filters');
    const closeBtn = el('alsat-filter-close-btn'); const overlay = el('alsat-filter-overlay');
    function closeFilterSidebar() { sidebar?.classList.remove('open'); mainWrap?.classList.remove('filter-open'); }
    if (toggleBtn) toggleBtn.onclick = () => { sidebar?.classList.add('open'); mainWrap?.classList.add('filter-open'); };
    if (closeBtn) closeBtn.onclick = closeFilterSidebar;
    if (overlay) overlay.onclick = closeFilterSidebar;
    qsa('.alsat-quick-filter').forEach(b => { b.onclick = () => { document.querySelectorAll('.alsat-quick-filter').forEach(x => x.classList.remove('active')); b.classList.add('active'); renderAlsatStorePage({ scrollToProducts: true }); }; });
    const sortSel = el('alsat-sort-select'); if (sortSel) sortSel.onchange = () => renderAlsatStorePage();
}

function renderAlsatStorePage(opts) {
    ensureAlsatStoreData();
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    const products = window.storeProducts || [];
    const brands = window.storesDatabase || [];
    const q = (el('alsat-store-search')?.value || '').trim().toLowerCase();
    const navMinDisc = parseInt(el('stores-page')?.dataset?.alsatMinDisc || '0');
    const catFilter = el('stores-page')?.dataset?.alsatCategory || '';
    const filterState = getAlsatFilterState();
    const minDisc = Math.max(navMinDisc, filterState.minDisc);
    let filtered = products;
    if (q) filtered = filtered.filter(p => (p.title||'').toLowerCase().includes(q) || (p.category||'').toLowerCase().includes(q) || (brands.find(b=>b.id===p.storeId)?.name||'').toLowerCase().includes(q));
    if (minDisc > 0) filtered = filtered.filter(p => (p.discountPercent||0) >= minDisc);
    const catMap = { kadin: 'Kadın', erkek: 'Erkek', 'anne-cocuk': 'Anne & Çocuk', 'ev-yasam': 'Ev & Yaşam', supermarket: 'Süpermarket', kozmetik: 'Kozmetik', 'ayakkabi-canta': 'Ayakkabı', elektronik: 'Elektronik', 'saat-aksesuar': 'Aksesuar', spor: 'Spor' };
    if (catFilter && catMap[catFilter]) filtered = filtered.filter(p => (p.category||'').toLowerCase().includes((catMap[catFilter]||'').toLowerCase()));
    if (filterState.cats.length) filtered = filtered.filter(p => filterState.cats.some(c => (p.category||'').toLowerCase().includes(c.toLowerCase())));
    if (filterState.brands.length) filtered = filtered.filter(p => filterState.brands.includes(p.storeId));
    const filterMode = el('stores-page')?.dataset?.alsatFilter || '';
    if (filterMode === 'flash') filtered = filtered.filter(p => (p.discountPercent||0) >= 30);
    if (filterMode === 'bestsellers') filtered = filtered.filter(p => p.bestSeller).length ? filtered.filter(p => p.bestSeller) : [...filtered].sort((a,b) => (b.reviewCount||0) - (a.reviewCount||0)).slice(0, 100);
    if (filterState.quick === 'freeship') filtered = filtered.filter(p => p.freeShipping);
    if (filterState.quick === 'discount') filtered = filtered.filter(p => (p.discountPercent||0) >= 20);
    if (filterState.quick === 'new') filtered = filtered.filter(p => p.bestSeller);
    if (filterState.quick === 'recommended') { filtered = [...filtered].sort((a,b) => (parseFloat(b.rating)||0) - (parseFloat(a.rating)||0)); }
    const sortVal = filterState.sort || 'recommended';
    if (sortVal === 'price-asc') filtered = [...filtered].sort((a,b) => (a.price||0) - (b.price||0));
    else if (sortVal === 'price-desc') filtered = [...filtered].sort((a,b) => (b.price||0) - (a.price||0));
    else if (sortVal === 'rating') filtered = [...filtered].sort((a,b) => (parseFloat(b.rating)||0) - (parseFloat(a.rating)||0));
    else if (sortVal === 'newest') filtered = [...filtered].sort((a,b) => (b.id||0) - (a.id||0));
    const popular = [...filtered].sort((a,b) => (b.reviewCount||0) - (a.reviewCount||0)).slice(0, 20);
    const countEl = el('alsat-products-count'); if (countEl) countEl.textContent = filtered.length + ' ' + (L.productsTotal || 'ürün');
    const scrollEl = el('alsat-popular-products');
    if (scrollEl) scrollEl.innerHTML = popular.length ? popular.map(p => renderAlsatProductCard(p, L)).join('') : '<p class="empty-state">' + (L.noResults || 'Ürün bulunamadı') + '</p>';
    scrollEl?.querySelectorAll('.alsat-product-card-trendyol').forEach(c => { c.style.cursor = 'pointer'; c.addEventListener('click', function(e){ if (!e.target.closest('.product-fav-btn, .product-cart-btn')) openProductDetail(parseInt(this.dataset.productId)); }); });
    scrollEl?.querySelectorAll('.product-fav-btn').forEach(b => b.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); toggleStoreProductFavorite(parseInt(this.dataset.productId)); }));
    scrollEl?.querySelectorAll('.product-cart-btn').forEach(b => b.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); addToStoreCart(parseInt(this.dataset.productId)); }));
    const gridEl = el('alsat-all-products');
    if (gridEl) gridEl.innerHTML = filtered.length ? filtered.map(p => renderAlsatProductCard(p, L)).join('') + '<p class="alsat-more-hint" style="grid-column:1/-1;text-align:center;padding:16px;color:var(--text-muted);font-size:14px;">' + filtered.length + ' ' + (L.productsTotal || 'ürün') + '</p>' : '<p class="empty-state" style="grid-column:1/-1;">' + (L.noResults || 'Ürün bulunamadı') + '</p>';
    gridEl?.querySelectorAll('.alsat-product-card-trendyol').forEach(c => { c.style.cursor = 'pointer'; c.addEventListener('click', function(e){ if (!e.target.closest('.product-fav-btn, .product-cart-btn')) openProductDetail(parseInt(this.dataset.productId)); }); });
    gridEl?.querySelectorAll('.product-fav-btn').forEach(b => b.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); toggleStoreProductFavorite(parseInt(this.dataset.productId)); }));
    gridEl?.querySelectorAll('.product-cart-btn').forEach(b => b.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); addToStoreCart(parseInt(this.dataset.productId)); }));
    if (opts && opts.scrollToProducts) {
        const productsTop = el('alsat-popular-products') || el('alsat-all-products');
        if (productsTop) productsTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const catGrid = el('alsat-category-grid');
    const cats = window.storeCategories || [];
    const catImgs = ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200','https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200','https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200','https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200','https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200','https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200','https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'];
    if (catGrid) catGrid.innerHTML = cats.slice(0,8).map((c,i) => `<a href="#" class="alsat-cat-card" data-cat="${c.id}" style="position:relative;"><img src="${catImgs[i%catImgs.length]}" class="cat-img" alt=""><span class="cat-discount">%</span><span class="cat-name">${c.name}</span></a>`).join('');
    catGrid?.querySelectorAll('.alsat-cat-card').forEach(c => c.addEventListener('click', function(e){ e.preventDefault(); const cat=this.dataset.cat; el('stores-page').dataset.alsatCategory=cat; document.querySelectorAll('.alsat-nav-item[data-cat]').forEach(n=>n.classList.toggle('active',n.dataset.cat===cat)); renderAlsatStorePage({ scrollToProducts: true }); }));
    const campGrid = el('alsat-campaign-grid');
    const campaigns = window.storeCampaigns || [];
    if (campGrid) campGrid.innerHTML = campaigns.map(c => {
        const brand = brands.find(b => b.id === c.brandId);
        return `<a href="#" class="alsat-campaign-card" data-store-id="${c.brandId}" style="background:${c.bg||'#eee'};"><span class="campaign-brand">${brand?.name || 'Marka'}</span><span class="campaign-dates">${c.dates||''}</span><p class="campaign-title">${c.title||''}</p>${c.popular ? '<span class="campaign-popular">POPÜLER KAMPANYA</span>' : ''}</a>`;
    }).join('');
    campGrid?.querySelectorAll('.alsat-campaign-card').forEach(c => c.addEventListener('click', function(e){ e.preventDefault(); openStoreDetail(parseInt(this.dataset.storeId)); }));
}

window.openStoresPage = function () {
    const hv = el('homepage-view');
    const lv = el('listing-view');
    window.alsatStoreFrom = (lv && lv.style.display === 'block') ? 'listing' : 'homepage';
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    if (hv) hv.style.setProperty('display', 'none');
    if (lv) lv.style.setProperty('display', 'none');
    const sp = el('stores-page');
    if (!sp) return;
    sp.style.display = 'block';
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { document.documentElement.scrollTop = document.body.scrollTop = 0; window.scrollTo(0, 0); });
    sp.dataset.alsatCategory = '';
    sp.dataset.alsatMinDisc = '0';
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    const user = getCurrentUser();
    const safe = (id, prop, val) => { const e = el(id); if (e && val != null) e[prop] = val; };
    safe('stores-page-title', 'textContent', L.alsatStore || 'Alsat Store');
    safe('stores-back-txt', 'textContent', L.back || 'Geri');
    safe('alsat-store-search', 'placeholder', L.searchProductCategory || 'Ürün, kategori veya marka ara');
    safe('alsat-login-txt', 'textContent', user ? (user.name || (L.profile || 'Profilim')) : (L.login || 'Giriş Yap'));
    safe('alsat-profile-txt', 'textContent', L.profile || 'Profilim');
    safe('alsat-cart-txt', 'textContent', L.myCart || 'Sepetim');
    const hasApprovedApp = user && (window.sellerApplications || []).some(a => a.status === 'approved' && (a.email || '').toLowerCase() === (user.email || '').toLowerCase());
    const myStore = user ? (window.storesDatabase || []).find(s => s.ownerId === user.id) : null;
    safe('alsat-seller-txt', 'textContent', hasApprovedApp ? (L.myStore || 'MAĞAZANIZ') : (L.becomeSeller || 'Satıcı Ol'));
    if (el('alsat-seller-link')) el('alsat-seller-link').onclick = function(e){ e.preventDefault(); if (!user) { openSellerApplicationPage(); return; } if (hasApprovedApp) { if (myStore) openStoreDetail(myStore.id); else window.openCreateStoreModal?.(); } else openSellerApplicationPage(); };
    safe('nav-kategoriler-top', 'textContent', 'Kategoriler');
    safe('populer-urunler-title', 'textContent', L.popularProducts || 'Popüler Ürünler');
    safe('kategori-indirim-title', 'textContent', L.discoverCategoryDiscounts || 'Kategorilerdeki İndirimleri Keşfet');
    safe('kampanya-title', 'textContent', L.campaigns || 'Kampanyalar');
    safe('tum-urunler-title', 'textContent', L.allProducts || 'Tüm Ürünler');
    const loginLink = el('alsat-login-link');
    if (loginLink) loginLink.onclick = e => { e.preventDefault(); if (!user) window.openLoginModal(); else { el('profile-button')?.click(); } };
    const profileLink = el('alsat-profile-link');
    if (profileLink) profileLink.onclick = e => { e.preventDefault(); if (user) { document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none'); el('profile-page').style.display = 'block'; if (typeof updateProfilePage === 'function') updateProfilePage(user); } else { showToast('loginRequired','warning'); window.openLoginModal(); } };
    const cartLink = el('alsat-cart-link');
    if (cartLink) cartLink.onclick = e => { e.preventDefault(); window.openCartPage?.(); };
    const cartBadge = el('alsat-cart-badge');
    if (cartBadge) { const cnt = (window.storeCart || []).reduce((a,x) => a + (x.qty||1), 0); cartBadge.textContent = cnt; cartBadge.style.display = cnt ? 'inline-flex' : 'none'; }
    sp.dataset.alsatFilter = '';
    const searchInp = el('alsat-store-search');
    if (searchInp) { searchInp.value = ''; searchInp.oninput = () => renderAlsatStorePage(); searchInp.onkeydown = e => { if (e.key === 'Enter') renderAlsatStorePage(); }; }
    const navEl = el('alsat-store-nav');
    if (navEl) navEl.dataset.navBound = '1';
    document.querySelectorAll('.discount-banner').forEach(b => { b.onclick = e => { e.preventDefault(); if (sp) sp.dataset.alsatFilter = ''; document.querySelectorAll('.alsat-nav-item').forEach(n=>n.classList.remove('active')); document.querySelectorAll('.discount-banner').forEach(x=>x.classList.remove('active')); b.classList.add('active'); if (sp) sp.dataset.alsatMinDisc = b.dataset.min||'0'; renderAlsatStorePage({ scrollToProducts: true }); }; });
    el('alsat-view-all-products')?.addEventListener('click', () => { el('alsat-all-products')?.scrollIntoView({behavior:'smooth'}); });
    if (!sp.dataset.filterInit) { sp.dataset.filterInit = '1'; initAlsatFilterSidebar(); }
    const backBtn = el('back-stores-btn');
    if (backBtn) backBtn.onclick = function() {
        sp.style.display = 'none';
        const from = window.alsatStoreFrom || 'homepage';
        if (from === 'listing') {
            if (el('listing-view')) el('listing-view').style.setProperty('display', 'block');
            if (el('homepage-view')) el('homepage-view').style.setProperty('display', 'none');
        } else {
            if (el('homepage-view')) el('homepage-view').style.setProperty('display', 'block');
            if (el('listing-view')) el('listing-view').style.setProperty('display', 'none');
        }
        window.scrollTo(0, 0);
    };
    renderAlsatStorePage({ scrollToProducts: true });
};

window.openProductDetail = function (productId) {
    if (!isAdmin()) return; // Store ürün detayı sadece admin için
    const prod = (window.storeProducts || []).find(p => p.id === productId);
    if (!prod) return;
    const page = el('product-detail-page');
    if (!page) return;
    window.productDetailFrom = el('store-detail-page')?.style.display === 'block' ? 'store-detail' : 'stores';
    window.productDetailStoreId = prod.storeId;
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    page.style.display = 'block';
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    const store = (window.storesDatabase || []).find(s => s.id === prod.storeId);
    const safe = (id, prop, val) => { const e = el(id); if (e && val != null) e[prop] = val; };
    const imgs = prod.images && prod.images.length ? prod.images : [prod.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'];
    const badgesEl = el('product-detail-badges');
    if (badgesEl) {
        const badges = [];
        if (prod.freeShipping) badges.push('<span class="product-badge product-badge-shipping"><i class="fa-solid fa-truck"></i> ' + (L.freeShipping || 'KARGO BEDAVA') + '</span>');
        if (store && store.verified) badges.push('<span class="product-badge product-badge-seller"><i class="fa-solid fa-shield-halved"></i> ' + (L.successfulSeller || 'BAŞARILI SATICI') + '</span>');
        badgesEl.innerHTML = badges.join('');
        badgesEl.style.display = badges.length ? 'flex' : 'none';
    }
    el('product-detail-main-img').style.backgroundImage = 'url(' + imgs[0] + ')';
    el('product-detail-thumbs').innerHTML = imgs.slice(0, 5).map((src, i) => '<div class="product-thumb' + (i === 0 ? ' active' : '') + '" style="background:url(' + src + ') center/cover" data-img="' + src + '"></div>').join('');
    el('product-detail-thumbs').querySelectorAll('.product-thumb').forEach(t => t.onclick = () => { el('product-detail-thumbs').querySelectorAll('.product-thumb').forEach(x => x.classList.remove('active')); t.classList.add('active'); el('product-detail-main-img').style.backgroundImage = 'url(' + t.dataset.img + ')'; });
    safe('product-detail-title', 'textContent', prod.title);
    const catName = prod.category || store?.name || '';
    el('product-detail-breadcrumb').innerHTML = 'Alsat Store &gt; ' + escapeHtml(catName) + ' &gt; ' + escapeHtml((prod.title || '').slice(0, 40));
    safe('product-detail-rating', 'textContent', '★ ' + (prod.rating || 0).toFixed(1));
    safe('product-detail-reviews', 'textContent', '(' + (prod.reviewCount || 0) + ' değerlendirme)');
    safe('product-detail-views', 'textContent', (prod.viewCount || Math.floor(Math.random() * 500 + 100)) + ' kişi son 24 saatte inceledi');
    const orig = prod.originalPrice && prod.originalPrice > (prod.price || 0);
    const priceEl = el('product-detail-price');
    const origEl = el('product-detail-original');
    priceEl.textContent = (prod.price || 0) + ' MKD';
    priceEl.classList.toggle('price-discounted', !!orig);
    origEl.textContent = orig ? prod.originalPrice + ' MKD' : '';
    origEl.style.display = orig ? '' : 'none';
    const discEl = el('product-detail-discount');
    discEl.textContent = (prod.discountPercent && prod.discountPercent > 0) ? ' Sepette %' + prod.discountPercent + ' indirim' : '';
    discEl.style.display = (prod.discountPercent && prod.discountPercent > 0) ? '' : 'none';
    const specs = [];
    if (prod.fit) specs.push({ label: 'Kalıp', value: prod.fit });
    if (prod.collarType) specs.push({ label: 'Yaka Tipi', value: prod.collarType });
    if (prod.material) specs.push({ label: 'Materyal', value: prod.material });
    if (prod.pattern) specs.push({ label: 'Desen', value: prod.pattern });
    if (prod.color) specs.push({ label: 'Renk', value: prod.color });
    if (prod.size) specs.push({ label: 'Beden', value: prod.size });
    if (prod.sleeveType) specs.push({ label: 'Kol Tipi', value: prod.sleeveType });
    if (prod.fabricType) specs.push({ label: 'Kumaş Tipi', value: prod.fabricType });
    if (prod.closureType) specs.push({ label: 'Kapama Şekli', value: prod.closureType });
    if (specs.length) {
        el('product-detail-specs').innerHTML = '<h4 class="specs-title">Öne Çıkan Özellikler</h4><div class="specs-grid">' + specs.map(s => '<div class="spec-row"><span class="spec-label">' + s.label + ':</span> <span class="spec-value">' + escapeHtml(s.value) + '</span></div>').join('') + '</div>';
        el('product-detail-specs').style.display = '';
    } else el('product-detail-specs').style.display = 'none';
    const colors = prod.colors && prod.colors.length ? prod.colors : (prod.color ? [prod.color] : []);
    if (colors.length) { el('product-detail-colors').innerHTML = '<span class="spec-label">Renk:</span> ' + colors.map(c => '<span class="color-swatch" style="background:' + (c.toLowerCase().includes('siyah') ? '#333' : c.toLowerCase().includes('beyaz') ? '#eee' : '#888') + '">' + c + '</span>').join(''); el('product-detail-colors').style.display = ''; } else el('product-detail-colors').style.display = 'none';
    const sizes = prod.sizes && prod.sizes.length ? prod.sizes : (prod.size ? [prod.size] : ['S','M','L','XL']);
    el('product-detail-sizes').innerHTML = '<span class="spec-label">Beden:</span> ' + sizes.map(s => '<button type="button" class="size-btn">' + s + '</button>').join('');
    el('product-detail-add-cart').onclick = () => { addToStoreCart(productId); };
    el('product-detail-buy-now').onclick = () => { addToStoreCart(productId); showToast(L.goToCart || 'Sepete gidin', 'info'); };
    const isFav = (window.storeFavorites || []).includes(productId);
    const favBtn = el('product-detail-fav-btn');
    favBtn.innerHTML = isFav ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
    favBtn.classList.toggle('favorited', isFav);
    favBtn.onclick = () => { toggleStoreProductFavorite(productId); const now = (window.storeFavorites || []).includes(productId); favBtn.innerHTML = now ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>'; favBtn.classList.toggle('favorited', now); };
    const sellerLink = el('product-detail-seller-link');
    if (store) { sellerLink.textContent = store.name; sellerLink.href = '#'; sellerLink.onclick = e => { e.preventDefault(); openStoreDetail(store.id); }; }
    el('product-detail-shipping-txt').textContent = prod.freeShipping ? (L.freeShipping || 'Kargo Bedava') : 'Kargo ücreti hesaplanacak';
    const similar = (window.storeProducts || []).filter(x => x.id !== productId && (x.storeId === prod.storeId || (x.category === prod.category))).slice(0, 6);
    el('product-detail-attributes').style.display = 'none';
    const simEl = el('product-detail-similar');
    if (similar.length && simEl) {
        simEl.style.display = '';
        el('product-similar-grid').innerHTML = similar.map(p => renderAlsatProductCard(p, L)).join('');
        el('product-similar-grid').querySelectorAll('.alsat-product-card-trendyol').forEach(c => { c.style.cursor = 'pointer'; c.onclick = () => openProductDetail(parseInt(c.dataset.productId)); });
        el('product-similar-grid').querySelectorAll('.product-fav-btn').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); toggleStoreProductFavorite(parseInt(b.dataset.productId)); }));
        el('product-similar-grid').querySelectorAll('.product-cart-btn').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); addToStoreCart(parseInt(b.dataset.productId)); }));
    } else if (simEl) simEl.style.display = 'none';
    const qaWrap = el('product-detail-qa');
    const qaList = el('product-qa-list');
    const qaForm = el('product-qa-form');
    const qaInp = el('product-qa-question');
    const isProdOwner = user && store && store.ownerId === user.id;
    if (qaWrap && qaList) {
        const qas = (window.productQuestions || []).filter(q => q.productId === productId);
        qaList.innerHTML = qas.length === 0 ? '<p class="empty-state" style="text-align:center;padding:20px;color:var(--text-muted);font-size:14px;">Henüz soru yok</p>' : qas.map(q => {
            const ans = q.answer ? `<div class="store-qa-answer" style="margin-top:8px;margin-left:20px;"><i class="fa-solid fa-reply"></i> ${escapeHtml(q.answer)}</div>` : (isProdOwner ? `<div class="store-qa-answer-form" style="margin-top:8px;margin-left:20px;"><textarea class="store-qa-answer-input" data-qid="${q.id}" placeholder="Cevabınızı yazın..." style="width:100%;min-height:50px;padding:8px;border:1px solid var(--border-color);border-radius:8px;resize:vertical;background:var(--bg);color:var(--text-main);"></textarea><button type="button" class="admin-btn-small" style="margin-top:6px;" data-qid="${q.id}">Gönder</button></div>` : '<div style="font-style:italic;color:var(--text-muted);margin-top:6px;margin-left:20px;font-size:13px;">Mağaza henüz cevaplamadı</div>');
            return `<div class="store-qa-item" style="margin-bottom:12px;"><div class="store-qa-question">${escapeHtml(q.question || '')} <span style="font-size:12px;color:var(--text-muted);">- ${escapeHtml(q.userName || 'Kullanıcı')}</span></div>${ans}</div>`;
        }).join('');
        qaList.querySelectorAll('.store-qa-answer-input').forEach(ta => {
            const btn = ta.parentElement.querySelector('button[data-qid]');
            if (btn) btn.onclick = function() {
                const qid = parseInt(this.dataset.qid);
                const text = (ta.value || '').trim();
                if (!text) return;
                const qq = (window.productQuestions || []).find(x => x.id === qid);
                if (qq) { qq.answer = text; saveProductQuestions(); openProductDetail(productId); }
            };
        });
        el('product-qa-product-id').value = productId;
        if (qaForm) qaForm.style.display = user ? 'block' : 'none';
        if (qaInp) qaInp.value = '';
    }
    page.dataset.productId = productId;
};

window.openStoreDetail = function (storeId, opts) {
    if (!isAdmin()) return; // Mağaza detayı sadece admin için
    const store = (window.storesDatabase || []).find(s => s.id === storeId);
    if (!store) return;
    const page = el('store-detail-page');
    if (!page) return;
    const user = getCurrentUser();
    const adminMode = opts?.adminMode && isAdmin();
    page.dataset.adminMode = adminMode ? '1' : '';
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    if (adminMode) el('admin-page').style.display = 'none';
    page.style.display = 'block';
    page.dataset.storeId = storeId;
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    const safeAny = (id, prop, val) => { const e = el(id); if (e) e[prop] = val; };
    safeAny('store-detail-back-txt', 'textContent', L.back || 'Geri');
    safeAny('store-detail-title', 'textContent', store.name);
    const coverEl = el('store-detail-cover'); if (coverEl) coverEl.style.backgroundImage = 'url(' + (store.cover||store.logo) + ')';
    const logoEl = el('store-detail-logo'); if (logoEl) { logoEl.src = store.logo; logoEl.alt = store.name; }
    safeAny('store-detail-name', 'textContent', store.name);
    const vBadge = el('store-detail-verified-badge');
    if (vBadge) vBadge.style.display = store.verified ? 'inline-flex' : 'none';
    safeAny('store-detail-verified-txt', 'textContent', L.verifiedStore || 'Onaylı Mağaza');
    const followersCount = store.followers || 0;
    const followedStores = JSON.parse(localStorage.getItem('alsat_followed_stores') || '[]');
    const isFollowing = user && followedStores.includes(storeId);
    const followBtn = el('store-follow-btn');
    const followingBadge = el('store-following-badge');
    if (followBtn && !(user && store.ownerId === user.id)) {
        followBtn.style.display = user ? 'inline-flex' : 'none';
        followBtn.classList.toggle('following', isFollowing);
        followBtn.innerHTML = isFollowing ? '<i class="fa-solid fa-heart"></i> ' + (L.following || 'Takip ediyorsun') : '<i class="fa-regular fa-heart"></i> ' + (L.followStore || 'Takip Et');
        followBtn.onclick = () => toggleStoreFollow(storeId);
    } else if (followBtn) followBtn.style.display = 'none';
    if (followingBadge) followingBadge.style.display = (user && store.ownerId !== user.id && isFollowing) ? 'inline-flex' : 'none';
    const badgesDiv = el('store-detail-badges');
    if (badgesDiv) badgesDiv.innerHTML = [store.freeShipping && (L.freeShipping || 'Ücretsiz Kargo'), store.fastShipping && (L.fastShipping || 'Hızlı Kargo')].filter(Boolean).map(t => '<span class="store-detail-badge"><i class="fa-solid fa-truck"></i> ' + t + '</span>').join('');
    const locEl = el('store-detail-location');
    const addrEl = el('store-detail-address');
    if (locEl) { locEl.style.display = store.city ? '' : 'none'; if (store.city) locEl.innerHTML = '<i class="fa-solid fa-location-dot"></i> ' + (tCity(store.city)||store.city); }
    if (addrEl) { addrEl.style.display = store.address ? '' : 'none'; addrEl.textContent = store.address || ''; }
    safeAny('store-detail-rating', 'textContent', (store.rating||0).toFixed(1));
    const folEl = el('store-detail-followers');
    if (folEl) { folEl.style.display = followersCount ? 'inline' : 'none'; folEl.innerHTML = '<i class="fa-solid fa-heart" style="color:#e74c3c;font-size:11px;"></i> ' + followersCount + ' ' + (L.followers || 'takipçi'); }
    const memEl = el('store-detail-member-since');
    if (memEl && store.memberSince) { memEl.style.display = 'inline'; memEl.textContent = (L.memberSince || 'Üye') + ': ' + store.memberSince; }
    const respEl = el('store-detail-response-rate');
    if (respEl && store.responseRate) { respEl.style.display = 'inline'; respEl.textContent = (L.responseRate || 'Yanıt') + ': %' + store.responseRate; }
    safeAny('store-tab-products-txt', 'textContent', L.productsLabel || 'Ürünler');
    safeAny('store-tab-reviews-txt', 'textContent', L.reviewsLabel || 'Yorumlar');
    const revCount = (window.storeReviews || []).filter(r => r.storeId === storeId).length;
    safeAny('store-detail-review-count', 'textContent', revCount + ' ' + (L.reviewCount || 'değerlendirme'));
    safeAny('store-reviews-count-badge', 'textContent', revCount);
    const phoneEl = el('store-detail-phone');
    const waNum = typeof toWhatsAppPhone === 'function' ? toWhatsAppPhone(store.phone) : '';
    if (phoneEl) {
        if (store.phone) {
            phoneEl.href = 'tel:' + store.phone.replace(/\s/g,'');
            phoneEl.textContent = store.phone;
            phoneEl.style.display = '';
            if (waNum) { phoneEl.innerHTML = '<i class="fa-solid fa-phone"></i> ' + store.phone; }
        } else { phoneEl.style.display = 'none'; }
    }
    const waEl = el('store-detail-whatsapp');
    if (waEl && waNum) { waEl.href = 'https://wa.me/' + waNum; waEl.target = '_blank'; waEl.rel = 'noopener'; waEl.style.display = ''; waEl.innerHTML = '<i class="fa-brands fa-whatsapp"></i> ' + (L.whatsapp||'WhatsApp'); } else if (waEl) waEl.style.display = 'none';
    qsa('.store-tab-btn').forEach(b => b.classList.remove('active'));
    qsa('.store-tab-pane').forEach(p => p.classList.remove('active'));
    el('store-tab-products')?.classList.add('active');
    el('store-tab-products')?.style.setProperty('display', 'block');
    el('store-tab-reviews')?.style.setProperty('display', 'none');
    document.querySelector('.store-tab-btn[data-store-tab="products"]')?.classList.add('active');
    const products = (window.storeProducts || []).filter(p => p.storeId === storeId);
    const prodGrid = el('store-products-grid');
    const noProd = el('store-no-products');
    if (products.length === 0) {
        if (prodGrid) prodGrid.innerHTML = '';
        if (noProd) noProd.style.display = 'block';
    } else {
        if (noProd) noProd.style.display = 'none';
        if (prodGrid) prodGrid.innerHTML = products.map(p => {
            const op = p.originalPrice && p.originalPrice > (p.price||0);
            const dPct = op && p.originalPrice ? Math.round(100 - (p.price||0) / p.originalPrice * 100) : (p.discountPercent || 0);
            const discountBadge = (op && dPct > 0) ? '<span class="store-product-discount">-%' + dPct + '</span>' : '';
            const origPrice = op ? '<span class="store-product-original">' + p.originalPrice + ' MKD</span>' : '';
            const ratingHtml = (p.rating !== undefined) ? '<span class="store-product-rating"><i class="fa-solid fa-star" style="color:#ffc107;font-size:11px;"></i> ' + (p.rating||0).toFixed(1) + (p.reviewCount ? ' <span style="font-size:11px;color:var(--text-muted);">(' + p.reviewCount + ')</span>' : '') + '</span>' : '';
            const badges = [p.freeShipping && '<span class="store-product-badge freeship"><i class="fa-solid fa-truck"></i></span>', p.fastShipping && '<span class="store-product-badge fastship"><i class="fa-solid fa-bolt"></i></span>'].filter(Boolean).join('');
            const ownerBtns = (isOwner || adminMode) ? `<button type="button" class="store-product-edit-btn" data-product-id="${p.id}" title="${L.edit || 'Düzenle'}"><i class="fa-solid fa-pen"></i></button>` : '';
            return `
            <div class="store-product-card" data-product-id="${p.id}" style="background:var(--card-bg);border:1px solid var(--border-color);border-radius:12px;overflow:hidden;transition:0.2s;position:relative;">
                ${ownerBtns}
                <a href="#" class="store-product-link" data-product-id="${p.id}" style="text-decoration:none;color:inherit;display:block;">
                    <div class="store-product-img-wrap" style="position:relative;height:140px;background:url(${p.image||''}) center/cover;">${discountBadge}${badges}</div>
                    <div style="padding:12px;">
                        <h4 style="margin:0 0 6px;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(p.title)}</h4>
                        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px;">${origPrice}<span style="font-weight:700;color:${op ? '#dc3545' : 'var(--primary)'};">${(p.price||0)} MKD</span></div>
                        ${ratingHtml}
                    </div>
                </a>
                <button type="button" class="store-product-add-btn" data-product-id="${p.id}" data-store-id="${storeId}"><i class="fa-solid fa-cart-plus"></i> ${L.addToCart || 'Sepete Ekle'}</button>
            </div>`;
        }).join('');
        prodGrid.querySelectorAll('.store-product-link').forEach(c => c.addEventListener('click', function(e){ e.preventDefault(); const pid = parseInt(this.dataset.productId); if ((isOwner || adminMode) && window.openEditProductPage) window.openEditProductPage(pid); else openProductDetail(pid); }));
        prodGrid.querySelectorAll('.store-product-add-btn').forEach(btn => btn.addEventListener('click', function(e){ e.stopPropagation(); const pid = parseInt(this.dataset.productId); addToStoreCart(pid); }));
        prodGrid.querySelectorAll('.store-product-edit-btn').forEach(btn => btn.addEventListener('click', function(e){ e.stopPropagation(); e.preventDefault(); window.openEditProductPage?.(parseInt(this.dataset.productId)); }));
    }
    const reviews = (window.storeReviews || []).filter(r => r.storeId === storeId);
    const distEl = el('store-rating-distribution');
    const barsEl = el('store-rating-bars');
    const sortSel = el('store-reviews-sort');
    if (reviews.length > 0 && distEl && barsEl) {
        distEl.style.display = 'block';
        const counts = [0,0,0,0,0];
        reviews.forEach(r => { const s = Math.min(5, Math.max(1, r.stars||5)); counts[5-s]++; });
        const total = reviews.length;
        barsEl.innerHTML = [5,4,3,2,1].map((star,i) => {
            const n = counts[i]; const pct = total ? Math.round(100*n/total) : 0;
            return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;"><span style="width:60px;font-size:13px;">' + star + ' ★</span><div style="flex:1;height:8px;background:var(--border-color);border-radius:4px;overflow:hidden;"><div style="height:100%;background:var(--primary);width:' + pct + '%"></div></div><span style="font-size:12px;color:var(--text-muted);width:40px;text-align:right;">' + pct + '%</span></div>';
        }).join('');
    } else if (distEl) distEl.style.display = 'none';
    if (el('store-rating-dist-txt')) el('store-rating-dist-txt').textContent = L.ratingDistribution || 'Puan Dağılımı';
    if (el('store-reviews-sort-label')) el('store-reviews-sort-label').textContent = L.sortBy || 'Sırala:';
    if (sortSel) { sortSel.innerHTML = '<option value="newest">' + (L.sortNewest || 'En Yeni') + '</option><option value="highest">' + (L.sortHighest || 'En Yüksek Puan') + '</option><option value="lowest">' + (L.sortLowest || 'En Düşük Puan') + '</option>'; sortSel.value = 'newest'; sortSel.onchange = () => renderStoreReviewsList(storeId); }
    const reviewsList = el('store-reviews-list');
    renderStoreReviewsList(storeId);
    const hasPurchased = user && (window.storePurchases || []).some(p => p.storeId === storeId && p.userId === user.id);
    const alreadyReviewed = user && (window.storeReviews || []).some(r => r.storeId === storeId && r.userId === user.id);
    const showForm = hasPurchased && !alreadyReviewed;
    const reviewFormWrap = el('store-review-form-wrap'); if (reviewFormWrap) reviewFormWrap.style.display = showForm ? 'block' : 'none';
    if (showForm) {
        const reviewComment = el('store-review-comment'); if (reviewComment) reviewComment.value = '';
        window.storeReviewPhotoData = [];
        const prev = el('store-review-photo-preview');
        if (prev) prev.innerHTML = '';
    }
    const isOwner = user && store.ownerId === user.id;
    const qaCount = (window.storeQuestions || []).filter(q => q.storeId === storeId).length;
    safeAny('store-qa-count-badge', 'textContent', qaCount);
    safeAny('store-tab-qa-txt', 'textContent', L.qaLabel || 'Soru & Cevap');
    const qaList = el('store-qa-list');
    const qas = (window.storeQuestions || []).filter(q => q.storeId === storeId);
    if (qaList) {
        qaList.innerHTML = qas.length === 0 ? '<p class="empty-state" style="text-align:center;padding:40px;">' + (L.noQuestions || 'Henüz soru yok') + '</p>' : qas.map(q => {
            const ans = q.answer ? `<div class="store-qa-answer"><i class="fa-solid fa-reply"></i> ${escapeHtml(q.answer)}</div>` : (isOwner ? `<div class="store-qa-answer-form"><textarea class="store-qa-answer-input" data-qid="${q.id}" placeholder="${L.answerPlaceholder||'Cevabınızı yazın...'}"></textarea><button type="button" class="admin-btn-small store-qa-answer-btn" data-qid="${q.id}">${L.submit||'Gönder'}</button></div>` : '<div class="store-qa-answer" style="font-style:italic;color:var(--text-muted);">' + (L.awaitingAnswer || 'Mağaza henüz cevaplamadı') + '</div>');
            return `<div class="store-qa-item" data-qid="${q.id}"><div class="store-qa-question"><i class="fa-solid fa-question"></i> ${escapeHtml(q.question || '')} <span style="font-size:12px;color:var(--text-muted);">- ${escapeHtml(q.userName || 'Kullanıcı')}</span></div>${ans}</div>`;
        }).join('');
        qaList.querySelectorAll('.store-qa-answer-btn').forEach(btn => {
            btn.onclick = function() {
                const qid = parseInt(this.dataset.qid);
                const inp = qaList.querySelector('.store-qa-answer-input[data-qid="'+qid+'"]');
                const text = (inp?.value || '').trim();
                if (!text) return;
                const q = (window.storeQuestions||[]).find(x => x.id === qid);
                if (q) { q.answer = text; localStorage.setItem('alsat_store_questions', JSON.stringify(window.storeQuestions)); openStoreDetail(storeId); }
            };
        });
    }
    const prodTab = el('store-tab-products');
    if (prodTab) {
        prodTab.querySelector('.add-product-store-wrap')?.remove();
        if (isOwner || adminMode) {
            const addProdWrap = document.createElement('div');
            addProdWrap.className = 'add-product-store-wrap';
            addProdWrap.style.cssText = 'margin-bottom:16px;';
            addProdWrap.innerHTML = `<button type="button" class="add-product-store-btn" id="btn-add-store-product"><i class="fa-solid fa-plus"></i> ${L.addProduct || 'Ürün Ekle'}</button>`;
            const firstChild = prodTab.firstElementChild;
            if (firstChild) prodTab.insertBefore(addProdWrap, firstChild);
            else prodTab.appendChild(addProdWrap);
            el('btn-add-store-product')?.addEventListener('click', () => { window.openAddProductPage?.(storeId); });
        }
    }
    const adminEditEl = el('store-admin-edit');
    const ownerEditEl = el('store-owner-edit');
    const ownerPhotoBtns = el('store-owner-photo-btns');
    if (adminEditEl) adminEditEl.style.display = adminMode ? 'block' : 'none';
    if (ownerEditEl) ownerEditEl.style.display = (isOwner && !adminMode) ? 'block' : 'none';
    if (ownerPhotoBtns) ownerPhotoBtns.style.display = (isOwner && !adminMode) ? 'flex' : 'none';
    if (isOwner && !adminMode && ownerEditEl) {
        el('store-owner-edit-name').value = store.name || '';
        el('store-owner-edit-phone').value = store.phone || '';
        const citySel = el('store-owner-edit-city');
        if (citySel) { citySel.innerHTML = '<option value="">Şehir</option>' + (typeof sehirListesi !== 'undefined' ? sehirListesi.map(c => '<option value="'+c+'">'+(typeof tCity === 'function' ? tCity(c) : c)+'</option>').join('') : ''); citySel.value = store.city || ''; }
        el('store-owner-edit-address').value = store.address || '';
        el('store-owner-save-btn').onclick = function() {
            store.name = (el('store-owner-edit-name')?.value || '').trim();
            store.phone = (el('store-owner-edit-phone')?.value || '').trim();
            store.city = el('store-owner-edit-city')?.value || '';
            store.address = (el('store-owner-edit-address')?.value || '').trim();
            localStorage.setItem('alsat_stores', JSON.stringify(window.storesDatabase));
            openStoreDetail(storeId);
            showToast('saved', 'success', 2000);
        };
    }
    if (adminMode && adminEditEl) {
        el('store-edit-name').value = store.name || '';
        el('store-edit-cover').value = store.cover || store.logo || '';
        el('store-edit-logo').value = store.logo || '';
        el('store-edit-phone').value = store.phone || '';
        const citySel = el('store-edit-city');
        if (citySel) { citySel.innerHTML = '<option value="">Şehir</option>' + (typeof sehirListesi !== 'undefined' ? sehirListesi.map(c => '<option value="'+c+'">'+(typeof tCity === 'function' ? tCity(c) : c)+'</option>').join('') : ''); citySel.value = store.city || ''; }
        el('store-edit-verified').checked = !!store.verified;
        el('store-admin-save-btn').onclick = function() {
            store.name = (el('store-edit-name')?.value || '').trim();
            store.cover = (el('store-edit-cover')?.value || '').trim();
            store.logo = (el('store-edit-logo')?.value || '').trim();
            store.phone = (el('store-edit-phone')?.value || '').trim();
            store.city = el('store-edit-city')?.value || '';
            store.verified = !!el('store-edit-verified')?.checked;
            localStorage.setItem('alsat_stores', JSON.stringify(window.storesDatabase));
            openStoreDetail(storeId, { adminMode: true });
            showToast('saved', 'success', 2000);
        };
        const pending = (window.storePhotoRequests || []).filter(r => r.storeId === storeId && r.status === 'pending');
        const pendEl = el('store-pending-photos');
        if (pendEl) {
            pendEl.style.display = pending.length ? 'block' : 'none';
            pendEl.innerHTML = pending.length ? '<h5 style="margin:0 0 8px;">Bekleyen fotoğraf talepleri</h5>' + pending.map(r => {
                const u = escapeHtml(r.newUrl || '');
                return `<div class="admin-seller-track" style="margin-bottom:8px;"><span>${r.type === 'cover' ? 'Kapak' : 'Logo'}: ${u.length > 50 ? u.slice(0, 50) + '...' : u}</span>
                <button type="button" class="admin-btn-small" onclick="approveStorePhotoRequest(${r.id});">Onayla</button>
                <button type="button" class="admin-btn-small" style="color:#dc3545" onclick="rejectStorePhotoRequest(${r.id});">Reddet</button></div>`;
            }).join('') : '';
        }
    }
    const storePhotoInput = el('store-photo-file-input');
    el('store-change-cover-btn') && (el('store-change-cover-btn').onclick = function() {
        if (storePhotoInput) { storePhotoInput.dataset.photoType = 'cover'; storePhotoInput.click(); }
    });
    el('store-change-logo-btn') && (el('store-change-logo-btn').onclick = function() {
        if (storePhotoInput) { storePhotoInput.dataset.photoType = 'logo'; storePhotoInput.click(); }
    });
    if (storePhotoInput) storePhotoInput.onchange = function() {
        const file = this.files && this.files[0];
        const photoType = this.dataset.photoType || 'cover';
        this.value = '';
        if (!file || !file.type.startsWith('image/')) return;
        const r = new FileReader();
        r.onload = function() {
            const dataUrl = r.result;
            window.storePhotoRequests = window.storePhotoRequests || [];
            window.storePhotoRequests.push({ id: Date.now(), storeId, type: photoType, newUrl: dataUrl, status: 'pending', requestedBy: user?.id, createdAt: new Date().toISOString() });
            saveStorePhotoRequests();
            showToast(t('requestSentUpdate'), 'info', 3000);
            openStoreDetail(storeId);
        };
        r.readAsDataURL(file);
    };
    document.querySelectorAll('.store-tab-btn').forEach(btn => {
        btn.onclick = function() {
            qsa('.store-tab-btn').forEach(b => b.classList.remove('active'));
            qsa('.store-tab-pane').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
            this.classList.add('active');
            const tid = this.dataset.storeTab;
            const pane = el('store-tab-' + tid);
            if (pane) { pane.classList.add('active'); pane.style.display = 'block'; }
        };
    });
    if (opts?.openToTab === 'qa') document.querySelector('.store-tab-btn[data-store-tab="qa"]')?.click();
};

window.openStoreDetailWithQa = function(storeId) {
    openStoreDetail(storeId, { openToTab: 'qa' });
};

window.openAddProductPage = function(storeId) {
    const user = getCurrentUser();
    const store = (window.storesDatabase || []).find(s => s.id === storeId);
    if (!user || !store || store.ownerId !== user.id) {
        showToast('loginRequired', 'warning', 2000);
        if (!user) window.openLoginModal();
        return;
    }
    window.addProductPageStoreId = storeId;
    el('add-product-page-edit-id').value = '';
    el('add-product-page-title').textContent = t('addProduct');
    el('add-product-page-submit-txt').textContent = t('addProduct');
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    el('add-product-page').style.display = 'block';
    el('add-product-page-store-id').value = storeId;
    el('add-product-page-title-inp').value = '';
    el('add-product-page-price').value = '';
    el('add-product-page-original-price').value = '';
    el('add-product-page-category').value = '';
    el('add-product-page-material').value = '';
    el('add-product-page-color').value = '';
    el('add-product-page-image').value = '';
    const imgFile = el('add-product-page-image-file');
    if (imgFile) imgFile.value = '';
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
};

window.openEditProductPage = function(productId) {
    const prod = (window.storeProducts || []).find(p => p.id === productId);
    const user = getCurrentUser();
    const store = prod ? (window.storesDatabase || []).find(s => s.id === prod.storeId) : null;
    if (!user || !store || !prod || store.ownerId !== user.id) return;
    window.addProductPageStoreId = prod.storeId;
    el('add-product-page-edit-id').value = productId;
    el('add-product-page-title') && (el('add-product-page-title').textContent = 'Ürün Düzenle');
    el('add-product-page-submit-txt') && (el('add-product-page-submit-txt').textContent = t('save'));
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    el('add-product-page').style.display = 'block';
    el('add-product-page-store-id').value = prod.storeId;
    el('add-product-page-title-inp').value = prod.title || '';
    el('add-product-page-price').value = prod.price || '';
    el('add-product-page-original-price').value = prod.originalPrice || '';
    el('add-product-page-category').value = prod.category || '';
    el('add-product-page-material').value = prod.material || '';
    el('add-product-page-color').value = prod.color || '';
    el('add-product-page-image').value = prod.image || '';
    const imgFile = el('add-product-page-image-file');
    if (imgFile) imgFile.value = '';
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
};

window.openCartPage = function() {
    if (!isAdmin()) return; // Sepet (Alsat Store) sadece admin için
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    el('cart-page').style.display = 'block';
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    const cart = window.storeCart || [];
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    el('cart-empty').style.display = cart.length ? 'none' : 'block';
    const itemsEl = el('cart-items');
    const summaryEl = el('cart-summary');
    if (cart.length === 0) {
        if (itemsEl) itemsEl.style.display = 'none';
        if (summaryEl) summaryEl.style.display = 'none';
    } else {
        if (itemsEl) {
            itemsEl.style.display = 'block';
            itemsEl.innerHTML = cart.map(item => {
                const prod = (window.storeProducts || []).find(p => p.id === item.productId);
                if (!prod) return '';
                const qty = item.qty || 1;
                return `<div class="cart-item-row" data-product-id="${prod.id}" style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--card-bg);border:1px solid var(--border-color);border-radius:12px;margin-bottom:12px;">
                    <div style="width:80px;height:80px;background:url(${prod.image||''}) center/cover;border-radius:8px;flex-shrink:0;"></div>
                    <div style="flex:1;"><h4 style="margin:0 0 4px;">${escapeHtml(prod.title)}</h4><p style="margin:0;color:var(--primary);font-weight:700;">${(prod.price||0)} MKD ${qty > 1 ? 'x ' + qty : ''}</p></div>
                    <button type="button" class="cart-remove-btn" data-product-id="${prod.id}" title="${L.remove||'Kaldır'}"><i class="fa-solid fa-trash-can"></i></button>
                </div>`;
            }).filter(Boolean).join('');
            itemsEl.querySelectorAll('.cart-remove-btn').forEach(b => b.addEventListener('click', function() {
                const pid = parseInt(this.dataset.productId);
                window.storeCart = (window.storeCart || []).filter(x => x.productId !== pid);
                saveStoreCart();
                openCartPage();
                el('alsat-cart-badge') && (el('alsat-cart-badge').textContent = (window.storeCart || []).reduce((a,x)=>a+(x.qty||1),0));
                el('alsat-cart-badge') && (el('alsat-cart-badge').style.display = (window.storeCart || []).length ? 'inline-flex' : 'none');
            }));
        }
        const total = cart.reduce((sum, item) => {
            const prod = (window.storeProducts || []).find(p => p.id === item.productId);
            return sum + ((prod?.price || 0) * (item.qty || 1));
        }, 0);
        if (summaryEl) { summaryEl.style.display = 'block'; el('cart-total').textContent = total.toFixed(0) + ' MKD'; }
    }
    el('cart-checkout-btn').onclick = () => showToast(L.goToCheckout || 'Ödeme sayfası yakında', 'info');
};

window.openFavoritesPage = async function () {
    const user = getCurrentUser();
    if (!user) {
        showToast('loginRequired', 'warning', 2000);
        window.openLoginModal();
        return;
    }
    if (window.API_BASE && window.AlsatAPI && window.AlsatAPI.isLoggedIn && window.AlsatAPI.isLoggedIn()) {
        try {
            const apiFavs = await window.AlsatAPI.getFavorites(user.id);
            if (Array.isArray(apiFavs)) window.favorites = apiFavs;
        } catch (e) { /* keep local */ }
    }
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    el('favorites-page').style.display = 'block';
    hideProfileDropdown();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    const grid = el('favorites-grid');
    if (isAdmin()) ensureAlsatStoreData();
    const favIds = window.favorites || [];
    const storeFavIds = isAdmin() ? (window.storeFavorites || []).map(id => typeof id === 'number' ? id : parseInt(id, 10)) : [];
    const favs = window.adsDatabase.filter(a => favIds.includes(a.id));
    const storeFavs = (window.storeProducts || []).filter(p => storeFavIds.includes(p.id));
    const L = window.TRANSLATIONS?.[window.currentLang] || {};
    const adCards = favs.map(ad => {
            const imgSrc = (ad.images && ad.images[0]) || ad.image;
            const desc = (ad.description || '').replace(/<[^>]*>/g, '').trim();
            const descShort = desc ? escapeHtml(desc).slice(0, 90) + (desc.length > 90 ? '...' : '') : '';
            return `
            <div class="ilan-kart" data-id="${ad.id}">
                <div class="resim-alani"><img src="${imgSrc}" alt="${ad.title}"></div>
                <div class="ilan-bilgi">
                    <h4>${escapeHtml(ad.title)}</h4>
                    <p class="fiyat">${formatPrice(ad)}</p>
                    <p class="konum"><i class="fa-solid fa-location-dot"></i> ${tCity(ad.city)}</p>
                    <button class="mesaj-gonder-btn">${t('sendMessage')}</button>
                    ${descShort ? `<p class="ilan-aciklama-ozet">${descShort}</p>` : ''}
                </div>
            </div>
        `;
    });
    const storeCards = storeFavs.map(p => {
        const origPrice = (p.originalPrice && p.originalPrice > (p.price||0)) ? '<span class="product-original">' + p.originalPrice + ' TL</span>' : '';
        return `
        <div class="favorites-store-card ilan-kart favorite-card" data-store-product-id="${p.id}" data-store-id="${p.storeId}">
            <div class="resim-alani" style="position:relative;"><img src="${p.image || ''}" alt="${escapeHtml(p.title)}">
                <button type="button" class="favorite-remove-btn" data-product-id="${p.id}" title="${L.removeFromFavorites || 'Favorilerden kaldır'}" aria-label="${L.removeFromFavorites || 'Favorilerden kaldır'}"><i class="fa-solid fa-heart"></i></button>
            </div>
            <div class="ilan-bilgi">
                <h4>${escapeHtml(p.title)}</h4>
                <p class="fiyat"><span class="product-price">${(p.price||0)} TL</span>${origPrice}</p>
                <div class="favorite-card-actions">
                    <button class="mesaj-gonder-btn store-product-link" data-product-id="${p.id}">${L.viewProduct || 'Ürünü Gör'}</button>
                    <button type="button" class="product-cart-btn-fav" data-product-id="${p.id}"><i class="fa-solid fa-cart-plus"></i> Sepete Ekle</button>
                </div>
            </div>
        </div>`;
    });
    if (adCards.length === 0 && storeCards.length === 0) {
        grid.innerHTML = '<p id="no-favorites">' + t('noFavorites') + '</p>';
    } else {
        grid.innerHTML = storeCards.join('') + adCards.join('');
        grid.querySelectorAll('.favorite-remove-btn').forEach(btn => btn.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); toggleStoreProductFavorite(parseInt(this.dataset.productId)); openFavoritesPage(); }));
        grid.querySelectorAll('.product-cart-btn-fav').forEach(btn => btn.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); addToStoreCart(parseInt(this.dataset.productId)); }));
        grid.querySelectorAll('.store-product-link').forEach(btn => btn.addEventListener('click', function(e){ e.preventDefault(); openProductDetail(parseInt(this.dataset.productId)); }));
    }
};

// ========== İLANLARIM ==========
function openMyAdsPage() {
    const user = getCurrentUser();
    if (!user) return;
    document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
    el('my-ads-page').style.display = 'block';
    hideProfileDropdown();
    setTimeout(() => maybeShowSoldSurvey(user), 600);
    const list = el('my-ads-list');
    const myAds = window.adsDatabase.filter(a => a.userId === user.id);
    if (myAds.length === 0) {
        list.innerHTML = '<p id="no-ads">' + t('noAds') + '</p>';
    } else {
        list.innerHTML = myAds.map(ad => {
            const status = ad.status || 'approved';
            const statusBadge = status === 'pending' ? '<span class="badge-pending">' + (t('pendingApproval') || 'Beklemede') + '</span>' : (status === 'rejected' ? '<span class="badge-rejected">' + (t('rejected') || 'Reddedildi') + '</span>' : '');
            const expiry = ad.expiryAt ? new Date(ad.expiryAt) : (ad.createdAt && ad.durationDays ? (() => { const d = new Date(ad.createdAt); d.setDate(d.getDate() + (ad.durationDays || 30)); return d; })() : null);
            const daysLeft = expiry ? Math.ceil((expiry - new Date()) / 86400000) : null;
            const expiringBadge = (status === 'approved' && daysLeft !== null && daysLeft <= 7 && daysLeft > 0) ? '<span class="badge-expiring">' + (daysLeft === 1 ? (t('expiresTomorrow') || 'Yarın bitiyor') : daysLeft + ' ' + (t('daysLeft') || 'gün kaldı')) + '</span>' : '';
            const imgSrc = (ad.images && ad.images[0]) || ad.image;
            const statsHtml = (ad.detailedStats || ad.views) ? `<p class="my-ad-stats">Görüntülenme: ${ad.views||0}${ad.detailedStats ? ' | Tıklanma: '+(ad.clicks||0)+' | Favori: '+(ad.favCount||0) : ''}</p>` : '';
            const bumpDisabled = status !== 'approved';
            return `
            <div class="my-ad-card" data-ad-id="${ad.id}">
                <div class="resim-alani">${statusBadge}${expiringBadge}<img src="${imgSrc}" alt="${ad.title}" loading="lazy"></div>
                <div class="my-ad-card-body">
                    <h4>${ad.title}</h4>
                    <p>${formatPrice(ad)}</p>
                    <p>${tCity(ad.city)}</p>
                    ${statsHtml}
                    <div class="my-ad-actions">
                        <button type="button" class="ad-action-btn ad-bump-btn" data-id="${ad.id}" data-status="${status}">${t('bumpAd')} (${getSiteSettings().bumpPrice} MKD)</button>
                        <button type="button" class="ad-action-btn ad-edit-btn" data-id="${ad.id}">${t('edit')}</button>
                        <button type="button" class="ad-action-btn ad-delete-btn" data-id="${ad.id}">${t('delete')}</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
        list.querySelectorAll('.ad-bump-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                if (this.dataset.status !== 'approved') {
                    showToast('bumpRequiresApproved', 'warning', 2500);
                    return;
                }
                bumpAd(parseInt(this.dataset.id, 10));
            });
        });
        list.querySelectorAll('.ad-edit-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                const id = parseInt(this.dataset.id, 10);
                if (!isNaN(id)) openIlanModalForEdit(id);
            });
        });
        list.querySelectorAll('.ad-delete-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                deleteAd(parseInt(this.dataset.id, 10));
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

window.deleteAd = async function deleteAd(id) {
    if (!confirm(t('deleteConfirm') || 'Bu ilanı silmek istediğinize emin misiniz?')) return;
    if (window.API_BASE && window.AlsatAPI && window.AlsatAPI.isLoggedIn && window.AlsatAPI.isLoggedIn()) {
        try {
            await window.AlsatAPI.deleteAd(id);
        } catch (e) {
            showToast(e && e.error ? e.error : 'Silinemedi', 'error', 2000);
            return;
        }
    }
    const favIdx = window.favorites.indexOf(id);
    if (favIdx >= 0) { window.favorites.splice(favIdx, 1); saveFavorites(); }
    window.adsDatabase = window.adsDatabase.filter(a => a.id !== id);
    saveAdsDatabase();
    openMyAdsPage();
    applyFilters();
    updateHeaderUI();
    showToast('adDeleted', 'info', 2000);
};

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
function maybeShowSoldSurvey(user) {
    if (!user) return;
    window.soldSurveyDone = window.soldSurveyDone || [];
    const expired = (window.adsDatabase || []).filter(a => a.userId === user.id && a.status === 'approved' && a.expiryAt && new Date(a.expiryAt) < new Date() && !window.soldSurveyDone.includes(a.id));
    const toSurvey = expired.find(a => !window.soldSurveyDone.includes(a.id));
    if (!toSurvey) return;
    if (el('sold-survey-modal')?.style.display === 'flex') return;
    let m = el('sold-survey-modal');
    if (!m) {
        m = document.createElement('div');
        m.id = 'sold-survey-modal';
        m.className = 'modern-modal';
        m.innerHTML = `<div class="modal-content" style="max-width:400px;"><span class="close-btn" onclick="this.closest('.modern-modal').style.display='none'">&times;</span><h3>İlan Durumu</h3><p id="sold-survey-question"></p><div style="display:flex;gap:12px;margin-top:20px;"><button type="button" class="modern-submit-btn" id="sold-survey-yes">Evet, sattım</button><button type="button" class="temizle-link" id="sold-survey-no">Hayır</button></div></div>`;
        document.body.appendChild(m);
        m.querySelector('#sold-survey-yes').onclick = () => {
            const adId = parseInt(m.dataset.adId);
            const ad = window.adsDatabase?.find(a => a.id === adId);
            if (ad) { ad.status = 'sold'; ad.soldAt = new Date().toISOString(); saveAdsDatabase(); }
            window.soldSurveyDone.push(adId);
            saveSoldSurveyDone();
            m.style.display = 'none';
            openMyAdsPage();
            showToast(t('adMarkedSold'), 'success', 2000);
        };
        m.querySelector('#sold-survey-no').onclick = () => {
            window.soldSurveyDone.push(parseInt(m.dataset.adId));
            saveSoldSurveyDone();
            m.style.display = 'none';
            setTimeout(() => maybeShowSoldSurvey(user), 500);
        };
    }
    m.dataset.adId = toSurvey.id;
    m.querySelector('#sold-survey-question').textContent = '"' + toSurvey.title + '" ' + (t('adSoldSurvey') || 'ilanı satıldı mı?');
    m.style.display = 'flex';
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
        <div class="message-list" style="flex:1;overflow-y:auto;padding:15px;display:flex;flex-direction:column;gap:4px;">
            ${formatMessagesWithDates(c.messages || [], user.id)}
        </div>
        <div class="deal-buttons" style="padding:10px 15px;border-top:1px solid var(--border-color);">${dealHtml}</div>
    `;
    mv.dataset.convKey = convKey;
    if (mfc) mfc.style.display = 'flex';
    el('message-input').value = '';
    const qtEl = el('message-quick-templates');
    if (qtEl) {
        const buyerTemplates = ['Hala satılık mı?', 'En son fiyat ne?', 'Takas yapılır mı?', 'Nerede buluşabiliriz?', 'Yarın teslim alabilir miyim?'];
        const sellerTemplates = ['Evet hala satılık', 'Teslimat mümkün', 'Buluşma noktası önerebilirim', 'En düşük fiyat X EUR', 'Yarın uygun'];
        const templates = isSeller ? sellerTemplates : buyerTemplates;
        qtEl.innerHTML = templates.map(t => `<button type="button" class="msg-quick-btn" data-text="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('');
        qtEl.querySelectorAll('.msg-quick-btn').forEach(btn => {
            btn.onclick = () => { el('message-input').value = btn.dataset.text; el('message-input').focus(); };
        });
    }
    mv.querySelectorAll('[data-action]').forEach(btn => {
        btn.onclick = () => handleDealAction(convKey, btn.dataset.action);
    });
    const msgList = mv.querySelector('.message-list');
    if (msgList) msgList.scrollTop = msgList.scrollHeight;
    if (window.API_BASE && window.AlsatAPI && c.id) {
        window.AlsatAPI.markMessagesAsRead(c.id);
    }
}

function escapeHtml(s) { const d=document.createElement('div'); d.textContent=s||''; return d.innerHTML; }

function formatMessageTime(ts) {
    const d = new Date(ts || 0);
    const now = new Date();
    const diff = now - d;
    if (diff < 86400000 && d.getDate() === now.getDate()) return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    if (diff < 604800000) return d.toLocaleDateString('tr-TR', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}
function formatDateSeparator(ts) {
    const d = new Date(ts || 0);
    const now = new Date();
    const diff = now - d;
    if (diff < 86400000 && d.getDate() === now.getDate()) return t('today') || 'Bugün';
    if (diff < 172800000) return t('yesterday') || 'Dün';
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}
function formatMessagesWithDates(messages, myId) {
    let lastDate = '';
    return messages.map(m => {
        const fromId = m.from ?? m.from_user_id;
        const isMe = fromId == myId;
        const d = new Date(m.time || 0);
        const dateKey = d.toDateString();
        let sep = '';
        if (dateKey !== lastDate) { lastDate = dateKey; sep = `<div class="msg-date-sep">${formatDateSeparator(m.time)}</div>`; }
        const readBadge = (isMe && m.read_at) ? '<span class="msg-read" title="' + (t('read') || 'Okundu') + '"><i class="fa-solid fa-check-double"></i></span>' : '';
        return sep + `<div class="msg-row ${isMe ? 'sent' : 'received'}"><div class="msg-bubble ${isMe ? 'sent' : 'received'}">${escapeHtml(m.text)}<span class="msg-meta">${readBadge}<span class="msg-time">${formatMessageTime(m.time)}</span></span></div></div>`;
    }).join('');
}

function handleDealAction(convKey, action) {
    const c = window.conversations[convKey];
    if (!c) return;
    const user = getCurrentUser();
    if (!user) return;
    if (action === 'sellerConfirm') { c.sellerConfirmed = true; saveConversations(); selectConversation(convKey); showToast('confirmSaved', 'success', 2000); addNotification(c.buyerId, 'deal', t('sellerConfirmedTitle') || 'Satıcı onayladı', t('sellerConfirmedBody') || 'Satıcı ürünü sattığını onayladı.', { convKey }); updateNotifBadge(); }
    else if (action === 'buyerConfirm') {
        c.buyerConfirmed = true;
        const ad = window.adsDatabase?.find(a => a.id === c.adId);
        if (ad) {
            ad.status = 'sold';
            ad.soldAt = new Date().toISOString();
            saveAdsDatabase();
            if (ad.userId && user) {
                const store = (window.storesDatabase || []).find(s => s.ownerId === ad.userId);
                if (store) {
                    window.storePurchases = window.storePurchases || [];
                    if (!window.storePurchases.some(p => p.storeId === store.id && p.userId === user.id)) {
                        window.storePurchases.push({ storeId: store.id, userId: user.id });
                        localStorage.setItem('alsat_store_purchases', JSON.stringify(window.storePurchases));
                    }
                }
            }
        }
        saveConversations(); selectConversation(convKey); showToast('confirmSaved', 'success', 2000);
        addNotification(c.sellerId, 'deal', t('buyerConfirmedTitle') || 'Alıcı onayladı', t('buyerConfirmedBody') || 'Alıcı ürünü aldı. İlan satıldı olarak işaretlendi.', { convKey }); updateNotifBadge();
        if (typeof applyFilters === 'function') applyFilters();
    }
    else if (action === 'rate') { window.closeMessagingModal(); el('rating-modal').dataset.convKey = convKey; window.openRatingModal(c.adId); }
}

window.sendMessageToAd = function (adId) {
    const user = getCurrentUser();
    if (!user) { showToast('loginRequired', 'warning', 2000); window.openLoginModal(); return; }
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
        addNotification(sellerId, 'message', t('newMessage'), user.name + ' ' + ad.title + ' ' + (t('msgAboutAd') || 'ilanı hakkında mesaj gönderdi.'), { convKey, adId });
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
    addNotification(otherId, 'message', t('newMessage'), text.slice(0, 50), { convKey }); updateMsgBadge(); updateNotifBadge();
    updateMsgBadge();
}

// ========== RATING ==========
function canUserRateAd(adId) {
    const user = getCurrentUser();
    if (!user) return false;
    const convKey = Object.keys(window.conversations || {}).find(k => {
        const c = window.conversations[k];
        return c.adId === adId && c.buyerId === user.id && c.sellerConfirmed && c.buyerConfirmed && !c.rated;
    });
    return !!convKey;
}
window.openRatingModal = function (adId) {
    const user = getCurrentUser();
    if (!user) {
        showToast('loginRequired', 'warning', 2000);
        return;
    }
    if (!canUserRateAd(adId)) {
        showToast(t('rateOnlyBuyer'), 'warning', 2500);
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
    el('star-text').textContent = t('selectRating');
    if (el('rating-comment')) el('rating-comment').value = '';
    window.ratingPhotoData = [];
    const prev = el('rating-photo-preview');
    if (prev) prev.innerHTML = '';
};

window.closeRatingModal = function () {
    el('rating-modal').style.display = 'none';
    el('rating-modal').classList.remove('active');
};

// ========== PAYMENT ==========
window.openPaymentModal = function (amount, bonus = 0) {
    if (!isAdmin()) {
        showToast(t('creditDisabled') || 'Kredi yükleme şu an devre dışı', 'info', 3000);
        return;
    }
    const user = getCurrentUser();
    if (!user) {
        showToast('loginRequired', 'warning', 2000);
        return;
    }
    el('payment-amount').textContent = amount + ' MKD';
    el('payment-bonus').textContent = bonus + ' MKD';
    el('payment-modal').dataset.amount = amount;
    el('payment-modal').dataset.bonus = bonus;
    el('payment-modal').style.display = 'flex';
};

window.closePaymentModal = function () {
    el('payment-modal').style.display = 'none';
};

// ========== MODAL HELPERS ==========
window.closeLoginModal = function () { var m = el('login-modal'); if (m) { m.style.display = 'none'; m.classList.remove('active'); document.body.style.overflow = ''; } };
window.closeSignupModal = function () { var m = el('signup-modal'); if (m) { m.style.display = 'none'; m.classList.remove('active'); } };
window.openLoginModal = function () { var m = el('login-modal'); if (m) { m.style.display = 'flex'; m.classList.add('active'); document.body.style.overflow = 'hidden'; } };
window.openTermsModal = function() {
    var m = document.getElementById('terms-modal');
    var c = document.getElementById('terms-content');
    if (!m || !c) return;
    var lang = window.currentLang || 'mk';
    var termsData = window.ALSAT_TERMS_CONTENT;
    if (termsData && typeof termsData === 'object') {
        c.innerHTML = termsData[lang] || termsData.tr || termsData.mk || termsData.en || termsData.al || '';
    } else if (termsData) {
        c.innerHTML = termsData;
    }
    var titleEl = m.querySelector('.modal-title');
    if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-file-contract"></i> Alsat ' + ((window.TRANSLATIONS && window.TRANSLATIONS[lang] && window.TRANSLATIONS[lang].termsModalTitle) || (lang === 'tr' ? 'Kullanım Koşulları' : 'Terms of Use'));
    m.style.display = 'flex';
    m.classList.add('active');
    document.body.style.overflow = 'hidden';
};
window.closeTermsModal = function() {
    var m = document.getElementById('terms-modal');
    if (m) { m.style.display = 'none'; m.classList.remove('active'); document.body.style.overflow = ''; }
};

window.closeForgotModal = function () {
    const m = el('forgot-modal');
    if (m) m.style.display = 'none';
    if (el('forgot-step1')) el('forgot-step1').style.display = 'block';
    if (el('forgot-step2')) el('forgot-step2').style.display = 'none';
};
window.closeModal = function () {
    var m = el('ilan-modal');
    if (m) { m.style.display = 'none'; m.classList.remove('active'); document.body.style.overflow = ''; }
};

// Close modal on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modern-modal')) {
        e.target.style.display = 'none';
        e.target.classList.remove('active');
        if (e.target.id === 'ilan-modal' || e.target.id === 'support-modal') document.body.style.overflow = '';
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
        acceptTrade: !!el('ilan-takas')?.checked,
        city: baseCity,
        cities: cities,
        district: el('form-ilce-select').value || '',
        image: images[0],
        images: images,
        video: selectedVideo || null,
        phone: el('ilan-tel').value.trim(),
        hidePhone: !!el('ilan-hide-phone')?.checked,
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
        attrs: getCategoryAttrsFromForm(),
        priceHistory: (() => {
            const price = parseFloat(el('ilan-fiyat')?.value) || 0, cur = el('ilan-para-birimi')?.value || 'EUR';
            if (existing && (existing.price !== price || existing.currency !== cur)) {
                const hist = [...(existing.priceHistory || []), { price, currency: cur, date: new Date().toISOString() }];
                return hist.slice(-10);
            }
            return existing?.priceHistory || [{ price, currency: cur, date: new Date().toISOString() }];
        })()
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
    const L = window.TRANSLATIONS?.[window.currentLang] || window.TRANSLATIONS?.mk || {};
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
    const baslik = el('ilan-baslik'); if (baslik) baslik.value = '';
    const fiyat = el('ilan-fiyat'); if (fiyat) fiyat.value = '';
    const kat = el('form-kat-select'); if (kat) kat.value = '';
    const durum = el('ilan-durum'); if (durum) durum.value = 'İkinci El';
    const kimden = el('ilan-kimden'); if (kimden) kimden.value = 'Sahibinden';
    const sehir = el('form-sehir-select'); if (sehir) sehir.value = '';
    const ilce = el('form-ilce-select'); if (ilce) ilce.innerHTML = '<option value="">' + (t('districtSelect') || 'Önce Şehir Seçin') + '</option>';
    const tel = el('ilan-tel'); if (tel) tel.value = '';
    const acik = el('ilan-aciklama'); if (acik) acik.value = '';
    const takas = el('ilan-takas'); if (takas) takas.checked = false;
    const hidePhone = el('ilan-hide-phone'); if (hidePhone) hidePhone.checked = false;
    qsa('#ilan-formu [id^="prem-"]').forEach(cb => { if (cb.type === 'checkbox') cb.checked = false; });
    const pmc = el('prem-multicity-cities'); if (pmc) pmc.style.display = 'none';
    const pc2 = el('prem-city2'); if (pc2) pc2.value = '';
    const pc3 = el('prem-city3'); if (pc3) pc3.value = '';
    updatePremiumTotal();
    const mod = el('ilan-modal'); if (mod) mod.dataset.editId = '';
    const curSel = el('ilan-para-birimi');
    if (curSel) curSel.value = 'MKD';
    const mb = el('modal-baslik'); if (mb) mb.textContent = window.TRANSLATIONS?.[window.currentLang]?.newAdTitle || 'Yeni İlan Oluştur';
    renderCategoryExtraFields();
}
function updatePremiumTotal() {
    const tot = getPremiumTotal();
    const elt = el('premium-total');
    if (elt) elt.textContent = (window.TRANSLATIONS?.[window.currentLang]?.premiumTotal || 'Toplam ek ücret') + ': ' + tot + ' MKD';
}
function updatePremiumLabels() {
    const p = getSiteSettings().premiumPrices;
    const bump = getSiteSettings().bumpPrice;
    qsa('.premium-option .price').forEach((span, i) => {
        const prices = [p.vitrin, p.font, p.urgent, p.stats, p.extend, p.multicity, p.verified];
        if (prices[i] !== undefined) span.textContent = '+' + prices[i] + ' MKD';
    });
}

function initBannerClicks() {
    var hizli = el('banner-hizli-satis');
    var yeni = el('banner-yeni-ilanlar');
    var ozel = el('banner-ozel-teklifler');
    function doHizli() {
        if (!getCurrentUser()) { showToast('postAdRequired', 'warning', 2000); window.openLoginModal(); return; }
        resetAdForm();
        var m = el('ilan-modal');
        if (m) { m.style.display = 'flex'; m.classList.add('active'); document.body.style.overflow = 'hidden'; }
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
    function doAlsatStore() {
        window.openStoresPage?.();
    }
    var alsatStoreBanner = el('banner-alsat-store');
    [hizli, yeni, ozel, alsatStoreBanner].forEach(function(b) { if (!b) return; b.addEventListener('click', function() { if (b === hizli) doHizli(); else if (b === yeni) doYeni(); else if (b === ozel) doOzel(); else if (b === alsatStoreBanner) doAlsatStore(); }); b.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (b === hizli) doHizli(); else if (b === yeni) doYeni(); else if (b === ozel) doOzel(); else if (b === alsatStoreBanner) doAlsatStore(); } }); });
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
    const ad = (window.adsDatabase || []).find(a => a.id == adId || a.id === adId);
    if (!ad) {
        showToast('İlan bulunamadı', 'error', 2000);
        return;
    }
    try {
        selectedImages = (ad.images && ad.images.length) ? [...ad.images] : (ad.image ? [ad.image] : []);
        selectedVideo = ad.video || null;
        rebuildPhotoPreviews();
        if (videoOnizleme) {
            videoOnizleme.innerHTML = selectedVideo ? `<video src="${selectedVideo}" controls style="max-width:100%;max-height:200px;border-radius:8px;margin-top:10px;"></video><button type="button" class="remove-video-btn" onclick="videoInput.value='';selectedVideo=null;el('video-onizleme-alani').innerHTML='';">&times; Kaldır</button>` : '';
        }
        if (videoInput) videoInput.value = '';
        const b = el('ilan-baslik'); if (b) b.value = ad.title || '';
        const f = el('ilan-fiyat'); if (f) f.value = ad.price ?? '';
        const curSel = el('ilan-para-birimi');
        if (curSel) curSel.value = ad.currency || 'EUR';
        const kat = el('form-kat-select'); if (kat) kat.value = ad.subCategory || ad.category || '';
        const durumEl = el('ilan-durum');
        const kimdenEl = el('ilan-kimden');
        if (durumEl) durumEl.value = ad.condition || 'İkinci El';
        if (kimdenEl) kimdenEl.value = ad.sellerType || 'Sahibinden';
        if (el('ilan-takas')) el('ilan-takas').checked = !!ad.acceptTrade;
        const sehir = el('form-sehir-select'); if (sehir) sehir.value = ad.city || '';
        const formIlce = el('form-ilce-select');
        if (formIlce && ad.city && lokasyonlar && lokasyonlar[ad.city]) {
            formIlce.innerHTML = '<option value="">' + t('districtSelect') + '</option>' + lokasyonlar[ad.city].map(d => `<option value="${d}">${tDistrict(d)}</option>`).join('');
            formIlce.value = ad.district || '';
        }
        const tel = el('ilan-tel'); if (tel) tel.value = ad.phone || '';
        const hidePhoneCb = el('ilan-hide-phone'); if (hidePhoneCb) hidePhoneCb.checked = !!ad.hidePhone;
        const acik = el('ilan-aciklama'); if (acik) acik.value = ad.description || '';
        const pv = el('prem-vitrin'); if (pv) pv.checked = !!ad.featured;
        const pf = el('prem-font'); if (pf) pf.checked = !!ad.boldTitle;
        const pu = el('prem-urgent'); if (pu) pu.checked = !!ad.urgent;
        const ps = el('prem-stats'); if (ps) ps.checked = !!ad.detailedStats;
        const pe = el('prem-extend'); if (pe) pe.checked = (ad.durationDays || 30) >= 60;
        const pm = el('prem-multicity'); if (pm) pm.checked = !!(ad.cities && ad.cities.length > 1);
        const pver = el('prem-verified'); if (pver) pver.checked = !!ad.verifiedSeller;
        if (el('prem-multicity-cities')) el('prem-multicity-cities').style.display = ad.cities && ad.cities.length > 1 ? 'block' : 'none';
        const pc2 = el('prem-city2'); if (pc2 && ad.cities && ad.cities.length >= 2) pc2.value = ad.cities[1] || '';
        const pc3 = el('prem-city3'); if (pc3 && ad.cities && ad.cities.length >= 3) pc3.value = ad.cities[2] || '';
        renderCategoryExtraFields();
        setCategoryAttrsToForm(ad.attrs || {});
        updatePremiumTotal();
        const mod = el('ilan-modal');
        if (mod) {
            mod.dataset.editId = adId;
            const mb = el('modal-baslik'); if (mb) mb.textContent = (window.TRANSLATIONS?.[window.currentLang]?.editAd || 'İlan Düzenle');
            mod.style.display = 'flex';
            mod.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    } catch (err) {
        console.error('openIlanModalForEdit:', err);
        showToast('Düzenleme açılamadı', 'error', 2000);
    }
};
function getDraftFormData() {
    const katVal = el('form-kat-select')?.value || '';
    const grp = window.CATEGORIES_TREE?.find(g => g.id === katVal || (g.sub || []).includes(katVal));
    let parentCat = katVal, subCat = '';
    if (grp) { if (grp.sub && grp.sub.includes(katVal)) { parentCat = grp.id; subCat = katVal; } else { parentCat = katVal; } }
    return {
        title: (el('ilan-baslik')?.value || '').trim(),
        price: parseFloat(el('ilan-fiyat')?.value) || 0,
        currency: el('ilan-para-birimi')?.value || 'MKD',
        category: parentCat || subCat,
        subCategory: subCat,
        city: el('form-sehir-select')?.value || '',
        district: el('form-ilce-select')?.value || '',
        description: (el('ilan-aciklama')?.value || '').trim(),
        phone: (el('ilan-tel')?.value || '').trim(),
        condition: el('ilan-durum')?.value || 'İkinci El',
        sellerType: el('ilan-kimden')?.value || 'Sahibinden',
        acceptTrade: !!el('ilan-takas')?.checked,
        images: selectedImages || [],
        video: selectedVideo,
        attrs: {},
        premVitrin: !!el('prem-vitrin')?.checked,
        premFont: !!el('prem-font')?.checked,
        premUrgent: !!el('prem-urgent')?.checked,
        premStats: !!el('prem-stats')?.checked,
        premExtend: !!el('prem-extend')?.checked,
        premMulticity: !!el('prem-multicity')?.checked,
        premVerified: !!el('prem-verified')?.checked,
        premCity2: el('prem-city2')?.value || '',
        premCity3: el('prem-city3')?.value || ''
    };
}

el('btn-taslak-kaydet')?.addEventListener('click', async function() {
    const user = getCurrentUser();
    if (!user) { showToast('loginRequired', 'warning', 2000); window.openLoginModal(); return; }
    const data = getDraftFormData();
    data.attrs = typeof getCategoryAttrsFromForm === 'function' ? getCategoryAttrsFromForm() : {};
    if (window.API_BASE && window.AlsatAPI?.saveDraft) {
        try {
            await window.AlsatAPI.saveDraft(data);
            showToast(t('saved') || 'Taslak kaydedildi', 'success', 2000);
        } catch (e) { showToast('Taslak kaydedilemedi', 'error', 2000); }
    } else {
        localStorage.setItem('alsat_last_draft', JSON.stringify(data));
        showToast(t('saved') || 'Taslak kaydedildi', 'success', 2000);
    }
});

el('ilan-formu')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) { showToast('loginRequired', 'warning', 2000); return; }
    if (!validateAdForm()) return;
    const editId = parseInt(el('ilan-modal').dataset.editId);
    const title = el('ilan-baslik')?.value?.trim();
    const catVal = el('form-kat-select')?.value;
    const parentCat = window.CATEGORIES_TREE?.find(g => g.sub?.includes(catVal))?.id || catVal;
    if (!editId && title && catVal) {
        const similar = findSimilarExistingAds(title, parentCat, catVal, null);
        if (similar.length > 0 && !confirm('Benzer ' + similar.length + ' ilan bulundu. Yine de ilan vermek istiyor musunuz?')) return;
    }
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
        if (window.API_BASE && window.AlsatAPI && window.AlsatAPI.isLoggedIn && window.AlsatAPI.isLoggedIn()) {
            try {
                await window.AlsatAPI.updateAd(editId, { title: adData.title, price: adData.price, currency: adData.currency, category: adData.category, subCategory: adData.subCategory, city: adData.city, district: adData.district, description: adData.description, images: adData.images, attrs: adData.attrs, condition: adData.condition, sellerType: adData.sellerType, hidePhone: adData.hidePhone });
            } catch (err) {
                showToast(err?.error || 'Güncelleme başarısız', 'error', 2500);
                return;
            }
        }
        const idx = window.adsDatabase.findIndex(a => a.id === editId);
        const newPriceEur = priceToEur(adData.price, adData.currency);
        if (idx >= 0) window.adsDatabase[idx] = { ...window.adsDatabase[idx], ...adData };
        (window.priceAlerts || []).filter(a => a.adId === editId && a.priceAtSubscribe > newPriceEur).forEach(a => {
            addNotification(a.userId, 'price_drop', t('priceDropped'), '"' + (adData.title || a.adTitle) + '" ' + (t('priceDropBody') || 'fiyatı düştü: ') + formatPrice(adData), { adId: editId });
        });
        window.priceAlerts = (window.priceAlerts || []).filter(a => !(a.adId === editId && a.priceAtSubscribe > newPriceEur));
        savePriceAlerts();
        showToast('adEdited', 'success', 2000);
    } else {
        if (window.API_BASE && window.AlsatAPI) {
            try {
                const apiId = await window.AlsatAPI.createAd(adData);
                if (apiId) adData.id = apiId;
            } catch (err) { console.warn('API ilan oluşturma hatası:', err); }
        }
        window.adsDatabase.push(adData);
        if (adData.status === 'approved') checkSearchAlerts();
        const msg = getSiteSettings().adRequiresApproval ? (t('adPendingApproval') || 'İlanınız yönetici onayına gönderildi.') : (t('adPublished') || 'İlan yayınlandı');
        showToast(getSiteSettings().adRequiresApproval ? 'adPendingApproval' : 'adPublished', 'success', 2000);
    }
    saveAdsDatabase();
    closeModal();
    resetAdForm();
    this.reset();
    applyFilters();
    openMyAdsPage();
});

// ========== LOGIN / SIGNUP ==========
el('login-formu')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = (el('login-username')?.value || '').trim();
    const password = (el('login-password')?.value || '').trim();
    const remember = !!(el('remember-login')?.checked);
    if (!email) { showToast('loginRequired', 'warning', 2000); return; }
    let recaptchaToken = null;
    if (window.RECAPTCHA_SITE_KEY && typeof grecaptcha !== 'undefined' && grecaptcha.execute) {
        try { recaptchaToken = await grecaptcha.execute(window.RECAPTCHA_SITE_KEY, { action: 'login' }); } catch (err) {}
    }
    if (window.API_BASE && window.AlsatAPI) {
        try {
            const user = await window.AlsatAPI.login(email, password, recaptchaToken);
            if (user && user.id) {
                getOrCreateUser(user.id, user.email, user.name);
                if (user.isAdmin !== undefined) user.isAdmin = !!user.isAdmin;
                setCurrentUser(user, remember);
                try {
                    const apiFavs = await window.AlsatAPI.getFavorites(user.id);
                    if (Array.isArray(apiFavs)) window.favorites = apiFavs;
                } catch (e) {}
                updateHeaderUI();
                closeLoginModal();
                showToast('loginSuccess', 'success', 2000);
                this.reset();
            }
        } catch (err) {
            const msg = err?.message || (typeof err === 'object' && err.error) || t('loginFailed');
            showToast(msg, 'error', 2500);
        }
        return;
    }
    if (!window.usersDatabase) loadUsersDatabase();
    const existing = Object.values(window.usersDatabase || {}).find(u => (u.email || '').toLowerCase() === email.toLowerCase());
    if (existing && existing.password) {
        if (password !== existing.password) { showToast(t('wrongPassword') || 'Şifre hatalı', 'error', 2500); return; }
    }
    const user = existing ? { id: existing.id, email: existing.email, name: existing.name } : { id: Date.now(), email, name: email.split('@')[0] || 'Kullanıcı' };
    getOrCreateUser(user.id, user.email, user.name);
    setCurrentUser(user, remember);
    updateHeaderUI();
    closeLoginModal();
    showToast('loginSuccess', 'success', 2000);
    this.reset();
});

el('signup-send-code-btn')?.addEventListener('click', async function() {
    const email = (el('signup-email')?.value || '').trim().toLowerCase();
    if (!email) { showToast(t('loginRequired') || 'E-posta gerekli', 'warning', 2000); return; }
    var base = window.API_BASE || (location.protocol + '//' + location.host);
    if (!base) { showToast(t('codeSendFailed') || 'Bağlantı kurulamadı', 'error', 3000); return; }
    try {
        if (window.AlsatAPI && window.AlsatAPI.sendCode) {
            await window.AlsatAPI.sendCode('register', email);
        } else {
            var r = await fetch(base + '/api/auth/send-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'register', email: email }) });
            var d = await r.json().catch(function(){ return {}; });
            if (!r.ok) throw new Error(d.error || r.statusText || 'Kod gönderilemedi');
        }
        var codeStep = el('signup-code-step');
        var btn = el('signup-send-code-btn');
        if (codeStep) { codeStep.style.display = 'block'; el('signup-verify-code')?.focus(); }
        if (btn) { btn.disabled = true; var txt = btn.querySelector('#signup-send-code-txt'); if (txt) txt.textContent = t('codeSent') || 'Kod gönderildi'; }
        showToast(t('codeSent') || 'Doğrulama kodu e-postanıza gönderildi', 'success', 3000);
    } catch (err) {
        showToast(err?.error || err?.message || t('codeSendFailed') || 'Kod gönderilemedi', 'error', 3000);
    }
});

el('signup-formu')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = (el('signup-name')?.value || '').trim();
    const email = (el('signup-email')?.value || '').trim().toLowerCase();
    const phone = (el('signup-phone')?.value || '').trim();
    const password = (el('signup-password')?.value || '').trim();
    const confirm = (el('signup-confirm')?.value || '').trim();
    if (!email || !name) { showToast(t('loginRequired') || 'E-posta ve ad gerekli', 'warning', 2000); return; }
    if (!phone || phone.replace(/\D/g, '').length < 9) { showToast(t('signupPhoneRequired') || 'Geçerli telefon numarası girin', 'warning', 2000); return; }
    if (password.length < 6) { showToast(t('passwordMin6') || 'Şifre en az 6 karakter olmalı', 'warning', 2000); return; }
    if (password !== confirm) { showToast(t('passwordsMustMatch') || 'Şifreler eşleşmiyor', 'warning', 2000); return; }
    var base = window.API_BASE || (location.protocol + '//' + location.host);
    if (base) {
        var codeStep = el('signup-code-step');
        var codeInput = el('signup-verify-code');
        if (!codeStep || codeStep.style.display === 'none') {
            showToast(t('sendCodeFirst') || 'Önce "Doğrulama Kodu Gönder" butonuna tıklayın', 'warning', 3000);
            return;
        }
        var code = (codeInput?.value || '').trim();
        if (!code || code.length !== 6) { showToast(t('enterValidCode') || 'Geçerli 6 haneli kodu girin', 'warning', 2000); return; }
        try {
            var r;
            if (window.AlsatAPI && window.AlsatAPI.verifyRegister) {
                r = await window.AlsatAPI.verifyRegister(email, code, name, password, phone);
            } else {
                var resp = await fetch(base + '/api/auth/verify-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, code: code, name: name, password: password, phone: phone }) });
                r = await resp.json().catch(function(){ return {}; });
                if (!resp.ok) throw new Error(r.error || resp.statusText || 'Kayıt başarısız');
            }
            if (r && r.id) {
                getOrCreateUser(r.id, email, name, phone);
                setCurrentUser({ id: r.id, email, name, phone });
                updateHeaderUI();
                closeSignupModal();
                if (codeStep) codeStep.style.display = 'none';
                if (codeInput) codeInput.value = '';
                var btn = el('signup-send-code-btn');
                if (btn) { btn.disabled = false; var t = btn.querySelector('#signup-send-code-txt'); if (t) t.textContent = t('sendCodeBtn') || 'Doğrulama Kodu Gönder'; }
                showToast('signupSuccess', 'success', 2000);
                this.reset();
            }
        } catch (err) {
            showToast(err?.error || err?.message || t('signupFailed') || 'Kayıt başarısız', 'error', 3000);
        }
        return;
    }
    var user = { id: Date.now(), email, name, phone };
    getOrCreateUser(user.id, user.email, user.name, user.phone);
    if (window.usersDatabase && window.usersDatabase[String(user.id)]) window.usersDatabase[String(user.id)].password = password;
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
    const codeStep = el('signup-code-step');
    if (codeStep) codeStep.style.display = 'none';
    const sendBtn = el('signup-send-code-btn');
    if (sendBtn) { sendBtn.disabled = false; const t = sendBtn.querySelector('#signup-send-code-txt'); if (t) t.textContent = t('sendCodeBtn') || 'Doğrulama Kodu Gönder'; }
    if (sendBtn && (window.API_BASE || (location.protocol && location.host))) sendBtn.style.display = '';
});

el('switch-login')?.addEventListener('click', function(e) {
    e.preventDefault();
    closeSignupModal();
    const codeStep = el('signup-code-step');
    if (codeStep) codeStep.style.display = 'none';
    window.openLoginModal?.();
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
document.addEventListener('DOMContentLoaded', async function() {
    try {
    setupInfiniteScroll();
    // TÜM KRİTİK TIKLAMALAR - Document delegation (hiçbir init hatası engellemesin)
    document.addEventListener('click', function criticalClick(e) {
        var t = e.target;
        if (t.closest && t.closest('#open-terms-link')) { e.preventDefault(); e.stopPropagation(); (window.openTermsModal||function(){})(); return; }
        if (t.closest && t.closest('#logo-home')) { e.preventDefault(); if (window.showHomepage) showHomepage(); return; }
        if (t.closest && t.closest('.back-btn')) {
            e.preventDefault();
            var sp = document.getElementById('stores-page');
            var pg = document.getElementById('product-detail-page');
            var sd = document.getElementById('store-detail-page');
            var ad = document.getElementById('add-product-page');
            var hv = document.getElementById('homepage-view');
            var lv = document.getElementById('listing-view');
            if (sp && sp.style.display === 'block') {
                sp.style.display = 'none';
                var from = window.alsatStoreFrom || 'homepage';
                if (hv && lv) { lv.style.display = from === 'listing' ? 'block' : 'none'; hv.style.display = from === 'listing' ? 'none' : 'block'; }
                window.scrollTo(0,0);
            } else if (pg && pg.style.display === 'block') {
                pg.style.display = 'none';
                if (sd && sd.style.display === 'block') sd.style.display = 'block'; else if (sp) sp.style.display = 'block';
                window.scrollTo(0,0);
            } else if (sd && sd.style.display === 'block') {
                sd.style.display = 'none';
                if (sp) sp.style.display = 'block';
                window.scrollTo(0,0);
            } else if (ad && ad.style.display === 'block') {
                ad.style.display = 'none';
                if (sd) sd.style.display = 'block';
                window.scrollTo(0,0);
            } else {
                document.querySelectorAll('.profile-page-container').forEach(function(p){ p.style.display = 'none'; });
                if (hv) hv.style.display = 'block';
                if (lv) lv.style.display = 'none';
                if (sp) sp.style.display = 'none';
                window.scrollTo(0,0);
            }
            return;
        }
        var storesPg = document.getElementById('stores-page');
        if (t.closest && t.closest('.alsat-store-nav') && storesPg && storesPg.style.display === 'block') {
            var btn = t.closest('.alsat-nav-item'); if (!btn) return;
            e.preventDefault(); e.stopPropagation();
            var cat = btn.dataset.cat, navType = btn.dataset.nav;
            document.querySelectorAll('.alsat-store-nav .alsat-nav-item').forEach(function(n){ n.classList.remove('active'); });
            if (cat) {
                storesPg.dataset.alsatCategory = cat; storesPg.dataset.alsatFilter = '';
                btn.classList.add('active');
            } else if (navType === 'categories') {
                storesPg.dataset.alsatCategory = ''; storesPg.dataset.alsatFilter = '';
            } else if (navType === 'flash') {
                storesPg.dataset.alsatFilter = 'flash'; storesPg.dataset.alsatCategory = '';
                document.querySelector('.alsat-store-nav .alsat-nav-item[data-nav="flash"]')?.classList.add('active');
                document.querySelectorAll('.discount-banner').forEach(function(x){ x.classList.remove('active'); });
            } else if (navType === 'bestsellers') {
                storesPg.dataset.alsatFilter = 'bestsellers'; storesPg.dataset.alsatCategory = '';
                document.querySelector('.alsat-store-nav .alsat-nav-item[data-nav="bestsellers"]')?.classList.add('active');
                document.querySelectorAll('.discount-banner').forEach(function(x){ x.classList.remove('active'); });
            } else {
                storesPg.dataset.alsatCategory = ''; storesPg.dataset.alsatFilter = '';
            }
            if (window.renderAlsatStorePage) renderAlsatStorePage({ scrollToProducts: true });
            return;
        }
        var discBanner = t.closest && t.closest('.discount-banner');
        if (discBanner && storesPg && storesPg.style.display === 'block') {
            e.preventDefault();
            storesPg.dataset.alsatFilter = '';
            storesPg.dataset.alsatMinDisc = discBanner.dataset.min || '0';
            document.querySelectorAll('.alsat-nav-item').forEach(function(n){ n.classList.remove('active'); });
            document.querySelectorAll('.discount-banner').forEach(function(x){ x.classList.remove('active'); });
            discBanner.classList.add('active');
            if (window.renderAlsatStorePage) renderAlsatStorePage({ scrollToProducts: true });
            return;
        }
        var alsatCatCard = t.closest && t.closest('.alsat-cat-card');
        if (alsatCatCard && storesPg && storesPg.style.display === 'block') {
            e.preventDefault();
            var c = alsatCatCard.dataset.cat;
            if (c) {
                storesPg.dataset.alsatCategory = c;
                document.querySelectorAll('.alsat-nav-item[data-cat]').forEach(function(n){ n.classList.toggle('active', n.dataset.cat === c); });
                if (window.renderAlsatStorePage) renderAlsatStorePage({ scrollToProducts: true });
            }
            return;
        }
        if (t.closest && t.closest('.homepage-cat-item')) {
            e.preventDefault();
            var item = t.closest('.homepage-cat-item');
            if (item && window.showListingPage) { showListingPage(item.dataset.homepageCat); if (window.filterByCategory) filterByCategory(item.dataset.homepageCat); }
            return;
        }
        if (t.closest && t.closest('.region-link')) {
            e.preventDefault();
            var link = t.closest('.region-link');
            if (link) {
                var regions = document.querySelector('.homepage-regions');
                if (regions) regions.querySelectorAll('.region-link').forEach(function(l){ l.classList.remove('active'); });
                link.classList.add('active');
                var city = link.dataset.city || null;
                if (city === '') city = null;
                if (window.showListingPage) showListingPage(null, city);
            }
            return;
        }
        if (t.closest && (t.closest('#homepage-stores-btn') || t.closest('.homepage-stores-btn') || t.closest('.alsat-store-cta'))) {
            e.preventDefault();
            (window.openStoresPage||function(){
                var sp = document.getElementById('stores-page');
                if (sp) { document.querySelectorAll('.profile-page-container').forEach(function(p){ p.style.display='none'; });
                    var hv = document.getElementById('homepage-view'), lv = document.getElementById('listing-view');
                    if (hv) hv.style.display='none'; if (lv) lv.style.display='none';
                    sp.style.display='block'; window.alsatStoreFrom = (lv&&lv.style.display==='block')?'listing':'homepage';
                    if (window.renderAlsatStorePage) renderAlsatStorePage();
                }
            })();
            return;
        }
        if (t.closest && t.closest('#homepage-ilan-ver')) {
            e.preventDefault();
            if (window.getCurrentUser && getCurrentUser()) { if (typeof resetAdForm === 'function') resetAdForm(); var m = document.getElementById('ilan-modal'); if (m) { m.style.display = 'flex'; m.classList.add('active'); document.body.style.overflow = 'hidden'; } }
            else { (window.showToast||function(){})(typeof window.t==='function'?t('postAdRequired'):'Giriş yapınız','warning',2000); (window.openLoginModal||function(){})(); }
            return;
        }
        var adCard = t.closest && (t.closest('.ilan-kart[data-ad-id]') || t.closest('.homepage-new-ad-card[data-ad-id]') || (t.closest('.recent-ad-card') && !t.closest('.recent-ad-remove, .recent-ad-fav, .recent-ad-compare')));
        if (adCard && adCard.dataset && adCard.dataset.adId) {
            e.preventDefault();
            var id = parseInt(adCard.dataset.adId, 10);
            if (id && window.ilanDetayAc) window.ilanDetayAc(id);
            return;
        }
    }, true);

    // Online sayım için periyodik ping (API varsa)
    if (window.API_BASE) {
        setInterval(function() {
            const opts = {};
            const tok = window.AlsatAPI?.getToken?.();
            if (tok) opts.headers = { 'Authorization': 'Bearer ' + tok };
            fetch(window.API_BASE + '/api/ping', opts).catch(function(){});
        }, 45000);
    }

    // Homepage içeriğini hemen doldur - butonlar çalışsın diye
    try { if (typeof initHomepage === 'function') initHomepage(); } catch (eh) { console.warn('initHomepage early:', eh); }

    // Mobil menüyü EN BAŞTA bağla - diğer init hataları bunu engellemesin
    (function initMobileMenuFirst() {
        var btn = document.getElementById('mobile-menu-btn');
        var overlay = document.getElementById('mobile-menu-overlay');
        var drawer = document.getElementById('mobile-menu-drawer');
        var closeBtn = document.getElementById('mobile-menu-close');
        if (!btn || !overlay) return;
        function openMenu() {
            overlay.classList.add('open');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            btn.setAttribute('aria-expanded', 'true');
        }
        function closeMenu() {
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            btn.setAttribute('aria-expanded', 'false');
        }
        function doOpen(e) { if (e) { e.preventDefault(); e.stopPropagation(); } openMenu(); }
        function doClose(e) { if (e) { e.preventDefault(); e.stopPropagation(); } closeMenu(); }
        btn.addEventListener('click', doOpen);
        btn.addEventListener('touchend', function(e) { e.preventDefault(); openMenu(); }, { passive: false });
        if (closeBtn) {
            closeBtn.addEventListener('click', doClose);
            closeBtn.addEventListener('touchend', function(e) { e.preventDefault(); closeMenu(); }, { passive: false });
        }
        overlay.addEventListener('click', function(e) { if (e.target === overlay) closeMenu(); });
        if (drawer) drawer.addEventListener('click', function(e) { e.stopPropagation(); });
        // Drawer içindeki öğelere tıklama - event delegation ile
        drawer.addEventListener('click', function(e) {
            var t = e.target.closest('[id^="mobile-action-"]');
            if (!t) return;
            var id = t.id;
            closeMenu();
            if (id === 'mobile-action-login') { (window.openLoginModal || function(){})(); }
            else if (id === 'mobile-action-ilan') {
                var u = (typeof getCurrentUser === 'function' ? getCurrentUser() : (window.getCurrentUser && window.getCurrentUser()));
                if (!u) {
                    (window.showToast || function(){})('Giriş yapınız', 'warning', 2000);
                    (window.openLoginModal || function(){})();
                } else { if (typeof resetAdForm === 'function') resetAdForm(); var m = document.getElementById('ilan-modal'); if (m) { m.style.display = 'flex'; m.classList.add('active'); document.body.style.overflow = 'hidden'; } }
            }
            else if (id === 'mobile-action-fav') { (window.openFavoritesPage || function(){})(); }
            else if (id === 'mobile-action-support') { (window.openSupportModal || function(){})(); }
            else if (id === 'mobile-action-theme') {
                var isDark = document.body.classList.contains('dark-theme');
                if (window.applyTheme) applyTheme(!isDark); else { document.body.classList.toggle('dark-theme', !isDark); document.body.classList.toggle('light-theme', isDark); }
            }
        });
        // Arama ve logo - mobilde çalışsın
        var searchBtn = document.getElementById('searchBtn');
        var logoHome = document.getElementById('logo-home');
        if (searchBtn) searchBtn.addEventListener('click', function() { if (typeof showListingPage === 'function') showListingPage(); if (typeof applyFilters === 'function') applyFilters(); });
        if (logoHome) logoHome.addEventListener('click', function(e) { e.preventDefault(); if (typeof showHomepage === 'function') showHomepage(); });
        // Kullanım koşulları linki - tıklayınca sözleşme sayfası açılsın (en başta bağla)
        var termsLink = document.getElementById('open-terms-link');
        if (termsLink) {
            termsLink.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); if (window.openTermsModal) window.openTermsModal(); });
            termsLink.addEventListener('touchend', function(e) { e.preventDefault(); if (window.openTermsModal) window.openTermsModal(); }, { passive: false });
        }
    })();

    var sendCodeBtn = el('signup-send-code-btn');
    if (sendCodeBtn && (window.API_BASE || (location.protocol && location.host))) sendCodeBtn.style.display = '';

    if (window.API_BASE && window.AlsatAPI) {
        try {
            const ads = await window.AlsatAPI.fetchAdsFull();
            window.adsDatabase = window.AlsatAPI.normalizeAds(Array.isArray(ads) ? ads : []);
            saveAdsDatabase();
            if (typeof applyFilters === 'function') applyFilters();
            const users = await window.AlsatAPI.fetchUsers();
            if (users && typeof users === 'object') {
                window.usersDatabase = users;
                saveUsersDatabase();
            }
            const cur = getCurrentUser();
            if (cur && cur.id && window.AlsatAPI.isLoggedIn && window.AlsatAPI.isLoggedIn()) {
                try {
                    const fresh = await window.AlsatAPI.me();
                    if (fresh && fresh.id) {
                        cur.isAdmin = !!fresh.isAdmin;
                        cur.email = fresh.email || cur.email;
                        cur.name = fresh.name || cur.name;
                        setCurrentUser(cur, !!localStorage.getItem('alsat_currentUser'));
                        if (typeof updateHeaderUI === 'function') updateHeaderUI();
                    }
                } catch (e) {}
                const apiFavs = await window.AlsatAPI.getFavorites(cur.id);
                if (Array.isArray(apiFavs)) window.favorites = apiFavs;
            }
        } catch (e) { console.warn('Alsat API yüklenemedi:', e); }
    }
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.alsat-store-nav .alsat-nav-item');
        if (!btn || !el('stores-page') || el('stores-page').style.display !== 'block') return;
        e.preventDefault();
        e.stopPropagation();
        const cat = btn.dataset.cat;
        const navType = btn.dataset.nav;
        const storePage = el('stores-page');
        if (cat) {
            if (storePage) { storePage.dataset.alsatCategory = cat; storePage.dataset.alsatFilter = ''; }
            document.querySelectorAll('.alsat-store-nav .alsat-nav-item').forEach(n=>n.classList.remove('active'));
            btn.classList.add('active');
            if (typeof renderAlsatStorePage === 'function') renderAlsatStorePage({ scrollToProducts: true });
        } else if (navType === 'categories') {
            if (storePage) { storePage.dataset.alsatCategory = ''; storePage.dataset.alsatFilter = ''; }
            document.querySelectorAll('.alsat-store-nav .alsat-nav-item').forEach(n=>n.classList.remove('active'));
            if (typeof renderAlsatStorePage === 'function') renderAlsatStorePage({ scrollToProducts: true });
        } else if (navType === 'flash') {
            if (storePage) { storePage.dataset.alsatFilter = 'flash'; storePage.dataset.alsatCategory = ''; }
            document.querySelectorAll('.alsat-store-nav .alsat-nav-item').forEach(n=>n.classList.remove('active'));
            document.querySelector('.alsat-store-nav .alsat-nav-item[data-nav="flash"]')?.classList.add('active');
            document.querySelectorAll('.discount-banner').forEach(x=>x.classList.remove('active'));
            if (typeof renderAlsatStorePage === 'function') renderAlsatStorePage({ scrollToProducts: true });
        } else if (navType === 'bestsellers') {
            if (storePage) { storePage.dataset.alsatFilter = 'bestsellers'; storePage.dataset.alsatCategory = ''; }
            document.querySelectorAll('.alsat-store-nav .alsat-nav-item').forEach(n=>n.classList.remove('active'));
            document.querySelector('.alsat-store-nav .alsat-nav-item[data-nav="bestsellers"]')?.classList.add('active');
            document.querySelectorAll('.discount-banner').forEach(x=>x.classList.remove('active'));
            if (typeof renderAlsatStorePage === 'function') renderAlsatStorePage({ scrollToProducts: true });
        }
    });
    const langSelect = el('lang-select');
    if (langSelect) {
        langSelect.value = window.currentLang;
        langSelect.addEventListener('change', function() {
            updateLanguage(this.value);
        });
    }
    try { updateLanguage(window.currentLang); } catch (e) { console.error('updateLanguage error:', e); }
    fetchExchangeRates();
    initCurrencyWidget();
    initLocationSelects();
    initFormLocationSelects();
    initCategorySelect();
    renderSavedFiltersSelect();
    initCategorySidebar();
    initHomepage();
    initPremiumForm();
    updateSearchAlertButton();
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
    /* Service Worker geçici devre dışı - önbellek kilidi sorunu (gizli sekme/farklı cihaz eski versiyon görüyor) */
    /*
    if (isSecureOrigin && 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(function() {});
    }
    */
    const hash = location.hash;
    const m = hash && hash.match(/^#ad=(\d+)/);
    if (m) { showListingPage(); setTimeout(() => window.ilanDetayAc(parseInt(m[1])), 300); }
    if (hash === '#admin' && typeof openAdminPage === 'function') {
        setTimeout(function() { if (isAdmin()) openAdminPage(); else showToast('Yetkiniz yok', 'warning', 2000); }, 100);
    }
    if (location.search.indexOf('admin=1') >= 0 && getCurrentUser()) {
        localStorage.setItem('alsat_admin_ok', '1');
        if (typeof updateHeaderUI === 'function') updateHeaderUI();
        if (typeof openAdminPage === 'function') setTimeout(openAdminPage, 100);
    }
    window.addEventListener('hashchange', function() { if (location.hash === '#admin' && isAdmin()) openAdminPage(); });

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

    el('fav-trigger')?.addEventListener('click', function(e) { e.preventDefault(); window.toggleFavDropdown?.(); });
    el('fav-dropdown-all')?.addEventListener('click', function(e) { e.preventDefault(); el('fav-dropdown').style.display = 'none'; openFavoritesPage(); });
    el('fav-dropdown-list')?.addEventListener('click', async function(e) {
        var btn = e.target.closest('.fav-dropdown-remove');
        if (!btn) return;
        e.stopPropagation();
        var id = parseInt(btn.dataset.id, 10);
        if (!window.favorites || window.favorites.indexOf(id) < 0) return;
        var user = getCurrentUser();
        if (window.API_BASE && window.AlsatAPI?.isLoggedIn?.() && user) {
            try {
                await window.AlsatAPI.removeFavorite(user.id, id);
            } catch (err) {
                showToast(err?.error || 'Favoriden kaldırılamadı', 'error', 2000);
                return;
            }
        }
        window.favorites = window.favorites.filter(function(x) { return x !== id; });
        saveFavorites();
        updateHeaderUI();
        renderFavDropdown();
        showToast('favRemoved', 'info', 1500);
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
    document.addEventListener('click', function adminClearAllClick(e) {
        if (!e.target?.closest('#admin-clear-all') || !isAdmin()) return;
        e.preventDefault();
        if (!confirm('Tüm ilanlar ve admin dışındaki tüm kullanıcılar silinecek. Favoriler, mesajlar, bildirimler vb. temizlenecek. GERİ ALINAMAZ. Devam?')) return;
        if (!confirm('Son kez onaylayın: TÜM VERİLER SİLİNECEK (admin hariç). Devam?')) return;
        (async function() {
            if (window.API_BASE && window.AlsatAPI) {
                try { await window.AlsatAPI.resetAll(); } catch (err) { console.warn('API reset:', err); }
            }
            const adminEmail = (ADMIN_EMAIL || 'info@alsatmk.com').toLowerCase();
            if (!window.usersDatabase) loadUsersDatabase();
            const db = window.usersDatabase || {};
            const admin = Object.values(db).find(u => (u.email || '').toLowerCase() === adminEmail);
            window.adsDatabase = [];
            window.usersDatabase = admin ? { [String(admin.id)]: admin } : {};
            window.favorites = [];
            window.favoriteLists = {};
            window.conversations = {};
            window.notifications = [];
            window.reportsDatabase = [];
            window.recentlyViewed = [];
            window.searchHistory = [];
            window.compareList = [];
            window.priceAlerts = [];
            window.searchAlerts = [];
            window.soldSurveyDone = [];
            window.userCredits = admin ? { [admin.id]: (window.userCredits || {})[admin.id] || 0 } : {};
            window.userVerifiedUntil = admin ? (window.userVerifiedUntil && window.userVerifiedUntil[admin.id] ? { [admin.id]: window.userVerifiedUntil[admin.id] } : {}) : {};
            window.savedFilters = [];
            window.adminAuditLog = [];
            window.storeFavorites = [];
            window.storeCart = [];
            window.sellerApplications = [];
            window.storePhotoRequests = [];
            window.storeProductRequests = [];
            window.productQuestions = [];
            saveAdsDatabase();
            saveFavorites();
            saveFavoriteLists();
            saveConversations();
            saveNotifications();
            saveReports();
            saveRecentlyViewed();
            saveSearchHistory();
            saveCompareList();
            savePriceAlerts();
            saveSearchAlerts();
            saveSoldSurveyDone();
            saveCredits();
            saveVerified();
            saveUsersDatabase();
            saveAdminAuditLog();
            saveStoreFavorites();
            saveStoreCart();
            saveSavedFilters();
            saveSellerApplications();
            saveStorePhotoRequests();
            saveStoreProductRequests();
            saveProductQuestions();
            updateAdminStats();
            renderAdminAds();
            renderAdminUsers();
            applyFilters();
            showToast(t('allDataCleared'), 'success', 3000);
        })();
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
            if (u.banned) addAdminAudit('user_banned', 'Kullanıcı engellendi: ' + (u.email || u.name || id));
            if (u.banned) {
                const cur = getCurrentUser();
                var curId = cur && (cur.id || cur.userId);
                if (cur && (curId == id || curId == numId || Number(curId) === numId)) { sessionStorage.removeItem('alsat_currentUser'); localStorage.removeItem('alsat_currentUser'); window.userSession.user = null; updateHeaderUI(); hideProfileDropdown(); }
            }
        }
        saveCredits();
        saveVerified();
        closeAdminUserModal();
        renderAdminUsers();
        updateAdminStats();
        showToast('saved', 'success', 2000);
    });
    window.openSellerAppApproveModal = function(appId) {
        el('adm-seller-approve-app-id').value = appId;
        el('adm-seller-approve-password').value = '';
        const L = window.TRANSLATIONS?.[window.currentLang] || {};
        el('seller-approve-modal-title').textContent = L.sellerAppApproveTitle || 'Satıcı Başvurusunu Onayla';
        el('seller-approve-password-label').textContent = L.sellerAppApprovePasswordLabel || 'İlk giriş şifresi';
        el('adm-seller-approve-password').placeholder = L.sellerAppApprovePasswordPlaceholder || 'Satıcı bu şifre ile giriş yapacak';
        el('seller-approve-submit-txt').textContent = L.sellerAppApproveSubmit || 'Onayla ve Şifreyi Kaydet';
        el('admin-seller-approve-modal').style.display = 'flex';
    };
    window.closeSellerAppApproveModal = function() { el('admin-seller-approve-modal').style.display = 'none'; };
    el('admin-seller-approve-submit')?.addEventListener('click', function() {
        if (!isAdmin()) return;
        const appId = el('adm-seller-approve-app-id')?.value;
        const pwd = (el('adm-seller-approve-password')?.value || '').trim();
        if (!pwd || pwd.length < 6) { showToast(t('passwordMin6') || 'Şifre en az 6 karakter olmalı', 'warning', 2000); return; }
        const app = (window.sellerApplications || []).find(x => String(x.id) === String(appId));
        if (!app) return;
        if (!window.usersDatabase) loadUsersDatabase();
        let u = Object.values(window.usersDatabase || {}).find(x => (x.email || '').toLowerCase() === (app.email || '').toLowerCase());
        if (!u) {
            const uid = Date.now();
            u = { id: uid, email: app.email, name: app.company || app.email.split('@')[0] || 'Satıcı', phone: app.phone || '', password: pwd, banned: false, createdAt: new Date().toISOString() };
            window.usersDatabase[String(uid)] = u;
        } else {
            u.password = pwd;
        }
        saveUsersDatabase();
        adminSellerAppStatus(appId, 'approved', null);
        window.closeSellerAppApproveModal();
    });
    window.openSellerAppRejectModal = function(appId) {
        el('adm-seller-reject-app-id').value = appId;
        el('adm-seller-reject-reason').value = '';
        const L = window.TRANSLATIONS?.[window.currentLang] || {};
        el('seller-reject-modal-title').textContent = L.sellerAppRejectTitle || 'Satıcı Başvurusunu Reddet';
        el('seller-reject-reason-label').textContent = L.sellerAppRejectReasonLabel || 'Red sebebi';
        el('adm-seller-reject-reason').placeholder = L.sellerAppRejectPlaceholder || 'Red sebebini yazın...';
        el('seller-reject-submit-txt').textContent = L.sellerAppRejectSubmit || 'Reddet ve Bildir';
        el('admin-seller-reject-modal').style.display = 'flex';
    };
    window.closeSellerAppRejectModal = function() {
        el('admin-seller-reject-modal').style.display = 'none';
    };
    el('admin-seller-reject-submit')?.addEventListener('click', function() {
        if (!isAdmin()) return;
        const appId = el('adm-seller-reject-app-id')?.value;
        const reason = (el('adm-seller-reject-reason')?.value || '').trim();
        adminSellerAppStatus(appId, 'rejected', reason);
        window.closeSellerAppRejectModal();
    });
    el('admin-reject-submit')?.addEventListener('click', function() {
        if (!isAdmin()) return;
        const adId = parseInt(el('adm-reject-ad-id')?.value);
        const reason = (el('adm-reject-reason')?.value || '').trim();
        const ad = window.adsDatabase.find(a => a.id === adId);
        if (!ad) return;
        ad.status = 'rejected';
        ad.rejectReason = reason;
        addAdminAudit('ad_rejected', 'İlan #' + adId + ' reddedildi: ' + (ad.title||'').slice(0,40));
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
        var cur = getSiteSettings();
        var num = function(val, def) { var n = parseInt(val, 10); return isNaN(n) ? def : n; };
        var updated = {
            premiumPrices: {
                vitrin: num(el('adm-price-vitrin')?.value, cur.premiumPrices.vitrin),
                font: num(el('adm-price-font')?.value, cur.premiumPrices.font),
                urgent: num(el('adm-price-urgent')?.value, cur.premiumPrices.urgent),
                stats: num(el('adm-price-stats')?.value, cur.premiumPrices.stats),
                extend: num(el('adm-price-extend')?.value, cur.premiumPrices.extend),
                multicity: num(el('adm-price-multicity')?.value, cur.premiumPrices.multicity),
                verified: num(el('adm-price-verified')?.value, cur.premiumPrices.verified)
            },
            bumpPrice: num(el('adm-price-bump')?.value, cur.bumpPrice),
            maxPhotos: num(el('adm-max-photos')?.value, cur.maxPhotos),
            maxVideoSeconds: num(el('adm-max-video')?.value, cur.maxVideoSeconds),
            defaultAdDays: num(el('adm-default-days')?.value, cur.defaultAdDays),
            extendedAdDays: num(el('adm-extended-days')?.value, cur.extendedAdDays),
            whatsappNumber: (el('adm-whatsapp')?.value || '').trim() || (cur.whatsappNumber || '+38970000000'),
            viberNumber: (el('adm-viber')?.value || '').trim() || (cur.viberNumber || '+38970000000'),
            adRequiresApproval: !!el('adm-ad-requires-approval')?.checked,
            sellerAppMsgIntro: (el('adm-seller-msg-intro')?.value || '').trim() || (cur.sellerAppMsgIntro || ''),
            sellerAppMsgConfirm: (el('adm-seller-msg-confirm')?.value || '').trim() || (cur.sellerAppMsgConfirm || '')
        };
        var s = { ...cur, ...updated, premiumPrices: { ...cur.premiumPrices, ...updated.premiumPrices } };
        try {
            localStorage.setItem('alsat_site_settings', JSON.stringify(s));
            updatePremiumLabels();
            showToast('saved', 'success', 2000);
        } catch (e) {
            console.error('Site ayarları kaydedilemedi:', e);
            showToast('Kaydetme hatası', 'error', 3000);
        }
    });
    el('logout-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });

    el('back-profile-btn')?.addEventListener('click', () => {
        el('profile-page').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'instant' });
    });
    el('back-favorites-btn')?.addEventListener('click', () => {
        el('favorites-page').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'instant' });
    });
    el('back-ads-btn')?.addEventListener('click', () => {
        el('my-ads-page').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'instant' });
    });
    el('my-ads-list')?.addEventListener('click', function(e) {
        const editBtn = e.target.closest('.ad-edit-btn');
        if (editBtn && editBtn.dataset.id) {
            e.preventDefault();
            e.stopPropagation();
            const id = parseInt(editBtn.dataset.id, 10);
            if (!isNaN(id) && typeof window.openIlanModalForEdit === 'function') window.openIlanModalForEdit(id);
        }
    });
    el('back-stores-btn')?.addEventListener('click', () => {
        el('stores-page').style.display = 'none';
        const from = window.alsatStoreFrom || 'homepage';
        if (from === 'listing') {
            el('listing-view')?.style.setProperty('display', 'block');
            el('homepage-view')?.style.setProperty('display', 'none');
        } else {
            el('homepage-view')?.style.setProperty('display', 'block');
            el('listing-view')?.style.setProperty('display', 'none');
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
    });
    el('back-store-detail-btn')?.addEventListener('click', () => {
        el('store-detail-page').style.display = 'none';
        if (el('store-detail-page')?.dataset?.adminMode) {
            document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
            el('admin-page').style.display = 'block';
            qsa('.admin-tab-btn').forEach(b => b.classList.remove('active'));
            qsa('.admin-tab-pane').forEach(p => p.classList.remove('active'));
            document.querySelector('.admin-tab-btn[data-admin-tab="stores"]')?.classList.add('active');
            el('admin-tab-stores')?.classList.add('active');
            renderAdminStores();
        } else {
            el('stores-page').style.display = 'block';
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
    });
    el('back-product-detail-btn')?.addEventListener('click', () => {
        el('product-detail-page').style.display = 'none';
        if (window.productDetailFrom === 'store-detail' && window.productDetailStoreId) openStoreDetail(window.productDetailStoreId);
        else el('stores-page').style.display = 'block';
        window.scrollTo(0, 0);
    });
    el('back-add-product-btn')?.addEventListener('click', () => {
        el('add-product-page').style.display = 'none';
        const sid = window.addProductPageStoreId;
        if (sid) openStoreDetail(sid);
        else el('stores-page').style.display = 'block';
        window.scrollTo(0, 0);
    });
    el('back-cart-btn')?.addEventListener('click', () => {
        el('cart-page').style.display = 'none';
        el('stores-page').style.display = 'block';
        window.scrollTo(0, 0);
    });
    el('add-product-page-image-file')?.addEventListener('change', function() {
        const file = this.files && this.files[0];
        if (!file || !file.type.startsWith('image/')) return;
        const r = new FileReader();
        r.onload = function() { el('add-product-page-image').value = r.result; };
        r.readAsDataURL(file);
    });
    el('add-product-page-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const storeId = parseInt(el('add-product-page-store-id')?.value);
        const editId = (el('add-product-page-edit-id')?.value || '').trim();
        const user = getCurrentUser();
        const store = (window.storesDatabase || []).find(s => s.id === storeId);
        if (!user || !store || store.ownerId !== user.id) return;
        const title = (el('add-product-page-title-inp')?.value || '').trim();
        const price = parseFloat(el('add-product-page-price')?.value) || 0;
        const originalPrice = parseFloat(el('add-product-page-original-price')?.value) || 0;
        const category = (el('add-product-page-category')?.value || '').trim() || 'Genel';
        const material = (el('add-product-page-material')?.value || '').trim();
        const color = (el('add-product-page-color')?.value || '').trim();
        const image = (el('add-product-page-image')?.value || '').trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300';
        if (!title || !material || !color) { showToast(t('productNameMaterialColorRequired'), 'warning', 3000); return; }
        let discountPercent;
        if (originalPrice && originalPrice > price) discountPercent = Math.round(100 - (price / originalPrice * 100));
        const productData = { storeId, title, price, originalPrice: originalPrice || undefined, discountPercent, image, category, material, color };
        window.storeProductRequests = window.storeProductRequests || [];
        const req = { id: Date.now(), action: editId ? 'edit' : 'add', storeId, productId: editId ? parseInt(editId) : null, product: productData, status: 'pending', requestedBy: user.id, createdAt: new Date().toISOString() };
        window.storeProductRequests.push(req);
        saveStoreProductRequests();
        el('add-product-page').style.display = 'none';
        showToast(t('requestSentPublish'), 'info', 3000);
        openStoreDetail(storeId);
    });

    el('btnIlanVer')?.addEventListener('click', function(e) {
        e.preventDefault();
        if (!getCurrentUser()) {
            showToast('postAdRequired', 'warning', 2000);
            window.openLoginModal();
            return;
        }
        resetAdForm();
        var m = el('ilan-modal');
        if (m) { m.style.display = 'flex'; m.classList.add('active'); document.body.style.overflow = 'hidden'; }
    });

    el('new-ad-from-profile')?.addEventListener('click', function(e) {
        e.preventDefault();
        el('my-ads-page').style.display = 'none';
        resetAdForm();
        var m = el('ilan-modal');
        if (m) { m.style.display = 'flex'; m.classList.add('active'); document.body.style.overflow = 'hidden'; }
    });

    el('support-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        openSupportModal();
    });
    el('login-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.openLoginModal?.();
    });
    el('open-terms-link')?.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); window.openTermsModal?.(); });

    el('forgot-password')?.addEventListener('click', function(e) {
        e.preventDefault();
        el('login-modal').style.display = 'none';
        el('forgot-modal').style.display = 'flex';
        el('forgot-step1').style.display = 'block';
        el('forgot-step2').style.display = 'none';
        el('forgot-email').value = '';
        var fc = el('forgot-code'); if (fc) fc.value = '';
        var fnp = el('forgot-new-password'); if (fnp) fnp.value = '';
        var fcp = el('forgot-confirm-password'); if (fcp) fcp.value = '';
    });
    el('forgot-send-btn')?.addEventListener('click', async function() {
        const email = (el('forgot-email')?.value || '').trim();
        if (!email) { showToast(t('invalidAmount') || 'Geçerli e-posta girin', 'warning', 2000); return; }
        var base = window.API_BASE || (location.protocol + '//' + location.host);
        if (!base) { showToast(t('codeSendFailed') || 'Bağlantı kurulamadı. Sayfayı yenileyin.', 'error', 3000); return; }
        try {
            if (window.AlsatAPI && window.AlsatAPI.sendCode) {
                await window.AlsatAPI.sendCode('forgot', email);
            } else {
                var r = await fetch(base + '/api/auth/send-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'forgot', email: email }) });
                var d = await r.json().catch(function(){ return {}; });
                if (!r.ok) throw new Error(d.error || r.statusText || 'Kod gönderilemedi');
            }
            el('forgot-step1').style.display = 'none';
            el('forgot-step2').style.display = 'block';
            el('forgot-code')?.focus();
            showToast(t('codeSent') || 'Doğrulama kodu e-postanıza gönderildi', 'success', 3000);
        } catch (err) {
            showToast(err?.error || err?.message || t('codeSendFailed') || 'Kod gönderilemedi', 'error', 3000);
        }
    });
    el('forgot-back-btn')?.addEventListener('click', function() {
        el('forgot-step1').style.display = 'block';
        el('forgot-step2').style.display = 'none';
    });
    el('forgot-reset-btn')?.addEventListener('click', async function() {
        const email = (el('forgot-email')?.value || '').trim();
        const code = (el('forgot-code')?.value || '').trim();
        const newPwd = (el('forgot-new-password')?.value || '').trim();
        const confirmPwd = (el('forgot-confirm-password')?.value || '').trim();
        if (!email || !code) { showToast(t('enterValidCode') || 'Kod girin', 'warning', 2000); return; }
        if (newPwd.length < 6) { showToast(t('passwordMin6') || 'Şifre en az 6 karakter olmalı', 'warning', 2000); return; }
        if (newPwd !== confirmPwd) { showToast(t('passwordsMustMatch') || 'Şifreler eşleşmiyor', 'warning', 2000); return; }
        var base = window.API_BASE || (location.protocol + '//' + location.host);
        if (!base) { showToast(t('passwordResetFailed') || 'Bağlantı kurulamadı. Sayfayı yenileyin.', 'error', 3000); return; }
        try {
            if (window.AlsatAPI && window.AlsatAPI.verifyForgot) {
                await window.AlsatAPI.verifyForgot(email, code, newPwd);
            } else {
                var r = await fetch(base + '/api/auth/verify-forgot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, code: code, newPassword: newPwd }) });
                var d = await r.json().catch(function(){ return {}; });
                if (!r.ok) throw new Error(d.error || r.statusText || 'Şifre sıfırlanamadı');
            }
            window.closeForgotModal();
            window.openLoginModal?.();
            showToast(t('passwordResetSuccess') || 'Şifreniz güncellendi. Giriş yapabilirsiniz.', 'success', 3000);
        } catch (err) {
            showToast(err?.error || err?.message || t('passwordResetFailed') || 'Şifre sıfırlanamadı', 'error', 3000);
        }
    });
    qsa('#forgot-modal .toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            if (input.type === 'password') { input.type = 'text'; icon?.classList.replace('fa-eye', 'fa-eye-slash'); }
            else { input.type = 'password'; icon?.classList.replace('fa-eye-slash', 'fa-eye'); }
        });
    });

    initBannerClicks();
    window.addEventListener('scroll', function() {
        const btn = el('back-to-top');
        if (btn) btn.classList.toggle('visible', window.scrollY > 400);
    });
    el('back-to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    renderCompareBar();
    renderPopularSearches();
    el('btn-uygula')?.addEventListener('click', applyFilters);
    el('btn-search-alert')?.addEventListener('click', function() { window.toggleSearchAlert?.(); });
    el('btn-map-view')?.addEventListener('click', function() { window.toggleListingMap?.(); });
    function toggleListingFilters() {
        const ust = el('filtreler-ust');
        if (ust) { ust.classList.toggle('filters-expanded'); ust.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
    el('filtre-toggle-mobile')?.addEventListener('click', toggleListingFilters);
    el('filtre-float-mobile')?.addEventListener('click', toggleListingFilters);
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
        window.homepageQuickFilters = null;
        [el('lf-marka'), el('lf-model'), el('lf-yil'), el('lf-fiyat-min'), el('lf-fiyat-max'), el('lf-yakit'), el('lf-vites'), el('lf-konut-tip'), el('lf-oda'), el('lf-m2'), el('lf-job-type'), el('lf-job-exp'), el('lf-job-company'), el('lf-job-salary-min')].forEach(inp => { if (inp) inp.value = ''; });
        if (el('lf-model')) el('lf-model').innerHTML = '<option value="">Model</option>';
        window.filterByCategory('all');
    });

    el('searchInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { showListingPage(); applyFilters(); }
    });
    el('searchInput')?.addEventListener('input', function() { renderPopularSearches(); });
    el('searchInput')?.addEventListener('focus', function() { renderPopularSearches(); });
    function addTouchClick(elId, fn) {
        var elem = el(elId);
        if (!elem) return;
        elem.addEventListener('click', function(e) { e.preventDefault(); fn(); });
        elem.addEventListener('touchend', function(e) { e.preventDefault(); fn(); }, { passive: false });
    }
    addTouchClick('searchBtn', function() { showListingPage(); applyFilters(); });
    addTouchClick('logo-home', function() { showHomepage(); });

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

    function updateMobileCurrencyConverter() {
        var r = window.exchangeRates || { EUR: 1, MKD: 61.5, TRY: 50.933 };
        var amount = parseFloat(el('mobile-currency-amount')?.value) || 1;
        var mkdVal = (amount * (r.MKD || 61.5)).toFixed(2);
        var tryVal = (amount * (r.TRY || 35)).toFixed(2);
        var resEl = el('mobile-currency-result');
        if (resEl) resEl.innerHTML = amount + ' EUR = <strong>' + mkdVal + ' MKD</strong> = <strong>' + tryVal + ' TRY</strong>';
    }
    function openMobileMenu() {
        var overlay = el('mobile-menu-overlay');
        var btn = el('mobile-menu-btn');
        if (btn) btn.setAttribute('aria-expanded', 'true');
        if (overlay) { overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
        var rates = el('mobile-currency-rates');
        if (rates && window.exchangeRates) {
            var r = window.exchangeRates;
            var html = '';
            if (r.MKD) html += '<div class="mobile-rate-line">1 EUR = ' + (r.MKD || 61.5).toFixed(2) + ' MKD</div>';
            if (r.TRY) html += '<div class="mobile-rate-line">1 EUR = ' + (r.TRY || 35).toFixed(2) + ' TRY</div>';
            rates.innerHTML = html || '<span class="loading-rates">Yükleniyor...</span>';
        }
        updateMobileCurrencyConverter();
        el('mobile-currency-amount')?.removeEventListener('input', updateMobileCurrencyConverter);
        el('mobile-currency-amount')?.addEventListener('input', updateMobileCurrencyConverter);
    }
    function closeMobileMenu() {
        var btn = el('mobile-menu-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        var overlay = el('mobile-menu-overlay');
        if (overlay) { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
    }
    function handleMobileMenuOpen(e) { e.preventDefault(); e.stopPropagation(); openMobileMenu(); }
    function handleMobileMenuClose(e) { e.preventDefault(); e.stopPropagation(); closeMobileMenu(); }
    var mobileMenuBtn = el('mobile-menu-btn');
    var mobileMenuClose = el('mobile-menu-close');
    var mobileOverlay = el('mobile-menu-overlay');
    var mobileDrawer = el('mobile-menu-drawer');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', handleMobileMenuOpen);
        mobileMenuBtn.addEventListener('touchend', function(e) { e.preventDefault(); openMobileMenu(); }, { passive: false });
    }
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', handleMobileMenuClose);
        mobileMenuClose.addEventListener('touchend', function(e) { e.preventDefault(); closeMobileMenu(); }, { passive: false });
    }
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeMobileMenu();
        });
    }
    if (mobileDrawer) {
        mobileDrawer.addEventListener('click', function(e) { e.stopPropagation(); });
    }
    function mobileTap(elId, fn) {
        var elem = el(elId);
        if (!elem) return;
        function run(e) { e.preventDefault(); e.stopPropagation(); fn(); }
        elem.addEventListener('click', run);
        elem.addEventListener('touchend', function(e) { e.preventDefault(); fn(); }, { passive: false });
    }
    mobileTap('mobile-action-theme', function() {
        var isDark = document.body.classList.contains('dark-theme');
        applyTheme(!isDark);
    });
    el('mobile-action-theme')?.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); } });
    mobileTap('mobile-action-support', function() { closeMobileMenu(); (window.openSupportModal || function(){})(); });
    mobileTap('mobile-action-ilan', function() { closeMobileMenu(); if (!getCurrentUser()) { showToast(t('postAdRequired'), 'warning', 2000); (window.openLoginModal || function(){})(); return; } if (typeof resetAdForm === 'function') resetAdForm(); var m=el('ilan-modal'); if(m){ m.style.display='flex'; m.classList.add('active'); document.body.style.overflow='hidden'; } });
    mobileTap('mobile-action-login', function() { closeMobileMenu(); (window.openLoginModal || function(){})(); });
    mobileTap('mobile-action-profile', function() { closeMobileMenu(); if (typeof openProfilePage==='function') openProfilePage(); else (window.openProfilePage||function(){})(); });
    mobileTap('mobile-action-admin', function() { closeMobileMenu(); if (isAdmin()) (window.openAdminPage||function(){})(); });
    mobileTap('mobile-action-logout', function() { closeMobileMenu(); if (typeof logout==='function') logout(); });
    mobileTap('mobile-action-fav', function() { closeMobileMenu(); (window.openFavoritesPage||function(){})(); });
    mobileTap('mobile-action-messages', function() { closeMobileMenu(); (window.openMessagingModal||function(){})(); });
    mobileTap('mobile-action-notif', function() { closeMobileMenu(); (window.openMobileNotifModal||function(){})(); });
    mobileTap('mobile-push-prompt', function() {
        closeMobileMenu();
        if (typeof Notification === 'undefined') return;
        if (Notification.permission === 'granted') { showToast(t('notificationsAlreadyEnabled') || 'Bildirimler zaten açık', 'info', 2000); updateHeaderUI(); return; }
        Notification.requestPermission().then(function(p) {
            if (p === 'granted') {
                showToast(t('notificationsEnabled') || 'Bildirimler açıldı', 'success', 2000);
                updateHeaderUI();
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.ready.then(function(reg) {
                        if (reg.pushManager) {
                            try {
                                var vapidKey = window.VAPID_PUBLIC_KEY;
                                var keyU8 = null;
                                if (vapidKey) {
                                    try {
                                        var pad = '='.repeat((4 - vapidKey.length % 4) % 4);
                                        var b64 = (vapidKey + pad).replace(/-/g, '+').replace(/_/g, '/');
                                        var raw = atob(b64);
                                        keyU8 = new Uint8Array(raw.length);
                                        for (var i = 0; i < raw.length; i++) keyU8[i] = raw.charCodeAt(i);
                                    } catch(err) {}
                                }
                                reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyU8 }).then(function(sub) {
                                    if (window.API_BASE && window.AlsatAPI && sub) {
                                        try { fetch(window.API_BASE + '/api/push/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (window.AlsatAPI.getToken?.() || '') }, body: JSON.stringify(sub) }); } catch(e) {}
                                    }
                                }).catch(function() {});
                            } catch(e) {}
                        }
                    }).catch(function() {});
                }
            } else {
                showToast(t('notificationsDenied') || 'Bildirimler kapalı', 'info', 2000);
            }
            updateHeaderUI();
        });
    });
    el('mobile-notif-close')?.addEventListener('click', function() { (window.closeMobileNotifModal || function(){})(); });
    el('mobile-notif-modal')?.addEventListener('click', function(e) { if (e.target === this) (window.closeMobileNotifModal || function(){})(); });
    var mobileLang = el('mobile-lang-select');
    if (mobileLang) {
        mobileLang.value = window.currentLang;
        mobileLang.addEventListener('change', function() { updateLanguage(this.value); });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && el('mobile-menu-overlay')?.classList.contains('open')) closeMobileMenu();
        if (e.key === 'Escape' && el('mobile-notif-modal')?.style.display === 'flex') window.closeMobileNotifModal?.();
    });

    qsa('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modern-modal');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
                if (modal.id === 'login-modal' || modal.id === 'terms-modal') document.body.style.overflow = '';
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

    el('change-password-btn')?.addEventListener('click', async function() {
        const user = getCurrentUser();
        if (!user) { showToast('loginRequired', 'warning', 2000); return; }
        const oldPwd = (el('old-password')?.value || '').trim();
        const newPwd = (el('new-password')?.value || '').trim();
        const confirmPwd = (el('confirm-new-password')?.value || '').trim();
        if (!oldPwd) { showToast(t('enterPassword') || 'Mevcut şifrenizi girin', 'warning', 2000); return; }
        if (!newPwd || newPwd.length < 6) { showToast(t('passwordMin6') || 'Yeni şifre en az 6 karakter olmalı', 'warning', 2000); return; }
        if (newPwd !== confirmPwd) { showToast(t('passwordsMustMatch') || 'Şifreler eşleşmiyor', 'warning', 2000); return; }
        var base = window.API_BASE || (location.protocol + '//' + location.host);
        if (!base) { showToast('Bağlantı kurulamadı. Sayfayı yenileyin.', 'error', 2500); return; }
        try {
            if (window.AlsatAPI && window.AlsatAPI.changePassword) {
                await window.AlsatAPI.changePassword(oldPwd, newPwd);
            } else {
                var tok = localStorage.getItem('alsat_token');
                var r = await fetch(base + '/api/auth/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': (tok ? 'Bearer ' + tok : '') }, body: JSON.stringify({ currentPassword: oldPwd, newPassword: newPwd }) });
                var d = await r.json().catch(function(){ return {}; });
                if (!r.ok) throw new Error(d.error || r.statusText || 'Şifre değiştirilemedi');
            }
            el('old-password').value = el('new-password').value = el('confirm-new-password').value = '';
            showToast(t('passwordChanged') || 'Şifre başarıyla değiştirildi', 'success', 2500);
        } catch (err) {
            showToast(err?.error || err?.message || 'Şifre değiştirilemedi', 'error', 2500);
        }
    });

    el('delete-account-btn')?.addEventListener('click', function() {
        const user = getCurrentUser();
        if (!user) return;
        if (!confirm(t('deleteAccountConfirm') || 'Hesabınız kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?')) return;
        if (!confirm(t('deleteAccountConfirmLast') || 'Son kez onaylayın: Tüm verileriniz silinecek.')) return;
        sessionStorage.removeItem('alsat_currentUser');
        localStorage.removeItem('alsat_currentUser');
        if (window.API_BASE && window.AlsatAPI?.logout) window.AlsatAPI.logout();
        window.userSession = window.userSession || {};
        window.userSession.user = null;
        updateHeaderUI();
        showToast(t('accountDeleted') || 'Hesabınız silindi', 'info', 2000);
        if (typeof showHomepage === 'function') showHomepage();
    });

    const loadNotificationSettings = () => {
        const s = JSON.parse(localStorage.getItem('alsat_notifications') || '{"messages":true,"offers":true,"favorites":true,"showRecentlyViewed":true}');
        const nm = el('notify-messages'), no = el('notify-offers'), nf = el('notify-favorites'), nrv = el('show-recently-viewed');
        if (nm) nm.checked = s.messages;
        if (no) no.checked = s.offers;
        if (nf) nf.checked = s.favorites;
        if (nrv) nrv.checked = s.showRecentlyViewed !== false;
    };
    loadNotificationSettings();
    el('save-notifications-btn')?.addEventListener('click', function() {
        const s = {
            messages: el('notify-messages')?.checked ?? true,
            offers: el('notify-offers')?.checked ?? true,
            favorites: el('notify-favorites')?.checked ?? true,
            showRecentlyViewed: el('show-recently-viewed')?.checked !== false
        };
        localStorage.setItem('alsat_notifications', JSON.stringify(s));
        renderRecentlyViewed();
        showToast('saved', 'success', 1500);
    });

    // Payment options
    qsa('.payment-option').forEach(btn => {
        btn.addEventListener('click', function() {
            qsa('.payment-option').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            const amount = parseInt(this.dataset.amount) || 0;
            const bonus = parseInt(this.dataset.bonus) || ({ 5: 1, 10: 2, 20: 5, 50: 15 }[amount] || 0);
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

    window.ratingPhotoData = window.ratingPhotoData || [];
    function renderRatingPhotos() {
        const prev = el('rating-photo-preview');
        if (!prev) return;
        const data = window.ratingPhotoData || [];
        prev.innerHTML = data.map((src, i) => `<span class="rating-photo-thumb"><img src="${src}" alt=""><button type="button" class="rating-photo-rm" data-i="${i}" aria-label="Kaldır">&times;</button></span>`).join('');
        prev.querySelectorAll('.rating-photo-rm').forEach(btn => btn.onclick = () => { window.ratingPhotoData.splice(parseInt(btn.dataset.i), 1); renderRatingPhotos(); });
    }
    el('rating-photo-trigger')?.addEventListener('click', () => el('rating-photo-input')?.click());
    el('rating-photo-input')?.addEventListener('change', function() {
        const files = Array.from(this.files || []).slice(0, 3 - (window.ratingPhotoData || []).length);
        files.forEach(f => {
            if (!f.type.startsWith('image/') || (window.ratingPhotoData || []).length >= 3) return;
            const r = new FileReader();
            r.onload = () => {
                if ((window.ratingPhotoData || []).length >= 3) return;
                window.ratingPhotoData.push(r.result);
                renderRatingPhotos();
            };
            r.readAsDataURL(f);
        });
        this.value = '';
    });
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
            const photos = (window.ratingPhotoData || []).slice(0, 3);
            window.userRatings[ad.userId || 'anon'] = window.userRatings[ad.userId || 'anon'] || [];
            window.userRatings[ad.userId || 'anon'].push({ from: buyerId, stars: stars || 5, comment, photos, adId });
            localStorage.setItem('userRatings', JSON.stringify(window.userRatings));
        }
        showToast('ratingSent', 'success', 2000);
        window.closeRatingModal();
    });

    window.storeReviewPhotoData = window.storeReviewPhotoData || [];
    function renderStoreReviewPhotos() {
        const prev = el('store-review-photo-preview');
        if (!prev) return;
        const data = window.storeReviewPhotoData || [];
        prev.innerHTML = data.map((src, i) => `<span class="rating-photo-thumb"><img src="${src}" alt=""><button type="button" class="rating-photo-rm" data-i="${i}" aria-label="Kaldır">&times;</button></span>`).join('');
        prev.querySelectorAll('.rating-photo-rm').forEach(btn => btn.onclick = () => { window.storeReviewPhotoData.splice(parseInt(btn.dataset.i), 1); renderStoreReviewPhotos(); });
    }
    el('store-review-photo-trigger')?.addEventListener('click', () => el('store-review-photos')?.click());
    el('store-review-photos')?.addEventListener('change', function() {
        const files = Array.from(this.files || []).slice(0, 3 - (window.storeReviewPhotoData || []).length);
        files.forEach(f => {
            if (!f.type.startsWith('image/') || (window.storeReviewPhotoData || []).length >= 3) return;
            const r = new FileReader();
            r.onload = () => {
                if ((window.storeReviewPhotoData || []).length >= 3) return;
                window.storeReviewPhotoData.push(r.result);
                renderStoreReviewPhotos();
            };
            r.readAsDataURL(f);
        });
        this.value = '';
    });
    el('store-review-stars')?.addEventListener('click', function(e) {
        const star = e.target.closest('.star');
        if (!star) return;
        const val = parseInt(star.dataset.value);
        this.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('active', i < val));
    });
    el('store-review-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const storeId = parseInt(el('store-detail-page')?.dataset?.storeId);
        const user = getCurrentUser();
        if (!storeId || !user) return;
        if (!(window.storePurchases || []).some(p => p.storeId === storeId && p.userId === user.id)) {
            showToast(t('rateOnlyBuyer') || 'Sadece bu mağazadan alışveriş yapanlar yorum yapabilir.', 'warning', 2500);
            return;
        }
        const starsEl = el('store-review-stars');
        const actives = starsEl?.querySelectorAll('.star.active') || [];
        const stars = actives.length ? parseInt(actives[actives.length - 1]?.dataset?.value || 5) : 5;
        const comment = (el('store-review-comment')?.value || '').trim();
        const photos = (window.storeReviewPhotoData || []).slice(0, 3);
        window.storeReviews = window.storeReviews || [];
        window.storeReviews.push({ storeId, userId: user.id, userName: user.name || 'Kullanıcı', stars: stars || 5, comment, photos, createdAt: Date.now() });
        localStorage.setItem('alsat_store_reviews', JSON.stringify(window.storeReviews));
        const store = (window.storesDatabase || []).find(s => s.id === storeId);
        if (store) {
            const revs = (window.storeReviews || []).filter(r => r.storeId === storeId);
            store.rating = revs.reduce((a,r) => a + (r.stars||5), 0) / revs.length;
            store.reviewCount = revs.length;
            localStorage.setItem('alsat_stores', JSON.stringify(window.storesDatabase));
        }
        showToast('ratingSent', 'success', 2000);
        openStoreDetail(storeId);
    });

    el('product-qa-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const productId = parseInt(el('product-qa-product-id')?.value);
        const user = getCurrentUser();
        const prod = (window.storeProducts || []).find(p => p.id === productId);
        const store = prod ? (window.storesDatabase || []).find(s => s.id === prod.storeId) : null;
        if (!productId || !user || !store) return;
        const question = (el('product-qa-question')?.value || '').trim();
        if (!question) return;
        window.productQuestions = window.productQuestions || [];
        const qId = Date.now();
        window.productQuestions.push({ id: qId, productId, storeId: store.id, userId: user.id, userName: user.name || 'Kullanıcı', question, answer: null, createdAt: Date.now() });
        saveProductQuestions();
        if (store.ownerId) {
            const L = window.TRANSLATIONS?.[window.currentLang] || {};
            addNotification(store.ownerId, 'product_qa', L.storeQaNotifTitle || 'Yeni soru geldi', 'Ürün soruldu: "' + question.slice(0, 50) + (question.length > 50 ? '...' : '') + '"', { productId, storeId: store.id, questionId: qId });
        }
        el('product-qa-question').value = '';
        showToast(t('questionSent'), 'success', 2000);
        openProductDetail(productId);
    });
    el('store-qa-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const storeId = parseInt(el('store-detail-page')?.dataset?.storeId);
        const user = getCurrentUser();
        if (!storeId || !user) return;
        const question = (el('store-qa-question')?.value || '').trim();
        if (!question) return;
        window.storeQuestions = window.storeQuestions || [];
        const qId = Date.now();
        window.storeQuestions.push({ id: qId, storeId, userId: user.id, userName: user.name || 'Kullanıcı', question, answer: null, createdAt: Date.now() });
        localStorage.setItem('alsat_store_questions', JSON.stringify(window.storeQuestions));
        const store = (window.storesDatabase || []).find(s => s.id === storeId);
        if (store && store.ownerId) {
            const L = window.TRANSLATIONS?.[window.currentLang] || {};
            addNotification(store.ownerId, 'store_qa', L.storeQaNotifTitle || 'Yeni soru geldi', (L.storeQaNotifBody || 'Mağazanıza yeni bir soru soruldu: ') + '"' + question.slice(0, 50) + (question.length > 50 ? '...' : '') + '"', { storeId, questionId: qId });
            if (typeof updateNotifBadge === 'function') updateNotifBadge();
        }
        el('store-qa-question').value = '';
        showToast('ratingSent', 'success', 2000);
        openStoreDetail(storeId);
    });

    window.openCreateStoreModal = function() {
        const user = getCurrentUser();
        if (!user) { showToast('loginRequired','warning',2000); return; }
        el('create-store-name').value = '';
        el('create-store-address').value = '';
        el('create-store-phone').value = '';
        const citySel = el('create-store-city');
        if (citySel) citySel.innerHTML = '<option value="">' + (t('selectCity')||'Şehir Seçin') + '</option>' + (sehirListesi||[]).map(c => '<option value="'+c+'">'+(tCity(c)||c)+'</option>').join('');
        el('create-store-modal').style.display = 'flex';
    };
    window.closeCreateStoreModal = function() { el('create-store-modal').style.display = 'none'; };
    el('create-store-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = getCurrentUser();
        if (!user) return;
        const name = (el('create-store-name')?.value || '').trim();
        const city = el('create-store-city')?.value;
        const address = (el('create-store-address')?.value || '').trim();
        let phone = (el('create-store-phone')?.value || '').trim();
        if (phone && typeof toWhatsAppPhone === 'function') { const wa = toWhatsAppPhone(phone); if (wa) phone = '+' + wa; }
        if (!name || !city) { showToast('invalidAmount','warning',2000); return; }
        window.storesDatabase = window.storesDatabase || [];
        const newId = Math.max(0, ...window.storesDatabase.map(s => s.id)) + 1;
        const store = { id: newId, name, ownerId: user.id, city, address, phone, logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200', cover: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', rating: 0, reviewCount: 0 };
        window.storesDatabase.push(store);
        localStorage.setItem('alsat_stores', JSON.stringify(window.storesDatabase));
        window.closeCreateStoreModal();
        showToast('adPublished', 'success', 2000);
        openStoreDetail(newId);
    });

    window.openSellerApplicationPage = function() {
        document.querySelectorAll('.profile-page-container').forEach(p => p.style.display = 'none');
        const page = el('seller-application-page');
        if (!page) return;
        page.style.display = 'block';
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        el('seller-company').value = '';
        el('seller-phone').value = '';
        el('seller-email').value = '';
        el('seller-category').value = '';
        el('seller-company-type').value = '';
        el('seller-company-sub').value = '';
        el('seller-ref').value = '';
        el('seller-tax-id').value = '';
        el('seller-district').value = '';
        el('seller-terms').checked = false;
        el('seller-category-display').textContent = t('selectCategoryLabel');
        el('seller-category-dropdown').style.display = 'none';
        el('seller-category-error').style.display = 'none';
        const distSel = el('seller-district');
        if (distSel && typeof sehirListesi !== 'undefined') distSel.innerHTML = '<option value="">Seçim yapınız</option>' + sehirListesi.map(c => '<option value="'+c+'">'+(tCity(c)||c)+'</option>').join('');
    };
    el('seller-app-back')?.addEventListener('click', function() {
        el('seller-application-page').style.display = 'none';
        el('stores-page').style.display = 'block';
        window.scrollTo(0, 0);
    });
    el('seller-category-trigger')?.addEventListener('click', function(e) {
        e.stopPropagation();
        const dd = el('seller-category-dropdown');
        dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
        el('seller-category-error').style.display = 'none';
    });
    document.addEventListener('click', function(e) { if (!e.target.closest('#seller-category-trigger') && !e.target.closest('#seller-category-dropdown')) el('seller-category-dropdown').style.display = 'none'; });
    el('seller-category-dropdown')?.addEventListener('click', function(e) {
        e.stopPropagation();
        const opt = e.target.closest('.seller-cat-opt');
        if (!opt) return;
        const val = opt.dataset.val;
        const sel = el('seller-category');
        if (sel) sel.value = val;
        el('seller-category-display').textContent = opt.textContent;
        el('seller-category-dropdown').style.display = 'none';
        el('seller-category-error').style.display = 'none';
    });
    el('seller-application-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const company = (el('seller-company')?.value || '').trim();
        const phone = (el('seller-phone')?.value || '').trim();
        const email = (el('seller-email')?.value || '').trim();
        const category = el('seller-category')?.value;
        const companyType = el('seller-company-type')?.value;
        const terms = el('seller-terms')?.checked;
        const catError = el('seller-category-error');
        if (!category) {
            if (catError) { catError.style.display = 'block'; el('seller-category-trigger')?.classList.add('has-error'); }
            return;
        }
        if (catError) catError.style.display = 'none';
        el('seller-category-trigger')?.classList.remove('has-error');
        if (!company || !phone || !email || !companyType || !terms) return;
        const ref = (el('seller-ref')?.value || '').trim();
        const taxId = (el('seller-tax-id')?.value || '').trim();
        const district = el('seller-district')?.value || '';
        window.sellerApplications = window.sellerApplications || [];
        const app = { id: Date.now(), company, phone, email, category, companyType, ref, taxId, district, status: 'pending', createdAt: new Date().toISOString() };
        window.sellerApplications.push(app);
        saveSellerApplications();
        el('seller-application-page').style.display = 'none';
        el('stores-page').style.display = 'block';
        const badge = el('admin-seller-apps-badge');
        if (badge) badge.textContent = window.sellerApplications.filter(a => a.status === 'pending').length;
        showToast(t('applicationReceived'), 'success', 4000);
    });

    window.openAddStoreProductModal = function(storeId) {
        const user = getCurrentUser();
        const store = (window.storesDatabase||[]).find(s => s.id === storeId);
        if (!user || !store || store.ownerId !== user.id) { showToast('loginRequired','warning',2000); return; }
        el('add-product-store-id').value = storeId;
        el('add-product-title').value = '';
        el('add-product-price').value = '';
        el('add-product-category').value = '';
        el('add-product-fit').value = '';
        el('add-product-collarType').value = '';
        el('add-product-material').value = '';
        el('add-product-pattern').value = '';
        el('add-product-color').value = '';
        el('add-product-size').value = '';
        el('add-product-image').value = '';
        el('add-store-product-modal').style.display = 'flex';
    };
    window.closeAddStoreProductModal = function() { el('add-store-product-modal').style.display = 'none'; };
    el('add-store-product-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const storeId = parseInt(el('add-product-store-id')?.value);
        const user = getCurrentUser();
        const store = (window.storesDatabase||[]).find(s => s.id === storeId);
        if (!user || !store || store.ownerId !== user.id) return;
        const title = (el('add-product-title')?.value || '').trim();
        const price = parseFloat(el('add-product-price')?.value) || 0;
        const category = (el('add-product-category')?.value || '').trim();
        const image = (el('add-product-image')?.value || '').trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300';
        const fit = (el('add-product-fit')?.value || '').trim();
        const collarType = (el('add-product-collarType')?.value || '').trim();
        const material = (el('add-product-material')?.value || '').trim();
        const pattern = (el('add-product-pattern')?.value || '').trim();
        const color = (el('add-product-color')?.value || '').trim();
        const size = (el('add-product-size')?.value || '').trim();
        if (!title || !material || !color) { showToast(t('materialColorRequired'), 'warning', 3000); return; }
        window.storeProducts = window.storeProducts || [];
        const newId = Math.max(0, ...window.storeProducts.map(p => p.id)) + 1;
        const product = { id: newId, storeId, title, price, image, category: category || 'Genel', fit: fit || undefined, collarType: collarType || undefined, material, pattern: pattern || undefined, color, size: size || undefined };
        window.storeProducts.push(product);
        localStorage.setItem('alsat_store_products', JSON.stringify(window.storeProducts));
        window.closeAddStoreProductModal();
        showToast('adPublished', 'success', 2000);
        openStoreDetail(storeId);
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
    } catch (err) {
        console.error('Alsat init error:', err);
    }
});
