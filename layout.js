/* Общая обвязка второстепенных страниц концепции 1: плашка макета, служебная полоса,
   шапка, хлебные крошки и подвал. В продакшене это серверный шаблон (include/layout),
   здесь — один JS, чтобы правка шапки применялась сразу ко всем страницам. */
const Layout = (() => {
  const NAV = [
    ['Каталог',           'catalog.html'],
    ['О компании',        'about.html'],
    ['Услуги',            'services.html'],
    ['Оплата и доставка', 'delivery.html'],
    ['Сертификаты',       'certificates.html'],
    ['Вопрос-ответ',      'faq.html'],
    ['Новости',           'news.html'],
    ['Контакты',          'contacts.html'],
  ];

  const FOOT = [
    { t: 'Каталог', l: [['Гитары и басы','catalog.html'], ['Клавишные','catalog.html'], ['Ударные','catalog.html'],
                        ['Микрофоны','catalog.html'], ['Звук для сцены','catalog.html'], ['Свет и эффекты','catalog.html']] },
    { t: 'Покупателям', l: [['Оплата и доставка','delivery.html'], ['Гарантия и возврат','delivery.html#warranty'],
                            ['Рассрочка','delivery.html#payment'], ['Корзина','cart.html'],
                            ['Вопрос-ответ','faq.html'], ['Отзывы','concept-1-prilavok.html#reviews']] },
    { t: 'Компания', l: [['О компании','about.html'], ['Услуги','services.html'], ['Новости и статьи','news.html'],
                         ['Сертификаты, документы','certificates.html'], ['Партнёры','about.html#partners'],
                         ['Контакты','contacts.html']] },
  ];

  const social = (color, cls) => ['telegram','instagram','youtube'].map(s => `
    <a href="#" aria-label="${s}" class="${cls}"><img src="https://cdn.simpleicons.org/${s}/${color}" alt="" class="w-4 h-4"></a>`).join('');

  function head({ concept, note, crumbs = [] }) {
    return `
<div class="bg-ink text-white/70 text-[12px] tracking-wide">
  <div class="max-w-[1320px] mx-auto px-4 py-2 flex items-center justify-between gap-4">
    <span class="font-display text-white text-[11px] uppercase tracking-[.18em]">Концепция 1 · ${concept}</span>
    <span class="hidden sm:block">${note}</span>
    <a href="concept-1-prilavok.html" class="hover:text-white transition-colors duration-200 cursor-pointer">← на главную макета</a>
  </div>
</div>

<div class="border-b border-line bg-surface/70">
  <div class="max-w-[1320px] mx-auto px-4 h-10 flex items-center justify-between text-[13px] text-ink/70">
    <nav class="hidden lg:flex items-center gap-5">
      ${NAV.slice(1).map(([n, h]) => `<a href="${h}" class="hover:text-accent transition-colors duration-200 cursor-pointer">${n}</a>`).join('')}
    </nav>
    <div class="flex items-center gap-4 ml-auto">
      <span class="hidden sm:flex items-center gap-1.5"><i data-lucide="clock" class="w-4 h-4"></i> Пн–Сб 10:00–19:00</span>
      <a href="mailto:sales@mzvuk.by" class="hidden lg:flex items-center gap-1.5 hover:text-accent transition-colors duration-200 cursor-pointer"><i data-lucide="mail" class="w-4 h-4"></i> sales@mzvuk.by</a>
      <div class="flex items-center gap-1">${social('0E1526', 'w-7 h-7 grid place-items-center rounded hover:bg-line transition-colors duration-200 cursor-pointer')}</div>
    </div>
  </div>
</div>

<header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-line">
  <div class="max-w-[1320px] mx-auto px-4 h-[72px] flex items-center gap-4">
    <a href="concept-1-prilavok.html" class="flex items-center shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200">
      <img src="img/logo.png" alt="М-ЗВУК" class="h-9 w-auto">
    </a>
    <a href="catalog.html" class="hidden md:flex items-center gap-2 h-11 px-4 rounded-lg bg-accent text-white font-semibold text-[14px] hover:bg-accent2 transition-colors duration-200 cursor-pointer shrink-0">
      <i data-lucide="menu" class="w-[18px] h-[18px]"></i> Каталог
    </a>
    <form class="hidden md:block flex-1 min-w-0" onsubmit="return false">
      <label class="relative flex items-center h-11 rounded-lg border border-line bg-surface focus-within:border-ink focus-within:bg-white transition-colors duration-200">
        <i data-lucide="search" class="w-[18px] h-[18px] absolute left-3.5 text-ink/40"></i>
        <input type="search" placeholder="Поиск по каталогу" class="w-full h-full bg-transparent pl-11 pr-4 text-[14px] outline-none placeholder:text-ink/40">
      </label>
    </form>
    <div class="flex items-center gap-1 shrink-0">
      <a href="tel:+375333772873" class="hidden xl:block text-right mr-3 cursor-pointer group">
        <span class="block font-display text-[15px] leading-none group-hover:text-accent transition-colors duration-200">+375 (33) 377-28-73</span>
        <span class="block text-[11px] text-ink/45 mt-1">заказать звонок</span>
      </a>
      <button class="w-11 h-11 grid place-items-center rounded-lg hover:bg-surface transition-colors duration-200 cursor-pointer" aria-label="Избранное"><i data-lucide="heart" class="w-[20px] h-[20px]"></i></button>
      <a href="cart.html" class="relative w-11 h-11 grid place-items-center rounded-lg bg-ink text-white hover:bg-accent transition-colors duration-200 cursor-pointer" aria-label="Корзина">
        <i data-lucide="shopping-cart" class="w-[20px] h-[20px]"></i>
        <span id="cart-count" class="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-accent text-white text-[10px] grid place-items-center font-bold ring-2 ring-white">3</span>
      </a>
    </div>
  </div>
  <div class="md:hidden border-t border-line">
    <nav class="max-w-[1320px] mx-auto px-4 py-2.5 flex gap-4 overflow-x-auto text-[13px] whitespace-nowrap">
      ${NAV.map(([n, h]) => `<a href="${h}" class="hover:text-accent transition-colors duration-200 cursor-pointer">${n}</a>`).join('')}
    </nav>
  </div>
</header>

${crumbs.length ? `
<nav class="max-w-[1320px] mx-auto px-4 flex flex-wrap items-center gap-2 py-4 text-[13px] text-ink/50" aria-label="Хлебные крошки">
  ${crumbs.map(([n, h], i) => (h
      ? `<a href="${h}" class="hover:text-accent transition-colors duration-200 cursor-pointer">${n}</a>`
      : `<span class="text-ink">${n}</span>`) +
      (i < crumbs.length - 1 ? '<i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>' : '')).join('')}
</nav>` : ''}`;
  }

  function foot() {
    return `
<footer class="bg-ink text-white/70 mt-20">
  <div class="max-w-[1320px] mx-auto px-4 py-14 grid md:grid-cols-2 lg:grid-cols-5 gap-10">
    <div class="lg:col-span-2">
      <div class="flex items-center"><img src="img/logo.png" alt="М-ЗВУК" class="h-9 w-auto"></div>
      <p class="mt-4 text-[14px] leading-relaxed max-w-[320px]">Музыкальные инструменты, звуковое и световое оборудование для музыкантов, студий, школ и площадок Беларуси.</p>
      <p class="mt-4 text-[14px]"><a href="tel:+375152623333" class="hover:text-accent transition-colors duration-200 cursor-pointer">+375 (152) 62-33-33</a><br>
      <a href="mailto:sales@mzvuk.by" class="hover:text-accent transition-colors duration-200 cursor-pointer">sales@mzvuk.by</a></p>
      <div class="mt-5 flex gap-2">${social('FFFFFF', 'w-9 h-9 grid place-items-center rounded-lg bg-white/10 hover:bg-accent transition-colors duration-200 cursor-pointer')}</div>
    </div>
    ${FOOT.map(col => `
    <div>
      <h3 class="font-display text-white text-[13px] uppercase tracking-[.14em]">${col.t}</h3>
      <ul class="mt-4 space-y-2.5 text-[14px]">
        ${col.l.map(([n, h]) => `<li><a href="${h}" class="hover:text-accent transition-colors duration-200 cursor-pointer">${n}</a></li>`).join('')}
      </ul>
    </div>`).join('')}
  </div>
  <div class="border-t border-white/10">
    <div class="max-w-[1320px] mx-auto px-4 py-5 flex flex-col sm:flex-row gap-2 justify-between text-[13px] text-white/45">
      <span>© 2026 ООО «Арт-Медиа Трейд», УНП 590830372 · г. Гродно, ул. 17 Сентября, 49-11</span>
      <span>Макет-концепция · фото: Wikimedia Commons, CC BY-SA (см. img/CREDITS.md)</span>
    </div>
  </div>
</footer>`;
  }

  return {
    render(opts) {
      document.body.insertAdjacentHTML('afterbegin', head(opts));
      document.body.insertAdjacentHTML('beforeend', foot());
      if (window.lucide) lucide.createIcons();
      if (window.Cart) Cart.paintBadge();
    }
  };
})();
