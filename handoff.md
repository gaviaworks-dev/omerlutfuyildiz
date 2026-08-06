# Devir notu — omerlutfuyildiz

Son güncelleme: 6 Ağustos 2026 · 48 commit · Faz 0–13 bitti

Bu dosya **projeyi hiç bilmeyen birinin** okuyup devam edebilmesi için
yazıldı. Kalıcı kurallar `CLAUDE.md`'de, görsel kaynak kaydı
`assets/img/CREDITS.md`'de; burada durum, gerekçe ve tuzaklar var.
Bir çelişki görürsen `CLAUDE.md` kural, bu dosya açıklama sayılır.

---

## 1. Proje nedir, nerede

Dt. Ömer Lütfü Yıldız'ın (diş hekimi, Ataköy / Bakırköy, İstanbul) mevcut
sitesinin (omerlutfuyildiz.com) yeniden tasarımı. **Statik önizleme** —
müşteriye gösterilip onay alınacak, henüz gerçek alan adında değil.

| | |
|---|---|
| **Canlı** | https://gaviaworks-dev.github.io/omerlutfuyildiz/ |
| **Repo** | `gaviaworks-dev/omerlutfuyildiz` (public), GitHub Pages, `main` / root |
| **Yerel** | `~/Developer/Backend Projects/omerlutfuyildiz` |
| **Referans tasarım dili** | github.com/gaviaworks-dev/drsaka — yalnızca yerleşim ve disiplin; rengi, metni, görseli, klinik bilgisi **bu projeye girmez** |

**Sayfalar**

| Dosya | İçerik |
|---|---|
| `index.html` | Hero · Hakkımda · Tedaviler (yatay slider) · Klinik · Tedavi Süreci (akordeon) · Randevu CTA · İletişim |
| `kvkk.html` | KVKK Aydınlatma Metni + şirket künyesi tablosu |
| `gizlilik-politikasi.html` | Gizlilik Politikası |
| `cerez-politikasi.html` | Çerez Politikası |

Üç yasal sayfanın da kendi fotoğraflı başlık banner'ı ve sağda yan paneli var.

**Fazlar**

| Faz | Ne yapıldı |
|---|---|
| 0–9 | İskelet, içerik, yasal sayfalar, erişilebilirlik, çerez bildirimi |
| 10 | Hibrit koyu palet (kömür siyahı bölümler) — **artık geçersiz** |
| 11 | Tedaviler slider'a çevrildi, kartlara nesne/model fotoğrafı, yasal sayfalara kendi banner'ları |
| 12 | **Siyah tamamen kaldırıldı**, site iki açık zemin tonuna indi |
| 13 | Şeffaf header, nav'da ev ikonu, monogram, CTA yeniden fotoğraflı, çerez bildirimine "Reddet" |

