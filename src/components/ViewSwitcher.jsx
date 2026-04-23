import { BookOpen, Edit3, Columns } from 'lucide-react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import styles from './ViewSwitcher.module.css';

function ViewSwitcher() {
  const preferencias = useDocumentoStore((state) => state.preferencias);
  const setModoVisualizacao = useDocumentoStore((state) => state.setModoVisualizacao);
  const modo = preferencias.modoVisualizacao;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.botao} ${modo === 'leitura' ? styles.ativo : ''}`}
        onClick={() => setModoVisualizacao('leitura')}
        title="Modo Leitura"
      >
        <BookOpen size={18} />
      </button>
      <button
        className={`${styles.botao} ${modo === 'edicao' ? styles.ativo : ''}`}
        onClick={() => setModoVisualizacao('edicao')}
        title="Modo Edição"
      >
        <Edit3 size={18} />
      </button>
      <button
        className={`${styles.botao} ${modo === 'split' ? styles.ativo : ''}`}
        onClick={() => setModoVisualizacao('split')}
        title="Split View"
      >
        <Columns size={18} />
      </button>
    </div>
  );
}

export default ViewSwitcher;
