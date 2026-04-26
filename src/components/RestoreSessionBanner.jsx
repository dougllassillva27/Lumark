import { useState, useEffect } from 'react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import styles from './RestoreSessionBanner.module.css';

function RestoreSessionBanner() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);
  const setDocumentoAtivo = useDocumentoStore((state) => state.setDocumentoAtivo);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (documentoAtivo) setVisivel(true);
  }, []);

  if (!visivel || !documentoAtivo) return null;

  return (
    <div className={styles.banner}>
      <span>
        Sessão anterior restaurada: <strong>{documentoAtivo.nome}</strong>
      </span>
      <div className={styles.acoes}>
        <button className={styles.botaoPrimario} onClick={() => setVisivel(false)}>
          Continuar
        </button>
        <button
          className={styles.botaoSecundario}
          onClick={() => {
            setDocumentoAtivo(null);
            setVisivel(false);
          }}
        >
          Começar do zero
        </button>
      </div>
    </div>
  );
}

export default RestoreSessionBanner;