**Varlıklar:** 37 WebP (932 KB), 4 woff2 (92 KB), `main.css` 44.2 KB,
`tokens.css` 9.4 KB (ikisi gzip'li 11.7 KB), `main.js` 10.6 KB (gzip 3.2 KB).
Kullanılmayan yayın dosyası yok.

---

## 2. Teknoloji sınırları ve neden

| Sınır | Gerekçe |
|---|---|
| **Saf HTML + CSS + vanilla JS, build step YOK** | Devir kolaylığı. Müşteri ya da başka bir geliştirici dosyayı açıp düzenleyebilmeli; node_modules, bundler, derleme adımı olmadan yayına girmeli. |
| **CDN bağımlılığı YOK** | Üçüncü taraf istek = KVKK/çerez metniyle çelişen veri akışı + dış servise bağımlı çalışma süresi. Yasal metinler "gömülü üçüncü taraf içerik yok" diyor; bir CDN eklemek o metni yalan yapar. |
| **Tüm iç yollar göreli** | Site alt dizinde yayınlanıyor (`/omerlutfuyildiz/`). Kök eğik çizgiyle başlayan yol (`/assets/...`) Pages'te 404 verir ve gerçek alan adına taşınırken tekrar kırılır. |
| **Fontlar self-host woff2** | Google Fonts CDN'i yukarıdaki kurala takılıyor. Poppins 600 (başlık) + Nunito 400–700 variable (gövde), latin ve latin-ext subset'leri **ikisi de zorunlu** — biri eksikse `ğ Ğ ş Ş İ` fallback fonta düşer. |
| **Görseller WebP + boyut varyantları** | Bant genişliği. Kaynak JPG/PNG `img-src/` altında ve `.gitignore`'da; repoda yalnızca çıktı durur. Upscale yapılmaz. |
| **Token disiplini** | Renk/spacing/radius/shadow/font-size **yalnızca** `tokens.css`. `main.css` içinde ham hex, ham px spacing, ham gölge ve inline style yasak. İzinli tek istisna 1–3px çizim ölçüsü (hairline, odak halkası kalınlığı). Sebep: palet üç kez baştan değişti; token dışına kaçan tek değer her seferinde geride kalıyordu. |

---

## 3. Palet — her token, değeri, yeri, ölçülen kontrast

Kontrast sayıları **hesaplanarak** yazıldı; fotoğraf üstündekiler gerçek
WebP pikselleri üzerinde ölçüldü. "Biraz açalım" denirse önce yeniden ölçülür.

### Zemin ve metin

| Token | Değer | Kullanım | Kontrast (beyaz / açık gri) |
|---|---|---|---|
| `--color-bg` | `#ffffff` | Beyaz bölüm zemini | — |
| `--color-bg-alt` | `#f5f5f5` | Açık gri bölüm zemini, header solid durumu, footer | — |
| `--color-text` | `#2a2d32` | Gövde metni **ve başlık**, koyu buton dolgusu, outline buton kenarlığı | 13.82 / 12.67 |
| `--color-text-muted` | `#5a6169` | İkincil metin: spot, etiket, alt yazı, footer, birincil buton hover dolgusu | 6.27 / 5.75 |
| `--color-line` | `#e6e6e6` | Tek ayırıcı çizgi rengi (kart kenarlığı, header alt çizgisi, tablo) | 1.25 / 1.14 — dekoratif, metin taşımaz |

### Marka turkuazı — kısık

| Token | Değer | Kullanım | Kontrast |
|---|---|---|---|
| `--color-primary` | `#10afa0` | **Yalnızca dekoratif dolgu:** eyebrow çizgisi, kart ikonu, madde imi, hover vurgusu, footer ayracı, `li::marker` | 2.74 / 2.51 — **metin ya da durum göstergesi OLAMAZ** |
| `--color-primary-text` | `#0b7c71` | Turkuazın metin/odak/durum varyantı: linkler, eyebrow metni, akordeon numarası ve `+`, aktif nav çizgisi ve metni (solid header), yazmarka soyadı | 5.08 / 4.66 |
| `--color-focus` | → `--color-primary-text` | Odak halkası (açık zemin) | 5.08 / 4.66 |

### Koyu yüzey (yalnızca fotoğraf üstü)

| Token | Değer | Kullanım |
|---|---|---|
| `--color-text-inverse` | `#ffffff` | Fotoğraf overlay'i üstündeki başlık/metin, koyu buton içi, şeffaf header |
| `--color-text-inverse-muted` | `rgb(255 255 255 / .72)` | Hero ve CTA'nın ikincil metni, footer/nav muted |
| `--color-text-inverse-subtle` | `rgb(255 255 255 / .86)` | Yasal banner eyebrow'u, hero scroll ipucu |
| `--color-rule-inverse` | `rgb(255 255 255 / .28)` | Hero eyebrow çizgileri, scroll çizgisi |
| `--color-focus-inverse` | `#ffffff` | Koyu yüzeylerde odak halkası |
| `--glass-border` | `rgb(255 255 255 / .55)` | Hero ikincil butonunun kenarlığı |
| `--glass-fill-hover` | `rgb(255 255 255 / .16)` | Aynı butonun hover dolgusu |

### Overlay token'ları — üçü de nötr koyu gri (42 45 50) tabanlı

Taban siyah **değil**; sayfanın kendi metin tonu. Böylece koyu yüzeyler
açık sayfanın geri kalanıyla aynı nötr aileden kalıyor.

| Token | Alfalar | Ölçülen (gerçek piksel, en kötü durum) |
|---|---|---|
| `--overlay-hero` | .66 / .58 / .72 | beyaz **8.52:1** · %72 muted **5.36:1** |
| `--overlay-banner` | .74 / .66 / .82 | beyaz başlık **6.63:1** · %86 eyebrow **5.43:1** |
| `--overlay-cta` | .66 / .62 / .72 | beyaz **8.42:1** · %72 muted **5.31:1** |

### Header lokal token'ları

`.site-header` üzerinde tanımlı; `.site-top--scrolled`, `.site-top--menu-open`
ve `html:not(.js)` yalnızca bu altı değeri değiştirir. Bileşen kuralları
iki kez yazılmaz.

| Token | Şeffaf (sayfa başı) | Solid (kaydırılmış / menü açık / JS yok) |
|---|---|---|
| `--header-bg` | `transparent` | `--color-bg-alt` |
| `--header-fg` | `--color-text-inverse` | `--color-text` |
| `--header-fg-muted` | `--color-text-inverse-muted` | `--color-text-muted` |
| `--header-accent` | `--color-text-inverse` | `--color-primary-text` |
| `--header-rule` | `transparent` | `--color-line` |
| `--header-shadow` | `none` | `--shadow-sm` |

Şeffaf durumda ölçülen: hero üst bandı beyaz **9.61:1** / %72 **5.92:1**,
yasal banner üstü **7.59:1** / **4.88:1**. Turkuaz metin orada 2.77'ye
düştüğü için "Yıldız" aksanı şeffaf durumda beyaza döner.

### Butonlar

| Varyant | Görünüm | Kontrast |
|---|---|---|
| `.button--primary` (açık zemin) | `#2a2d32` dolgu + beyaz metin | 13.82:1 |
| `.button--primary:hover` | `#5a6169` dolgu + beyaz metin | 6.27:1 |
| `.button--primary` (hero / CTA / şeffaf header) | beyaz dolgu + `#2a2d32` metin | 13.82:1 |
| `.button--outline` | şeffaf + `#2a2d32` kenarlık ve metin | 13.82 / 12.67 |
| `.button--outline:hover` | koyu dolgu + beyaz metin | 13.82:1 |
| `.button--ghost-light` (yalnız hero) | şeffaf + beyaz kenarlık ve metin | overlay üstünde 8.52:1 |

`.button--outline` çerez bildirimindeki "Reddet" düğmesinde kullanılıyor.

**Yeni renk eklenmez; gerekiyorsa önce sorulur.**

---

## 4. Bölüm akışı

Yalnızca iki zemin sınıfı var: `.section--bg` (beyaz) ve `.section--bg-alt`
(açık gri). Başka zemin sınıfı yok, üretilmesi de istenmiyor.
**Yeni bölüm eklerken komşusunun tersini ver.**

| Sıra | Bölüm | Zemin |
|---|---|---|
| — | header | şeffaf → kaydırınca `alt` |
| 1 | Hero | **fotoğraf** + `--overlay-hero` |
| 2 | Hakkımda | `alt` |
| 3 | Tedaviler (slider) | `bg` |
| 4 | Klinik | `alt` |
| 5 | Tedavi Süreci | `bg` |
| 6 | Randevu CTA | **fotoğraf** + `--overlay-cta` |
| 7 | İletişim | `bg` |
| — | footer | `alt` |
| — | çerez bildirimi | beyaz kart, `--color-line` kenarlık |

Yasal sayfalar: banner **fotoğraf** + `--overlay-banner`, gövde `bg`,
yan panel `alt`.

Koyu yüzey **yalnızca bu üç fotoğraflı yüzeydir**. Sitede solid koyu blok
yoktur; `--surface-*` lokal token katmanı Faz 12'de kaldırıldı, bileşenler
doğrudan `--color-*` okur.

---

## 5. Alınmış kararlar ve gerekçeleri

Tam liste `CLAUDE.md` sonundaki `KARAR:` satırlarındadır — her biri
gerekçesi ve "gözden geçirilecek mi" notuyla. Burada özü:

### Renk ve palet

- **Siyah tamamen kaldırıldı (Faz 12).** `#15171a` / `#1c1f23` ve türevleri
  silindi; site iki zemin tonuna indi. Müşteri kararı.
- **Başlık rengi gövdeyle aynı** `#2a2d32`. Siyah kalkınca başlığa ayrı bir
  koyu ton kalmadı; yenisini üretmek "yeni renk" demekti. Hiyerarşi Poppins
  600 + punto ile. *Gözden geçirilebilir.*
- **Turkuazın durum gösteren görevleri `#0b7c71`'e taşındı.** `#10afa0` açık
  gri üzerinde 2.51:1; WCAG 1.4.11 durum göstergesi için 3:1, metin için
  4.5:1 istiyor. Dekoratif turkuaz `#10afa0` kaldı. *Ölçüm kesin, dönülmez.*
- **Odak halkası `#0b7c71`.** Aynı gerekçe.
- **Birincil buton hover'ı için yeni renk üretilmedi;** paletteki `#5a6169`
  dolgu olarak kullanıldı (6.27:1). Outline buton hover'da koyu dolguya
  dönüyor — "beyaza dolma" açık gri bölümlerde görünmüyordu.
- **`theme-color` `#f5f5f5`.** Mobil tarayıcı çubuğu header'ın üstünde geniş
  turkuaz yüzey oluyordu; turkuazı geniş zeminden çekme kararıyla çelişti.
  *Marka rengi istenirse geri alınır.*

### Fotoğraflı yüzeyler

- **Hero fotoğrafı export'ta 0.45 parlaklığa karartıldı.** Orijinal
  parlaklıkta beyaz metni AA'da tutmak 0.88 alfa istiyordu, o da görseli
  yutup "diş kliniği" mesajını yok ediyordu. Alfaları düşürecek olan
  karartmayı da birlikte gözden geçirmeli — ikisi tek sistem.
- **Yasal banner'lar fotoğraflı kalır.** Bir ara "hero tek istisna" talimatı
  lafzen okunup açık gri banda çevrildi; müşteri reddetti, geri kondu.
  Eyebrow %72 yerine %86 beyaz — %72 bu görsellerde 4.37:1'de kalıyordu.
- **CTA bandı fotoğraflı kalır.** Faz 12'de gri yapılmıştı, müşteri geri
  istedi.
- **`background/3.jpg` hero'da kullanılmadı** — "otel lobisi" okuyor. Aynı
  mekân `clinic-lounge` olarak Klinik galerisinde yayında.

### Header, nav, marka

- **Şeffaf header (Faz 13).** Sayfa başında fotoğrafın üstünde yüzer,
  ~40px sonra solid olur. Mobil menü açıkken solid. Şeffaf durum `html.js`
  altında tanımlı: **JS yoksa header baştan solid** — aksi hâlde `--scrolled`
  sınıfı hiç gelmez, beyaz metin açık bölümlerin üstünde kaybolurdu.
- **Hero ve banner'ın üst boşluğundan header yüksekliği çıkarıldı.** Header
  artık içeriğin üstünde yüzüyor; boşluk iki kez sayılıyordu.
- **Nav'da "Anasayfa" metin maddesi ev ikonuna çevrildi.** Bir ara tamamen
  kaldırılmıştı, o yanlıştı. Masaüstünde yalnız ikon, mobilde ikon + metin;
  etiket her durumda ekran okuyucuda. Scrollspy hero'dayken bu maddeyi
  işaretler.
- **Monogram (Faz 13).** Müşteriden logo dosyası gelmediği için yuvarlak
  köşeli kare içinde geometrik "Ö" çizildi (elips + iki nokta, `text`
  etiketi değil — font olmadan da aynı görünür). Tamamı `currentColor`.
  Aynı geometri footer'da ve `favicon.svg`'de. **Geçici.**
- **Yazmarkanın `aria-label`'ı "Dt. Ömer Lütfü Yıldız — Ana sayfa".** WCAG
  2.5.3 görünen metnin erişilebilir adın içinde geçmesini istiyor; yalnız
  "Ana sayfa" yazılsa sesle kontrol kullanan biri marka adını söyleyerek
  linki tetikleyemezdi.

### İçerik ve görsel politikası

- **"İki ayrı tedavi odası" ifadesi** müşterinin kendi fotoğraflarındaki
  görsel kanıta dayanıyor, yazılı kaynak yok. *Müşteri teyit etmeli.*
- **"Toplu taşımaya yakın" ve "asansörle erişim" çıkarıldı** — hiçbir
  kaynakta doğrulanmıyor.
- **Tedavi kartı fotoğrafları nesne/model/ekipman karesi.** Bu başlıkların
  stok karşılıkları neredeyse tamamen öncesi/sonrası ve hasta ağzı görseli;
  görsel politikası bunları yasaklıyor. Kartlar Faz 10'da fotoğrafsızdı,
  Faz 11'de nesne kareleriyle açıldı.
- **Çerez bildiriminde "Reddet" ret kalıcı kayıt bırakmaz.** Kabul
  `localStorage`'a yazılır ve kalıcıdır; ret `sessionStorage`'a yazılır,
  tarayıcı kapanınca silinir. Gerekçe: reddeden kullanıcının cihazında iz
  bırakmamak. Sitede zaten izleme yok, o yüzden ret hiçbir özelliği
  kapatmıyor — fark yalnızca tercihin ne kadar hatırlandığı.
  `cerez-politikasi.html` bu iki durumu tablo hâlinde anlatıyor.
- **İletişim formu konmadı.** Mevcut sitedeki `email.php` Pages'te çalışmaz;
  mesajı sessizce yutan form, formsuz sayfadan kötüdür. Harici servis
  (Formspree vb.) onaylanırsa eklenebilir — **CDN/harici bağımlılık kuralına
  istisna açar**, önce sorulmalı.
- **Slider sütun genişlikleri sabit yüzde**, `minmax(0, %)` değil:
  `minmax` kartların küçülmesine izin verdiği için beş kart ekrana sığıyor
  ve kaydırma hiç oluşmuyordu.
- **JS bütçesi aşıldı.** Hedef 8 KB'di, dosya 10.6 KB (ham). Çerez bildirimi
  ve slider sonradan istendi; sığdırmanın yolu scrollspy'ı silmek ya da
  yorumları boşaltmaktı, ikisi de çalışan bir şeyi feda ediyordu. Kütüphane
  kullanılmadı, kaydırma tamamen CSS scroll-snap. **Gzip'li 3.2 KB** —
  bütçenin gzip üzerinden tanımlanması öneriliyor.

---

## 6. Açık işler

### Müşteriden gelecek

| Konu | Durum / etki |
|---|---|
| **Logo dosyası** | Yok. Yerine geçici monogram (`header`, `footer`, `favicon.svg` — üç yerde birden değişir). |
| **Gerçek klinik fotoğrafları** | 18 dosya stok, `CREDITS.md`'de "GEÇİCİ — değişecek": hero (4), 5 tedavi kartı (10), CTA bandı (3). **Aynı dosya adlarıyla değiştirilirse HTML'de değişiklik gerekmez.** |
| **Şirket künyesi** | Ticaret unvanı, VKN, MERSİS, KEP bilinmiyor; `kvkk.html`'deki tek künye tablosunda `—` duruyor. Diğer iki yasal sayfa oraya link veriyor, veri tekrarı yok. |
| **Çalışma saatleri** | Bilinmiyor, İletişim'e konmadı. Uydurulmayacak. |
| **Sosyal medya** | Doğrulanmadı; eski sitedeki dört ikonun `href`'i boştu, footer'a konmadı. |
| **Akordeon metinleri** | Mevcut sitede yok; prosedürel ve garantisiz yazıldı, hekim onayı bekliyor. |
| **"İki ayrı tedavi odası"** | Görsel kanıta dayanıyor, teyit bekliyor. |

### Yayına almadan önce zorunlu

- **Yasal metinler hukukçu onayından geçmedi.** KVKK, Gizlilik ve Çerez
  metinleri sitenin gerçek işleyişine göre yazıldı (form yok, analitik yok,
  reklam çerezi yok, gömülü üçüncü taraf içerik yok, sağlık verisi
  toplanmıyor) ancak **avukat incelemesi şart**.
- **`robots: noindex, nofollow` kaldırılacak** — ama yalnızca gerçek alan
  adına taşınırken. Pages adresi önizlemedir; indexlenirse müşterinin
  yayındaki omerlutfuyildiz.com sitesiyle duplicate content çakışır ve
  müşterinin SEO'su zarar görür.
- **`og:image` gerçek alan adına çevrilecek** — şu an Pages adresini
  gösteriyor.

### Geçici görsel listesi

`assets/img/CREDITS.md`, Durum sütunu "GEÇİCİ — değişecek" olan satırlar.
Kliniğin **kendi** fotoğrafları (Klinik galerisi 4, Hakkımda 1, Tedavi
Süreci 2, yasal banner 3) kalıcıdır, değişmesi gerekmiyor.

---

## 7. Deploy — kilit ve kurtarma

```
git push origin main          # legacy (branch) build kendiliğinden çalışır
```

Repoda Actions workflow'u **yoktur**; yayın branch build ile yapılır.

### Yaşanan kilit

Faz 12'de bu akış bir saatten uzun kilitlendi. Belirti: **build her seferinde
başarılı, deploy adımı `deployment_queued` durumunda 10 dakika bekleyip
`Timeout reached, aborting!` ile düşüyor.** Pages API sitenin durumunu
`errored` gösteriyor. Canlı adres 200 dönmeye devam ediyor ama **eski
sürümü** veriyor.

### Çalışan kurtarma — sırayla

**1. Takılı deployment'ı iptal et, build'i doğrudan iste.** Çoğu zaman bu
yeter (Faz 13'te iki kez bunu çözdü):

```
SHA=$(git rev-parse HEAD)
gh api -X POST "repos/gaviaworks-dev/omerlutfuyildiz/pages/deployments/$SHA/cancel"
gh api -X POST  repos/gaviaworks-dev/omerlutfuyildiz/pages/builds
```

Hata mesajı `due to in progress deployment. Please cancel <sha> first`
diyorsa, **o sha'yı** iptal et; engelleyen eski bir deployment olabilir.

**2. Olmazsa Pages sitesini silip yeniden kur.** Faz 12'de tıkanmayı kesin
olarak bu çözdü:

```
gh api -X DELETE repos/gaviaworks-dev/omerlutfuyildiz/pages
gh api -X POST   repos/gaviaworks-dev/omerlutfuyildiz/pages \
  -f "source[branch]=main" -f "source[path]=/"
```

Site aynı adresle geri gelir, durum `errored` yerine `building` olur.
Silme ile yeniden kurma arasında adres kısa süre 404 verir.

### Tuzaklar — hepsi yaşandı

| Tuzak | Gerçek |
|---|---|
| `gh run rerun <id>` | Pages çalışmalarında rerun, run'ı kalıcı "queued" durumunda kilitleyebiliyor; sonrasında `force-cancel` bile *"Cannot cancel a workflow re-run that has not yet queued"* diyor ve o run deployment kilidini tutmaya devam ediyor. **Rerun kullanma, yeni commit at.** |
| `POST .../pages/deployments/{sha}/cancel` | Kuyruğu açar, ama deployment ID **commit sha'sıdır**: iptal edilen sha ile yeniden deploy edilemez, anında "Deployment cancelled" alır. İptalden sonra **yeni sha** gerekir. |
| `actions/deploy-pages` ile modern yola geçmek | Denendi, çözmedi — aynı kuyrukta bekledi. Workflow dosyası sonra kaldırıldı. |
| HTTP 200 = güncel sürüm sanmak | Eski sürüm de 200 döner. **Kesin kontrol:** canlı `tokens.css` ya da `main.css` içinde beklenen yeni token'ı aramak. |
| Build süresi | 1–8 dakika normal. `gh api .../pages/builds/latest --jq .status` ile izle: `queued` → `building` → `built` / `errored`. |

---

## 8. Dosya haritası

```
index.html                    Tek sayfa: hero → hakkımda → tedaviler → klinik
                              → süreç → CTA → iletişim → footer → çerez bildirimi
kvkk.html                     KVKK metni + şirket künyesi tablosu (tek künye kaynağı)
gizlilik-politikasi.html      Gizlilik metni, künye için kvkk.html'e link verir
cerez-politikasi.html         Çerez metni, künye için kvkk.html'e link verir

assets/css/tokens.css         @font-face blokları + :root token'ları.
                              Projedeki TEK renk/ölçü/tipografi kaynağı.
assets/css/main.css           Bileşen stilleri, 18 numaralı bölüm hâlinde.
                              Ham hex/px/gölge içermez, her şey token okur.
assets/js/main.js             Bağımlılıksız, IIFE. Yedi işlev:
                              initHeaderState  (kaydırınca --scrolled sınıfı)
                              initMobileNav    (ESC, focus trap, dış tıklama)
                              initAccordion    (aria-expanded, ok tuşları)
                              initScrollSpy    (aria-current, IntersectionObserver)
                              initReveal       (fade-up; JS yoksa içerik görünür)
                              initCookieNotice (kabul→localStorage,
                                                ret→sessionStorage)
                              initSlider       (yalnız ok butonları; kaydırma CSS)

assets/fonts/*.woff2          Poppins 600 + Nunito 400–700, latin & latin-ext
assets/img/*.webp             Yayınlanan görseller, boyut varyantlarıyla
assets/img/favicon.svg        Monogram (turkuaz zemin + beyaz Ö)
assets/img/CREDITS.md         Her görselin kaynağı/lisansı/durumu — zorunlu kayıt

CLAUDE.md                     Kalıcı kurallar, palet, altın kural, açık işler,
                              KARAR listesi. Çelişkide bu dosya kazanır.
handoff.md                    Bu dosya — durum, gerekçe, tuzak.
README.md                     Kısa proje tanıtımı
.nojekyll                     Pages'in Jekyll işlemesini kapatır
.gitignore                    img-src/, _* (ölçüm araçları), brief, .vscode

img-src/                      Kaynak JPG'ler — repoya girmez
```

---

## 9. Doğrulama nasıl koşulur

**Yerel sunucu** (göreli yollar `file://` ile çalışmaz):

```
python3 -m http.server 8091     # → http://localhost:8091
```

**Kırılım / taşma testi.** Ölçüt: 4 sayfa × 6 kırılım
(1440 / 1280 / 1024 / 768 / 390 / 360) = **24/24 yatay taşma sıfır.**
Bu ortamda `npx playwright` (1.62, chromium kurulu) 360/390'da doğru
render ediyor. Her sayfa için `document.documentElement.scrollWidth >
clientWidth` kontrol edilir; ayrıca eleman bazlı
`getBoundingClientRect().right > clientWidth` probu kullanılabilir —
ama slider şeridinin *içi* kaydırılabilir olduğu için oradaki kartlar
taşma sayılmaz, `closest('[data-slider-track]')` ile elenir.

**Kontrast ölçümü — iki ayrı yöntem, ikisi de gerekli:**

1. *Düz zeminler:* sayfayı Playwright'ta aç, her metin düğümü için
   `getComputedStyle().color` ile en yakın opak ata zeminini al, WCAG
   oranını hesapla; normal metinde 4.5, büyük metinde 3.0 eşiği.
   Hem sayfa başında hem kaydırılmış durumda koş (header token'ları
   değişiyor).
2. *Fotoğraf zeminler:* hero, yasal banner, CTA ve şeffaf header bandı bu
   yöntemle ölçülemez — zemin bir görsel. Bunlar için WebP dosyası PIL ile
   açılır, overlay gradyanı **gerçek piksellerin üzerine bindirilir** ve en
   kötü piksel bulunur. Overlay alfası değişecekse bu ölçüm tekrarlanır,
   tahmin yürütülmez.

**Diğer tuzaklar:**

| Tuzak | Çözüm |
|---|---|
| `data-reveal` bölümleri ekran görüntüsünde boş çıkıyor | Reveal IntersectionObserver ile açılıyor; Playwright context'ini `reducedMotion: 'reduce'` ile kur |
| `scrollWidth <= clientWidth` taşmayı gizliyor | `html, body { overflow-x: clip }` var; eleman bazlı prob kullan |
| Chrome headless `--window-size=390` | 500px altına inmiyor, sahte "kesik" gösteriyor. Playwright kullan |
| `git add -p` yok (etkileşimli) | Ara dosya durumu kur: `git show HEAD:dosya` ile eski hâli al, ilgili bloğu geri koy, commit et, tam hâli geri yaz |
| `timeout` komutu macOS'ta yok | Arka planda başlat + manuel kill |
| headless `localStorage` | Süreç öldürülünce diske yazılmıyor; iki aşamalı çerez testi bu yolla yapılamaz |

**Canlı doğrulama:** dört sayfa 200 · yeni varlıklar 200 · beklenen token
canlı CSS'te var · 6 kırılımda taşma yok.

---

## 10. Sıradaki adım

**Statik önizleme tamamlandı ve yayında.** Müşteri (patron) onayı bekleniyor.

Onaydan sonra proje **full stack**'e geçecek. Kullanıcı bunun için **ayrı ve
detaylı bir prompt** yazacak; o gelene kadar:

- Backend, framework, build tooling işine **başlanmaz**.
- Bu dosyadaki ve `CLAUDE.md`'deki statik kurallar (build step yok, CDN yok,
  göreli yollar, token disiplini) **aynen geçerlidir**.
- Statik siteyi kendiliğinden bir framework'e taşıma önerisi getirilmez.

Bu arada gelebilecek işler: müşteriden gelen gerçek fotoğraflar ve logo ile
geçici varlıkların değiştirilmesi, hukukçu dönüşüne göre yasal metin
düzeltmesi, gerçek alan adına taşıma (`robots`, `og:image`).
