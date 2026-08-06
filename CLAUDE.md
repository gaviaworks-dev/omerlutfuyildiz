# omerlutfuyildiz — Kurumsal Web Sitesi

Statik tek sayfa site. Dt. Ömer Lütfü Yıldız, Ataköy / İstanbul.
Mevcut sitenin (omerlutfuyildiz.com) yeniden tasarımı.

Renk otoritesi: mevcut site (`#10afa0`)
Tasarım dili otoritesi: github.com/gaviaworks-dev/drsaka (yerleşim + disiplin,
renk/metin/görsel DEĞİL)

## Teknoloji — kesin sınırlar
- Saf HTML + CSS + vanilla JS. Build step YOK. CDN bağımlılığı YOK.
- Fontlar self-host woff2 (Poppins başlık, Nunito gövde).
- Tüm iç yollar göreli. Kök eğik çizgiyle başlayan yol YASAK.
- Görseller WebP, `assets/img/` altında. Kaynak JPG/PNG repoya girmez.

## Token disiplini
- Renk/spacing/radius/shadow/font-size yalnızca `tokens.css`.
- `main.css` içinde ham hex / ham px spacing / ham gölge YASAK.
- Inline style YASAK.

### Palet — açık, iki zemin tonu (Faz 12–13)

Kömür siyahı (`#15171a`, `#1c1f23`) ve türevleri paletten **tamamen
çıkarıldı**. Sitede solid koyu blok yoktur; koyu yüzey yalnızca üç fotoğraflı
yüzeyin overlay'idir (hero, yasal banner, Randevu CTA).

| Token | Değer | Kullanım |
|---|---|---|
| `--color-bg` | `#ffffff` | Beyaz zemin |
| `--color-bg-alt` | `#f5f5f5` | Açık gri zemin |
| `--color-text` | `#2a2d32` | Gövde metni **ve** başlık (13.82 / 12.67) |
| `--color-text-muted` | `#5a6169` | İkincil metin: spot, etiket, alt yazı, footer (6.27 / 5.75) |
| `--color-text-inverse` | `#ffffff` | Fotoğraf overlay'i üstünde (hero, banner, CTA), şeffaf header ve koyu buton içinde |
| `--color-line` | `#e6e6e6` | Tek ayırıcı çizgi rengi |
| `--color-primary` | `#10afa0` | **KISIK ve yalnızca dekoratif dolgu:** eyebrow çizgisi, kart ikonu, madde imi, hover vurgusu, footer ayracı. Açık zeminde metin ya da durum göstergesi OLAMAZ (2.74 / 2.51) |
| `--color-primary-text` | `#0b7c71` | Turkuazın metin/odak/durum varyantı: aktif nav çizgisi ve metni, odak halkası, akordeon `+`, eyebrow metni, linkler (5.08 / 4.66) |

**Bölüm akışı (beyaz / açık gri dönüşümlü):**
hero (fotoğraf) · Hakkımda `alt` · Tedaviler `bg` · Klinik `alt` ·
Tedavi Süreci `bg` · Randevu CTA (fotoğraf) · İletişim `bg` · footer `alt`.
Yasal sayfalar: banner (fotoğraf), gövde `bg`.

**Header** sayfa başındayken şeffaftır, fotoğrafın üstünde yüzer; kaydırınca
`alt` zemine oturur. Renk `.site-header` üzerindeki `--header-bg`,
`--header-fg`, `--header-fg-muted`, `--header-accent`, `--header-rule`,
`--header-shadow` token'larından yürür; solid duruma geçiş yalnızca bu
değerleri değiştirir.

**Fotoğraf zeminli üç yüzey** (hero, yasal banner, CTA) tek istisnadır:
beyaz metin için nötr koyu gri overlay taşırlar (`--overlay-hero`,
`--overlay-banner`, `--overlay-cta`). Alfalar gerçek pikseller üzerinde
ölçülmeden değiştirilmez.

