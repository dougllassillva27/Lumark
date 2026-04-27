import { useEffect } from 'react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import { exportarDocumentoHtml } from '../lib/exportacao';
import { copiarParaClipboard } from '../lib/clipboard';
import { renderizarMarkdown } from '../lib/markdown';
import { sanitizarHtml } from '../lib/sanitizacao';
import { formatarJson } from '../lib/json';

export function useAtalhos() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);
  const setDocumentoAtivo = useDocumentoStore((state) => state.setDocumentoAtivo);

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
          case 'f':
            if (documentoAtivo.nome.toLowerCase().endsWith('.json')) {
              try {
                const formatado = formatarJson(documentoAtivo.conteudo);
                setDocumentoAtivo({ ...documentoAtivo, conteudo: formatado });
              } catch (err) {
                alert('JSON inválido. Não foi possível formatar.');
              }
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [documentoAtivo, setDocumentoAtivo]);
}
