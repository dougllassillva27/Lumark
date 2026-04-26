import { useEffect } from 'react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import { exportarDocumentoHtml } from '../lib/exportacao';
import { copiarParaClipboard } from '../lib/clipboard';
import { renderizarMarkdown } from '../lib/markdown';
import { sanitizarHtml } from '../lib/sanitizacao';

export function useAtalhos() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!documentoAtivo) return;

      if (e.ctrlKey && e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'c':
            copiarParaClipboard(documentoAtivo.conteudo);
            break;
          case 'h':
            copiarParaClipboard(sanitizarHtml(renderizarMarkdown(documentoAtivo.conteudo)));
            break;
          case 'e':
            exportarDocumentoHtml(documentoAtivo);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [documentoAtivo]);
}
