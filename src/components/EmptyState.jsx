import { FileUp, ClipboardPaste, MousePointerSquare } from 'lucide-react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import styles from './EmptyState.module.css';

function EmptyState() {
  const setDocumentoAtivo = useDocumentoStore((state) => state.setDocumentoAtivo);

  const criarMock = () => {
    setDocumentoAtivo({ conteudo: 'Mockado' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.conteudo}>
        <h2 className={styles.titulo}>Comece a usar</h2>
        <p className={styles.subtitulo}>Abra um arquivo, arraste e solte, ou cole seu conteúdo para começar.</p>
        <div className={styles.opcoes}>
          <div className={styles.opcao} onClick={criarMock}>
            <FileUp size={32} />
            <span>Abrir arquivo</span>
          </div>
          <div className={styles.opcao} onClick={criarMock}>
            <MousePointerSquare size={32} />
            <span>Arrastar e soltar</span>
          </div>
          <div className={styles.opcao} onClick={criarMock}>
            <ClipboardPaste size={32} />
            <span>Colar texto</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
