/* Etkileşimler — bağımlılık yok. DOM seçimi data-* ile. */

(function () {
  'use strict';

  var FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  var slice = Function.prototype.call.bind(Array.prototype.slice);

  /* 1. Header — hero üzerinde şeffaf, kaydırınca opak */
  function initHeaderState() {
    var header = document.querySelector('[data-header]');
    if (!header) return;

    var ticking = false;

    function apply() {
      header.classList.toggle('site-top--scrolled', window.scrollY > 40);
      ticking = false;
    }

    apply();
    window.addEventListener(
      'scroll',
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(apply);
      },
      { passive: true }
    );
  }

  /* 2. Mobil menü — ESC, focus trap, dış tıklama */
  function initMobileNav() {
    var header = document.querySelector('[data-header]');
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav]');
    if (!header || !toggle || !nav) return;

    var isOpen = false;
    var lastFocused = null;

    /* Gizli öğeler tuzağa girmesin */
    function items() {
      return slice(nav.querySelectorAll(FOCUSABLE)).filter(function (el) {
        return el.offsetParent !== null;
      });
    }

    function setOpen(open, returnFocus) {
      if (open === isOpen) return;
      isOpen = open;
      nav.setAttribute('data-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
      header.classList.toggle('site-top--menu-open', open);
      document.body.classList.toggle('is-nav-open', open);

      if (open) {
        /* Safari'de buton tıklamayla odak almaz; body yerine toggle
           saklanır ki ESC sonrası odak kaybolmasın. */
        var prev = document.activeElement;
        lastFocused = prev && prev !== document.body ? prev : toggle;
        /* Görünürlük filtresi geçiş sırasında boş dönebilir */
        var first = nav.querySelector(FOCUSABLE);
        if (first) first.focus();
      } else if (returnFocus) {
        lastFocused.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen, isOpen);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false, false);
    });

    document.addEventListener('click', function (event) {
      if (!isOpen) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setOpen(false, false);
    });

    document.addEventListener('keydown', function (event) {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false, true);
        return;
      }
      if (event.key !== 'Tab') return;

      var list = items();
      if (!list.length) return;
      var first = list[0];
      var last = list[list.length - 1];
      var active = document.activeElement;

      if (!nav.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    var desktop = window.matchMedia('(min-width: 64rem)');
    var reset = function (e) {
      if (e.matches) setOpen(false, false);
    };
    if (desktop.addEventListener) desktop.addEventListener('change', reset);
    else if (desktop.addListener) desktop.addListener(reset);
  }

  /* 3. Akordeon — başlangıç durumu markup'tan okunur */
  function initAccordion() {
    var root = document.querySelector('[data-accordion]');
    if (!root) return;

    var triggers = slice(root.querySelectorAll('.accordion__trigger'));
    if (!triggers.length) return;

    function setState(trigger, open) {
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (panel) panel.setAttribute('data-open', open ? 'true' : 'false');
    }

    triggers.forEach(function (trigger) {
      setState(trigger, trigger.getAttribute('aria-expanded') === 'true');

      trigger.addEventListener('click', function () {
        var willOpen = trigger.getAttribute('aria-expanded') !== 'true';
        triggers.forEach(function (other) {
          setState(other, other === trigger ? willOpen : false);
        });
      });

      trigger.addEventListener('keydown', function (event) {
        var i = triggers.indexOf(trigger);
        var next = null;
        if (event.key === 'ArrowDown') next = triggers[i + 1] || triggers[0];
        else if (event.key === 'ArrowUp')
          next = triggers[i - 1] || triggers[triggers.length - 1];
        else if (event.key === 'Home') next = triggers[0];
        else if (event.key === 'End') next = triggers[triggers.length - 1];
        if (!next) return;
        event.preventDefault();
        next.focus();
      });
    });
  }

  /* 4. Aktif menü maddesi — en çok görünen bölüm kazanır.
     Nav'da "Anasayfa" maddesi yok (yazmarka onun görevini üstlendi), bu
     yüzden hero ekrandayken hiçbir madde aktif değildir. */
  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;

    var links = slice(document.querySelectorAll('[data-nav] a[href^="#"]'));
    var byId = {};
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = id && document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      sections.push(section);
    });
    if (!sections.length) return;

    var ratios = {};

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ratios[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        var bestId = null;
        var best = 0;
        sections.forEach(function (section) {
          var r = ratios[section.id] || 0;
          if (r > best) {
            best = r;
            bestId = section.id;
          }
        });
        links.forEach(function (link) {
          link.removeAttribute('aria-current');
        });
        if (bestId) byId[bestId].setAttribute('aria-current', 'true');
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* 5. Bölüm girişi — fade-up. JS yoksa içerik görünür kalır. */
  function initReveal() {
    var items = slice(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    var reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.setAttribute('data-revealed', 'true');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-revealed', 'true');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* 6. Çerez bildirimi. Kabul kalıcı (localStorage), ret kalıcı değil
     (sessionStorage) — reddeden kullanıcının cihazında iz bırakmamak için.
     Depolama kapalıysa okuma 'unavailable' döner: bildirim gösterilmez,
     hata da atmaz. */
  function initCookieNotice() {
    var notice = document.querySelector('[data-cookie]');
    var accept = document.querySelector('[data-cookie-accept]');
    var reject = document.querySelector('[data-cookie-reject]');
    if (!notice || !accept || !reject) return;

    var KEY = 'omerlutfuyildiz:cookie-consent';

    function read() {
      try {
        return (
          window.localStorage.getItem(KEY) || window.sessionStorage.getItem(KEY)
        );
      } catch (error) {
        return 'unavailable';
      }
    }

    function applyOffset() {
      document.body.style.paddingBottom = notice.offsetHeight + 'px';
    }

    if (read()) return;

    notice.hidden = false;
    applyOffset();
    window.addEventListener('resize', applyOffset);

    /* Depolamaya erişimin kendisi de hata atabilir (tarayıcı ayarı),
       bu yüzden seçim try içinde yapılır. */
    function close(kind, value) {
      try {
        var store =
          kind === 'local' ? window.localStorage : window.sessionStorage;
        store.setItem(KEY, value);
      } catch (error) {
        /* Depolama yoksa bildirim yalnızca bu sayfada kapanır. */
      }
      notice.hidden = true;
      document.body.style.paddingBottom = '';
    }

    accept.addEventListener('click', function () {
      close('local', 'accepted');
    });

    reject.addEventListener('click', function () {
      close('session', 'rejected');
    });
  }

  /* 7. Tedavi şeridi — kaydırma CSS scroll-snap ile; JS yalnızca ok
     butonlarını sürer ve uçlarda devre dışı bırakır. */
  function initSlider() {
    var track = document.querySelector('[data-slider-track]');
    var prev = document.querySelector('[data-slider-prev]');
    var next = document.querySelector('[data-slider-next]');
    if (!track || !prev || !next) return;

    var reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Bir kart + aradaki boşluk kadar mesafe */
    function step() {
      var first = track.firstElementChild;
      if (!first) return track.clientWidth;
      var second = first.nextElementSibling;
      return second
        ? second.offsetLeft - first.offsetLeft
        : first.getBoundingClientRect().width;
    }

    function sync() {
      var max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max - 1;
    }

    function go(dir) {
      track.scrollBy({
        left: dir * step(),
        behavior: reduced ? 'auto' : 'smooth'
      });
    }

    prev.addEventListener('click', function () {
      go(-1);
    });
    next.addEventListener('click', function () {
      go(1);
    });

    var ticking = false;
    track.addEventListener(
      'scroll',
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          sync();
          ticking = false;
        });
      },
      { passive: true }
    );

    window.addEventListener('resize', sync);
    sync();
  }

  function init() {
    document.documentElement.classList.add('js');
    initHeaderState();
    initMobileNav();
    initAccordion();
    initScrollSpy();
    initReveal();
    initCookieNotice();
    initSlider();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
