import { Copy, FileCode, Download, Trash2, Braces } from 'lucide-react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import { copiarParaClipboard } from '../lib/clipboard';
import { exportarDocumentoHtml } from '../lib/exportacao';
import { renderizarMarkdown } from '../lib/markdown';
import { sanitizarHtml } from '../lib/sanitizacao';
import { formatarJson } from '../lib/json';
import styles from './Toolbar.module.css';

function Toolbar() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);
  const setDocumentoAtivo = useDocumentoStore((state) => state.setDocumentoAtivo);

  if (!documentoAtivo) return null;

  const ehJson = documentoAtivo.nome.toLowerCase().endsWith('.json');

  const handleCopiarMD = () => {
    copiarParaClipboard(documentoAtivo.conteudo);
  };

  const handleCopiarHTML = () => {
    if (ehJson) {
      copiarParaClipboard(documentoAtivo.conteudo);
      return;
    }
    const htmlBruto = renderizarMarkdown(documentoAtivo.conteudo);
    copiarParaClipboard(sanitizarHtml(htmlBruto));
  };

  const handleExportarHTML = () => {
    exportarDocumentoHtml(documentoAtivo);
  };

  const handleFormatarJson = () => {
    try {
      const formatado = formatarJson(documentoAtivo.conteudo);
      setDocumentoAtivo({ ...documentoAtivo, conteudo: formatado });
    } catch (e) {
      alert('JSON inválido. Não foi possível formatar.');
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.grupoAcoes}>
        {ehJson && (
          <button className={styles.botao} onClick={handleFormatarJson} title="Formatar JSON">
            <Braces size={16} /> Formatar
          </button>
        )}
        <button
          className={styles.botao}
          onClick={handleCopiarMD}
          title={`Copiar ${ehJson ? 'JSON' : 'Markdown'} (Ctrl+Alt+C)`}
        >
          <Copy size={16} /> Copiar {ehJson ? 'JSON' : 'MD'}
        </button>
        {!ehJson && (
          <button className={styles.botao} onClick={handleCopiarHTML} title="Copiar HTML Seguro (Ctrl+Alt+H)">
            <FileCode size={16} /> Copiar HTML
          </button>
        )}
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
