import DOMPurify from 'dompurify';

// Formulários e reposicionamento não fazem parte da formatação de um documento:
// mantê-los deixa o conteúdo criar campos submetíveis e sobrepor a interface do app.
const TAGS_PROIBIDAS = [
  'form',
  'input',
  'button',
  'select',
  'option',
  'textarea',
  'label',
  'style',
  'link',
  'meta',
];

const ATRIBUTOS_PROIBIDOS = ['style', 'action', 'formaction', 'method', 'target'];

export function sanitizarHtml(htmlSujo) {
  if (!htmlSujo) return '';
  return DOMPurify.sanitize(htmlSujo, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: TAGS_PROIBIDAS,
    FORBID_ATTR: ATRIBUTOS_PROIBIDOS,
  });
}
