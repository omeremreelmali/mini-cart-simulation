Mini Sepet Simulasyonu (React Native Cli)

### 1. Projeyi İndirin

```bash
git clone https://github.com/omeremreelmali/mini-cart-simulation.git
cd mini-cart-simulation
```

### 2. Paketleri Kurun (Npm veya Yarn Kullanabilirsiniz.)

```bash
npm install
yarn install
```

### 3. iOS

```bash
cd ios
pod install
cd ..
```

### 4. Uygulamayı Başlatın

**Metro bundler'ı Başlatın:**

```bash
npm run start --reset-cache
```

**Android için:**

```bash
npm run android
```

**iOS için:**

```bash
npm run ios
```

Veya Android Studio / XCode üzerinden de çalıştırabilirsiniz.

## Ekranlar

1. Ana Sayfa - Hoşgeldiniz Sayfası
2. Ürün Detayı - Ürün bilgileri ve sepete ekleme
3. Ürün Liste - Sepetteki ürünler ve toplam tutar
4. Sepet - Sepetteki ürünler ve toplam tutar

## Kullanılan Teknolojiler

- React Native
- TypeScript
- Redux Toolkit
- React Navigation
- Axios
- TailwindCSS (NativeWind)
- Lucide Icons
