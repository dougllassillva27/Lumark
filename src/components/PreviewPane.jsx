import { useMemo } from 'react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import { renderizarMarkdown } from '../lib/markdown';
import { sanitizarHtml } from '../lib/sanitizacao';
import styles from './PreviewPane.module.css';

function PreviewPane() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);

  const htmlSeguro = useMemo(() => {
    if (!documentoAtivo?.conteudo) return '';
    const htmlBruto = renderizarMarkdown(documentoAtivo.conteudo);
    return sanitizarHtml(htmlBruto);
  }, [documentoAtivo?.conteudo]);

  return (
    <div className={styles.container}>
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: htmlSeguro }} />
    </div>
  );
}

export default PreviewPane;
