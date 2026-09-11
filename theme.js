/* Единая тема концепции 1 «Прилавок» для всех страниц макета. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink:     '#0E1526',
        ink2:    '#1B2440',
        accent:  '#E22B2B',   // фирменный красный из логотипа
        accent2: '#C01F1F',
        surface: '#F2F4F8',
        line:    '#E3E7EF',
        ok:      '#12805C',
      },
      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        sans:    ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,21,38,.06), 0 8px 24px -12px rgba(14,21,38,.18)',
      },
    }
  }
}
