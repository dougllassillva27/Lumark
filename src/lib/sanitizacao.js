import DOMPurify from 'dompurify';

export function sanitizarHtml(htmlSujo) {
  if (!htmlSujo) return '';
  return DOMPurify.sanitize(htmlSujo, {
    USE_PROFILES: { html: true },
  });
}
