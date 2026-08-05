/* ==========================================================================
   Dt. Ömer Lütfü Yıldız — Etkileşimler
   Bağımlılık yok. DOM seçimi data-* öznitelikleri üzerinden yapılır,
   stil sınıflarına tutunulmaz.
   ========================================================================== */

(function () {
  'use strict';

  var FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /* ------------------------------------------------------------------------
     1. Header — hero üzerinde şeffaf, kaydırınca opak
     ---------------------------------------------------------------------- */

  function initHeaderState() {
    var header = document.querySelector('[data-header]');
    if (!header) return;

    var threshold = 40;
    var ticking = false;

    function apply() {
      header.classList.toggle('site-top--scrolled', window.scrollY > threshold);
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------------
     2. Mobil menü — aria-expanded, ESC, focus trap, dış tıklama
     ---------------------------------------------------------------------- */

  function initMobileNav() {
    var header = document.querySelector('[data-header]');
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav]');
    if (!header || !toggle || !nav) return;

    var isOpen = false;
    var lastFocused = null;

    function focusableItems() {
      return Array.prototype.filter.call(
        nav.querySelectorAll(FOCUSABLE),
        function (el) {
          return el.offsetParent !== null;
        }
      );
    }

    function open() {
      if (isOpen) return;
      isOpen = true;
      lastFocused = document.activeElement;
      nav.setAttribute('data-open', 'true');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Menüyü kapat');
      header.classList.add('site-top--menu-open');
      document.body.classList.add('is-nav-open');

      var items = focusableItems();
      if (items.length) items[0].focus();
    }

    function close(returnFocus) {
      if (!isOpen) return;
      isOpen = false;
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Menüyü aç');
      header.classList.remove('site-top--menu-open');
      document.body.classList.remove('is-nav-open');

      if (returnFocus) {
        (lastFocused && lastFocused.focus ? lastFocused : toggle).focus();
      }
    }

    toggle.addEventListener('click', function () {
      if (isOpen) {
        close(true);
      } else {
        open();
      }
    });

    /* Menü içindeki bir bağlantıya gidildiğinde panel kapanır */
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) close(false);
    });

    document.addEventListener('keydown', function (event) {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
        return;
      }

      if (event.key !== 'Tab') return;

      /* Focus trap: odak paneli terk edemez */
      var items = focusableItems();
      if (!items.length) return;

      var first = items[0];
      var last = items[items.length - 1];
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

    /* Panel dışına tıklanınca kapan */
    document.addEventListener('click', function (event) {
      if (!isOpen) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      close(false);
    });

    /* Masaüstü genişliğine geçildiğinde panel durumu sıfırlanır */
    var desktop = window.matchMedia('(min-width: 64rem)');
    var onChange = function (event) {
      if (event.matches) close(false);
    };

    if (typeof desktop.addEventListener === 'function') {
      desktop.addEventListener('change', onChange);
    } else if (typeof desktop.addListener === 'function') {
      desktop.addListener(onChange);
    }
  }

  /* ------------------------------------------------------------------------
     3. Tedavi süreci akordeonu
     ---------------------------------------------------------------------- */

  function initAccordion() {
    var root = document.querySelector('[data-accordion]');
    if (!root) return;

    var triggers = Array.prototype.slice.call(
      root.querySelectorAll('.accordion__trigger')
    );
    if (!triggers.length) return;

    function setState(trigger, open) {
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (panel) panel.setAttribute('data-open', open ? 'true' : 'false');
    }

    /* Başlangıç durumu markup'tan okunur */
    triggers.forEach(function (trigger) {
      setState(trigger, trigger.getAttribute('aria-expanded') === 'true');
    });

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var willOpen = trigger.getAttribute('aria-expanded') !== 'true';
        triggers.forEach(function (other) {
          setState(other, other === trigger ? willOpen : false);
        });
      });

      /* Ok tuşlarıyla başlıklar arasında dolaşım */
      trigger.addEventListener('keydown', function (event) {
        var index = triggers.indexOf(trigger);
        var next = null;

        if (event.key === 'ArrowDown') next = triggers[index + 1] || triggers[0];
        else if (event.key === 'ArrowUp')
          next = triggers[index - 1] || triggers[triggers.length - 1];
        else if (event.key === 'Home') next = triggers[0];
        else if (event.key === 'End') next = triggers[triggers.length - 1];

        if (next) {
          event.preventDefault();
          next.focus();
        }
      });
    });
  }

  /* ---------------------------------------------------------------------- */

  function init() {
    document.documentElement.classList.add('js');
    initHeaderState();
    initMobileNav();
    initAccordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
