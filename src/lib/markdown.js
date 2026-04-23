import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

export function renderizarMarkdown(conteudoMarkdown) {
  if (!conteudoMarkdown) return '';
  return md.render(conteudoMarkdown);
}
