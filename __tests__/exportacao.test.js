import { describe, it, expect, beforeEach } from 'vitest';
import { exportarDocumentoHtml } from '../src/lib/exportacao';

function documento(overrides = {}) {
  return {
    nome: 'notas.md',
    origem: 'upload',
    conteudo: '## Somente texto\n',
    tamanho: 20,
    dataAbertura: new Date().toISOString(),
    ...overrides,
  };
}

function lerBlob(blob) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => resolve(leitor.result);
    leitor.onerror = () => reject(leitor.error);
    leitor.readAsText(blob);
  });
}

describe('Exportação de HTML', () => {
  let capturados;

  beforeEach(() => {
    capturados = [];
    HTMLAnchorElement.prototype.click = () => {};
    URL.createObjectURL = (blob) => {
      capturados.push(blob);
      return 'blob:teste';
    };
    URL.revokeObjectURL = () => {};
  });

  it('não deve permitir injeção de markup pelo nome do documento', async () => {
    exportarDocumentoHtml(documento({ nome: '</title><script>alert(1)</script><title>notas.md' }));
    const html = await lerBlob(capturados[0]);

    expect(html).not.toContain('<script');
    expect(html).not.toContain('</title><script>');
    expect(html).toContain('&lt;/title&gt;');
  });

  it('deve manter o nome do documento no título quando é texto simples', async () => {
    exportarDocumentoHtml(documento({ nome: 'relatório final.md' }));
    const html = await lerBlob(capturados[0]);

    expect(html).toContain('<title>relatório final.md</title>');
  });

  it('deve continuar sanitizando o corpo exportado', async () => {
    exportarDocumentoHtml(documento({ conteudo: '<script>alert(1)</script>\n\n# Título\n' }));
    const html = await lerBlob(capturados[0]);

    expect(html).not.toContain('<script');
    expect(html).toContain('<h1>Título</h1>');
  });
});
