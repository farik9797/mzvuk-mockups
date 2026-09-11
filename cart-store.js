/* Общее состояние корзины для макетов концепции 1.
   Хранится в localStorage, чтобы корзина и оформление показывали одно и то же.
   В бою это место занимает backend: состав заказа и остатки приходят из 1С. */
const Cart = (() => {
  const KEY = 'mzvuk-cart-v1';

  const DEFAULT = [
    { n:'Электрогитара Fender Player II Stratocaster MN Black', b:'Fender', p:3190, o:3590, g:'product-guitar-electric', s:1, q:1, sku:'FEN-PL2-ST-BK', c1:'00-0012845' },
    { n:'Микрофон Shure SM58-LCE',                              b:'Shure',  p:449,  o:0,    g:'product-mic-dynamic',     s:1, q:2, sku:'SHU-SM58-LCE', c1:'00-0004417' },
    { n:'Стойка микрофонная K&M 210/9',                         b:'K&M',    p:129,  o:169,  g:'product-mic-stand',       s:1, q:1, sku:'KM-210-9-BK',  c1:'00-0009123' },
  ];

  let items = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* приватный режим — работаем в памяти */ }
    return JSON.parse(JSON.stringify(DEFAULT));
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* см. выше */ }
    paintBadge();
  }

  const money = v => Math.round(v).toLocaleString('ru-RU').replace(/,/g, ' ');

  function totals(promoPercent = 0) {
    const goods = items.reduce((s, it) => s + it.p * it.q, 0);
    const full  = items.reduce((s, it) => s + (it.o || it.p) * it.q, 0);
    const qty   = items.reduce((s, it) => s + it.q, 0);
    const promo = promoPercent ? Math.round(goods * promoPercent / 100) : 0;
    return { goods, full, qty, sale: full - goods, promo, total: goods - promo };
  }

  function paintBadge() {
    const qty = totals().qty;
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = qty);
  }

  return {
    money, totals, paintBadge,
    items: () => items,
    add(p) {
      const same = items.find(it => it.n === p.n);
      same ? same.q += (p.q || 1) : items.push({ ...p, q: p.q || 1 });
      save();
    },
    remove(i) { items.splice(i, 1); save(); },
    setQty(i, d) { items[i].q = Math.max(1, items[i].q + d); save(); },
    clear() { items = []; save(); },
    reset() { items = JSON.parse(JSON.stringify(DEFAULT)); save(); },
  };
})();

document.addEventListener('DOMContentLoaded', () => Cart.paintBadge());
