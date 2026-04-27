import { useMemo } from 'react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import { renderizarMarkdown } from '../lib/markdown';
import { sanitizarHtml } from '../lib/sanitizacao';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import styles from './PreviewPane.module.css';

function PreviewPane() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);

  const ehJson = documentoAtivo?.nome?.toLowerCase().endsWith('.json');

  const htmlSeguro = useMemo(() => {
    if (!documentoAtivo?.conteudo) return '';
    if (ehJson) {
      return Prism.highlight(documentoAtivo.conteudo, Prism.languages.json, 'json');
    }
    const htmlBruto = renderizarMarkdown(documentoAtivo.conteudo);
    return sanitizarHtml(htmlBruto);
  }, [documentoAtivo?.conteudo, ehJson]);

  return (
    <div className={styles.container}>
      {ehJson ? (
        <pre className="language-json" style={{ margin: 0, borderRadius: '6px', minHeight: '100%' }}>
          <code dangerouslySetInnerHTML={{ __html: htmlSeguro }} />
        </pre>
      ) : (
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: htmlSeguro }} />
      )}
    </div>
  );
}

export default PreviewPane;
