# Windows Kurulum Rehberi

## Node.js v24 ile better-sqlite3 Hatası

`better-sqlite3` native modül derlemesi gerektirir. Node.js v24 için hazır binary yoktur.

### Çözüm: Node.js LTS (v20) Kullanın

1. **Node.js v24'ü kaldırın**
   - Ayarlar → Uygulamalar → Node.js → Kaldır

2. **Node.js v20 LTS indirin**
   - https://nodejs.org/en/download
   - **LTS (v20.x)** sürümünü seçin (v24 değil!)
   - .msi dosyasını indirip kurun

3. **Terminali kapatıp yeniden açın**, sonra:

```bash
cd C:\Users\bayar\Desktop\alsat\backend

# Eski node_modules varsa silin
rmdir /s /q node_modules

npm install
npm run dev
```

### Alternatif: Visual Studio Build Tools (Node v24 ile devam)

Node v24 kullanmaya devam etmek isterseniz:

1. https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. "Build Tools for Visual Studio" indirin
3. Kurulumda **"Desktop development with C++"** seçin
4. Kurulum bitince terminali yeniden açın
5. `npm install` tekrar çalıştırın
