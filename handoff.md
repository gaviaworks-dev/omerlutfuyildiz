# Devir notu — omerlutfuyildiz

Son güncelleme: 6 Ağustos 2026 · Faz 12 (açık palet revizyonu)

Bu dosya oturum devri içindir. Kalıcı kurallar `CLAUDE.md`'de, görsel kaynak
kaydı `assets/img/CREDITS.md`'de. Burada **durum, gerekçeler ve tuzaklar** var.

---

## 1. Durum: yayında ve tamamlanmış

**Canlı:** https://gaviaworks-dev.github.io/omerlutfuyildiz/
**Repo:** `gaviaworks-dev/omerlutfuyildiz` (public) · Pages: `main` / root

Tek sayfa (`index.html`) + üç yasal sayfa. Faz 0–12 bitti.

| Sayfa | Durum |
|---|---|
| `index.html` | Hero · Hakkımda · Tedaviler (slider) · Klinik · Tedavi Süreci · Randevu CTA · İletişim |
| `kvkk.html` · `gizlilik-politikasi.html` · `cerez-politikasi.html` | Yasal metinler, kendi fotoğraflı banner'ları |

**Varlıklar:** 37 WebP (~932 KB, 3'ü Faz 12'den beri kullanılmıyor),
4 woff2 (88 KB), `main.css` 39.4 KB, `main.js` 10.6 KB (gzip 3.2 KB),
`tokens.css` 8.4 KB.

---

## 2. Mimarinin anlaşılması gereken tek yeri

**Faz 12'de site tamamen açığa çekildi.** Kömür siyahı ve türevleri paletten
silindi, koyu bölüm kalmadı. Bu yüzden yüzeye göre değişen lokal token
katmanı (`--surface-*`, `--header-fg`, `--header-rule`) de kaldırıldı —
bileşenler doğrudan `--color-*` okuyor.