Sınıflar yalnızca `.section--bg` ve `.section--bg-alt`. Koyu bölüm kalmadığı
için yüzeye göre değişen lokal token katmanı (`--surface-*`) kaldırıldı;
bileşenler doğrudan `--color-*` okur.

Yeni renk eklenmez; gerekiyorsa önce sorulur.

## ALTIN KURAL
1. **Placeholder yok.** Lorem ipsum yok, "yakında" yok, `href="#"` yok.
   Gerçek içeriği olmayan öğe konmaz.
2. **Rakam uydurma yok.** Hasta sayısı, başarı oranı, memnuniyet yüzdesi
   yazılmaz. Zorunluysa CLAUDE.md "Açık işler" altına yazılır ve bildirilir.
3. **İletişim uydurma yok.** Yalnızca doğrulanmış bilgiler kullanılır.
   Çalışma saatleri elde yok — konmaz.
4. **Sağlık garantisi yok.** Zorunlu ibare footer'da aynen bulunur:
   > "İnternet sitemizde yer alan tüm açıklamalar tamamen bilgilendirme
   > amaçlıdır. Bu bilgilendirmeler kesinlikle tıbbi muayene ve tanı
   > yerine geçmez!"
5. **Referans kirliliği yok.** drsaka veya başka klinik/hekim adı, metni,
   rengi, görseli, istatistiği bu projeye girmez.
6. **Görsel politikası.** Stok görsel yalnızca **Unsplash** ve **Pexels**'ten
   alınır — Freepik, Shutterstock, Google Görseller, Pinterest **yasak**.
   Kadın fotoğrafı konmaz; yüz gören insan fotoğrafından kaçınılır. Tercih
   sırası: klinik iç mekan → dental ekipman → steril alan → implant/model
   detayı → mimari ve doku. Konu diş hekimliğinden sapmaz. **Tedavi
   öncesi/sonrası veya hasta ağzı görseli stoktan KONMAZ** — yanıltıcı sağlık
   iddiası olur, o slot boş kalır. Tüm görseller WebP + boyut varyantları.
   Her görsel `assets/img/CREDITS.md` içine dosya / kaynak / kaynak URL /
   fotoğrafçı / lisans / durum ile yazılır.

## HTML yorum politikası
`index.html` içinde açıklama, durum, onay veya TODO yorumu **bulunmaz** —
kaynak kod public. Yalnızca nötr bölüm ayracı yorumu (`<!-- HERO -->`) kalır.
Görsellerle ilgili hiçbir yorum yazılmaz. Tüm iç takip bu dosyanın
"Açık işler" bölümünde ve `assets/img/CREDITS.md` içinde tutulur.

## Erişilebilirlik (pazarlık dışı)
Tek h1, atlamasız başlık sırası, `:focus-visible`, akordeonda
`aria-expanded`/`aria-controls`, mobil menüde ESC + focus trap,
kontrast ≥ 4.5:1, `prefers-reduced-motion` desteği.

## Performans
Hero preload + `fetchpriority="high"`, diğerleri lazy, her görselde
width/height, 6 kırılımda yatay taşma sıfır (1440/1280/1024/768/390/360).
JS bütçesi: hedef 8 KB'di, ham dosya 10.6 KB — gzip'li 3.2 KB. Gerekçe
KARAR listesinde; bütçenin gzip üzerinden tanımlanması öneriliyor.

## Git
Conventional Commits (İngilizce). `git add -A` ve `git add .` YASAK.
Ayrı concern = ayrı commit. Commit/push yalnızca kullanıcı isteyince.

## Yerel geliştirme
`python3 -m http.server 8091` → http://localhost:8091

## Deploy
GitHub Pages, `gaviaworks-dev/omerlutfuyildiz` public repo, `main` / root,
kökte `.nojekyll`. Yayın: https://gaviaworks-dev.github.io/omerlutfuyildiz/

