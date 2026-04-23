import { useDocumentoStore } from '../store/useDocumentoStore';
import styles from './EditorPane.module.css';

function EditorPane() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);
  const setDocumentoAtivo = useDocumentoStore((state) => state.setDocumentoAtivo);

  const handleChange = (e) => {
    setDocumentoAtivo({ ...documentoAtivo, conteudo: e.target.value });
  };

  return (
    <div className={styles.container}>
      <textarea className={styles.textarea} value={documentoAtivo?.conteudo || ''} onChange={handleChange} />
    </div>
  );
}

export default EditorPane;
