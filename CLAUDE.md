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

### Palet (mevcut siteden korundu)
| Token | Değer | Kullanım |
|---|---|---|
| `--color-primary` | `#10afa0` | Dolgu, ikon, buton zemini. **Metin için kullanılmaz** |
| `--color-primary-text` | `#0b7c71` | Beyaz üstünde metin/link (AA 5.1:1) |
| `--color-primary-dark` | `#0c8a7e` | Hover, koyu turkuaz blok |
| `--color-primary-deep` | `#08635a` | Hero overlay tabanı |
| `--color-ink` | `#2b313f` | Başlık, koyu bölüm zemini |
| `--color-ink-soft` | `#35404e` | Footer zemini |
| `--color-text` | `#515c6a` | Gövde metni |
| `--color-surface` | `#f6f6f6` | Bölüm arka planı |
| `--color-surface-alt` | `#eef8f7` | Turkuaz tonlu açık zemin |
| `--color-border` | `#e3e8eb` | Ayırıcı |

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
width/height, JS < 8 KB, 6 kırılımda yatay taşma sıfır
(1440/1280/1024/768/390/360).

## Git
Conventional Commits (İngilizce). `git add -A` ve `git add .` YASAK.
Ayrı concern = ayrı commit. Commit/push yalnızca kullanıcı isteyince.

## Yerel geliştirme
`python3 -m http.server 8091` → http://localhost:8091

## Deploy
GitHub Pages, `gaviaworks-dev/omerlutfuyildiz` public repo, `main` / root,
kökte `.nojekyll`. Yayın: https://gaviaworks-dev.github.io/omerlutfuyildiz/

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
- **Logo dosyası müşteriden istenecek**; şimdilik tipografik yazmarka
  (Poppins, "Yıldız" turkuaz aksanlı).
- **Çalışma saatleri bilgisi yok**, İletişim bölümünde konmadı.
- **Tedavi süreci akordeon metinleri** mevcut sitede yok; prosedürel ve
  garantisiz yazıldı, müşteri onayı bekliyor.
- **`og:image`** Pages adresi kesinleşince mutlak URL'e çevrilecek.
- **Tedavi kartı fotoğrafları** yok; kartlar ikon + metin. Stok konmadı çünkü
  bu başlıkların stok karşılıkları öncesi/sonrası ve hasta ağzı görselleri.
- **Sosyal medya hesabı** doğrulanmadı; mevcut sitedeki ikonların href'i boştu,
  footer'a konmadı.