Yayın branch build ile yapılır, repoda Actions workflow'u yoktur. Deploy
kilitlenirse çözüm Pages sitesini silip yeniden kurmaktır — komutlar ve
yaşanmış tuzaklar `handoff.md` §5'te.

## Çalışma disiplini
Faz faz ilerlenir, her faz sonunda DUR + onay. Faz atlanmaz. Faz kapsamı
dışına çıkılmaz. Belirsizlik çıkarsa uydurma yerine SOR.

## Açık işler
- **`robots: noindex, nofollow` yalnızca gerçek alan adına taşınırken
  kaldırılacak.** Pages adresi (`gaviaworks-dev.github.io`) sadece önizlemedir;
  indexlenirse müşterinin gerçek sitesi omerlutfuyildiz.com ile duplicate
  content çakışması olur ve müşterinin SEO'su zarar görür.
- **Stok görseller müşterinin gerçek klinik fotoğraflarıyla değişecek.**
  Değişecek dosyaların listesi `assets/img/CREDITS.md` içinde, Durum sütunu
  "GEÇİCİ — değişecek" olan satırlar.
- **Monogram geçici — müşteriden gerçek logo dosyası gelince değişecek.**
  Header ve footer'daki "Ö" monogramı inline SVG olarak çizildi (yuvarlak
  köşeli kare + geometrik Ö); `favicon.svg` de aynı marka. Logo gelince üç
  yerde birden değişir.
- **Logo dosyası müşteriden istenecek**; şimdilik monogram + tipografik
  yazmarka (Poppins, "Yıldız" turkuaz aksanlı).
- **Çalışma saatleri bilgisi yok**, İletişim bölümünde konmadı.
- **Tedavi süreci akordeon metinleri** mevcut sitede yok; prosedürel ve
  garantisiz yazıldı, müşteri onayı bekliyor.
- ~~`og:image` mutlak URL'e çevrilecek~~ — yapıldı; **şu an Pages adresini
  gösteriyor, gerçek alan adına taşınırken güncellenecek.**
- **Tedavi kartı fotoğrafları stok.** Faz 11'de nesne/model/ekipman karesi
  eklendi (renk skalası, 3B model, implant, artikülatör, kaplama). Müşterinin
  kendi vaka fotoğrafları gelince değişecek — `CREDITS.md`'de "GEÇİCİ".
  Öncesi/sonrası ve hasta ağzı görseli hiçbir koşulda konmaz.
- **Sosyal medya hesabı** doğrulanmadı; mevcut sitedeki ikonların href'i boştu,
  footer'a konmadı.
- **Şirket künyesi eksik.** Ticaret unvanı, VKN, MERSİS ve KEP adresi
  bilinmiyor; `kvkk.html` içindeki tek künye tablosunda `—` olarak duruyor.
  Bilgi gelince yalnızca o tablo güncellenecek — diğer iki yasal sayfa bu
  tabloya link veriyor, veri tekrarı yok.
- **Yasal metinler hukukçu onayından geçmedi.** KVKK, Gizlilik ve Çerez
  metinleri sitenin gerçek işleyişine göre yazıldı (form yok, analitik yok,
  reklam çerezi yok, gömülü üçüncü taraf içerik yok, sağlık verisi
  toplanmıyor) ancak **yayına alınmadan önce avukat incelemesi gerekir**.

### Verilen kararlar (gözden geçirilecek)

- **KARAR (Faz 12):** Yasal sayfa banner'ları **fotoğraflı kalır.** Bir ara
  "hero tek istisna" talimatı lafzen okunup banner'lar açık gri banda
  çevrildi; müşteri bunu reddetti, fotoğraflar geri kondu. Banner hero ile
  aynı kurgudur: kliniğin kendi mekân fotoğrafı + nötr koyu gri overlay.
  Overlay `--overlay-banner` token'ında, alfalar üç görselin gerçek
  pikselleri üzerinde ölçüldü (beyaz başlık 6.63:1, %86 eyebrow 5.43:1).
  Eyebrow %72 yerine %86 beyaz — %72 bu görsellerde 4.37:1'de kalıyordu.
  *Gözden geçirilecek:* hayır.

