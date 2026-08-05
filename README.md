# omerlutfuyildiz

Dt. Ömer Lütfü Yıldız — Ataköy / İstanbul. Statik tek sayfa kurumsal site.

Mevcut sitenin (omerlutfuyildiz.com) yeniden tasarımı. Turkuaz marka kimliği
(`#10afa0`) korundu; yerleşim ve erişilebilirlik disiplini yeniden kuruldu.

## Teknoloji

Saf HTML + CSS + vanilla JS. Build step yok, npm yok, framework yok,
CDN bağımlılığı yok. Fontlar self-host woff2, görseller WebP.

```
index.html
assets/css/tokens.css     tek renk / ölçü / tipografi kaynağı
assets/css/main.css       düzen ve bileşen stilleri
assets/js/main.js         header, mobil menü, akordeon, reveal
assets/fonts/*.woff2      Poppins (başlık), Nunito (gövde)
assets/img/*.webp         görseller
assets/img/CREDITS.md     görsel kaynak / lisans / durum kaydı
.nojekyll
```

## Yerel geliştirme

```
python3 -m http.server 8091
```

→ http://localhost:8091

## Deploy

GitHub Pages — `main` dalı, kök dizin, kökte `.nojekyll`.
Yayın adresi: https://gaviaworks-dev.github.io/omerlutfuyildiz/

Tüm iç yollar göreli olduğu için alt dizin URL'inde de çalışır.

## Çalışma kuralları

Proje disiplini, palet, altın kurallar ve açık işler `CLAUDE.md` içinde.
