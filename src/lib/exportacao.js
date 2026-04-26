import { renderizarMarkdown } from './markdown';
import { sanitizarHtml } from './sanitizacao';

export function exportarDocumentoHtml(documentoAtivo) {
  if (!documentoAtivo?.conteudo) return;

  const htmlBruto = renderizarMarkdown(documentoAtivo.conteudo);
  const htmlSeguro = sanitizarHtml(htmlBruto);

  const template = `<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${documentoAtivo.nome}</title>\n<style>\nbody { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #333; }\npre { background: #f4f4f4; padding: 1rem; overflow-x: auto; border-radius: 4px; }\ncode { font-family: monospace; }\nimg { max-width: 100%; }\nblockquote { border-left: 4px solid #ccc; margin-left: 0; padding-left: 1rem; color: #666; }\ntable { border-collapse: collapse; width: 100%; }\nth, td { border: 1px solid #ddd; padding: 8px; text-align: left; }\n</style>\n</head>\n<body>\n${htmlSeguro}\n</body>\n</html>`;

  const blob = new Blob([template], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${documentoAtivo.nome.replace(/\.[^/.]+$/, '')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
