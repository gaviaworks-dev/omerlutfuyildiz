# Devir notu — omerlutfuyildiz

Son güncelleme: 6 Ağustos 2026 · Son commit: `753576e`

Bu dosya oturum devri içindir. Kalıcı kurallar `CLAUDE.md`'de, görsel kaynak
kaydı `assets/img/CREDITS.md`'de. Burada **durum, gerekçeler ve tuzaklar** var.

---

## 1. Durum: yayında ve tamamlanmış

**Canlı:** https://gaviaworks-dev.github.io/omerlutfuyildiz/
**Repo:** `gaviaworks-dev/omerlutfuyildiz` (public) · Pages: `main` / root

Tek sayfa (`index.html`) + üç yasal sayfa. 29 commit. Faz 0–11 bitti.

| Sayfa | Durum |
|---|---|
| `index.html` | Hero · Hakkımda · Tedaviler (slider) · Klinik · Tedavi Süreci · Randevu CTA · İletişim |
| `kvkk.html` · `gizlilik-politikasi.html` · `cerez-politikasi.html` | Yasal metinler, kendi banner'ları |

**Varlıklar:** 37 WebP (~956 KB), 4 woff2 (88 KB), `main.css` 44 KB,
`main.js` 10.7 KB (gzip 3.1 KB), `tokens.css` 8.6 KB.

---

## 2. Mimarinin anlaşılması gereken tek yeri

Renk, yüzeye göre **lokal custom property** ile değişir — bileşen kuralları
iki kez yazılmaz. `body` açık zemin varsayılanlarını kurar:

```
--surface-fg  --surface-heading  --surface-line
--surface-card  --surface-icon  --surface-accent
```

`.section--dark` bunları koyu değerlerle ezer. Header aynı deseni
`--header-fg` / `--header-rule` ile kullanır.

**Yeni bir bölüm eklerken:** `.section--dark` ya da `--light/--surface/--alt`
sınıfını ver, bileşenin rengini `var(--surface-*)` üzerinden oku. Koyu ve
açık için ayrı kural yazma ihtiyacı duyuyorsan desen yanlış kurulmuştur.

**Koyu:** header, hero, Hakkımda, Tedavi Süreci, Randevu CTA, footer, çerez.
**Açık:** Tedaviler, Klinik, İletişim, yasal sayfa gövdeleri.
Gerekçe: klinik fotoğrafları açık ve altın tonlu, koyu zeminde delik gibi
duruyor; uzun hukuki metin açık zeminde daha okunaklı.

---

## 3. Pazarlık dışı kurallar (ihlal edilirse iş geri döner)

1. **Turkuaz `#10afa0` açık zeminde metin ya da metin zemini değildir** —
   beyaz üstünde 2.74:1. Koyu zeminde 6.55:1, orada metin olabilir.
   Açık zeminde turkuaz metin gerekirse `--color-primary-text` (#0b7c71).
   Turkuaz artık sadece: aktif nav çizgisi, odak halkası, akordeon `+`,
   hover vurgusu, eyebrow çizgisi.
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
| Chrome headless `--window-size=390` | **500px'in altına inmiyor**, 500'de render edip küçültüyor. 390 ekran görüntüsü sahte "kesik" gösteriyor | Dar genişlik için `<iframe width="390">` içeren geçici çerçeve sayfası |
| `scrollWidth <= clientWidth` taşma testi | `overflow-x: clip` taşmayı **gizler**, scrollWidth hep clientWidth'e eşit çıkar | Eleman bazlı: `getBoundingClientRect().right > clientWidth` |
| `--virtual-time-budget` + `--dump-dom` | Hero'daki sonsuz CSS animasyonu virtual-time'ı bitirmiyor, Chrome **takılıyor** | Süreci arka planda başlat, süre dolunca öldür (`shot.py` deseni) |
| iframe içinde JS davranış testi | iframe render edilmiyor: `scrollTo` çalışmıyor, IntersectionObserver tetiklenmiyor, geçişler ilerlemiyor | Davranışı iframe'de test etme; düzen ölçümü iframe'de doğru |
| `data-reveal` bölümleri ekran görüntüsünde boş | Reveal IO ile açılıyor, görüntü load anında alınıyor | `--force-prefers-reduced-motion` ile çek |
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

Yasal sayfa banner'ları ve Klinik galerisi **müşterinin kendi fotoğrafları** —
kalıcı, değişmesi gerekmiyor.

---

## 7. Bilinen ödünler

- **JS 10.7 KB (ham), bütçe 8 KB'di.** Çerez bildirimi ve slider sonradan
  istendi. Sığdırmanın yolu scrollspy'ı (`aria-current`) silmek ya da
  yorumları boşaltmaktı; ikisi de çalışan bir şeyi feda ediyordu. Kütüphane
  kullanılmadı, kaydırma tamamen CSS. **Gzip'li 3.1 KB** — bütçenin gzip
  üzerinden tanımlanması öneriliyor.
- **Yasal banner'lar 1000px**, en geniş ekranda ~1440 CSS px'e yayılıyor.
  Tarayıcı hafifçe büyütüyor; %60–78 overlay altında görünmüyor. Dosyayı
  yapay büyütmekten ve jenerik stok kullanmaktan iyi bulundu.
- **Hero ve CTA görselleri export'ta karartıldı** (0.45 / 0.5). Overlay'i
  ağırlaştırmak fotoğrafı tamamen yutuyordu. Alfaları düşürecek olan,
  karartmayı da birlikte gözden geçirmeli — ikisi tek sistem.

`CLAUDE.md` sonunda 11 adet `KARAR:` satırı var, her biri gerekçesi ve
"gözden geçirilecek mi" notuyla.

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
