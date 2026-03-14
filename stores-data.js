/**
 * Alsat Store - Trendyol tarzı (500 ürün, fotoğraflı yorumlar)
 */
(function() {
    const stored = localStorage.getItem('alsat_stores');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            parsed.forEach(s => { delete s.city; delete s.address; if (!s.name) s.name = 'Mağaza'; });
            window.storesDatabase = parsed;
        } catch (e) {
            window.storesDatabase = [];
        }
    } else {
        window.storesDatabase = [
            { id: 1, name: "KOTON", brandId: "koton", logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200", cover: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800", rating: 4.5, reviewCount: 12420, followers: 128000, verified: true, freeShipping: true },
            { id: 2, name: "DİLVİN", brandId: "dilvin", logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200", cover: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800", rating: 4.2, reviewCount: 8540, followers: 98000, verified: true, freeShipping: false },
            { id: 3, name: "Karaca Home", brandId: "karaca", logo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200", cover: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800", rating: 4.8, reviewCount: 15200, followers: 210000, verified: true, freeShipping: true },
            { id: 4, name: "H&M", brandId: "hm", logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200", cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800", rating: 4.4, reviewCount: 45000, verified: true, freeShipping: true },
            { id: 5, name: "L'ORÉAL", brandId: "loreal", logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200", cover: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800", rating: 4.6, reviewCount: 28900, verified: true, freeShipping: true },
            { id: 6, name: "flormar", brandId: "flormar", logo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200", cover: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800", rating: 4.3, reviewCount: 12500, verified: true },
            { id: 7, name: "OYSHO", brandId: "oysho", logo: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200", cover: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800", rating: 4.7, freeShipping: true },
            { id: 8, name: "BETTY & SAM", brandId: "betty", logo: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200", cover: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800", rating: 4.5, verified: true },
            { id: 9, name: "MANGO", brandId: "mango", logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200", cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800", rating: 4.6, reviewCount: 32000, freeShipping: true },
            { id: 10, name: "DeFacto", brandId: "defacto", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200", cover: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800", rating: 4.4 }
        ];
        localStorage.setItem('alsat_stores', JSON.stringify(window.storesDatabase));
    }
})();

window.storeCategories = [
    { id: "kadin", name: "Kadın" },
    { id: "erkek", name: "Erkek" },
    { id: "anne-cocuk", name: "Anne & Çocuk" },
    { id: "ev-yasam", name: "Ev & Yaşam" },
    { id: "supermarket", name: "Süpermarket" },
    { id: "kozmetik", name: "Kozmetik" },
    { id: "ayakkabi-canta", name: "Ayakkabı & Çanta" },
    { id: "elektronik", name: "Elektronik" },
    { id: "saat-aksesuar", name: "Saat & Aksesuar" },
    { id: "spor", name: "Spor & Outdoor" }
];

window.storeCampaigns = [
    { id: 1, brandId: 1, title: "%50'ye varan indirim", dates: "10 Mart - 31 Aralık", bg: "#e8d5d5", popular: true },
    { id: 2, brandId: 2, title: "Sepette %25 indirim", dates: "11 - 17 Mart", bg: "#d5d0e8", popular: true },
    { id: 3, brandId: 3, title: "2 al 1 öde", dates: "10 - 24 Mart", bg: "#d8d5e8", popular: true },
    { id: 4, brandId: 4, title: "Giyimde Sezonun Trendleri", dates: "10 Mart - 31 Nisan", bg: "#d0d8e8" },
    { id: 5, brandId: 5, title: "1200 TL'ye %20 İndirim", dates: "12 - 28 Mart", bg: "#e8d5df", popular: true },
    { id: 6, brandId: 6, title: "900 TL'ye 300 TL İndirim", dates: "12 - 28 Mart", bg: "#e8ddd5", popular: true },
    { id: 7, brandId: 7, title: "4 al 3 öde", dates: "10-24 Mart", bg: "#d5e8e0" },
    { id: 8, brandId: 8, title: "%30'a varan indirim", dates: "11-31 Mart", bg: "#e8e0d5" },
    { id: 9, brandId: 9, title: "Yeni Sezon Koleksiyonu", dates: "1-30 Mart", bg: "#d5e0e8", popular: true },
    { id: 10, brandId: 10, title: "Tüm Ürünlerde %40", dates: "15-25 Mart", bg: "#e8e5d5" }
];

