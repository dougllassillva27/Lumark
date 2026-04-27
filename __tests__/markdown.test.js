import { describe, it, expect } from 'vitest';
import { renderizarMarkdown } from '../src/lib/markdown';

describe('Parser Markdown (markdown-it)', () => {
  it('deve retornar string vazia se não houver conteúdo', () => {
    expect(renderizarMarkdown(null)).toBe('');
    expect(renderizarMarkdown('')).toBe('');
  });

  it('deve renderizar headings corretamente', () => {
    const html = renderizarMarkdown('# Título 1');
    expect(html).toContain('<h1>Título 1</h1>');
  });

  it('deve renderizar negrito e itálico', () => {
    const html = renderizarMarkdown('Texto **negrito** e *itálico*');
    expect(html).toContain('<strong>negrito</strong>');
    expect(html).toContain('<em>itálico</em>');
  });

  it('deve renderizar links automaticamente via linkify', () => {
    const html = renderizarMarkdown('Visite google.com');
    expect(html).toContain('<a href="http://google.com"');
  });
});