- **KARAR (Faz 13):** Randevu CTA bandı **fotoğraflı kalır.** Faz 12'de açık
  gri zemine çevrilmişti, müşteri geri istedi. Hero ve yasal banner ile aynı
  kurgu: kliniğin tedavi odası karesi + nötr koyu gri overlay
  (`--overlay-cta`). Gerçek pikseller üzerinde beyaz 8.42:1, %72 muted
  5.31:1. *Gözden geçirilecek:* hayır.

- **KARAR (Faz 13):** Header sayfa başında şeffaf, ~40px sonra solid.
  Şeffaf durum `html.js` altında tanımlı. *Gerekçe:* JS çalışmazsa
  `--scrolled` sınıfı hiç gelmez; header sonsuza dek şeffaf kalır ve beyaz
  metin açık bölümlerin üstünde kaybolurdu. JS yoksa header baştan solid.
  Ayrıca hero ve banner'ın üst boşluğundan header yüksekliği çıkarıldı —
  header yüzdüğü için boşluk iki kez sayılıyordu.
  *Gözden geçirilecek:* hayır.

- **KARAR (Faz 13):** Nav'daki "Anasayfa" maddesi metin değil **ev ikonu**.
  Faz 12'de tamamen kaldırılmıştı, o yanlıştı. Masaüstünde yalnız ikon,
  mobil menüde ikon + metin; etiket her durumda ekran okuyucuda kalır.
  Yasal sayfalarda `aria-current` taşımaz — orada ana sayfa açık değil.
  *Gözden geçirilecek:* hayır.

- **KARAR (Faz 13):** Monogram inline SVG, geometrik "Ö" (elips + iki nokta),
  `text` etiketi kullanılmadı. *Gerekçe:* `text` etiketi font yüklenmezse
  başka türlü çiziliyor; geometri her yerde aynı. Tamamı `currentColor`,
  böylece şeffaf header'da beyaz, solid header'da koyu oluyor — ikinci kural
  gerekmiyor. `favicon.svg` aynı geometriden, turkuaz zemin + beyaz mark.
  **Geçici**, logo gelince üç yerde birden değişir. *Gözden geçirilecek:* evet.

- **KARAR (Faz 13):** Çerez bildirimindeki "Reddet" kalıcı kayıt bırakmaz:
  kabul `localStorage`, ret `sessionStorage`. *Gerekçe:* reddeden kullanıcının
  cihazında kalıcı iz bırakmamak. Sitede izleme aracı olmadığı için ret
  hiçbir özelliği kapatmıyor; fark yalnızca tercihin ne kadar hatırlandığı.
  `cerez-politikasi.html` iki durumu da tablo hâlinde anlatıyor.
  *Gözden geçirilecek:* hayır.

- **KARAR (Faz 12):** Başlık rengi ayrı bir koyu ton değil, gövde metniyle
  aynı `#2a2d32`. *Gerekçe:* siyah tamamen kalktı, daha koyu bir başlık tonu
  yeni renk demekti. Hiyerarşi Poppins 600 + punto ile kuruluyor.
  *Gözden geçirilecek:* evet, başlık için biraz daha koyu bir ton istenirse
  önce sorulur.

- **KARAR (Faz 12):** Turkuazın "durum gösteren" görevleri `#0b7c71`'e
  taşındı: aktif nav çizgisi ve metni, akordeon `+`, yazmarka soyadı.
  *Gerekçe:* `#10afa0` açık gri üzerinde 2.51:1; WCAG 1.4.11 durum
  göstergesi için 3:1, metin için 4.5:1 istiyor. Dekoratif turkuaz
  (eyebrow çizgisi, kart ikonu, madde imi, hover) `#10afa0` kaldı.
  *Gözden geçirilecek:* hayır, ölçüm kesin.

