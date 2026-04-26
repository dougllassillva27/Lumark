import { renderizarMarkdown } from './markdown';
import { sanitizarHtml } from './sanitizacao';

export function exportarDocumentoHtml(documentoAtivo) {
  if (!documentoAtivo?.conteudo) {
    console.warn('[EXPORTAÇÃO] Abortada: Documento ativo ou conteúdo inexistente.');
    return;
  }

  console.log('[EXPORTAÇÃO] Iniciando exportação HTML para:', documentoAtivo.nome);

  try {
    const htmlBruto = renderizarMarkdown(documentoAtivo.conteudo);
    const htmlSeguro = sanitizarHtml(htmlBruto);
    console.log('[EXPORTAÇÃO] Markdown renderizado e sanitizado com sucesso.');

    const template = `<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${documentoAtivo.nome}</title>\n<style>\nbody { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #333; }\npre { background: #f4f4f4; padding: 1rem; overflow-x: auto; border-radius: 4px; }\ncode { font-family: monospace; }\nimg { max-width: 100%; }\nblockquote { border-left: 4px solid #ccc; margin-left: 0; padding-left: 1rem; color: #666; }\ntable { border-collapse: collapse; width: 100%; }\nth, td { border: 1px solid #ddd; padding: 8px; text-align: left; }\n</style>\n</head>\n<body>\n${htmlSeguro}\n</body>\n</html>`;

    const blob = new Blob([template], { type: 'text/html;charset=utf-8' });
    console.log('[EXPORTAÇÃO] Blob criado. Tamanho:', blob.size, 'bytes');

    if (typeof URL.createObjectURL !== 'function') {
      throw new Error('A API URL.createObjectURL não é suportada ou foi sobrescrita neste navegador.');
    }

    const url = URL.createObjectURL(blob);
    console.log('[EXPORTAÇÃO] URL de objeto criada:', url);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentoAtivo.nome.replace(/\.[^/.]+$/, '')}.html`;

    console.log('[EXPORTAÇÃO] Disparando evento de clique para download:', a.download);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    console.log('[EXPORTAÇÃO] Processo concluído e URL revogada na memória.');
  } catch (erro) {
    console.error('[EXPORTAÇÃO] Falha crítica detectada:', erro);
    alert(`Erro ao exportar o documento: ${erro.message}`);
  }
}
