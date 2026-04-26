import { Copy, FileCode, Download, Trash2 } from 'lucide-react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import { copiarParaClipboard } from '../lib/clipboard';
import { exportarDocumentoHtml } from '../lib/exportacao';
import { renderizarMarkdown } from '../lib/markdown';
import { sanitizarHtml } from '../lib/sanitizacao';
import styles from './Toolbar.module.css';

function Toolbar() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);
  const setDocumentoAtivo = useDocumentoStore((state) => state.setDocumentoAtivo);

  if (!documentoAtivo) return null;

  const handleCopiarMD = () => {
    copiarParaClipboard(documentoAtivo.conteudo);
  };

  const handleCopiarHTML = () => {
    const htmlBruto = renderizarMarkdown(documentoAtivo.conteudo);
    copiarParaClipboard(sanitizarHtml(htmlBruto));
  };

  const handleExportarHTML = () => {
    exportarDocumentoHtml(documentoAtivo);
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.grupoAcoes}>
        <button className={styles.botao} onClick={handleCopiarMD} title="Copiar Markdown (Ctrl+Alt+C)">
          <Copy size={16} /> Copiar MD
        </button>
        <button className={styles.botao} onClick={handleCopiarHTML} title="Copiar HTML Seguro (Ctrl+Alt+H)">
          <FileCode size={16} /> Copiar HTML
        </button>
        <button className={styles.botao} onClick={handleExportarHTML} title="Baixar Arquivo HTML (Ctrl+Alt+E)">
          <Download size={16} /> Exportar
        </button>
      </div>
      <button
        className={`${styles.botao} ${styles.perigo}`}
        onClick={() => setDocumentoAtivo(null)}
        title="Limpar Sessão Atual"
      >
        <Trash2 size={16} /> Limpar
      </button>
    </div>
  );
}

export default Toolbar;