- **KARAR (Faz 12):** Birincil butonun hover'ı için yeni renk üretilmedi;
  paletteki ikincil metin tonu (`#5a6169`) dolgu olarak kullanıldı — beyaz
  metinle 6.27:1. Outline buton hover'da koyu dolguya dönüyor, çünkü
  "beyaza dolma" açık gri bölümlerde görünmüyordu.
  *Gözden geçirilecek:* hayır.

- **KARAR (Faz 12):** Yazmarkanın `aria-label`'ı "Ana sayfa" değil
  "Dt. Ömer Lütfü Yıldız — Ana sayfa". *Gerekçe:* WCAG 2.5.3 (Label in Name)
  görünen metnin erişilebilir adın içinde geçmesini istiyor; yalnız
  "Ana sayfa" yazıldığında sesle kontrol kullanan biri marka adını
  söyleyerek linki tetikleyemiyordu. *Gözden geçirilecek:* hayır.

- **KARAR (Faz 12):** `theme-color` `#10afa0` yerine `#f5f5f5`.
  *Gerekçe:* mobil tarayıcı çubuğu header'ın hemen üstünde geniş bir turkuaz
  yüzey oluyordu; turkuazın geniş zeminden çekilmesi kararıyla çelişiyor.
  *Gözden geçirilecek:* evet, marka rengi tarayıcı çubuğunda istenirse geri
  alınır.

- **KARAR:** Hero görseli Pexels'ten (Fr3nks, 305567), export'ta 0.45 parlaklığa
  karartıldı; overlay yalnızca marka tonu veriyor.
  *Gerekçe:* orijinal parlaklıkta beyaz metni AA'da tutmak için overlay alpha
  0.88 gerekiyordu, bu da görseli tamamen yutup "diş kliniği" mesajını yok
  ediyordu. Karartılmış dosyanın gerçek pikselleri üzerinde en kötü durum,
  Faz 12'nin nötr gri overlay'iyle beyaz metinde **8.52:1**.
  *Gözden geçirilecek:* müşterinin kendi hero fotoğrafı gelince.

- **KARAR:** Hero'daki iki buton beyaz dolgulu + beyaz kenarlıklı şeffaf;
  turkuaz outline hero'da kullanılmadı. *Gerekçe:* turkuaz overlay üzerinde
  zeminden ayrışmıyordu. Faz 12'de cam dolgu tamamen kaldırıldı, ikincil
  buton düz şeffaf oldu. *Gözden geçirilecek:* hayır.

- **KARAR:** Odak halkası `#10afa0` yerine `#0b7c71`.
  *Gerekçe:* `#10afa0` beyaz üstünde 2.74:1; WCAG 1.4.11'in UI bileşeni için
  istediği 3:1'i geçmiyor. *Gözden geçirilecek:* hayır, ölçüm kesin.

- **KARAR:** "İki ayrı tedavi odası" ifadesi kullanıldı.
  *Gerekçe:* müşterinin kendi fotoğraflarında (portfolio-2/2 ve 2/5) belirgin
  biçimde farklı iki tedavi odası görünüyor. Metinde yazılı kaynak yok, görsel
  kanıta dayanıyor. *Gözden geçirilecek:* evet, müşteri teyit etmeli.

- **KARAR:** Klinik bölümünden "toplu taşımaya yakın" ve "asansörle erişim"
  ifadeleri çıkarıldı. *Gerekçe:* hiçbir kaynakta doğrulanmıyor.
  *Gözden geçirilecek:* müşteri doğrularsa eklenebilir.

- ~~**KARAR:** Tedavi kartları fotoğrafsız, ikon + metin.~~ — Faz 11'de
  **nesne/model/ekipman** karesi bulunup eklendi (renk skalası, 3B model,
  implant, artikülatör, kaplama). Kuralın kendisi geçerli: öncesi/sonrası ve
  hasta ağzı görseli hiçbir koşulda konmaz.

