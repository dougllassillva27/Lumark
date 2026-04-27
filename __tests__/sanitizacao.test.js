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
});