Sitede **iki zemin tonu** var: `--color-bg` (#ffffff) ve `--color-bg-alt`
(#f5f5f5). Bölümler dönüşümlü:

```
header alt · hero (fotoğraf) · Hakkımda alt · Tedaviler bg · Klinik alt
Tedavi Süreci bg · Randevu CTA alt · İletişim bg · footer alt
```

**Yeni bir bölüm eklerken:** komşusunun tersini ver — `.section--bg` ya da
`.section--bg-alt`. Başka zemin sınıfı yok, üretilmesi de istenmiyor.

**Koyu yüzey yalnızca fotoğraf üstünde:** hero ve yasal sayfa banner'ı.
İkisinin de overlay tabanı siyah değil nötr koyu gri (42 45 50) — sayfanın
kendi metin tonu. Gerçek pikseller üzerinde ölçüldü: hero beyaz 8.52:1 /
%72 muted 5.36:1, banner beyaz 6.63:1 / %86 eyebrow 5.43:1.

---

## 3. Pazarlık dışı kurallar (ihlal edilirse iş geri döner)

1. **Turkuaz `#10afa0` metin, metin zemini ya da durum göstergesi değildir** —
   beyaz üstünde 2.74:1, açık gri üstünde 2.51:1. Koyu zemin kalmadığı için
   artık hiçbir yerde metin olamaz. Metin/odak/durum gerekiyorsa
   `--color-primary-text` (#0b7c71). `#10afa0` yalnızca dekoratif dolgu:
   eyebrow çizgisi, kart ikonu, madde imi, hover vurgusu, footer ayracı.
2. **`main.css` içinde ham hex / ham spacing px / inline style yok.**
   İzinli tek istisna: 1–3px çizim ölçüsü (hairline, odak halkası kalınlığı).
3. **`index.html` içinde açıklama/durum/TODO yorumu yok** — kaynak public.
   Takip `CLAUDE.md` "Açık işler" ve `CREDITS.md`.
4. **Görsel:** kadın yok, yüz gören insan yok, el yok, öncesi/sonrası yok,
   hasta ağzı yok. Stok yalnızca Unsplash + Pexels. Her dosya `CREDITS.md`'ye.
5. **`git add -A` / `git add .` yasak.** Ayrı concern = ayrı commit.
6. **`robots: noindex` kalacak** — gerçek alan adına taşınana kadar. Aksi
   halde omerlutfuyildiz.com ile duplicate content çakışır.

---

## 4. Test ve doğrulama — tuzaklar

Bu ortamda ölçüm araçları defalarca yalan söyledi. Zaman kaybetmemek için:

| Tuzak | Gerçek | Çözüm |
|---|---|---|
| Chrome headless `--window-size=390` | **500px'in altına inmiyor**, 500'de render edip küçültüyor. 390 ekran görüntüsü sahte "kesik" gösteriyor | Bu ortamda `npx playwright` (1.62, chromium kurulu) 360/390'da doğru render ediyor — iframe hilesine gerek yok |
| `scrollWidth <= clientWidth` taşma testi | `overflow-x: clip` taşmayı **gizler**, scrollWidth hep clientWidth'e eşit çıkar | Eleman bazlı: `getBoundingClientRect().right > clientWidth` |
| `--virtual-time-budget` + `--dump-dom` | Hero'daki sonsuz CSS animasyonu virtual-time'ı bitirmiyor, Chrome **takılıyor** | Süreci arka planda başlat, süre dolunca öldür (`shot.py` deseni) |
| iframe içinde JS davranış testi | iframe render edilmiyor: `scrollTo` çalışmıyor, IntersectionObserver tetiklenmiyor, geçişler ilerlemiyor | Davranışı iframe'de test etme; düzen ölçümü iframe'de doğru |
| `data-reveal` bölümleri ekran görüntüsünde boş | Reveal IO ile açılıyor, görüntü load anında alınıyor | Playwright'ta `reducedMotion: 'reduce'` context'i ile çek |
| headless `localStorage` | Süreç öldürülünce diske yazılmıyor, iki aşamalı test çalışmıyor | Bu yolla test etme |
| `git add -p` | Etkileşimli, bu ortamda yok | Ara dosya durumu kur: `git show HEAD:dosya` ile eski hâli al, splice et, commit et, tam hâli geri yaz |
| `timeout` komutu | macOS'ta yok | Python `subprocess` + manuel kill |

**Taşma testi ölçütü:** 4 sayfa × 6 kırılım (1440/1280/1024/768/390/360) =
**24/24 taşan eleman sıfır**. Slider şeridinin *içi* kaydırılabilir olduğu
için taşma sayılmaz — prob bunu `closest('[data-slider-track]')` ile eler.

---

## 5. Deploy

```
git push origin main          # Actions workflow kendiliğinden çalışır
```

**`gh api -X POST .../pages/builds` ÇAĞIRMA.** Legacy build tetikliyor ve
çalışmakta olan Actions workflow'unu iptal ettiriyor ("Deployment
cancelled"). Bir kez bu yüzden build hata verdi. Takılırsa:
`gh run rerun <id>`.

Build 1–8 dakika sürebilir. Doğrulama: dört sayfa 200, yeni varlıklar 200,
silinen varlıklar 404.

---

## 6. Açık işler — müşteriden gelecekler

`CLAUDE.md` "Açık işler" bölümünde tam liste. Özet:

| # | Konu | Etki |
|---|---|---|
| 1 | **Hero + 5 tedavi kartı + CTA görseli stok** (18 dosya "GEÇİCİ") | Aynı dosya adlarıyla değiştirilirse HTML'de değişiklik gerekmez |
| 2 | **Logo dosyası** yok | Şimdilik tipografik yazmarka (Poppins, "Yıldız" turkuaz) |
| 3 | **Şirket künyesi** — ticaret unvanı, VKN, MERSİS, KEP | `kvkk.html`'de tek tabloda `—`; diğer iki sayfa oraya link veriyor |
| 4 | **Yasal metinler hukukçu onayından geçmedi** | Yayına almadan önce avukat incelemesi şart |
| 5 | **Akordeon metinleri** kaynaksız, prosedürel | Hekim onayı bekliyor |
| 6 | **Çalışma saatleri** yok | İletişim'e konmadı |
| 7 | **Sosyal medya** doğrulanmadı | Eski sitedeki 4 ikonun href'i boştu |
| 8 | **İletişim formu yok** | `email.php` Pages'te çalışmaz; harici servis onay ister |

Klinik galerisi, Hakkımda, Tedavi Süreci görselleri ve yasal sayfa
banner'ları **müşterinin kendi fotoğrafları** — kalıcı, değişmesi
gerekmiyor.

---

## 7. Bilinen ödünler

- **JS 10.7 KB (ham), bütçe 8 KB'di.** Çerez bildirimi ve slider sonradan
  istendi. Sığdırmanın yolu scrollspy'ı (`aria-current`) silmek ya da
  yorumları boşaltmaktı; ikisi de çalışan bir şeyi feda ediyordu. Kütüphane
  kullanılmadı, kaydırma tamamen CSS. **Gzip'li 3.1 KB** — bütçenin gzip
  üzerinden tanımlanması öneriliyor.
- **Üç görsel kullanılmıyor** (`cta-treatment-room-*`). Faz 12'de CTA bandı
  fotoğrafsız kurgulandı. Dosyalar silinmedi; bant tekrar fotoğraflı
  istenirse hazırlar.
- **Hero görseli export'ta karartıldı** (0.45). Overlay'i ağırlaştırmak
  fotoğrafı tamamen yutuyordu. Alfaları düşürecek olan, karartmayı da
  birlikte gözden geçirmeli — ikisi tek sistem.
- **Başlık ve gövde metni aynı renkte** (#2a2d32). Siyah kalktığı için
  başlığa ayrı bir koyu ton kalmadı; hiyerarşi punto ve Poppins 600 ile.

`CLAUDE.md` sonunda `KARAR:` satırları var, her biri gerekçesi ve
"gözden geçirilecek mi" notuyla. Faz 12'nin kararları listenin başında.

---

## 8. Yerel geliştirme

```
python3 -m http.server 8091     # → http://localhost:8091
```

Kaynak JPG'ler `img-src/` altında, `.gitignore`'da. Yalnızca WebP yayınlanır.
Alt çizgiyle başlayan kök dosyalar (`_*`) ölçüm aracıdır, `.gitignore`'da,
repoya girmez — deploy öncesi silinir.

Referans: `github.com/gaviaworks-dev/drsaka` — yerleşim ve disiplin örneği.
Rengi, metni, görseli, klinik bilgisi **bu projeye girmez**.