- **KARAR:** `background/3.jpg` (kliniğin gerçek bekleme salonu) hero'da
  kullanılmadı. *Gerekçe:* "otel lobisi" okuyor, ilk ekranda diş hekimliği
  mesajı vermiyor. Aynı mekân `clinic-lounge` olarak yayında.
  *Gözden geçirilecek:* evet.

- **KARAR:** İletişim formu konmadı.
  *Gerekçe:* mevcut sitedeki `email.php` GitHub Pages'te çalışmaz; mesajı
  sessizce yutan form, formsuz sayfadan kötüdür. *Gözden geçirilecek:* harici
  servis (Formspree vb.) onaylanırsa eklenebilir — harici bağımlılık kuralına
  istisna açar.

- **KARAR:** Alt çizgiyle başlayan kök dosyalar (`_*`) `.gitignore`'da.
  *Gerekçe:* ölçüm ve ekran görüntüsü araçları; public Pages adresinde
  durmamalı. *Gözden geçirilecek:* hayır.

- **KARAR (Faz 11'de aşıldı, aşağıya bakınız):** JS bütçesi 8 KB'den
  9.03 KB'ye çıktı (ham). *Gerekçe:* çerez
  bildirimi sonradan istendi; bütçeye sığdırmanın tek yolu scrollspy'ı
  (`aria-current`) silmek ya da yorumları tamamen boşaltmaktı. İkisi de
  çalışan bir a11y davranışını veya okunabilirliği feda ediyordu. Dosya
  minify edilmiyor; GitHub Pages gzip ile servis ettiği için hat üzerindeki
  boyut **2.70 KB**. *Gözden geçirilecek:* bütçe ham dosya yerine gzip
  üzerinden tanımlanabilir.

- ~~**KARAR:** Yasal sayfaların banner'ında fotoğraf kullanılmadı; marka
  renginden dokulu bir blok kuruldu.~~ — Faz 11'de fotoğraflı banner'a
  dönüldü. Geçersiz.

- **KARAR (Faz 10, Faz 12'de güncellendi):** Turkuaz kart ikonu **dolguları**
  kaldırıldı — 3 rem'lik dolu kutular turkuazı geniş yüzeye taşıyordu. İkonlar
  çizgi ikon; Faz 12'de çizgi rengi `--color-primary` oldu (dekoratif, yanında
  aynı bilgiyi taşıyan başlık var). Dolu turkuaz kutu geri gelmez.
  *Gözden geçirilecek:* hayır.

- ~~**KARAR (Faz 10):** Kaydırınca header beyaz cam yerine kömür siyahına
  oturuyor.~~ — Faz 12'de siyah kalktı, Faz 13'te header sayfa başında şeffaf
  olup kaydırınca `--color-bg-alt`'a oturur oldu. Geçersiz.

- **KARAR (Faz 11):** Slider sütun genişlikleri `minmax(0, %)` değil sabit
  yüzde. *Gerekçe:* `minmax(0, …)` kartların küçülmesine izin verdiği için
  beş kart ekrana sığıyor ve kaydırma hiç oluşmuyordu.
  *Gözden geçirilecek:* hayır.

- **KARAR (Faz 11):** JS bütçesi 10.6 KB (ham), gzip'li 3.2 KB. Slider
  eklendikçe ham dosya 8 KB hedefinden uzaklaştı. *Gerekçe:* kütüphane
  kullanılmadı, kaydırma tamamen CSS scroll-snap; JS yalnızca ok butonlarını
  sürüyor. Alternatif bir slider kütüphanesi en az 10 katı olurdu.
  *Gözden geçirilecek:* bütçe gzip üzerinden tanımlanmalı.

- ~~**KARAR (Faz 11):** Yasal sayfa banner'ında üç sayfa için tek görsel.~~ —
  sonra her sayfaya kendi görseli verildi. Geçersiz.