(function() {
    const stored = localStorage.getItem('alsat_store_products');
    let useStored = false;
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (parsed.length >= 500) {
                parsed.forEach(p => { delete p.city; });
                window.storeProducts = parsed;
                useStored = true;
            }
        } catch (e) {}
    }
    if (!useStored) {
        window.storeProducts = initStoreProducts();
        try { localStorage.setItem('alsat_store_products', JSON.stringify(window.storeProducts)); } catch(e){}
    }
    window.initStoreProducts = initStoreProducts;
    function initStoreProducts() {
        const imgs = [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300", "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300",
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300", "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300",
            "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300", "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=300",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300", "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300",
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300", "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300", "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300", "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=300",
            "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300", "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300",
            "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300",
            "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=300", "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300",
            "https://images.unsplash.com/photo-1504384764586-bb4cdc1701b0?w=300", "https://images.unsplash.com/photo-1486485764572-92b96f21882a?w=300",
            "https://images.unsplash.com/photo-1491553895911-0055eb640129?w=300", "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300"
        ];
        const titles = [
            "Bluetooth Kulaklık Pro","Mekanik Klavye RGB","Akıllı Saat","Deri Ceket","Spor Ayakkabı","Kablosuz Mouse","Parfüm Floral 50 ml","Vücut Spreyi 200 ml",
            "Cilt Bakım Kremi","Ruj Seti 4'lü","Makyaj Paleti","Bebek Body Seti","Çocuk Ayakkabısı","Ev Tekstili Set","Yastık Kılıfı Çift","Mutfak Seti",
            "Günlük Çanta","Kol Saati","Spor Eşofman","Yoga Matı","Vitamin D3 60 Tablet","Coconut Mix 250 ml","Vücut Spreyi","Kadın Parfüm","Kadın Bluz",
            "Erkek Gömlek","Çocuk Mont","Yorgan 200x220","Bulaşık Deterjanı 5L","Laptop Stand","Tablet Kılıfı","Telefon Tutucu","Powerbank 20000mAh",
            "Kadın Elbise","Erkek Ceket","Bebek Bezi","Çamaşır Suyu","Çorap 5'li","Sırt Çantası","Güneş Gözlüğü","Spor Forması","Koşu Ayakkabısı",
            "Nemlendirici Krem","Mascarа","Fondöten","Saç Boyası","Şampuan 400ml","Deodorant","Diş Macunu","Duş Jeli","Yüz Temizleyici",
            "Laptop 15.6","Kablosuz Kulaklık","Mouse Pad","Webcam HD","Hoparlör","Şarj Kablosu","Kasa","Monitör 24","Klavye Mekanik",
            "Bisiklet","Tenis Raketi","Fitness Eldiveni","Pilates Topu","Dambıl Seti","Koşu Bandı","Spor Çantası","Suyu Matarası",
            "Bebek Arabası","Biberon Seti","Mama Önlüğü","Oyuncak Bebek","Puzzle 100 Parça","Boyama Kitabı","Çocuk Çantası","Okul Seti",
            "Yemek Takımı","Bardak Seti","Tencere 3'lü","Fritöz","Blender","Tost Makinesi","Çay Makinesi","Kahve Makinesi"
        ];
        const cats = ["Kadın","Erkek","Anne & Çocuk","Ev & Yaşam","Süpermarket","Kozmetik","Ayakkabı","Elektronik","Aksesuar","Spor"];
        const products = [];
        const mods = [" Premium"," X"," Pro"," Max"," Classic"," New"," 2024"," Limited"," Set"," Pack"];
        for (let i = 0; i < 500; i++) {
            const storeId = (i % 10) + 1;
            const price = Math.round(19 + Math.random() * 980);
            const hasDisc = Math.random() > 0.35;
            const orig = hasDisc ? Math.round(price * (1.15 + Math.random() * 0.6)) : null;
            const pct = orig ? Math.round(100 * (1 - price/orig)) : 0;
            const t = titles[i % titles.length] + mods[i % mods.length] + (i > 50 ? " " + (i % 20 + 1) : "");
            products.push({
                id: i + 1,
                storeId,
                title: t,
                price,
                originalPrice: orig,
                discountPercent: pct,
                image: imgs[i % imgs.length],
                category: cats[i % cats.length],
                rating: (3.2 + Math.random() * 1.8).toFixed(1),
                reviewCount: Math.floor(Math.random() * 25000) + 80,
                freeShipping: Math.random() > 0.45,
                bestSeller: Math.random() > 0.8,
                goodPrice: Math.random() > 0.65,
                favoritedCount: Math.floor(Math.random() * 15000) + 30
            });
        }
        return products;
    }
})();

(function() {
    const stored = localStorage.getItem('alsat_store_reviews');
    let reviews = [];
    try { reviews = stored ? JSON.parse(stored) : []; } catch (e) {}
    if (reviews.length < 100) {
        const reviewPhotos = [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200", "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200"
        ];
        const comments = [
            "Çok kaliteli, beğendim. Hızlı kargo.", "Ürün fotoğraftaki gibi. Tavsiye ederim.", "Fiyatına göre çok iyi.",
            "İkinci kez aldım, memnunum.", "Paketleme özenliydi.", "Hızlı teslimat, teşekkürler.",
            "Ürün çok güzel, kalitesi yerinde.", "Beklentimi karşıladı.", "Çok memnun kaldım, tekrar alacağım."
        ];
        const names = ["Ayşe K.", "Mehmet Y.", "Elif S.", "Can D.", "Zeynep A.", "Burak M.", "Selin T.", "Emre Ö.", "Deniz K.", "Pınar L."];
        for (let s = 1; s <= 10; s++) {
            for (let r = 0; r < 12; r++) {
                const hasPhoto = Math.random() > 0.5;
                reviews.push({
                    id: s * 100 + r,
                    storeId: s,
                    userId: r + 1,
                    userName: names[(s + r) % names.length],
                    stars: Math.floor(Math.random() * 2) + 4,
                    comment: comments[(s + r) % comments.length],
                    photos: hasPhoto ? [reviewPhotos[(s + r) % reviewPhotos.length], reviewPhotos[(s + r + 1) % reviewPhotos.length]].filter((_,i)=>i<1+Math.floor(Math.random()*2)) : []
                });
            }
        }
        window.storeReviews = reviews;
        localStorage.setItem('alsat_store_reviews', JSON.stringify(reviews));
    } else {
        window.storeReviews = reviews;
    }
})();

window.storePurchases = JSON.parse(localStorage.getItem('alsat_store_purchases') || '[]');
window.storeQuestions = JSON.parse(localStorage.getItem('alsat_store_questions') || '[]');
