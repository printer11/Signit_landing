# SignIT Landing Page

Landing page dla SignIT - produktu z ekosystemu EasyPanel, który domyka proces sprzedaży od wyboru usługi do podpisanej umowy i umówionej realizacji.

## Stack Technologiczny

- **HTML5** - semantyczny markup
- **CSS3** - custom properties (CSS variables), Grid, Flexbox
- **Vanilla JavaScript** - bez frameworków, czysta funkcjonalność
- **Fonts**: Space Grotesk (nagłówki) + Inter (body text)

## Struktura Plików

```
signit_landing/
├── index.html          # Główna strona (z optymalizacją SEO i PageSpeed)
├── styles.css          # Style (bazowane na EasyPanel design system)
├── script.js           # JavaScript (smooth scroll, FAQ, formularze)
├── static/
│   └── img/
│       ├── AO_example.jpg    # Screenshot konfiguratora pakietów
│       └── cal_com.png       # Screenshot kalendarza rezerwacji
├── README.md           # Ten plik
├── robots.txt          # SEO
├── sitemap.xml         # Mapa strony
└── .gitignore          # Git ignore rules
```

## Sekcje Strony

1. **Hero** - główny przekaz z CTA do wczesnego dostępu
2. **Problem** - porównanie before/after (dziś vs. z SignIT)
3. **Jak to działa** - 4 kroki w układzie zig-zag ze screenshotami
4. **Dla kogo** - lista "pasuje jeśli..." z podziałem TAK/NIE
5. **Czym to NIE jest** - myth busting (nie DocuSign, nie CRM, nie e-commerce)
6. **Ekosystem** - pozycjonowanie względem Address & Offers
7. **Wczesny dostęp** - formularz zapisu (główna konwersja)
8. **FAQ** - 5 najczęstszych pytań w formie accordion
9. **Final CTA** - powtórzony formularz zapisu
10. **Footer** - linki do produktów, firma, legal

## Konfiguracja Przed Publikacją

### 1. Webhook URL

W pliku `script.js` zamień placeholder na realny webhook n8n:

```javascript
// Linia 7
const WEBHOOK_URL = 'TODO_N8N_WEBHOOK_URL';
```

Zamień na:
```javascript
const WEBHOOK_URL = 'https://twoj-webhook.n8n.cloud/webhook/signit-early-access';
```

### 2. Google Analytics / Meta Pixel (opcjonalnie)

Jeśli chcesz dodać tracking, dodaj w `<head>` sekcji `index.html`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXX');</script>
<!-- End Google Tag Manager -->
```

### 3. Favicon

Obecnie strona używa favicon z easypanel.com.pl. Jeśli chcesz osobny favicon dla SignIT:

1. Dodaj plik `favicon.png` do katalogu głównego
2. W `index.html` zmień linię 11:
   ```html
   <link rel="icon" type="image/png" href="favicon.png">
   ```

## Wdrożenie

### Netlify (polecane)

1. Stwórz nowe repozytorium Git:
   ```bash
   cd signit_landing
   git init
   git add .
   git commit -m "Initial commit: SignIT landing page"
   ```

2. Wypchnij do GitHub:
   ```bash
   git remote add origin https://github.com/twoj-user/signit-landing.git
   git push -u origin main
   ```

3. W Netlify:
   - New site from Git → wybierz repo
   - Build settings: (zostaw puste - to statyczny HTML)
   - Deploy

4. Skonfiguruj domenę `signit.easypanel.com.pl`:
   - Netlify: Domain settings → Add custom domain
   - DNS: CNAME `signit` → `twoja-strona.netlify.app`

### Alternatywnie: Ręczne wdrożenie

Po prostu skopiuj wszystkie pliki (`index.html`, `styles.css`, `script.js`, `robots.txt`) do katalogu głównego hostingu i skonfiguruj domenę.

## Testowanie Lokalne

Otwórz `index.html` bezpośrednio w przeglądarce lub użyj prostego serwera HTTP:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8000
```

Potem otwórz: `http://localhost:8000`

## Responsywność

Strona jest w pełni responsywna z breakpointami:

- **Desktop**: > 968px (full grid layouts)
- **Tablet**: 640px - 968px (single column, stacked)
- **Mobile**: < 640px (mobile-first, full-width buttons)

## SEO & Performance

### Meta Tags & SEO
- ✅ **Canonical URL** - https://signit.easypanel.com.pl/
- ✅ **Meta description** - zoptymalizowany opis (155 znaków)
- ✅ **Open Graph tags** - pełne tagi dla Facebook
- ✅ **Twitter Cards** - summary_large_image
- ✅ **Structured Data (JSON-LD)** - Schema.org SoftwareApplication
- ✅ **Semantyczny HTML** (header, main, section, footer)
- ✅ **Hierarchiczne nagłówki** (H1, H2, H3)
- ✅ **Alt text** dla wszystkich obrazów
- ✅ **robots.txt** + **sitemap.xml**

### PageSpeed Optimizations
- ✅ **DNS Prefetch & Preconnect** - dla Google Fonts i zewnętrznych zasobów
- ✅ **Preload critical resources** - styles.css i fonty
- ✅ **Defer JavaScript** - script.js ładowany z defer
- ✅ **Font display: swap** - zapobiega FOIT (Flash of Invisible Text)
- ✅ **Lazy loading** - obrazy poza viewport ładowane lazy
- ✅ **Eager loading** - tylko hero image dla LCP
- ✅ **Theme color** - #0F4C3A dla mobile browsers
- ✅ **Minimal dependencies** - zero frameworków, czyste HTML/CSS/JS

### Oczekiwane wyniki PageSpeed Insights:
- **Performance**: 90+ (desktop), 80+ (mobile)
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## Design System

Strona używa tych samych CSS variables co easypanel.com.pl:

```css
--primary: #0F4C3A      /* Zielony - główny kolor marki */
--accent: #FF6B35       /* Pomarańczowy - akcenty, CTA */
--success: #26D0CE      /* Turkusowy - success states */
--background: #FAFAF8   /* Jasne tło */
--text-primary: #2C3E50 /* Ciemny tekst */
--text-secondary: #64748B /* Szary tekst */
```

## Zgodność z Przeglądarkami

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Android 90+

Używane nowoczesne API:
- CSS Grid & Flexbox
- CSS Custom Properties
- IntersectionObserver (scroll animations)
- Fetch API (form submission)

## Kontakt

W przypadku pytań lub problemów: kontakt@easypanel.com.pl

---

© 2026 EasyPanel. Wszystkie prawa zastrzeżone.
